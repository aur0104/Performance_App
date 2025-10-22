import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './dropdownStyles';
import AnySvg from '../AnySvg';
import {Colors} from '../../utils/Colors';

interface GymMemberUser {
  _id: string;
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin' | string;
}

export interface GymMember {
  _id: string;
  user: GymMemberUser;
}

interface Props {
  options: GymMember[];
  selected: GymMember | null;
  onSelect: (value: GymMember) => void;
  visible: boolean;
  toggle: () => void;
  onClose?: () => void;
  label?: string;
  style?: any;
}

const GymMemberDropdown: React.FC<Props> = ({
  options,
  selected,
  onSelect,
  visible,
  toggle,
  onClose,
  style,
  label = 'Select Member',
}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : Colors.blackLight;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  return (
    <>
      {/* Dropdown trigger */}
      <TouchableOpacity
        style={[
          styles.dropdown,
          {marginHorizontal: 20, backgroundColor},
          style,
        ]}
        onPress={toggle}>
        <Text style={[styles.dropdownText, selected && {color: textColor}]}>
          {selected ? selected.user.name : label}
        </Text>

        {/* Down Arrow */}
        <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
      </TouchableOpacity>

      {/* Modal list */}
      {visible && (
        <Modal transparent visible={visible} animationType="fade">
          <TouchableWithoutFeedback onPress={onClose || toggle}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={[styles.popup, {backgroundColor, maxHeight: 300}]}>
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    style={{maxHeight: 250}}>
                    {(options || []).map((member, index) => (
                      <TouchableOpacity
                        key={member._id}
                        style={[
                          styles.popupItem,
                          index !== options.length - 1 && {
                            borderBottomWidth: 1,
                            borderBottomColor: separatorColor,
                          },
                        ]}
                        onPress={() => {
                          onSelect(member);
                          if (onClose) {
                            onClose();
                          } else {
                            toggle();
                          }
                        }}>
                        <Text
                          style={[
                            styles.popupItemText,
                            selected?._id === member._id &&
                              styles.popupItemTextSelected,
                            {color: textColor},
                          ]}>
                          {member.user.name} ({member.user.role})
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

export default GymMemberDropdown;
