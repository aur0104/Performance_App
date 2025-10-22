import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import AnySvg from '../AnySvg';
import fonts from '../../utils/Fonts';
import {wp} from '../../utils/responsivesness';
import {useSelector} from 'react-redux';

interface Props {
  leftIcon?: any;
  leftIconType?: string;
  leftIconColor?: string;
  rightIcon?: any;
  rightIconStyle?: any;
  style?: any;
  disable?: boolean;
  containerStyle?: any;
  onPress?: () => void;
  themeColor?: string;
  payoutButton?: boolean;
  bidButton?: boolean;
  loading?: boolean;
  shadow?: boolean;
  width?: DimensionValue | undefined;
  height?: number;
  children?: React.ReactNode;
  textColor?: string;
  isBackground?: boolean;
  borderColor?: string;
  borderRadius?: number | string;
  btnBorderWidth?: boolean;
}
const CustomButton = ({
  leftIcon,
  leftIconColor,
  leftIconType,
  rightIcon,
  rightIconStyle,
  style,
  disable,
  containerStyle,
  onPress,
  themeColor,
  loading,
  shadow,
  width = wp(90),
  height = 58,
  children,
  textColor,
  btnBorderWidth,
  isBackground = true,
  borderColor = Colors.primaryColor,
  borderRadius = 38,
}: Props) => {
  const isDarkMode = useSelector((state: any) => state?.theme?.switchDarkTheme);
  const disabledOverlay = disable
    ? isDarkMode
      ? 'rgba(0,0,0,0.6)'
      : 'rgba(172, 198, 223, 0.4)'
    : undefined;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disable}
      style={[
        shadow && styles.shadow,
        {
          ...styles.container,
          width,
          height,
          borderRadius,
          backgroundColor: themeColor
            ? themeColor
            : !isBackground
            ? Colors.darkBackground
            : Colors.primaryColor,
          ...containerStyle,
          zIndex: 100,
        },
        !isBackground && {borderColor, borderWidth: btnBorderWidth ? 0 : 1.3},
      ]}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={isBackground ? '#0000004D' : Colors.primaryColor}
          />
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {leftIcon && (
              <AnySvg
                name={leftIcon}
                size={24}
                disabled
                svgStyle={{marginRight: 10}}
              />
            )}
            <Text
              style={[
                {...styles.label, ...style},
                !isBackground && {color: textColor ? textColor : borderColor},
              ]}>
              {children}
            </Text>
            {rightIcon && (
              <AnySvg
                name={rightIcon}
                size={24}
                disabled
                svgStyle={[{marginLeft: 4, marginTop: 2}, rightIconStyle]}
              />
            )}
          </View>
        )}
      </View>
      {disable && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: disabledOverlay,
              borderRadius: Number(borderRadius),
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  label: {
    color: Colors.white,
    fontFamily: fonts.UrbanistBold,
    fontSize: 16,
  },
});
export default CustomButton;
