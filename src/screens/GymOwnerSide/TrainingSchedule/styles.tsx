import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {hp, wp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekRow: {
    flexDirection: 'row',
    marginVertical: hp(2),
    marginRight: hp(1),
  },
  dayButton: {
    width: wp(12),
    height: hp(6),
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: hp(4.4),
    borderColor: '#424242',
  },
  calendarButton: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    marginLeft: hp(3),
  },
  icon: {
    width: wp(5.5),
    height: wp(5.5),
    resizeMode: 'contain',
  },
  dayText: {
    fontSize: 12,
    fontFamily: fonts.UrbanistMedium,
  },
  numText: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectedDayButton: {
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
  },
  selectedDayText: {
    color: Colors.white,
  },
  tableContainer: {
    marginTop: hp(2),
    //borderColor: 'rgba(228, 232, 231, 1)',
    borderTopWidth: 1,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    height: 52,
  },

  timeText: {
    fontSize: 11,
    paddingHorizontal: 10,
    fontFamily: fonts.UrbanistMedium,
  },
  timeBlock: {
    backgroundColor: Colors.primaryColor,
    padding: wp(1),
    marginRight: hp(14.5),
    width: 88,
    height: hp(21),
  },
  blockText: {
    fontSize: 18,
    fontFamily: fonts.UrbanistBold,
    textAlign: 'center',
    marginTop: hp(1),
  },
  blockPrice: {
    fontSize: 11,
    fontFamily: fonts.UrbanistMedium,
    marginTop: hp(3),
    textAlign: 'center',
  },
  verticalSeparator: {
    position: 'absolute',
    left: hp(12),
    width: 1,
    height: '100%',
    zIndex: 10,
  },
});

export default styles;
