import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import moment from 'moment';
import TrainingCalendar from '../../../components/TrainingCalendar';
import {hp} from '../../../utils/responsivesness';

interface TrainingCalendarlProps {
  navigation?: any;
}

const TrainingCalendars: React.FC<TrainingCalendarlProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleSelectDate = (date: moment.Moment) => {
    setSelectedDate(date);

    navigation.navigate('Training');
  };

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t('Training Schedule ')}
        showBackIcon
        rightIconName={isDarkMode ? 'addPlan' : 'lightAdd'}
        onRightIconPress={() => navigation.navigate('AddTraining')}
      />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <TrainingCalendar
          selectedDate={moment()}
          onSelectDate={date => setSelectedDate(date)}
          timeSlots={[
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
          ]}
          events={[
            {
              day: 1,
              timeIndex: 1,
              name: 'Chris Scout',
              sport: 'Weightlifting',
              screen: 'SchedulePlanDetail',
            },
            {
              day: 1,
              timeIndex: 7,
              name: 'Adam Scout',
              sport: 'Rugby',
              screen: 'ScheduleDetail',
              isPrivate: true,
            },
            {
              day: 2,
              timeIndex: 3,
              name: 'Nikita John',
              sport: 'Pullups',
              screen: 'SchedulePlanDetail',
            },
            {
              day: 5,
              timeIndex: 5,
              name: 'Chris Scout',
              sport: 'Rugby',
              screen: 'ScheduleDetail',
              isPrivate: true,
            },
          ]}
          navigation={navigation}
          mainStyle={{marginTop: 0}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrainingCalendars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    //marginTop: 8,
  },
});
