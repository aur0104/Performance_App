import React from 'react';
import {View, TextInput, Text, StyleSheet, TextInputProps} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  style?: any;
}

const MatchTypeTextInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder = 'Enter Match Type',
  label,
  style,
  ...rest
}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const borderColor = isDarkMode ? Colors.gray : Colors.blackLight;
  return (
    <View style={{marginHorizontal: 20, marginBottom: 12}}>
      {label && <Text style={[styles.label, {color: textColor}]}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? 'white' : '#9E9E9E'}
        style={[
          styles.input,
          {backgroundColor, color: textColor, borderColor},
          style,
        ]}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default MatchTypeTextInput;
