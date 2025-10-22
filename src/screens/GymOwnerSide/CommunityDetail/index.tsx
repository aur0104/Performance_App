import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import styles from '../../AthleteSide/ChallengesDetail/styles';
import {Colors} from '../../../utils/Colors';
import AnySvg from '../../../components/AnySvg';
import {IMAGES} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import fonts from '../../../utils/Fonts';
import DeletePopupModal from '../../../components/DeleteModal';
import {deleteChallenge, getChallengeById} from '../../../services/calls';
import Toast from 'react-native-toast-message';
import {wp} from '../../../utils/responsivesness';

interface ChallengeDetailProps {
  navigation?: any;
}

const GymChallengeDetail: React.FC<ChallengeDetailProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [challengeData, setChallengeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get challenge ID from navigation params
  const challengeId = (route.params as any)?.id;

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separaterColor = isDarkMode ? '#424242' : '#E0E0E0';
  const textColor2 = isDarkMode ? Colors.gray : Colors.black;
  const profileImages = [
    IMAGES.community1,
    IMAGES.community2,
    IMAGES.community3,
  ];
  // Function to fetch challenge details
  const fetchChallengeDetails = async () => {
    if (!challengeId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getChallengeById(challengeId);
      if (response.status === 200) {
        setChallengeData(response.data);
      }
    } catch (error) {
      console.error('Error fetching challenge details:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load challenge details',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch challenge details on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchChallengeDetails();
    }, [challengeId]),
  );

  const handleButtonClick = () => {
    navigation.navigate('EditChallenge', {
      challengeData: challengeData,
      id: challengeId,
    });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text style={[{color: textColor, marginTop: 10}]}>
          {t('Loading challenge details...')}
        </Text>
      </View>
    );
  }

  if (!challengeData) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor, justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={[{color: textColor}]}>{t('Challenge not found')}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={
              challengeData?.mediaUrl
                ? {uri: challengeData.mediaUrl}
                : challengeData?.type?.image
                ? {uri: challengeData.type.image}
                : IMAGES.challengeDetail
            }
            style={styles.coverImage}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AnySvg name="backArrow" width={24} height={24} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {color: textColor}]}>
              {t('Detail')}
            </Text>

            <AnySvg
              name="informationCircle"
              width={24}
              height={24}
              onPress={() => navigation.navigate('ChallengeRules')}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.challengeTitle, {color: textColor}]}>
            {challengeData?.name ?? ''}
          </Text>
          <View style={styles.avatarGroup}>
            {(route?.params as any)?.challengeData?.participants?.length > 0 &&
              (route?.params as any)?.challengeData?.participants.map(
                (imageSource: any, index: number) => (
                  <>
                    {imageSource?.profileImage ? (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.avatarWrapper,
                          {zIndex: profileImages.length - index},
                        ]}
                        onPress={() =>
                          navigation.navigate('Participants', {
                            challengeId: challengeId,
                          })
                        }>
                        <Image
                          source={{uri: imageSource?.profileImage}}
                          style={styles.avatarImage}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          borderRadius: 100,
                          width: 30,
                          height: 30,
                          backgroundColor: Colors.gray,
                        }}
                        onPress={() =>
                          navigation.navigate('Participants', {
                            challengeId: challengeId,
                          })
                        }
                        key={index}
                      />
                    )}
                  </>
                ),
              )}
          </View>
        </View>

        <View style={[styles.separator, {backgroundColor: separaterColor}]} />

        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', gap: 6}}>
            <Text style={[styles.subtitle, {color: textColor}]}>
              {t('Challenge Type')}:
            </Text>
            <Text
              style={[
                styles.subtitleValue,
                {color: textColor2, maxWidth: wp(20)},
              ]}>
              {challengeData?.type?.name}
            </Text>
          </View>
        </View>

        {challengeData?.type?.name == 'Attendance Based' ? null : (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={{flexDirection: 'row', gap: 6}}>
                <Text style={[styles.subtitle, {color: textColor}]}>
                  {t('Exercise')}:
                </Text>
                <Text style={[styles.subtitleValue, {color: textColor2}]}>
                  {challengeData?.exercise?.name}
                </Text>
              </View>
            </View>
          </>
        )}

        {challengeData?.type?.name == 'Attendance Based' ? null : (
          <View style={[styles.separator, {backgroundColor: separaterColor}]} />
        )}

        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            },
          ]}>
          {challengeData?.type?.name == 'Attendance Based' ? null : (
            <View style={{flexDirection: 'row', gap: 6}}>
              <Text style={[styles.subtitle, {color: textColor}]}>
                {t('Challenge Format')}:
              </Text>
              <Text style={[styles.subtitleValue, {color: textColor2}]}>
                {challengeData?.format?.name}
              </Text>
            </View>
          )}
        </View>
        {challengeData?.time && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={styles.row}>
              <Text style={[styles.subtitle, {color: textColor}]}>
                {t('Time  :')}
              </Text>
              <Text style={[styles.dateValue, {color: textColor2}]}>
                {challengeData?.time}
              </Text>
            </View>
          </>
        )}
        {challengeData?.distance && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={styles.row}>
              <Text style={[styles.subtitle, {color: textColor}]}>
                {t('Challenge Distance:')}
              </Text>
              <Text style={[styles.dateValue, {color: textColor2}]}>
                {challengeData?.distance}
              </Text>
            </View>
          </>
        )}

        <View style={[styles.separator, {backgroundColor: separaterColor}]} />

        <View style={styles.row}>
          <Text style={[styles.subtitle, {color: textColor}]}>
            {t('Challenge Duration:')}
          </Text>
          <Text style={[styles.dateValue, {color: textColor2}]}>
            {challengeData?.duration || challengeData?.frequency}
          </Text>
        </View>

        {challengeData?.requiredVideo && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={[styles.subtitle, {color: textColor}]}>
                  {t('Require Video Proof')}
                </Text>
                <Text style={[styles.dateValue, {color: textColor2}]}>
                  {challengeData?.requiredVideo ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
          </>
        )}

        {challengeData?.sessionGoals && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={[styles.subtitle, {color: textColor}]}>
                  {t('Session Goals')}
                </Text>
                <Text style={[styles.dateValue, {color: textColor2}]}>
                  {challengeData?.sessionGoals}
                </Text>
              </View>
            </View>
          </>
        )}
        {challengeData?.completionCount && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={[styles.subtitle, {color: textColor}]}>
                  {t('Session Goals')}
                </Text>
                <Text style={[styles.dateValue, {color: textColor2}]}>
                  {challengeData?.completionCount}
                </Text>
              </View>
            </View>
          </>
        )}
        {challengeData?.startDate && (
          <>
            <View
              style={[styles.separator, {backgroundColor: separaterColor}]}
            />
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={[styles.subtitle, {color: textColor}]}>
                  {t('Start Date')}
                </Text>
                <Text style={[styles.dateValue, {color: textColor2}]}>
                  {new Date(challengeData?.startDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </>
        )}
        <CustomButton
          onPress={handleButtonClick}
          containerStyle={{marginBottom: '2%', marginTop: '12%'}}>
          {t('Edit Detail')}
        </CustomButton>
        {deleteLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            style={{alignItems: 'center', marginBottom: '10%'}}
            onPress={() => setShowDelete(true)}>
            <Text
              style={[
                styles.subtitleValue,
                {color: Colors.red, fontFamily: fonts.UrbanistBold},
              ]}>
              {t('Delete')}
            </Text>
          </TouchableOpacity>
        )}

        <DeletePopupModal
          visible={showDelete}
          onCancel={() => setShowDelete(false)}
          onDelete={async () => {
            try {
              setDeleteLoading(true);
              setShowDelete(false);
              const response = await deleteChallenge(challengeId);
              if (response.status == 200) {
                navigation.goBack();
              }
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Cannot remove challenge',
              });
            } finally {
              setDeleteLoading(false);
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

export default GymChallengeDetail;
