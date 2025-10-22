import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from '../../../AuthFlow/SignUp/styles';
import BackHeader from '../../../../components/BackHeader';
import {SignUPValidationSchema} from '../../../../utils/Validations';
import InputField from '../../../../components/CustomInputField';
import {Colors} from '../../../../utils/Colors';
import CustomButton from '../../../../components/CustomButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SkillModal from '../../../../components/SkillsModal';
import SelectSportModal from '../../../../components/SelectSports';
import {
  BJJ,
  Boxing,
  sports,
  Weightlifting,
  Yoga,
} from '../../../../utils/DummyData';
import {hp} from '../../../../utils/responsivesness';
import DeletePopupModal from '../../../../components/DeleteModal';
import {IMAGES} from '../../../../assets/images';

interface UpdateAccountProps {
  navigation?: any;
}

const UpdateAccount: React.FC<UpdateAccountProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const viewBg = isDarkMode ? '#424242' : '#F2F2F2';

  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [skillModalVisible, setSkillModalVisible] = useState(false);
  const [selectedSports, setSelectedSports] = useState<any[]>([]);
  const [selectedSport, setSelectedSport] = useState<any>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const getSkillOptionsBySport = (sportName: string) => {
    if (!sportName) return [];
    if (['Boxing', 'Muay Thai'].includes(sportName)) return Boxing;
    if (['Yoga', 'Pilates'].includes(sportName)) return Yoga;
    if (['Weightlifting', 'Olympic Lifting'].includes(sportName))
      return Weightlifting;
    if (
      [
        'Brazilian Jiu-Jitsu (BJJ)',
        'Brazilian Jiu Jitsu (BJJ)',
        'BJJ',
      ].includes(sportName)
    )
      return BJJ;
    return sports;
  };

  const levelOptions = getSkillOptionsBySport(selectedSport?.name);

  const handleSelectSport = (sport: any) => {
    if (!selectedSports.some(s => s.id === sport.id)) {
      setSelectedSports(prev => [...prev, sport]);
    }

    setSelectedSport(sport);
    setSelectedSkill(null);
  };

  const removeSport = (id: string) => {
    const updated = selectedSports.filter(s => s.id !== id);
    setSelectedSports(updated);

    if (selectedSport && selectedSport.id === id) {
      setSelectedSport(null);
      setSelectedSkill(null);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BackHeader
          title={t('My Account')}
          showBackIcon
          containerStyle={{marginBottom: 0}}
        />

        <Formik
          initialValues={{
            name: 'Adam Scout',
            email: 'info@adamscout.com',
            dob: '23 march 1997',
            gender: 'Male',
            weight: '60 kg',
            height: '5.5 inches',
            sports: '',
            skills: '',
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
            <View style={[styles.inputContainer]}>
              <InputField
                label=""
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder={t('Your Name')}
                onBlur={handleBlur('name')}
                iconLeftName="user"
                error={errors.name}
                showError={touched.name}
              />
              <InputField
                label=""
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
                  label=""
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
                label=""
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
                label=""
                value={values.weight}
                onChangeText={handleChange('weight')}
                placeholder={t('Weight')}
                onBlur={handleBlur('weight')}
                iconLeftName="weight"
                error={errors.weight}
                showError={touched.weight}
              />
              <InputField
                label=""
                value={values.height}
                onChangeText={handleChange('height')}
                placeholder={t('Height')}
                onBlur={handleBlur('height')}
                iconLeftName="weight"
                error={errors.height}
                showError={touched.height}
              />

              <InputField
                label=""
                value={selectedSport?.name || ''}
                placeholder={t('Select Sports')}
                iconLeftName="ticket"
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setSportModalVisible(true)}
                editable={false}
              />

              <View
                style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                {selectedSports.map(sport => (
                  <View
                    key={sport.id}
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
                    <Text style={{color: textColor, marginRight: 8}}>
                      {sport.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeSport(sport.id)}>
                      <Text style={{color: Colors.red}}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <InputField
                label=""
                value={selectedSkill?.title || ''}
                placeholder={t('Select Skill/Belt Level')}
                iconLeftName="swap"
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => {
                  if (selectedSport) {
                    setSkillModalVisible(true);
                  }
                }}
                editable={false}
              />

              {selectedSport?.name &&
                [
                  'Brazilian Jiu-Jitsu (BJJ)',
                  'Brazilian Jiu Jitsu (BJJ)',
                  'BJJ',
                ].includes(selectedSport.name) &&
                selectedSkill?.title && (
                  <View style={styles.imageView}>
                    <Image
                      source={
                        selectedSkill.title.toLowerCase() === 'white'
                          ? IMAGES.belt
                          : selectedSkill.title.toLowerCase() === 'blue'
                          ? IMAGES.blueBelt
                          : selectedSkill.title.toLowerCase() === 'purple'
                          ? IMAGES.purpleBelt
                          : selectedSkill.title.toLowerCase() === 'brown'
                          ? IMAGES.brownBelt
                          : selectedSkill.title.toLowerCase() === 'black'
                          ? IMAGES.blackBelt
                          : null
                      }
                      style={styles.image}
                    />
                  </View>
                )}

              <CustomButton
                onPress={() => {
                  navigation.navigate('AthleteSettings');
                }}
                disable={isValid || !dirty}
                containerStyle={{marginTop: '12%'}}>
                {t('Update')}
              </CustomButton>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => setShowDelete(true)}>
                <Text style={styles.deleteText}>{t('Delete Account')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>

      <DeletePopupModal
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        onDelete={() => {
          setShowDelete(false);
        }}
      />

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

      <SelectSportModal
        visible={sportModalVisible}
        onClose={() => setSportModalVisible(false)}
        onSelectSport={handleSelectSport}
        data={[]}
      />

      <SkillModal
        visible={skillModalVisible}
        data={levelOptions}
        onClose={() => setSkillModalVisible(false)}
        onSelect={skill => {
          setSelectedSkill(skill);
          setSkillModalVisible(false);
        }}
      />
    </View>
  );
};

export default UpdateAccount;
