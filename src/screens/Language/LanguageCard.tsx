import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Colors} from '../../utils/Colors';

interface Props {
  name: string;
  image: any;
  onPress?: () => void;
  isDarkMode: boolean;
  isSelected: boolean;
}

const LanguageCard = ({
  name,
  image,
  onPress,
  isDarkMode,
  isSelected,
}: Props) => {
  const backgroundColor = isDarkMode
    ? 'transparent'
    : isSelected
    ? Colors.primaryColor
    : 'transparent';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: backgroundColor,
            borderColor: isSelected
              ? Colors.primaryColor
              : isDarkMode
              ? '#424242'
              : '#ccc',
          },
        ]}>
        <Image source={image} style={styles.image} />
        <Text
          style={[
            styles.text,
            {
              color: isDarkMode
                ? Colors.white
                : isSelected
                ? Colors.white
                : Colors.black,
            },
          ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LanguageCard;
