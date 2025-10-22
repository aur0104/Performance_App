import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import {IMAGES} from '../../../assets/images';
import {performanceTypes, requestData} from '../../../utils/DummyData';
import {hp, wp} from '../../../utils/responsivesness';
import styles from '../../AthleteSide/CommunityDetail/style';
import MatchReviewGraph from '../../../components/MatchReviewGraph';
import SkillTrainingGraph from '../../../components/SkillTraining';
import AttendenceGraph from '../../../components/AttendenceGraph';
import ChallangesPerformanceGraph from '../../../components/ChallangesPerformance';
import CustomButton from '../../../components/CustomButton';
import reqStyles from '../../AthleteSide/RequestFeedback/styles';
import GymJournals from './Journals';
import fonts from '../../../utils/Fonts';

interface CommunityProps {
  navigation?: any;
}

const MemberDetail: React.FC<CommunityProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [selectedView, setSelectedView] = useState<
    'Performance' | 'Feedback Request' | 'Journals'
  >('Performance');
  const [selectedType, setSelectedType] = useState<string>('Strength');
  const [modalVisible, setModalVisible] = useState(false);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;

  const handlePress = (item: any) => {
    navigation.navigate('MemberRequestDetail', {item});
  };

  const Performance = () => (
    <View style={[{flex: 1, backgroundColor}]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 0}}
        showsVerticalScrollIndicator={false}>
        <MatchReviewGraph
          showReviewDropdown={false}
          titleOverride="Sport Reviews"
          monthOptions={['January', 'February', 'March', 'April']}
          yearOptions={[2022, 2023, 2024, 2025]}
        />
        <SkillTrainingGraph />
        <View
          style={[
            styles.containers,
            {backgroundColor: background, height: 400},
          ]}>
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
                        {tintColor: isSelected ? '#FFF' : Colors.primaryColor},
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
            title="Back Squat"
            personalBest="PB: 80KG"
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
        <AttendenceGraph style={{marginBottom: hp(4)}} />
      </ScrollView>
      <CustomButton
        onPress={() => navigation.navigate('EditMember')}
        containerStyle={{marginBottom: '12%'}}>
        {t('Edit Member')}
      </CustomButton>
    </View>
  );

  const FeedbackRequest = () => (
    <FlatList
      data={requestData}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      contentContainerStyle={reqStyles.listContent}
      renderItem={({item}) => (
        <Pressable
          onPress={() => handlePress(item)}
          style={[reqStyles.itemContainer, {backgroundColor: background}]}>
          <View style={reqStyles.rowBetween}>
            <Text style={[reqStyles.sportText, {color: textColor}]}>
              Sport Type: <Text style={{fontSize: 16}}>{item.sport}</Text>
            </Text>
            <Text style={[reqStyles.dateText, {color: textColor}]}>
              {item.date}
            </Text>
          </View>
          <Text style={[reqStyles.messageText, {color: textColor2}]}>
            {item.message}
          </Text>
        </Pressable>
      )}
    />
  );

  const Journals = () => <GymJournals />;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        style={[styles.container, {backgroundColor}]}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.memberDetail}
          style={styles.headerImage}
          resizeMode="cover">
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AnySvg name="backArrow" width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <AnySvg name="dotIcon" width={24} height={24} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.titleRow}>
          <Text style={[styles.titleText, {color: textColor, fontSize: 22}]}>
            Adam Scout
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReviewRestriction')}>
            <Text
              style={[
                styles.titleText,
                {color: Colors.primaryColor, fontSize: 16},
              ]}>
              Review Restriction
            </Text>
          </TouchableOpacity>
          <Text style={[styles.titleText, {color: textColor, fontSize: 22}]}>
            X4823
          </Text>
        </View>

        <View
          style={[
            styles.toggleContainer,
            {backgroundColor: background, marginBottom: 20},
          ]}>
          {['Performance', 'Feedback Request', 'Journals'].map(view => (
            <TouchableOpacity
              key={view}
              onPress={() => setSelectedView(view as any)}
              style={[
                styles.toggleButton,
                selectedView === view && styles.activeToggle,
              ]}>
              <Text
                style={[
                  styles.toggleText,
                  selectedView === view
                    ? styles.activeText
                    : {color: textColor},
                  {fontSize: 13},
                ]}>
                {t(view)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedView === 'Performance' && <Performance />}
        {selectedView === 'Feedback Request' && <FeedbackRequest />}
        {selectedView === 'Journals' && <Journals />}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={localStyles.modalOverlay}>
            <View style={[localStyles.modalContainer]}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('EditMember');
                }}
                style={{flexDirection: 'row', gap: 2}}>
                <AnySvg name={'Edit'} size={18} />
                <Text style={[localStyles.modalText]}>{t('Edit Profile')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 140,
    height: 55,
    top: hp(6),
    right: hp(2),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    paddingHorizontal: 6,

    fontFamily: fonts.UrbanistSemiBold,
    color: Colors.black,
  },
});

export default MemberDetail;
