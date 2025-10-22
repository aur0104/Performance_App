import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {IMAGES} from '../../../assets/images';
import {CommonActions} from '@react-navigation/native';

interface ReviewingProfileProps {
  navigation?: any;
}

const ReviewingProfile: React.FC<ReviewingProfileProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerified(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.contentContainer}>
        <Image
          source={verified ? IMAGES.verified : IMAGES.timer}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={[styles.heading, {color: textColor}]}>
          {verified ? t('Account Verified') : t('We’re Reviewing Your Profile')}
        </Text>
        <Text style={[styles.description, {color: textColor2}]}>
          {verified
            ? t(
                'Your account has been successfully verified. You can now access all features.',
              )
            : t(
                'Thank you for joining Prymo Sports. We have successfully verified your identity. Now you are reviewing your details. Our team will review them and approve them if everything is correct. This process may take 24 to 48 hours.',
              )}
        </Text>
        <CustomButton
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'OwnerBottomTab'}],
              }),
            );
          }}
          disable={!verified}
          containerStyle={styles.button}>
          {t('Go To Dashboard')}
        </CustomButton>
      </View>
    </View>
  );
};

export default ReviewingProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 6,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: fonts.UrbanistBold,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.UrbanistRegular,
  },
  button: {
    marginTop: '36%',
    width: '100%',
  },
});
