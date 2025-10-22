import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../../utils/Colors';
import AnySvg from '../../../../components/AnySvg';
import styles from '../../CommunityMember/styles';
import BackHeader from '../../../../components/BackHeader';
import {getFriendsList, getTwoUserMessages} from '../../../../services/calls';

interface MyFriendsProps {
  navigation?: any;
}

interface FriendData {
  id: string | number;
  name: string;
  profileImage: any;
  sport: string;
  level: string;
  isBJJ: boolean;
  isFriend: boolean;
  isRequest: boolean;
}

const MyFriends: React.FC<MyFriendsProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'friends' | 'requests'>(
    'friends',
  );
  const [friendsData, setFriendsData] = useState<FriendData[]>([]);
  const [requestsData, setRequestsData] = useState<FriendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user.user);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';
  const primaryColor = Colors.primaryColor;

  // Fetch friends data on component mount
  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        setLoading(true);
        setError('');

        // Get user ID from Redux store
        const userId = user?.user?._id || user?._id;

        if (!userId) {
          setError('User not logged in. Please log in to view friends.');
          setLoading(false);
          return;
        }

        const response = await getFriendsList(userId);
        // Extract friends and requests from the response
        // Assuming the API response has a structure like { friends: [], friendRequests: [] }
        if (response.status == 200) {
          const profileData = response.data;

          // Map friends data to match component structure
          const friends = profileData?.user?.friends || [];
          const requests = profileData?.requests || [];
          const mappedFriends = friends.map((friend: any, index: number) => ({
            id: friend._id || index,
            name: friend.name,
            profileImage:
              friend.profileImage || friend.profilePicture
                ? {uri: friend.profileImage || friend.profilePicture}
                : require('../../../../assets/images/profileImage.png'),
            sport:
              friend.sport || friend.sportsInterest?.[0]?.name || 'General',
            level: friend.level || 'Beginner',
            isBJJ: friend.sport === 'BJJ' || false,
            isFriend: true,
            isRequest: false,
          }));

          const mappedRequests = requests.map(
            (request: any, index: number) => ({
              id: request._id || index,
              name:
                request.name ||
                request.firstName + ' ' + request.lastName ||
                'Unknown',
              profileImage:
                request.profileImage || request.profilePicture
                  ? {uri: request.profileImage || request.profilePicture}
                  : require('../../../../assets/images/profileImage.png'),
              sport:
                request.sport || request.sportsInterest?.[0]?.name || 'General',
              level: request.level || 'Beginner',
              isBJJ: request.sport === 'BJJ' || false,
              isFriend: false,
              isRequest: true,
            }),
          );

          setFriendsData(mappedFriends);
          setRequestsData(mappedRequests);
        }
      } catch (err: any) {
        console.error('Error fetching friends:', err);
        setError(err.message || 'Failed to fetch friends data');
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsData();
  }, []);

  const handleAcceptRequest = (item: FriendData) => {
    setRequestsData(prev => {
      const updated = prev.filter(user => user.id !== item.id);
      return updated;
    });

    setFriendsData(prev => [
      ...prev,
      {...item, isFriend: true, isRequest: false},
    ]);

    setSelectedTab('friends');
  };

  const handleRejectRequest = (item: FriendData) => {
    setRequestsData(prev => prev.filter(user => user.id !== item.id));
  };

  const handleMessagePress = async (friendItem: FriendData) => {
    try {
      // Get current user ID
      const currentUserId = user?.user?._id || user?._id;
      const friendUserId = friendItem.id;
      if (!currentUserId || !friendUserId) {
        console.error('Missing user IDs for chat');
        return;
      }

      // Call the chat API
      const response = await getTwoUserMessages(
        currentUserId,
        friendUserId.toString(),
      );
      // Navigate to chat screen after successful API call
      navigation.navigate('CommunityChat', {
        userId: currentUserId,
        friendId: friendUserId,
        friendName: friendItem.name,
        chatData: response.data,
      });
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const renderItem = ({item, index}: any) => {
    const currentData = selectedTab === 'friends' ? friendsData : requestsData;
    return (
      <View>
        <View style={[styles.memberContainer, {backgroundColor}]}>
          <View style={styles.leftRow}>
            <View style={styles.profileWrapper}>
              <Image source={item.profileImage} style={styles.profileImage} />
              {item.isBJJ && (
                <View style={styles.beltIconWrapper}>
                  <AnySvg name="madel" size={18} />
                </View>
              )}
            </View>
            <View style={styles.memberTextInfo}>
              <Text style={[styles.nameText, {color: textColor}]}>
                {item.name}
              </Text>
              <View style={styles.sportRow}>
                <Text style={[styles.sportText, {color: textColor}]}>
                  {item.sport}
                </Text>
                <View
                  style={[
                    styles.vertSeparator,
                    {backgroundColor: separatorColor},
                  ]}
                />
                <Text style={[styles.levelText, {color: textColor}]}>
                  {item.level}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rightButtons}>
            {selectedTab === 'friends' ? (
              <TouchableOpacity
                onPress={() => handleMessagePress(item)}
                style={[styles.iconButton, {backgroundColor: background}]}>
                <AnySvg
                  name={isDarkMode ? 'chatIcon' : 'lightChat'}
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.iconButton, {backgroundColor: background}]}
                  onPress={() => handleRejectRequest(item)}>
                  <AnySvg name="cross" width={22} height={22} />
                </TouchableOpacity>
                <View
                  style={[
                    styles.vertSeparator,
                    {backgroundColor: separatorColor, height: 30},
                  ]}
                />
                <TouchableOpacity
                  style={[styles.iconButton, {backgroundColor: background}]}
                  onPress={() => handleAcceptRequest(item)}>
                  <AnySvg name="tickIcon" width={24} height={24} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {index < currentData.length - 1 && (
          <View
            style={[
              styles.horizontalSeparator,
              {backgroundColor: separatorColor},
            ]}
          />
        )}
      </View>
    );
  };

  // Loading and error states
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BackHeader title={t('My Friends')} showBackIcon />
        <ActivityIndicator size="large" color={primaryColor} />
        <Text style={[{color: textColor, marginTop: 16}]}>
          {t('Loading friends...')}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, backgroundColor}}>
        <BackHeader title={t('My Friends')} showBackIcon />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={[{color: textColor, textAlign: 'center', marginBottom: 16}]}>
            {error}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const fetchFriendsData = async () => {
                try {
                  setLoading(true);
                  setError('');

                  const userId = user?.user?._id || user?._id;

                  if (!userId) {
                    setError(
                      'User not logged in. Please log in to view friends.',
                    );
                    setLoading(false);
                    return;
                  }

                  const response = await getFriendsList(userId);

                  if (response.data && response.data.data) {
                    const profileData = response.data.data;

                    const friends = profileData.friends || [];
                    const requests = profileData.friendRequests || [];

                    const mappedFriends = friends.map(
                      (friend: any, index: number) => ({
                        id: friend._id || index,
                        name:
                          friend.name ||
                          friend.firstName + ' ' + friend.lastName ||
                          'Unknown',
                        profileImage:
                          friend.profileImage || friend.profilePicture
                            ? {
                                uri:
                                  friend.profileImage || friend.profilePicture,
                              }
                            : require('./../../../../assets/images/profile1.png'),
                        sport:
                          friend.sport ||
                          friend.sportsInterest?.[0]?.name ||
                          'General',
                        level: friend.level || 'Beginner',
                        isBJJ: friend.sport === 'BJJ' || false,
                        isFriend: true,
                        isRequest: false,
                      }),
                    );

                    const mappedRequests = requests.map(
                      (request: any, index: number) => ({
                        id: request._id || index,
                        name:
                          request.name ||
                          request.firstName + ' ' + request.lastName ||
                          'Unknown',
                        profileImage:
                          request.profileImage || request.profilePicture
                            ? {
                                uri:
                                  request.profileImage ||
                                  request.profilePicture,
                              }
                            : require('./../../../../assets/images/profile1.png'),
                        sport:
                          request.sport ||
                          request.sportsInterest?.[0]?.name ||
                          'General',
                        level: request.level || 'Beginner',
                        isBJJ: request.sport === 'BJJ' || false,
                        isFriend: false,
                        isRequest: true,
                      }),
                    );

                    setFriendsData(mappedFriends);
                    setRequestsData(mappedRequests);
                  }
                } catch (err: any) {
                  console.error('Error fetching friends:', err);
                  setError(err.message || 'Failed to fetch friends data');
                } finally {
                  setLoading(false);
                }
              };
              fetchFriendsData();
            }}
            style={{
              backgroundColor: primaryColor,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {t('Retry')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader title={t('My Friends')} showBackIcon />

      <View style={styles.toggleRow}>
        <TouchableOpacity onPress={() => setSelectedTab('friends')}>
          <Text
            style={[
              styles.toggleText,
              {color: selectedTab === 'friends' ? primaryColor : textColor},
            ]}>
            {t('My Friends')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedTab('requests')}>
          <Text
            style={[
              styles.toggleText,
              {color: selectedTab === 'requests' ? primaryColor : textColor},
            ]}>
            {t('Requests')}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.toggleSeparator,
          {backgroundColor: separatorColor, width: '91%', alignSelf: 'center'},
        ]}
      />

      <FlatList
        data={selectedTab === 'friends' ? friendsData : requestsData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        extraData={requestsData}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}
      />
    </View>
  );
};

export default MyFriends;
