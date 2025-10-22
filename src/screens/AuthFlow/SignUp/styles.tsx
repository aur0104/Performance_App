import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp, rfs, rhp, rwp, wp} from '../../../utils/responsivesness';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: '4%',
    paddingHorizontal: 10,
  },
  subHeader: {
    fontSize: 18,
    marginTop: 8,
    fontFamily: fonts.UrbanistSemiBold,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    marginTop: 2,
    fontFamily: fonts.UrbanistBold,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 26,
    marginBottom: '10%',
    paddingHorizontal: 22,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
  },
  signUpContainer: {
    alignSelf: 'center',
    marginVertical: '2%',
    marginBottom: '8%',
  },
  signUpText: {
    fontSize: 15,
    fontFamily: fonts.UrbanistMedium,
  },
  signUpLink: {
    fontSize: 15,
    color: Colors.primaryColor,
    fontFamily: fonts.UrbanistSemiBold,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  genderModal: {
    width: '90%',
    borderRadius: 16,
    paddingVertical: 10,
    shadowColor: Colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  genderOption: {
    padding: 14,
    alignItems: 'center',
  },
  genderText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  separator: {
    height: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: Colors.gray,
  },
  imageView: {
    marginTop: '6%',
    width: 80,
    height: 75,
  },
  image: {
    width: 80,
    height: 75,
    borderRadius: 10,
  },
  deleteButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  deleteText: {
    color: Colors.red,
    fontSize: 16,
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupContainer: {
    width: '90%',
    height: 264,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  popupTitle: {
    fontSize: 40,
    marginBottom: 10,
    color: Colors.red,
    fontFamily: fonts.UrbanistBold,
  },
  popupMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    padding: 0,
    fontFamily: fonts.UrbanistRegular,
  },
  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.black,
    width: 25,
    height: 25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistSemiBold,
    marginTop: hp(4),
    marginBottom: hp(1),
    marginHorizontal: 20,
  },
  uploadInput: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: wp(4),
    marginBottom: rhp(20),
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  uploadPlaceholder: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistSemiBold,
    color: '#9E9E9E',
  },
  uploadIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDivider: {
    width: 1,
    height: rhp(20),
    backgroundColor: Colors.meduimgray,
    marginHorizontal: rwp(10),
  },
  reviewBox: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    height: 168,
    padding: rwp(5),
    marginTop: rhp(20),
    marginBottom: rhp(22),
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  reviewLabel: {
    fontSize: rfs(12),
    fontFamily: fonts.UrbanistMedium,
    color: Colors.white,
    marginBottom: rhp(5),
  },
  reviewInput: {
    fontSize: rfs(14),
    fontFamily: fonts.UrbanistSemiBold,
    color: Colors.white,
    minHeight: rhp(100),
    textAlignVertical: 'top',
  },
  remove: {
    position: 'absolute',
    top: 5,
    right: 2,
    padding: 2,
  },
});

export default styles;
