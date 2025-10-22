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

interface ScheduleProps {
  navigation?: any;
}

const AddPlan: React.FC<ScheduleProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);

  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState<any>(null);
  const [trainingName, setTrainingName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [isTemplateModalVisible, setTemplateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [finishTime, setFinishTime] = useState<Date | null>(null);
  const [timePickerMode, setTimePickerMode] = useState<
    'start' | 'finish' | null
  >(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [limit, setLimit] = useState();
  const [isLimitModalVisible, setLimitModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

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

  const dynamicInputBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const dynamicTextColor = isDarkMode ? Colors.white : Colors.black;

  const isFormValid =
    trainingName.trim() !== '' &&
    selectedSport !== null &&
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
        rightButtonText=" + Template"
        onRightButtonPress={() => setTemplateModalVisible(true)}
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
            {selectedSport ? selectedSport.name : t('Select Sport')}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
          onPress={() => setDatePickerVisibility(true)}>
          <Text
            style={[
              styles.dropdownText,
              selectedSkill.length > 0 && {color: dynamicTextColor},
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
              selectedSkill.length > 0 && {color: dynamicTextColor},
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
              selectedSkill.length > 0 && {color: dynamicTextColor},
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

        <View style={[styles.bottomButtonWrapper, {paddingVertical: hp(6)}]}>
          <CustomButton
            onPress={() => navigation.navigate('AddTrainingSubmission')}
            disable={!isFormValid}>
            {t('Save')}
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

      {isTemplateModalVisible && (
        <TouchableWithoutFeedback
          onPress={() => setTemplateModalVisible(false)}>
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
                width: 207,
                height: 142,
                backgroundColor: isDarkMode
                  ? Colors.darkBackground
                  : Colors.white,
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              {['Template 1', 'Template 2', 'Template 3'].map(
                (template, index) => (
                  <View key={index} style={{paddingHorizontal: 20}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 40,
                      }}
                      onPress={() => {
                        navigation.navigate('AddSchedule'),
                          setTemplateModalVisible(false);
                      }}>
                      <Text
                        style={{
                          color: isDarkMode ? Colors.white : Colors.black,
                        }}>
                        {template}
                      </Text>
                      <AnySvg
                        name={isDarkMode ? 'editIcon' : 'lightEdit'}
                        size={18}
                      />
                    </TouchableOpacity>
                    {index !== 2 && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: isDarkMode ? '#424242' : '#E0E0E0',
                        }}
                      />
                    )}
                  </View>
                ),
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

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
export default AddPlan;
