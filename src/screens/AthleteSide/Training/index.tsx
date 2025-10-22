import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import {styles} from './styles';

interface TrainingProps {
  navigation?: any;
}

const personalTrainingData = [
  {
    id: '1',
    date: '19 March 2025',
    description: 'Aussie Rules Football training',
  },
  {id: '2', date: '20 March 2025', description: 'Basketball personal training'},
  {id: '3', date: '21 March 2025', description: 'Yoga session'},
];

const gymTrainingData = [
  {id: '1', date: '19 March 2025', description: 'Strength and Conditioning'},
];

const Training: React.FC<TrainingProps> = ({navigation}) => {
  const {t} = useTranslation();
  const [selectedView, setSelectedView] = useState<'personal' | 'gym'>(
    'personal',
  );
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const cardBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;

  const selectedData =
    selectedView === 'personal' ? personalTrainingData : gymTrainingData;

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: cardBg}]}
      onPress={() =>
        selectedView === 'personal'
          ? navigation.navigate('TrainingDetail')
          : navigation.navigate('UpdateTrainingDetail')
      }>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, {color: textColor}]}>
          Training Name:
        </Text>
        <Text style={[styles.cardDate, {color: Colors.red}]}>{item.date}</Text>
      </View>
      <Text style={[styles.cardDescription, {color: textColor}]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Training Calendar')} showBackIcon />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => setSelectedView('personal')}
            style={[
              styles.toggleButton,
              selectedView === 'personal' && styles.activeToggle,
            ]}>
            <Text
              style={[
                styles.toggleText,
                selectedView === 'personal' && styles.activeText,
              ]}>
              {t('Personal Training')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedView('gym')}
            style={[
              styles.toggleButton,
              selectedView === 'gym' && styles.activeToggle,
            ]}>
            <Text
              style={[
                styles.toggleText,
                selectedView === 'gym' && styles.activeText,
              ]}>
              {t('Gym Training')}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={selectedData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Training;
