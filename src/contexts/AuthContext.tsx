
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  needsRoleSelection: boolean;
  setNeedsRoleSelection: (needs: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Function to send welcome email
const sendWelcomeEmail = async (email: string, name?: string, isNewUser: boolean = false) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-welcome-email', {
      body: {
        email,
        name,
        isNewUser
      }
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
    } else {
      console.log('Welcome email sent successfully:', data);
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsRoleSelection, setNeedsRoleSelection] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const checkUserRoles = async (userId: string) => {
    try {
      console.log('Checking user roles for:', userId);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error checking user roles:', error);
        throw error;
      }
      
      console.log('User roles data:', data);
      
      const hasRoles = data && data.length > 0;
      console.log('User has roles:', hasRoles);
      setNeedsRoleSelection(!hasRoles);
      
      return data?.map(item => item.role) || [];
    } catch (error) {
      console.error('Error checking user roles:', error);
      setNeedsRoleSelection(true);
      return [];
    }
  };

  const handleGoogleOAuthRoleAssignment = async (userId: string) => {
    const pendingRole = localStorage.getItem('pendingUserRole');
    
    if (pendingRole && (pendingRole === 'organizer' || pendingRole === 'attendee')) {
      try {
        const { data: existingRoles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);
        
        if (!existingRoles || existingRoles.length === 0) {
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({ user_id: userId, role: pendingRole });
          
          if (roleError) {
            console.error('Error assigning Google OAuth role:', roleError);
          } else {
            console.log(`Successfully assigned ${pendingRole} role to Google OAuth user`);
          }
        }
        
        localStorage.removeItem('pendingUserRole');
      } catch (error) {
        console.error('Error handling Google OAuth role assignment:', error);
        localStorage.removeItem('pendingUserRole');
      }
    }
  };

  const redirectUserBasedOnRole = async (userId: string, isNewSignIn: boolean = false) => {
    await handleGoogleOAuthRoleAssignment(userId);
    
    const roles = await checkUserRoles(userId);
    
    if (roles.length === 0) {
      console.log('User has no roles, showing role selection modal');
      return;
    }
    
    // Only redirect on initial sign in, not on every auth state change
    const currentPath = window.location.pathname;
    if (isNewSignIn && (currentPath === '/auth' || currentPath === '/')) {
      if (roles.includes('organizer')) {
        console.log('Redirecting organizer to dashboard');
        window.location.href = '/dashboard/organizer';
      } else if (roles.includes('attendee')) {
        console.log('Redirecting attendee to dashboard');
        window.location.href = '/dashboard/attendee';
      }
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        const previousUser = user;
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (session?.user) {
          // Check if this is a new user by comparing with previous state
          const isNewUser = !previousUser && !isInitialLoad;
          const isReturningUser = !isNewUser && !isInitialLoad;
          
          // Get user profile data for email
          const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', session.user.id)
            .single();

          // Send welcome email with proper user detection
          if (isNewUser || isReturningUser) {
            setTimeout(() => {
              sendWelcomeEmail(
                session.user.email || '', 
                profile?.name || session.user.user_metadata?.name, 
                isNewUser
              );
            }, 0);
          }

          // Handle role checking and redirection
          setTimeout(() => {
            redirectUserBasedOnRole(
              session.user.id, 
              !isInitialLoad
            );
          }, 0);
        } else if (!session?.user) {
          setNeedsRoleSelection(false);
        }
        
        setIsInitialLoad(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        setTimeout(() => {
          redirectUserBasedOnRole(session.user.id, false);
        }, 0);
      }
      
      setIsInitialLoad(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    console.log('Attempting email signup for:', email);
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: name,
        }
      }
    });
    
    if (error) {
      console.error('Sign up error:', error);
    } else {
      console.log('Sign up successful:', data);
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting email sign in for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error);
    } else {
      console.log('Sign in successful:', data);
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('Attempting to sign out user');
    
    try {
      setNeedsRoleSelection(false);
      localStorage.removeItem('pendingUserRole');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        return { error };
      }
      
      console.log('Sign out successful');
      
      setUser(null);
      setSession(null);
      
      window.location.href = '/';
      
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    needsRoleSelection,
    setNeedsRoleSelection,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
