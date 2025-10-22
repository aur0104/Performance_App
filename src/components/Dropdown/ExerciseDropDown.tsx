import React, {useState} from 'react';
import {Modal, View, TouchableOpacity, Text} from 'react-native';
import styles from './dropdownStyles';
import AnySvg from '../AnySvg';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import DeletePopupModal from '../DeleteModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../utils/routes';

const exerciseOptions = [
  'Back Squat',
  'Romanian Deadlift',
  'Bench Press',
  'Overhead Press',
  'Barbell Hip Thrust',
  'Barbell Row',
];

const ExerciseDropdown = ({visible, onSelect, onClose}: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isDark = useSelector((state: any) => state.theme.switchDarkTheme);
  const [showDelete, setShowDelete] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);

  const dynamicBg = isDark ? '#616161' : Colors.white;
  const dynamicText = isDark ? Colors.white : Colors.black;
  const separatorColor = isDark ? '#424242' : '#E0E0E0';

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <View style={[styles.popup, {backgroundColor: dynamicBg}]}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', marginBottom: -10}}
            onPress={() => setOptionModalVisible(true)}>
            <AnySvg name="dotsIcon" size={22} />
          </TouchableOpacity>

          {exerciseOptions.map((exercise, index) => (
            <View key={index} style={styles.popupItemRow}>
              <TouchableOpacity
                key={index}
                style={styles.popupItem}
                onPress={() => onSelect(exercise)}>
                <Text style={[styles.popupItemText, {color: dynamicText}]}>
                  {exercise}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addSkillRow}
            onPress={() => {
              onClose();
              setTimeout(() => {
                navigation.navigate('AddSkills');
              }, 50);
            }}>
            <AnySvg name="add" size={14} />
            <Text style={[styles.addSkillText, {color: dynamicText}]}>
              Add Skill
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal transparent visible={optionModalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setOptionModalVisible(false)}
          activeOpacity={1}>
          <View style={[styles.optionsModal, {backgroundColor: dynamicBg}]}>
            <TouchableOpacity
              onPress={() => {
                setOptionModalVisible(false);
              }}>
              <Text style={[styles.optionText, {color: dynamicText}]}>
                Edit
              </Text>
            </TouchableOpacity>

            <View
              style={[styles.separator, {backgroundColor: separatorColor}]}
            />

            <TouchableOpacity
              onPress={() => {
                setOptionModalVisible(false);
                setShowDelete(true);
              }}>
              <Text style={[styles.optionText, {color: Colors.red}]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <DeletePopupModal
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        onDelete={() => {
          setShowDelete(false);
        }}
      />
    </Modal>
  );
};

export default ExerciseDropdown;
