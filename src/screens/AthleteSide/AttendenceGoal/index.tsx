import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {Colors} from '../../../utils/Colors';
import TrainingGoalGraph from '../../../components/TrainingGoalGraph';
import AnySvg from '../../../components/AnySvg';
import {getAttendanceGoalsHomeStats} from '../../../services/calls';
import {
  generateAttendanceGoalsPDF,
  sharePDF,
  downloadPDF,
  openPDF,
} from '../../../utils/PDFGenerator';
import styles from './styles';
import {hp} from '../../../utils/responsivesness';

const {width} = Dimensions.get('window');

interface GoalProps {
  navigation?: any;
}

interface AttendanceGoalStats {
  Event?: Array<{
    _id: string;
    name: string;
    type: string;
    percentage: number;
    daysLeft: number;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    __v: number;
  }>;
  'Training Goal'?: {
    [month: string]: number;
  };
}

const AttendenceGoal: React.FC<GoalProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user);
  const [homeStats, setHomeStats] = useState<AttendanceGoalStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const backgroundColor = isDarkMode ? Colors.darkBackground : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const subTextColor = isDarkMode ? '#797979' : '#424242';
  const cardBackground = isDarkMode ? Colors.darkInputBg : '#F5F5F5';
  const iconButtonColor = isDarkMode ? '#797979' : '#EDEDED';

  useEffect(() => {
    fetchHomeStats();
  }, []);

  const fetchHomeStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentYear = new Date().getFullYear().toString();
      const userId = user?.user?._id || '68597736da3aaaee4e1d8e56'; // fallback to the ID from curl
      const response = await getAttendanceGoalsHomeStats(currentYear, userId);
      setHomeStats(response.data);
    } catch (error: any) {
      console.error('Error fetching home stats:', error);
      setError(error?.response?.data?.message || 'Failed to load goals data');
    } finally {
      setLoading(false);
    }
  };

  const handleSharePDF = async () => {
    if (!homeStats) {
      Toast.show({
        type: 'error',
        text1: t('No Data Available'),
        text2: t('Please wait for data to load'),
      });
      return;
    }

    try {
      setShareLoading(true);
      const userName = user?.user?.name || 'User';
      const pdfPath = await generateAttendanceGoalsPDF(homeStats, userName);
      await sharePDF(pdfPath);
      Toast.show({
        type: 'success',
        text1: t('PDF Generated'),
        text2: t('PDF is ready to share'),
      });
    } catch (error) {
      console.error('Error sharing PDF:', error);
      // Toast.show({
      //   type: 'error',
      //   text1: t('PDF Share Failed'),
      //   text2: t('Failed to share PDF'),
      // });
    } finally {
      setShareLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!homeStats) {
      Toast.show({
        type: 'error',
        text1: t('No Data Available'),
        text2: t('Please wait for data to load'),
      });
      return;
    }

    try {
      setDownloadLoading(true);
      const userName = user?.user?.name || 'User';
      const pdfPath = await generateAttendanceGoalsPDF(homeStats, userName);
      // await downloadPDF(pdfPath);

      // For iOS, also open the PDF after downloading
      // if (Platform.OS === 'ios') {
      setTimeout(async () => {
        try {
          await openPDF(pdfPath);
        } catch (openError) {
          console.error('Error opening PDF:', openError);
        }
      }, 1000); // Small delay to ensure file is ready
      // }

      Toast.show({
        type: 'success',
        text1: t('PDF Generated'),
        text2:
          Platform.OS === 'ios'
            ? t('PDF saved and opened')
            : t('PDF saved to Downloads'),
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Toast.show({
      //   type: 'error',
      //   text1: t('PDF Download Failed'),
      //   text2: t('Failed to download PDF'),
      // });
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        color={Colors.primaryColor}
        style={{paddingTop: hp(40)}}
      />
    );
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AnySvg
              name={isDarkMode ? 'backArrow' : 'lightBackArrow'}
              size={24}
            />
          </TouchableOpacity>

          <Text style={[styles.headerTitle, {color: textColor}]}>
            {t('Goals & Events')}
          </Text>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.refreshButton, {backgroundColor: iconButtonColor}]}
              onPress={fetchHomeStats}>
              <Text style={[styles.refreshButtonText, {color: textColor}]}>
                {t('Refresh')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, {backgroundColor: iconButtonColor}]}
              onPress={handleSharePDF}
              disabled={shareLoading || downloadLoading || !homeStats}>
              {shareLoading ? (
                <ActivityIndicator size="small" color={textColor} />
              ) : (
                <AnySvg
                  name={isDarkMode ? 'shareIcon' : 'lightShare'}
                  size={15}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, {backgroundColor: iconButtonColor}]}
              onPress={handleDownloadPDF}
              disabled={shareLoading || downloadLoading || !homeStats}>
              {downloadLoading ? (
                <ActivityIndicator size="small" color={textColor} />
              ) : (
                <AnySvg
                  name={isDarkMode ? 'downloadIcon' : 'lightDownload'}
                  size={15}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Check if both Training Goal and Event data are empty */}
        {(!homeStats?.['Training Goal'] ||
          Object.keys(homeStats?.['Training Goal'] || {}).length === 0) &&
        (!homeStats?.Event || homeStats.Event.length === 0) ? (
          <View
            style={[
              styles.goalCard,
              {
                backgroundColor: cardBackground,
                alignItems: 'center',
                paddingVertical: 40,
              },
            ]}>
            <Text
              style={[
                styles.goalTitle,
                {color: textColor, textAlign: 'center'},
              ]}>
              {t('No Data Found')}
            </Text>
            <Text
              style={[
                styles.goalName,
                {color: subTextColor, textAlign: 'center', marginTop: 8},
              ]}>
              {t('No training goals or events available at the moment')}
            </Text>
          </View>
        ) : (
          <>
            {homeStats?.['Training Goal'] &&
            Object.keys(homeStats['Training Goal']).length > 0 ? (
              <TrainingGoalGraph
                trainingGoalData={homeStats['Training Goal']}
              />
            ) : null}

            {homeStats?.Event && homeStats.Event.length > 0
              ? homeStats.Event.map((event, index) => (
                  <View
                    key={event._id}
                    style={[
                      styles.goalCard,
                      {backgroundColor: cardBackground, height: 185},
                    ]}>
                    <Text style={[styles.goalTitle, {color: textColor}]}>
                      {event.type}
                    </Text>
                    <Text style={[styles.goalName, {color: textColor}]}>
                      {event.name}
                    </Text>

                    <View
                      style={[
                        styles.progressContainer,
                        {
                          backgroundColor: isDarkMode
                            ? '#FFFFFF2E'
                            : '#2121212E',
                        },
                      ]}>
                      <View
                        style={[
                          styles.progressFill,
                          {width: `${event.percentage}%`},
                        ]}
                      />
                    </View>

                    <View style={styles.dueRow}>
                      <Text style={[styles.dueText, {color: subTextColor}]}>
                        {event.daysLeft} {t('Days Left')}
                      </Text>
                    </View>
                  </View>
                ))
              : null}
          </>
        )}

        {/* Error State */}
        {error && (
          <View style={[styles.goalCard, {backgroundColor: cardBackground}]}>
            <Text style={[styles.goalTitle, {color: textColor}]}>
              {t('Error')}
            </Text>
            <Text style={[styles.goalName, {color: subTextColor}]}>
              {error}
            </Text>
            <TouchableOpacity
              style={[
                styles.retryButton,
                {backgroundColor: Colors.primaryColor},
              ]}
              onPress={fetchHomeStats}>
              <Text style={[styles.retryButtonText, {color: Colors.white}]}>
                {t('Retry')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddGoal')}>
        <AnySvg
          name={isDarkMode ? 'addDarkIcon' : 'addLightIcon'}
          size={32}
          svgStyle={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AttendenceGoal;
