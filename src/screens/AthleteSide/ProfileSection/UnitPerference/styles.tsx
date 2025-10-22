import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import fonts from '../../../../utils/Fonts';
import {hp} from '../../../../utils/responsivesness';

const styles = StyleSheet.create({
  toggleContainer: {
    width: '90%',
    height: 43,
    borderRadius: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: hp(1),
    marginTop: hp(2),
  },
  toggleButton: {
    flex: 1,
    height: 43,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 17,
    color: Colors.black,
  },
  activeToggle: {
    backgroundColor: Colors.primaryColor,
  },
  activeText: {
    color: Colors.white,
    fontFamily: fonts.UrbanistSemiBold,
  },
  contentContainer: {
    marginTop: 0,
    paddingHorizontal: 21,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: fonts.UrbanistBold,
  },
  description: {
    fontSize: 18,
    marginBottom: 24,
    fontFamily: fonts.UrbanistSemiBold,
  },
  unitRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
  },
  value: {
    fontSize: 16,
    marginTop: 3,
    fontFamily: fonts.UrbanistMedium,
  },
  separator: {
    height: 1,
    width: '100%',
    marginBottom: 16,
  },
});

export default styles;
