import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  updatedText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    marginTop: -12,
    fontFamily: fonts.UrbanistSemiBold,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeIconView: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  badgeTitle: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: fonts.UrbanistBold,
  },
  progressContainer: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    borderWidth: 3.15,
    opacity: 0.1,
    marginTop: 14,
    marginBottom: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabelText: {
    fontSize: 12,
    fontFamily: fonts.UrbanistBold,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingVertical: 4,
  },
  coinText: {
    fontSize: 18,
    marginLeft: 6,
    marginBottom: 5,
    fontFamily: fonts.UrbanistBold,
  },
  checkTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  descriptionText: {
    fontSize: 12,
    marginLeft: 6,
    fontFamily: fonts.UrbanistMedium,
  },
  separator: {
    height: 1,
    marginVertical: 12,
  },
});
