import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import styles from '../../AthleteSide/CommunityMember/styles';
import BackHeader from '../../../components/BackHeader';
import {Memberdata} from '../../../utils/DummyData';

interface MyCoachProps {
  navigation?: any;
}

const AssignCoach: React.FC<MyCoachProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const [assignedCoaches, setAssignedCoaches] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAssign = (id: string) => {
    setAssignedCoaches(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({item}: any) => {
    const isAssigned = assignedCoaches[item.id];

    return (
      <View>
        <View style={[styles.memberContainer, {backgroundColor}]}>
          <View style={styles.leftRow}>
            <View style={styles.profileWrapper}>
              <Image source={item.profileImage} style={styles.profileImage} />
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {/* Left side: Name & Sport */}
              <View style={styles.memberTextInfo}>
                <Text style={[styles.nameText, {color: textColor}]}>
                  {item.name}
                </Text>
                <Text style={[styles.sportText, {color: textColor}]}>
                  {item.sport}
                </Text>
              </View>

              {/* Right side: Assign button */}
              <TouchableOpacity
                onPress={() => handleAssign(item.id)}
                style={{
                  width: 100,
                  height: 32,
                  borderRadius: 110,
                  backgroundColor: isAssigned
                    ? Colors.green
                    : Colors.primaryColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.white}}>
                  {isAssigned ? 'Assigned' : 'Assign'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.horizontalSeparator,
            {backgroundColor: separatorColor},
          ]}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView style={{flex: 1, backgroundColor}}>
        <BackHeader title={t('Members')} showBackIcon />
        <FlatList
          data={Memberdata}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{paddingHorizontal: 16, paddingTop: 0}}
        />
      </ScrollView>
    </View>
  );
};

export default AssignCoach;
