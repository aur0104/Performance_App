import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import fonts from '../../../utils/Fonts';
import {hp} from '../../../utils/responsivesness';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 37,
    marginBottom: 16,
    borderRadius: 70,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
  },
  memberContainer: {
    marginBottom: 6,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileWrapper: {
    marginRight: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  memberTextInfo: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
  },
  sportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sportText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  vertSeparator: {
    width: 1,
    height: 12,
    marginHorizontal: 18,
    marginTop: 4,
  },
  levelText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  horizontalSeparator: {
    height: 1,
    width: '100%',
    marginTop: 12,
  },
  progressBarContainer: {
    width: '96%',
    height: 9,
    borderRadius: 121,
    overflow: 'hidden',
    marginTop: 8,
    justifyContent: 'center',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 121.6,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: -16,
  },
  progressText: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
  },
  completeText: {
    marginTop: -6,
    fontFamily: fonts.UrbanistMedium,
    fontSize: 14,
  },
  videoWrapper: {
    backgroundColor: Colors.black,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    width: '90%', // Make sure it takes full width
    alignSelf: 'center',
    height: 200,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
