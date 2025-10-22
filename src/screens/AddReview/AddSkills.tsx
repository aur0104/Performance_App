import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import BackHeader from '../../components/BackHeader';
import CustomButton from '../../components/CustomButton';
import {Colors} from '../../utils/Colors';
import InputField from '../../components/CustomInputField';
import fonts from '../../utils/Fonts';
import {RouteProp} from '@react-navigation/native';
import {addSportsCustomSkills, editCustomSkill} from '../../services/calls';
import utils from '../../utils/utils';

interface AddSkillProps {
  navigation?: any;
  route?: RouteProp<any, any>;
}

const AddSkill: React.FC<AddSkillProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [skill, setSkill] = useState('');
  const payload = route?.params?.payload;
  const forUpdate = route?.params?.forUpdate ?? false;
  const fromScreen = route?.params?.from || '';
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const subTextColor = isDarkMode ? Colors.gray : Colors.darkGray;
  const isButtonDisabled = skill.trim() === '';
  const [loader, setLoader] = useState(false);
  const saveSkill = async () => {
    try {
      setLoader(true);
      let result;
      if (forUpdate) {
        let body = {
          name: skill,
        };
        result = await editCustomSkill(payload?._id, body);
      } else {
        let body = {
          ...payload,
          name: skill,
        };
        result = await addSportsCustomSkills(body);
      }
      if (result.status === 201 || result.status === 200) {
        navigation.navigate('SuccessMembership', {
          from: fromScreen,
          forUpdate,
        });
      }
    } catch (error: any) {
      console.log('Error message ', error?.message);
      utils.showToast('error', error?.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (forUpdate) {
      setSkill(payload?.name ?? '');
    }
  }, [forUpdate]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t(forUpdate ? 'Edit Skill' : 'Add Skill')}
        showBackIcon
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, {color: textColor}]}>
          {t(forUpdate ? 'Edit Skill' : 'Add New Skill')}
        </Text>
        <Text style={[styles.subText, {color: subTextColor}]}>
          {t(
            forUpdate
              ? 'Please edit your skill'
              : 'Please add your new skill, This will help user to schedule teh classes',
          )}
        </Text>

        <InputField
          label={t('')}
          placeholder={t('Enter your skill')}
          value={skill}
          onChangeText={setSkill}
        />
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <CustomButton onPress={saveSkill} disable={isButtonDisabled || loader}>
          {t(forUpdate ? 'Update' : 'Save')}
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default AddSkill;

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
