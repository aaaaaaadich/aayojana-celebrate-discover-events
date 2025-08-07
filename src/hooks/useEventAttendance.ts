import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface EventAttendance {
  id: string;
  user_id: string;
  event_id: string;
  registration_date: string;
  attendance_status: 'registered' | 'attended' | 'no-show';
  created_at: string;
  event?: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image?: string;
    category: string;
  };
}

export const useEventAttendance = () => {
  const { user } = useAuth();
  const [attendances, setAttendances] = useState<EventAttendance[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserAttendances = async () => {
    if (!user) {
      setAttendances([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('event_attendances')
        .select(`
          *,
          event:events(
            id,
            title,
            date,
            time,
            location,
            image,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('registration_date', { ascending: false });

      if (error) throw error;
      
      setAttendances((data as EventAttendance[]) || []);
    } catch (error) {
      console.error('Error fetching user attendances:', error);
      setAttendances([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAttendances();
  }, [user]);

  const registerForEvent = async (eventId: string) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const { error } = await supabase
        .from('event_attendances')
        .insert({
          user_id: user.id,
          event_id: eventId,
          attendance_status: 'registered'
        });

      if (!error) {
        await fetchUserAttendances();
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const updateAttendanceStatus = async (eventId: string, status: 'registered' | 'attended' | 'no-show') => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const { error } = await supabase
        .from('event_attendances')
        .update({ attendance_status: status })
        .eq('user_id', user.id)
        .eq('event_id', eventId);

      if (!error) {
        await fetchUserAttendances();
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const getAttendanceStats = () => {
    const totalEvents = attendances.length;
    const attendedEvents = attendances.filter(a => a.attendance_status === 'attended').length;
    const upcomingEvents = attendances.filter(a => a.attendance_status === 'registered').length;
    
    return {
      totalEvents,
      attendedEvents,
      upcomingEvents
    };
  };

  return {
    attendances,
    loading,
    registerForEvent,
    updateAttendanceStatus,
    getAttendanceStats,
    refreshAttendances: fetchUserAttendances,
  };
};