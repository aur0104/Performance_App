import {StyleSheet} from 'react-native';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    marginTop: hp(2),
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  inputField: {
    borderRadius: 10,
    marginBottom: 12,
  },
  imageListContainer: {
    marginBottom: 0,
    marginTop: hp(2),
  },
  imageContainer: {
    position: 'relative',
    width: '99%',
    height: 233,
    borderRadius: 9,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 9,
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp(3),
    marginBottom: hp(5),
    paddingHorizontal: 20,
  },
  selectImageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.primaryColor,
    borderRadius: 8,
    flex: 0.45,
    justifyContent: 'center',
  },
  selectImageText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
    color: Colors.white,
  },
  selectVideoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 8,
    flex: 0.45,
    justifyContent: 'center',
  },
  selectVideoText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
    color: Colors.white,
  },
  uploadBtnContainer: {
    paddingHorizontal: 16,
    paddingBottom: hp(4),
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default styles;
