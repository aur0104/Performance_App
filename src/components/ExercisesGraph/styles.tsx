import {StyleSheet} from 'react-native';
import fonts from '../../utils/Fonts';
import {hp} from '../../utils/responsivesness';

export default StyleSheet.create({
  container: {
    width: '90%',
    height: 260,
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
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
  dropdownBtn: {
    height: 25,
    width: 80,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontFamily: fonts.UrbanistMedium,
    fontSize: 16,
    paddingVertical: 4,
    color: '#FFFFFF',
  },
  dropdownList: {
    position: 'absolute',
    top: 30,
    right: 8,
    left: 0,
    width: 110,
    borderRadius: 10,
    padding: 4,
    elevation: 4,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 0,
    alignSelf: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    flex: 1,
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
    width: 16,
    borderRadius: 8,
  },
  barLabel: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.UrbanistMedium,
  },
});
