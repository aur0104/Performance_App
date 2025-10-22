import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import styles from '../../AthleteSide/MyPerformance/styles';
import BackHeader from '../../../components/BackHeader';
import {performanceTypes as defaultPerformanceTypes} from '../../../utils/DummyData';
import ChallangesPerformanceGraph from '../../../components/ChallangesPerformance';
import ExerciseGraph from '../../../components/ExercisesGraph';
import TotalChallengesGraph from '../../../components/TotalChallangesGraph';
import {wp} from '../../../utils/responsivesness';
import {
  getChallangePerformance,
  getChallengeCategoriesTypes,
} from '../../../services/calls';
import {IMAGES} from '../../../assets/images';
import {PerformanceType as ChallengePerformance} from '../../../interfaces';
import utils from '../../../utils/utils';

interface MyPerformanceProps {
  navigation?: any;
}
interface ChallengeCategory {
  _id: string;
  name: string;
  types: Array<{
    _id: string;
    name: string;
    rules?: string[];
  }>;
}
interface PerformanceType {
  type: string;
  icon: any;
  _id?: string;
  types?: Array<{
    _id: string;
    name: string;
    rules?: string[];
  }>;
}
const GymPerformance: React.FC<MyPerformanceProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [selectedType, setSelectedType] = useState<string>('Strength');
  const [performanceTypes, setPerformanceTypes] = useState<PerformanceType[]>(
    defaultPerformanceTypes,
  );
  const [challengePerformance, setChallengePerformance] = useState<
    ChallengePerformance[] | []
  >([]);
  useEffect(() => {
    const fetchChallengeCategories = async () => {
      try {
        const response = await getChallengeCategoriesTypes();
        if (response?.data) {
          // Map API response to match the expected format
          const mappedData = response.data.map((item: ChallengeCategory) => {
            // Map category names to icon images
            const iconMap: {[key: string]: any} = {
              Strength: IMAGES.strength,
              Power: IMAGES.power,
              Speed: IMAGES.speed,
              Endurance: IMAGES.heart,
            };

            return {
              type: item.name,
              icon: iconMap[item.name] || IMAGES.strength, // fallback to strength icon
              _id: item._id,
              types: item.types || [],
            };
          });
          setPerformanceTypes(mappedData);
        }
      } catch (error) {
        console.error('Error fetching challenge categories:', error);
        // Keep using default data if API fails
      }
    };

    fetchChallengeCategories();
  }, []);
  const [loader, setLoader] = useState(false);
  const getChallengePerformance = async () => {
    try {
      setLoader(true);
      const response = await getChallangePerformance('performanceChallenges');
      if (response?.status === 201 || response.status === 200) {
        // Map API response to match the expected format
        setChallengePerformance(response?.data);
      }
    } catch (error) {
      utils.errorMessage(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getChallengePerformance();
  }, []);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const containerBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;

  const getRingData = () => {
    if (selectedType === 'Speed' || selectedType === 'Endurance') {
      return [
        {label: 'Total Sets', value: '03', borderColor: Colors.green},
        {
          label: 'Total Time',
          value: '45 min',
          borderColor: Colors.primaryColor,
        },
        {label: 'Total Distance', value: '5 km', borderColor: '#F75555'},
      ];
    } else {
      return [
        {label: 'Total Sets', value: '03', borderColor: Colors.green},
        {label: 'Total Reps', value: '12', borderColor: Colors.primaryColor},
        {label: 'Total Weight', value: '60kg', borderColor: '#F75555'},
      ];
    }
  };

  return (
    <View style={[styles.screen, {backgroundColor}]}>
      <BackHeader
        title={t('My Performance')}
        rightIconName={isDarkMode ? 'shareIcon' : 'lightShare'}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.container,
            {backgroundColor: containerBg, width: '100%', borderRadius: 0},
          ]}>
          <FlatList
            data={performanceTypes}
            horizontal
            nestedScrollEnabled
            keyExtractor={item => item.type}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.buttonRow,
              {flexGrow: 1, justifyContent: 'center'},
            ]}
            renderItem={({item}) => {
              const isSelected = selectedType === item._id;
              return (
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() => setSelectedType(item.type)}
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
                      source={item?.icon}
                      style={[
                        styles.icon,
                        {tintColor: isSelected ? '#FFF' : Colors.primaryColor},
                      ]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View>
                    <Text style={[styles.buttonText, {color: textColor}]}>
                      {t(item.type)}
                    </Text>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  {loader ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={[styles.buttonText, {color: textColor}]}>
                      No Perfromance Found
                    </Text>
                  )}
                </View>
              );
            }}
          />

          <ChallangesPerformanceGraph
            title="Back Squat"
            personalBest=""
            data={[20, 20, 0, 20, 5, 50, 20, 30, 40, 30, 20, 40]}
            height={200}
            width={wp(90)}
            labels={['6 Feb', '12 Feb', '14 Feb', '20 Feb', '26 Feb', '28 Feb']}
            propsForDots={{
              r: '3',
              strokeWidth: '1',
              stroke: Colors.primaryColor,
              fill: Colors.black,
            }}
            button={{
              onPress: () => navigation.navigate('PhysicalPerformance'),
              iconName: 'add',
            }}
          />
          <View style={styles.ringRow}>
            {getRingData().map(({label, value, borderColor}) => (
              <View key={label} style={styles.ringContainer}>
                <View style={[styles.ring, {borderColor: borderColor}]}>
                  <Text style={[styles.ringValue, {color: textColor}]}>
                    {value}
                  </Text>
                </View>
                <Text style={[styles.ringLabel, {color: textColor2}]}>
                  {t(label)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <ExerciseGraph />
        <View style={styles.challengeSection}>
          <Text style={[styles.challengeTitle, {color: textColor}]}>
            {t('Choose Your Challenge Focus')}
          </Text>
          <View style={styles.challengeGrid}>
            {challengePerformance.map((item: ChallengePerformance) => {
              const isSelected = selectedType === item?.name;
              return (
                <View key={item?.name} style={styles.challengeItem}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedType(item?.name);
                      if (
                        ['Speed', 'Power', 'Strength', 'Endurance'].includes(
                          item?.name,
                        )
                      ) {
                        navigation.navigate('Endurance', {
                          performance: item,
                        });
                      }
                    }}
                    style={[
                      styles.challengeBox,
                      {
                        backgroundColor: containerBg,
                        ...(isSelected && {
                          borderWidth: 1,
                          borderColor: Colors.primaryColor,
                        }),
                      },
                    ]}>
                    <Image
                      source={{uri: item?.image}}
                      style={styles.challengeImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={[styles.challengeLabel, {color: textColor}]}>
                    {t(item?.name)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <TotalChallengesGraph />
        <View
          style={[
            styles.challangeView,
            {backgroundColor: containerBg, height: 'auto'},
          ]}>
          <Text style={[styles.challengeTitle, {color: textColor}]}>
            {t('Challenge Performance')}
          </Text>
          <View style={[styles.buttonRow]}>
            {performanceTypes.map(({type, icon}) => {
              const isSelected = selectedType === type;
              return (
                <View key={type} style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() => setSelectedType(type)}
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
                      source={icon}
                      style={[
                        styles.icon,
                        {
                          tintColor: isSelected ? '#FFF' : Colors.primaryColor,
                        },
                      ]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={[styles.buttonText, {color: textColor}]}>
                    {t(type)}
                  </Text>
                </View>
              );
            })}
          </View>

          <ChallangesPerformanceGraph
            title="1 KM Trail"
            personalBest="PB: 6:45 "
            data={[20, 20, 0, 20, 5, 50, 20, 30, 40, 30, 20, 40]}
            height={200}
            width={wp(83)}
            labels={['6 Feb', '12 Feb', '14 Feb', '20 Feb', '26 Feb', '28 Feb']}
            propsForDots={{
              r: '3',
              strokeWidth: '1',
              stroke: Colors.primaryColor,
              fill: Colors.black,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GymPerformance;
