import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import Checkbox from '../../../components/CheckBox';
import AnySvg from '../../../components/AnySvg';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {useNavigation} from '@react-navigation/native';

interface ChallengeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectChallenge: (challengeName: string) => void;
}

const SelectChallengeModal: React.FC<ChallengeModalProps> = ({
  visible,
  onClose,
  onSelectChallenge,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(
    null,
  );

  const challenges = [
    {
      title: '1. Strength Challenges (Consistency-Based)',
      data: [
        'Reps Based',
        'Time Based',
        'Max Effort Single Attempt',
        'Proof Optional',
      ],
    },
    {
      title: 'Power Challenges',
      data: [
        'Reps Based',
        'Explosive Reps',
        'Distance Based',
        'Max Power Output',
      ],
    },
    {
      title: 'Endurance Challenges',
      data: [
        'Time Based',
        'Distance Based',
        'Calories Based',
        'Streak Challenge',
      ],
    },
    {
      title: 'Speed Challenges',
      data: [
        'Sprint Timing',
        'Max Effort Single Attempt',
        'Reaction Time Challenge',
        'Proof Recommended',
      ],
    },
  ];

  const handleCheck = (challenge: string) => {
    setSelectedChallenge(challenge);
    onSelectChallenge(challenge);
    onClose();
  };

  const renderChallengeItem = ({item}: any) => (
    <View style={styles.challengeRow}>
      <Checkbox
        checked={selectedChallenge === item.challenge}
        setChecked={() => handleCheck(item.challenge)}
        title={item.challenge}
        textStyle={{fontSize: 12}}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Rules')}>
        <Text style={[styles.seeRuleText, {color: Colors.primaryColor}]}>
          See Rule
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSection = ({item}: any) => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: textColor}]}>
        {item.title}
      </Text>
      <FlatList
        data={item.data.map((challenge: string) => ({challenge}))}
        keyExtractor={item => item.challenge}
        renderItem={renderChallengeItem}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, {backgroundColor}]}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onClose}>
              <AnySvg name={isDarkMode ? 'darkCross' : 'lightCross'} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {color: textColor}]}>
              {t('Challenges')}
            </Text>
            <AnySvg name={isDarkMode ? 'tickIcon' : 'checkLight'} />
          </View>

          <FlatList
            data={challenges}
            keyExtractor={item => item.title}
            renderItem={renderSection}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={[
                  styles.sectionSeparator,
                  {backgroundColor: separatorColor},
                ]}
              />
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxHeight: '100%',
    borderRadius: 12,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(4),
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
  },
  sectionContainer: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: 12,
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0,
  },
  seeRuleText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  sectionSeparator: {
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
});

export default SelectChallengeModal;
