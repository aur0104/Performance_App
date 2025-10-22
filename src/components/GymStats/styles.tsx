import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {hp} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: hp(14),
  },
  mainTitle: {
    fontSize: 17,
    marginBottom: 12,
    marginTop: 12,
    fontFamily: fonts.UrbanistBold,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropDownText: {
    marginRight: 6,
  },
  graphContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: hp(5),
  },
  yAxis: {
    marginRight: 8,
    justifyContent: 'space-between',
  },
  yText: {
    fontSize: 12,
    marginTop: -12,
    fontFamily: fonts.UrbanistMedium,
  },
  graphArea: {
    flex: 1,
    position: 'relative',
    height: 140,
    justifyContent: 'flex-end',
  },
  graphLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  barGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 50,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barLabelContainer: {
    height: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barLabelBottom: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: fonts.UrbanistMedium,
  },
  toggleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 37,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  progressLabel: {
    width: 50,
    fontSize: 14,
  },
  progressBarContainer: {
    flex: 1,
    height: 36,
    backgroundColor: Colors.gray,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  progressPercent: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginVertical: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
  },
  labelWrapper: {
    width: 60,
    alignItems: 'center',
  },
});
