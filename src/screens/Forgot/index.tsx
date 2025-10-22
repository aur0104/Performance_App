import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Colors} from '../../utils/Colors';
import {IMAGES} from '../../assets/images';
import BackHeader from '../../components/BackHeader';
import CustomButton from '../../components/CustomButton';
import CustomInputField from '../../components/CustomInputField';
import AnySvg from '../../components/AnySvg';
import styles from './style/forgotPasswordStyle';
import {hp} from '../../utils/responsivesness';
import {validateEmail} from '../../utils/responsivesness';
import {forgotPassword} from '../../services/calls';
import Toast from 'react-native-toast-message';
import {store} from '../../store';

export default function ForgotPasswordScreen({navigation, route}: any) {
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const {t} = useTranslation();

  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const [selected, setSelected] = useState<'sms' | 'email' | null>('sms');
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (!inputValue.trim()) {
      setInputError(
        selected === 'email' ? 'Email is required' : 'Phone number is required',
      );
      return false;
    }

    if (selected === 'email') {
      if (!validateEmail(inputValue.trim())) {
        setInputError('Please enter a valid email address');
        return false;
      }
    } else {
      // Basic phone validation - adjust regex as needed for your requirements
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(inputValue.trim())) {
        setInputError('Please enter a valid phone number');
        return false;
      }
    }

    setInputError('');
    return true;
  };

  const handleContinue = () => {
    if (!selected) {
      Alert.alert('Error', 'Please select a verification method');
      return;
    }
    setModalVisible(true);
  };
  const handleSubmit = async (withoutNavigation?: boolean) => {
    const role = store?.getState()?.user?.role;

    if (!validateInput()) {
      return;
    }

    setLoading(true);
    try {
      const verificationMethod = selected === 'email' ? 'email' : 'phone';
      const data =
        selected === 'email'
          ? {email: inputValue.trim()}
          : {phone: inputValue.trim()};

      const response = await forgotPassword(data, verificationMethod);

      if (response.status == 200) {
        if (response?.data?.message == 'User not found') {
          Toast.show({
            type: 'error',
            text1: t('User not found'),
          });
          return;
        }
        setModalVisible(false);
        setInputValue('');

        // Navigate to OTP screen with the contact information
        const contactInfo =
          selected === 'email' ? inputValue.trim() : inputValue.trim();

        if (response?.data?.user?.role != role) {
          Toast.show({
            type: 'error',
            text1: t('Please select the correct role'),
          });
          return;
        }
        Toast.show({
          type: 'success',
          text1: t('Code sent successfully'),
        });

        if (withoutNavigation) {
          return;
        } else {
          navigation.navigate('OTPVerify', {
            verificationMethod: selected,
            contactInfo: contactInfo,
            response: response.data,
          });
        }
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.error ||
          'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setInputValue('');
    setInputError('');
  };

  const renderOption = (
    type: 'sms' | 'email',
    title: string,
    value: string,
    icon: string,
  ) => {
    const isSelected = selected === type;
    return (
      <TouchableOpacity
        onPress={() => setSelected(type)}
        activeOpacity={0.8}
        style={[
          styles.optionBox,
          {
            backgroundColor: isDarkMode ? Colors.darkCard : Colors.lightGray,
            borderColor: isSelected ? Colors.primaryColor : '#797979',
          },
        ]}>
        <View style={styles.optionRow}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: backgroundColor,
              },
            ]}>
            <AnySvg name={icon} size={24} />
          </View>
          <View style={styles.contactTextContainer}>
            <Text
              style={[
                styles.optionType,
                {
                  color: isDarkMode ? Colors.gray : Colors.black,
                },
              ]}>
              {t(title)}
            </Text>
            <Text
              style={[
                styles.optionValue,
                {color: isDarkMode ? Colors.white : Colors.black},
              ]}>
              {value}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    const modalBgColor = isDarkMode ? Colors.darkBackground : Colors.white;
    const textColor = isDarkMode ? Colors.white : Colors.black;
    const overlayColor = 'rgba(0,0,0,0.4)';

    return (
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}>
        <View style={[styles.modalOverlay, {backgroundColor: overlayColor}]}>
          <View style={[styles.modalContent, {backgroundColor: modalBgColor}]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, {color: textColor}]}>
                {selected === 'email'
                  ? t('Enter Email Address')
                  : t('Enter Phone Number')}
              </Text>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}>
                <AnySvg name="crossIcon" size={20} />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.modalSubtitle,
                {color: isDarkMode ? Colors.gray : Colors.darkGray},
              ]}>
              {selected === 'email'
                ? t('Enter your email address to receive verification code')
                : t(
                    'Enter your phone number to receive verification code via SMS',
                  )}
            </Text>

            <CustomInputField
              label={
                selected === 'email' ? t('Email Address') : t('Phone Number')
              }
              value={inputValue}
              onChangeText={text => {
                setInputValue(text);
                if (inputError) setInputError('');
              }}
              placeholder={
                selected === 'email' ? 'example@email.com' : '+1 234 567 8900'
              }
              keyboardType={
                selected === 'email' ? 'email-address' : 'phone-pad'
              }
              autoCapitalize="none"
              error={inputError}
              showError={!!inputError}
              iconLeftName={selected === 'email' ? 'viaEmail' : 'smsIcon'}
              mainStyle={styles.modalInput}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.cancelButtonText}>{t('Cancel')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={loading}
                style={[
                  styles.modalButton,
                  styles.submitButton,
                  {
                    backgroundColor: loading
                      ? Colors.gray
                      : Colors.primaryColor,
                  },
                ]}>
                <Text style={styles.submitButtonText}>
                  {loading ? t('Sending...') : t('Send Code')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <BackHeader
        title={t('Forgot Password')}
        showBackIcon
        titleStyle={{marginRight: hp(14)}}
      />
      <Image
        source={IMAGES.forgot}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text
        style={[
          styles.title,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        {t('ForgotDescription')}
      </Text>

      {renderOption('sms', 'via SMS:', '+1 111 ******99', 'smsIcon')}
      {renderOption('email', 'via Email:', 'ars***d@gmail.com', 'viaEmail')}

      <View style={styles.wrapper}>
        <CustomButton onPress={handleContinue}>{t('Continue')}</CustomButton>
      </View>

      {renderModal()}
    </ScrollView>
  );
}
