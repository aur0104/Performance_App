import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
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
import DeletePopupModal from '../../../../components/DeleteModal';
import fonts from '../../../../utils/Fonts';
import MatchTypeDropdown from '../../../../components/Dropdown/MatchTypeDropdown';
import {updateCommunity, deleteCommunity} from '../../../../services/calls';
import Toast from 'react-native-toast-message';

const EditCommunity = ({navigation, route}: any) => {
  const {t} = useTranslation();
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  // Get community data from navigation params
  const communityData = route?.params?.communityData || {};
  const [values, setValues] = useState({
    name: communityData.name || '',
    description: communityData.description || '',
  });
  const matchTypeOptions = ['Public', 'Private'];
  const [matchType, setMatchType] = useState<string>(
    communityData.scope || 'Public',
  );
  const [matchTypeDropdownVisible, setMatchTypeDropdownVisible] =
    useState(false);

  const [photo, setPhoto] = useState<any>(null);
  const [existingImage, setExistingImage] = useState(
    communityData.image || null,
  );

  // Update form data when communityData changes
  useEffect(() => {
    if (communityData && Object.keys(communityData).length > 0) {
      setValues({
        name: communityData.name || '',
        description: communityData.description || '',
      });
      setMatchType(communityData.scope || 'Public');
      setExistingImage(communityData.image || null);
    }
  }, [communityData]);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result?.assets?.length) {
      setPhoto(result.assets[0]);
    }
  };

  // Memoize the handler to prevent unnecessary re-renders
  const handleChange = useCallback(
    (field: string) => (text: string) => {
      setValues(prevValues => ({...prevValues, [field]: text}));
    },
    [],
  );

  const handleUpdateCommunity = async () => {
    if (!communityData._id) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Community data not found. Please try again.',
      });
      return;
    }

    if (!values.name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter community name',
      });
      return;
    }

    if (!values.description.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter community description',
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', values.name.trim());
      formData.append('description', values.description.trim());
      formData.append('scope', matchType.toLowerCase());

      // Add image if a new one is selected
      if (photo) {
        formData.append('image', {
          uri: photo.uri,
          type: photo.type || 'image/jpeg',
          name: photo.fileName || `community_${Date.now()}.jpg`,
        } as any);
      }

      const response = await updateCommunity(communityData._id, formData);

      if (response.data) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Community updated successfully',
        });
        navigation.goBack();
      }
    } catch (error: any) {
      console.log('Update community error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.error || 'Failed to update community',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCommunity = async () => {
    if (!communityData._id) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Community data not found. Please try again.',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await deleteCommunity(communityData._id);

      if (response.data) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Community deleted successfully',
        });
        navigation.goBack();
      }
    } catch (error: any) {
      console.log('Delete community error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.error || 'Failed to delete community',
      });
    } finally {
      setLoading(false);
      setShowDelete(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('Edit Community')}
        showBackIcon
        containerStyle={{marginBottom: 0}}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.heading, {color: textColor}]}>
          {t('Edit Community')}
        </Text>
        <Text
          style={[
            styles.subHeader,
            {color: textColor, fontSize: 14, fontFamily: fonts.UrbanistRegular},
          ]}>
          {t(
            'Update your community details to keep it fresh and engaging for your members.',
          )}
        </Text>
        <InputField
          label=""
          value={values.name}
          onChangeText={handleChange('name')}
          placeholder="Community name"
        />

        <InputField
          label=""
          value={values.description}
          multiline={true}
          numberOfLines={6}
          onChangeText={handleChange('description')}
          placeholder="Description"
          style={{color: textColor}}
          containerStyle={{justifyContent: 'flex-start'}}
          textAlignVertical="top"
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

        {(photo || existingImage) && (
          <View style={styles.photoRow}>
            <Image
              source={{uri: photo?.uri || existingImage}}
              style={styles.photoPreview}
              resizeMode="cover"
            />
          </View>
        )}
      </ScrollView>
      <CustomButton
        onPress={handleUpdateCommunity}
        loading={loading}
        containerStyle={{marginBottom: hp(2)}}>
        {t('Update')}
      </CustomButton>
      <TouchableOpacity
        style={{alignItems: 'center', marginBottom: '8%'}}
        onPress={() => setShowDelete(true)}>
        <Text
          style={{
            color: Colors.red,
            fontFamily: fonts.UrbanistBold,
            fontSize: 14,
          }}>
          {t('Delete')}
        </Text>
      </TouchableOpacity>

      <DeletePopupModal
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        onDelete={handleDeleteCommunity}
      />
    </View>
  );
};

export default EditCommunity;
