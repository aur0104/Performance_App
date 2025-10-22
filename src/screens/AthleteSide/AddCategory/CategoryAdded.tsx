import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import CustomButton from '../../../components/CustomButton';
import {hp, rfs, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

interface NavigationProps {
  navigation?: any;
}

const CategoryAdded: React.FC<NavigationProps> = ({navigation}) => {
  const {t} = useTranslation();

  const route = useRoute<RouteProp<any, any>>();
  const fromScreen = route?.params?.from || '';
  const forUpdate = route?.params?.forUdpate ?? false;
  const isDarkMode = useSelector((state: any) => state.theme.switchDarkTheme);

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
        {t(forUpdate ? 'Category Updated' : 'Category Added')}
      </Text>

      <Text
        style={[
          styles.description,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        {forUpdate
          ? ' Your category is updated successfully'
          : ' Your category is added successfully. You can edit, remove and manage your category.'}
      </Text>

      <CustomButton
        onPress={() => {
          navigation.pop(2);
        }}>
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
    fontSize: rfs(25),
    fontFamily: fonts.UrbanistBold,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  description: {
    fontSize: rfs(15),
    fontFamily: fonts.UrbanistRegular,
    textAlign: 'center',
    marginBottom: hp(4),
  },
  boldText: {
    fontFamily: fonts.UrbanistBold,
  },
});

export default CategoryAdded;
