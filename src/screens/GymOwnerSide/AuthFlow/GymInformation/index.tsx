import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from '../../../AuthFlow/SignUp/styles';
import {Colors} from '../../../../utils/Colors';
import BackHeader from '../../../../components/BackHeader';
import {SignUPValidationSchema} from '../../../../utils/Validations';
import InputField from '../../../../components/CustomInputField';
import CustomButton from '../../../../components/CustomButton';
import SelectSportModal from '../../../../components/SelectSports';
import SkillModal from '../../../../components/SkillsModal';

import {getSportsWithSkillLevels} from '../../../../services/calls';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

interface SignUpProps {
  navigation?: any;
}

const GymInformation: React.FC<SignUpProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const textColor2 = isDarkMode ? '#9E9E9E' : '#424242';
  const orColor = isDarkMode ? '#616161' : '#424242';
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [skillModalVisible, setSkillModalVisible] = useState(false);

  const [selectedSports, setSelectedSports] = useState<any[]>([]);
  const route = useRoute<any>();
  const [currentSportForSkill, setCurrentSportForSkill] = useState<any>(null);
  const [lastSkillOptions, setLastSkillOptions] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [dataLoader, setDataLoader] = useState(false);

  // Fetch sports data on mount
  React.useEffect(() => {
    const getData = async () => {
      try {
        setDataLoader(true);
        const res = await getSportsWithSkillLevels();
        if (res?.status === 200) {
          setData(res?.data?.data);
        }
      } catch (e) {
        // handle error
      } finally {
        setDataLoader(false);
      }
    };
    getData();
  }, []);

  // Helper to get skill levels for a sport
  const getSkillOptionsBySport = (sportObj: any) => {
    if (!sportObj || !sportObj.skillLevels) return [];
    // Map skill levels to the format expected by the SkillModal
    return sportObj.skillLevels.map((skillLevel: any) => ({
      id: skillLevel._id,
      title: skillLevel.name,
      description: skillLevel.description || '',
      name: skillLevel.name,
      _id: skillLevel._id,
    }));
  };

  const removeSport = (id: string) => {
    setSelectedSports(prev => prev.filter(sport => sport._id !== id));
  };

  const removeSkill = (sportId: string) => {
    setSelectedSports(prev =>
      prev.map(sport =>
        sport._id === sportId ? {...sport, skill: null} : sport,
      ),
    );
  };

  const handleSelectSport = (sport: any) => {
    const isAlreadySelected = selectedSports.some(s => s._id === sport._id);
    if (!isAlreadySelected) {
      setSelectedSports([...selectedSports, {...sport, skill: null}]);
    }
    setSportModalVisible(false);
  };

  const handleSkillSelect = (skill: any) => {
    const originalSkill =
      lastSkillOptions.find(
        (sk: any) => sk._id === skill.id || sk.id === skill.id,
      ) || skill;
    setSelectedSports(prev =>
      prev.map(s =>
        s._id === currentSportForSkill._id ? {...s, skill: originalSkill} : s,
      ),
    );
    setSkillModalVisible(false);
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Sign Up')} showBackIcon />
        <Text style={[styles.heading, {color: textColor}]}>
          {t('Gym Information')}
        </Text>
        <Text style={[styles.subHeader, {color: textColor2}]}>
          {t('Please enter all your Gym information')}
        </Text>

        <Formik
          initialValues={{name: '', address: '', sports: ''}}
          validationSchema={SignUPValidationSchema}
          onSubmit={values => console.log(values)}>
          {formikProps => {
            const {
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isValid,
              dirty,
            } = formikProps;
            return (
              <View style={styles.inputContainer}>
                <InputField
                  label="Gym Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder={t('Gym Name')}
                  onBlur={handleBlur('name')}
                  error={errors.name}
                  showError={touched.name}
                />
                <InputField
                  label="Enter Address"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  placeholder={t('Enter Address')}
                  onBlur={handleBlur('address')}
                  error={errors.address}
                  showError={touched.address}
                  // iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                />
                <InputField
                  label="Select Sports"
                  value={
                    selectedSports.length > 0
                      ? `${selectedSports.length} ${t('sport(s) selected')}`
                      : ''
                  }
                  placeholder={t('Select Sports')}
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
                      label="Select Skill Level"
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
                            <Text style={{color: textColor, marginRight: 8}}>
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
                  onPress={() => {
                    if (values?.address?.length < 10) {
                      Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Address must be at least 10 characters long',
                      });
                      return;
                    }
                    const sportsData = selectedSports.map(sport => ({
                      sportId: sport._id,
                      skillId: sport.skill ? sport.skill._id : undefined,
                    }));
                    navigation.navigate('VerifyBusiness', {
                      ...route?.params,
                      name: values.name,
                      address: values.address,
                      sports: sportsData,
                    });
                  }}
                  disable={
                    !values?.name ||
                    !values?.address ||
                    !dirty ||
                    selectedSports.length === 0 ||
                    !selectedSports.every(sport => !!sport.skill)
                  }
                  containerStyle={{marginTop: '12%'}}>
                  {t('Continue')}
                </CustomButton>
              </View>
            );
          }}
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
        loader={dataLoader}
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

export default GymInformation;
