import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Modal,
  FlatList,
} from 'react-native';
import AnySvg from '../AnySvg';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import {useSelector} from 'react-redux';
import {hp} from '../../utils/responsivesness';

interface AnimatedInputFieldProps extends TextInputProps {
  label: string;
  iconLeftName?: string;
  iconRightName?: string;
  iconAboveRightName?: string;
  isPassword?: boolean;
  error?: string;
  showError?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  placeholder?: string;
  placeholderTextColor?: any;
  onRightIconClick?: any;
  mainStyle?: any;
  leftElement?: React.ReactNode;
  suffix?: string;
  isPhoneNumber?: boolean;
  paddingHorizontal?: number;
}

const countryCodes = [
  {flag: '🇦🇪', code: '+971'},
  {flag: '🇦🇷', code: '+54'},
  {flag: '🇦🇺', code: '+61'},
  {flag: '🇦🇹', code: '+43'},
  {flag: '🇧🇭', code: '+973'},
  {flag: '🇧🇪', code: '+32'},
  {flag: '🇧🇷', code: '+55'},
  {flag: '🇨🇦', code: '+1'},
  {flag: '🇨🇱', code: '+56'},
  {flag: '🇨🇴', code: '+57'},
  {flag: '🇨🇷', code: '+506'},
  {flag: '🇩🇪', code: '+49'},
  {flag: '🇩🇴', code: '+1-809'},
  {flag: '🇬🇹', code: '+502'},
  {flag: '🇮🇳', code: '+91'},
  {flag: '🇮🇪', code: '+353'},
  {flag: '🇮🇹', code: '+39'},
  {flag: '🇯🇲', code: '+1-876'},
  {flag: '🇯🇵', code: '+81'},
  {flag: '🇰🇪', code: '+254'},
  {flag: '🇰🇼', code: '+965'},
  {flag: '🇱🇺', code: '+352'},
  {flag: '🇲🇽', code: '+52'},
  {flag: '🇳🇱', code: '+31'},
  {flag: '🇳🇬', code: '+234'},
  {flag: '🇳🇴', code: '+47'},
  {flag: '🇳🇿', code: '+64'},
  {flag: '🇴🇲', code: '+968'},
  {flag: '🇵🇦', code: '+507'},
  {flag: '🇵🇪', code: '+51'},
  {flag: '🇵🇭', code: '+63'},
  {flag: '🇵🇱', code: '+48'},
  {flag: '🇵🇹', code: '+351'},
  {flag: '🇵🇾', code: '+595'},
  {flag: '🇶🇦', code: '+974'},
  {flag: '🇸🇦', code: '+966'},
  {flag: '🇸🇪', code: '+46'},
  {flag: '🇸🇬', code: '+65'},
  {flag: '🇨🇭', code: '+41'},
  {flag: '🇿🇦', code: '+27'},
  {flag: '🇰🇷', code: '+82'},
  {flag: '🇪🇸', code: '+34'},
  {flag: '🇹🇭', code: '+66'},
  {flag: '🇺🇬', code: '+256'},
  {flag: '🇬🇧', code: '+44'},
  {flag: '🇺🇸', code: '+1'},
  {flag: '🇺🇾', code: '+598'},
  {flag: '🇻🇪', code: '+58'},
];

