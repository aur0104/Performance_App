import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

export const styles = StyleSheet.create({
  mainContainer: (isLight: boolean) => ({
    flex: 1,
    backgroundColor: isLight ? Colors.lightBackground : Colors.darkBackground,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  imageStyle: {
    height: 298,
    width: '100%',
    resizeMode: 'contain',
  },
});
