import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import InputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import AnySvg from '../../components/AnySvg';
import {LoginValidationSchema} from '../../utils/Validations';
import {Colors} from '../../utils/Colors';
import {IMAGES} from '../../assets/images';
import styles from './styles';
import BackHeader from '../../components/BackHeader';
import Checkbox from '../../components/CheckBox';
import Toast from 'react-native-toast-message';
import {login} from '../../services/calls';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/Slices/userSlice';
import {hp} from '../../utils/responsivesness';
import {CommonActions} from '@react-navigation/native';

export default function LoginScreen({navigation}: any) {
  const {t} = useTranslation();
  const role = useSelector((state: any) => state.user.role);
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const backgroundColor = isDarkMode ? Colors.black : Colors.white;
  const inputBgColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const dispatch = useDispatch();

  const handleLogin = async (values: {email: string; password: string}) => {
    try {
      setLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
      };
      const response = await login(payload);
      if (response?.status === 200 || response?.status === 201) {
        if (role != response?.data?.user?.role) {
          Toast.show({
            type: 'error',
            text1: t('Error'),
            text2: t('You have signed up as a different role'),
          });
          return;
        }
        if (role === 'gymOwner' || role === 'coach') {
          dispatch(setUser(response.data));
        } else {
          const obj = {
            ...response?.data?.user,
            gym: response?.data?.user?.gym,
            athlete_details: response?.data?.athlete_details,
          };
          dispatch(setUser({user: obj}));
        }
        Toast.show({
          type: 'success',
          text1: t('Success'),
          text2: t('Login successful'),
        });
        if (role === 'gymOwner' || role === 'coach') {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'OwnerBottomTab'}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AthleteBottomTab'}],
            }),
          );
        }
      } else {
        Toast.show({
          type: 'error',
          text1: t('Error'),
          text2: t('Invalid credentials'),
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('Error'),
        text2: error?.response?.data?.error || t('Something went wrong'),
      });
    } finally {
      setLoading(false);
    }
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
      <BackHeader showBackIcon title="" />

      <Image
        source={IMAGES.splashImg}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text
        style={[
          styles.title,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        {t('LoginToYourAccount')}
      </Text>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginValidationSchema}
        onSubmit={(values, {setSubmitting}) => {
          handleLogin({email: values?.email, password: values?.password});
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{paddingHorizontal: 20}}>
            <InputField
              label={t(' ')}
              placeholder={t('Email')}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              showError={touched.email}
              error={errors.email}
              iconLeftName="emailIcon"
            />

            <InputField
              label={t(' ')}
              placeholder={t('Password')}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              showError={touched.password}
              error={errors.password}
              isPassword
              iconLeftName="lock"
            />
            <View style={{paddingVertical: 14}}>
              <Checkbox
                checked={rememberMe}
                setChecked={setRememberMe}
                title={t('RememberMe')}
                checkBoxStyle={{
                  borderColor: Colors.primaryColor,
                  borderRadius: 8,
                }}
              />
            </View>

            <CustomButton onPress={handleSubmit}>{t('SignIn')}</CustomButton>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>{t('ForgotPassword')}</Text>
            </TouchableOpacity>

            {role === 'coach' ? null : (
              <View style={styles.orRow}>
                <View style={styles.line} />
                <Text style={styles.orText}>{t('OR')}</Text>
                <View style={styles.line} />
              </View>
            )}

            {role === 'coach' ? null : (
              <View style={styles.socialRow}>
                {[
                  'fbIcon',
                  'googleIcon',
                  isDarkMode ? 'appleIcon' : 'appleIconblack',
                ].map((icon, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.socialIconWrapper,
                      {
                        backgroundColor: backgroundColor,
                        borderColor: inputBgColor,
                      },
                    ]}>
                    <AnySvg name={icon} size={22} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {role === 'coach' ? (
              <View style={{marginVertical: hp(10)}}></View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (role === 'gymOwner' || role === 'coach') {
                    navigation.navigate('GymOwnerSignUp');
                  } else {
                    navigation.navigate('SignUp');
                  }
                }}>
                <Text style={styles.signupText}>
                  {t('NoAccount')}{' '}
                  <Text style={styles.link}>{t('SignUp')}</Text>
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </Formik>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator
            size={60}
            color={isDarkMode ? Colors.white : Colors.primaryColor}
          />
        </View>
      )}
    </ScrollView>
  );
}
