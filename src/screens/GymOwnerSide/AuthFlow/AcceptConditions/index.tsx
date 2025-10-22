import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {styles} from '../../../AuthFlow/AcceptTerms/styles';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import {hp} from '../../../../utils/responsivesness';
import AnySvg from '../../../../components/AnySvg';
import Checkbox from '../../../../components/CheckBox';
import CustomButton from '../../../../components/CustomButton';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {signUp} from '../../../../services/calls';
import moment from 'moment';
import {basename} from 'react-native-path';
import mime from 'mime';
import fonts from '../../../../utils/Fonts';
import {setUser} from '../../../../store/Slices/userSlice';
import {store} from '../../../../store';

interface AcceptTermsProps {
  navigation?: any;
}

const AcceptConditions: React.FC<AcceptTermsProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const profileBg = isDarkMode ? '#212121' : '#FAFAFA';

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
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
        disable={loading || !checked}
        onPress={async () => {
          setLoading(true);
          try {
            const params = (route?.params || {}) as any;
            // User object (replace with actual values from params if available)
            const user = {
              name: params?.values?.name || '',
              email: params?.values?.email || '',
              password: params?.values?.password || '',
              gender: params?.values?.gender?.toLowerCase() || 'male',
              // nationality: params?.nationality || 'Pakistani',
              dob:
                moment(params?.values?.dob, 'DD-MM-YYYY').format(
                  'YYYY-MM-DD',
                ) || '2000-01-01',
              // phoneNumber: params?.phoneNumber || '',
            };
            // Gym details (static cnic, registration)
            const gym_details = {
              name: params?.name || 'myGym',
              address: params?.address || '75 str LA',
              registration: 'kdkdj33u9dj',
              cnic: '3637437333',
              sport: params?.sports?.[0]?.sportId || '',
            };
            // Prepare FormData
            const formData = new FormData();

            formData.append('user', JSON.stringify(user));
            formData.append('gym_details', JSON.stringify(gym_details));
            // proofOfBusiness (first businessDocs file)
            if (params.businessDocs && params.businessDocs.length > 0) {
              const file = params?.businessDocs[0];
              const mimeType =
                mime.getType(file.uri) || 'application/octet-stream'; // Default if MIME type not found
              const fileName = basename(file.uri);
              formData.append('proofOfBusiness', {
                uri: file.uri,
                name: fileName,
                type: mimeType,
              });
            }

            // gymImages (all businessDocs as gymImages[])
            if (params.businessDocs && params.businessDocs.length > 0) {
              params.businessDocs.forEach((file: any, idx: number) => {
                const mimeType =
                  mime.getType(file.uri) || 'application/octet-stream'; // Default if MIME type not found
                const fileName = basename(file.uri);
                formData.append('gymImages', {
                  uri: file.uri,
                  name: fileName,
                  type: mimeType,
                });
              });
            }
            // personalIdentification (first personalIds file)
            if (params.personalIds && params.personalIds.length > 0) {
              const file = params.personalIds[0];
              const mimeType =
                mime.getType(file.uri) || 'application/octet-stream'; // Default if MIME type not found
              const fileName = basename(file.uri);
              formData.append('personalIdentification', {
                uri: file.uri,
                name: fileName,
                type: mimeType,
              });
            }
            // profile (from imageUri)
            if (imageUri) {
              const mimeType =
                mime.getType(imageUri) || 'application/octet-stream'; // Default if MIME type not found
              const fileName = basename(imageUri);
              formData.append('profile', {
                uri: imageUri,
                name: fileName,
                type: mimeType,
              });
            }

            const res = await signUp(formData, 'gymOwner');
            if (res?.status === 200 || res?.status === 201) {
              if (res?.data?.message == 'User with this email already exists') {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: res?.data?.message || 'Sign up failed',
                });
                return;
              }
              store.dispatch(setUser(res?.data));
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Sign up successful!',
              });
              navigation.navigate('ReviewingProfile');
            } else {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: res?.data?.message || 'Sign up failed',
              });
            }
          } catch (err: any) {
            console.log('err', err?.response?.data);
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: err?.response?.data?.error || 'Sign up failed',
            });
          } finally {
            setLoading(false);
          }
        }}
        containerStyle={styles.button}>
        {loading ? t('Loading...') : t('Create Account')}
      </CustomButton>
    </View>
  );
};

export default AcceptConditions;
