import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import {IMAGES} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import BackHeader from '../../components/BackHeader';
import styles from './style';

export default function LetsGoScreen({navigation}: any) {
  const {t} = useTranslation();
  const role = useSelector((state: any) => state.user.role);

  const handleSignUp = () => {
    if (role === 'gymOwner') {
      navigation.navigate('GymOwnerSignUp');
    } else {
      navigation.navigate('SignUp');
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <ImageBackground
        source={IMAGES.imagebg}
        style={{flex: 1}}
        resizeMode="cover">
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={[styles.content, {paddingBottom: 40}]}
          showsVerticalScrollIndicator={false}>
          <BackHeader showBackIcon title="" />

          <Image
            source={IMAGES.splashImg}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={[styles.title, {color: Colors.white}]}>
            {t('LetsGo')}
          </Text>

          {['fbIcon', 'googleIcon', 'appleIconblack'].map((icon, index) => (
            <View style={styles.socialButton} key={index}>
              <CustomButton
                leftIcon={icon}
                themeColor={Colors.white}
                textColor={Colors.black}
                isBackground={false}
                borderRadius={16}
                borderColor={Colors.border}
                containerStyle={styles.fullButton}
                style={{marginLeft: 6}}>
                {t(
                  icon === 'fbIcon'
                    ? 'ContinueWithFacebook'
                    : icon === 'googleIcon'
                    ? 'ContinueWithGoogle'
                    : 'ContinueWithApple',
                )}
              </CustomButton>
            </View>
          ))}

          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={[styles.orText, {color: Colors.white}]}>
              {t('or')}
            </Text>
            <View style={styles.line} />
          </View>

          <CustomButton onPress={handleLogin}>
            {t('SignInWithPassword')}
          </CustomButton>

          <Text style={styles.bottomText}>
            {t('NoAccount')}{' '}
            <Text style={styles.link} onPress={handleSignUp}>
              {t('SignUp')}
            </Text>
          </Text>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
