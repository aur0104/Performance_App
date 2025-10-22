import {StyleSheet} from 'react-native';
import fonts from '../../../utils/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  notificationContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: fonts.UrbanistRegular,
  },
  notificationTime: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: fonts.UrbanistSemiBold,
  },
  separator: {
    height: 1,
    marginVertical: 12,
    width: '100%',
  },
});
