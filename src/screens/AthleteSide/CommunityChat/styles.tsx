import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';
import {hp} from '../../../utils/responsivesness';
import fonts from '../../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 26,
  },
  backButton: {
    marginRight: 12,
  },
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    marginLeft: hp(8),
  },
  profileWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 11,
    height: 11,
    borderRadius: 5,
    backgroundColor: Colors.green,
    borderWidth: 2,
  },
  nameText: {
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
  },
  activeNow: {
    fontSize: 13,
    color: Colors.gray,
    fontFamily: fonts.UrbanistRegular,
  },
  dateText: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontFamily: fonts.UrbanistSemiBold,
  },
  bubbleImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  voiceBubble: {
    padding: 10,
    borderRadius: 10,
  },
  messageBubble: {
    marginHorizontal: 0,
    marginVertical: 5,
    padding: 10,
    maxWidth: '75%',
    borderRadius: 18,
    flexDirection: 'column',
  },
  senderBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  receiverBubble: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: fonts.UrbanistMedium,
  },
  timeText: {
    fontSize: 14,
    color: Colors.gray,
    alignSelf: 'flex-end',
    fontFamily: fonts.UrbanistMedium,
  },
  seenText: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 2,
    fontFamily: fonts.UrbanistMedium,
  },
  inputContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconWrapper: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 8,
    paddingVertical: 8,
  },
  verticalSeparator: {
    width: 1,
    height: 24,
    backgroundColor: Colors.gray,
    marginHorizontal: 6,
  },
});

export default styles;
