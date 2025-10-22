import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import BackHeader from '../../../components/BackHeader';
import {Memberdata} from '../../../utils/DummyData';

interface AttendeesProps {
  navigation?: any;
}

const Attendees: React.FC<AttendeesProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const borderColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const textColor2 = isDarkMode ? '#797979' : '#424242';
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const [selectedTab, setSelectedTab] = useState<
    'Attending' | 'Checked In' | 'Rejected'
  >('Attending');

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MemberDetail')}
      style={[styles.memberContainer, {backgroundColor}]}>
      <View style={styles.leftRow}>
        <View style={styles.profileWrapper}>
          <Image source={item.profileImage} style={styles.profileImage} />
        </View>
        <View style={styles.memberTextInfo}>
          <Text style={[styles.nameText, {color: textColor}]}>{item.name}</Text>
          <View style={styles.sportRow}>
            <Text style={[styles.sportText, {color: textColor}]}>
              {item.sport}
            </Text>
            <View
              style={[styles.vertSeparator, {backgroundColor: separatorColor}]}
            />
            <Text style={[styles.levelText, {color: textColor2}]}>
              {item.level}
            </Text>
          </View>

          {selectedTab === 'Checked In' && (
            <View style={styles.checkInButtonsRow}>
              <TouchableOpacity
                style={[
                  styles.checkInButtonBorder,
                  {backgroundColor: borderColor},
                ]}>
                <Text
                  style={[styles.checkInButtonTextBorder, {color: textColor}]}>
                  Reject
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkInButtonPrimary}
                onPress={() => setSelectedTab('Attending')}>
                <Text style={styles.checkInButtonTextPrimary}>Attend</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {index < Memberdata.length - 1 && (
        <View
          style={[
            styles.horizontalSeparator,
            {backgroundColor: separatorColor},
          ]}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[{flex: 1, backgroundColor}]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 10}}
        showsVerticalScrollIndicator={false}>
        <BackHeader title={t('Attendees')} showBackIcon />

        <View style={[styles.toggleContainer, {backgroundColor: borderColor}]}>
          {['Attending', 'Checked In', 'Rejected'].map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab as any)}
              style={[
                styles.toggleButton,
                {
                  backgroundColor:
                    selectedTab === tab ? Colors.primaryColor : borderColor,
                },
              ]}>
              <Text
                style={{
                  color: selectedTab === tab ? Colors.white : textColor,
                }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={Memberdata}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingHorizontal: 16, paddingTop: 20}}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default Attendees;
