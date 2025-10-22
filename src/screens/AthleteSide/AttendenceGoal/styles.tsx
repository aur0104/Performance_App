import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.UrbanistBold,
    flex: 1,
    marginLeft: 10,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 0,
  },
  iconButton: {
    width: 25,
    height: 25,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  goalCard: {
    width: '90%',
    height: 385,
    borderRadius: 12,
    padding: 16,
    alignSelf: 'center',
    marginTop: 20,
  },
  goalTitle: {
    fontSize: 22,
    fontFamily: fonts.UrbanistBold,
    marginBottom: 8,
  },
  goalName: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
    height: 22,

    borderRadius: 70,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 6,
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: Colors.primaryColor,
    borderRadius: 70,
  },
  dueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  dueText: {
    fontSize: 16,
    fontFamily: fonts.UrbanistSemiBold,
  },
  circularProgressWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  addButton: {
    width: 59,
    height: 59,
    borderRadius: 30,
    backgroundColor: Colors.primaryColor,
    position: 'absolute',
    bottom: 24,
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistSemiBold,
  },
  refreshButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  refreshButtonText: {
    fontSize: 12,
    fontFamily: fonts.UrbanistMedium,
  },
});

export default styles;
