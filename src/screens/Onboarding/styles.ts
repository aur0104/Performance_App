import {StyleSheet, Dimensions} from 'react-native';
import {hp, wp, rfs} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
    paddingTop: hp(2.5),
    paddingBottom: hp(6),
    alignItems: 'center',
  },
  title: {
    fontSize: rfs(32),
    textAlign: 'center',
    fontFamily: fonts.UrbanistBold,
  },
  highlight: {
    color: Colors.primaryColor,
  },
  description: {
    fontSize: rfs(17),
    textAlign: 'center',
    fontFamily: fonts.UrbanistSemiBold,
    marginTop: hp(1),
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(3),
  },
  dot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.gray,
    marginHorizontal: wp(1.5),
  },
  dotActive: {
    width: wp(6),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.primaryColor,
  },
  constants: {width, height},
});
