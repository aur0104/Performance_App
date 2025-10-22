import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp, rfs} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  otpSubtitle: {
    fontSize: rfs(18),
    fontFamily: fonts.UrbanistMedium,
    textAlign: 'center',
    marginBottom: hp(4),
  },
  otpBoxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(5),
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  roundedTextInput: {
    width: Dimensions.get('window').width * 0.18,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
  },
  resendText: {
    textAlign: 'center',
    color: Colors.primaryColor,
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: hp(4),
  },
});

export default styles;
