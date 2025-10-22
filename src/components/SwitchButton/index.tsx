import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

type SwitchButtonProps = {
  isOn: boolean;
  onPress: () => void;
  activeColor?: string;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({
  isOn,
  onPress,
  activeColor = Colors.green,
}) => {
  return (
    <View style={styles.switchContainer}>
      <TouchableOpacity
        style={[
          styles.toggleContainer,
          {backgroundColor: isOn ? activeColor : 'rgba(225, 225, 225, 1)'},
        ]}
        onPress={onPress}>
        <View
          style={[
            styles.toggleCircle,
            isOn ? styles.onCircle : styles.offCircle,
            isOn ? styles.onCirclePosition : styles.offCirclePosition,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  toggleContainer: {
    width: 34,
    height: 19,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 2.3,
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 13,
    backgroundColor: 'white',
  },
  onCircle: {
    backgroundColor: 'white',
  },
  offCircle: {
    backgroundColor: Colors.gray,
  },
  onCirclePosition: {
    alignSelf: 'flex-end',
  },
  offCirclePosition: {
    alignSelf: 'flex-start',
  },
});

export default SwitchButton;
