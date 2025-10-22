import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import styles from '../CommunityMember/styles';
import BackHeader from '../../../components/BackHeader';
import {Memberdata} from '../../../utils/DummyData';

interface TrainingAttendeesProps {
  navigation?: any;
}

const TrainingAttendees: React.FC<TrainingAttendeesProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const renderItem = ({item, index}: any) => (
    <View>
      <View style={[styles.memberContainer, {backgroundColor}]}>
        <View style={styles.leftRow}>
          <View style={styles.profileWrapper}>
            <Image source={item.profileImage} style={styles.profileImage} />
          </View>
          <View style={styles.memberTextInfo}>
            <Text style={[styles.nameText, {color: textColor}]}>
              {item.name}
            </Text>
            <View style={styles.sportRow}>
              <Text style={[styles.sportText, {color: textColor}]}>
                {item.sport}
              </Text>
              <View
                style={[
                  styles.vertSeparator,
                  {backgroundColor: separatorColor},
                ]}
              />
              <Text style={[styles.levelText, {color: textColor}]}>
                {item.level}
              </Text>
            </View>
          </View>
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
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor}}>
      <BackHeader title={t('Attendees')} showBackIcon />
      <FlatList
        data={Memberdata}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 16}}
      />
    </View>
  );
};

export default TrainingAttendees;
