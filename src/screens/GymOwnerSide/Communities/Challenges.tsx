import React, {useState, useEffect} from 'react';
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
import styles from '../../AthleteSide/CommunityDetail/ChallengesStyles';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import {hp} from '../../../utils/responsivesness';
import {getChallenges} from '../../../services/calls';
import {challengeData} from '../../../utils/DummyData';

interface ChallengesProps {
  communityId?: string;
}

interface Challenge {
  _id: string;
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  subtitle?: string;
  image?: string;
  mediaUrl?: string;
  type?: {
    _id: string;
    name: string;
    image?: string;
  };
  exercise?: {
    _id: string;
    name: string;
  };
  format?: {
    _id: string;
    name: string;
  };
  frequency?: string;
  time?: string;
  requiredVideo?: boolean;
  progress?: number;
  total?: number;
  daysLeft?: string | null;
  participants?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: any;
  community?: string;
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

const Challenges: React.FC<ChallengesProps> = ({communityId}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
  }, [communityId]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {
        community: communityId,
      };

      const response = await getChallenges(params);

      if (response?.status === 200) {
        let newChallenges = [];

        // Try different response structures
        if (response?.data?.challenges) {
          newChallenges = response.data.challenges;
        } else if (response?.data?.data) {
          newChallenges = response.data.data;
        } else if (Array.isArray(response?.data)) {
          newChallenges = response.data;
        } else {
          newChallenges = [];
        }

        if (Array.isArray(newChallenges)) {
          setChallenges(newChallenges);
          setUseDummyData(false);
        } else {
          setChallenges([]);
          setUseDummyData(false);
        }
      } else {
        setChallenges([]);
        setUseDummyData(false);
        throw new Error('No challenges available');
      }
    } catch (err: any) {
      console.error('Error fetching gym challenges:', err);
      console.error('Error details:', {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
        code: err?.code,
      });

      // Only use dummy data for network/API errors, not for empty responses
      if (err?.message !== 'No challenges available') {
        const dummyChallenges: Challenge[] = challengeData.map(
          (challenge: DummyChallenge) => ({
            _id: challenge.id.toString(),
            title: challenge.title,
            subtitle: challenge.subtitle,
            image: challenge.image,
            type: challenge.subtitle,
            progress: challenge.progress,
            total: challenge.total,
            daysLeft: challenge.daysLeft,
            status: challenge.status,
          }),
        );
        setChallenges(dummyChallenges);
        setUseDummyData(true);
        setError('');
      } else {
        // Show empty state for empty responses
        setChallenges([]);
        setUseDummyData(false);
        setError('');
      }
    } finally {
      setLoading(false);
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
        Create your first challenge!
      </Text>
    </View>
  );

  const renderItem = ({item, index}: {item: Challenge; index: number}) => {
    const isEven = index % 2 === 1;

    const profileImages = [
      IMAGES.community1,
      IMAGES.community2,
      IMAGES.community3,
    ];

    // Calculate progress percentage
    const getProgressPercentage = () => {
      if (item.progress && item.total) {
        return Math.min((item.progress / item.total) * 100, 100);
      }
      return 0;
    };

    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(item);
          //  return;
          (navigation as any).navigate('GymChallengeDetail', {
            id: item._id,
            challengeData: item,
          });
        }}
        style={[styles.cardContainer, isEven && {backgroundColor: viewBg}]}>
        <Image
          source={
            item.mediaUrl && typeof item.mediaUrl === 'string'
              ? {uri: item.mediaUrl}
              : item.image && typeof item.image === 'string'
              ? {uri: item.image}
              : item.type?.image && typeof item.type?.image === 'string'
              ? {uri: item.type?.image}
              : item.image || IMAGES.challenge1
          }
          style={styles.challengeImage}
        />
        <View style={styles.contentContainer}>
          <Text style={[styles.title, {color: textColor}]}>
            {String(item.name || item.title || 'Challenge Title')}
          </Text>
          <Text style={[styles.subtitle, {color: textColor}]}>
            {String(
              `${item.type?.name || 'Challenge'} • ${
                item.exercise?.name || item.format?.name || ''
              } • ${item.time || ''} • ${item.frequency || ''}`
                .replace(/\s*•\s*$/, '')
                .replace(/\s*•\s*•\s*/g, ' • '),
            )}
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
              {String(item.progress || 0)}/{String(item.total || 100)}
            </Text>
          </View>

          <View style={styles.avatarGroup}>
            {item.participants?.length > 0
              ? item.participants.map((imageSource, index) => {
                  console.log('Participants', imageSource?.profileImage);
                  if (!imageSource?.profileImage)
                    return (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('CommunityMember')}
                        style={{
                          borderRadius: 100,
                          width: 30,
                          height: 30,
                          backgroundColor: Colors.gray,
                        }}
                      />
                    );
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.avatarWrapper,
                        {zIndex: profileImages.length - index},
                      ]}
                      onPress={() => navigation.navigate('CommunityMember')}>
                      <Image
                        source={{uri: imageSource?.profileImage}}
                        style={styles.avatarImage}
                      />
                    </TouchableOpacity>
                  );
                })
              : null}
            <Text
              style={[
                styles.subtitle,
                {color: textColor, top: 4, marginLeft: 4, fontSize: 13},
              ]}>
              {String(item.participants?.length || 0)} Members participated
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return renderLoading();
  }

  if (error && !useDummyData) {
    return renderError();
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={challenges}
        keyExtractor={(item, index) =>
          item._id || item.id?.toString() || index.toString()
        }
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: hp(10) + 80,
          backgroundColor,
        }}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

export default Challenges;
