import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import AllRunningChallenges from './ChallengesComponent/AllChallenges';
import ActiveRunningChallenges from './ChallengesComponent/ActiveChallenges';
import CompletedRunningChallenges from './ChallengesComponent/CompletedChallenges';
import {useRoute} from '@react-navigation/native';
import {Colors} from '../../utils/Colors';
import BackHeader from '../../components/BackHeader';
import fonts from '../../utils/Fonts';

interface RunningChallengesProps {
  navigation?: any;
}

const PowerChallenges: React.FC<RunningChallengesProps> = ({navigation}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const viewBg = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const primaryColor = Colors.primaryColor;

  const route = useRoute();
  const dataKey = route.params?.dataKey ?? '';
  const initialTab = route.params?.selectedTab ?? 'All';

  const [selectedTab, setSelectedTab] = useState<
    'All' | 'Active' | 'Completed'
  >(initialTab);

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

  const renderContent = () => {
    switch (selectedTab) {
      case 'All':
        return <AllRunningChallenges dataMapKey={dataKey} />;
      case 'Active':
        return <ActiveRunningChallenges />;
      case 'Completed':
        return <CompletedRunningChallenges />;
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

export default PowerChallenges;

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
