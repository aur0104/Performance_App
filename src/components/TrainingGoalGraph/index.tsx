import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import {hp, wp} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';
import AnySvg from '../../components/AnySvg';

interface TrainingGoalGraphProps {
  trainingGoalData?: {
    [month: string]: number;
  };
}

const TrainingGoalGraph: React.FC<TrainingGoalGraphProps> = ({
  trainingGoalData,
}) => {
  // Convert API data to bar data format
  const barData = React.useMemo(() => {
    if (!trainingGoalData) {
      return [
        {month: 'Jan', percent: 65, color: '#2976BA'},
        {month: 'Feb', percent: 80, color: '#9BDFC4'},
        {month: 'Mar', percent: 35, color: '#F99BAB'},
        {month: 'Apr', percent: 50, color: '#FFB44F'},
        {month: 'May', percent: 40, color: '#9F97F7'},
        {month: 'Jun', percent: 70, color: '#CED6DE'},
      ];
    }

    const colors = [
      '#2976BA',
      '#9BDFC4',
      '#F99BAB',
      '#FFB44F',
      '#9F97F7',
      '#CED6DE',
    ];
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return Object.entries(trainingGoalData).map(([month, percent], index) => ({
      month: monthNames[new Date(`2025-${month}-01`).getMonth()] || month,
      percent,
      color: colors[index % colors.length],
    }));
  }, [trainingGoalData]);
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : '#F5F5F5';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#797979' : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const text = isDarkMode ? '#E0E0E0' : '#424242';

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBar, setSelectedBar] = useState<{
    month: string;
    percent: number;
  } | null>(null);

  const openModal = (item: {month: string; percent: number}) => {
    setSelectedBar(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBar(null);
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>
        {t('Monthly Training Goal')}
      </Text>

      <View style={styles.graphContainer}>
        {barData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.barWrapper}
              onPress={() => openModal(item)}
              activeOpacity={0.8}>
              <View style={styles.percentageLabel}></View>
              <View
                style={[
                  styles.barBackground,
                  {
                    height: (item.percent / 100) * 120,
                    backgroundColor: `${item.color}20`,
                  },
                ]}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: '80%',
                      backgroundColor: item.color,
                    },
                  ]}>
                  <Text style={styles.barText}>{item.percent}%</Text>
                </View>
              </View>

              <Text style={[styles.monthLabel, {color: textColor2}]}>
                {item.month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: isDarkMode
                  ? Colors.darkBackground
                  : Colors.white,
              },
            ]}>
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <AnySvg name="crossIcon" size={18} />
            </TouchableOpacity>

            <Text style={[styles.modalSubTitle, {color: text}]}>
              {t('Training Goal')}
            </Text>

            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />

            <View style={styles.row}>
              <Text style={[styles.modalTitle, {color: textColor}]}>
                {t('Month')}:
              </Text>
              <Text style={[styles.modalSubTitle, {color: text, marginTop: 2}]}>
                {selectedBar?.month || ''}
              </Text>
            </View>

            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />

            <View style={styles.row}>
              <Text style={[styles.modalTitle, {color: textColor}]}>
                {t('Sessions you have completed:')}
              </Text>
              <Text style={[styles.modalSubTitle, {color: text}]}>
                {selectedBar?.percent || ''}
              </Text>
            </View>
            {/* <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            /> */}
            {/* <View style={styles.row}>
              <Text style={[styles.modalTitle, {color: textColor}]}>
                {t('Session Goal:')}
              </Text>
              <Text style={[styles.modalSubTitle, {color: text}]}>{'50'}</Text>
            </View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TrainingGoalGraph;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 238,
    padding: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: hp(2),
    fontFamily: fonts.UrbanistBold,
  },
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
    paddingBottom: 8,
    marginTop: hp(2),
  },
  barWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  barBackground: {
    width: 40,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    marginTop: 12,
  },
  barText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: fonts.UrbanistBold,
  },
  monthLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  percentageLabel: {
    height: 20,
    marginBottom: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
  },
  closeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: 8,
  },
  modalSubTitle: {
    fontSize: 15,
    fontFamily: fonts.UrbanistMedium,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 4,
  },
});
