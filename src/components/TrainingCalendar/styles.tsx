import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import {hp} from '../../utils/responsivesness';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    marginBottom: hp(3),
  },
  title: {
    fontSize: 18,
    marginBottom: hp(3),
    fontFamily: fonts.UrbanistBold,
  },
  toggleContainer: {
    width: '100%',
    height: 34,
    backgroundColor: '#E8F0F9',
    borderRadius: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: hp(3),
  },
  toggleButton: {
    flex: 1,
    height: 34,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: Colors.black,
  },
  activeToggle: {
    backgroundColor: Colors.primaryColor,
  },
  activeText: {
    color: Colors.white,
    fontFamily: fonts.UrbanistSemiBold,
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    marginBottom: hp(2),
    fontFamily: fonts.UrbanistBold,
  },

  // WEEKLY VIEW STYLES
  weekRow: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: '#C9C9C9',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#C9C9C9',
  },
  selectedBox: {
    backgroundColor: Colors.primaryColor,
  },
  trainingDay: {
    backgroundColor: '#E8F0F9',
  },
  dayBox: {
    marginBottom: 4,
  },
  dateBox: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fonts.UrbanistMedium,
  },
  dateText: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: fonts.UrbanistSemiBold,
  },
  separater: {
    height: 0.5,
    width: '100%',
    marginVertical: 15,
    backgroundColor: '#C9C9C9',
  },
  trainingIndicator: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  trainingIndicatorText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: fonts.UrbanistBold,
  },

  // MONTHLY VIEW STYLES
  weekHeaderRow: {
    height: 44,
    flexDirection: 'row',
    borderTopWidth: 0.5,

    borderColor: '#C9C9C9',
  },
  weekHeaderText: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    fontSize: 11,
    fontFamily: fonts.UrbanistSemiBold,
    paddingVertical: 14,
    borderRightWidth: 0.5,
    borderColor: '#C9C9C9',
    alignSelf: 'center',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#C9C9C9',
  },
  monthDayBox: {
    height: 40,
    width: `${100 / 7}%`,
    // aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#C9C9C9',
  },
  trainingInfo: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
    alignItems: 'center',
  },
  trainingName: {
    fontSize: 8,
    fontFamily: fonts.UrbanistMedium,
    textAlign: 'center',
    lineHeight: 10,
  },
  trainingTime: {
    fontSize: 7,
    fontFamily: fonts.UrbanistRegular,
    textAlign: 'center',
    lineHeight: 8,
  },
});
