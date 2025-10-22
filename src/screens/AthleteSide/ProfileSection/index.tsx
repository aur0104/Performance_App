import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import AnySvg from '../../../components/AnySvg';
import {CommonActions} from '@react-navigation/native';
import {getProfile} from '../../../services/calls';
import {
  setProfile,
  setProfileLoading,
  setUser,
} from '../../../store/Slices/userSlice';

interface MyProfileProps {
  navigation?: any;
}

const profileOptions = [
  {id: '1', title: 'Journal', icon: 'directionIcon', route: 'Journals'},
  {
    id: '2',
    title: 'Feedback Requests',
    icon: 'feedback',
    route: 'RequestFeedback',
  },
  {
    id: '3',
    title: 'Training Calendar',
    icon: 'traningCalendar',
    route: 'TrainingCalendars',
  },
  {
    id: '4',
    title: 'My Friends',
    icon: 'friends',
    route: 'MyFriends',
  },
  {
    id: '5',
    title: 'Goals & Events',
    icon: 'goal',
    route: 'AttendenceGoal',
  },
  {
    id: '6',
    title: 'My Challenges',
    icon: 'challenges',
    route: 'MyChallenges',
  },
  {
    id: '7',
    title: 'Membership',
    icon: 'membership',
    route: 'Membership',
  },
  {
    id: '8',
    title: 'Settings',
    icon: 'setting',
    route: 'AthleteSettings',
  },
  {id: '9', title: 'Logout', icon: 'logout', route: 'Login'},
];

const AthleteProfile: React.FC<MyProfileProps> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const userInfo = useSelector((state: any) => state.user.user);
  const profileReducer = useSelector((state: any) => state.user.user);
  const profile = profileReducer?.user;
  const profileLoading = useSelector((state: any) => state.user.profileLoading);

  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';
  const unfilledBar = isDarkMode ? '#3A3A3A' : '#EAEAEA';
  const primaryColor = Colors.primaryColor;

  const fetchProfile = async () => {
    try {
      setLocalLoading(true);
      dispatch(setProfileLoading(true));
      setError(null);

      const response = await getProfile();

      if (response?.status === 200) {
        dispatch(setProfile(response.data));
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (err: any) {
      console.error('Profile fetch error:', err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLocalLoading(false);
      dispatch(setProfileLoading(false));
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const renderItem = ({item, index}: any) => {
    const isLastItem = index === profileOptions.length - 1;

    return (
      <TouchableOpacity
        style={[
          styles.optionRow,
          {
            backgroundColor,
            borderBottomWidth: isLastItem ? 0 : 1,
            borderColor: separaterColor,
          },
        ]}
        onPress={() => {
          if (item?.route == 'Login') {
            dispatch(setUser(null));
            navigation.dispatch(
              CommonActions.reset({
                index: 0, // Set the target screen as the first screen in the stack
                routes: [{name: 'RoleSelection'}], // Replace stack with this screen
              }),
            );
            return;
          }
          navigation.navigate(item.route);
        }}>
        <View style={styles.optionLeft}>
          <AnySvg name={item.icon} />
          <Text style={[styles.optionText, {color: textColor2}]}>
            {t(item.title)}
          </Text>
        </View>
        <AnySvg name={'farwordIcon'} width={8} height={14} />
      </TouchableOpacity>
    );
  };

  const renderProfileContent = () => {
    if (localLoading || profileLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={primaryColor} />
          <Text style={[styles.loadingText, {color: textColor2}]}>
            {t('Loading profile...')}
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, {color: 'red'}]}>{error}</Text>
          <TouchableOpacity
            onPress={fetchProfile}
            style={[styles.retryButton, {backgroundColor: primaryColor}]}>
            <Text style={styles.retryButtonText}>{t('Retry')}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Use profile data if available, fallback to userInfo
    const displayData = profile || userInfo?.user;
    const userName = displayData?.name || displayData?.firstName || 'User';
    const userLevel = displayData?.level || 'Intermediate';
    const userStatus = displayData?.status || 'Rep King/Queen';
    const progressPercentage = displayData?.progressPercentage || 50;
    const currentLevel = displayData?.currentLevel || 2;
    const nextLevel = displayData?.nextLevel || 4;

    return (
      <View style={styles.profileRow}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={
              displayData?.profileImage
                ? {uri: displayData.profileImage}
                : require('../../../assets/images/profileImage.png')
            }
            style={styles.profileImage}
          />
          <View style={styles.medalContainer}>
            <AnySvg name="madel" width={20} height={20} />
          </View>
        </View>

        <View style={styles.infoColumn}>
          <View style={styles.nameRow}>
            <Text style={[styles.nameText, {color: textColor}]}>
              {userName}
            </Text>
            <View
              style={[
                styles.verticalSeparator,
                {backgroundColor: separaterColor},
              ]}
            />
            <Text style={[styles.levelText, {color: textColor}]}>
              {userLevel}
            </Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={[styles.statusText, {color: textColor2}]}>
              {userStatus}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Badges')}>
              <Text style={styles.badgeText}>Badges</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressRow}>
            <View
              style={[
                styles.progressBarContainer,
                {backgroundColor: unfilledBar},
              ]}>
              <View
                style={[
                  styles.filledProgress,
                  {
                    backgroundColor: primaryColor,
                    width: `${progressPercentage}%`,
                  },
                ]}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.levelNumber, {color: textColor}]}>
                {currentLevel}
              </Text>
              <Text style={[styles.levelNumber, {color: textColor}]}>
                {nextLevel}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader title={t('My Profile')} containerStyle={{marginTop: 8}} />

      {renderProfileContent()}

      <FlatList
        data={profileOptions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={styles.flatListContent}
      />
    </ScrollView>
  );
};

export default AthleteProfile;
