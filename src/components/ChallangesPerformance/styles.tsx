import {StyleSheet} from 'react-native';
import fonts from '../../utils/Fonts';
import {hp, wp} from '../../utils/responsivesness';
import {Colors} from '../../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginVertical: 12,
    alignSelf: 'center',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 15,
    marginRight: 8,
    fontFamily: fonts.UrbanistSemiBold,
  },
  pbText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-end',
  },
  dropDown: {
    height: 25,
    width: 85,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
  dropdownOverlay: {
    zIndex: 999,
    position: 'absolute',
    top: hp(4),
    left: 0,
    width: wp(25),
    borderRadius: 6,
    paddingVertical: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  dropDownText: {
    fontSize: 12,
    marginLeft: 5,
    fontFamily: fonts.UrbanistSemiBold,
  },
  modalTitle: {
    fontSize: 16,
    paddingHorizontal: 12,
    fontFamily: fonts.UrbanistSemiBold,
  },
  chartStyle: {
    marginTop: 10,
    padding: 4,
    alignSelf: 'center',
    right: 16,
  },
  add: {
    backgroundColor: Colors.primaryColor,
    width: 26,
    height: 26,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    borderRadius: 8,
    padding: 8,
    position: 'absolute',
    top: 35,
    right: -6,
    zIndex: 10,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistRegular,
  },
});
