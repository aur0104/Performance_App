import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import AnySvg from '../../../components/AnySvg';
import Checkbox from '../../../components/CheckBox';
import CustomButton from '../../../components/CustomButton';
import SuccessModal from '../../../components/SuccessModal';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {CommonActions, useRoute} from '@react-navigation/native';
import {updateProfileImage} from '../../../services/calls';
import {basename} from 'react-native-path';
import mime from 'mime';
import Toast from 'react-native-toast-message';

interface AcceptTermsProps {
  navigation?: any;
}

const AcceptTerms: React.FC<AcceptTermsProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const userInfo = useSelector((state: any) => state.user.user);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const profileBg = isDarkMode ? '#212121' : '#FAFAFA';

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const route = useRoute();

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      },
    );
  };

  const handleCreateAccount = async () => {
    try {
      setIsUploading(true);

      // Upload profile image if one is selected
      if (imageUri && userInfo?.user?._id) {
        const formData = new FormData();
        const mimeType = mime.getType(imageUri) || 'application/octet-stream'; // Default if MIME type not found
        const fileName = basename(imageUri);
        if (imageUri)
          formData.append('profile', {
            uri: imageUri,
            type: mimeType,
            name: fileName,
          } as any);

        await updateProfileImage(userInfo?.user?._id, formData);
      }

      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AthleteBottomTab'}],
          }),
        );
      }, 1500);
    } catch (error) {
      console.error('Error uploading profile image:', error);
      // Still navigate even if image upload fails
      Toast.show({
        type: 'error',
        text1: t('Error uploading profile image'),
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        style={[styles.container, {marginBottom: hp(4)}]}
        showsVerticalScrollIndicator={false}>
        <BackHeader
          title={t('Sign Up')}
          showBackIcon
          titleStyle={{marginRight: hp(2.5)}}
        />
        <View style={styles.profileWrapper}>
          <View style={[styles.profileCircle, {backgroundColor: profileBg}]}>
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <AnySvg
                name={isDarkMode ? 'defaultProfile' : 'lightProfile'}
                size={140}
              />
            )}
            <TouchableOpacity
              onPress={pickImage}
              style={styles.addIconContainer}>
              <AnySvg
                name={isDarkMode ? 'addDarkIcon' : 'addLightIcon'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentWrapper}>
          <Text style={[styles.heading, {color: textColor}]}>
            {t('Terms and Conditions')}
          </Text>

          <Text style={[styles.descText, {color: textColor}]}>
            {t('A recurring payment for accessing all features and analytics')}
          </Text>
          <Text style={[styles.descText, {color: textColor}]}>
            {t(
              'A single payment required for account setup or initial access.',
            )}
          </Text>
          <Text style={[styles.descText, {color: textColor}]}>
            {t(
              'A charge applied if a user cancels their subscription before the billing cycle ends.',
            )}
          </Text>
          <Text style={[styles.descText, {color: textColor}]}>
            {t(
              'An additional charge for overdue subscription or service payments.',
            )}
          </Text>
          <Text style={[styles.descText, {color: textColor}]}>
            {t(
              'A cost associated with moving to a higher-tier plan with advanced features.',
            )}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Checkbox checked={checked} setChecked={setChecked} />
            <Text
              style={[
                styles.text,
                {color: textColor, right: 8, flexWrap: 'wrap'},
              ]}>
              I agree to the{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TermsConditions');
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: Colors.primaryColor,
                    fontFamily: fonts.UrbanistSemiBold,
                  },
                ]}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <Text style={[styles.text, {color: textColor}]}> and </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PrivacyPolicy');
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: Colors.primaryColor,
                    fontFamily: fonts.UrbanistSemiBold,
                  },
                ]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text style={[styles.text, {color: textColor}]}>.</Text>
          </View>

          <Checkbox
            checked={isChecked}
            setChecked={setIsChecked}
            title={t(
              'I agree to receive updates, offers and marketing communications from Prymo Sports.',
            )}
          />
        </View>
      </ScrollView>
      <CustomButton
        disable={!checked || isUploading}
        onPress={handleCreateAccount}
        containerStyle={styles.button}>
        {isUploading ? t('Uploading...') : t('Create Account')}
      </CustomButton>

      <SuccessModal
        visible={showSuccessModal}
        message="Your account is ready to use. You will be redirected to the Home page in a few seconds.."
        navigateTo="AthleteBottomTab"
      />
    </View>
  );
};

export default AcceptTerms;
