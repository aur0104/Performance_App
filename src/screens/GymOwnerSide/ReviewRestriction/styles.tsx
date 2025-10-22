import {StyleSheet} from 'react-native';
import fonts from '../../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memberLabel: {
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontFamily: fonts.UrbanistSemiBold,
  },
  memberName: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  header: {
    height: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
  },
  dataWrapper: {
    marginTop: -1,
    alignSelf: 'center',
  },
  row: {
    height: 40,
  },
});

export default styles;
