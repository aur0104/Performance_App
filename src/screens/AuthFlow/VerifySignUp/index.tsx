import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import CustomButton from '../../../components/CustomButton';
import styles from './styles';
import {verifyCode} from '../../../services/calls';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {store} from '../../../store';
import {setUser} from '../../../store/Slices/userSlice';

interface VerifyProps {
  navigation?: any;
}

interface RouteParams {
  email: string;
  data?: any;
}

const VerifySignup: React.FC<VerifyProps> = ({navigation}) => {
  const {t} = useTranslation();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  console.log('Previous route name ', prevRoute?.name);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const inputBgColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [disableVerify, setDisableVerify] = useState(true);
  const [isOtpCleared, setIsOtpCleared] = useState(false);
  const route = useRoute<{key: string; name: string; params: RouteParams}>();
  const [loading, setLoading] = useState(false);

  const otpRefs = Array.from({length: 4}, () => useRef<TextInput>(null));

  useEffect(() => {
    setDisableVerify(otp.join('').length !== 4);
  }, [otp]);

  useEffect(() => {
    if (isOtpCleared) {
      otpRefs[0].current?.focus();
      setIsOtpCleared(false);
    }
  }, [isOtpCleared]);
  const handleOtpSubmit = async () => {
    if (otp.join('').length === 4) {
      setLoading(true);
      try {
        const email = route?.params?.email;
        const code = otp.join('');
        const res = await verifyCode({email, code});
        if (res?.status === 200) {
          let user0 = store?.getState().user?.user;
          let user1 = {...user0, gym: res?.data?.gym};
          let subUser = user1?.user;
          let user = {...subUser, gym: res?.data?.gym};
          const total = {...user1, user: user};
          store.dispatch(setUser(total));
          if (prevRoute == 'AthleteSettings') {
            navigation.popToTop();
          } else {
            navigation.replace('Platforms');
          }
        } else {
          Toast.show({
            type: 'error',
            text1: res?.data?.message || t('OTP verification failed'),
          });
        }
      } catch (err: any) {
        Toast.show({
          type: 'error',
          text1: err?.response?.data?.error || t('OTP verification failed'),
        });
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', t('Please enter a valid 4-digit OTP'));
    }
  };

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

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        contentContainerStyle={[styles.container, {backgroundColor}]}
        keyboardShouldPersistTaps="handled">
        <BackHeader title={t('Sign Up')} showBackIcon />
        <Text style={[styles.title, {color: textColor}]}>
          {t('Enter Your Unique Code')}
        </Text>
        <Text style={[styles.subtitle, {color: textColor2}]}>
          {t(
            'Got an invite or club access code? Drop it here to unlock your link.',
          )}
        </Text>

        <View style={styles.textInputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={otpRefs[index]}
              style={[
                styles.roundedTextInput,
                {
                  backgroundColor: inputBgColor,
                  borderColor: !isDarkMode
                    ? Colors.primaryColor
                    : 'transparent',
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
      </ScrollView>
      <CustomButton
        onPress={handleOtpSubmit}
        disable={disableVerify || loading}
        loading={loading}>
        {t('Verify')}
      </CustomButton>
      {prevRoute?.name != 'AthleteSettings' && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Platforms')}
          style={styles.button}>
          <Text style={[styles.skipText, {color: textColor}]}>{t('Skip')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VerifySignup;
