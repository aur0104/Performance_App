import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import {SignUPValidationSchema} from '../../../../utils/Validations';
import InputField from '../../../../components/CustomInputField';
import CustomButton from '../../../../components/CustomButton';
import styles from '../../../AuthFlow/SignUp/styles';
import Toast from 'react-native-toast-message';

interface SignUpProps {
  navigation?: any;
}

const GymOwnerSignUp: React.FC<SignUpProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';
  const orColor = isDarkMode ? '#616161' : '#424242';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [error, setError] = useState('');
  const calculateAge = (dob: string) => {
    if (!dob) return 0;

    const [day, month, year] = dob.split('-').map(Number);
    if (!day || !month || !year) return 0;

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Calculate exact age
    return monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;
  };

  const isValidEmail = (email: string) => {
    // Trim spaces and check pattern
    const trimmedEmail = email.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(trimmedEmail);
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Sign Up')} showBackIcon />
        <Text style={[styles.heading, {color: textColor}]}>
          Personal Information
        </Text>
        <Text style={[styles.subHeader, {color: textColor2}]}>
          {t(
            'Please enter all your personal information based on your identity',
          )}
        </Text>

        <Formik
          initialValues={{
            name: '',
            email: '',
            dob: '',
            gender: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUPValidationSchema}
          onSubmit={values => console.log(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            isValid,
            dirty,
          }) => (
            <View style={styles.inputContainer}>
              <InputField
                label={t('Name')}
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder={t('Name')}
                onBlur={handleBlur('name')}
                iconLeftName="user"
                error={errors.name}
                showError={touched.name}
              />
              <InputField
                label={t('Email Address')}
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder={t('Email Address')}
                onBlur={handleBlur('email')}
                iconLeftName="email"
                error={errors.email}
                showError={touched.email}
              />
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.8}>
                <InputField
                  label={t('Date of Birth')}
                  value={selectedDate || values.dob}
                  placeholder={t('Date of Birth')}
                  iconLeftName="calendarIcon"
                  onBlur={handleBlur('dob')}
                  editable={false}
                  error={error}
                  showError={error?.length > 0 ? true : false}
                  pointerEvents="none"
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  isVisible={showDatePicker}
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={date => {
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1)
                      .toString()
                      .padStart(2, '0');
                    const year = date.getFullYear();
                    const formattedDate = `${day}-${month}-${year}`;
                    setSelectedDate(formattedDate);
                    setFieldValue('dob', formattedDate);
                    setShowDatePicker(false);
                    setError('');
                  }}
                  onCancel={() => setShowDatePicker(false)}
                />
              )}
              <InputField
                label={t('Gender')}
                value={selectedGender || values.gender}
                placeholder={t('Gender')}
                iconLeftName="addUser"
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setGenderModalVisible(true)}
                onBlur={handleBlur('gender')}
                error={errors.gender}
                showError={touched.gender}
                editable={false}
              />

              <InputField
                label={t('Password')}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder={t('Password')}
                onBlur={handleBlur('password')}
                iconLeftName="lock"
                isPassword
                error={errors.password}
                showError={touched.password}
              />
              <InputField
                label={t('Confirm Password')}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder={t('Confirm Password')}
                onBlur={handleBlur('confirmPassword')}
                iconLeftName="lock"
                isPassword
                error={errors.confirmPassword}
                showError={touched.confirmPassword}
              />

              <CustomButton
                onPress={() => {
                  const userAge = calculateAge(selectedDate || values.dob);
                  if (userAge < 16) {
                    setError('Age must be at least 16 years old');
                    return;
                  }
                  navigation.navigate('GymInformation', {
                    values,
                    selectedDate,
                    selectedGender,
                  });
                  navigation.navigate('GymInformation', {values});
                }}
                disable={
                  values?.password != values?.confirmPassword ||
                  !values?.confirmPassword ||
                  !values?.password ||
                  !values?.name ||
                  !values?.email ||
                  !selectedGender ||
                  !values?.dob ||
                  !isValidEmail(values?.email)
                }
                containerStyle={{marginTop: '12%'}}>
                {t('Continue')}
              </CustomButton>
            </View>
          )}
        </Formik>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, {backgroundColor: separaterColor}]} />
          <Text style={[styles.dividerText, {color: orColor}]}>OR</Text>
          <View style={[styles.divider, {backgroundColor: separaterColor}]} />
        </View>

        <TouchableOpacity
          style={styles.signUpContainer}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.signUpText, {color: textColor}]}>
            {t('Already have an account?')}{' '}
            <Text style={styles.signUpLink}>{t('Sign in')}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal transparent visible={genderModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.genderModal, {backgroundColor}]}>
            {['Male', 'Female', 'Other'].map((option, index) => (
              <React.Fragment key={option}>
                {index > 0 && <View style={styles.separator} />}
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => {
                    setSelectedGender(t(option));
                    setGenderModalVisible(false);
                  }}>
                  <Text style={[styles.genderText, {color: textColor}]}>
                    {t(option)}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GymOwnerSignUp;
