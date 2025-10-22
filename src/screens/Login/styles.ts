import {StyleSheet} from 'react-native';
import {hp, wp, rfs} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    height: hp(25),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  title: {
    fontSize: rfs(26),
    fontFamily: fonts.UrbanistExtraBold,
    textAlign: 'center',
    marginBottom: -10,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checked: {
    backgroundColor: Colors.primaryColor,
  },
  rememberText: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
  },
  forgotText: {
    textAlign: 'center',
    marginTop: hp(1.5),
    fontSize: rfs(16),
    paddingBottom: hp(1.5),
    fontFamily: fonts.UrbanistSemiBold,
    color: Colors.primaryColor,
  },
  or: {
    textAlign: 'center',
    marginVertical: hp(2),
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
    color: Colors.gray,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: hp(2.5),
  },
  signupText: {
    textAlign: 'center',
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
    color: Colors.gray,
    marginBottom: hp(6),
  },
  link: {
    fontFamily: fonts.UrbanistBold,
    color: Colors.meduimblue,
  },
  socialIconWrapper: {
    width: wp(20),
    height: wp(14),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
    borderWidth: 1,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
    marginBottom: hp(4),
  },
  orText: {
    color: Colors.meduimgray,
    fontFamily: fonts.UrbanistMedium,
    fontSize: 14,
    marginHorizontal: wp(2),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.meduimgray,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default styles;
