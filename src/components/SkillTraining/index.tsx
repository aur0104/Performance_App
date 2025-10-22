import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, {Path, G, Text as SvgText} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import AnySvg from '../AnySvg';
import {useTranslation} from 'react-i18next';
import fonts from '../../utils/Fonts';
import {hp} from '../../utils/responsivesness';
import {getTrainingCalendarStats} from '../../services/calls';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

interface SkillTrainingGraphProps {
  selectedDate?: moment.Moment;
  selectedSport?: any;
}

const SkillTrainingGraph: React.FC<SkillTrainingGraphProps> = ({
  selectedDate,
  selectedSport,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkInputBg : '#F5F5F5';
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : Colors.blackLight;
  const userInfo = useSelector((state: any) => state.user.user);

  const [selectedFilter, setSelectedFilter] = useState('Monthly');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [skillData, setSkillData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const filters = ['Monthly', 'Weekly'];

  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  const isTablet = SCREEN_WIDTH >= 600;

  const chartSize = isTablet ? 300 : 200;
  const radius = chartSize / 2;
  const center = {x: radius, y: radius};

  // Fetch skill data from API
  useEffect(() => {
    const fetchSkillData = async () => {
      if (!selectedSport || !userInfo?.user?._id) return;

      setLoading(true);
      try {
        const params = {
          sport: selectedSport._id || selectedSport.sport?._id,
          stats: true,
          category: '6877ceffe42c26ccd8e0b9ff',
          user: userInfo.user._id,
        };

        const response = await getTrainingCalendarStats(params);

        if (response?.status === 200 && response?.data) {
          // Handle different possible response structures
          const skillData = response.data?.data || response.data || null;
          setSkillData(skillData);
        } else {
          setSkillData(null);
        }
      } catch (error) {
        setSkillData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillData();
  }, [selectedSport, selectedDate, userInfo?.user?._id]);

  // Process skill data for chart
  const processSkillData = () => {
    if (!skillData?.skillPercentages) {
      return [];
    }

    // Map filter names to API response structure
    const filterKey = selectedFilter === 'Monthly' ? 'monthly' : 'weekly';

    const percentages = skillData.skillPercentages[filterKey] || {};

    const colors = [
      '#4ADE80',
      '#F75555',
      '#FFAE4C',
      '#07DBFA',
      '#1F94FF',
      '#FF928A',
      '#3CC3DF',
      '#7086FD',
      '#FF6B6B',
      '#4ECDC4',
    ];

    // Filter out skills with 0 percentage and create chart data
    const filteredData = Object.entries(percentages)
      .filter(([_, percentage]) => (percentage as number) > 0)
      .map(([skillName, percentage], index) => ({
        name: skillName,
        skills: percentage as number,
        color: colors[index % colors.length],
      }));

    // If no skills have data, show sample data for demonstration
    if (filteredData.length === 0) {
      return [
        {name: '360 Spin', skills: 25, color: '#4ADE80'},
        {name: 'Ball Juggle', skills: 30, color: '#F75555'},
        {name: 'Cruyff Turn', skills: 20, color: '#FFAE4C'},
        {name: 'Step Over', skills: 15, color: '#07DBFA'},
        {name: 'V Move', skills: 10, color: '#1F94FF'},
      ];
    }

    return filteredData;
  };

  const chartData = processSkillData();
  const totalSkills = chartData.reduce((sum, item) => sum + item.skills, 0);

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number,
  ) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M ${start.x} ${start.y}
            A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
            L ${x} ${y} Z`;
  };

  let startAngle = 0;

  const arcs = chartData.map((item, index) => {
    const angle = (item.skills / totalSkills) * 360;
    const endAngle = startAngle + angle;

    const path = describeArc(center.x, center.y, radius, startAngle, endAngle);

    const midAngle = startAngle + angle / 2;
    const labelPos = polarToCartesian(
      center.x,
      center.y,
      radius * 0.7,
      midAngle,
    );
    const percentage = ((item.skills / totalSkills) * 100).toFixed(0) + '%';

    startAngle += angle;

    return {
      path,
      color: item.color,
      label: percentage,
      labelPos,
      item,
    };
  });

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, {color: textColor}]}>Skill Training</Text>
        <View style={styles.dropdownRow}>
          <View>
            <TouchableOpacity
              style={[styles.dropdownBtn, {borderColor}]}
              onPress={() => setDropdownVisible(!dropdownVisible)}>
              <Text
                style={[
                  styles.dropdownText,
                  {color: textColor2, marginLeft: 10},
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
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, {color: textColor2}]}>
            Loading skill data...
          </Text>
        </View>
      ) : chartData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, {color: textColor2}]}>
            No skill data available for the selected period
          </Text>
          <Text
            style={[
              styles.emptyText,
              {color: textColor2, fontSize: 12, marginTop: 8},
            ]}>
            Showing sample data for demonstration
          </Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {chartData.map(item => (
              <View key={item.name} style={styles.legendRow}>
                <View
                  style={[styles.colorBox, {backgroundColor: item.color}]}
                />
                <Text style={[styles.legendText, {color: textColor2}]}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              width: chartSize,
              height: chartSize,
              marginTop: isTablet ? hp(0) : hp(3),
              marginRight: isTablet ? hp(14) : hp(0),
              marginBottom: isTablet ? hp(2) : hp(0),
            }}>
            <Svg width={chartSize} height={chartSize}>
              <G
                onPress={() => {
                  navigation.navigate('PieDetail');
                }}>
                {arcs.map((arc, i) => (
                  <Path key={`arc-${i}`} d={arc.path} fill={arc.color} />
                ))}
                {arcs.map((arc, i) => (
                  <SvgText
                    key={`label-${i}`}
                    x={arc.labelPos.x}
                    y={arc.labelPos.y}
                    fontSize="12"
                    fontWeight="bold"
                    fontFamily={fonts.UrbanistBold}
                    fill={Colors.white}
                    textAnchor="middle"
                    alignmentBaseline="middle">
                    {arc.label}
                  </SvgText>
                ))}
              </G>
            </Svg>
          </View>
        </View>
      )}
    </View>
  );
};

export default SkillTrainingGraph;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: hp(3),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 4,
    fontFamily: fonts.UrbanistBold,
  },
  dropdownRow: {
    gap: 14,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDown: {
    height: 25,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  dropDownText: {
    fontSize: 12,
    marginRight: 6,
    fontFamily: fonts.UrbanistSemiBold,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  colorBox: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  dropdownBtn: {
    height: 25,
    width: 85,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  dropdownList: {
    position: 'absolute',
    top: 30,
    right: 0,
    width: 100,
    borderRadius: 10,
    padding: 4,
    elevation: 4,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
});
