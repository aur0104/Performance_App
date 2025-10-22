import {IJoinChallenge} from '../interfaces';
import {store} from '../store';
import {apiClient} from './client';
import mime from 'mime';
import {basename} from 'react-native-path';

export const login = async (data: any) => {
  return apiClient.post(`/auth/login`, data);
};

// AUTH
export const signUp = async (formData: FormData, role: string) => {
  return apiClient.post(`/auth/sign-up?role=${role}`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const otpVerification = async (data: any) => {
  return apiClient.post(`/auth/otp-verification`, data);
};

export const signUpAthlete = async (formData: FormData, role: string) => {
  return apiClient.post(`auth/sign-up?role=athlete`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const forgotPassword = async (
  data: any,
  verificationMethod = 'email',
) => {
  return apiClient.post(
    `/auth/forgot-password?verificationMethod=${verificationMethod}`,
    data,
  );
};

export const verifyCode = async (data: any) => {
  return apiClient.post(`/auth/verify-code`, data);
};

export const resetPassword = async (data: any) => {
  return apiClient.post(`/auth/reset-password`, data);
};

// SPORTS TYPES
export const createSportsType = async (data: any) => {
  return apiClient.post(`/sports-types`, data);
};
export const updateSportsType = async (id: string, data: any) => {
  return apiClient.patch(`/sports-types/${id}`, data);
};
export const deleteSportsType = async (id: string, data?: any) => {
  return apiClient.delete(`/sports-types/${id}`, {data});
};
export const getSportsTypeById = async (id: string) => {
  return apiClient.get(`/sports-types/${id}`);
};
export const getSportsTypes = async (params?: any) => {
  return apiClient.get(`/sports-types`, {params});
};

// SPORTS
export const createSport = async (sportsTypeId: string, data: any) => {
  return apiClient.post(`/sports-types/${sportsTypeId}/sports`, data);
};
export const updateSport = async (sportsTypeId: string, data: any) => {
  return apiClient.patch(`/sports-types/${sportsTypeId}/sports/`, data);
};
export const deleteSport = async (
  sportsTypeId: string,
  sportId: string,
  data?: any,
) => {
  return apiClient.delete(`/sports-types/${sportsTypeId}/sports/${sportId}`, {
    data,
  });
};
export const getSportById = async (sportsTypeId: string, sportId: string) => {
  return apiClient.get(`/sports-types/${sportsTypeId}/sports/${sportId}`);
};
export const getSports = async (sportsTypeId: string, params?: any) => {
  return apiClient.get(`/sports-types/${sportsTypeId}/sports`, {params});
};

// TRAINING CALENDAR
export const createTrainingCalendar = async (data: any) => {
  return apiClient.post(`/training-calander`, data);
};
export const updateTrainingCalendar = async (id: string, data: any) => {
  return apiClient.patch(`/training-calander/${id}`, data);
};
export const deleteTrainingCalendar = async (id: string, data?: any) => {
  return apiClient.delete(`/training-calander/${id}`, {data});
};
export const getTrainingCalendarById = async (id: string) => {
  return apiClient.get(`/training-calander/${id}`);
};
export const getTrainingCalendars = async (params?: any) => {
  return apiClient.get(`/training-calander`, {params});
};
export const getTrainingCalendarStats = async (params?: any) => {
  return apiClient.get(`/training-calander`, {params});
};

// MONTHLY TRAINING COUNTS
export const getMonthlyTrainingCounts = async (
  month: string,
  year: number,
  userId: string,
) => {
  return apiClient.get(
    `/training-calander/monthly-counts?month=${month}&year=${year}&userId=${userId}`,
  );
};

// ATTENDANCE GOALS
export const createAttendanceGoal = async (data: any) => {
  return apiClient.post(`/attendance-goals`, data);
};
export const updateAttendanceGoal = async (id: string, data: any) => {
  return apiClient.patch(`/attendance-goals/${id}`, data);
};
export const deleteAttendanceGoal = async (
  sportsTypeId: string,
  sportId: string,
  data?: any,
) => {
  return apiClient.delete(`/sports-types/${sportsTypeId}/sports/${sportId}`, {
    data,
  });
};
export const getAttendanceGoalById = async (id: string) => {
  return apiClient.get(`/attendance-goals/${id}`);
};
export const getAttendanceGoals = async (params?: any) => {
  return apiClient.get(`/attendance-goals`, {params});
};
export const getAttendanceGoalStats = async (params?: any) => {
  return apiClient.get(`/attendance-goals/home-stats`, {params});
};

export const getAttendanceGoalsHomeStats = async (
  year: string,
  user: string,
) => {
  return apiClient.get(
    `/attendance-goals/home-stats?year=${year}&user=${user}`,
  );
};

// SPORT CATEGORY
export const createSportCategory = async (
  sportsTypeId: string,
  sportId: string,
  data: any,
) => {
  return apiClient.post(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories`,
    data,
  );
};
export const updateSportCategory = async (
  sportsTypeId: string,
  sportId: string,
  categoryId: string,
  data: any,
) => {
  return apiClient.patch(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories/${categoryId}`,
    data,
  );
};
export const deleteSportCategory = async (
  sportsTypeId: string,
  sportId: string,
  categoryId: string,
  data?: any,
) => {
  return apiClient.delete(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories/${categoryId}`,
    {data},
  );
};
export const getSportCategories = async (
  sportsTypeId: string,
  sportId: string,
) => {
  return apiClient.get(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories`,
  );
};
export const getSportCategoryById = async (
  sportsTypeId: string,
  sportId: string,
  categoryId: string,
) => {
  return apiClient.get(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories/${categoryId}`,
  );
};

// SPORT CATEGORY SKILL
export const createSportCategorySkill = async (
  sportsTypeId: string,
  sportId: string,
  categoryId: string,
  data: any,
) => {
  return apiClient.post(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories/${categoryId}/skills`,
    data,
  );
};
export const updateSportCategorySkill = async (
  sportsTypeId: string,
  sportId: string,
  categoryId: string,
  skillId: string,
  data: any,
) => {
  return apiClient.patch(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories/${categoryId}/skills/${skillId}`,
    data,
  );
};
export const deleteSportCategorySkill = async (
  sportsTypeId: string,
  sportId: string,
  categoryId: string,
  skillId: string,
  data?: any,
) => {
  return apiClient.delete(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories/${categoryId}/skills/${skillId}`,
    {data},
  );
};
export const getSportCategorySkills = async (
  sportsTypeId: string,
  sportId: string,
  categoryId: string,
) => {
  return apiClient.get(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories/${categoryId}/skills`,
  );
};
export const getSportCategorySkillById = async (
  sportsTypeId: string,
  sportId: string,
  categoryId: string,
  skillId: string,
) => {
  return apiClient.get(
    `/sports-types/${sportsTypeId}/sports/${sportId}/categories/${categoryId}/skills/${skillId}`,
  );
};

// REVIEW
export const createReview = async (formData: FormData) => {
  return apiClient.post(`/reviews`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const updateReview = async (id: string, formData: FormData) => {
  return apiClient.patch(`/reviews/${id}`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const deleteReview = async (id: string, data?: any) => {
  return apiClient.delete(`/reviews/${id}`, {data});
};
export const getReviewById = async (id: string) => {
  return apiClient.get(`/reviews/${id}`);
};
export const getReviews = async (params?: any) => {
  return apiClient.get(`/reviews`, {params});
};

// COMMUNITY
export const createCommunity = async (gymId: string, formData: FormData) => {
  return apiClient.post(`/communities?gym=${gymId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const updateCommunity = async (id: string, formData: FormData) => {
  return apiClient.patch(`/communities/${id}`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const deleteCommunity = async (id: string) => {
  return apiClient.delete(`/communities/${id}`);
};
export const getCommunityById = async (id: string) => {
  return apiClient.get(`/communities/${id}`);
};
export const getCommunityMembers = async (id: string) => {
  return apiClient.get(`/communities/${id}/members`);
};
export const getCommunityRequests = async (id: string) => {
  return apiClient.get(`/communities/${id}/requests`);
};
export const getCommunities = async (params?: any) => {
  return apiClient.get(`/communities`, {params});
};

// COACHES
export const createCoach = async (formData: FormData) => {
  return apiClient.post(`/coaches`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const updateCoach = async (id: string, formData: FormData) => {
  return apiClient.patch(`/coaches/${id}`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const deleteCoach = async (id: string) => {
  return apiClient.delete(`/coaches/${id}`);
};
export const getCoachById = async (id: string) => {
  return apiClient.get(`/coaches/${id}`);
};
export const getCoaches = async (params?: any) => {
  return apiClient.get(`/coaches`, {params});
};

// COMMUNITY POSTS
export const createCommunityPost = async (
  communityId: string,
  formData: FormData,
) => {
  return apiClient.post(`/communities/${communityId}/posts`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const getCommunityPosts = async (communityId: string) => {
  return apiClient.get(`/communities/${communityId}/posts`);
};

// COMMUNITY MEMBER
export const joinCommunityRequest = async (communityId: string) => {
  return apiClient.get(`/communities/${communityId}/member-request`);
};
export const leaveCommunity = async (communityId: string) => {
  return apiClient.get(`/communities/${communityId}/leave`);
};
export const updateCommunityMemberStatus = async (
  communityId: string,
  memberId: string,
  status: string,
) => {
  return apiClient.get(
    `/communities/${communityId}/status-update/${memberId}?status=${status}`,
  );
};

// CHALLENGE
export const createChallenge = async (formData: FormData) => {
  const userInfo = store.getState().user?.user;
  return apiClient.post(`/challenges`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: userInfo?.user?.token || userInfo?.token,
    },
  });
};
export const updateChallenge = async (id: string, formData: FormData) => {
  const userInfo = store.getState().user?.user;
  return apiClient.patch(`/challenges/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: userInfo?.user?.token || userInfo?.token,
    },
  });
};
export const deleteChallenge = async (id: string, data?: any) => {
  return apiClient.delete(`/challenges/${id}`, {data});
};
export const getChallengeById = async (id: string) => {
  return apiClient.get(`/challenges/${id}`);
};
export const getChallenges = async (params?: any) => {
  return apiClient.get(`/challenges`, {params});
};

// CHALLENGE LEADERBOARD
export const getChallengeLeaderboard = async (challengeId: string) => {
  return apiClient.get(`/challenges/${challengeId}/leader-board`);
};

// USER CHALLENGES
export const createUserChallenge = async (data: any) => {
  return apiClient.post(`/user-challenges`, data);
};
export const updateUserChallenge = async (id: string, formData: FormData) => {
  return apiClient.patch(`/user-challenges/${id}`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const updateSubmissionStatus = async (
  userChallengeId: string,
  submissionId: string,
  status: string,
) => {
  console.log('Status here ', status);
  console.log('Submission id ', submissionId);
  console.log('User challenge id ', userChallengeId);
  return apiClient.patch(
    `/user-challenges/${userChallengeId}/update-submission/${submissionId}`,
    {status},
  );
};

export const submitUserChallenge = async (id: string, formData: FormData) => {
  const userInfo = store.getState().user?.user;
  return apiClient.patch(`/user-challenges/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: userInfo?.user?.token || userInfo?.token,
    },
  });
};
export const deleteUserChallenge = async (id: string, data?: any) => {
  return apiClient.delete(`/reviews/${id}`, {data});
};
export const getUserChallengeById = async (id: string) => {
  return apiClient.get(`/user-challenges/${id}`);
};
export const getUserChallenges = async (params?: any) => {
  return apiClient.get(`/user-challenges`, {params});
};
export const getUserChallengesByUser = async (userId: string) => {
  return apiClient.get(`/user-challenges?user=${userId}`);
};

export const getUserChallengesByChallenge = async (challengeId: string) => {
  return apiClient.get(`/user-challenges?challenge=${challengeId}`);
};

// LEAVE CHALLENGE
export const leaveChallenge = async (userChallengeId: string) => {
  const userInfo = store.getState().user?.user;
  const formData = new FormData();
  formData.append('status', 'cancelled');

  return apiClient.patch(`/user-challenges/${userChallengeId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: userInfo?.user?.token || userInfo?.token,
    },
  });
};

// SYSTEM USER CHALLENGES
export const createSystemUserChallenge = async (data: any) => {
  return apiClient.post(`/system-user-challenges`, data);
};
export const updateSystemUserChallenge = async (
  id: string,
  formData: FormData,
) => {
  return apiClient.patch(`/system-user-challenges/${id}`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
export const getSystemUserChallenges = async (params?: any) => {
  return apiClient.get(`/system-user-challenges`, {params});
};
export const getSystemUserChallengeStats = async (params?: any) => {
  return apiClient.get(`/system-user-challenges/stats`, {params});
};

// PHYSICAL PERFORMANCE
export const createPhysicalPerformance = async (data: any) => {
  return apiClient.post(`/physical-performances`, data);
};
export const updatePhysicalPerformance = async (id: string, data: any) => {
  return apiClient.patch(`/physical-performances/${id}`, data);
};
export const getPhysicalPerformanceById = async (id: string) => {
  return apiClient.get(`/physical-performances/${id}`);
};
export const getPhysicalPerformances = async (params?: any) => {
  return apiClient.get(`/physical-performances`, {params});
};

// SYSTEM CHALLENGES
export const getSystemChallenges = async (typeId: string) => {
  return apiClient.get(`/system-challenge-types/${typeId}/challenges`);
};

// CUSTOMER SUPPORT
export const createCustomerSupport = async (data: any) => {
  return apiClient.post(`/customer-support`, data);
};

// LANDING PAGE
export const getCareerForms = async (params?: any) => {
  return apiClient.get(`/landing-page/career-forms`, {params});
};
export const createEarlyAccessForm = async (data: any) => {
  return apiClient.post(`/landing-page/early-access-form`, data);
};
export const submitCareerForm = async (formData: FormData) => {
  return apiClient.post(`/landing-page/submit-career-form`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

// DROPDOWNS
export const getSportsWithSkillLevels = async () => {
  return apiClient.get(`/dropdowns/sports-skillLevel`);
};
//Dropdown for Sport
export const getSportsDropdown = async () => {
  return apiClient.get(`/dropdowns/sports`);
};
// Dropdown - challenge categories types specifically for communityChallenge entity type
export const getChallengeCategoriesTypes = async () => {
  return apiClient.get(
    `/dropdowns/challange-categories-types?entityType=communityChallenge`,
  );
};

// PHYSICAL PERFORMANCE - SAVE
export const savePhysicalPerformance = async (data: any) => {
  return apiClient.post(`/physical-performances`, data);
};

// CHAT
export const sendChatMessage = async (data: any) => {
  // Check if we have files to send
  if (data.files || data.audio) {
    const formData = new FormData();

    // Add text fields
    formData.append('senderId', data.senderId);
    formData.append('receiverId', data.receiverId);

    if (data.text) {
      formData.append('text', data.text);
    }

    // Handle message type
    if (data.audio) {
      // For audio messages
      const audioFile = {
        uri: data.audio,
        type: 'audio/mp4',
        name: `audio_${Date.now()}.mp4`,
      };
      formData.append('files', audioFile as any);
      formData.append('messageType', 'audio');
    } else if (data.files) {
      // For image/file messages
      if (Array.isArray(data.files)) {
        data.files.forEach((file: any) => {
          const mimeType = mime.getType(file.uri) || 'application/octet-stream'; // Default if MIME type not found
          const fileName = basename(file.uri);
          formData.append('files', {
            uri: file.uri,
            type: mimeType || 'image/jpeg',
            name: fileName || `image_${Date.now()}.jpg`,
          } as any);
        });
      } else {
        formData.append('files', {
          uri: data.files.uri,
          type: data.files.type || 'image/jpeg',
          name: data.files.name || `image_${Date.now()}.jpg`,
        } as any);
      }
      formData.append('messageType', 'image');
    }

    return apiClient.post(`/chats/send`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    // Regular text message
    const formData = new FormData();
    formData.append('senderId', data.senderId);
    formData.append('receiverId', data.receiverId);
    formData.append('text', data.text);
    formData.append('messageType', 'text');

    return apiClient.post(`/chats/send`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};
export const getTwoUserMessages = async (
  senderId: string,
  receiverId: string,
) => {
  return apiClient.get(`/chats/${senderId}/${receiverId}`);
};
export const getAllChatbox = async (userId: string) => {
  return apiClient.get(`/chats/${userId}`);
};

// PROFILE
export const getProfile = async () => {
  const user = store.getState().user.user;
  return apiClient.get(`/profile/${user?.user?._id}`);
};

export const updateProfileImage = async (
  userId: string,
  formData: FormData,
) => {
  return apiClient.patch(`/profile/${userId}/profile-image-update`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

// FRIENDS
export const getFriendsList = async (userId: string) => {
  return apiClient.get(`/profile/${userId}`);
};

// GYM MEMBERS
export const getGymMembers = async (gymId: string) => {
  return apiClient.get(`/api/v1/sub-admin/gyms/${gymId}/members`);
};

//Add sports category
interface IAddSportsCategory {
  sport: string;
  user: string;
  name: string;
}
interface IAddSkills {
  category: string;
  name: string;
}
export const addSportsCategory = async (paylaod: IAddSportsCategory) => {
  return apiClient.post('/user-sports/categories', paylaod);
};
export const addSportsCustomSkills = async (paylaod: IAddSkills) => {
  return apiClient.post('/user-sports/skills', paylaod);
};
export const getAllSportsCustomeCategories = async (_id: string) => {
  return apiClient.get(`user-sports/categories-with-skills?user=${_id}`);
};
export const updateCustomCategory = async (_id: string, paylaod: any) => {
  return apiClient.patch(`user-sports/categories/${_id}`, paylaod);
};
export const deleteCustomCategory = async (_id: string) => {
  return apiClient.delete(`user-sports/categories/${_id}`);
};
export const editCustomSkill = async (_id: string, paylaod: any) => {
  return apiClient.patch(`user-sports/skills/${_id}`, paylaod);
};
export const deleteCustomSkill = (_id: string) => {
  return apiClient.delete(`user-sports/skills/${_id}`);
};

//Performance
export const getChallangePerformance = async (type: string) => {
  return apiClient.get(`/challenge-categories?type=${type}`);
};
export const getCategoryPerformance = async (category: string) => {
  return apiClient.get(`/system-challenge-types?category=${category}`);
};
export const getChallengeType = async (
  challengeTypeId: string,
  userId: string,
) => {
  return apiClient.get(
    `/system-challenge-types/${challengeTypeId}/challenges?user=${userId}`,
  );
};

export const joinPerformanceChallenge = (body: IJoinChallenge) => {
  return apiClient.post(`/system-user-challenges`, body);
};
export const updatePerformanceChallenge = (challengeId: string, body: any) => {
  return apiClient.patch(`/system-user-challenges/${challengeId}`, body);
};
export const getStatesPerformanceChallenge = () => {
  return apiClient.get(
    'https://performance-app-production.up.railway.app/system-user-challenges/stats',
  );
};
export const addMembersInCommunity = (communityId: string, body: any) => {
  return apiClient.post(`/communities/${communityId}/members`, body);
};
// Physical Performance Interfaces
interface PhysicalPerformanceVariation {
  sets: number;
  weight: number;
  reps: number;
}

interface PhysicalPerformanceSet {
  category: string;
  subCategory: string | null;
  exercise: string | null;
  variation: PhysicalPerformanceVariation[];
}

interface PhysicalPerformanceBody {
  date: string;
  sets: PhysicalPerformanceSet[];
}

//Handle Physical performance
export const getPhysicalPerformanceDropdownData = () => {
  return apiClient.get(`/dropdowns/challange-categories-sub-exercise`);
};
export const addPhysicalPerformance = (body: PhysicalPerformanceBody) => {
  return apiClient.post(`/physical-performances`, body);
};

// ==============================================
// Custom Exercise (User-defined)  - PLACEHOLDER
// NOTE: Replace endpoint paths with real backend routes when available.
// Assumed payload: { name: string, category?: string, user?: string }
// ==============================================
export const addCustomExercise = async (payload: any) => {
  return apiClient.post(`/user-performance-exercises`, payload);
};
export const updateCustomExercise = async (id: string, payload: any) => {
  return apiClient.patch(`/user-exercises/${id}`, payload);
};
// Interface for fetching custom exercises
export interface GetCustomExercisesParams {
  user: string; // user id
  challengeCategory: string; // category id
  subCategory: string; // subcategory id
}
export const getCustomExercises = async (params: GetCustomExercisesParams) => {
  const {user, challengeCategory, subCategory} = params;
  return apiClient.get(
    `/user-performance-exercises?user=${user}&challengeCategory=${challengeCategory}&subCategory=${subCategory}`,
  );
};
