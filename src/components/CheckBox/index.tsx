import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import AnySvg from '../AnySvg';
import fonts from '../../utils/Fonts';
import {useSelector} from 'react-redux';

interface CheckboxProps {
  checked?: boolean;
  name?: string;
  setChecked?: (val: boolean) => void;
  title?: string;
  disabled?: boolean;
  isRadio?: boolean;
  onCheckColor?: string;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  checkBoxStyle?: StyleProp<ViewStyle>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  setChecked,
  title,
  isRadio,
  disabled = false,
  checkBoxStyle,
  textStyle,
  viewStyle,
  name = '',
}) => {
  const isDarkMode = useSelector((state: any) => state?.theme?.switchDarkTheme);
  const textColor = isDarkMode ? Colors.white : Colors.black;

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disabled}
      onPress={() => setChecked && setChecked(!checked)}
      style={[styles.container, checkBoxStyle]}>
      <View
        style={[
          styles.checkbox,
          {
            borderColor: checked ? Colors.primaryColor : '#616161',
            backgroundColor: checked ? Colors.primaryColor : 'transparent',
          },
          viewStyle,
        ]}>
        <View
          style={
            isRadio
              ? {
                  borderRadius: 50,
                  backgroundColor: Colors.primaryColor,
                }
              : {}
          }>
          {checked && <AnySvg disabled name="checkIcon" size={12} />}
        </View>
      </View>
      <Text style={[styles.checkText, {color: textColor}, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 2,
  },
  checkText: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
    marginHorizontal: 8,
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 6,
  },
});

export default Checkbox;
