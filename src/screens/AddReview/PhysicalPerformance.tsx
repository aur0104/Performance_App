import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import BackHeader from '../../components/BackHeader';
import CustomButton from '../../components/CustomButton';
import AnySvg from '../../components/AnySvg';
import styles from './styles/addReviewStyle';
import {Colors} from '../../utils/Colors';
import CategoryDropdown from '../../components/Dropdown/CategoryDropdown';
import ExerciseTypeDropdown from '../../components/Dropdown/ExerciseTypeDropdown';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import fonts from '../../utils/Fonts';
import {
  addPhysicalPerformance,
  getPhysicalPerformanceDropdownData,
  getCustomExercises,
} from '../../services/calls';
import utils from '../../utils/utils';

// TypeScript interfaces
interface Exercise {
  _id: string;
  name: string;
  custom?: boolean; // appended custom exercise indicator
}

interface SubCategory {
  _id: string;
  name: string;
  exercises: Exercise[];
}

interface ChallengeCategory {
  _id: string;
  name: string;
  image: string;
  subCategories: SubCategory[];
}

interface SetData {
  set: string;
  weight: string;
  reps: string;
  rpe: string;
  time: string;
  distance: string;
}

interface ExerciseGroup {
  id: string;
  selectedSubCategory: SubCategory | null;
  selectedExercise: Exercise | null;
  sets: SetData[];
}

interface PerformanceData {
  date: string;
  sets: Array<{
    type: string;
    exercise: string;
    variation: Array<{
      sets: number;
      weight: number;
      reps: number;
    }>;
  }>;
}

const FloatingInput = ({
  value,
  onChangeText,
  placeholder,
  backgroundColor,
  textColor,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  backgroundColor: string;
  textColor: string;
}) => {
  const isFocused = value.length > 0;

  return (
    <View style={[floatingStyles.container, {backgroundColor}]}>
      {isFocused && (
        <Text style={[floatingStyles.label, {color: textColor}]}>
          {placeholder}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={!isFocused ? placeholder : ''}
        placeholderTextColor={Colors.gray}
        style={[floatingStyles.input, {color: textColor}]}
        keyboardType="numeric"
      />
    </View>
  );
};

const floatingStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  input: {
    fontSize: 13,
    marginTop: 2,
    fontFamily: fonts.UrbanistMedium,
  },
  label: {
    fontSize: 10,
    position: 'absolute',
    top: 4,
    left: 8,
    textAlign: 'center',
    fontFamily: fonts.UrbanistRegular,
  },
});

