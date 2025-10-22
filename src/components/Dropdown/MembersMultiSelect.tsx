import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import styles from './dropdownStyles';
import {useSelector} from 'react-redux';
import {GymMember} from '../../interfaces';

interface Props {
  options: GymMember[];
  selected: GymMember[];
  onSelect: (value: GymMember) => void;
  visible: boolean;
  toggle: () => void;
}
export default function MembersMultiSelect({
  options,
  selected,
  onSelect,
  visible,
  toggle,
}: Props) {
  const isDark = useSelector((state: any) => state.theme.switchDarkTheme);
  return (
    <>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={toggle}>
          <View style={[styles.modalBackground]}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                <ScrollView>
                  {options &&
                    options.map((item, index) => (
                      <View key={index} style={styles.popupItemRow}>
                        <TouchableOpacity
                          style={styles.popupItem}
                          onPress={() => onSelect(item)}>
                          <Text
                            style={[
                              styles.popupItemText,
                              selected.includes(item) &&
                                styles.popupItemTextSelected,
                            ]}>
                            {item?.user?.name.split(' ').length > 3
                              ? item.user?.name
                                  .split(' ')
                                  .slice(0, 3)
                                  .join(' ') + '...'
                              : item.user?.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
