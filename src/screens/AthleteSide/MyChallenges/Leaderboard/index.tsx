import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import BackHeader from '../../../../components/BackHeader';
import {Colors} from '../../../../utils/Colors';
import fonts from '../../../../utils/Fonts';
import {IMAGES} from '../../../../assets/images';
import {getChallengeLeaderboard} from '../../../../services/calls';

interface LeaderboardProps {
  navigation?: any;
}

interface LeaderboardData {
  gym: string;
  leaderboard: Array<{
    name: string;
    submission: {
      date: string;
      time: string;
      reps: string;
      mediaUrl: string;
      ownerApprovalStatus: string;
      note: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
  }>;
}

const Leaderboard: React.FC<LeaderboardProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#ddd';

  // State management
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Get challenge ID from route params
  const challengeId =
    (route.params as any)?.challengeId ||
    (route.params as any)?.challenge?.challengeId;
  // Fetch leaderboard data
  const fetchLeaderboardData = async () => {
    if (!challengeId) {
      setError('Challenge ID not found');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await getChallengeLeaderboard(challengeId);
      console.log('Response here **** ', JSON.stringify(response?.data));
      setLeaderboardData(response.data);
    } catch (err: any) {
      console.log('Error here ', err?.message);
      console.error('Error fetching leaderboard:', err);
      setError(err.message || 'Failed to fetch leaderboard data');
      Alert.alert('Error', 'Failed to load leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [challengeId]);

  const tableHead = [
    'No',
    'Name',
    'Result',
    'Gym',
    'Time',
    'Reps',
    'Weight',
    'Days',
    'Video',
    'Country',
  ];

  const flagMap: any = {
    US: IMAGES.engLogo,
  };

  // Process leaderboard data for table display
  const processTableData = () => {
    if (!leaderboardData?.leaderboard) return [];

    return leaderboardData.leaderboard.map((item, index) => [
      (index + 1).toString(), // No
      item.name, // Name
      item.submission.ownerApprovalStatus === 'accepted' ? '✓' : 'Pending', // Result
      leaderboardData.gym || 'N/A', // Gym
      item.submission.time || 'N/A', // Time
      item.submission.reps || 'N/A', // Reps
      'N/A', // Weight (not available in API)
      'N/A', // Days (not available in API)
      item.submission.mediaUrl?.trim()?.length ? 'View' : 'N/A', // Video
      'US', // Country (default)
    ]);
  };

  const tableData = processTableData();

  const renderElement = (
    cellData: any,
    columnIndex: number,
    rowIndex: number,
  ) => {
    if (tableHead[columnIndex] === 'Video') {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('VideoPlayer', {id: rowIndex})}>
          <Text style={[styles.text, {color: Colors.primaryColor}]}>
            {cellData}
          </Text>
        </TouchableOpacity>
      );
    }
    if (tableHead[columnIndex] === 'Country') {
      return (
        <Image
          source={flagMap[cellData]}
          style={{
            width: 24,
            height: 24,
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />
      );
    }
    return <Text style={[styles.text, {color: textColor}]}>{cellData}</Text>;
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor}]}>
        <BackHeader
          title={t('Leaderboard')}
          showBackIcon
          containerStyle={{marginBottom: 6}}
        />
        <View style={[styles.loadingContainer, {backgroundColor}]}>
          <ActivityIndicator size="large" color={Colors.primaryColor} />
          <Text style={[styles.loadingText, {color: textColor}]}>
            {t('Loading leaderboard...')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor}]}>
        <BackHeader
          title={t('Leaderboard')}
          showBackIcon
          containerStyle={{marginBottom: 6}}
        />
        <View style={[styles.errorContainer, {backgroundColor}]}>
          <Text style={[styles.errorText, {color: textColor}]}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchLeaderboardData}>
            <Text style={styles.retryButtonText}>{t('Retry')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // No data state
  if (
    !leaderboardData ||
    !leaderboardData.leaderboard ||
    leaderboardData.leaderboard.length === 0
  ) {
    return (
      <SafeAreaView style={[styles.safe, {backgroundColor}]}>
        <BackHeader
          title={t('Leaderboard')}
          showBackIcon
          containerStyle={{marginBottom: 6}}
        />
        <View style={[styles.noDataContainer, {backgroundColor}]}>
          <Text style={[styles.noDataText, {color: textColor}]}>
            {t('No leaderboard data available')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor}]}>
      <BackHeader
        title={t('Leaderboard')}
        showBackIcon
        containerStyle={{marginBottom: 6}}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{padding: 12}}>
          <Table borderStyle={{borderWidth: 1, borderColor: separatorColor}}>
            <Row
              data={tableHead}
              style={[
                styles.head,
                {backgroundColor: isDarkMode ? '#333' : '#f1f8ff'},
              ]}
              textStyle={[styles.headText, {color: textColor}]}
              widthArr={Array(tableHead.length).fill(100)}
            />
            {tableData.map((rowData, rowIndex) => (
              <Row
                key={rowIndex}
                data={rowData.map((cellData, columnIndex) =>
                  renderElement(cellData, columnIndex, rowIndex),
                )}
                style={styles.row}
                widthArr={Array(tableHead.length).fill(100)}
              />
            ))}
          </Table>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  head: {
    height: 48,
  },
  headText: {
    fontSize: 17,
    fontFamily: fonts.UrbanistBold,
    textAlign: 'center',
  },
  row: {
    height: 44,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.UrbanistRegular,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: fonts.UrbanistBold,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noDataText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
    textAlign: 'center',
  },
});
