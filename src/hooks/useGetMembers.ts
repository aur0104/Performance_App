import {useEffect, useState, useCallback} from 'react';
import {getGymMembers} from '../services/calls';
import utils from '../utils/utils';
import {GymMember, GymMembersResponse} from '../interfaces';
import {store} from '../store';
interface UseGymMembersResult {
  coaches: GymMember[];
  teamMembers: GymMember[];
  loading: boolean;
  refresh: () => Promise<void>;
}
export const useGymMembers = (): UseGymMembersResult => {
  const [coaches, setCoaches] = useState<GymMember[]>([]);
  const [teamMembers, setTeamMembers] = useState<GymMember[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const gymId = store.getState().user.user.user?.gym?._id;
  const userId = store.getState().user?.user?.user?._id;
  const fetchMembers = useCallback(async () => {
    if (!gymId) return;
    setLoading(true);
    try {
      const response = await getGymMembers(gymId);
      if (response?.data?.gymMembers as GymMembersResponse) {
        const coachesList = response.data.gymMembers.filter(
          (member: GymMember) =>
            member?.user?.role === 'coach' && member?.user?._id !== userId,
        );
        const athletesList = response.data.gymMembers.filter(
          (member: GymMember) =>
            member?.user?.role === 'athlete' && member?.user?._id !== userId,
        );
        setCoaches(coachesList);
        setTeamMembers(athletesList);
      } else {
        setCoaches([]);
        setTeamMembers([]);
      }
    } catch (error: any) {
      utils.showToast('error', error?.message || 'Failed to fetch gym members');
    } finally {
      setLoading(false);
    }
  }, [gymId, userId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {coaches, teamMembers, loading, refresh: fetchMembers};
};
