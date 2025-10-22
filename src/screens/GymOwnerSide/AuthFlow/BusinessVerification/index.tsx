import React, {useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import BackHeader from '../../../../components/BackHeader';
import InputField from '../../../../components/CustomInputField';
import CustomButton from '../../../../components/CustomButton';
import {Colors} from '../../../../utils/Colors';
import styles from './styles';
import {useRoute} from '@react-navigation/native';

const VerifyBusiness = ({navigation}: any) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const orColor = isDarkMode ? '#616161' : '#424242';
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [businessDocs, setBusinessDocs] = useState<any[]>([]);
  const [personalIds, setPersonalIds] = useState<any[]>([]);
  const [gymPhotos, setGymPhotos] = useState<any[]>([]);
  const route = useRoute();
  const handleImagePick = (setter: Function) => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, res => {
      if (!res.didCancel && res.assets?.length) {
        setter((prev: any[]) => [...prev, ...res.assets]);
      }
    });
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Sign Up')} showBackIcon />

        <Text style={[styles.heading, {color: textColor}]}>
          Verify Your Business
        </Text>

        <Text style={[styles.description, {color: textColor2}]}>
          To access Prymo Sports gym and club coaching tools, we’ll need a quick
          verification to confirm your business is legitimate.{'\n\n'}Upload any
          of the following:{'\n'}• Proof of business registration (e.g. national
          registry, business license){'\n'}• Tax ID number or certificate (e.g.
          ABN, EIN, VAT, etc.){'\n'}• Official document showing your business
          name (e.g. utility bill, invoice){'\n'}🔒 This keeps Prymo safe,
          professional, and community-driven. Documents are reviewed in 1–2
          business days
        </Text>

        <View style={{paddingHorizontal: 20}}>
          <InputField
            label="Upload Proof of Business"
            value=""
            placeholder={t('Upload Proof of Business')}
            editable={false}
            iconRightName="attachment"
            onRightIconClick={() => handleImagePick(setBusinessDocs)}
          />
          <View style={styles.imagePreviewContainer}>
            {businessDocs.map((img, index) => (
              <Image
                key={index}
                source={{uri: img.uri}}
                style={styles.previewImage}
                resizeMode="cover"
              />
            ))}
          </View>

          <InputField
            label="Upload Personal Identification"
            value=""
            placeholder={t('Upload Personal Identification')}
            editable={false}
            iconRightName="attachment"
            onRightIconClick={() => handleImagePick(setPersonalIds)}
          />
          <View style={styles.imagePreviewContainer}>
            {personalIds.map((img, index) => (
              <Image
                key={index}
                source={{uri: img.uri}}
                style={styles.previewImage}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>
        <CustomButton
          onPress={() =>
            navigation.navigate('AcceptConditions', {
              ...route?.params,
              businessDocs,
              personalIds,
            })
          }
          disable={businessDocs.length === 0 || personalIds.length === 0}
          containerStyle={{marginTop: '12%'}}>
          {t('Continue')}
        </CustomButton>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, {backgroundColor: separaterColor}]} />
          <Text style={[styles.dividerText, {color: orColor}]}>OR</Text>
          <View style={[styles.divider, {backgroundColor: separaterColor}]} />
        </View>

        <TouchableOpacity
          style={styles.signUpContainer}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.signUpText, {color: textColor2}]}>
            {t('Already have an account?')}{' '}
            <Text style={styles.signUpLink}>{t('Sign in')}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VerifyBusiness;
