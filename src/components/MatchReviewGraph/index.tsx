import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import {styles} from './styles';
import AnySvg from '../AnySvg';
import SelectSportModal from '../SelectSports';
import {hp} from '../../utils/responsivesness';
import CustomLineChart from './customGraph';

// Generate year options dynamically based on current year
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  // Include 2 years before current year and 3 years after
  for (let i = currentYear - 2; i <= currentYear + 3; i++) {
    years.push(i);
  }

  return years;
};

// Generate all months for the current year
const generateMonthOptions = () => {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
};

interface MatchReviewGraphProps {
  reviewOptions?: string[];
  defaultReview?: string;
  monthOptions?: string[];
  yearOptions?: number[];
  showMatchResults?: boolean;
  showReviewDropdown?: boolean;
  titleOverride?: string;
}

const MatchReviewGraph: React.FC<MatchReviewGraphProps> = ({
  reviewOptions = ['Skill Practice', 'Match Type'],
  defaultReview = '',
  monthOptions = generateMonthOptions(),
  yearOptions = generateYearOptions(),
  showReviewDropdown,
  titleOverride,
}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkInputBg : '#F5F5F5';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : '#C9C9C9';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const [selectedReview, setSelectedReview] = useState('');
  const [selectedSport, setSelectedSport] = useState({name: t('Football')});
  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthListVisible, setMonthListVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [yearListVisible, setYearListVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const DropDownSelector = ({
    label,
    value,
    onPress,
    color,
    iconColor,
    borderColor,
  }: any) => (
    <TouchableOpacity
      style={[styles.dropDown, {borderColor}]}
      onPress={onPress}>
      <Text style={[styles.dropDownText, {color}]}>{value || label}</Text>
      <AnySvg name={iconColor} size={15} />
    </TouchableOpacity>
  );

  const OptionsModal = ({
    visible,
    options,
    onSelect,
    onClose,
    backgroundColor,
    textColor,
    separatorColor,
  }: any) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor}]}>
          {options.map((option: string, idx: number) => (
            <React.Fragment key={option}>
              <TouchableOpacity
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}>
                <Text style={[styles.modalTitle, {color: textColor}]}>
                  {option}
                </Text>
              </TouchableOpacity>
              {idx !== options.length - 1 && (
                <View
                  style={[styles.separator, {backgroundColor: separatorColor}]}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, {color: textColor}]}>
          {selectedReview
            ? `${t(selectedReview)} ${t('Review')}`
            : titleOverride
            ? titleOverride
            : defaultReview}
        </Text>

        {showReviewDropdown && (
          <DropDownSelector
            label={t('Select Review')}
            value={selectedReview}
            onPress={() => setModalVisible(true)}
            color={textColor2}
            iconColor={isDarkMode ? 'darkDown' : 'lightDown'}
            borderColor={textColor2}
          />
        )}
      </View>

      <OptionsModal
        visible={modalVisible}
        options={reviewOptions}
        onSelect={setSelectedReview}
        onClose={() => setModalVisible(false)}
        backgroundColor={backgroundColor}
        textColor={textColor}
        separatorColor={separaterColor}
      />

      <View style={styles.filtersRow}>
        <DropDownSelector
          label={selectedSport?.name?.split(' ')[0]}
          value={selectedSport?.name?.split(' ')[0]}
          onPress={() => setSportModalVisible(true)}
          color={textColor2}
          iconColor={isDarkMode ? 'darkDown' : 'lightDown'}
          borderColor={borderColor}
        />
        <DropDownSelector
          label={t('March')}
          value={selectedMonth}
          onPress={() => setMonthListVisible(!monthListVisible)}
          color={textColor2}
          iconColor={isDarkMode ? 'darkDown' : 'lightDown'}
          borderColor={borderColor}
        />
        {monthListVisible && (
          <View
            style={[
              styles.dropdownOverlay,
              {backgroundColor, left: hp(15), maxHeight: 200},
            ]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {monthOptions.map(month => (
                <TouchableOpacity
                  key={month}
                  onPress={() => {
                    setSelectedMonth(t(month));
                    setMonthListVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.modalTitle,
                      {color: textColor, fontSize: 16},
                    ]}>
                    {t(month)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        <DropDownSelector
          label={t('2025')}
          value={selectedYear}
          onPress={() => setYearListVisible(!yearListVisible)}
          color={textColor2}
          iconColor={isDarkMode ? 'darkDown' : 'lightDown'}
          borderColor={borderColor}
        />
        {yearListVisible && (
          <View
            style={[styles.dropdownOverlay, {backgroundColor, maxHeight: 200}]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {yearOptions.map(year => (
                <TouchableOpacity
                  key={year}
                  onPress={() => {
                    setSelectedYear(`${year}`);
                    setYearListVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.modalTitle,
                      {color: textColor, fontSize: 16},
                    ]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.iconButton,
            {backgroundColor: isDarkMode ? '#797979' : '#E0E0E0'},
          ]}>
          <AnySvg name={isDarkMode ? 'shareIcon' : 'lightShare'} size={15} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconButton,
            {backgroundColor: isDarkMode ? '#797979' : '#E0E0E0'},
          ]}>
          <AnySvg
            name={isDarkMode ? 'downloadIcon' : 'lightDownload'}
            size={15}
          />
        </TouchableOpacity>
      </View>

      <CustomLineChart
        datasets={[
          [1, 2, 3, 2, 4, 2, 3],
          [1, 2, 1, 3, 1, 2, 3],
          [1, 1, 2, 1, 2, 3, 2],
        ]}
        labels={['14', '15', '16', '17', '18', '19', '20']}
        yAxisLabels={['5', '4', '3', '2', '1']}
        lineColors={['#4ADE80', '#FACC15', '#135AAC']}
        textColor={textColor2}
        isDarkMode={isDarkMode}
      />

      <View style={styles.legendRow}>
        <View style={[styles.legendBox, {backgroundColor: Colors.blue}]} />
        <Text style={[styles.legendText, {color: textColor2}]}>
          {t('Personal Feedback')}
        </Text>
        <View style={[styles.legendBox, {backgroundColor: Colors.green}]} />
        <Text style={[styles.legendText, {color: textColor2}]}>
          {t('Peer Feedback')}
        </Text>
        <View style={[styles.legendBox, {backgroundColor: Colors.Yellow}]} />
        <Text style={[styles.legendText, {color: textColor2}]}>
          {t('Coach Feedback')}
        </Text>
      </View>

      {selectedReview === t('Match Type') && (
        <>
          <View style={[styles.separator, {backgroundColor: separaterColor}]} />
          <View style={{marginBottom: 20}}>
            <Text style={[styles.sectionTitle, {color: textColor}]}>
              {t('Match Results')}
            </Text>
            <View style={styles.resultsRow}>
              <Text style={[styles.resultText, {color: textColor}]}>
                {t('Win')}: 50
              </Text>
              <Text style={[styles.resultText, {color: textColor}]}>
                {t('Draw')}: 45
              </Text>
              <Text style={[styles.resultText, {color: textColor}]}>
                {t('Loss')}: 10
              </Text>
            </View>
          </View>
        </>
      )}

      <SelectSportModal
        visible={sportModalVisible}
        onClose={() => setSportModalVisible(false)}
        onSelectSport={(sport: any) => {
          setSelectedSport(sport);
          setSportModalVisible(false);
        }}
        data={[]}
      />
    </View>
  );
};

export default MatchReviewGraph;
