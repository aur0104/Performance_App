import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import styles from './ChallengesStyles';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import {getChallenges} from '../../../services/calls';
import {challengeData} from '../../../utils/DummyData';

interface ChallengesListProps {
  communityId: string;
}

interface Challenge {
  _id: string;
  __v: number;
  community: string;
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
    adminStatus: string;
    gender?: string;
    dob?: string;
    friends?: any[];
    token?: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  daysLeft: number | string;
  endDate: string | null;
  exercise: {
    _id: string;
    name: string;
    challengeCategory: string;
    rules: any[];
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  format: string | null;
  mediaUrl: string;
  name: string;
  participants: any[];
  requiredVideo: boolean;
  time: string;
  type: {
    _id: string;
    name: string;
    image: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };
  updatedAt: string;
  // Legacy fields for backward compatibility
  id?: number;
  title?: string;
  description?: string;
  subtitle?: string;
  image?: string;
  progress?: number;
  total?: number;
  startDate?: string;
  status?: string;
}

interface DummyChallenge {
  id: number;
  image: any;
  title: string;
  subtitle: string;
  progress: number;
  total: number;
  daysLeft: string;
  status: string;
}

const ChallengesList: React.FC<ChallengesListProps> = ({communityId}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [useDummyData, setUseDummyData] = useState(false);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;

  // Fetch challenges data
  useEffect(() => {
    if (communityId) {
      fetchChallenges();
    } else {
      setLoading(false);
      setChallenges([]);
    }
  }, [communityId, page]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        community: communityId,
      };
      const response = await getChallenges(params);
      if (response?.status === 200) {
        const newChallenges = response.data?.data || response.data || [];
        if (page === 1) {
          setChallenges(newChallenges);
        } else {
          setChallenges(prev => {
            const combined: Challenge[] = [];
            prev.forEach((item: Challenge) => combined.push(item));
            newChallenges.forEach((item: Challenge) => combined.push(item));
            return combined;
          });
        }

        // Check if there are more challenges based on pagination info
        const pagination = response.data?.pagination;
        if (pagination) {
          setHasMore(pagination.page < pagination.totalPages);
        } else {
          setHasMore(newChallenges.length === 10);
        }
        setUseDummyData(false);
      } else {
        // If API returns empty data, don't show dummy data
        if (page === 1) {
          setChallenges([]);
          setUseDummyData(false);
        }
        throw new Error('No challenges available');
      }
    } catch (err: any) {
      console.error('Error fetching challenges:', err);
      console.error('Error details:', {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
        code: err?.code,
      });

      // Only use dummy data for network/API errors, not for empty responses
      if (page === 1 && err?.message !== 'No challenges available') {
        const dummyChallenges: Challenge[] = challengeData.map(
          (challenge: DummyChallenge) => ({
            _id: challenge.id.toString(),
            __v: 0,
            community: communityId,
            createdAt: new Date().toISOString(),
            createdBy: {
              _id: 'dummy-user',
              name: 'Dummy User',
              email: 'dummy@example.com',
              role: 'user',
              adminStatus: 'approved',
              __v: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            daysLeft: challenge.daysLeft,
            endDate: null,
            exercise: {
              _id: 'dummy-exercise',
              name: 'Dummy Exercise',
              challengeCategory: 'dummy-category',
              rules: [],
              __v: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            format: null,
            mediaUrl: '',
            name: challenge.title,
            participants: [],
            requiredVideo: false,
            time: '30mins',
            type: {
              _id: 'dummy-type',
              name: challenge.subtitle,
              image: '',
              __v: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            updatedAt: new Date().toISOString(),
            // Legacy fields for backward compatibility
            title: challenge.title,
            subtitle: challenge.subtitle,
            image: challenge.image,
            progress: challenge.progress,
            total: challenge.total,
            status: challenge.status,
          }),
        );
        setChallenges(dummyChallenges);
        setUseDummyData(true);
        setError('');
      } else if (page === 1) {
        // Show empty state for empty responses
        setChallenges([]);
        setUseDummyData(false);
        setError('');
      } else {
        setError(err?.message || 'Failed to fetch challenges');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && !useDummyData) {
      setPage(prev => prev + 1);
    }
  };

  const renderLoading = () => (
    <View style={{padding: 20, alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
      <Text style={{color: textColor, marginTop: 10}}>
        Loading challenges...
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={{padding: 20, alignItems: 'center'}}>
      <Text style={{color: 'red', textAlign: 'center', marginBottom: 15}}>
        {error}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setError('');
          setPage(1);
          fetchChallenges();
        }}
        style={{
          backgroundColor: Colors.primaryColor,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 8,
        }}>
        <Text style={{color: 'white'}}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={{padding: 20, alignItems: 'center'}}>
      <Text style={{color: textColor, textAlign: 'center', fontSize: 16}}>
        No challenges available for this community yet.
      </Text>
      <Text
        style={{
          color: textColor,
          textAlign: 'center',
          marginTop: 5,
          opacity: 0.7,
        }}>
        Check back later for new challenges!
      </Text>
    </View>
  );

  const renderItem = ({item, index}: {item: Challenge; index: number}) => {
    const isEven = index % 2 === 1;

    // Check if current user has already participated
    const currentUserId = user?.user?._id || user?._id;
    const hasParticipated = item?.participants?.some(
      (participant: any) =>
        participant._id === currentUserId || participant === currentUserId,
    );

    // Calculate days left
    const getDaysLeft = () => {
      // Use the new daysLeft field if available
      if (typeof item.daysLeft === 'number') {
        return item.daysLeft > 0 ? `${item.daysLeft} Days Left` : 'Expired';
      }

      // Fallback to legacy daysLeft string
      if (typeof item.daysLeft === 'string') {
        return item.daysLeft;
      }

      if (item.endDate) {
        const endDate = new Date(item.endDate);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? `${diffDays} Days Left` : 'Expired';
      }
      return 'No deadline';
    };

    // Calculate progress percentage
    const getProgressPercentage = () => {
      // For new API structure, we might need to calculate based on participants
      if (item.participants && Array.isArray(item.participants)) {
        // This is a placeholder logic - you might need to adjust based on your requirements
        const participantCount = item.participants.length;
        // Assuming some target number for participation
        const targetParticipation = 10; // This should be configurable
        return Math.min((participantCount / targetParticipation) * 100, 100);
      }

      // Fallback to legacy progress calculation
      if (item.progress && item.total) {
        return Math.min((item.progress / item.total) * 100, 100);
      }
      return 0;
    };

    // Get status color based on days left and other factors
    const getStatusColor = () => {
      // Check legacy status first
      if (item.status) {
        switch (item.status) {
          case 'completed':
            return Colors.green;
          case 'cancelled':
            return Colors.red;
          case 'active':
            return Colors.primaryColor;
          default:
            return Colors.Yellow;
        }
      }

      // For new API structure, determine status based on daysLeft
      if (typeof item.daysLeft === 'number') {
        if (item.daysLeft === 0) {
          return Colors.red; // Expired
        } else if (item.daysLeft > 0) {
          return Colors.primaryColor; // Active
        }
      }

      return Colors.Yellow;
    };

    return (
      <TouchableOpacity
        onPress={() =>
          (navigation as any).navigate('ChallengeDetail', {
            id: item._id,
            challengeData: item,
          })
        }
        style={[styles.cardContainer, isEven && {backgroundColor: viewBg}]}>
        <Image
          source={
            item.mediaUrl
              ? {uri: item.mediaUrl}
              : item.image
              ? {uri: item.image}
              : IMAGES.challenge1
          }
          style={styles.challengeImage}
        />
        <View style={styles.contentContainer}>
          <Text style={[styles.title, {color: textColor}]}>
            {item.name || item.title || 'Challenge'}
          </Text>
          <Text style={[styles.subtitle, {color: textColor}]}>
            {item.type?.name ||
              item.exercise?.name ||
              item.subtitle ||
              item.description?.substring(0, 30) ||
              'Challenge'}
          </Text>

          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBackground,
                {backgroundColor: isDarkMode ? '#FFFFFF2E' : '#2121212E'},
              ]}>
              <View
                style={[
                  styles.progressFill,
                  {width: `${getProgressPercentage()}%`},
                ]}
              />
            </View>
            <Text style={[styles.progressText, {color: textColor}]}>
              {item.participants?.length || item?.progress || 0}/{item?.total}
            </Text>
          </View>

          <View style={styles.footerRow}>
            <View
              style={[
                styles.participateBtn,
                {
                  backgroundColor: hasParticipated
                    ? Colors.green
                    : getStatusColor(),
                },
              ]}>
              <Text style={styles.participateText}>
                {hasParticipated
                  ? 'Joined'
                  : item.status === 'completed'
                  ? 'Completed'
                  : item.status === 'cancelled'
                  ? 'Cancelled'
                  : item.status === 'active'
                  ? 'Active'
                  : typeof item.daysLeft === 'number' && item.daysLeft === 0
                  ? 'Expired'
                  : 'Join'}
              </Text>
            </View>
            <Text style={[styles.daysLeft, {color: getStatusColor()}]}>
              {getDaysLeft()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && page === 1) {
    return renderLoading();
  }

  if (error && page === 1 && !useDummyData) {
    return renderError();
  }

  return (
    <FlatList
      data={challenges}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      contentContainerStyle={{padding: 16, backgroundColor}}
      ListEmptyComponent={renderEmpty}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        loading && page > 1 ? (
          <View style={{padding: 20, alignItems: 'center'}}>
            <ActivityIndicator size="small" color={Colors.primaryColor} />
            <Text style={{color: textColor, marginTop: 5}}>
              Loading more...
            </Text>
          </View>
        ) : null
      }
    />
  );
};

export default ChallengesList;
