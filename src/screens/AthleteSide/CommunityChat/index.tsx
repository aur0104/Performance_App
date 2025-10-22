import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {Colors} from '../../../utils/Colors';
import {IMAGES} from '../../../assets/images';
import AnySvg from '../../../components/AnySvg';
import styles from './styles';
import {sendChatMessage} from '../../../services/calls';
import {
  pickMedia,
  getAudioPath,
  checkAudioPermissions,
  resetAudioPermissionCache,
  formatMediaMessage,
} from '../../../utils/mediaUtils';
import {Asset} from 'react-native-image-picker';
import io from 'socket.io-client';

const audioRecorderPlayer = new AudioRecorderPlayer();

// Socket configuration
const SOCKET_URL = 'https://performance-app-production.up.railway.app'; // Backend server URL
let socket: any = null;

interface CommunityProps {
  navigation?: any;
}

interface Message {
  _id: string;
  text?: string;
  type: 'text' | 'image' | 'audio' | 'multi-image';
  createdAt: Date;
  user: {
    _id: string;
    name: string;
    avatar?: any;
  };
  image?: string;
  audio?: string;
  messageType?: string;
  files?: any[];
  images?: string[];
}

interface RouteParams {
  userId: string;
  friendId: string;
  friendName: string;
  chatData: {
    messages: Array<{
      _id: string;
      sender: string;
      receiver: string;
      text: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }>;
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

const CommunityChat: React.FC<CommunityProps> = ({navigation}) => {
  const {t} = useTranslation();
  const route = useRoute();
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const currentUser = useSelector((state: any) => state.user?.user);

  const backgroundColor = isDarkMode
    ? Colors.darkBackground
    : Colors.lightBackground;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const inputBackground = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;

  // Extract route parameters
  const routeParams = route.params as RouteParams;
  const {userId, friendId, friendName, chatData} = routeParams || {};

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Asset[]>([]);
  const audioPath = useRef('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [playbackTime, setPlaybackTime] = useState<{[key: string]: number}>({});
  const [playbackDuration, setPlaybackDuration] = useState<{
    [key: string]: number;
  }>({});

  // Transform API messages to component format
  const transformApiMessages = (apiMessages: any[]) => {
    return apiMessages.map(msg => {
      // Determine message type based on messageType field or presence of files
      let messageType: 'text' | 'image' | 'audio' | 'multi-image' = 'text';

      // Check if this is an audio message based on messageType or file MIME type
      if (
        msg.messageType === 'audio' ||
        (msg.files &&
          msg.files.length > 0 &&
          typeof msg.files[0] === 'string' &&
          (msg.files[0].includes('.mp3') ||
            msg.files[0].includes('.mp4') ||
            msg.files[0].includes('.m4a') ||
            msg.files[0].includes('.aac') ||
            msg.files[0].includes('.wav')))
      ) {
        messageType = 'audio';
      }
      // Check if this is an image message
      else if (
        msg.messageType === 'image' ||
        (msg.files && msg.files.length > 0)
      ) {
        messageType =
          msg.files && msg.files.length > 1 ? 'multi-image' : 'image';
      }

      const transformedMsg: Message = {
        _id: msg._id,
        text: msg.text,
        type: messageType,
        createdAt: new Date(msg.createdAt),
        user: {
          _id: msg.sender,
          name: msg.sender === userId ? 'You' : friendName,
          avatar: msg.sender === userId ? null : IMAGES.member1,
        },
      };

      // Add image URL if it's an image message
      if (
        (messageType === 'image' || messageType === 'multi-image') &&
        msg.files &&
        msg.files.length > 0
      ) {
        if (messageType === 'multi-image') {
          transformedMsg.images = msg.files.map((file: any) => file as string);
        } else {
          transformedMsg.image = msg.files[0] as string;
        }
      }

      // Add audio URL if it's an audio message
      if (messageType === 'audio' && msg.files && msg.files.length > 0) {
        transformedMsg.audio = msg.files[0];
      }
      return transformedMsg;
    });
  };

  // Initialize socket connection
  useEffect(() => {
    // Reset permission cache when component mounts
    // This ensures we do a fresh permission check if the user returns from settings
    resetAudioPermissionCache();

    // Initialize socket connection
    socket = io(SOCKET_URL);

    socket.on('connect', () => {
      setIsConnected(true);

      // Register the current user with their ID using the 'register' event
      const currentUserId = currentUser?.user?._id || currentUser?._id;
      if (currentUserId) {
        socket.emit('register', currentUserId);
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Listen for incoming messages
    socket.on('receiveMessage', (data: any) => {
      // Process messages where either we are the receiver or the sender
      // This handles both direct messages and our own messages from other devices
      const currentUserId = currentUser?.user?._id || currentUser?._id;

      if (
        (data.sender === friendId && data.receiver === currentUserId) ||
        (data.receiver === friendId && data.sender === currentUserId)
      ) {
        // Determine message type based on messageType field or presence of files
        let messageType: 'text' | 'image' | 'audio' | 'multi-image' = 'text';

        // Check if this is an audio message based on messageType or file MIME type
        if (
          data.messageType === 'audio' ||
          (data.files &&
            data.files.length > 0 &&
            typeof data.files[0] === 'string' &&
            (data.files[0].includes('.mp3') ||
              data.files[0].includes('.mp4') ||
              data.files[0].includes('.m4a') ||
              data.files[0].includes('.aac') ||
              data.files[0].includes('.wav')))
        ) {
          messageType = 'audio';
        }
        // Check if this is an image message
        else if (
          data.messageType === 'image' ||
          (data.files && data.files.length > 0)
        ) {
          messageType =
            data.files && data.files.length > 1 ? 'multi-image' : 'image';
        } else {
          // Default to text if messageType is not specified
          messageType = 'text';
        }

        const newMessage: Message = {
          _id: data._id || Date.now().toString(),
          text: data.text,
          type: messageType,
          createdAt: new Date(data.createdAt || Date.now()),
          user: {
            _id: data.sender, // Use sender field from the message
            name: data.sender === currentUserId ? 'You' : friendName,
            avatar: data.sender === currentUserId ? null : IMAGES.member1,
          },
        };

        // Handle different message types
        if (
          (messageType === 'image' || messageType === 'multi-image') &&
          data.files &&
          data.files.length > 0
        ) {
          if (messageType === 'multi-image') {
            newMessage.images = data.files.map((file: any) => file as string);
          } else {
            newMessage.image = data.files[0] as string;
          }
        } else if (
          messageType === 'audio' &&
          data.files &&
          data.files.length > 0
        ) {
          newMessage.audio = data.files[0];
        }

        setMessages(prev => [newMessage, ...prev]);
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userId, friendId, friendName, currentUser]);

  useEffect(() => {
    if (chatData && chatData.messages && chatData.messages.length > 0) {
      const transformedMessages = transformApiMessages(chatData.messages);
      setMessages(transformedMessages.reverse()); // Reverse to show latest at bottom
    } else {
      setMessages([]);
    }
  }, [chatData, userId, friendName]);

  const handleSend = async () => {
    if ((text.trim().length === 0 && selectedMedia.length === 0) || isLoading)
      return;

    const currentUserId = currentUser?.user?._id || currentUser?._id;
    const receiverId = friendId;

    if (!currentUserId || !receiverId) {
      console.error('Missing sender or receiver ID');
      return;
    }

    setIsLoading(true);

    try {
      const messageData: any = {
        senderId: currentUserId,
        receiverId: receiverId,
      };

      // Always include text content if present, even with media
      if (text.trim().length > 0) {
        messageData.text = text.trim();
      }

      // Handle media attachments
      if (selectedMedia.length > 0) {
        messageData.files = selectedMedia;
        messageData.messageType = 'image';
      }

      // Call the API
      await sendChatMessage(messageData);

      // Add message to local state for immediate UI update
      const newMessage: Message = {
        _id: Date.now().toString(),
        createdAt: new Date(),
        user: {_id: currentUserId, name: 'You'},
        type:
          selectedMedia.length > 0
            ? selectedMedia.length === 1
              ? 'image'
              : 'multi-image'
            : 'text',
      };

      // Add text if present - text can be included with any message type
      if (text.trim().length > 0) {
        newMessage.text = text.trim();
      }

      // Add images if present
      if (selectedMedia.length > 0) {
        if (selectedMedia.length === 1) {
          newMessage.image = selectedMedia[0].uri;
        } else {
          newMessage.images = selectedMedia
            .map(media => media.uri || '')
            .filter(uri => uri !== '');
        }
      }

      setMessages(prev => [newMessage, ...prev]);

      // Clear inputs on success
      setText('');
      setSelectedMedia([]);

      // Note: We're not emitting via socket here as we're only using socket for receiving messages
      // The API call above will handle sending the message to the server
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttach = async () => {
    try {
      const assets = await pickMedia({
        mediaType: 'photo',
        selectionLimit: 5,
        includeBase64: false,
      });

      if (assets.length > 0) {
        setSelectedMedia(assets);
        Alert.alert('Media selected', `${assets.length} file(s) ready to send`);
      }
    } catch (error) {
      console.error('Error selecting media:', error);
      Alert.alert('Error', 'Failed to select media. Please try again.');
    }
  };

  const handleVoice = async () => {
    // const hasPermission = await checkAudioPermissions();
    // if (!hasPermission) {
    //   // Permission handling is done in the checkAudioPermissions function
    //   return;
    // }

    if (recording) {
      try {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecording(false);
        setRecordingTime(0);

        const currentUserId = currentUser?.user?._id || currentUser?._id;
        if (!currentUserId) return;

        // Send audio message
        const messageData: any = {
          senderId: currentUserId,
          receiverId: friendId,
          audio: result,
          messageType: 'audio',
        };

        // Audio messages can include text if present
        if (text.trim().length > 0) {
          messageData.text = text.trim();
          setText('');
        }

        setIsLoading(true);
        try {
          await sendChatMessage(messageData);

          // Add to local messages
          const newMessage = formatMediaMessage('audio', result, currentUserId);
          if (text.trim().length > 0) {
            newMessage.text = text.trim();
          }
          setMessages(prev => [newMessage as Message, ...prev]);

          // Note: We're not emitting via socket as we're only using socket for receiving messages
          // The API call above will handle sending the message to the server
        } catch (error) {
          console.error('Error sending audio message:', error);
          Alert.alert('Error', 'Failed to send audio message');
        } finally {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
        setRecording(false);
        setRecordingTime(0);
      }
    } else {
      try {
        const path = getAudioPath();
        audioPath.current = path;
        await audioRecorderPlayer.startRecorder(path);

        // Add recording listener to update recording time
        audioRecorderPlayer.addRecordBackListener(e => {
          setRecordingTime(e.currentPosition);
        });

        setRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
        Alert.alert('Error', 'Failed to start recording');
      }
    }
  };

  const renderItem = ({item}: {item: Message}) => {
    const currentUserId = currentUser?.user?._id || currentUser?._id;
    const isSender = item.user._id === currentUserId;
    const containerStyle = isSender
      ? styles.senderBubble
      : styles.receiverBubble;
    return (
      <View style={{marginBottom: 10}}>
        <View
          style={{
            flexDirection: isSender ? 'row-reverse' : 'row',
            alignItems: 'center',
          }}>
          {!isSender && (
            <View style={styles.profileWrapper}>
              <Image source={item.user.avatar} style={styles.profileImage} />
              <View
                style={[styles.activeDot, {borderColor: backgroundColor}]}
              />
            </View>
          )}

          {item.type === 'image' ? (
            <View
              style={[
                styles.messageBubble,
                containerStyle,
                {
                  backgroundColor: isSender
                    ? Colors.primaryColor
                    : inputBackground,
                },
              ]}>
              <Image
                source={{uri: item.image}}
                style={styles.bubbleImage}
                onError={error =>
                  console.error(
                    'Image loading error:',
                    error.nativeEvent.error,
                    'URI:',
                    item.image,
                  )
                }
              />
              {item.text ? (
                <Text
                  style={[
                    styles.messageText,
                    {
                      color: isSender ? Colors.white : textColor,
                      marginTop: 8,
                    },
                  ]}>
                  {item.text}
                </Text>
              ) : null}
            </View>
          ) : item.type === 'multi-image' ? (
            <View
              style={[
                styles.messageBubble,
                containerStyle,
                {width: 250},
                {
                  backgroundColor: isSender
                    ? Colors.primaryColor
                    : inputBackground,
                },
              ]}>
              <FlatList
                data={item.images}
                horizontal
                showsHorizontalScrollIndicator={true}
                keyExtractor={(_, index) => `image-${index}`}
                renderItem={({item: imageUri}) => (
                  <Image
                    source={{uri: imageUri}}
                    style={[
                      styles.bubbleImage,
                      {marginRight: 5, width: 150, height: 150},
                    ]}
                    onError={error =>
                      console.error(
                        'Image loading error:',
                        error.nativeEvent.error,
                        'URI:',
                        imageUri,
                      )
                    }
                  />
                )}
              />
              <Text style={{color: 'white', marginTop: 5, textAlign: 'center'}}>
                {item.images?.length} Photos
              </Text>
              {item.text ? (
                <Text
                  style={[
                    styles.messageText,
                    {
                      color: isSender ? Colors.white : textColor,
                      marginTop: 8,
                      textAlign: 'center',
                    },
                  ]}>
                  {item.text}
                </Text>
              ) : null}
            </View>
          ) : item.type === 'audio' ? (
            <View
              style={[
                styles.messageBubble,
                containerStyle,
                {
                  backgroundColor: isSender
                    ? Colors.primaryColor
                    : inputBackground,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AnySvg name="micIcon" width={24} height={24} />
                  {currentlyPlaying === item._id ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 8,
                      }}>
                      <Text
                        style={{color: isSender ? Colors.white : textColor}}>
                        {playbackTime[item._id]
                          ? `${Math.floor(playbackTime[item._id] / 1000)} sec`
                          : '0 sec'}
                        {playbackDuration[item._id]
                          ? ` / ${Math.floor(
                              playbackDuration[item._id] / 1000,
                            )} sec`
                          : ''}
                      </Text>
                      <TouchableOpacity
                        style={{marginLeft: 10}}
                        onPress={() => {
                          if (currentlyPlaying === item._id) {
                            audioRecorderPlayer.stopPlayer();
                            audioRecorderPlayer.removePlayBackListener();
                            setCurrentlyPlaying(null);
                            setPlaybackTime(prev => ({...prev, [item._id]: 0}));
                          }
                        }}>
                        <Text
                          style={{color: isSender ? Colors.white : textColor}}>
                          ■ Stop
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={{marginLeft: 8}}
                      onPress={async () => {
                        try {
                          // Stop any currently playing audio
                          if (currentlyPlaying) {
                            await audioRecorderPlayer.stopPlayer();
                            audioRecorderPlayer.removePlayBackListener();
                          }

                          // Start playing the new audio
                          setCurrentlyPlaying(item._id);
                          await audioRecorderPlayer.startPlayer(item.audio);

                          audioRecorderPlayer.addPlayBackListener(e => {
                            setPlaybackTime(prev => ({
                              ...prev,
                              [item._id]: e.currentPosition,
                            }));
                            setPlaybackDuration(prev => ({
                              ...prev,
                              [item._id]: e.duration,
                            }));

                            if (e.currentPosition === e.duration) {
                              audioRecorderPlayer.stopPlayer();
                              audioRecorderPlayer.removePlayBackListener();
                              setCurrentlyPlaying(null);
                              setPlaybackTime(prev => ({
                                ...prev,
                                [item._id]: 0,
                              }));
                            }
                          });
                        } catch (error) {
                          console.warn('Audio play error:', error);
                        }
                      }}>
                      <Text
                        style={{color: isSender ? Colors.white : textColor}}>
                        ▶️ Play
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {item.text && (
                <Text
                  style={[
                    styles.messageText,
                    {
                      color: isSender ? Colors.white : textColor,
                      marginTop: 8,
                    },
                  ]}>
                  {item.text}
                </Text>
              )}
            </View>
          ) : (
            <View
              style={[
                styles.messageBubble,
                containerStyle,
                {
                  backgroundColor: isSender
                    ? Colors.primaryColor
                    : inputBackground,
                },
              ]}>
              <Text
                style={[
                  styles.messageText,
                  {
                    color: isSender ? Colors.white : textColor,
                  },
                ]}>
                {item.text || '(No text)'}
              </Text>
            </View>
          )}

          <Text
            style={[styles.timeText, {marginHorizontal: 6, marginBottom: 20}]}>
            {item.createdAt instanceof Date
              ? item.createdAt.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '12:30 PM'}
          </Text>
        </View>

        {/* {isSender && (
          <Text style={[styles.seenText, {color: Colors.primaryColor}]}>
            Seen
          </Text>
        )} */}
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}>
          <AnySvg
            name={isDarkMode ? 'backArrow' : 'lightBackArrow'}
            width={24}
            height={24}
          />
        </TouchableOpacity>

        <View style={styles.centerHeader}>
          <View style={[styles.profileWrapper]}>
            <Image
              source={IMAGES.member1}
              style={[
                styles.profileImage,
                {borderColor: Colors.green, borderWidth: 2},
              ]}
            />
          </View>
          <View>
            <Text style={[styles.nameText, {color: textColor}]}>
              {friendName || 'Friend'}
            </Text>
            <Text style={styles.activeNow}>Active Now</Text>
          </View>
        </View>
      </View>

      {/* <Text style={[styles.dateText, {color: textColor}]}>Sunday 13 Oct</Text> */}

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={messages}
          inverted
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 12}}
          renderItem={renderItem}
        />

        <View
          style={[styles.inputContainer, {backgroundColor: inputBackground}]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={handleAttach}>
            <AnySvg name="attachment" width={24} height={24} />
          </TouchableOpacity>

          <TextInput
            value={text}
            onChangeText={setText}
            style={[styles.textInput, {color: textColor}]}
            placeholder={
              selectedMedia.length > 0
                ? `Type a message - ${selectedMedia.length} media attached`
                : t('Type a message')
            }
            placeholderTextColor={'#424242'}
          />

          {selectedMedia.length > 0 && (
            <TouchableOpacity
              style={[styles.iconWrapper]}
              onPress={() => setSelectedMedia([])}>
              <Text style={{color: Colors.primaryColor}}>Clear</Text>
            </TouchableOpacity>
          )}

          <View style={styles.verticalSeparator} />

          {recording ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 8,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AnySvg name="micIcon" width={20} height={20} />
                <Text
                  style={{
                    color: Colors.red,
                    marginLeft: 4,
                    marginRight: 8,
                    fontWeight: 'bold',
                  }}>
                  {`${Math.floor(recordingTime / 1000)} sec`}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: Colors.red,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                  },
                ]}
                onPress={handleVoice}>
                <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                  ■ Send
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.iconWrapper} onPress={handleVoice}>
              <AnySvg
                name={isDarkMode ? 'micIcon' : 'lightMic'}
                width={24}
                height={24}
              />
            </TouchableOpacity>
          )}

          {recording ? null : (
            <TouchableOpacity
              style={[styles.iconWrapper, isLoading && {opacity: 0.6}]}
              onPress={handleSend}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <AnySvg name="sendIcon" width={24} height={24} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommunityChat;
