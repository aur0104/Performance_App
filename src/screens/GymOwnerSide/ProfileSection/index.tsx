import React, {useState, useEffect} from 'react';
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
import styles from '../../AthleteSide/ProfileSection/styles';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import AnySvg from '../../../components/AnySvg';
import mime from 'mime';
import {basename} from 'react-native-path';
import {launchImageLibrary} from 'react-native-image-picker';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {getProfile, updateProfileImage} from '../../../services/calls';
import {
  setProfile,
  setProfileLoading,
  setUser,
} from '../../../store/Slices/userSlice';
import Toast from 'react-native-toast-message';
import {store} from '../../../store';

interface MyProfileProps {
  navigation?: any;
}

const OwnerProfile: React.FC<MyProfileProps> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const role = useSelector((state: any) => state.user.role);
  const profileReducer = useSelector((state: any) => state.user.user);
  const profile = profileReducer?.user;
  const profileLoading = useSelector((state: any) => state.user.profileLoading);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';

  const [profileImage, setProfileImage] = useState<any>(null);
  const isFocused = useIsFocused();

  // Fetch profile data on component mount
  useEffect(() => {
    if (isFocused) {
      fetchProfileData();
    }
  }, [isFocused]);

  const fetchProfileData = async () => {
    try {
      dispatch(setProfileLoading(true));
      const response = await getProfile();
      if (response?.status === 200) {
        dispatch(setProfile(response.data));
        // Set profile image if exists in response
        if (response.data?.profileImage) {
          setProfileImage(response.data.profileImage);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: t('Error'),
          text2: t('Failed to load profile data'),
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('Error'),
        text2: t('Failed to load profile data'),
      });
    } finally {
      dispatch(setProfileLoading(false));
    }
  };

  const profileOptions = [
    {
      id: '5',
      title: 'Class Planner',
      icon: 'planner',
      route: 'TrainingSchedule',
    },
    {id: '6', title: 'My Coaches', icon: 'addUser', route: 'MyCoaches'},
    ...(role === 'gymOwner'
      ? [
          {
            id: '7',
            title: 'Membership',
            icon: 'membership',
            route: 'Membership',
          },
        ]
      : []),
    {id: '8', title: 'Settings', icon: 'setting', route: 'OwnerSettings'},
    {id: '9', title: 'Logout', icon: 'logout', route: 'Login'},
  ];

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.7,
      },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.[0]
        ) {
          // setProfileImage(response.assets[0].uri);
          updateProfile(response.assets[0].uri);
        }
      },
    );
  };

  const updateProfile = async (imageUri: string) => {
    try {
      const userInfo = store.getState().user.user;

      // Upload profile image if one is selected

      const formData = new FormData();
      const mimeType = mime.getType(imageUri) || 'application/octet-stream'; // Default if MIME type not found
      const fileName = basename(imageUri);
      formData.append('profile', {
        uri: imageUri,
        type: mimeType,
        name: fileName,
      } as any);

      const response = await updateProfileImage(userInfo?.user?._id, formData);
      if (response?.status === 200) {
        fetchProfileData();
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      // Still navigate even if image upload fails
      Toast.show({
        type: 'error',
        text1: t('Error uploading profile image'),
      });
    }
  };

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
            store?.dispatch(setUser(null));
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
          <Text style={[styles.optionText, {color: textColor}]}>
            {t(item.title)}
          </Text>
        </View>
        <AnySvg name={'farwordIcon'} width={8} height={14} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader title={t('My Profile')} />

      <View style={styles.profileRow}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={
              profileImage || profile?.profileImage
                ? {uri: profileImage || profile?.profileImage}
                : require('../../../assets/images/profileImage.png')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={[
              styles.medalContainer,
              {borderWidth: 1, borderColor: Colors.gray},
            ]}
            onPress={handleSelectImage}>
            <AnySvg name="camera" width={18} height={18} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoColumn}>
          <View style={styles.nameRow}>
            <Text style={[styles.nameText, {color: textColor}]}>
              {profile?.name || profile?.gymName || 'Avs Training Center'}
            </Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={[styles.statusText, {color: textColor2}]}>
              {profile?.email || 'Info@davidscout.com'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('OwnerAccount')}>
            <Text style={[styles.statusText, {color: Colors.white}]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={profileOptions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={[styles.flatListContent, {marginTop: 12}]}
      />

      {profileLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator
            size={60}
            color={isDarkMode ? Colors.white : Colors.primaryColor}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default OwnerProfile;
