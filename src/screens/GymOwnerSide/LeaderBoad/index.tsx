import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import BackHeader from '../../../components/BackHeader';
import {ChallengeStatus} from '../../../utils/enum';
import utils from '../../../utils/utils';

interface LeaderBoadProps {
  navigation?: any;
  route?: any;
}
interface Challenge {
  __v: number;
  _id: string;
  community: string;
  completionCount: string; // e.g. "loggedSession"
  createdAt: string; // ISO Date string
  createdBy: string;
  duration: string; // e.g. "14 days"
  endDate: string; // ISO Date string
  mediaUrl: string;
  name: string;
  participants: Participant[];
  sessionGoals: string; // e.g. "3"
  type: string;
  updatedAt: string; // ISO Date string
}

interface Participant {
  _id: string;
}
interface Submission {
  _id: string;
  createdAt: string;
  date: string;
  mediaUrl: string;
  note: string;
  ownerApprovalStatus: ChallengeStatus;
  reps: string;
  time: string;
  updatedAt: string;
}

interface MemberData {
  name: string;
  profileImage: string | undefined;
  challenge: Challenge;
}
interface ISubmission extends MemberData {
  _id: string;
  createdAt: string; // ISO date string
  date: string; // ISO date string
  mediaUrl: string;
  note: string;
  ownerApprovalStatus: 'pending' | 'accepted' | 'rejected';
  reps: string;
  time: string;
  updatedAt: string; // ISO date string
}
const GymLeaderBoad: React.FC<LeaderBoadProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const borderColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#797979' : '#424242';
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [selectedTab, setSelectedTab] = useState<
    'Submitted' | 'Completed' | 'Rejected'
  >('Submitted');

  const [membersData, setMembersData] = useState<ISubmission[]>([]);
  const {participantData} = route?.params;
  console.log('Item here ', JSON.stringify(participantData));
  const status = participantData?.status;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get data from route params - format: {name: "Masood", submissions: [...]}
    const routeParams = route?.params;

    if (routeParams && routeParams.name && routeParams.submissions) {
      const updatedData = routeParams.submissions.map((item: ISubmission) => {
        return {
          ...item,
          name: routeParams.name,
          challenge: routeParams?.challnge,
          profileImage: routeParams?.profileImage,
        };
      });
      setMembersData(updatedData);
      // Convert single member object to array format
      // setMembersData([
      //   {
      //     name: routeParams.name,
      //     submissions: routeParams.submissions,
      //     challenge: routeParams?.challnge,
      //     profileImage: routeParams?.profileImage,
      //   },
      // ]);
    } else {
      // Fallback to empty array if no data
      setMembersData([]);
    }
  }, [route?.params]);

  const getCurrentData = () => {
    return membersData.filter(member => {
      if (!member) return false;
      switch (selectedTab) {
        case 'Submitted':
          return (
            member.ownerApprovalStatus === ChallengeStatus.Pending &&
            status == 'active'
          );
        case 'Completed':
          return member.ownerApprovalStatus === ChallengeStatus.Accepted;
        case 'Rejected':
          return member.ownerApprovalStatus === ChallengeStatus.Rejected;
        default:
          return false;
      }
    });
  };

  const renderItem = ({item, index}: {item: ISubmission; index: number}) => {
    const isCompleted = selectedTab === 'Completed';
    const isRejected = selectedTab === 'Rejected';
    // Calculate progress based on submissions
    const totalDays = item?.challenge?.duration?.length
      ? utils.convertToDays(item?.challenge?.duration)
      : 0; // Assuming 7-day challenge
    const completedDays = membersData?.filter(
      (item: ISubmission) =>
        item.ownerApprovalStatus === ChallengeStatus.Accepted,
    )?.length;
    const progress = isCompleted
      ? 100
      : Math.round((completedDays / totalDays) * 100);

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Submission', {
            chalId: participantData?._id,
            userChallenge: {
              user: {name: item.name},
              dailySubmissions: [item],
              _id: item._id,
              challenge: item?.challenge,
            },
          });
        }}
        style={[styles.memberContainer, {backgroundColor}]}>
        <View style={styles.leftRow}>
          <View style={styles.profileWrapper}>
            {item?.profileImage ? (
              <Image
                source={{
                  uri: item?.profileImage,
                }}
                style={styles.profileImage}
              />
            ) : (
              <View
                style={[
                  styles.profileImage,
                  {
                    backgroundColor: Colors.gray,
                    borderColor: 'transparent',
                  },
                ]}
              />
            )}
          </View>
          <View style={styles.memberTextInfo}>
            <Text style={[styles.nameText, {color: textColor}]}>
              {item?.name}
            </Text>

            <View style={styles.sportRow}>
              <Text style={[styles.sportText, {color: textColor}]}>
                {item?.challenge?.name}
              </Text>

              {isCompleted ? (
                <Text
                  style={[
                    styles.completeText,
                    {color: Colors.green, marginLeft: 10},
                  ]}>
                  100% Complete
                </Text>
              ) : isRejected ? (
                <Text
                  style={[
                    styles.completeText,
                    {color: Colors.red, marginLeft: 10},
                  ]}>
                  Rejected
                </Text>
              ) : (
                <View style={styles.progressTextRow}>
                  <View
                    style={[
                      styles.vertSeparator,
                      {backgroundColor: separatorColor},
                    ]}
                  />
                  <Text style={[styles.progressText, {color: textColor}]}>
                    {progress}%
                  </Text>
                </View>
              )}
            </View>

            <View
              style={[
                styles.progressBarContainer,
                {backgroundColor: borderColor},
              ]}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: isCompleted ? 300 : (300 * progress) / 100,
                    backgroundColor: isCompleted
                      ? Colors.green
                      : isRejected
                      ? Colors.red
                      : Colors.primaryColor,
                  },
                ]}
              />
            </View>
          </View>
        </View>
        {index < getCurrentData().length - 1 && (
          <View
            style={[
              styles.horizontalSeparator,
              {backgroundColor: separatorColor},
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={[{flex: 1, backgroundColor}]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Leaderboard')} showBackIcon />

        <View style={[styles.toggleContainer, {backgroundColor: borderColor}]}>
          {['Submitted', 'Completed', 'Rejected'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab as any)}
              style={[
                styles.toggleButton,
                {
                  backgroundColor:
                    selectedTab === tab ? Colors.primaryColor : borderColor,
                },
              ]}>
              <Text
                style={{
                  color: selectedTab === tab ? Colors.white : textColor,
                }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 50,
            }}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
            <Text style={[{color: textColor, marginTop: 10}]}>
              Loading members...
            </Text>
          </View>
        ) : (
          <FlatList
            data={getCurrentData()}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={{paddingHorizontal: 16, paddingTop: 20}}
            scrollEnabled={false}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 50,
                }}>
                <Text style={[{color: textColor2, textAlign: 'center'}]}>
                  No {selectedTab.toLowerCase()} members found
                </Text>
              </View>
            }
          />
        )}
      </ScrollView>
    </View>
  );
};

export default GymLeaderBoad;
