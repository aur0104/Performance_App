import {StyleSheet} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import fonts from '../../../../utils/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 12,
    fontFamily: fonts.UrbanistBold,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 6,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistSemiBold,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 0,
  },
  previewImage: {
    width: 60,
    height: 58,
    borderRadius: 8,
    marginTop: 15,
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
});
