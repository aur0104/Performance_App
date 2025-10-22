import {StyleSheet} from 'react-native';
import {rwp, rhp, rfs} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';
import {Colors} from '../../../utils/Colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: rwp(20),
  },
  title: {
    fontSize: rfs(24),
    fontFamily: fonts.UrbanistBold,
    textAlign: 'center',
    marginBottom: rhp(8),
  },
  subtitle: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistMedium,
    marginBottom: rhp(24),
  },
  card: {
    height: rhp(86),
    borderRadius: rwp(10),
    paddingHorizontal: rwp(16),
    marginBottom: rhp(16),
    backgroundColor: 'red',
  },

  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',

    borderRadius: rwp(10),
    paddingHorizontal: rwp(10),
  },

  iconWrapper: {
    width: rwp(53),
    height: rwp(53),
    borderRadius: rwp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: rwp(16),
  },

  cardText: {
    fontSize: rfs(16),
    fontFamily: fonts.UrbanistMedium,
  },
  bottomButtonWrapper: {
    paddingHorizontal: rwp(20),
    paddingBottom: rhp(120),
    backgroundColor: 'transparent',
  },
  helpText: {
    marginBottom: rhp(24),
  },
});