export default function PhysicalPerformance({navigation}: {navigation: any}) {
  const {t} = useTranslation();
  const isDark = useSelector((state: any) => state.theme.switchDarkTheme);
  const user = useSelector((state: any) => state.user?.user); // assuming shape { user: { _id: string } }
  const route = useRoute<any>();
  const refreshToken = route?.params?.refreshToken;
  const preselectCategoryId = route?.params?.categoryId;
  const preselectSubCategoryId = route?.params?.subCategoryId;
  const newExerciseId = route?.params?.newExerciseId; // passed after adding a custom exercise
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sportVisible, setSportVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [exerciseVisible, setExerciseVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [exerciseGroups, setExerciseGroups] = useState<ExerciseGroup[]>([]);
  const [exerciseGroupDropdowns, setExerciseGroupDropdowns] = useState<{
    [key: string]: {categoryVisible: boolean; exerciseVisible: boolean};
  }>({});
  const [selectedButton, setSelectedButton] = useState<
    'set' | 'exercise' | null
  >(null);

  // API states
  const [categories, setCategories] = useState<ChallengeCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [savingPerformance, setSavingPerformance] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ChallengeCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] =
    useState<Exercise | null>(null);
  // Cache fetched custom exercise (category:subCategory) combos to prevent duplicate API calls
  const fetchedCustomCombosRef = useRef<Set<string>>(new Set());

  const mergeCustomExercises = (
    categoryId: string,
    subCategoryId: string,
    customList: any[],
  ) => {
    if (!customList?.length) return;
    setCategories(prev => {
      const cloned: ChallengeCategory[] = JSON.parse(JSON.stringify(prev));
      const catIdx = cloned.findIndex(c => c._id === categoryId);
      if (catIdx === -1) return prev;
      const subIdx = cloned[catIdx].subCategories.findIndex(
        s => s._id === subCategoryId,
      );
      if (subIdx === -1) return prev;
      const existing = cloned[catIdx].subCategories[subIdx].exercises || [];
      let changed = false;
      customList.forEach(cx => {
        if (!existing.some(e => e._id === cx._id)) {
          existing.push({
            _id: cx._id,
            name: cx.name,
            custom: true,
          });
          changed = true;
        }
      });
      if (!changed) return prev;
      cloned[catIdx].subCategories[subIdx].exercises = existing;
      // Re-sync selected subcategory reference if needed
      if (selectedSubCategory?._id === subCategoryId) {
        setSelectedSubCategory(cloned[catIdx].subCategories[subIdx]);
      }
      // Re-sync any exercise groups referencing this subcategory
      setExerciseGroups(groups =>
        groups.map(g =>
          g.selectedSubCategory?._id === subCategoryId
            ? {
                ...g,
                selectedSubCategory: cloned[catIdx].subCategories[subIdx],
              }
            : g,
        ),
      );
      return cloned;
    });
  };

  const fetchCustomExercisesFor = async (
    categoryId?: string | null,
    subCategoryId?: string | null,
  ) => {
    if (!categoryId || !subCategoryId || !user?.user?._id) return;
    const key = `${categoryId}:${subCategoryId}`;
    if (fetchedCustomCombosRef.current.has(key)) return;
    try {
      const res = await getCustomExercises({
        user: user.user._id,
        challengeCategory: categoryId,
        subCategory: subCategoryId,
      });
      fetchedCustomCombosRef.current.add(key);
      mergeCustomExercises(categoryId, subCategoryId, res?.data || []);
    } catch (e) {
      console.log('Failed to fetch custom exercises dynamically', e);
    }
  };

  const isStrengthOrPower =
    selectedCategory?.name === 'Strength' || selectedCategory?.name === 'Power';
  const isSpeedOrEndurance =
    selectedCategory?.name === 'Speed' ||
    selectedCategory?.name === 'Endurance';

  const [sets, setSets] = useState<SetData[]>([
    {set: '', weight: '', reps: '', rpe: '', time: '', distance: ''},
  ]);
  const dynamicText = isDark ? Colors.white : Colors.black;
  const dynamicSubText = isDark ? Colors.gray : '#424242';
  const dynamicBg = isDark ? Colors.darkInputBg : Colors.lightInputBg;
  const borderColor = isDark ? Colors.primaryColor : Colors.primaryColor;

  // Validation Helpers for set completeness
  const isPrimarySetRowComplete = (set: SetData) => {
    if (isStrengthOrPower) {
      // For Strength/Power a row is only complete if RPE is also provided
      return !!(set.set && set.weight && set.reps && set.rpe);
    }
    if (isSpeedOrEndurance) {
      // For Speed/Endurance require time, distance and RPE
      return !!(set.time && set.distance && set.rpe);
    }
    return false;
  };

  const isPrimarySetRowEmpty = (set: SetData) => {
    if (isStrengthOrPower) {
      // Empty only if all relevant fields including RPE are blank
      return !set.set && !set.weight && !set.reps && !set.rpe;
    }
    if (isSpeedOrEndurance) {
      // Empty only if time, distance and RPE all blank
      return !set.time && !set.distance && !set.rpe;
    }
    return true;
  };

  const groupRowComplete = (set: SetData) => isPrimarySetRowComplete(set);
  const groupRowEmpty = (set: SetData) => isPrimarySetRowEmpty(set);

  const setsHaveNoPartialRows = (rows: SetData[]) =>
    rows.every(r => isPrimarySetRowEmpty(r) || isPrimarySetRowComplete(r));

  const groupsHaveNoPartialRows = (groups: ExerciseGroup[]) =>
    groups.every(g => setsHaveNoPartialRows(g.sets));

  // At least one complete row anywhere (main or any group)
  const hasAtLeastOneCompleteRow = () => {
    const primary = sets.some(isPrimarySetRowComplete);
    const inGroups = exerciseGroups.some(g => g.sets.some(groupRowComplete));
    return primary || inGroups;
  };

  // New: every existing group (if any) must also have at least one complete row
  const everyGroupHasCompleteRow = () =>
    exerciseGroups.every(g => g.sets.some(groupRowComplete));

  const baseHierarchySatisfied =
    selectedCategory &&
    selectedDate &&
    (selectedCategory.subCategories.length === 0 ||
      (selectedSubCategory &&
        (selectedSubCategory.exercises.length === 0 || selectedExerciseType)));

  const isFormValid =
    !!baseHierarchySatisfied &&
    hasAtLeastOneCompleteRow() &&
    everyGroupHasCompleteRow() &&
    setsHaveNoPartialRows(sets) &&
    groupsHaveNoPartialRows(exerciseGroups);

  // Fetch categories on mount & whenever refreshToken changes
  useEffect(() => {
    fetchCategories();
  }, [refreshToken]);

  // Dynamic fetch when user selects / changes main subcategory
  useEffect(() => {
    if (selectedCategory && selectedSubCategory) {
      fetchCustomExercisesFor(selectedCategory._id, selectedSubCategory._id);
    }
  }, [selectedCategory?._id, selectedSubCategory?._id]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await getPhysicalPerformanceDropdownData();
      if (response?.data) {
        const data: ChallengeCategory[] = response.data;
        // We'll clone so we can append custom exercises later safely
        let workingCategories: ChallengeCategory[] = JSON.parse(
          JSON.stringify(data),
        );

        // Preselect category & subcategory first (before fetching custom exercises)
        let foundCategory: ChallengeCategory | undefined;
        let foundSub: SubCategory | undefined;
        if (preselectCategoryId) {
          foundCategory = workingCategories.find(
            c => c._id === preselectCategoryId,
          );
          if (foundCategory) {
            if (preselectSubCategoryId) {
              foundSub = foundCategory.subCategories.find(
                s => s._id === preselectSubCategoryId,
              );
            }
          }
        }

        // Pre-fetch custom exercises for preselected context
        if (preselectCategoryId && preselectSubCategoryId) {
          await fetchCustomExercisesFor(
            preselectCategoryId,
            preselectSubCategoryId,
          );
          // refresh references because merge may have updated structure
          foundCategory = workingCategories.find(
            c => c._id === preselectCategoryId,
          );
          if (foundCategory) {
            foundSub = foundCategory.subCategories.find(
              s => s._id === preselectSubCategoryId,
            );
          }
        }

        // Set categories state after potential merge
        setCategories(workingCategories);

        // Apply selection state (with merged custom exercises included)
        if (foundCategory) {
          setSelectedCategory(foundCategory);
          if (foundSub) {
            setSelectedSubCategory(foundSub);
            // If a newExerciseId was supplied, attempt to auto-select
            if (newExerciseId) {
              const match = foundSub.exercises.find(
                e => e._id === newExerciseId,
              );
              if (match) {
                setSelectedExerciseType(match);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      Alert.alert('Error', 'Failed to load categories. Please try again.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  // Helper functions for exercise group dropdowns
  const updateExerciseGroupDropdown = (
    groupId: string,
    type: 'categoryVisible' | 'exerciseVisible',
    value: boolean,
  ) => {
    setExerciseGroupDropdowns(prev => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        [type]: value,
      },
    }));
  };

  // Validation function to check for duplicate subcategory and exercise combinations
  const isDuplicateCombination = (
    subCategoryId: string | null,
    exerciseId: string | null,
    excludeGroupIndex?: number,
  ): boolean => {
    // Check main form combination
    if (
      selectedSubCategory?._id === subCategoryId &&
      selectedExerciseType?._id === exerciseId &&
      subCategoryId &&
      exerciseId
    ) {
      return true;
    }

    // Check exercise groups combinations
    return exerciseGroups.some((group, index) => {
      if (excludeGroupIndex !== undefined && index === excludeGroupIndex) {
        return false; // Skip the current group being updated
      }
      return (
        group.selectedSubCategory?._id === subCategoryId &&
        group.selectedExercise?._id === exerciseId &&
        subCategoryId &&
        exerciseId
      );
    });
  };

  const updateExerciseGroupSubCategory = (
    groupIndex: number,
    subCategory: SubCategory | null,
  ) => {
    // Check for duplicate combination when updating subcategory
    const currentExercise = exerciseGroups[groupIndex]?.selectedExercise;
    if (
      subCategory &&
      currentExercise &&
      isDuplicateCombination(subCategory._id, currentExercise._id, groupIndex)
    ) {
      utils.showToast(
        'error',
        'This subcategory and exercise combination is already selected!',
      );
      return;
    }

    setExerciseGroups(prev => {
      const updated = [...prev];
      updated[groupIndex].selectedSubCategory = subCategory;
      updated[groupIndex].selectedExercise = null; // Reset exercise when subcategory changes
      return updated;
    });
    if (selectedCategory && subCategory) {
      fetchCustomExercisesFor(selectedCategory._id, subCategory._id);
    }
  };

  const updateExerciseGroupExercise = (
    groupIndex: number,
    exercise: Exercise | null,
  ) => {
    // Check for duplicate combination when updating exercise
    const currentSubCategory = exerciseGroups[groupIndex]?.selectedSubCategory;
    if (
      currentSubCategory &&
      exercise &&
      isDuplicateCombination(currentSubCategory._id, exercise._id, groupIndex)
    ) {
      utils.showToast(
        'error',
        'This subcategory and exercise combination is already selected!',
      );
      return;
    }

    setExerciseGroups(prev => {
      const updated = [...prev];
      updated[groupIndex].selectedExercise = exercise;
      return updated;
    });
  };

  const addSetRow = () => {
    setSets(prev => [
      ...prev,
      {set: '', weight: '', reps: '', rpe: '', time: '', distance: ''},
    ]);
  };
  const handleSavePerformance = async () => {
    setSavingPerformance(true);
    try {
      // Transform the data to match API format
      const allSets = [];
      // Add main sets if they have data
      const mainSetVariations = sets
        .filter(
          set =>
            set.set && (set.weight || set.reps || set.time || set.distance),
        )
        .map(set => ({
          sets: parseInt(set.set) || 1,
          weight: parseFloat(set.weight) || 0,
          reps: parseInt(set.reps) || 0,
        }));

      if (mainSetVariations.length > 0) {
        allSets.push({
          category: selectedCategory ? selectedCategory._id : '',
          subCategory: selectedSubCategory?._id || '',
          exercise: selectedExerciseType?._id || '',
          variation: mainSetVariations,
        });
      }
      // Add exercise groups if any
      exerciseGroups.forEach(group => {
        const groupVariations = group.sets
          .filter(
            set =>
              set.set && (set.weight || set.reps || set.time || set.distance),
          )
          .map(set => ({
            sets: parseInt(set.set) || 1,
            weight: parseFloat(set.weight) || 0,
            reps: parseInt(set.reps) || 0,
          }));

        if (groupVariations.length > 0) {
          allSets.push({
            category: selectedCategory?._id || '',
            subCategory: group.selectedSubCategory?._id || null,
            exercise: group.selectedExercise?._id || null,
            variation: groupVariations,
          });
        }
      });

      const performanceData = {
        date: selectedDate ? selectedDate.toISOString() : '',
        sets: allSets,
      };

      const response = await addPhysicalPerformance(performanceData);
      if (response?.status === 200 || response?.status === 201) {
        navigation.replace('PerformanceSaved');
      }
    } catch (error: any) {
      utils.errorMessage(error);
    } finally {
      setSavingPerformance(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.darkBackground
            : Colors.lightBackground,
        },
      ]}>
      <BackHeader title={t('Add Performance')} showBackIcon />
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.subtitle, {color: dynamicText}]}>
          {t('Pick a Focus Area')}
        </Text>
        <Text style={[styles.helpText, {color: dynamicSubText}]}>
          {t('Select Strength, Power, Speed Or Endurance to log your session.')}
        </Text>
        {loadingCategories ? (
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: dynamicBg,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <ActivityIndicator size="small" color={Colors.primaryColor} />
            <Text
              style={[
                styles.dropdownText,
                {color: dynamicSubText, marginLeft: 10},
              ]}>
              Loading categories...
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.dropdown, {backgroundColor: dynamicBg}]}
            onPress={() => setSportVisible(true)}>
            <Text style={[styles.dropdownText, {color: dynamicSubText}]}>
              {selectedCategory?.name || t('Select Performance Type')}
            </Text>
            <AnySvg name="dropdown" size={16} />
          </TouchableOpacity>
        )}

        {selectedCategory && selectedCategory.subCategories.length > 0 && (
          <TouchableOpacity
            style={[styles.dropdown, {backgroundColor: dynamicBg}]}
            onPress={() => setCategoryVisible(true)}>
            <Text style={[styles.dropdownText, {color: dynamicSubText}]}>
              {selectedSubCategory?.name || t('Select Category')}
            </Text>
            <AnySvg name="dropdown" size={16} />
          </TouchableOpacity>
        )}

        {selectedCategory &&
          selectedSubCategory &&
          selectedSubCategory.exercises.length > 0 && (
            <TouchableOpacity
              style={[styles.dropdown, {backgroundColor: dynamicBg}]}
              onPress={() => setExerciseVisible(true)}>
              <Text style={[styles.dropdownText, {color: dynamicSubText}]}>
                {selectedExerciseType?.name || t('Select Exercise')}
              </Text>
              <AnySvg name="dropdown" size={16} />
            </TouchableOpacity>
          )}

        {selectedCategory &&
          (selectedCategory.subCategories.length != 0 ||
            (selectedSubCategory &&
              (selectedSubCategory.exercises.length != 0 ||
                selectedExerciseType))) && (
            <>
              <Text style={[styles.subtitle, {color: dynamicText}]}>
                {t('Log Your Session')}
              </Text>
              <Text style={[styles.helpText, {color: dynamicSubText}]}>
                {t('Enter your performance details below.')}
              </Text>
            </>
          )}

        {selectedCategory &&
          (selectedCategory.subCategories.length === 0 ||
            (selectedSubCategory &&
              (selectedSubCategory.exercises.length === 0 ||
                selectedExerciseType))) &&
          sets.map((item, index) => (
            <View key={index} style={[styles.fieldRow, {marginBottom: 10}]}>
              {isStrengthOrPower && (
                <>
                  <FloatingInput
                    value={item.set}
                    onChangeText={text => {
                      const updated = [...sets];
                      updated[index].set = text;
                      setSets(updated);
                    }}
                    placeholder="Set"
                    backgroundColor={dynamicBg}
                    textColor={dynamicText}
                  />
                  <FloatingInput
                    value={item.weight}
                    onChangeText={text => {
                      const updated = [...sets];
                      updated[index].weight = text;
                      setSets(updated);
                    }}
                    placeholder="Weight (kg/lb)"
                    backgroundColor={dynamicBg}
                    textColor={dynamicText}
                  />
                  <FloatingInput
                    value={item.reps}
                    onChangeText={text => {
                      const updated = [...sets];
                      updated[index].reps = text;
                      setSets(updated);
                    }}
                    placeholder="Reps"
                    backgroundColor={dynamicBg}
                    textColor={dynamicText}
                  />
                </>
              )}

              {isSpeedOrEndurance && (
                <>
                  <FloatingInput
                    value={item.time}
                    onChangeText={text => {
                      const updated = [...sets];
                      updated[index].time = text;
                      setSets(updated);
                    }}
                    placeholder="Time (s/min)"
                    backgroundColor={dynamicBg}
                    textColor={dynamicText}
                  />
                  <FloatingInput
                    value={item.distance}
                    onChangeText={text => {
                      const updated = [...sets];
                      updated[index].distance = text;
                      setSets(updated);
                    }}
                    placeholder="Distance (m/km)"
                    backgroundColor={dynamicBg}
                    textColor={dynamicText}
                  />
                </>
              )}

              <FloatingInput
                value={item.rpe}
                onChangeText={text => {
                  const updated = [...sets];
                  updated[index].rpe = text;
                  setSets(updated);
                }}
                placeholder="RPE"
                backgroundColor={dynamicBg}
                textColor={dynamicText}
              />
            </View>
          ))}

        {selectedCategory &&
          (selectedCategory.subCategories.length === 0 ||
            (selectedSubCategory &&
              (selectedSubCategory.exercises.length === 0 ||
                selectedExerciseType))) && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedButton('set');
                  addSetRow();
                }}
                style={[
                  styles.toggleButton,
                  {
                    borderColor,
                    backgroundColor:
                      selectedButton === 'set'
                        ? Colors.primaryColor
                        : 'transparent',
                  },
                ]}>
                <Text
                  style={{
                    color:
                      selectedButton === 'set' ? Colors.white : dynamicText,
                  }}>
                  {t('+ Add Set')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedButton('exercise');
                  setExerciseGroups(prev => [
                    ...prev,
                    {
                      id: `exercise_${Date.now()}`,
                      selectedSubCategory: null,
                      selectedExercise: null,
                      sets: [
                        {
                          set: '',
                          weight: '',
                          reps: '',
                          rpe: '',
                          time: '',
                          distance: '',
                        },
                      ],
                    },
                  ]);
                }}
                style={[
                  styles.toggleButton,
                  {
                    borderColor,
                    backgroundColor:
                      selectedButton === 'exercise'
                        ? Colors.primaryColor
                        : 'transparent',
                  },
                ]}>
                <Text
                  style={{
                    color:
                      selectedButton === 'exercise'
                        ? Colors.white
                        : dynamicText,
                  }}>
                  {t('+ Add Exercise')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

        {selectedCategory &&
          exerciseGroups.length > 0 &&
          // Exercise groups should remain visible regardless of whether the main flow has finalized exercise selection.
          exerciseGroups.map((group, groupIndex) => (
            <View key={group.id}>
              {/* Show subcategory dropdown if category has subcategories */}
              {selectedCategory &&
                selectedCategory.subCategories.length > 0 && (
                  <TouchableOpacity
                    style={[styles.dropdown, {backgroundColor: dynamicBg}]}
                    onPress={() =>
                      updateExerciseGroupDropdown(
                        group.id,
                        'categoryVisible',
                        true,
                      )
                    }>
                    <Text
                      style={[styles.dropdownText, {color: dynamicSubText}]}>
                      {group.selectedSubCategory?.name || t('Select Category')}
                    </Text>
                    <AnySvg name="dropdown" size={16} />
                  </TouchableOpacity>
                )}

              {/* Show exercise dropdown if subcategory has exercises */}
              {group.selectedSubCategory &&
                group.selectedSubCategory.exercises.length > 0 && (
                  <TouchableOpacity
                    style={[styles.dropdown, {backgroundColor: dynamicBg}]}
                    onPress={() =>
                      updateExerciseGroupDropdown(
                        group.id,
                        'exerciseVisible',
                        true,
                      )
                    }>
                    <Text
                      style={[styles.dropdownText, {color: dynamicSubText}]}>
                      {group.selectedExercise?.name || t('Select Exercise')}
                    </Text>
                    <AnySvg name="dropdown" size={16} />
                  </TouchableOpacity>
                )}

              <Text style={[styles.subtitle, {color: dynamicText}]}>
                {t('Log Your Session')}
              </Text>
              <Text style={[styles.helpText, {color: dynamicSubText}]}>
                {t('Enter your performance details below.')}
              </Text>

              {group.sets.map((item, index) => (
                <View key={index} style={[styles.fieldRow, {marginBottom: 10}]}>
                  {isStrengthOrPower && (
                    <>
                      <FloatingInput
                        value={item.set}
                        onChangeText={text => {
                          const updated = [...exerciseGroups];
                          updated[groupIndex].sets[index].set = text;
                          setExerciseGroups(updated);
                        }}
                        placeholder="Set"
                        backgroundColor={dynamicBg}
                        textColor={dynamicText}
                      />
                      <FloatingInput
                        value={item.weight}
                        onChangeText={text => {
                          const updated = [...exerciseGroups];
                          updated[groupIndex].sets[index].weight = text;
                          setExerciseGroups(updated);
                        }}
                        placeholder="Weight (kg/lb)"
                        backgroundColor={dynamicBg}
                        textColor={dynamicText}
                      />
                      <FloatingInput
                        value={item.reps}
                        onChangeText={text => {
                          const updated = [...exerciseGroups];
                          updated[groupIndex].sets[index].reps = text;
                          setExerciseGroups(updated);
                        }}
                        placeholder="Reps"
                        backgroundColor={dynamicBg}
                        textColor={dynamicText}
                      />
                    </>
                  )}
                  {isSpeedOrEndurance && (
                    <>
                      <FloatingInput
                        value={item.time}
                        onChangeText={text => {
                          const updated = [...exerciseGroups];
                          updated[groupIndex].sets[index].time = text;
                          setExerciseGroups(updated);
                        }}
                        placeholder="Time (s/min)"
                        backgroundColor={dynamicBg}
                        textColor={dynamicText}
                      />
                      <FloatingInput
                        value={item.distance}
                        onChangeText={text => {
                          const updated = [...exerciseGroups];
                          updated[groupIndex].sets[index].distance = text;
                          setExerciseGroups(updated);
                        }}
                        placeholder="Distance (m/km)"
                        backgroundColor={dynamicBg}
                        textColor={dynamicText}
                      />
                    </>
                  )}

                  <FloatingInput
                    value={item.rpe}
                    onChangeText={text => {
                      const updated = [...exerciseGroups];
                      updated[groupIndex].sets[index].rpe = text;
                      setExerciseGroups(updated);
                    }}
                    placeholder="RPE"
                    backgroundColor={dynamicBg}
                    textColor={dynamicText}
                  />
                </View>
              ))}

              <View style={styles.actionRow}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedButton('set');
                    addSetRow();
                  }}
                  style={[
                    styles.toggleButton,
                    {
                      borderColor,
                      backgroundColor:
                        selectedButton === 'set'
                          ? Colors.primaryColor
                          : 'transparent',
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        selectedButton === 'set' ? Colors.white : dynamicText,
                    }}>
                    {t('+ Add Set')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedButton('exercise');
                  }}
                  style={[
                    styles.toggleButton,
                    {
                      borderColor,
                      backgroundColor:
                        selectedButton === 'exercise'
                          ? Colors.primaryColor
                          : 'transparent',
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        selectedButton === 'exercise'
                          ? Colors.white
                          : dynamicText,
                    }}>
                    {t('+ Add Exercise')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        <Text style={[styles.subtitle, {color: dynamicText}]}>
          {t('Select Date')}
        </Text>
        <Text style={[styles.helpText, {color: dynamicSubText}]}>
          {t('Please select your date to calculate your performance.')}
        </Text>

        <TouchableOpacity
          style={[styles.dropdown, {backgroundColor: dynamicBg}]}
          onPress={() => setDatePickerVisibility(true)}>
          <Text style={[styles.dropdownText, {color: dynamicSubText}]}>
            {selectedDate
              ? moment(selectedDate).format('DD MMM YYYY')
              : t('Select Date')}
          </Text>
          <AnySvg name="dropdown" size={16} />
        </TouchableOpacity>

        <View style={styles.bottomButtonWrapper}>
          <CustomButton
            disable={!isFormValid || savingPerformance}
            onPress={handleSavePerformance}>
            {savingPerformance ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ActivityIndicator
                  size="small"
                  color={Colors.white}
                  style={{marginRight: 8}}
                />
                <Text style={{color: Colors.white}}>{t('Saving...')}</Text>
              </View>
            ) : (
              t('Save')
            )}
          </CustomButton>
        </View>

        <CategoryDropdown
          visible={sportVisible}
          categories={categories.map(cat => ({
            _id: cat._id,
            name: cat.name,
            sport: '',
            createdAt: '',
            updatedAt: '',
            isCustom: false,
            skills: [],
            user: '',
            image: '',
            __v: 0,
            sortOrder: 0,
          }))}
          onSelect={(category: any) => {
            const originalCategory = categories.find(
              cat => cat._id === category._id,
            );
            setSelectedCategory(originalCategory || null);
            setSelectedSubCategory(null); // Reset subcategory when category changes
            setSelectedExerciseType(null); // Reset exercise type when category changes
            setSportVisible(false);
            setExerciseGroups([]);
          }}
          onClose={() => setSportVisible(false)}
          onToggle={() => {}}
          sizeZero
        />
        <CategoryDropdown
          visible={categoryVisible}
          categories={
            selectedCategory?.subCategories?.map(subCategory => ({
              _id: subCategory._id,
              name: subCategory.name,
              sport: selectedCategory._id,
              createdAt: '',
              updatedAt: '',
              isCustom: false,
              skills: [],
              user: '',
              image: '',
              __v: 0,
              sortOrder: 0,
            })) || []
          }
          onSelect={(category: any) => {
            const originalSubCategory = selectedCategory?.subCategories?.find(
              sub => sub._id === category._id,
            );

            // Check for duplicate combination when updating main form subcategory
            if (
              originalSubCategory &&
              selectedExerciseType &&
              isDuplicateCombination(
                originalSubCategory._id,
                selectedExerciseType._id,
              )
            ) {
              utils.showToast(
                'error',
                'This subcategory and exercise combination is already selected!',
              );
              return;
            }

            setSelectedSubCategory(originalSubCategory || null);
            setSelectedExerciseType(null); // Reset exercise type when subcategory changes
            setCategoryVisible(false);
          }}
          onClose={() => setCategoryVisible(false)}
          onToggle={() => {}}
          sizeZero
        />
        <ExerciseTypeDropdown
          visible={exerciseVisible}
          exerciseTypes={selectedSubCategory?.exercises || []}
          onSelect={(exerciseType: Exercise) => {
            // Check for duplicate combination when updating main form exercise
            if (
              selectedSubCategory &&
              exerciseType &&
              isDuplicateCombination(selectedSubCategory._id, exerciseType._id)
            ) {
              utils.showToast(
                'error',
                'This subcategory and exercise combination is already selected!',
              );
              return;
            }
            setSelectedExerciseType(exerciseType);
            setExerciseVisible(false);
          }}
          onClose={() => setExerciseVisible(false)}
          onAddSkill={() => {
            setExerciseVisible(false);
            // Navigate to AddExercise screen with current category & subcategory context
            if (selectedCategory) {
              navigation.navigate('AddExercise', {
                challengeCategory: selectedCategory._id,
                subCategory: selectedSubCategory?._id || null,
                from: 'PhysicalPerformance',
              });
            }
          }}
        />

        {/* Exercise Group Dropdowns */}
        {exerciseGroups.map((group, groupIndex) => (
          <React.Fragment key={`dropdowns_${group.id}`}>
            <CategoryDropdown
              visible={
                exerciseGroupDropdowns[group.id]?.categoryVisible || false
              }
              categories={
                selectedCategory?.subCategories?.map(subCategory => ({
                  _id: subCategory._id,
                  name: subCategory.name,
                  sport: selectedCategory._id,
                  createdAt: '',
                  updatedAt: '',
                  isCustom: false,
                  skills: [],
                  user: '',
                  image: '',
                  __v: 0,
                  sortOrder: 0,
                })) || []
              }
              onSelect={(category: any) => {
                const originalSubCategory =
                  selectedCategory?.subCategories?.find(
                    sub => sub._id === category._id,
                  );
                updateExerciseGroupSubCategory(
                  groupIndex,
                  originalSubCategory || null,
                );
                updateExerciseGroupDropdown(group.id, 'categoryVisible', false);
              }}
              onClose={() =>
                updateExerciseGroupDropdown(group.id, 'categoryVisible', false)
              }
              onToggle={() => {}}
              sizeZero
            />
            <ExerciseTypeDropdown
              visible={
                exerciseGroupDropdowns[group.id]?.exerciseVisible || false
              }
              exerciseTypes={group.selectedSubCategory?.exercises || []}
              onSelect={(exerciseType: Exercise) => {
                updateExerciseGroupExercise(groupIndex, exerciseType);
                updateExerciseGroupDropdown(group.id, 'exerciseVisible', false);
              }}
              onClose={() =>
                updateExerciseGroupDropdown(group.id, 'exerciseVisible', false)
              }
            />
          </React.Fragment>
        ))}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
