import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {Colors} from '../../utils/Colors';
import AnySvg from '../AnySvg';
import {hp} from '../../utils/responsivesness';
import {selectedSport} from '../../utils/DummyData';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const barData = [40, 70, 90, 40, 60, 80];
const barColors = [
  '#62B2FD',
  '#F99BAB',
  '#FFB44F',
  '#9BDFC4',
  '#9F97F7',
  '#09FD87',
];

const AllAttendenceGraph = () => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : Colors.blackLight;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const [selectedMember, setSelectedMember] = useState('Members');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleDateString('en-US', {month: 'long'}),
  );
  const [selectedType, setSelectedType] = useState<string>('Footbqall');
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );
  const [selectedFilter, setSelectedFilter] = useState('Day');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState<'month' | 'year' | null>(null);

  const [dropdownVisible, setDropdownVisible] = useState({
    member: false,
    month: false,
    year: false,
  });

  const members = ['John Doe', 'Jane Smith'];
  const months = [
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

  // Generate dynamic years
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      years.push(i.toString());
    }
    return years;
  };

  const years = generateYears();
  const filter = ['Day', 'Week', 'Month', 'Year', 'All Time'];

  const handleToggle = (type: string) => {
    if (type === 'month' || type === 'year') {
      setPickerMode(type);
      setPickerOpen(true);
    } else {
      setDropdownVisible(prev => ({
        ...Object.fromEntries(Object.entries(prev).map(([k]) => [k, false])),
        [type]: !prev[type],
      }));
    }
  };

  const renderDropdown = (
    data: string[],
    selected: string,
    setSelected: Function,
    type: string,
  ) => (
    <View style={{marginHorizontal: 4}}>
      <TouchableOpacity
        style={[styles.dropdownBtn, {borderColor}]}
        onPress={() => handleToggle(type)}>
        <Text
          style={[styles.dropdownText, {color: textColor2, marginLeft: 10}]}>
          {t(selected)}
        </Text>
        <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={15} />
      </TouchableOpacity>
      {dropdownVisible[type] && (
        <View style={[styles.dropdownList, {backgroundColor}]}>
          {data.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setSelected(item);
                setDropdownVisible({...dropdownVisible, [type]: false});
              }}
              style={styles.dropdownItem}>
              <Text style={[styles.dropdownText, {color: textColor2}]}>
                {t(item)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
  const user = useSelector((state: any) => state.user?.user);
  console.log('user', user?.gym?.sport);
  return (
    <View style={[styles.container, {backgroundColor, borderColor}]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginBottom: hp(1)}}>
        <View style={styles.buttonRow}>
          {selectedSport.map(({id, name, image}) => {
            const isSelected = selectedType === name;
            return (
              <View key={id} style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => setSelectedType(name)}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor: isSelected
                        ? Colors.primaryColor
                        : isDarkMode
                        ? '#2C2C2E'
                        : '#E0E0E0',
                    },
                  ]}>
                  <Image
                    source={image}
                    style={[
                      styles.icon,
                      {tintColor: isSelected ? '#FFF' : Colors.primaryColor},
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={[styles.buttonText, {color: textColor}]}>
                  {t(name)}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.filterRow}>
        {renderDropdown(members, selectedMember, setSelectedMember, 'member')}
        {renderDropdown(months, selectedMonth, setSelectedMonth, 'month')}
        {renderDropdown(filter, selectedFilter, setSelectedFilter, 'Day')}
        {renderDropdown(years, selectedYear, setSelectedYear, 'year')}
      </View>

      <DatePicker
        modal
        mode="date"
        open={pickerOpen}
        date={new Date()}
        onConfirm={date => {
          setPickerOpen(false);
          const mDate = moment(date);
          if (pickerMode === 'month') {
            setSelectedMonth(mDate.format('MMMM'));
          } else if (pickerMode === 'year') {
            setSelectedYear(mDate.format('YYYY'));
          }
          setPickerMode(null);
        }}
        onCancel={() => {
          setPickerOpen(false);
          setPickerMode(null);
        }}
      />

      <View style={styles.chartContainer}>
        <View style={styles.yAxis}>
          {[...Array(11)].map((_, i) => (
            <Text key={i} style={[styles.yText, {color: textColor2}]}>
              {100 - i * 10}
            </Text>
          ))}
        </View>

        <View style={styles.graphArea}>
          {[...Array(10)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.graphLine,
                {
                  backgroundColor: separatorColor,
                  bottom: `${(i / 10) * 100}%`,
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
                      height: `${value}%`,
                      backgroundColor: barColors[index % barColors.length],
                    },
                  ]}
                />
                <Text style={[styles.barLabel, {color: textColor2}]}>
                  {days[index % days.length]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default AllAttendenceGraph;
