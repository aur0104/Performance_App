import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import BackHeader from '../../../components/BackHeader';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';
import {IMAGES} from '../../../assets/images';
import {getGymMembers} from '../../../services/calls';

interface TotalMemberProps {
  navigation?: any;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
}

interface Member {
  _id: string;
  user: User;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_SIZE = (SCREEN_WIDTH - 48) / 3;
const numColumns = 3;

const TotalMember: React.FC<TotalMemberProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);

  // State management
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.white : Colors.black;

  // Fetch members data
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError('');
        // Get gym ID from user data - assuming it's stored in user.gym._id or user._id
        const gymId = user?.gym?._id || '6892c12c1bc2b1bbdbdf292e';

        const response = await getGymMembers(gymId);

        if (response?.data?.gymMembers) {
          setMembers(response.data.gymMembers);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load members');
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [user]);

  const renderMember = ({item}: {item: Member}) => (
    <TouchableOpacity
      style={{
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        width: ITEM_SIZE,
        borderRadius: 12,
        paddingVertical: 12,
        marginLeft: 4,
      }}
      onPress={() => navigation.navigate('MemberDetail')}>
      <Image
        source={
          item?.user?.profileImage
            ? {uri: item?.user?.profileImage}
            : IMAGES.member1
        }
        style={{
          width: 95,
          height: 95,
          borderRadius: 49,
          borderWidth: 2,
          borderColor: borderColor,
          marginBottom: 10,
        }}
      />
      <Text
        style={{
          color: textColor,
          fontSize: 18,
          fontFamily: fonts.UrbanistSemiBold,
        }}>
        {item?.user?.name || 'Unknown'}
      </Text>
      <Text
        style={{
          color: textColor,
          fontSize: 12,
          marginTop: 4,
          fontFamily: fonts.UrbanistMedium,
        }}>
        {item?.user?.role || 'Member'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader title={t('Members')} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: textColor,
              fontSize: 18,
              fontFamily: fonts.UrbanistSemiBold,
            }}>
            {t('Total Members: ')}
          </Text>
          <Text
            style={{
              color: textColor,
              fontSize: 18,
              fontFamily: fonts.UrbanistBold,
              marginLeft: 8,
            }}>
            {members.length}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AddMember')}>
          <Text
            style={{
              color: Colors.primaryColor,
              fontSize: 16,
              fontFamily: fonts.UrbanistMedium,
              marginRight: 8,
            }}>
            Add Members +
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
          <Text style={{color: textColor, marginTop: 10}}>
            Loading members...
          </Text>
        </View>
      ) : error ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: Colors.red, fontSize: 16}}>{error}</Text>
          <TouchableOpacity
            onPress={() => {
              const fetchMembers = async () => {
                try {
                  setLoading(true);
                  setError('');
                  const gymId = user?.gym?._id || '6892c12c1bc2b1bbdbdf292e';
                  const response = await getGymMembers(gymId);
                  if (response?.data?.gymMembers) {
                    setMembers(response.data.gymMembers);
                  } else {
                    setMembers([]);
                  }
                } catch (err) {
                  console.error('Error fetching members:', err);
                  setError('Failed to load members');
                  setMembers([]);
                } finally {
                  setLoading(false);
                }
              };
              fetchMembers();
            }}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: Colors.primaryColor,
              borderRadius: 8,
            }}>
            <Text style={{color: Colors.white}}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={members}
          numColumns={numColumns}
          key={`members_${numColumns}_columns`}
          keyExtractor={item => item._id}
          renderItem={renderMember}
          contentContainerStyle={{padding: 8, paddingBottom: hp(12)}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Text style={{color: textColor, fontSize: 16}}>
                No members found
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TotalMember;
