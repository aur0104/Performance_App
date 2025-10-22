import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import BackHeader from '../../../components/BackHeader';
import {challengeData} from '../../../utils/DummyData';
import {IMAGES} from '../../../assets/images';
import {getUserChallengesByUser} from '../../../services/calls';
import Toast from 'react-native-toast-message';
import {useIsFocused} from '@react-navigation/native';
import utils from '../../../utils/utils';

interface MyChallengesProps {
  navigation?: any;
}

const MyChallenges: React.FC<MyChallengesProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : Colors.gray;

  const [selectedTab, setSelectedTab] = useState<
    'active' | 'completed' | 'incomplete' | 'cancelled'
  >('active');
  const [loading, setLoading] = useState<boolean>(true);
  const [challengesData, setChallengesData] = useState<{
    active: any[];
    completed: any[];
    incomplete: any[];
    cancelled: any[];
  }>({active: [], completed: [], incomplete: [], cancelled: []});

  const tabOptions = [
    {key: 'active', label: t('Active Challenges')},
    {key: 'completed', label: t('Completed')},
    {key: 'incomplete', label: t('Incomplete')},
    {key: 'cancelled', label: t('Cancelled')},
  ];

  // Fetch challenges data
  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const userId = user?.user?._id || user?._id;
      if (!userId) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User not found. Please login again.',
        });
        return;
      }
      const response = await getUserChallengesByUser(userId);
      if (response.data?.data) {
        setChallengesData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch challenges. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) fetchChallenges();
  }, [isFocused]);

  const filteredData = challengesData[selectedTab] || [];
  const renderItem = ({item, index}: any) => {
    const isEven = index % 2 === 1;
    const statusColor =
      item.status === 'active'
        ? Colors.primaryColor
        : item.status === 'completed'
        ? Colors.green
        : item.status === 'incomplete'
        ? Colors.Yellow
        : Colors.red;

    const handlePress = () => {
      const challengeData = {
        challengeId: item._id,
        challenge: item.challenge,
        userChallenge: item,
        status: item.status,
        dailySubmissions: item?.dailySubmissions ?? [],
      };
      navigation.navigate('MyChallengeDetail', challengeData);
    };

    const profileImages = [
      IMAGES.community1,
      IMAGES.community2,
      IMAGES.community3,
    ];

    // Get challenge data from API response
    const challengeInfo = item.challenge;
    const challengeName = challengeInfo?.name;
    const challengeImage = challengeInfo?.mediaUrl
      ? {uri: challengeInfo.mediaUrl}
      : IMAGES.splashImg;
    const participantsCount = challengeInfo?.participants?.length || 0;
    const completedSubmissions = item.dailySubmissions?.length || 0;
    const totalDays = utils.convertToDays(challengeInfo?.duration);
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.cardContainer, isEven && {backgroundColor: viewBg}]}>
        <Image source={challengeImage} style={styles.challengeImage} />
        <View style={styles.contentContainer}>
          <Text style={[styles.title, {color: textColor}]}>
            {challengeName}
          </Text>
          <Text style={[styles.subtitle, {color: textColor}]}>
            {`${totalDays?.toString()} Days`}
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
                  {width: `${(completedSubmissions / totalDays) * 100}%`},
                ]}
              />
            </View>
            <Text style={[styles.progressText, {color: textColor}]}>
              {completedSubmissions}/{totalDays}
            </Text>
          </View>

          <View style={styles.footerRow}>
            {item.status === 'active' ? (
              <View style={styles.avatarGroup}>
                {challengeInfo?.participants
                  ?.slice(0, 3)
                  .map((participant: any, index: number) => (
                    <>
                      {participant.profileImage ? (
                        <TouchableOpacity
                          key={participant._id || index}
                          style={[styles.avatarWrapper, {zIndex: 3 - index}]}
                          onPress={() =>
                            navigation.navigate('CommunityMember')
                          }>
                          <Image
                            source={
                              participant.profileImage
                                ? {uri: participant.profileImage}
                                : IMAGES.community1
                            }
                            style={styles.avatarImage}
                          />
                        </TouchableOpacity>
                      ) : (
                        <View
                          style={{
                            borderRadius: 100,
                            width: 30,
                            height: 30,
                            backgroundColor: Colors.gray,
                          }}
                        />
                      )}
                    </>
                  ))}
                <Text
                  style={[
                    styles.subtitle,
                    {color: textColor, top: 4, marginLeft: 4, fontSize: 13},
                  ]}>
                  {participantsCount} Members participates
                </Text>
              </View>
            ) : (
              <Text style={[styles.statusText, {color: statusColor}]}>
                {t(item.status.charAt(0).toUpperCase() + item.status.slice(1))}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader title={t('My Challenges')} showBackIcon />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 0}}>
          <View style={[styles.tabRow, {borderBottomColor: separaterColor}]}>
            {tabOptions.map(tab => {
              const isSelected = selectedTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={styles.tabButton}
                  onPress={() => setSelectedTab(tab.key as any)}>
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: isSelected
                          ? Colors.primaryColor
                          : separaterColor,
                      },
                    ]}>
                    {tab.label}
                  </Text>
                  <View
                    style={[
                      styles.underline,
                      {
                        backgroundColor: isSelected
                          ? Colors.primaryColor
                          : 'transparent',
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
          <Text style={[{color: textColor, marginTop: 10}]}>
            {t('Loading challenges...')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item._id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{padding: 16}}
          ListEmptyComponent={
            <Text
              style={{color: textColor, textAlign: 'center', marginTop: 20}}>
              {t('No challenges found')}
            </Text>
          }
        />
      )}
    </View>
  );
};

export default MyChallenges;
