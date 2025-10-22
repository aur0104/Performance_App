import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../utils/Colors';
import AnySvg from '../AnySvg';
import SelectSportModal from '../SelectSports';
import styles from './styles';

const sportsData = {
  Weightlifting: {
    barData: [10, 20, 40, 60, 80],
    labels: [
      'Beginner',
      'Intermediate',
      'Advanced',
      'Competitive Lifter',
      'Elite Lifter',
    ],
    barColors: ['#F4D35E', '#43AA8B', '#2976BA', '#F25C54', '#9B5DE5'],
  },
  Boxing: {
    barData: [15, 25, 45, 65, 85],
    labels: ['Novice', 'Amateur', 'Advanced Amateur', 'Semi-Pro', 'Pro'],
    barColors: ['#F4D35E', '#43AA8B', '#2976BA', '#F25C54', '#9B5DE5'],
  },
  Yoga: {
    barData: [35, 55, 75, 85],
    labels: ['Beginner', 'Intermediate', 'Advanced', 'Instructor'],
    barColors: ['#F4D35E', '#43AA8B', '#2976BA', '#9B5DE5'],
  },
  'Field Sports': {
    barData: [40, 60, 80, 80, 90],
    labels: ['Junior', 'Junior Elite', 'Club Level', 'Sub Elite', 'Pro'],
    barColors: ['#F4D35E', '#43AA8B', '#2976BA', '#F25C54', '#9B5DE5'],
  },
  'Brazilian Jiu-Jitsu (BJJ)': {
    barData: [20, 50, 60, 80, 80],
    labels: ['White', 'Blue', 'Purple', 'Brown', 'Black'],
    barColors: ['#FFFFFF', '#2976BA', '#7086FD', '#964B00', '#424242'],
  },
};

const ageGroupData = {
  labels: ['18-24', '25-34', '31-40', '45+'],
  barData: [60, 80, 90, 40],
  barColors: ['#F75555', '#1F94FF', '#7086FD', '#ECC401'],
};

const GymStatsGraph = () => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : Colors.blackLight;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const [sportModalVisible, setSportModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState<any>({
    name: 'Weightlifting',
  });
  const [selectedGender, setSelectedGender] = useState<
    'Male' | 'Female' | 'Other'
  >('Male');

  const getSportKey = () => {
    const sportName = selectedSport?.name;
    if (
      [
        'Football',
        'Padel',
        'Tennis',
        'Rugby league',
        'Rugby union',
        'Australian rules football',
      ].includes(sportName)
    ) {
      return 'Field Sports';
    } else if (sportName === 'Brazilian Jiu-Jitsu (BJJ)') {
      return 'Brazilian Jiu-Jitsu (BJJ)';
    } else if (sportName === 'Boxing') {
      return 'Boxing';
    } else if (sportName === 'Yoga' || sportName === 'Reformer Pilates') {
      return 'Yoga';
    } else if (sportName === 'Weightlifting') {
      return 'Weightlifting';
    } else {
      return 'Field Sports';
    }
  };

  const sportKey = getSportKey();
  const selectedSportData = sportsData[sportKey] || sportsData['Weightlifting'];

  const genderPercentage = {
    Male: 80,
    Female: 50,
    Other: 20,
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.mainTitle, {color: textColor}]}>
        {t('Gym Stats')}
      </Text>

      <View style={styles.rowBetween}>
        <Text style={[styles.subTitle, {color: textColor}]}>
          {t('Skill/Belt Level Distribution')}
        </Text>
        <TouchableOpacity
          style={[styles.dropDown, {borderColor: textColor2}]}
          onPress={() => setSportModalVisible(true)}>
          <Text style={[styles.dropDownText, {color: textColor2}]}>
            {selectedSport?.name?.split(' ')[0]}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={15} />
        </TouchableOpacity>
      </View>

      <SelectSportModal
        visible={sportModalVisible}
        onClose={() => setSportModalVisible(false)}
        onSelectSport={(sport: any) => {
          setSelectedSport(sport);
          setSportModalVisible(false);
        }}
      />

      <View style={styles.graphContainer}>
        <View style={styles.yAxis}>
          {[0, 20, 40, 60, 80].reverse().map(num => (
            <Text key={num} style={[styles.yText, {color: textColor2}]}>
              {num}
            </Text>
          ))}
        </View>

        <View style={{flex: 1}}>
          <View style={styles.graphArea}>
            {[...Array(5)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.graphLine,
                  {
                    backgroundColor: separatorColor,
                    bottom: `${(i / 4) * 100}%`,
                    width: '92%',
                    alignSelf: 'flex-start',
                  },
                ]}
              />
            ))}

            <View style={styles.barGroup}>
              {selectedSportData.barData.map((value, index) => (
                <View key={index} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${value}%`,
                        backgroundColor: selectedSportData.barColors[index],
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.labelRow}>
            {selectedSportData.labels.map((label, index) => (
              <View key={index} style={styles.labelWrapper}>
                <Text style={[styles.barLabelBottom, {color: textColor}]}>
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.toggleContainer, {borderRadius: 10}]}>
        {['Male', 'Female', 'Other'].map(gender => (
          <TouchableOpacity
            key={gender}
            onPress={() => setSelectedGender(gender as any)}
            style={[
              styles.toggleButton,
              {
                backgroundColor:
                  selectedGender === gender
                    ? Colors.primaryColor
                    : isDarkMode
                    ? '#424242'
                    : '#E0E0E0',
                borderColor: borderColor,
              },
            ]}>
            <Text
              style={{
                color: selectedGender === gender ? Colors.white : textColor2,
              }}>
              {gender}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.progressRow}>
        <Text style={[styles.progressLabel, {color: textColor}]}>
          {selectedGender}
        </Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${genderPercentage[selectedGender]}%`,
                backgroundColor: '#62B2FD',
              },
            ]}
          />
        </View>
        <Text style={[styles.progressPercent, {color: textColor}]}>
          {genderPercentage[selectedGender]}%
        </Text>
      </View>

      <View style={[styles.separator, {backgroundColor: separatorColor}]} />

      <Text style={[styles.subTitle, {color: textColor, marginBottom: 16}]}>
        {t('Active Members by Age Group')}
      </Text>

      <View style={styles.graphContainer}>
        <View style={styles.yAxis}>
          {[0, 20, 40, 60, 80].reverse().map(num => (
            <Text key={num} style={[styles.yText, {color: textColor2}]}>
              {num === 80 ? `${num}+` : num}
            </Text>
          ))}
        </View>

        <View style={{flex: 1}}>
          <View style={styles.graphArea}>
            {[...Array(5)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.graphLine,
                  {
                    backgroundColor: separatorColor,
                    bottom: `${(i / 4) * 100}%`,
                    width: '92%',
                    alignSelf: 'flex-start',
                  },
                ]}
              />
            ))}

            <View style={styles.barGroup}>
              {ageGroupData.barData.map((value, index) => (
                <View key={index} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${value}%`,
                        backgroundColor: ageGroupData.barColors[index],
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.labelRow}>
            {ageGroupData.labels.map((label, index) => (
              <View key={index} style={styles.labelWrapper}>
                <Text style={[styles.barLabelBottom, {color: textColor}]}>
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default GymStatsGraph;
