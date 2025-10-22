import React, {useState} from 'react';
import {View, Text, Image, ScrollView, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import BackHeader from '../../components/BackHeader';
import InputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import Checkbox from '../../components/CheckBox';
import styles from './style/forgotPasswordStyle';
import {Colors} from '../../utils/Colors';
import {IMAGES} from '../../assets/images';
import fonts from '../../utils/Fonts';
import SuccessModal from '../../components/SuccessModal';
import {hp, wp} from '../../utils/responsivesness';
import {resetPassword} from '../../services/calls';
import Toast from 'react-native-toast-message';

export default function NewPasswordScreen({navigation, route}: any) {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get user_id from route params
  const {user_id} = route.params || {};

  const textColor = isDarkMode ? Colors.white : Colors.black;

  const validatePassword = () => {
    if (!password) {
      Alert.alert(t('Error'), t('Please enter a new password'));
      return false;
    }

    if (password.length < 6) {
      Alert.alert(t('Error'), t('Password must be at least 6 characters long'));
      return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      Alert.alert(
        t('Error'),
        t('Password must contain at least one special character'),
      );
      return false;
    }

    if (password !== confirm) {
      Alert.alert(t('Error'), t('Passwords do not match'));
      return false;
    }

    return true;
  };

  const handleUpdatePassword = async () => {
    try {
      if (!validatePassword()) {
        return;
      }

      if (!user_id) {
        Alert.alert(t('Error'), t('User ID not found. Please try again.'));
        return;
      }

      setIsLoading(true);
      const apiResponse = await resetPassword({
        user_id,
        newPassword: password,
      });
      if (apiResponse.status == 200) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.navigate('Login');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: apiResponse.data.message || t('Password reset failed'),
        });
      }
    } catch (error: any) {
      console.error('Reset password error:', error?.response);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t('Password reset failed. Please try again.');
      Toast.show({
        type: 'error',
        text1: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <BackHeader
        title={t('CreateNewPassword')}
        showBackIcon
        titleStyle={{marginRight: hp(8)}}
      />
      <Image
        source={IMAGES.newPassword}
        style={styles.illustration}
        resizeMode="contain"
      />
      <Text
        style={[
          {
            fontSize: 16,
            fontFamily: fonts.UrbanistMedium,
            paddingHorizontal: 20,
          },
          {color: textColor},
        ]}>
        {t('Create Your New Password')}
      </Text>

      <View style={{marginVertical: 10}}>
        <InputField
          label={t('EnterNewPassword')}
          placeholder={t('EnterNewPassword')}
          value={password}
          onChangeText={setPassword}
          isPassword
          iconLeftName="lock"
          paddingHorizontal={20}
          containerStyle={{marginHorizontal: 20}}
        />
      </View>
      <InputField
        label={t('ConfirmNewPassword')}
        placeholder={t('ConfirmNewPassword')}
        value={confirm}
        paddingHorizontal={20}
        onChangeText={setConfirm}
        isPassword
        iconLeftName="lock"
        containerStyle={{marginHorizontal: 20}}
      />
      {/* <View style={{paddingHorizontal: 20, marginTop: 8}}>
        <Checkbox
          checked={rememberMe}
          setChecked={setRememberMe}
          title={t('RememberMe')}
        />
      </View> */}

      <View style={styles.wrapper}>
        <CustomButton onPress={handleUpdatePassword} disable={isLoading}>
          {isLoading ? t('Updating...') : t('UpdatePassword')}
        </CustomButton>
      </View>

      <SuccessModal
        visible={showSuccessModal}
        message="Your Password is successfully updated. Now you are ready to use your account."
        navigateTo="Login"
      />
    </ScrollView>
  );
}
