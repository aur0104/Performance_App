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
import {useRoute} from '@react-navigation/native';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import styles from './styles';
import BackHeader from '../../../components/BackHeader';
import {getCommunityMembers, getTwoUserMessages} from '../../../services/calls';
import {IMAGES} from '../../../assets/images';
import {store} from '../../../store';
import CustomButton from '../../../components/CustomButton';

interface CommunityMemberProps {
  navigation?: any;
}

interface RouteParams {
  communityId: string;
}
const CommunityMember: React.FC<CommunityMemberProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const {communityId} = route.params as RouteParams;
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: any) => state.user.user);
  const role = user?.user?.role;
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';
  useEffect(() => {
    fetchMembers();
  }, [communityId]);

  const fetchMembers = async () => {
    if (!communityId) {
      setError('Community ID is missing');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getCommunityMembers(communityId);
      if (response.data && response.data.data) {
        setMembers(response.data.data);
      } else {
        setMembers([]);
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching community members:', err);
      setError(err.message || 'Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  // Fallback profile images for members without profile pictures
  const fallbackImages = [IMAGES.member1, IMAGES.member2, IMAGES.member3];

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View>
        <View style={[styles.memberContainer, {backgroundColor}]}>
          <View style={styles.leftRow}>
            <View style={styles.profileWrapper}>
              {item?.user?.profileImage ? (
                <Image
                  source={{uri: item?.user?.profileImage}}
                  style={styles.profileImage}
                />
              ) : (
                <View
                  style={[styles.profileImage, {backgroundColor: Colors.gray}]}
                />
              )}

              {item.isBJJ && (
                <View style={styles.beltIconWrapper}>
                  <AnySvg
                    name="beltIcon"
                    width={24}
                    height={24}
                    containerStyle={{alignSelf: 'center'}}
                  />
                </View>
              )}
            </View>
            <View style={styles.memberTextInfo}>
              <Text style={[styles.nameText, {color: textColor}]}>
                {item?.user?.name ||
                  item.user.firstName + ' ' + item.user.lastName}
              </Text>
              <View style={styles.sportRow}>
                <Text
                  style={[
                    styles.sportText,
                    {color: textColor, maxWidth: '60%'},
                  ]}>
                  {item.user?.athleteProfile?.sportsAndSkillLevels
                    ?.map(items => items?.sport?.name) // extract the `name`
                    ?.filter(Boolean) // remove undefined/null
                    ?.join(', ')}
                </Text>
                <View
                  style={[
                    styles.vertSeparator,
                    {backgroundColor: separatorColor},
                  ]}
                />
                <Text style={[styles.levelText, {color: textColor}]}>
                  {item?.user?.role || item?.user?.skillLevel || 'Beginner'}
                </Text>
              </View>
            </View>
          </View>
          {role != 'gymOwner' && (
            <View style={styles.rightButtons}>
              <TouchableOpacity
                onPress={async () => {
                  const user = store.getState().user?.user;
                  const currentUserId = user?.user?._id || user?._id;
                  const friendUserId = item?.user?._id;
                  const friendName =
                    item?.user?.name ||
                    item.user.firstName + ' ' + item.user.lastName;

                  const response = await getTwoUserMessages(
                    currentUserId,
                    friendUserId.toString(),
                  );
                  navigation.navigate('CommunityChat', {
                    userId: currentUserId,
                    friendId: friendUserId,
                    friendName: friendName,
                    chatData: response.data,
                  });
                }}
                style={[styles.iconButton, {backgroundColor: background}]}>
                <AnySvg
                  name={isDarkMode ? 'chatIcon' : 'lightChat'}
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
              <View
                style={[
                  styles.vertSeparator,
                  {backgroundColor: separatorColor, height: 30},
                ]}
              />
              <TouchableOpacity
                style={[styles.iconButton, {backgroundColor: background}]}>
                <AnySvg
                  name={isDarkMode ? 'addMember' : 'addUser'}
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={[
            styles.horizontalSeparator,
            {backgroundColor: separatorColor},
          ]}
        />
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, {color: textColor}]}>{error}</Text>
          <TouchableOpacity onPress={fetchMembers} style={styles.retryButton}>
            <Text style={styles.retryText}>{t('Retry')}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, {color: textColor}]}>
          {t('No members found')}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader title={t('Members')} showBackIcon />
      <FlatList
        data={members}
        keyExtractor={item => item._id || item.id || String(Math.random())}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12}}
        ListEmptyComponent={renderEmptyComponent}
      />
      {role === 'gymOwner' && (
        <CustomButton
          onPress={() =>
            navigation.navigate('SearchMember', {
              gymMembers: members,
              communityId,
            })
          }>
          {t('Add New Member')}
        </CustomButton>
      )}
    </View>
  );
};
export default CommunityMember;
