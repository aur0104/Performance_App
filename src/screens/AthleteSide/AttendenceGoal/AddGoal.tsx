import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import AnySvg from '../../../components/AnySvg';
import CustomButton from '../../../components/CustomButton';
import styles from '../../AddReview/styles/addReviewStyle';
import {hp, wp} from '../../../utils/responsivesness';
import InputField from '../../../components/CustomInputField';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import ResultDropdown from '../../../components/Dropdown/ResultDropdown';
import {createAttendanceGoal} from '../../../services/calls';

export default function AddGoals({navigation}: any) {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);

  const [goalDropdownVisible, setGoalDropdownVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [goalName, setGoalName] = useState('');
  const [sessions, setSessions] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNumberModalVisible, setNumberModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const handleMonthChange = (_event: any, newDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowMonthPicker(false);
    }
    if (newDate) {
      setSelectedMonth(newDate);
    }
  };

  const goalOptions = ['Training Goal', 'Event'];

  const dynamicTextColor = isDarkMode ? Colors.white : Colors.black;
  const dynamicInputBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const isFormValid =
    selectedGoal !== '' &&
    (selectedGoal === 'Training Goal'
      ? selectedMonth !== null && sessions.trim() !== ''
      : selectedGoal === 'Event'
      ? goalName.trim() !== '' && selectedDate !== null
      : true);

  const handleSaveGoal = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      let requestData: any = {};

      if (selectedGoal === 'Training Goal') {
        requestData = {
          type: 'Training Goal',
          month: moment(selectedMonth).format('MMMM'),
          noOfSessions: parseInt(sessions),
        };
      } else if (selectedGoal === 'Event') {
        requestData = {
          type: 'Event',
          name: goalName,
          endDate: selectedDate?.toISOString(),
        };
      }

      const response = await createAttendanceGoal(requestData);

      if (response.status === 201 || response.status === 200) {
        navigation.replace('GoalAdded', {selectedMonth, selectedGoal});
      }
    } catch (error: any) {
      console.error('Error creating goal:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          'Failed to create goal. Please try again.',
        [{text: 'OK'}],
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        title="Add Goal or Event"
        showBackIcon={true}
        containerStyle={{padding: wp(0)}}
      />

      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.labelText, {color: dynamicTextColor}]}>
          {t('What are you working toward?')}
        </Text>

        <ResultDropdown
          options={goalOptions}
          selected={selectedGoal}
          onSelect={value => {
            setSelectedGoal(value);
          }}
          visible={goalDropdownVisible}
          toggle={() => setGoalDropdownVisible(!goalDropdownVisible)}
          label={t('Select the type of goal or event')}
        />

        {selectedGoal === 'Training Goal' && (
          <>
            <Text style={[styles.labelText, {color: dynamicTextColor}]}>
              {t('Select Your Month')}
            </Text>
            <TouchableOpacity
              style={[
                styles.dropdown,
                {backgroundColor: dynamicInputBg, marginHorizontal: 20},
              ]}
              onPress={() => setShowMonthPicker(true)}>
              <Text
                style={[
                  styles.dropdownText,
                  selectedMonth && {color: dynamicTextColor},
                ]}>
                {selectedMonth
                  ? moment(selectedMonth).format('MMMM YYYY')
                  : t('Select Month')}
              </Text>
              <AnySvg
                name={isDarkMode ? 'darkDown' : 'lightDown'}
                size={24}
                svgStyle={{marginRight: 4}}
              />
            </TouchableOpacity>

            <Text style={[styles.labelText, {color: dynamicTextColor}]}>
              {t('How many sessions do you want to complete this month?')}
            </Text>
            <TouchableOpacity
              onPress={() => setNumberModalVisible(true)}
              style={{
                marginHorizontal: 20,
                marginBottom: hp(2),
                marginTop: -26,
              }}>
              <InputField
                label=""
                placeholder={t('Add your completed goal')}
                value={sessions}
                editable={false}
                pointerEvents="none"
                iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
                onRightIconClick={() => setNumberModalVisible(true)}
                containerStyle={{paddingHorizontal: 8}}
              />
            </TouchableOpacity>
          </>
        )}

        {selectedGoal === 'Event' && (
          <>
            <Text style={[styles.labelText, {color: dynamicTextColor}]}>
              {t('Name this goal, comp or milestone')}
            </Text>
            <InputField
              label=""
              placeholder={t('Goal Name')}
              value={goalName}
              onChangeText={setGoalName}
              containerStyle={{
                marginHorizontal: 20,
                marginBottom: hp(2),
                marginTop: -26,
              }}
            />

            <Text style={[styles.labelText, {color: dynamicTextColor}]}>
              {t('When do you want to achieve this?')}
            </Text>
            <TouchableOpacity
              style={[
                styles.dropdown,
                {backgroundColor: dynamicInputBg, marginHorizontal: 20},
              ]}
              onPress={() => setDatePickerVisibility(true)}>
              <Text
                style={[
                  styles.dropdownText,
                  selectedDate && {color: dynamicTextColor},
                ]}>
                {selectedDate
                  ? moment(selectedDate).format('DD MMM YYYY')
                  : t('Target Date')}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />

        {showMonthPicker && (
          <MonthPicker
            onChange={handleMonthChange}
            value={selectedMonth || new Date()}
            minimumDate={new Date(2000, 0)}
            maximumDate={new Date(2100, 11)}
            locale="en"
            mode="full"
          />
        )}
      </ScrollView>

      <CustomButton
        onPress={handleSaveGoal}
        disable={!isFormValid || isLoading}
        containerStyle={{marginBottom: '10%'}}>
        {isLoading ? <ActivityIndicator color={Colors.white} /> : t('Save')}
      </CustomButton>

      {isNumberModalVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
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
              {Array.from({length: 50}, (_, i) => i + 1).map(num => (
                <TouchableOpacity
                  key={num}
                  onPress={() => {
                    setSessions(num.toString());
                    setNumberModalVisible(false);
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
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setNumberModalVisible(false)}
              style={{
                marginTop: 10,
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text style={{color: '#FF5555', fontSize: 16}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
