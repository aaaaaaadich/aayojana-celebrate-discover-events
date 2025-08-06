
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'organizer' | 'attendee' | 'admin';

interface UserRolesHook {
  roles: UserRole[];
  loading: boolean;
  hasRole: (role: UserRole) => boolean;
  addRole: (role: UserRole) => Promise<{ error: any }>;
  refreshRoles: () => Promise<void>;
}

export const useUserRoles = (): UserRolesHook => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserRoles = async () => {
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) throw error;
      
      setRoles(data?.map(item => item.role as UserRole) || []);
    } catch (error) {
      console.error('Error fetching user roles:', error);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, [user]);

  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  const addRole = async (role: UserRole) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: user.id, role });

      if (!error) {
        await fetchUserRoles();
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const refreshRoles = async () => {
    await fetchUserRoles();
  };

  return {
    roles,
    loading,
    hasRole,
    addRole,
    refreshRoles,
  };
};