const InputField: React.FC<AnimatedInputFieldProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  onFocus,
  iconLeftName,
  iconRightName,
  iconAboveRightName,
  isPassword,
  error,
  showError,
  containerStyle,
  labelStyle,
  placeholder,
  placeholderTextColor,
  onRightIconClick,
  mainStyle,
  leftElement,
  suffix,
  isPhoneNumber,
  paddingHorizontal,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(isPassword);
  const [selectedCountry, setSelectedCountry] = useState({
    flag: '🇦🇺',
    code: '+61',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const isDarkMode = useSelector((state: any) => state?.theme?.switchDarkTheme);
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const inputBgColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  const floatingLabelAnimation = useRef(
    new Animated.Value(value ? 1 : 0),
  ).current;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.(e);
  };

  const handleRightIconClick = () => {
    if (isPassword) {
      setShowPassword(!showPassword);
    }
    onRightIconClick?.();
  };

  const ParentComponent = useCallback(
    ({children}: {children: React.ReactNode}) => {
      if (onRightIconClick) {
        return (
          <TouchableOpacity onPress={onRightIconClick}>
            {children}
          </TouchableOpacity>
        );
      }
      return <View style={[styles.container, mainStyle]}>{children}</View>;
    },
    [onRightIconClick, mainStyle],
  );

  return (
    <ParentComponent>
      <Text
        style={[
          styles.label,
          labelStyle,
          {
            color: textColor,
            paddingHorizontal: paddingHorizontal,
            marginTop: label ? hp(1) : undefined,
          },
        ]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {backgroundColor: inputBgColor},
          containerStyle,
          showError && error ? styles.errorBorder : null,
        ]}>
        {iconLeftName && (
          <AnySvg
            name={iconLeftName}
            size={20}
            svgStyle={{marginHorizontal: 6}}
          />
        )}

        {isPhoneNumber && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[
              styles.countryCodeContainer,
              {backgroundColor: isDarkMode ? '#383838' : '#dbd9d9ff'},
            ]}>
            <Text style={[styles.countryCodeText, {color: textColor}]}>
              {selectedCountry.code}
            </Text>
            <AnySvg
              name={isDarkMode ? 'darkDown' : 'lightDown'}
              size={16}
              svgStyle={{marginLeft: 4}}
            />
          </TouchableOpacity>
        )}

        <View style={styles.inputWithSuffix}>
          <TextInput
            style={[
              styles.input,
              props.multiline && {
                minHeight: 110,
                textAlignVertical: 'top',
                paddingTop: 14,
              },
              {color: textColor},
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={
              placeholderTextColor || (isDarkMode ? '#aaa' : '#666')
            }
            secureTextEntry={isPassword && showPassword}
            keyboardType={isPhoneNumber ? 'phone-pad' : props.keyboardType}
            {...props}
          />
          {suffix && (
            <Text style={[styles.suffix, {color: textColor}]}>{suffix}</Text>
          )}
        </View>

        <View style={styles.iconRightContainer}>
          {iconAboveRightName && (
            <AnySvg
              onPress={handleRightIconClick}
              name={iconAboveRightName}
              size={20}
              svgStyle={styles.iconAboveRight}
            />
          )}
          {isPassword && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <AnySvg
                name={
                  showPassword
                    ? isDarkMode
                      ? 'eyeHide'
                      : 'eyeHideLight'
                    : isDarkMode
                    ? 'eyeShowDark'
                    : 'eyeShowLight'
                }
                size={20}
                svgStyle={{marginHorizontal: 10}}
              />
            </TouchableOpacity>
          )}
          {iconRightName && !isPassword && (
            <TouchableOpacity
              onPress={handleRightIconClick}
              style={styles.iconRightContainer}>
              <AnySvg
                name={iconRightName}
                size={24}
                svgStyle={{marginHorizontal: 10}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showError && error && (
        <Animated.Text style={styles.errorText}>{error}</Animated.Text>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={[styles.modalContainer, {backgroundColor: 'rgba(0,0,0,0.4)'}]}>
          <View style={[styles.modalContent, {backgroundColor: inputBgColor}]}>
            <FlatList
              data={countryCodes}
              keyExtractor={item => item.code}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(item);
                    setModalVisible(false);
                  }}>
                  <Text style={{fontSize: 16, color: textColor}}>
                    {item.flag} {item.code}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </ParentComponent>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  inputWithSuffix: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 15 : 17,
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
    paddingHorizontal: 6,
  },
  suffix: {
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
    marginRight: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: fonts.UrbanistSemiBold,
  },
  iconRightContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  iconAboveRight: {},
  errorBorder: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
  errorText: {
    color: Colors.red,
    marginTop: 5,
    fontFamily: fonts.UrbanistRegular,
    fontSize: 14,
  },
  countryCodeContainer: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginRight: 6,
    paddingHorizontal: 4,
  },
  countryCodeText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '60%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  countryItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});

export default InputField;
