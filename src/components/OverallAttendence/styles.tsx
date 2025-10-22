import {StyleSheet} from 'react-native';
import fonts from '../../utils/Fonts';
import {hp, wp} from '../../utils/responsivesness';

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.UrbanistBold,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: hp(2),
  },
  dropdownText: {
    fontSize: 12,
    fontFamily: fonts.UrbanistMedium,
  },
  dropdownBtn: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 4,
  },
  dropdownList: {
    position: 'absolute',
    top: 40,
    zIndex: 10,
    width: '100%',
    borderRadius: 6,
  },
  dropdownItem: {
    padding: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: hp(1),
    height: 300,
  },
  yAxis: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 6,
    height: '100%',
  },
  yText: {
    fontSize: 13,
    fontFamily: fonts.UrbanistMedium,
  },
  graphArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
  },
  graphLine: {
    position: 'absolute',
    height: 1,
    width: '100%',
    left: 0,
    marginBottom: hp(2.4),
  },
  barGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingHorizontal: 10,
  },
  barWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    width: 29,
    borderRadius: 0,
  },
  barLabel: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.UrbanistMedium,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    marginBottom: hp(2),
    gap: 10,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  typeButton: {
    width: wp(18),
    height: 54,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
