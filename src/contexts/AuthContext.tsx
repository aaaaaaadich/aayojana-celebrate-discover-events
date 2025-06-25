
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsRoleSelection, setNeedsRoleSelection] = useState(false);

  const checkUserRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      // If user has no roles, they need role selection
      setNeedsRoleSelection(!data || data.length === 0);
      
      // Return roles for redirect logic
      return data?.map(item => item.role) || [];
    } catch (error) {
      console.error('Error checking user roles:', error);
      setNeedsRoleSelection(true);
      return [];
    }
  };

  const handleGoogleOAuthRoleAssignment = async (userId: string) => {
    // Check if there's a pending role from Google OAuth
    const pendingRole = localStorage.getItem('pendingUserRole');
    
    if (pendingRole && (pendingRole === 'organizer' || pendingRole === 'attendee')) {
      try {
        // Check if user already has roles
        const { data: existingRoles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);
        
        // Only assign role if user doesn't have any roles yet
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
        
        // Clean up the pending role
        localStorage.removeItem('pendingUserRole');
      } catch (error) {
        console.error('Error handling Google OAuth role assignment:', error);
        localStorage.removeItem('pendingUserRole');
      }
    }
  };

  const redirectUserBasedOnRole = async (userId: string) => {
    // First handle any pending Google OAuth role assignment
    await handleGoogleOAuthRoleAssignment(userId);
    
    // Then check roles and redirect
    const roles = await checkUserRoles(userId);
    
    if (roles.length === 0) {
      // No roles, will show role selection modal
      return;
    }
    
    // Redirect based on primary role (you can customize this logic)
    if (roles.includes('organizer')) {
      window.location.href = '/dashboard/organizer';
    } else if (roles.includes('attendee')) {
      window.location.href = '/dashboard/attendee';
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Check if user needs role selection after successful authentication
        if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          await redirectUserBasedOnRole(session.user.id);
        } else if (!session?.user) {
          setNeedsRoleSelection(false);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        await redirectUserBasedOnRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    console.log('Attempting email signup for:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
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
    setNeedsRoleSelection(false);
    // Clean up any pending role assignments
    localStorage.removeItem('pendingUserRole');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
    }
    
    return { error };
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
