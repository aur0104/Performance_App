import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 37,
    marginBottom: 16,
    borderRadius: 70,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
  },
  memberContainer: {
    marginBottom: 6,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileWrapper: {
    marginRight: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  memberTextInfo: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
  },
  sportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  sportText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  vertSeparator: {
    width: 1,
    height: 12,
    marginHorizontal: 8,
  },
  levelText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  horizontalSeparator: {
    height: 1,
    marginTop: 12,
  },
  checkInButtonsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkInButtonPrimary: {
    width: 84,
    height: 33,
    borderRadius: 80,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkInButtonBorder: {
    width: 84,
    height: 33,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkInButtonTextPrimary: {
    color: Colors.white,
    fontFamily: fonts.UrbanistMedium,
  },
  checkInButtonTextBorder: {
    fontFamily: fonts.UrbanistMedium,
  },
});

export default styles;
