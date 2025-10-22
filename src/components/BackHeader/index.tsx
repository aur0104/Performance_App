import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AnySvg from '../AnySvg';
import {hp, rfs} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';

interface HeaderProps {
  title: string;
  showBackIcon?: boolean;
  onBackPress?: () => void;
  rightIconName?: string;
  onRightIconPress?: () => void;
  rightButtonText?: string;
  onRightButtonPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const BackHeader: React.FC<HeaderProps> = ({
  title,
  showBackIcon = false,
  onBackPress,
  rightIconName,
  onRightIconPress,
  rightButtonText,
  onRightButtonPress,
  containerStyle,
  titleStyle,
}) => {
  const navigation = useNavigation();
  const isDarkMode = useSelector((state: any) => state?.theme?.switchDarkTheme);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const backIconName = isDarkMode ? 'backArrow' : 'lightBackArrow';
  const themedRightIconName = rightIconName;

  const textColor = isDarkMode ? Colors.white : Colors.black;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.left}>
        {showBackIcon && (
          <AnySvg name={backIconName} onPress={handleBackPress} />
        )}
      </View>
      <View style={styles.center}>
        <Text
          style={[styles.title, titleStyle, {color: textColor}]}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.right}>
        {themedRightIconName ? (
          <AnySvg name={themedRightIconName} onPress={onRightIconPress} />
        ) : rightButtonText ? (
          <TouchableOpacity onPress={onRightButtonPress}>
            <Text
              style={[styles.rightButtonText, {color: Colors.primaryColor}]}>
              {rightButtonText}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    marginTop: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    marginTop: 14,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    alignItems: 'flex-end',
    marginTop: hp(2),
    marginRight: 4,
  },
  title: {
    fontSize: rfs(24),
    fontFamily: fonts.UrbanistBold,
  },
  rightButtonText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistBold,
  },
});

export default BackHeader;
