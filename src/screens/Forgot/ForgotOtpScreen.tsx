import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import BackHeader from '../../components/BackHeader';
import CustomButton from '../../components/CustomButton';
import {Colors} from '../../utils/Colors';
import styles from './style/forgotOtpStyle';
import {hp} from '../../utils/responsivesness';
import {otpVerification, forgotPassword} from '../../services/calls';
import Toast from 'react-native-toast-message';
import {store} from '../../store';

export default function ForgotOtpScreen({navigation, route}: any) {
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const {t} = useTranslation();

  // Get parameters from navigation
  const {verificationMethod, contactInfo, response} = route.params || {};
  console.log('Re', response);
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const refs = useRef<TextInput[]>([]);

  const textColor = isDarkMode ? Colors.white : Colors.black;
  const inputBgColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const [otp, setOtp] = useState(['', '', '', '']);
  const [disableVerify, setDisableVerify] = useState(true);
  const [isOtpCleared, setIsOtpCleared] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResposnes] = useState(null);
  const otpRefs = Array.from({length: 4}, () => useRef<TextInput>(null));

  useEffect(() => {
    if (response) setResposnes(response);
  }, [response]);

  useEffect(() => {
    setDisableVerify(otp.join('').length !== 4);
  }, [otp]);

  useEffect(() => {
    if (isOtpCleared) {
      otpRefs[0].current?.focus();
      setIsOtpCleared(false);
    }
  }, [isOtpCleared]);

  const handleOTPChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otpRefs.length - 1) {
        otpRefs[index + 1].current?.focus();
      }
    }
  };

  const handleDelete = (index: number) => {
    const newOtp = [...otp];
    newOtp[index] = '';
    setOtp(newOtp);
    if (index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Reset timer when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimer(30);
    });

    return unsubscribe;
  }, [navigation]);

  const handleResendCode = async () => {
    try {
      // Reset OTP fields
      setOtp(['', '', '', '']);
      setDisableVerify(true);

      // Call the forgotPassword API directly
      const role = store?.getState()?.user?.role;
      const data =
        verificationMethod === 'email'
          ? {email: contactInfo}
          : {phone: contactInfo};

      const response = await forgotPassword(data, verificationMethod);

      if (response.status === 200) {
        if (response?.data?.message === 'User not found') {
          Toast.show({
            type: 'error',
            text1: t('User not found'),
          });
          return;
        }

        // Reset timer to 30 seconds
        setTimer(30);

        Toast.show({
          type: 'success',
          text1: t('Code sent successfully'),
        });
        setResposnes(response?.data);

        // Focus on first input
        otpRefs[0].current?.focus();
      } else {
        Toast.show({
          type: 'error',
          text1: response?.data?.message || t('Failed to resend code'),
        });
      }
    } catch (error: any) {
      console.error('Resend code error:', error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || t('Failed to resend code'),
      });
    }
  };

  // Function to mask contact information for display
  const getMaskedContactInfo = () => {
    if (!contactInfo) {
      return verificationMethod === 'email'
        ? 'ars***d@gmail.com'
        : '+1 111 ******99';
    }

    if (verificationMethod === 'email') {
      const email = contactInfo;
      const [username, domain] = email.split('@');
      if (username.length <= 3) {
        return `${username[0]}***@${domain}`;
      }
      return `${username.substring(0, 3)}***@${domain}`;
    } else {
      const phone = contactInfo;
      if (phone.length <= 4) {
        return `***${phone.slice(-2)}`;
      }
      return `${phone.substring(0, 2)} ${phone.substring(
        2,
        5,
      )} ******${phone.slice(-2)}`;
    }
  };

  const getSubtitleText = () => {
    const maskedContact = getMaskedContactInfo();
    return verificationMethod === 'email'
      ? `${t('Code has been sent to')} ${maskedContact}`
      : `${t('Code has been sent to')} ${maskedContact}`;
  };

  const handleVerifyOtp = async () => {
    const userId = response?.user?._id;
    const otpCode = otp.join('');
    console.log('ote', otp);
    if (!userId) {
      Toast.show({
        type: 'error',
        text1: t('User ID not found. Please try again.'),
      });
      return;
    }

    if (otpCode.length !== 4) {
      Toast.show({
        type: 'error',
        text1: t('Please enter complete OTP code.'),
      });
      return;
    }

    console.log('Verifying OTP with:', {user_id: userId, otp: otpCode});

    if (responses?.user?.resetOTP == otpCode) {
      // Navigate to NewPasswordScreen with user_id
      navigation.navigate('NewPasswordScreen', {
        user_id: userId,
        verificationMethod,
        contactInfo,
        otp: otpCode,
        response,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: t('Invalid OTP code. Please try again.'),
      });
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <BackHeader
        title={t('Forgot Password')}
        showBackIcon
        titleStyle={{marginRight: hp(14)}}
      />

      <Text style={[styles.otpSubtitle, {color: textColor}]}>
        {getSubtitleText()}
      </Text>

      <View style={styles.otpBoxRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={otpRefs[index]}
            style={[
              styles.roundedTextInput,
              {
                backgroundColor: inputBgColor,
                borderColor: !isDarkMode ? Colors.primaryColor : 'transparent',
                color: textColor,
              },
            ]}
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={value => handleOTPChange(value, index)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                handleDelete(index);
              }
            }}
            returnKeyType="done"
            textAlign="center"
          />
        ))}
      </View>

      {timer > 0 ? (
        <Text style={[styles.resendText, {color: textColor}]}>
          {t('ResendIn')}{' '}
          <Text style={[styles.resendText, {color: Colors.primaryColor}]}>
            {timer}
          </Text>{' '}
          s
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResendCode} activeOpacity={0.7}>
          <Text style={[styles.resendText, {color: Colors.primaryColor}]}>
            {t('Resend')}
          </Text>
        </TouchableOpacity>
      )}

      <CustomButton
        onPress={handleVerifyOtp}
        disable={disableVerify || isLoading}
        containerStyle={{marginTop: hp(3)}}>
        {isLoading ? t('Verifying...') : t('Verify')}
      </CustomButton>
    </View>
  );
}
