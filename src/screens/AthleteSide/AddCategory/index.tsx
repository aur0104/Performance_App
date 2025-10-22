import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../../utils/Colors';
import BackHeader from '../../../components/BackHeader';
import InputField from '../../../components/CustomInputField';
import CustomButton from '../../../components/CustomButton';
import fonts from '../../../utils/Fonts';
import {addSportsCategory, updateCustomCategory} from '../../../services/calls';
import utils from '../../../utils/utils';

interface AddCategoryProps {
  navigation?: any;
  route?: RouteProp<any, any>;
}
const AddCategory: React.FC<AddCategoryProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [skill, setSkill] = useState('');
  const fromScreen = route?.params?.from || '';
  const payloadParams = route?.params?.payload;
  const forUdpate = route?.params?.forUdpate ?? false;
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const subTextColor = isDarkMode ? Colors.gray : Colors.darkGray;

  const isButtonDisabled = skill.trim() === '';
  const [loader, setLoader] = useState(false);
  const addCategoryToBackEnd = async () => {
    try {
      let response;
      setLoader(true);
      if (forUdpate) {
        let payload = {
          name: skill,
        };
        response = await updateCustomCategory(
          payloadParams?._id as string,
          payload,
        );
      } else {
        let payload = {
          ...payloadParams,
          name: skill,
        };
        response = await addSportsCategory(payload);
      }
      if (response && (response.status === 200 || response.status === 201)) {
        navigation.navigate('CategoryAdded', {
          from: fromScreen,
          forUdpate: forUdpate ?? false,
        });
      }
    } catch (error: any) {
      utils.showToast('error', error?.message ?? 'Something went wrong');
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (forUdpate) {
      setSkill(payloadParams?.name ?? '');
    }
  }, [forUdpate]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t(forUdpate ? 'Edit Category' : 'Add Category')}
        showBackIcon
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, {color: textColor}]}>
          {t(forUdpate ? 'Edit Category' : 'Add New Category')}
        </Text>
        <Text style={[styles.subText, {color: subTextColor}]}>
          {t(
            forUdpate
              ? 'Please update your category, This will help user to schedule teh classes'
              : 'Please add your new category, This will help user to schedule teh classes',
          )}
        </Text>

        <InputField
          label={t('')}
          placeholder={t('Enter your Category')}
          value={skill}
          onChangeText={setSkill}
        />
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={
            () => addCategoryToBackEnd()
            // navigation.navigate('CategoryAdded', {from: fromScreen})
          }
          disable={isButtonDisabled || loader}>
          {t('Save')}
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.UrbanistBold,
  },
  subText: {
    fontSize: 18,
    marginVertical: 10,
    lineHeight: 20,
    fontFamily: fonts.UrbanistMedium,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
});
