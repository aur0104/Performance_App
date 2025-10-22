import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import {Colors} from '../../../utils/Colors';
import MatchTypeDropdown from '../../../components/Dropdown/MatchTypeDropdown';
import CustomButton from '../../../components/CustomButton';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import InputField from '../../../components/CustomInputField';
import AnySvg from '../../../components/AnySvg';
import SelectSportModal from '../../../components/SelectSports';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: {
    skill: string;
    sessionType: string;
    month: string;
    selectedSport: string;
    category: string;
    reviewScore: string;
  }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const [sessionType, setSessionType] = useState('');
  const [category, setCategory] = useState('');
  const [skill, setSkill] = useState('');
  const [reviewScore, setReviewScore] = useState('');
  const [selectedSport, setSelectedSport] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [matchTypeDropdownVisible, setMatchTypeDropdownVisible] =
    useState(false);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [skillDropdownVisible, setSkillDropdownVisible] = useState(false);
  const [reviewScoreDropdownVisible, setReviewScoreDropdownVisible] =
    useState(false);
  const [sportModalVisible, setSportModalVisible] = useState(false);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor2 = isDarkMode ? '#EEEEEE' : '#424242';
  const dynamicInputBg = isDarkMode
    ? Colors.darkInputBg || '#333'
    : Colors.lightInputBg || '#F2F2F2';

  const sessionTypes = ['Sport', 'Match Type'];
  const categoryOptions = [
    'Takedowns',
    'Guards & Positions',
    'Sweeps',
    'Passes',
  ];
  const skillOptions = [
    'Osoto Gari (Collar/Sleeve Grip)',
    'Ouchi Gari',
    'Ippon Seoi Nage',
    'Collar Drag',
  ];
  const reviewScoreOptions = ['1', '2', '3', '4', '5'];

  const onValueChange = (event: any, newDate: any) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (newDate) {
      setSelectedDate(newDate);
    }
  };

  const handleApply = () => {
    const formattedMonth = selectedDate
      ? moment(selectedDate).format('MMMM YYYY')
      : '';
    onApply({
      skill,
      sessionType,
      month: formattedMonth,
      selectedSport,
      category,
      reviewScore,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, {backgroundColor}]}>
          <TouchableOpacity
            style={[styles.dropdown, {backgroundColor: dynamicInputBg}]}
            onPress={() => setSportModalVisible(true)}>
            <Text
              style={[
                styles.dropdownText,
                selectedSport && {color: textColor2},
              ]}>
              {selectedSport ? selectedSport.name : t('Select Sport')}
            </Text>
            <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
          </TouchableOpacity>

          <MatchTypeDropdown
            options={categoryOptions}
            selected={category}
            onSelect={setCategory}
            visible={categoryDropdownVisible}
            toggle={() => setCategoryDropdownVisible(prev => !prev)}
            label={t('Category')}
            style={{marginTop: hp(3)}}
          />

          <MatchTypeDropdown
            options={skillOptions}
            selected={skill}
            onSelect={setSkill}
            visible={skillDropdownVisible}
            toggle={() => setSkillDropdownVisible(prev => !prev)}
            label={t('Skills')}
            style={{marginTop: hp(2)}}
          />

          <MatchTypeDropdown
            options={sessionTypes}
            selected={sessionType}
            onSelect={setSessionType}
            visible={matchTypeDropdownVisible}
            toggle={() => setMatchTypeDropdownVisible(prev => !prev)}
            label={t('Session Type')}
            style={{marginTop: hp(2)}}
          />

          <InputField
            label=""
            value={selectedDate ? moment(selectedDate).format('MMMM YYYY') : ''}
            placeholder={t('Date')}
            iconRightName={isDarkMode ? 'darkDown' : 'lightDown'}
            editable={false}
            containerStyle={{marginHorizontal: 20, marginTop: hp(-1.6)}}
            onRightIconClick={() => setShowPicker(true)}
          />

          {showPicker && (
            <MonthPicker
              onChange={onValueChange}
              value={selectedDate || new Date()}
              minimumDate={new Date(2000, 0)}
              maximumDate={new Date(2100, 11)}
              locale="en"
              mode="full"
            />
          )}

          <MatchTypeDropdown
            options={reviewScoreOptions}
            selected={reviewScore}
            onSelect={setReviewScore}
            visible={reviewScoreDropdownVisible}
            toggle={() => setReviewScoreDropdownVisible(prev => !prev)}
            label={t('Review Score')}
            style={{marginTop: hp(3)}}
          />

          <SelectSportModal
            visible={sportModalVisible}
            onClose={() => setSportModalVisible(false)}
            onSelectSport={sport => setSelectedSport(sport)}
          />

          <CustomButton
            onPress={handleApply}
            containerStyle={{marginVertical: hp(2), width: '86%'}}>
            {t('Apply Filter')}
          </CustomButton>

          <TouchableOpacity
            onPress={onClose}
            style={{marginBottom: hp(4), marginTop: hp(2)}}>
            <Text style={[styles.textButton, {color: textColor2}]}>
              {t('Discard')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000070',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  textButton: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
    textAlign: 'center',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    height: 56,
    borderRadius: 12,
    marginHorizontal: 24,
    marginTop: 24,
  },
  dropdownText: {
    fontFamily: fonts.UrbanistSemiBold,
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 22,
    color: '#9E9E9E',
  },
});
