import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from '../SignUp/styles';
import BackHeader from '../../../components/BackHeader';
import {PersonalInfoValidationSchema} from '../../../utils/Validations';
import InputField from '../../../components/CustomInputField';
import {Colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import SelectSportModal from '../../../components/SelectSports';
import SkillModal from '../../../components/SkillsModal';

import {getSportsWithSkillLevels, signUpAthlete} from '../../../services/calls';
import Toast from 'react-native-toast-message';
import {signUp} from '../../../services/calls';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {store} from '../../../store';
import {setUser} from '../../../store/Slices/userSlice';

interface SignUpProps {
  navigation?: any;
}

const PersonalInformation: React.FC<SignUpProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';
  const orColor = isDarkMode ? '#616161' : '#424242';
  const viewBg = isDarkMode ? '#424242' : '#F2F2F2';

  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [skillModalVisible, setSkillModalVisible] = useState(false);

  const [selectedSports, setSelectedSports] = useState<any[]>([]);
  const [currentSportForSkill, setCurrentSportForSkill] = useState<any>(null);
  const [data, setData] = useState(null);
  const [dataLoader, setDataLoader] = useState(false);
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  // Get all skill levels for a selected sport
  const getSkillOptionsBySport = (sportObj: any) => {
    if (!sportObj || !sportObj.skillLevels) return [];
    // Map skill levels to the format expected by the SkillModal
    return sportObj.skillLevels.map((skillLevel: any) => ({
      id: skillLevel._id,
      title: skillLevel.name,
      description: skillLevel.description || '',
      name: skillLevel.name,
      image: skillLevel?.image,
      _id: skillLevel._id,
    }));
  };

  const [lastSkillOptions, setLastSkillOptions] = useState<any[]>([]);

  const getData = async () => {
    try {
      setDataLoader(true);
      const res = await getSportsWithSkillLevels();

      if (res?.status == 200) {
        setData(res?.data?.data);
      } else {
        Toast.show({
          swipeable: true,
          text1: 'Error',
          text2: 'Unable to load sports list',
        });
      }
    } catch {
      Toast.show({
        swipeable: true,
        text1: 'Error',
        text2: 'Unable to load sports list',
      });
    } finally {
      setDataLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectSport = (sport: any) => {
    // Check if sport is already selected
    const isAlreadySelected = selectedSports.some(s => s._id === sport._id);
    if (isAlreadySelected) {
      // Remove the sport if already selected
      setSelectedSports(prev => prev.filter(s => s._id !== sport._id));
    } else {
      // Add the new sport with null skill/belt
      setSelectedSports(prev => [
        ...prev,
        {
          ...sport,
          skill: null,
        },
      ]);
    }
    setSportModalVisible(false);
  };

  const handleSkillSelect = (skill: any) => {
    // Find the original skill object by _id or id
    const originalSkill =
      lastSkillOptions.find((sk: any) => {
        return (
          sk._id === skill.id || sk._id === skill._id || sk.id === skill.id
        );
      }) || skill;
    setSelectedSports(prev =>
      prev.map(s =>
        s._id === currentSportForSkill._id ? {...s, skill: originalSkill} : s,
      ),
    );
    setSkillModalVisible(false);
  };

  const removeSkill = (sportId: string) => {
    setSelectedSports(prev =>
      prev.map(sport =>
        sport._id === sportId ? {...sport, skill: null} : sport,
      ),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Sign Up')} showBackIcon />
        <Text style={[styles.heading, {color: textColor}]}>
          {t('Build Your Athlete Profile')}
        </Text>
        <Text style={[styles.subHeader, {color: textColor2}]}>
          {t('Your body, your sport, your level.')}
        </Text>

        <Formik
          initialValues={{weight: '', height: ''}}
          validationSchema={PersonalInfoValidationSchema}
          onSubmit={async values => {
            // setLoading(true);
            try {
              // Gather all info from previous screen and current form
              const params = (route as any).params || {};

              // Build user object
              const user = {
                name: params?.name || '',
                email: params?.email || '',
                password: params?.password || '',
                gender:
                  params?.selectedGender?.toLowerCase() ||
                  params?.gender?.toLowerCase() ||
                  '',
                nationality:
                  params?.selectedCountry?.name || params?.nationality || '',
                dob:
                  moment(params?.dob, 'DD-MM-YYYY').format('YYYY-MM-DD') || '',
                phoneNumber: params?.number || params?.phoneNumber || '',
              };
              // Build athlete_details object with sportsAndSkillLevels array
              const sportsAndSkillLevels = selectedSports.map(sport => ({
                sport: sport._id,
                skillSetLevel: sport.skill?._id || '',
              }));

              const athlete_details = {
                height: Number(values.height),
                weight: Number(values.weight),
                sportsAndSkillLevels: sportsAndSkillLevels,
              };
              const formData = new FormData();
              formData.append('user', JSON.stringify(user));
              // Append dummy profile image

              formData.append(
                'athlete_details',
                JSON.stringify(athlete_details),
              );
              // Add any other required fields here
              // return;
              const role = params?.role || 'athlete';
              // console.log('Form data ', JSON.stringify(formData));
              const res = await signUpAthlete(formData, role);
              if (res?.status === 200 || res?.status === 201) {
                store.dispatch(setUser(res?.data));
                Toast.show({
                  type: 'success',
                  text1: 'Success',
                  text2: 'Sign up successful!',
                });
                navigation.navigate('VerifySignUp', {
                  email: user.email,
                  data: res?.data,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: res?.data?.message || 'Sign up failed',
                });
              }
            } catch (err: any) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err?.response?.data?.error || 'Sign up failed',
              });
            } finally {
              setLoading(false);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <View style={styles.inputContainer}>
              <InputField
                label="Weight"
                value={values.weight}
                onChangeText={handleChange('weight')}
                placeholder={t('Weight')}
                onBlur={handleBlur('weight')}
                iconLeftName="weight"
                suffix="KG"
                keyboardType="numeric"
                error={errors.weight}
                showError={touched.weight}
              />

              <InputField
                label="Height"
                value={values.height}
                onChangeText={handleChange('height')}
                placeholder={t('Height')}
                onBlur={handleBlur('height')}
                iconLeftName="weight"
                suffix="CM"
                keyboardType="numeric"
                error={errors.height}
                showError={touched.height}
              />

              <InputField
                label="Select Sports"
                value=""
                placeholder={t('Select Sports')}
                iconLeftName="ticket"
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setSportModalVisible(true)}
                editable={false}
              />

              {selectedSports.map(sport => (
                <View key={sport._id} style={{flex: 1}}>
                  <InputField
                    label="Selected Sport"
                    value={sport.name}
                    placeholder={t('Selected Sport')}
                    iconLeftName="ticket"
                    editable={false}
                  />

                  <InputField
                    label={
                      sport?.name?.includes('bjj')
                        ? t('Select Belt Order')
                        : t('Select Skill Level')
                    }
                    value={sport.skill ? sport.skill.name : ''}
                    placeholder={
                      sport?.name?.includes('bjj')
                        ? t('Select Belt Order')
                        : t('Select Skill Level')
                    }
                    iconLeftName="swap"
                    iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                    onRightIconClick={() => {
                      setCurrentSportForSkill(sport);
                      const skillsArr = getSkillOptionsBySport(sport) || [];
                      setLastSkillOptions(skillsArr);
                      setSkillModalVisible(true);
                    }}
                    editable={false}
                  />
                  {sport.skill && (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: viewBg,
                          paddingHorizontal: 12,
                          height: 36,
                          borderRadius: 80,
                          marginRight: 8,
                          marginBottom: 8,
                        }}>
                        {sport.skill && sport.skill.name && (
                          <Text
                            style={{
                              color: textColor,
                              marginRight: 8,
                            }}>
                            {sport.skill.name}
                          </Text>
                        )}

                        <TouchableOpacity
                          onPress={() => removeSkill(sport._id)}>
                          <Text style={{color: Colors.red, fontSize: 18}}>
                            ✕
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ))}

              <CustomButton
                loading={loading}
                onPress={handleSubmit}
                disable={
                  loading ||
                  !isValid ||
                  !dirty ||
                  selectedSports.length === 0 ||
                  !selectedSports.every(sport => !!sport.skill)
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

      <SelectSportModal
        visible={sportModalVisible}
        onClose={() => setSportModalVisible(false)}
        onSelectSport={handleSelectSport}
        data={data || []}
        selectedSports={selectedSports}
      />

      <SkillModal
        visible={skillModalVisible}
        data={lastSkillOptions}
        onClose={() => setSkillModalVisible(false)}
        onSelect={handleSkillSelect}
      />
    </View>
  );
};

export default PersonalInformation;
