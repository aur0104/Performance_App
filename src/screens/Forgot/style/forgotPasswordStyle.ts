import {StyleSheet} from 'react-native';
import {hp, wp, rfs} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    //padding: wp(5),
  },

  illustration: {
    height: hp(28),
    width: wp(80),
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  title: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistMedium,
    marginBottom: hp(3),
    marginTop: hp(1),
    paddingHorizontal: 20,
  },
  optionBox: {
    backgroundColor: '#212121',
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#797979',
    marginHorizontal: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(8),
    backgroundColor: '#424242',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  contactTextContainer: {
    flexDirection: 'column',
  },
  optionType: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
    color: Colors.white,
    marginBottom: 12,
  },
  optionValue: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistBold,
    color: Colors.gray,
  },
  wrapper: {
    marginTop: rfs(60),
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  modalContent: {
    width: '100%',
    borderRadius: wp(4),
    padding: wp(5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  modalTitle: {
    fontSize: rfs(18),
    fontFamily: fonts.UrbanistBold,
    flex: 1,
  },
  closeButton: {
    padding: wp(2),
  },
  modalSubtitle: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
    marginBottom: hp(3),
    lineHeight: rfs(20),
  },
  modalInput: {
    marginBottom: hp(3),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  modalButton: {
    flex: 1,
    paddingVertical: hp(1.8),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(1),
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  submitButton: {
    backgroundColor: Colors.primaryColor,
  },
  cancelButtonText: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
    color: Colors.gray,
  },
  submitButtonText: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistMedium,
    color: Colors.white,
  },
});

export default styles;
