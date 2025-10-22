import {StyleSheet} from 'react-native';
import fonts from '../../utils/Fonts';
import {hp, rfs, wp} from '../../utils/responsivesness';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: hp(5),
  },
  title: {
    fontSize: rfs(36),
    fontFamily: fonts.UrbanistBold,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: hp(2),
    columnGap: wp(0),
    paddingTop: hp(4),
  },
  card: {
    width: wp(40),
    height: hp(18),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
    borderWidth: 1,
  },
  image: {
    height: hp(7),
    width: wp(14),
    resizeMode: 'contain',
  },
  text: {
    fontSize: rfs(18),
    fontFamily: fonts.UrbanistBold,
    marginTop: hp(1),
  },
  buttonWrapper: {
    width: wp(80),
    marginTop: hp(30),
    alignSelf: 'center',
  },
});
