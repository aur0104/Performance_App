import {StyleSheet} from 'react-native';
import fonts from '../../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistBold,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: '2%',
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistSemiBold,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
  },
  optionText: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'left',
    fontFamily: fonts.UrbanistSemiBold,
  },
  separator: {
    height: 1,
    marginVertical: 10,
  },
});
