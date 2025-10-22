import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '4%',
    paddingBottom: 10,
  },
  logo: {
    width: 94,
    height: 63,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  text: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: 20,
    fontFamily: fonts.UrbanistBold,
  },
});

export default styles;
