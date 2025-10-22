import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import BackHeader from '../../../components/BackHeader';
import styles from './styles';
import AnySvg from '../../../components/AnySvg';
import {Colors} from '../../../utils/Colors';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';

interface ScheduleProps {
  navigation?: any;
}

const TrainingSchedule: React.FC<ScheduleProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const bgView = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const daysShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfWeek = new Date(selectedDate);
  firstDayOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  const weekData = Array.from({length: 7}, (_, i) => {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    return {
      day: daysShort[i],
      number: day.getDate(),
    };
  });

  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
  ];

  const events = [
    {
      day: 1,
      timeIndex: 1,
      name: 'Chriss Scout',
      sport: 'Weightlifting',
      screen: 'SchedulePlanDetail',
    },
    {
      day: 1,
      timeIndex: 7,
      name: 'Adam Scout',
      sport: 'Rugby',
      screen: 'ScheduleDetail',
    },
    {
      day: 2,
      timeIndex: 8,
      name: 'Nikita John',
      sport: 'Pullups',
      screen: 'SchedulePlanDetail',
    },
    {
      day: 5,
      timeIndex: 5,
      name: 'Chriss Scout',
      sport: 'Rugby',
      screen: 'ScheduleDetail',
    },
  ];

  const handleDayPress = (index: number) => {
    setSelectedDay(index);
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader
        title={t('Training Schedule')}
        showBackIcon
        rightIconName={isDarkMode ? 'addPlan' : 'lightAdd'}
        onRightIconPress={() => navigation.navigate('AddPlan')}
      />

      <ScrollView
        horizontal
        style={styles.weekRow}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.dayButton, styles.calendarButton]}
          onPress={() => setOpen(true)}>
          <AnySvg name={'calendarIcon'} />
        </TouchableOpacity>
        {weekData.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              selectedDay === index && styles.selectedDayButton,
            ]}
            onPress={() => handleDayPress(index)}>
            <Text
              style={[
                styles.numText,
                {color: textColor},
                selectedDay === index && styles.selectedDayText,
              ]}>
              {data.number}
            </Text>
            <Text
              style={[
                styles.dayText,
                {color: textColor2},
                selectedDay === index && styles.selectedDayText,
              ]}>
              {data.day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.tableContainer, {borderColor: separatorColor}]}>
        <View
          style={[styles.verticalSeparator, {backgroundColor: separatorColor}]}
        />
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeRow,
              {backgroundColor: backgroundColor},
              index % 2 === 1 && {backgroundColor: bgView},
            ]}
            onPress={() => navigation.navigate('AddPlan')}>
            <Text style={[styles.timeText, {color: textColor}]}>{time}</Text>
            {events
              .filter(
                event => event.day === selectedDay && event.timeIndex === index,
              )
              .map((event, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.timeBlock}
                  onPress={() => navigation.navigate(event.screen)}>
                  <Text style={[styles.blockText, {color: Colors.white}]}>
                    {event.name}
                  </Text>
                  <Text style={[styles.blockPrice, {color: Colors.white}]}>
                    {event.sport}
                  </Text>
                </TouchableOpacity>
              ))}
          </TouchableOpacity>
        ))}
      </View>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={selectedDate}
        onConfirm={date => {
          setOpen(false);
          setSelectedDate(date);

          setSelectedDay(0);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </ScrollView>
  );
};

export default TrainingSchedule;
