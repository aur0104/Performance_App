import {StyleSheet} from 'react-native';
import {hp, wp, rfs} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: wp(1),
    paddingBottom: hp(6),
    backgroundColor: 'rgba(5, 5, 5, 0.7)',
  },
  logo: {
    width: 260,
    height: hp(22),
    alignSelf: 'center',
    marginBottom: hp(2.5),
  },
  title: {
    fontSize: rfs(48),
    fontFamily: fonts.UrbanistBold,
    marginBottom: hp(2.5),
  },
  socialButton: {
    width: wp(90),
    marginBottom: hp(1),
  },
  fullButton: {
    justifyContent: 'center',
  },
  bottomText: {
    color: Colors.gray,
    fontFamily: fonts.UrbanistMedium,
    fontSize: 14,
    marginTop: hp(1.6),
    marginBottom: hp(2),
  },
  link: {
    fontSize: 14,
    color: Colors.meduimblue,
    fontFamily: fonts.UrbanistBold,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(3),
    marginBottom: hp(5),
    paddingHorizontal: 16,
  },

  orText: {
    color: Colors.meduimgray,
    fontFamily: fonts.UrbanistSemiBold,
    fontSize: 18,
    marginHorizontal: wp(4),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.meduimgray,
  },
});

export default styles;
