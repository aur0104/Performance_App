import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from './styles';
import BackHeader from '../../../components/BackHeader';
import {SignUPValidationSchema} from '../../../utils/Validations';
import InputField from '../../../components/CustomInputField';
import {Colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import NationalityModal from '../../../components/NationalityModal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import {signUp} from '../../../services/calls';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../store/Slices/userSlice';

interface SignUpProps {
  navigation?: any;
}

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';
  const orColor = isDarkMode ? '#616161' : '#424242';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [modalVisible, setModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    flag: string;
  } | null>(null);
  const [selectedGender, setSelectedGender] = useState('');
  const dispatch = useDispatch();
  const role = useSelector((state: any) => state.user.role);
  const [loading, setLoading] = useState(false);

  // Function to calculate age from date of birth
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

  // Remove handleSignUp API logic, replace with navigation
  const handleForward = (values: any) => {
    if (values?.password != values?.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
      return;
    }
    if (values?.number?.length < 7 || values?.number?.length > 13) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Phone number must be between 7 and 13 digits',
      });
      return;
    }
    if (!/^\d+$/.test(values?.number)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Phone number must contain only numbers',
      });
      return;
    }

    // Check age requirement
    const userAge = calculateAge(values.dob || selectedDate);
    if (userAge < 16) {
      Toast.show({
        type: 'error',
        text1: 'Age Requirement',
        text2: 'You must be at least 16 years old to sign up',
      });
      return;
    }

    navigation.navigate('PersonalInformation', {
      ...values,
      selectedGender,
      selectedCountry,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Sign Up')} showBackIcon />
        <Text style={[styles.heading, {color: textColor}]}>
          Lets get started.
        </Text>
        <Text style={[styles.subHeader, {color: textColor2}]}>
          {t('Fill in your basic details to set up your Prymo Account.')}
        </Text>

        <Formik
          initialValues={{
            name: '',
            email: '',
            dob: '',
            number: '',
            gender: '',
            nationality: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUPValidationSchema}
          onSubmit={handleForward}>
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
                label="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder={t('Name')}
                onBlur={handleBlur('name')}
                iconLeftName="user"
                error={errors.name}
                showError={touched.name}
              />
              <InputField
                label="Email Address"
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
                  label="Date of Birth"
                  value={selectedDate || values.dob}
                  placeholder={t('Date of Birth')}
                  iconLeftName="calendarIcon"
                  onBlur={handleBlur('dob')}
                  editable={false}
                  error={errors.dob}
                  showError={touched.dob}
                  pointerEvents="none"
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  isVisible={showDatePicker}
                  mode="date"
                  maximumDate={new Date()}
                  minimumDate={new Date(new Date().getFullYear() - 100, 0, 1)} // Allow max 100 years old
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
                  }}
                  onCancel={() => setShowDatePicker(false)}
                />
              )}
              <InputField
                label="Phone"
                value={values.number}
                onChangeText={handleChange('number')}
                placeholder={t('Phone')}
                onBlur={handleBlur('number')}
                iconLeftName="call"
                keyboardType="number-pad"
                error={errors.number}
                isPhoneNumber={true}
                showError={touched.number}
              />
              <InputField
                label="Gender"
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
                label="Nationality"
                value={
                  selectedCountry
                    ? `${selectedCountry.flag}\u00A0\u00A0\u00A0 ${selectedCountry.name}`
                    : ''
                }
                onChangeText={text => setFieldValue('nationality', text)}
                placeholder={t('Nationality')}
                onBlur={handleBlur('nationality')}
                iconLeftName={!selectedCountry ? 'flag' : undefined}
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setModalVisible(true)}
                error={errors.nationality}
                showError={touched.nationality}
                editable={false}
              />
              <InputField
                label="Password"
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
                label="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder={t('Confirm Password')}
                onBlur={handleBlur('confirmPassword')}
                iconLeftName="lock"
                isPassword
                error={errors.confirmPassword}
                showError={touched.confirmPassword}
              />

              <NationalityModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelect={country => {
                  setSelectedCountry(country);
                  setFieldValue('nationality', country.name);
                  setModalVisible(false);
                }}
              />
              <Modal
                transparent
                visible={genderModalVisible}
                animationType="fade">
                <View style={styles.modalOverlay}>
                  <View style={[styles.genderModal, {backgroundColor}]}>
                    {['Male', 'Female', 'Other'].map((option, index) => (
                      <React.Fragment key={option}>
                        {index > 0 && <View style={styles.separator} />}
                        <TouchableOpacity
                          style={styles.genderOption}
                          onPress={() => {
                            setSelectedGender(t(option));
                            setFieldValue('gender', t(option));
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

              <CustomButton
                onPress={handleSubmit}
                disable={!isValid || !dirty}
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
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator
            size={60}
            color={isDarkMode ? Colors.white : Colors.primaryColor}
          />
        </View>
      )}
    </View>
  );
};

export default SignUp;
