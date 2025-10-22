/**
 * TrainingCalendar Component
 *
 * Usage:
 * <TrainingCalendar
 *   title="Training Schedule"
 *   selectedDate={selectedDate}
 *   onSelectDate={setSelectedDate}
 *   sportId="6877cd7fe42c26ccd8e0b93d"
 *   categoryId="6877cd82e42c26ccd8e0b93e"
 * />
 *
 * The component will automatically fetch training data for the specified sport and category,
 * filtered by the current user ID, and display training sessions on the calendar.
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import styles from './styles';
import AnySvg from '../AnySvg';
import {Colors} from '../../utils/Colors';
import {getTrainingCalendars} from '../../services/calls';

type TrainingCalendarProps = {
  title: string;
  titleStyle?: any;
  mainStyle?: any;
  selectedDate: moment.Moment;
  onSelectDate: (date: moment.Moment) => void;
  sportId?: string;
  categoryId?: string;
  navigation?: any;
};

interface TrainingData {
  _id: string;
  trainingName: string;
  date: string;
  startTime: string;
  finishTime: string;
  user: {
    _id: string;
  };
  sport: {
    _id: string;
  };
  category: {
    _id: string;
  };
}

const TrainingCalendar: React.FC<TrainingCalendarProps> = ({
  title,
  titleStyle,
  mainStyle,
  selectedDate,
  onSelectDate,
  sportId,
  categoryId,
  navigation,
}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state?.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state?.user?.user);

  const [selectedView, setSelectedView] = useState<'weekly' | 'monthly'>(
    'weekly',
  );
  const [currentDate, setCurrentDate] = useState(moment());
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [loading, setLoading] = useState(false);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : '#F5F5F5';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#9E9E9E' : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : '#C9C9C9';

  // Fetch training calendar data
  const fetchTrainingData = async () => {
    try {
      setLoading(true);
      const response = await getTrainingCalendars();

      if (response?.status === 200 && response?.data) {
        // Handle different possible response structures
        const trainingData = response.data?.data || response.data || [];

        if (Array.isArray(trainingData)) {
          // Filter data based on user ID, sport ID, and category ID
          const filteredData = trainingData.filter(
            (item: TrainingData) => item?.user?._id === user.user?._id,
          );
          setTrainingData(filteredData);
        } else {
          setTrainingData([]);
        }
      } else {
        setTrainingData([]);
      }
    } catch (error) {
      setTrainingData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingData();
  }, [user?.user?._id, sportId, categoryId]);

  // Get training data for a specific date
  const getTrainingForDate = (date: moment.Moment) => {
    return trainingData.filter(item => moment(item.date).isSame(date, 'day'));
  };

  // Handle training cell press
  const handleTrainingPress = (training: TrainingData) => {
    if (navigation && training._id) {
      navigation.navigate('UpdateTrainingDetail', {trainingId: training._id});
    }
  };

  const renderWeeklyView = () => {
    const startOfWeek = moment(currentDate).startOf('week');
    const days = Array.from({length: 7}, (_, i) =>
      moment(startOfWeek).add(i, 'days'),
    );
    const columnWidth = `${100 / 7}%`;

    return (
      <View style={styles.weekRow}>
        {days.map((day, index) => {
          const isSelected = day.isSame(selectedDate, 'day');
          const dayTrainings = getTrainingForDate(day);
          const hasTraining = dayTrainings.length > 0;

          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                hasTraining
                  ? handleTrainingPress(dayTrainings[0])
                  : onSelectDate(day)
              }
              style={[
                styles.dayContainer,
                isSelected && styles.selectedBox,
                hasTraining && styles.trainingDay,
                {
                  borderColor,
                  width: columnWidth,
                  borderRightWidth: index !== 6 ? 0.5 : 0,
                },
              ]}>
              <View style={styles.dayBox}>
                <Text
                  style={[
                    styles.dayText,
                    {color: isSelected ? Colors.white : textColor2},
                  ]}>
                  {day.format('ddd').toUpperCase()}
                </Text>
              </View>
              <View
                style={[styles.separater, {backgroundColor: borderColor}]}
              />
              <View style={styles.dateBox}>
                <Text
                  style={[
                    styles.dateText,
                    {color: isSelected ? Colors.white : textColor2},
                  ]}>
                  {day.date()}
                </Text>
                {hasTraining && (
                  <View style={styles.trainingIndicator}>
                    <Text style={styles.trainingIndicatorText}>
                      {dayTrainings.length}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderMonthlyView = () => {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();
    const columnWidth = `${100 / 7}%`;

    const days: (moment.Moment | null)[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(moment(startOfMonth).date(d));
    }
    while (days.length % 7 !== 0) {
      days.push(null);
    }

    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }

    const weekdays = moment.weekdaysShort();

    return (
      <View>
        {/* Weekdays Header */}
        <View style={styles.weekHeaderRow}>
          {weekdays.map((day, index) => (
            <Text
              key={index}
              style={[
                styles.weekHeaderText,
                {
                  width: columnWidth,
                  borderRightWidth: index !== 6 ? 0.5 : 0,
                  borderColor: '#C9C9C9',
                  color: textColor2,
                },
              ]}>
              {day.toUpperCase()}
            </Text>
          ))}
        </View>

        {/* Month Grid */}
        {rows.map((week, rowIndex) => (
          <View key={rowIndex} style={styles.weekRow}>
            {week.map((day, index) => {
              if (!day) {
                return (
                  <View
                    key={index}
                    style={[
                      styles.monthDayBox,
                      {
                        width: columnWidth,
                        borderRightWidth: index !== 6 ? 0.5 : 0,
                        borderBottomWidth: 0.5,
                        borderColor,
                      },
                    ]}
                  />
                );
              }
              const isSelected = day.isSame(selectedDate, 'day');
              const dayTrainings = getTrainingForDate(day);
              const hasTraining = dayTrainings.length > 0;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    hasTraining
                      ? handleTrainingPress(dayTrainings[0])
                      : onSelectDate(day)
                  }
                  style={[
                    styles.monthDayBox,
                    {
                      width: columnWidth,
                      borderRightWidth: index !== 6 ? 0.5 : 0,
                      borderBottomWidth: 0.5,
                      borderColor,
                      backgroundColor: isSelected
                        ? Colors.primaryColor
                        : hasTraining
                        ? Colors.lightBlue
                        : 'transparent',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.dateText,
                      {color: isSelected ? Colors.white : textColor2},
                    ]}>
                    {day.date()}
                  </Text>
                  {hasTraining && (
                    <View style={styles.trainingInfo}>
                      <Text
                        style={[
                          styles.trainingName,
                          {
                            color: isSelected
                              ? Colors.white
                              : Colors.primaryColor,
                          },
                        ]}>
                        {dayTrainings[0].trainingName}
                      </Text>
                      <Text
                        style={[
                          styles.trainingTime,
                          {color: isSelected ? Colors.white : textColor2},
                        ]}>
                        {dayTrainings[0].startTime} -{' '}
                        {dayTrainings[0].finishTime}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor}, mainStyle]}>
      <Text style={[styles.title, {color: textColor}, titleStyle]}>
        {title}
      </Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setSelectedView('weekly')}
          style={[
            styles.toggleButton,
            selectedView === 'weekly' && styles.activeToggle,
          ]}>
          <Text
            style={[
              styles.toggleText,
              selectedView === 'weekly'
                ? styles.activeText
                : {color: Colors.black},
            ]}>
            {t('Weekly')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedView('monthly')}
          style={[
            styles.toggleButton,
            selectedView === 'monthly' && styles.activeToggle,
          ]}>
          <Text
            style={[
              styles.toggleText,
              selectedView === 'monthly'
                ? styles.activeText
                : {color: Colors.black},
            ]}>
            {t('Monthly')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerControls}>
        <TouchableOpacity
          onPress={() =>
            setCurrentDate(prev =>
              moment(prev).subtract(
                1,
                selectedView === 'weekly' ? 'weeks' : 'months',
              ),
            )
          }>
          <AnySvg name={isDarkMode ? 'darkLeft' : 'lightLeft'} size={20} />
        </TouchableOpacity>

        <Text style={[styles.monthText, {color: textColor}]}>
          {currentDate.format('MMMM - YYYY')}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setCurrentDate(prev =>
              moment(prev).add(
                1,
                selectedView === 'weekly' ? 'weeks' : 'months',
              ),
            )
          }>
          <AnySvg name={isDarkMode ? 'darkRight' : 'lightRight'} size={20} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      ) : selectedView === 'weekly' ? (
        renderWeeklyView()
      ) : (
        renderMonthlyView()
      )}
    </View>
  );
};

export default TrainingCalendar;
