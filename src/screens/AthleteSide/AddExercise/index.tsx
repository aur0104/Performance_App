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
import utils from '../../../utils/utils';
import {addCustomExercise, updateCustomExercise} from '../../../services/calls';

interface AddExerciseProps {
  navigation?: any;
  route?: RouteProp<any, any>;
}

const AddExercise: React.FC<AddExerciseProps> = ({navigation, route}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const [exerciseName, setExerciseName] = useState('');
  const [entityType, setEntityType] = useState(''); // default based on provided body
  const [description, setDescription] = useState('');
  const [coachTip, setCoachTip] = useState('');
  const fromScreen = route?.params?.from || '';
  const payloadParams = route?.params?.payload; // expected: { categoryId?: string, ... }
  const forUpdate = route?.params?.forUpdate ?? false;
  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const subTextColor = isDarkMode ? Colors.gray : Colors.darkGray;
  const [loader, setLoader] = useState(false);

  const isButtonDisabled = exerciseName.trim() === '';

  const saveExerciseToBackend = async () => {
    try {
      setLoader(true);
      const challengeCategory = route?.params?.challengeCategory;
      const subCategory = route?.params?.subCategory;
      if (!challengeCategory || !subCategory) {
        utils.showToast('error', 'Missing category context. Please retry.');
        return;
      }

      const baseBody: any = {
        name: exerciseName.trim(),
        challengeCategory,
        subCategory,
      };

      if (entityType.trim()) baseBody.entityType = entityType.trim();
      if (description.trim()) baseBody.description = description.trim();
      if (coachTip.trim()) baseBody.coachTip = coachTip.trim();

      const response = forUpdate
        ? await updateCustomExercise(payloadParams?._id, baseBody)
        : await addCustomExercise(baseBody);

      if (response && (response.status === 200 || response.status === 201)) {
        utils.showToast(
          'success',
          forUpdate
            ? 'Exercise updated successfully'
            : 'Exercise added successfully',
        );
        const created = response.data;
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'PhysicalPerformance',
              params: {
                refreshToken: Date.now(),
                categoryId: challengeCategory,
                subCategoryId: subCategory,
                // Optionally could pass new exercise id if needed
                newExerciseId: created?._id,
              },
            },
          ],
        });
      }
    } catch (error: any) {
      utils.showToast('error', error?.message ?? 'Something went wrong');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (forUpdate) {
      setExerciseName(payloadParams?.name ?? '');
      setEntityType(payloadParams?.entityType ?? 'testing');
      setDescription(payloadParams?.description ?? '');
      setCoachTip(payloadParams?.coachTip ?? '');
    }
  }, [forUpdate]);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <BackHeader
        title={t(forUpdate ? 'Edit Exercise' : 'Add Exercise')}
        showBackIcon
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, {color: textColor}]}>
          {t(forUpdate ? 'Edit Exercise' : 'Add New Exercise')}
        </Text>
        <Text style={[styles.subText, {color: subTextColor}]}>
          {t(
            forUpdate
              ? 'Please update the exercise name so users can track it properly'
              : 'Please add your new exercise, this will help users log performance accurately',
          )}
        </Text>

        <InputField
          label={t('')}
          placeholder={t('Enter Exercise Name')}
          value={exerciseName}
          onChangeText={setExerciseName}
        />
        <InputField
          label={t('')}
          placeholder={t('Entity Type (e.g. testing)')}
          value={entityType}
          onChangeText={setEntityType}
        />
        <InputField
          label={t('')}
          placeholder={t('Description')}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />
        <InputField
          label={t('')}
          placeholder={t('Coach Tip')}
          value={coachTip}
          onChangeText={setCoachTip}
          multiline
          numberOfLines={5}
        />
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={saveExerciseToBackend}
          disable={isButtonDisabled || loader}>
          {t('Save')}
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default AddExercise;

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
