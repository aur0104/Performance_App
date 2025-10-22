import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import fonts from '../../../utils/Fonts';
import AllRunningChallenges from './ChallengesComponent/AllChallenges';
import ActiveRunningChallenges from './ChallengesComponent/ActiveChallenges';
import CompletedRunningChallenges from './ChallengesComponent/CompletedChallenges';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {getChallengeType} from '../../../services/calls';

interface RunningChallengesProps {
  navigation?: any;
}

const RunningChallenges: React.FC<RunningChallengesProps> = ({navigation}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const primaryColor = Colors.primaryColor;
  const user = useSelector((state: any) => state.user.user);
  const userId = user.user?._id;
  const route = useRoute();
  const dataKey = route.params?.dataKey?.name ?? '';
  const _id = route.params?.dataKey?._id;
  console.log('Id here ', _id);
  const initialTab = route.params?.selectedTab?.name ?? 'All';
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Add state for backend data
  const [challengeData, setChallengeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState<
    'All' | 'Active' | 'Completed'
  >(initialTab);

  const getDataFromBackend = async () => {
    try {
      setLoading(true);
      const result = await getChallengeType(_id, userId);
      setChallengeData(result?.data);
    } catch (error) {
      console.log('Error here', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);

  const formatTitle = (str: string) =>
    str.replace(/([a-z])([A-Z])/g, '$1 $2').trim();

  const renderTabButton = (label: 'All' | 'Active' | 'Completed') => {
    const isSelected = selectedTab === label;
    return (
      <TouchableOpacity
        style={[
          styles.tabButton,
          {
            backgroundColor: isSelected ? primaryColor : 'transparent',
          },
        ]}
        onPress={() => setSelectedTab(label)}>
        <Text
          style={{
            color: isSelected ? 'white' : textColor,
            fontWeight: '600',
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleChallengeJoin = (status: number) => {
    console.log('API Result:', status);
    if (status === 201 || status === 200) {
      getDataFromBackend();
    }
  };
  const renderContent = () => {
    if (loading) {
      return (
        <Text style={[styles.contentText, {color: textColor}]}>Loading...</Text>
      );
    }

    switch (selectedTab) {
      case 'All':
        return (
          <AllRunningChallenges
            dataMapKey={dataKey}
            refreshFlag={refreshFlag}
            allChallenges={challengeData?.allChallenges || []}
            onChallengeJoin={handleChallengeJoin}
          />
        );
      case 'Active':
        return (
          <ActiveRunningChallenges
            activeChallenge={challengeData?.userChallenges?.active || []}
          />
        );
      case 'Completed':
        return (
          <CompletedRunningChallenges
            completedChallenges={challengeData?.userChallenges?.completed || []}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <BackHeader title={formatTitle(dataKey)} showBackIcon />

      <View style={[styles.tabContainer, {backgroundColor: viewBg}]}>
        {renderTabButton('All')}
        {renderTabButton('Active')}
        {renderTabButton('Completed')}
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default RunningChallenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    width: '90%',
    height: 40,
    borderRadius: 80,
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabButton: {
    width: 102,
    height: 40,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  contentText: {
    fontSize: 14,
    marginTop: 20,
    fontFamily: fonts.UrbanistSemiBold,
  },
});
