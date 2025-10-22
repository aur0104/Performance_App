import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import MonthPicker from 'react-native-month-year-picker';
import {styles} from './styles';
import AnySvg from '../AnySvg';
import {wp} from '../../utils/responsivesness';
import {Colors} from '../../utils/Colors';
import CustomGraph from './CustomGraph';

interface ButtonProps {
  onPress: () => void;
  iconName: string;
  buttonStyle?: object;
}

interface Props {
  title: string;
  personalBest: string;
  data: number[];
  height?: number;
  width?: number;
  labels?: string[];
  propsForDots?: {
    r?: string;
    strokeWidth?: string;
    stroke?: string;
    fill?: string;
  };
  theme?: {
    backgroundColor?: string;
    textColor?: string;
    gridColor?: string;
    borderColor?: string;
  };
  button?: ButtonProps;
}

const ChallangesPerformanceGraph: React.FC<Props> = ({
  title,
  personalBest,
  data,
  height = 200,
  width = wp(86),
  labels = [],
  propsForDots,
  theme,
  button,
}) => {
  const {t} = useTranslation();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const [showPicker, setShowPicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Month');

  const backgroundColor =
    theme?.backgroundColor ||
    (isDarkMode ? Colors.darkInputBg : Colors.lightInputBg);
  const textColor =
    theme?.textColor || (isDarkMode ? Colors.white : Colors.black);
  const borderColor =
    theme?.borderColor || (isDarkMode ? Colors.gray : Colors.black);

  const options = ['Day', 'Week', 'Month', 'Year', 'All Time'];

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.headerRow}>
        <View style={styles.leftSide}>
          <Text style={[styles.titleText, {color: textColor}]}>{title}</Text>
          <Text style={[styles.pbText, {color: textColor}]}>
            {personalBest}
          </Text>
        </View>

        <View style={styles.rightSide}>
          <TouchableOpacity
            style={[styles.dropDown, {borderColor}]}
            onPress={() => setShowPicker(true)}>
            <Text style={[styles.dropDownText, {color: textColor}]}>
              {selectedRange}
            </Text>
            <AnySvg name={isDarkMode ? 'darkDown' : 'lightDown'} size={14} />
          </TouchableOpacity>
          {button && (
            <TouchableOpacity
              style={[styles.add, button.buttonStyle]}
              onPress={button.onPress}>
              <AnySvg
                name={isDarkMode ? 'addDarkIcon' : 'addLightIcon'}
                size={16}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showPicker && (
        <View
          style={[styles.optionContainer, {backgroundColor: backgroundColor}]}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setSelectedRange(option);
                setShowPicker(false);
              }}
              style={styles.optionButton}>
              <Text style={[styles.optionText, {color: textColor}]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <CustomGraph
        data={data}
        height={height}
        width={width}
        isDarkMode={isDarkMode}
        labels={labels}
        propsForDots={propsForDots}
      />
    </View>
  );
};

export default ChallangesPerformanceGraph;
