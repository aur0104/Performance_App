import {StyleSheet} from 'react-native';
import fonts from '../../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistBold,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: '16%',
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistSemiBold,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 10,
  },
  roundedTextInput: {
    width: 80,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
  },
  skipText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: '8%',
    fontFamily: fonts.UrbanistBold,
  },
  button: {
    marginBottom: '12%',
  },
});
