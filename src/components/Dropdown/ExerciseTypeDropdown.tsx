import React from 'react';
import {Modal, View, TouchableOpacity, Text} from 'react-native';
import styles from './dropdownStyles';
import {Colors} from '../../utils/Colors';
import {useSelector} from 'react-redux';
import {AddIcon} from '../../assets/svgIcons';

interface ExerciseType {
  _id: string;
  name: string;
  rules?: string[];
}

interface ExerciseTypeDropdownProps {
  visible: boolean;
  exerciseTypes: ExerciseType[];
  onSelect: (exerciseType: ExerciseType) => void;
  onClose: () => void;
  onAddSkill?: () => void; // optional callback for adding a new skill
}

const ExerciseTypeDropdown: React.FC<ExerciseTypeDropdownProps> = ({
  visible,
  exerciseTypes,
  onSelect,
  onClose,
  onAddSkill,
}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const separatorColor = isDarkMode ? '#C9C9C9' : '#424242';
  const dynamicText = isDarkMode ? Colors.white : Colors.black;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={onClose}
        activeOpacity={1}>
        <View style={styles.popup}>
          {exerciseTypes.map((exerciseType, index) => (
            <View
              key={exerciseType._id}
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomColor: Colors.white,
                borderBottomWidth: 0.8,
              }}>
              <TouchableOpacity
                style={styles.popupItem}
                onPress={() => onSelect(exerciseType)}>
                <Text style={[styles.popupItemText, {color: dynamicText}]}>
                  {exerciseType.name}
                </Text>
              </TouchableOpacity>
              {index < exerciseTypes.length - 1 && (
                <View
                  style={{
                    height: 0.8,
                    backgroundColor: separatorColor,
                  }}
                />
              )}
              {}
            </View>
          ))}
          {!!onAddSkill && (
            <TouchableOpacity
              style={[
                styles.popupItem,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  width: '80%',
                  gap: 7.88,
                },
              ]}
              onPress={onAddSkill}
              activeOpacity={0.8}>
              <AddIcon />
              <Text style={[styles.popupItemText, {color: dynamicText}]}>
                Add Skill
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ExerciseTypeDropdown;
