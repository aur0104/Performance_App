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
import {Friend} from '../../interfaces';

interface Props {
  options: Friend[];
  selected: Friend[];
  onSelect: (value: Friend) => void;
  visible: boolean;
  toggle: () => void;
}
export default function FriendsMultiSelect({
  options,
  selected,
  onSelect,
  visible,
  toggle,
}: Props) {
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
                            {item?.name.split(' ').length > 3
                              ? item?.name.split(' ').slice(0, 3).join(' ') +
                                '...'
                              : item?.name}
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
