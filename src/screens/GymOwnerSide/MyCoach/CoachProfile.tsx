import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import BackHeader from '../../../components/BackHeader';
import AnySvg from '../../../components/AnySvg';
import {Colors} from '../../../utils/Colors';
import styles from './styles';
import {IMAGES} from '../../../assets/images';

interface CoachProfileProps {
  navigation?: any;
}

const membersData = [
  {id: '1', name: 'Jame John', sport: 'Basket Ball'},
  {id: '2', name: 'Emily Rose', sport: 'Basket Ball'},
  {id: '3', name: 'Alex Smith', sport: 'Basket Ball'},
  {id: '4', name: 'Lara Croft', sport: 'Basket Ball'},
  {id: '5', name: 'Tom Hardy', sport: 'Basket Ball'},
  {id: '6', name: 'Steve Nash', sport: 'Basket Ball'},
  {id: '7', name: 'John Doe', sport: 'Basket Ball'},
  {id: '8', name: 'Jane Doe', sport: 'Basket Ball'},
  {id: '9', name: 'Chris Paul', sport: 'Basket Ball'},
];

const CoachProfile: React.FC<CoachProfileProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const ITEM_SIZE = (SCREEN_WIDTH - 50) / 3;
  const numColumns = 3;

  const renderMember = ({item}: any) => (
    <TouchableOpacity
      style={[styles.memberItem, {backgroundColor, width: ITEM_SIZE}]}
      onPress={() => navigation.navigate('MemberDetail')}>
      <Image
        source={IMAGES.member1}
        style={[styles.memberImage, {borderColor: borderColor}]}
      />
      <Text style={[styles.memberName, {color: textColor}]}>{item.name}</Text>
      <Text style={[styles.memberSport, {color: textColor}]}>{item.sport}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor}]}
      showsVerticalScrollIndicator={false}>
      <BackHeader
        title={t('Detail')}
        showBackIcon
        rightIconName={isDarkMode ? 'editIcon' : 'lightEdit'}
        onRightIconPress={() => navigation.navigate('EditCoache')}
      />

      <View style={styles.profileContainer}>
        <Image source={IMAGES.profileImage} style={styles.profileImage} />
        <Text style={[styles.profileName, {color: textColor}]}>Jame John</Text>
        <Text style={[styles.profileEmail, {color: textColor}]}>
          info@jamesjohn.com
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.infoLabel, {color: textColor}]}>
          {t('Phone')}:
        </Text>
        <Text style={[styles.infoValue, {color: textColor}]}>
          +1 234 567 890
        </Text>
      </View>

      <View style={[styles.separator, {backgroundColor: separaterColor}]} />

      <View style={styles.membersHeaderRow}>
        <View style={styles.totalMembersRow}>
          <Text style={[styles.infoLabel, {color: textColor}]}>
            {t('Total Members')}:
          </Text>
          <Text style={[styles.infoValue, {color: textColor}]}>
            {membersData.length}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AssignCoach')}>
          <AnySvg name={isDarkMode ? 'addPlan' : 'lightAdd'} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={membersData}
        numColumns={numColumns}
        key={`members_${numColumns}_columns`}
        keyExtractor={item => item.id}
        renderItem={renderMember}
        scrollEnabled={false}
        contentContainerStyle={styles.memberListContainer}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default CoachProfile;
