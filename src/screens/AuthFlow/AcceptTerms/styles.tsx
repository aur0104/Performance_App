import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  addIconContainer: {
    position: 'absolute',
    width: 43,
    height: 43,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primaryColor,
    borderRadius: 50,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: '10%',
  },
  heading: {
    fontSize: 20,
    fontFamily: fonts.UrbanistBold,
    marginBottom: 10,
  },
  descText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  button: {
    marginBottom: '8%',
  },
});
