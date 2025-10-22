import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import {hp, wp} from '../../utils/responsivesness';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: hp(14),
  },
  headerRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.UrbanistBold,
  },
  dropDown: {
    height: 25,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  dropdownOverlay: {
    zIndex: 999,
    position: 'absolute',
    top: hp(5),
    left: hp(30),
    width: wp(36),
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
    marginRight: 6,
    fontFamily: fonts.UrbanistSemiBold,
  },
  modalTitle: {
    fontSize: 18,
    paddingHorizontal: 12,
    fontFamily: fonts.UrbanistSemiBold,
  },
});
