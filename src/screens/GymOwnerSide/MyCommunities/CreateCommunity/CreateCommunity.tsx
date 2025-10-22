import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import InputField from '../../../../components/CustomInputField';
import CustomButton from '../../../../components/CustomButton';
import styles from '../../AddChallenges/styles';
import {hp} from '../../../../utils/responsivesness';
import fonts from '../../../../utils/Fonts';
import MatchTypeDropdown from '../../../../components/Dropdown/MatchTypeDropdown';
import {createCommunity} from '../../../../services/calls';
import {TextInput} from 'react-native-gesture-handler';

const CreateCommunity = ({navigation}: any) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state?.user?.user);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [photo, setPhoto] = useState<any>(null);
  const matchTypeOptions = ['Public', 'Private'];
  const [matchType, setMatchType] = useState<string>('');
  const [matchTypeDropdownVisible, setMatchTypeDropdownVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result?.assets?.length) {
      setPhoto(result.assets[0]);
    }
  };

  const handleButtonClick = async () => {
    try {
      // Validate required fields
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter a community name');
        return;
      }

      if (!description.trim()) {
        Alert.alert('Error', 'Please enter a description');
        return;
      }

      if (!matchType) {
        Alert.alert('Error', 'Please select a community type');
        return;
      }

      // Get gym ID from user
      const gymId = user?.user?.gym?._id || user?.gym?._id;
      if (!gymId) {
        Alert.alert('Error', 'User information not found');
        return;
      }

      // Set loading state
      setIsLoading(true);

      // Create FormData
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('scope', matchType.toLowerCase());

      // Add image if selected
      if (photo) {
        const mimeType = photo.type || 'image/jpeg';
        const fileName = photo.fileName || `image_${Date.now()}.jpg`;

        formData.append('image', {
          uri: photo.uri,
          type: mimeType,
          name: fileName,
        } as any);
      }

      const response = await createCommunity(gymId, formData);

      if (response.status === 201 || response.status === 200) {
        // Navigate to success screen
        navigation.replace('CommunityCreated', response?.data);
      } else {
        Alert.alert('Error', 'Failed to create community. Please try again.');
      }
    } catch (error: any) {
      console.error('Error creating community:', error);
      console.error('Error response:', error?.response);
      console.error('Error response data:', error?.response?.data);
      console.error('Error status:', error?.response?.status);

      let errorMessage = '';

      errorMessage =
        error.response.data.error ||
        'Failed to create community. Please try again.';

      Alert.alert('Error', errorMessage);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('Create Community')}
        showBackIcon
        containerStyle={{marginBottom: 0}}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.heading, {color: textColor}]}>
          {t('Create Your Community')}
        </Text>
        <Text
          style={[
            styles.subHeader,
            {color: textColor, fontSize: 14, fontFamily: fonts.UrbanistRegular},
          ]}>
          {t(
            'Welcome to the heart of Prymo. Set up your community to connect athletes, coaches and gym members in one powerful space',
          )}
        </Text>
        <Text
          style={[
            styles.subHeader,
            {color: textColor, fontSize: 14, fontFamily: fonts.UrbanistRegular},
          ]}>
          {t(
            'Share training updates, track challenge progress and build momentum together.',
          )}
        </Text>
        <InputField
          label=""
          value={name}
          onChangeText={setName}
          placeholder="Community name"
        />

        <TextInput
          label=""
          // value={description}
          multiline={true}
          numberOfLines={6}
          onChangeText={setDescription}
          placeholder="Description"
          style={{
            textAlignVertical: 'top',
            marginTop: 6,
            color: textColor,
            backgroundColor: isDarkMode
              ? Colors.darkInputBg
              : Colors.lightInputBg,
            borderRadius: 10,
            padding: 10,
            // borderWidth: 1,
            // borderColor: isDarkMode
            //   ? Colors.darkInputBorder
            //   : Colors.lightInputBorder,
          }}
          containerStyle={{justifyContent: 'flex-start'}}
        />

        <MatchTypeDropdown
          options={matchTypeOptions}
          selected={matchType}
          onSelect={(selected: string) => {
            setMatchType(selected);
            setMatchTypeDropdownVisible(false);
          }}
          visible={matchTypeDropdownVisible}
          onClose={() => setMatchTypeDropdownVisible(false)}
          toggle={() => setMatchTypeDropdownVisible(prev => !prev)}
          label={t('Community Type')}
          style={{
            marginTop: hp(3.6),
            marginBottom: hp(0.2),
            marginHorizontal: 0,
          }}
        />

        <InputField
          label=""
          //value={values.photo}
          // onChangeText={handleChange('')}
          placeholder="Cover Photo"
          onRightIconClick={handleImagePick}
          iconRightName={'attachment'}
          editable={false}
        />

        {photo && (
          <View style={styles.photoRow}>
            <Image
              source={{uri: photo.uri}}
              style={styles.photoPreview}
              resizeMode="cover"
            />
          </View>
        )}
      </ScrollView>
      <CustomButton
        onPress={handleButtonClick}
        containerStyle={{marginBottom: hp(5)}}
        disable={isLoading || !name || !description || !matchType || !photo}
        loading={isLoading}>
        {t('Create My Community')}
      </CustomButton>
    </View>
  );
};

export default CreateCommunity;
