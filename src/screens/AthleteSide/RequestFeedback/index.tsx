import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styles from './styles';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';

interface RequestFeedbackProps {
  navigation?: any;
}

const RequestFeedback: React.FC<RequestFeedbackProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;

  const [selectedView, setSelectedView] = useState<'Received' | 'Sent'>(
    'Received',
  );

  const receivedData = [
    {
      id: '1',
      sport: 'Rugby',
      date: '13 July 2025',
      message: "Hey Coach, I've completed today's challenge in 30 seconds....",
    },
    {
      id: '2',
      sport: 'Rugby',
      date: '13 July 2025',
      message: "Hey Coach, I've completed today's challenge in 30 seconds....",
    },
  ];

  const sentData = [
    {
      id: '3',
      sport: 'Football',
      date: '10 July 2025',
      message: 'Hey Player, please complete the challenge today.',
    },
    {
      id: '4',
      sport: 'Football',
      date: '10 July 2025',
      message: 'Hey Player, please complete the challenge today.',
    },
  ];

  const data = selectedView === 'Received' ? receivedData : sentData;

  const handlePress = (item: any) => {
    if (selectedView === 'Received') {
      navigation.navigate('ReceivedRequestDetail', {item});
    } else {
      navigation.navigate('SendRequestDetail', {item});
    }
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={t('Requests')} showBackIcon />

      <View style={[styles.toggleContainer, {backgroundColor: viewBg}]}>
        <TouchableOpacity
          onPress={() => setSelectedView('Received')}
          style={[
            styles.toggleButton,
            selectedView === 'Received' && styles.activeToggle,
          ]}>
          <Text
            style={[
              styles.toggleText,
              selectedView === 'Received'
                ? styles.activeText
                : {color: textColor2},
            ]}>
            {t('Requests Received')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedView('Sent')}
          style={[
            styles.toggleButton,
            selectedView === 'Sent' && styles.activeToggle,
          ]}>
          <Text
            style={[
              styles.toggleText,
              selectedView === 'Sent' ? styles.activeText : {color: textColor2},
            ]}>
            {t('Send Requests')}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handlePress(item)}
            style={[styles.itemContainer, {backgroundColor: viewBg}]}>
            <View style={styles.rowBetween}>
              <Text style={[styles.sportText, {color: textColor}]}>
                Sport Type: {'  '}{' '}
                <Text style={{fontSize: 16}}>{item.sport}</Text>
              </Text>
              <Text style={[styles.dateText, {color: textColor2}]}>
                {item.date}
              </Text>
            </View>
            <Text style={[styles.messageText, {color: textColor2}]}>
              {item.message}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default RequestFeedback;
