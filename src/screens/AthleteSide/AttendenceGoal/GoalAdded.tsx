import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {hp, rfs, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';

interface NavigationProps {
  navigation?: any;
}

const GoalAdded: React.FC<NavigationProps> = ({navigation}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);
  const route = useRoute();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.darkBackground : Colors.white},
      ]}>
      <Image source={IMAGES.Sucess} style={styles.icon} resizeMode="contain" />

      <Text
        style={[
          styles.title,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        {route?.params?.selectedGoal == 'Event'
          ? t('Event Added Successfully')
          : t('Goal Added Successfully')}
      </Text>

      {route?.params?.selectedGoal == 'Event' ? (
        <Text
          style={[
            styles.description,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          Thank you for choosing{' '}
          <Text style={styles.boldText}>Prymo Sports</Text>.{'\n'} Event is
          added successfully.
        </Text>
      ) : (
        <Text
          style={[
            styles.description,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          Thank you for choosing{' '}
          <Text style={styles.boldText}>Prymo Sports</Text>.{'\n'} Your goal for
          the month of {moment(route?.params?.selectedMonth).format('MMMM')} is
          added successfully.
        </Text>
      )}

      <CustomButton
        onPress={() => {
          navigation.pop(2);
        }}
        containerStyle={{marginTop: '35%'}}>
        {t('Continue')}
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(8),
  },
  icon: {
    width: wp(50),
    height: wp(50),
    marginBottom: hp(1),
  },
  title: {
    fontSize: rfs(30),
    fontFamily: fonts.UrbanistBold,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  description: {
    fontSize: rfs(18),
    fontFamily: fonts.UrbanistRegular,
    textAlign: 'center',
    marginBottom: hp(4),
  },
  boldText: {
    fontFamily: fonts.UrbanistBold,
  },
});

export default GoalAdded;
