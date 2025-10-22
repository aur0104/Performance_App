import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import BackHeader from '../../../components/BackHeader';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import InputField from '../../../components/CustomInputField';
import fonts from '../../../utils/Fonts';
import CustomButton from '../../../components/CustomButton';
import {addMembersInCommunity, getGymMembers} from '../../../services/calls';
import utils from '../../../utils/utils';

interface SearchProps {
  navigation?: any;
  route?: any;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_SIZE = (SCREEN_WIDTH - 48) / 3;
const numColumns = 3;
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

const SearchMembers: React.FC<SearchProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);
  const communityMembers = route?.params?.gymMembers;
  const communityId = route?.params?.communityId;
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.white : Colors.black;
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[] | []>([]);
  // const filteredMembers = members.filter((member: Member) =>
  //   member?.user?.name.includes(searchQuery.toLowerCase()),
  // );
  const [filteredMembers, setFilteredMembers] = useState<Member[] | []>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        // Get gym ID from user data - assuming it's stored in user.gym._id or user._id
        const gymId = user?.gym?._id;
        const response = await getGymMembers(gymId);
        if (response?.data?.gymMembers) {
          const communityUserIds = communityMembers.map(
            (member: Member) => member.user._id,
          );
          // Filter out gym members that are already in the community
          const filteredGymMembers = response?.data?.gymMembers?.filter(
            (gymMember: Member) =>
              !communityUserIds.includes(gymMember?.user?._id),
          );

          setMembers(filteredGymMembers);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error('Error fetching members:', err);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [communityId]);
  // Function to handle member selection/deselection
  const handleMemberPress = (member: Member) => {
    setSelectedMembers(prevSelected => {
      const isAlreadySelected = prevSelected.some(
        selected => selected._id === member._id,
      );

      if (isAlreadySelected) {
        // Deselect member
        return prevSelected.filter(selected => selected._id !== member._id);
      } else {
        // Select member
        return [...prevSelected, member];
      }
    });
  };
  // Check if a member is selected
  const isMemberSelected = (memberId: string) => {
    return selectedMembers.some(member => member._id === memberId);
  };
  const renderMember = ({item}: {item: Member}) => {
    const isSelected = isMemberSelected(item._id);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleMemberPress(item)}
        style={{
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 8,
          width: ITEM_SIZE,
          borderRadius: 12,
          paddingVertical: 12,
          marginLeft: 4,
        }}>
        <View>
          {item?.user?.profileImage ? (
            <Image
              source={{uri: item?.user?.profileImage}}
              style={{
                width: 95,
                height: 95,
                borderRadius: 49,
                borderWidth: 1.6,
                borderColor: borderColor,
                marginBottom: 10,
              }}
            />
          ) : (
            <View
              style={{
                width: 95,
                height: 95,
                borderRadius: 49,
                borderWidth: 1.6,
                borderColor: borderColor,
                marginBottom: 10,
                backgroundColor: Colors.gray,
              }}
            />
          )}

          {isSelected && (
            <View
              style={{
                position: 'absolute',
                top: 6,
                right: 0,
                width: 28,
                height: 28,
                borderRadius: 17,
                backgroundColor: Colors.primaryColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 16,
                  fontFamily: fonts.UrbanistBold,
                }}>
                ✓
              </Text>
            </View>
          )}
        </View>
        <Text
          style={{
            color: textColor,
            fontSize: 18,
            fontFamily: fonts.UrbanistSemiBold,
          }}>
          {item?.user?.name}
        </Text>
        <Text
          style={{
            color: textColor,
            fontSize: 12,
            marginTop: 4,
            fontFamily: fonts.UrbanistMedium,
          }}>
          {item?.user?.role}
        </Text>
      </TouchableOpacity>
    );
  };
  const saveMembers = async () => {
    try {
      const membersIds = selectedMembers.map((item: Member) => {
        return item?.user?._id;
      });
      let body = {
        members: membersIds,
      };
      const response = await addMembersInCommunity(communityId, body);
      if (response?.status === 201 || response.status === 200) {
        navigation.navigate('AddedSuccess');
      }
      //  const result=await
    } catch (error) {
      utils.errorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader
        showBackIcon
        title={t('Add Member')}
        containerStyle={{marginBottom: 0}}
      />
      {members?.length ? (
        <InputField
          label=""
          value={searchQuery}
          onChangeText={text => {
            try {
              setSearchQuery(text);
              if (text.length > 0) {
                const filteredData = members.filter((member: Member) =>
                  member?.user?.name.toLowerCase().includes(text.toLowerCase()),
                );
                setFilteredMembers(filteredData);
              } else {
                setFilteredMembers([]); // Clear filtered results when search is empty
              }
            } catch (error) {
              console.error('Search error:', error);
              setFilteredMembers([]);
            }
          }}
          placeholder="Search"
          containerStyle={{
            marginHorizontal: 20,
            borderWidth: searchQuery.length > 0 ? 1 : 0,
            borderColor: borderColor,
          }}
        />
      ) : null}
      {searchQuery.length > 0 ? (
        <FlatList
          data={filteredMembers}
          numColumns={numColumns}
          key={`members_${numColumns}_columns`}
          keyExtractor={item => item._id}
          renderItem={renderMember}
          contentContainerStyle={{padding: 8, paddingBottom: 24, flexGrow: 1}}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={members} // Show all members when not searching
          numColumns={numColumns}
          key={`members_${numColumns}_columns`}
          keyExtractor={item => item._id}
          renderItem={renderMember}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {loading ? (
                  <ActivityIndicator
                    color={isDarkMode ? Colors.white : Colors.black}
                  />
                ) : (
                  <Text
                    style={{
                      color: isDarkMode ? Colors.white : Colors.black,
                      fontSize: 16,
                      fontFamily: fonts.UrbanistBold,
                    }}>
                    No Members Found
                  </Text>
                )}
              </View>
            );
          }}
          contentContainerStyle={{padding: 8, paddingBottom: 24, flexGrow: 1}}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          left: 20,
          right: 20,
        }}>
        <CustomButton
          onPress={saveMembers}
          disable={!selectedMembers?.length || loading}
          loading={loading}>
          {t('Save')}
        </CustomButton>
      </View>
    </View>
  );
};

export default SearchMembers;
