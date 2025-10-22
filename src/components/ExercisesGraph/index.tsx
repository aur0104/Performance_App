import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {Colors} from '../../utils/Colors';
import AnySvg from '../AnySvg';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const barData = [7, 5, 3, 6, 6, 4, 2];
const barColors = [
  '#62B2FD',
  '#9BDFC4',
  '#F99BAB',
  '#FFB44F',
  '#9F97F7',
  '#CED6DE',
  '#0D7FE9',
];

const ExerciseGraph = () => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [selectedFilter, setSelectedFilter] = useState('Day');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : Colors.blackLight;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const filters = ['Day', 'Week', 'Month', 'Year', 'All Time'];

  return (
    <View style={[styles.container, {backgroundColor, borderColor}]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, {color: textColor}]}>
          {t('Exercises Completed')}
        </Text>
        <View>
          <TouchableOpacity
            style={[styles.dropdownBtn, {borderColor}]}
            onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Text
              style={[
                styles.dropdownText,
                {color: textColor2, marginLeft: 10, fontSize: 12},
              ]}>
              {t(selectedFilter)}
            </Text>
            <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={15} />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={[styles.dropdownList, {backgroundColor}]}>
              {filters.map(filter => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => {
                    setSelectedFilter(filter);
                    setDropdownVisible(false);
                  }}
                  style={styles.dropdownItem}>
                  <Text style={[styles.dropdownText, {color: textColor2}]}>
                    {t(filter)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.yAxis}>
          {Array.from({length: 9}, (_, i) => 8 - i).map(num => (
            <Text key={num} style={[styles.yText, {color: textColor2}]}>
              {num}
            </Text>
          ))}
        </View>

        <View style={styles.graphArea}>
          {Array.from({length: 7}).map((_, i) => (
            <View
              key={i}
              style={[
                styles.graphLine,
                {
                  backgroundColor: separatorColor,
                  bottom: `${(i / 7) * 100}%`,
                },
              ]}
            />
          ))}
          <View style={styles.barGroup}>
            {barData.map((value, index) => (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${value * 10}%`,
                      backgroundColor: barColors[index],
                    },
                  ]}
                />
                <Text style={[styles.barLabel, {color: textColor2}]}>
                  {days[index]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExerciseGraph;
