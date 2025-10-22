import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import AnySvg from '../../../components/AnySvg';
import SelectSportModal from '../../../components/SelectSportModal/SelectSportModal';
import CustomButton from '../../../components/CustomButton';
import styles from '../../AddReview/styles/addReviewStyle';
import {hp, wp} from '../../../utils/responsivesness';
import InputField from '../../../components/CustomInputField';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Checkbox from '../../../components/CheckBox';
import SkillMultiSelect from '../../../components/Dropdown/SkillMultiSelect';
import CategoryDropdown from '../../../components/Dropdown/CategoryDropdown';

interface ScheduleProps {
  navigation?: any;
}

const AddSchedule: React.FC<ScheduleProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);

  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState('Football');

  const [trainingName, setTrainingName] = useState(
    'Aussie Rules Football training',
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Ball Handling & Control',
  ]);

  const [categorySkills, setCategorySkills] = useState<{
    [key: string]: string[];
  }>({});

  const [limit, setLimit] = useState('50');
  const [isLimitModalVisible, setLimitModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date('2025-03-10'),
  );
  const [startTime, setStartTime] = useState<Date>(
    new Date('2025-03-10T22:00:00'),
  );
  const [finishTime, setFinishTime] = useState<Date>(
    new Date('2025-03-10T23:00:00'),
  );
  const [timePickerMode, setTimePickerMode] = useState<
    'start' | 'finish' | null
  >(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const dynamicTextColor = isDarkMode ? Colors.white : Colors.black;
  const dynamicInputBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (time: Date) => {
    if (timePickerMode === 'start') {
      setStartTime(time);
    } else if (timePickerMode === 'finish') {
      setFinishTime(time);
    }
    setTimePickerMode(null);
    setTimePickerVisibility(false);
  };

  const handleSelectMember = () => {
    navigation.navigate('SelectMember', {
      onSelect: (members: any[]) => setSelectedMembers(members),
    });
  };

  const handleSelectCoach = () => {
    navigation.navigate('SelectCoach', {
      onSelect: (coach: any) => setSelectedCoach(coach),
    });
  };

  const categoryOptions = [
    'Ball Handling & Control',
    'Kicking (Field & Scoring)',
    'Marking (Catching)',
    'Passes',
    'Evasion & Movement',
    'Ruck & Tap Work (for tall players)',
    'Position Control',
    'Defensive Skills',
    'Transition & Game Sense',
  ];

  const skillOptions = [
    'One-handed Pick-up',
    'Two-handed Pick-up',
    'Ball Tuck (securing the ball under pressure)',
    'Handball Receive (catching handpasses cleanly)',
    'Clean Ground Ball Collection',
    'Reaction Pick-up (reacting to erratic bounces)',
    'Ball Bounce (running bounce)',
    'Ball Fumble Recovery',
  ];

  const isFormValid =
    trainingName.trim() !== '' &&
    selectedSport !== null &&
    selectedCategory !== null &&
    selectedSkills !== null &&
    selectedDate !== null &&
    startTime !== null &&
    finishTime !== null;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <BackHeader
        title="Add Training"
        showBackIcon={true}
        containerStyle={{marginBottom: wp(0)}}
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <InputField
          label={t(' ')}
          placeholder={t('Your Training Name')}
          value={trainingName}
          onChangeText={setTrainingName}
          containerStyle={{marginHorizontal: 20, marginBottom: hp(2)}}
        />

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={() => setSportModalVisible(true)}>
          <Text
            style={[
              styles.dropdownText,
              selectedSport && {color: dynamicTextColor},
            ]}>
            {selectedSport
              ? selectedSport.name || 'Australian Rules Football'
              : t('Select Sport')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={() => setCategoryDropdownVisible(true)}>
          <Text
            style={[
              styles.dropdownText,
              selectedCategories.length > 0 && {color: dynamicTextColor},
            ]}>
            {selectedCategories.length > 0
              ? `Categories Selected`
              : t('Select Categories')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        {categoryDropdownVisible && (
          <CategoryDropdown
            onToggle={() => {}}
            options={categoryOptions}
            selected={selectedCategories}
            onSelect={(value: string) => {
              if (
                !selectedCategories.includes(value) &&
                selectedCategories.length < 3
              ) {
                setSelectedCategories([...selectedCategories, value]);
              }
            }}
            onRemove={(value: string) => {
              setSelectedCategories(
                selectedCategories.filter(c => c !== value),
              );
              setCategorySkills(prev => {
                const updated = {...prev};
                delete updated[value];
                return updated;
              });
            }}
            visible={categoryDropdownVisible}
            toggle={() => setCategoryDropdownVisible(false)}
            onClose={() => setCategoryDropdownVisible(false)}
            showAddCategoryButton={true}
          />
        )}

        {selectedCategories.map(category => (
          <View key={category} style={{marginTop: 10}}>
            <Text
              style={[
                styles.labelText,
                {color: dynamicTextColor, fontSize: 16},
              ]}>
              {category} - {t('Select Skills')}
            </Text>

            <TouchableOpacity
              style={[
                styles.dropdown,
                {backgroundColor: dynamicInputBg, marginHorizontal: 20},
              ]}
              onPress={() => {
                setCategorySkills(prev => ({
                  ...prev,
                  [`${category}_visible`]: true,
                }));
              }}>
              <Text style={[styles.dropdownText]}>
                {categorySkills[category]?.length > 0
                  ? `${categorySkills[category].length} Skills Selected`
                  : t('Select Skills')}
              </Text>
              <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
            </TouchableOpacity>

            {categorySkills[`${category}_visible`] && (
              <SkillMultiSelect
                showInfo={true}
                options={skillOptions}
                selected={categorySkills[category] || []}
                onSelect={(skill: string) => {
                  setCategorySkills(prev => ({
                    ...prev,
                    [category]: prev[category]
                      ? [...prev[category], skill]
                      : [skill],
                  }));
                }}
                onRemove={(skill: string) => {
                  setCategorySkills(prev => ({
                    ...prev,
                    [category]: prev[category].filter(s => s !== skill),
                  }));
                }}
                visible={true}
                toggle={() => {
                  setCategorySkills(prev => ({
                    ...prev,
                    [`${category}_visible`]: false,
                  }));
                }}
                onClose={() => {
                  setCategorySkills(prev => ({
                    ...prev,
                    [`${category}_visible`]: false,
                  }));
                }}
              />
            )}

            {categorySkills[category]?.length > 0 && (
              <View style={[styles.selectedChipsContainer]}>
                {categorySkills[category].map((skill, skillIndex) => (
                  <View
                    key={skillIndex}
                    style={[
                      styles.skillChip,
                      {backgroundColor: dynamicInputBg},
                    ]}>
                    <Text style={[styles.chipText, {color: dynamicTextColor}]}>
                      {skill}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setCategorySkills(prev => ({
                          ...prev,
                          [category]: prev[category].filter(s => s !== skill),
                        }));
                      }}>
                      <Text style={styles.chipClose}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={() => setDatePickerVisibility(true)}>
          <Text
            style={[
              styles.dropdownText,
              selectedDate && {color: dynamicTextColor},
            ]}>
            {selectedDate
              ? moment(selectedDate).format('DD MMM YYYY')
              : t('Select Date')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={() => {
            setTimePickerMode('start');
            setTimePickerVisibility(true);
          }}>
          <Text
            style={[
              styles.dropdownText,
              startTime && {color: dynamicTextColor},
            ]}>
            {startTime ? moment(startTime).format('hh:mm A') : t('Start Time')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={() => {
            setTimePickerMode('finish');
            setTimePickerVisibility(true);
          }}>
          <Text
            style={[
              styles.dropdownText,
              finishTime && {color: dynamicTextColor},
            ]}>
            {finishTime
              ? moment(finishTime).format('hh:mm A')
              : t('Finish Time')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        <InputField
          label={t(' ')}
          placeholder={t('Class Limit')}
          value={limit ? limit.toString() : ''}
          onChange={text => setLimit(text)}
          iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
          onRightIconClick={() => setLimitModalVisible(true)}
          editable={false}
          containerStyle={{
            marginTop: -24,
            width: '90%',
            alignSelf: 'center',
            marginBottom: 18,
          }}
        />

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={handleSelectCoach}>
          <Text
            style={[
              styles.dropdownText,
              selectedCoach && {color: dynamicTextColor},
            ]}>
            {selectedCoach ? selectedCoach.name : t('Select Coach')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={handleSelectMember}>
          <Text
            style={[
              styles.dropdownText,
              selectedMembers.length > 0 && {color: dynamicTextColor},
            ]}>
            {selectedMembers.length > 0
              ? selectedMembers.map(m => m.name).join(', ')
              : t('Select Members')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        <View style={[styles.reviewBox, {backgroundColor: dynamicInputBg}]}>
          <TextInput
            style={[styles.reviewInput, {color: dynamicTextColor}]}
            multiline
            numberOfLines={4}
            value={reviewText}
            onChangeText={setReviewText}
            placeholder={t('Write Note')}
            placeholderTextColor={'#9E9E9E'}
          />
        </View>

        <Checkbox
          checked={isChecked}
          setChecked={setIsChecked}
          title={t('Recurring Class')}
          checkBoxStyle={{paddingHorizontal: 20, marginBottom: 20}}
        />

        <View style={[styles.bottomButtonWrapper, {paddingVertical: 20}]}>
          <CustomButton
            onPress={() => navigation.goBack()}
            disable={isFormValid}>
            {t('Save')}
          </CustomButton>
          <CustomButton
            //onPress={() => navigation.navigate('AddTrainingSubmission')}
            disable={isFormValid}
            isBackground={false}
            containerStyle={{
              marginTop: 15,
              marginBottom: 20,
              backgroundColor: backgroundColor,
            }}
            textColor={Colors.white}>
            {t('Save Template')}
          </CustomButton>
        </View>

        <SelectSportModal
          visible={sportModalVisible}
          onClose={() => setSportModalVisible(false)}
          onSelectSport={sport => setSelectedSport(sport)}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setTimePickerVisibility(false)}
        />
      </ScrollView>
      {isLimitModalVisible && (
        <TouchableWithoutFeedback onPress={() => setLimitModalVisible(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                maxHeight: '60%',
                backgroundColor: isDarkMode
                  ? Colors.darkBackground
                  : Colors.white,

                padding: 20,
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {Array.from({length: 100}, (_, i) => i + 1).map(number => (
                  <TouchableOpacity
                    key={number}
                    onPress={() => {
                      setLimit(number);
                      setLimitModalVisible(false);
                    }}
                    style={{
                      paddingVertical: 12,
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: isDarkMode ? '#424242' : '#E0E0E0',
                    }}>
                    <Text
                      style={{
                        color: isDarkMode ? Colors.white : Colors.black,
                        fontSize: 16,
                      }}>
                      {number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={() => setLimitModalVisible(false)}
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Text style={{color: '#FF5555', fontSize: 16}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

export default AddSchedule;
