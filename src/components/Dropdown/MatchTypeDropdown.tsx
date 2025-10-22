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

interface Props {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  visible: boolean;
  toggle: () => void;
  onClose?: () => void;
  label?: string;
  style: any;
}

const MatchTypeDropdown: React.FC<Props> = ({
  options,
  selected,
  onSelect,
  visible,
  toggle,
  onClose,
  style,
  label = 'Select Match Type',
}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : Colors.blackLight;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  return (
    <>
      <TouchableOpacity
        style={[
          styles.dropdown,
          {marginHorizontal: 20, backgroundColor},
          style,
        ]}
        onPress={toggle}>
        <Text style={[styles.dropdownText, selected && {color: textColor}]}>
          {selected || label}
        </Text>

        <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
      </TouchableOpacity>

      {visible && (
        <Modal transparent visible={visible} animationType="fade">
          <TouchableWithoutFeedback onPress={onClose || toggle}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={[styles.popup, {backgroundColor, maxHeight: 300}]}>
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    style={{maxHeight: 250}}>
                    {(options || []).map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.popupItem,
                          index !== options.length - 1 && {
                            borderBottomWidth: 1,
                            borderBottomColor: separatorColor,
                          },
                        ]}
                        onPress={() => {
                          onSelect(item);
                          if (onClose) {
                            onClose();
                          } else {
                            toggle();
                          }
                        }}>
                        <Text
                          style={[
                            styles.popupItemText,
                            selected === item && styles.popupItemTextSelected,
                            {color: textColor},
                          ]}>
                          {item}
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

export default MatchTypeDropdown;
