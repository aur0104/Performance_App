import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import BackHeader from '../../../components/BackHeader';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {IMAGES} from '../../../assets/images';
import {getUserChallengesByChallenge} from '../../../services/calls';

interface ParticipantsProps {
  navigation?: any;
}

interface ParticipantData {
  _id: string;
  user: {
    _id: string;
    name: string;
    profileImage?: string;
    email: string;
  };
  challenge:
    | string
    | {
        _id: string;
        name?: string;
        [key: string]: any;
      };
  status: string;
  submission?: {
    mediaUrl?: string;
    time?: string;
    reps?: string;
    weight?: string;
    ownerApprovalStatus?: string;
  };
  dailySubmissions?: Array<{
    _id: string;
    mediaUrl?: string;
    time?: string;
    reps?: string;
    weight?: string;
    ownerApprovalStatus?: string;
    date?: string;
    note?: string;
    createdAt: string;
    updatedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ChallengeMembers {
  active: ParticipantData[];
  completed: ParticipantData[];
  cancelled: ParticipantData[];
  incomplete: ParticipantData[];
}

const Participants: React.FC<ParticipantsProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#ddd';
  const cardBackgroundColor = isDarkMode ? '#1E1E1E' : Colors.white;

  // State management
  const [loading, setLoading] = useState(true);
  const [challengeMembers, setChallengeMembers] = useState<ChallengeMembers>({
    active: [],
    completed: [],
    cancelled: [],
    incomplete: [],
  });
  const [error, setError] = useState<string | null>(null);
  // Get challenge ID from route params
  const challengeId = (route.params as any)?.challengeId;
  // Fetch participants data
  const fetchParticipants = async () => {
    if (!challengeId) {
      setError('Challenge ID not found');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await getUserChallengesByChallenge(challengeId);
      console.log('Participants response:', JSON.stringify(response?.data));

      if (response.data && response.data.data) {
        setChallengeMembers(response.data.data);
      }
    } catch (err: any) {
      console.error('Error fetching participants:', err);
      setError(err.message || 'Failed to fetch participants data');
      Alert.alert('Error', 'Failed to load participants data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [challengeId]);

  const getAllParticipants = () => {
    return [
      ...(challengeMembers.active || []),
      ...(challengeMembers.completed || []),
      ...(challengeMembers.cancelled || []),
      ...(challengeMembers.incomplete || []),
    ];
  };

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'active':
        return t('Active');
      case 'completed':
        return t('Completed');
      case 'cancelled':
        return t('Rejected');
      default:
        return tab;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return Colors.green;
      case 'cancelled':
        return Colors.red;
      case 'active':
        return Colors.primaryColor;
      default:
        return Colors.gray;
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇'; // Gold medal
    if (index === 1) return '🥈'; // Silver medal
    if (index === 2) return '🥉'; // Bronze medal
    return `#${index + 1}`;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return '#FFD700'; // Gold
    if (index === 1) return '#C0C0C0'; // Silver
    if (index === 2) return '#CD7F32'; // Bronze
    return Colors.gray;
  };

  const getScore = (item: ParticipantData) => {
    if (item.submission?.time) return item.submission.time;
    if (item.submission?.reps) return `${item.submission.reps} reps`;
    if (item.submission?.weight) return `${item.submission.weight} kg`;
    return getTabLabel(item.status);
  };

  const handleParticipantPress = (item: ParticipantData) => {
    // Use the existing dailySubmissions from the item

    navigation.navigate('GymLeaderBoad', {
      submissions: item?.dailySubmissions,
      name: item.user?.name,
      challengeId: challengeId,
      challnge: item?.challenge,
      profileImage: item.user?.profileImage,
      participantData: item,
    });
  };

  const renderParticipantItem = ({
    item,
    index,
  }: {
    item: ParticipantData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={[styles.leaderboardCard, {backgroundColor: cardBackgroundColor}]}
        onPress={() => handleParticipantPress(item)}
        activeOpacity={0.7}>
        {/* <View style={styles.rankContainer}>
        <Text style={[styles.rankText, {color: getRankColor(index)}]}>
          {getRankIcon(index)}
        </Text>
      </View> */}

        <View style={styles.profileContainer}>
          {item.user?.profileImage ? (
            <Image
              source={
                item.user?.profileImage
                  ? {uri: item?.user?.profileImage}
                  : IMAGES.profileImage
              }
              style={styles.leaderboardProfileImage}
            />
          ) : (
            <View
              style={[
                styles.leaderboardProfileImage,
                {
                  backgroundColor: Colors.gray,
                  borderColor: 'transparent',
                },
              ]}
            />
          )}

          <View style={styles.leaderboardDetails}>
            <Text style={[styles.leaderboardName, {color: textColor}]}>
              {item.user?.name}
            </Text>
            <Text style={[styles.leaderboardEmail, {color: Colors.gray}]}>
              {item.user?.email || ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <BackHeader
          title={t('Leaderboard')}
          onBackPress={() => navigation.goBack()}
          showBackIcon={true}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
          <Text style={[styles.loadingText, {color: textColor}]}>
            {t('Loading participants...')}
          </Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <BackHeader
          title={t('Leaderboard')}
          onBackPress={() => navigation.goBack()}
          showBackIcon={true}
        />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, {color: Colors.red}]}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchParticipants}>
            <Text
              style={[styles.retryButtonText, {color: Colors.primaryColor}]}>
              {t('Retry')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const allParticipants = getAllParticipants();
  const ItemSeparator = () => (
    <View style={[styles.itemSeparator, {backgroundColor: separatorColor}]} />
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('Leaderboard')}
        onBackPress={() => navigation.goBack()}
        showBackIcon={true}
      />

      {/* Participants List */}
      <FlatList
        data={allParticipants}
        renderItem={renderParticipantItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, {color: textColor}]}>
              {t('No participants found')}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistBold,
  },

  listContainer: {
    padding: 16,
  },
  itemSeparator: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 8,
  },
  leaderboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    // marginBottom: 12,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 18,
    fontFamily: fonts.UrbanistBold,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leaderboardProfileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  leaderboardDetails: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontFamily: fonts.UrbanistBold,
    marginBottom: 2,
  },
  leaderboardEmail: {
    fontSize: 12,
    fontFamily: fonts.UrbanistMedium,
    opacity: 0.7,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistBold,
    marginBottom: 4,
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  statusIndicatorText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: fonts.UrbanistBold,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
    textAlign: 'center',
  },
});

export default Participants;
