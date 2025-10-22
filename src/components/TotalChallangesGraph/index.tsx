import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import {hp, wp} from '../../utils/responsivesness';
import {getStatesPerformanceChallenge} from '../../services/calls';
import utils from '../../utils/utils';
interface IChartData {
  label: string;
  value: number;
}
const GRAPH_WIDTH = wp(96);
const BAR_HEIGHT = 95; // Height of your LinearGradient bars
const TotalChallengesGraph: React.FC = () => {
  const {t} = useTranslation();
  //Get Api
  const [data, setData] = useState<IChartData[] | []>([]);
  const [loader, setLoader] = useState(false);
  const getChartData = async () => {
    try {
      setLoader(true);
      const result = await getStatesPerformanceChallenge();
      if (result?.status === 200 || result?.status === 201) {
        const data = result.data;
        const formatted = [
          {label: 'Strength', value: data?.Strength ?? 0},
          {label: 'Power', value: data?.Power ?? 0},
          {label: 'Speed', value: data?.Speed ?? 0},
          {label: 'Endurance', value: data?.Endurance ?? 0}, // renamed Endurance → Enhance
        ];
        setData(formatted);
      }
    } catch (error) {
      utils.errorMessage;
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getChartData();
  }, []);
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : Colors.lightGray;
  const gradientColors = isDarkMode
    ? ['#212121', '#C2C2C2']
    : ['#C2C2C2', '#FFFFFFBD'];

  const generatePath = () => {
    const xSpacing = GRAPH_WIDTH / (data.length - 0.4);
    const maxVal = Math.max(...data.map(d => d.value));

    // Use BAR_HEIGHT as reference instead of GRAPH_HEIGHT for scaling
    const scaleY = maxVal > 0 ? BAR_HEIGHT / maxVal : 0;

    const points = data.map((item, i) => {
      const x = i * xSpacing;
      // Calculate Y position relative to BAR_HEIGHT, not GRAPH_HEIGHT
      const y = BAR_HEIGHT - item.value * scaleY;
      return {x, y};
    });

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  return (
    <View style={[styles.container, {backgroundColor, borderColor}]}>
      <Text style={[styles.title, {color: textColor}]}>
        {t('Total Challenge Attempts')}
      </Text>
      {data?.length > 0 ? (
        <>
          <View style={styles.dataRow}>
            {data.map(({label, value}, index) => (
              <View key={index} style={styles.barWithLabel}>
                <LinearGradient
                  colors={gradientColors}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 3}}
                  locations={[0, 6]}
                  style={styles.itemBox}>
                  <Text style={[styles.valueInsideBar, {color: textColor}]}>
                    {value}
                  </Text>
                </LinearGradient>
                <Text style={[styles.labelText, {color: textColor2}]}>
                  {t(label)}
                </Text>
              </View>
            ))}
          </View>

          <Svg
            height={BAR_HEIGHT} // Use BAR_HEIGHT instead of GRAPH_HEIGHT
            width={GRAPH_WIDTH}
            style={[
              styles.graphSvg,
              {left: (Dimensions.get('window').width - GRAPH_WIDTH) / 4},
            ]}>
            <Path
              d={generatePath()}
              fill="none"
              stroke={Colors.primaryColor}
              strokeWidth={3}
            />
          </Svg>
        </>
      ) : loader ? (
        <ActivityIndicator color={isDarkMode ? Colors.white : Colors.black} />
      ) : (
        <Text
          style={[
            styles.valueInsideBar,
            {color: textColor, bottom: 0, paddingBottom: 16},
          ]}>
          No Graph Data Found
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 18,
    paddingTop: 16,
    paddingHorizontal: 12,
    alignSelf: 'center',
    marginVertical: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: fonts.UrbanistBold,
  },
  dataRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingBottom: 16,
  },
  barWithLabel: {
    alignItems: 'center',
    width: wp(21),
    marginTop: hp(2),
    marginBottom: 4,
  },
  itemBox: {
    width: wp(18),
    height: BAR_HEIGHT, // Use the constant here
    paddingBottom: 15,
    alignSelf: 'center',
  },
  valueInsideBar: {
    fontSize: 16,
    fontFamily: fonts.UrbanistBold,
    textAlign: 'center',
    bottom: 10,
    width: '100%',
    marginTop: hp(3),
  },
  labelText: {
    fontSize: 14,
    marginTop: 6,
    fontFamily: fonts.UrbanistMedium,
  },
  graphSvg: {
    position: 'absolute',
    bottom: 38, // Adjusted to align with bars (16 paddingBottom + 6 marginTop + 16 for labels)
    marginLeft: 16,
  },
});

export default TotalChallengesGraph;
