import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './dropdownStyles';
import AnySvg from '../AnySvg';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';

interface Props {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  visible: boolean;
  toggle: () => void;
  label?: string;
}

const ResultDropdown: React.FC<Props> = ({
  options,
  selected,
  onSelect,
  visible,
  toggle,
  label = 'Select Result',
}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const dynamicText = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  return (
    <>
      <TouchableOpacity
        style={[styles.dropdown, {marginHorizontal: 20, backgroundColor}]}
        onPress={toggle}>
        <Text style={[styles.dropdownText, selected && {color: dynamicText}]}>
          {selected || label}
        </Text>
        <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={24} />
      </TouchableOpacity>

      {visible && (
        <Modal transparent visible={visible} animationType="fade">
          <TouchableWithoutFeedback onPress={toggle}>
            <View style={[styles.modalBackground]}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={[styles.popup, {backgroundColor}]}>
                  {(options || []).map((item, index) => (
                    <>
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.popupItem,
                          {borderBottomColor: separatorColor},
                        ]}
                        onPress={() => {
                          onSelect(item);
                          toggle();
                        }}>
                        <Text
                          style={[
                            styles.popupItemText,
                            {
                              color: isDarkMode ? Colors.white : Colors.black,
                            },
                            selected === item && styles.popupItemTextSelected,
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                      {index < options.length - 1 && (
                        <View
                          style={{
                            height: 0.8,
                            backgroundColor: separatorColor,
                          }}
                        />
                      )}
                    </>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

export default ResultDropdown;
