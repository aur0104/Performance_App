import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {LineChart} from 'react-native-chart-kit';
import MonthPicker from 'react-native-month-year-picker';
import {Colors} from '../../utils/Colors';
import {styles} from './styles';
import AnySvg from '../AnySvg';
import {hp, wp} from '../../utils/responsivesness';
import {getMonthlyTrainingCounts} from '../../services/calls';

const screenWidth = Dimensions.get('window').width;

interface AttendanceGraphProps {
  style?: any;
}

const AttendenceGraph = ({style}: AttendanceGraphProps) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);
  const backgroundColor = isDarkMode ? Colors.darkInputBg : '#F5F5F5';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : '#C9C9C9';
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [trainingCount, setTrainingCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch monthly training counts when date changes
  const fetchMonthlyTrainingCounts = async (date: Date) => {
    if (!user?.user?._id) return;

    try {
      setLoading(true);
      const month = date
        .toLocaleString('default', {month: 'long'})
        .toLowerCase();
      const year = date.getFullYear();

      const response = await getMonthlyTrainingCounts(
        month,
        year,
        user.user._id,
      );

      if (response?.status === 200 && response?.data) {
        // Handle different possible response structures
        const count =
          response.data?.data?.count ||
          response.data?.count ||
          response.data?.trainingCount ||
          0;
        setTrainingCount(count);
      } else {
        setTrainingCount(0);
      }
    } catch (error) {
      setTrainingCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyTrainingCounts(selectedDate);
  }, [selectedDate, user?.user?._id]);

  // Generate graph data based on training count
  const generateGraphData = (count: number) => {
    // Create a straight line from 0 to count at day 30
    const maxDays = 31; // Maximum days in a month
    const data = [];

    // Generate data points for the month
    for (let i = 0; i <= maxDays; i++) {
      if (i <= 30) {
        // Straight line from 0 to count at day 30
        const progress = (i / 30) * count;
        data.push(progress);
      } else {
        // Maintain the count after day 30
        data.push(count);
      }
    }

    return data;
  };

  const graphData = {
    labels: ['1', '5', '10', '15', '20', '25', '30'],
    datasets: [
      {
        data: generateGraphData(trainingCount),
        strokeWidth: 2,
        color: () => Colors.primaryColor,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: backgroundColor,
    backgroundGradientTo: backgroundColor,
    color: () => Colors.primaryColor,
    labelColor: () => textColor2,
    fillShadowGradient: '#2976BA',
    fillShadowGradientOpacity: 0.08,
    decimalPlaces: 0,
    propsForDots: {
      r: '0',
      strokeWidth: '2',
      stroke: Colors.primaryColor,
      fill: Colors.white,
    },
    propsForBackgroundLines: {
      stroke: separaterColor,
      strokeDasharray: '5, 5',
    },
  };

  const onValueChange = (event: any, newDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (newDate) {
      setSelectedDate(newDate);
    }
  };

  const formattedDate = selectedDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={[styles.container, {backgroundColor}, style]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, {color: textColor}]}>
          {t('Attendance')}
        </Text>

        <TouchableOpacity
          style={[styles.dropDown, {borderColor}]}
          onPress={() => setShowPicker(true)}>
          <Text style={[styles.dropDownText, {color: textColor2}]}>
            {formattedDate}
          </Text>
          <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={15} />
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.title,
          {color: textColor, paddingHorizontal: 20, marginTop: 4},
        ]}>
        {loading ? t('Loading...') : `${trainingCount} ${t('Days Attended')}`}
      </Text>

      {showPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={selectedDate}
          locale="en"
          mode="short"
        />
      )}

      <LineChart
        data={graphData}
        width={screenWidth - wp(2)}
        height={hp(28)}
        chartConfig={chartConfig}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        bezier={false}
        fromZero={true}
        yAxisInterval={Math.max(1, Math.ceil(trainingCount / 5))}
        segments={Math.min(5, trainingCount)}
        yLabelsOffset={10}
        style={{
          marginTop: 20,
          alignSelf: 'center',
          left: 8,
          marginRight: 20,
          paddingRight: hp(6),
        }}
        renderDotContent={({x, y, index, indexData}) => {
          // Show dot for the peak at day 30
          if (index === 30 && trainingCount > 0) {
            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  top: y - 6,
                  left: x - 6,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  borderWidth: 2,
                  backgroundColor: Colors.white,
                  borderColor: Colors.primaryColor,
                  shadowColor: Colors.primaryColor,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              />
            );
          }
          return null;
        }}
      />
    </View>
  );
};

export default AttendenceGraph;
