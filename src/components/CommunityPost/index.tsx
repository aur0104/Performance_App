import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Share from 'react-native-share';
import mime from 'mime';

import Video from 'react-native-video';
import {Colors} from '../../utils/Colors';
import AnySvg from '../AnySvg';
import {hp} from '../../utils/responsivesness';
import fonts from '../../utils/Fonts';

interface PostProps {
  profileImage: any;
  name: string;
  timeAgo: string;
  description: string;
  postImage?: any; // Keep for backward compatibility
  postImages?: any[]; // New prop for multiple images
  postVideos?: any[]; // New prop for videos
  postMedia?: {uri: string; type: 'image' | 'video'}[]; // Combined media prop
  likes: string;
  comments: string;
}

const PostComponent: React.FC<PostProps> = ({
  profileImage,
  name,
  timeAgo,
  description,
  postImage,
  postImages,
  likes,
  comments,
}) => {
  const {t} = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<any[]>([]);

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth - 40; // Considering padding

  // Set images when props change
  useEffect(() => {
    if (postImages && postImages?.length > 0) {
      setImages(postImages);
    } else if (postImage) {
      setImages([postImage]);
    } else {
      setImages([]);
    }
    // const newImages =
    //   postImages && postImages.length > 0
    //     ? postImages
    //     : postImage
    //     ? [postImage]
    //     : [];
    // setImages(newImages);
  }, [postImages, postImage]);

  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);

  const textColor = isDarkMode ? Colors.white : Colors.black;
  const background = isDarkMode ? Colors.darkInputBg : Colors.lightBackground;
  const textColor2 = isDarkMode ? '#CBCBCB' : Colors.black;
  const separaterColor = isDarkMode ? Colors.darkInputBg : '#E0E0E0';

  const handleShare = async () => {
    try {
      // Prepare share content
      const shareMessage = `${description}\n\nShared by ${name}`;

      const shareOptions = {
        title: 'Share Post',
        message: shareMessage,
        url: images.length > 0 ? images[0]?.uri || undefined : undefined, // Include first image URL if available
        type: images.length > 0 ? 'image/*' : 'text/plain',
        showAppsToView: true,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Share error:', error);
      // Alert.alert('Error', 'Failed to share post');
    }
  };

  const isVideoUrl = (url: string): boolean => {
    try {
      // Extract file extension from URL
      const extension = url.split('.').pop();
      if (!extension) return false;

      // Lookup MIME type from extension
      const mimeType = mime.getType(extension);

      // Check if it starts with "video/"
      return mimeType?.startsWith('video/') ?? false;
    } catch {
      return false;
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <View style={styles.headerRow}>
        <View style={styles.profileSection}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={{marginLeft: 10}}>
            <Text style={[styles.nameText, {color: textColor}]}>{name}</Text>
            <Text style={styles.timeText}>{timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <AnySvg name="sharePost" width={18} height={18} />
          <Text style={[styles.shareText, {color: textColor}]}>
            {t('Share')}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.description, {color: textColor2}]}>
        {description}
      </Text>
      {images.length > 0 ? (
        <View style={styles.imageContainer}>
          <FlatList
            data={images}
            horizontal
            pagingEnabled={images.length > 1}
            scrollEnabled={images.length > 1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={imageWidth}
            decelerationRate="fast"
            bounces={false}
            onMomentumScrollEnd={event => {
              const slideIndex = Math.round(
                event.nativeEvent.contentOffset.x / imageWidth,
              );
              setCurrentImageIndex(slideIndex);
            }}
            renderItem={({item}) => (
              <View style={{width: imageWidth}}>
                {isVideoUrl(item) ? (
                  <Video
                    controls
                    playWhenInactive={false}
                    paused
                    source={{uri: item}}
                    style={styles.postImage}
                  />
                ) : (
                  <Image
                    source={{uri: item}}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                )}
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          {images.length > 1 && (
            <View style={styles.paginationContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    {
                      backgroundColor:
                        index === currentImageIndex ? '#4A90E2' : '#D3D3D3',
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      ) : (
        <View style={{height: 6}} />
      )}

      <View style={styles.reactionRow}>
        <View style={styles.reactionItem}>
          <AnySvg
            name={isDarkMode ? 'fillLike' : 'lightLike'}
            width={18}
            height={18}
          />
          <Text style={[styles.reactionText, {color: textColor}]}>{likes}</Text>
        </View>
        <Text style={[styles.reactionText, {color: textColor2}]}>
          {comments} {t('comments')}
        </Text>
      </View>
      <View style={[styles.separator, {backgroundColor: separaterColor}]} />
      <View style={[styles.reactionRow, {marginTop: hp(2)}]}>
        <TouchableOpacity
          style={styles.reactionItem}
          onPress={() => setIsLiked(!isLiked)}>
          <AnySvg name={isLiked ? 'fillLike' : 'likeIcon'} size={18} />
          <Text style={[styles.reactionText, {color: '#B6CFEB'}]}>
            {t('Like')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reactionItem}
          onPress={() => setShowCommentInput(!showCommentInput)}>
          <AnySvg name="commentIcon" width={18} height={18} />
          <Text style={[styles.reactionText, {color: '#B6CFEB'}]}>
            {t('Comment')}
          </Text>
        </TouchableOpacity>
      </View>
      {showCommentInput && (
        <>
          <View style={[styles.separator, {backgroundColor: '#CBCBCB'}]} />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              multiline={true}
              numberOfLines={3}
              placeholder={t('Write a comment')}
              placeholderTextColor={Colors.placeholderColor}
              style={{
                flex: 1,
                fontSize: 15,
                fontFamily: fonts.UrbanistMedium,
                color: textColor,
                paddingTop: 8,
                paddingBottom: 0,
                textAlignVertical: 'top',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (commentText.trim()) {
                  setCommentText('');
                }
              }}>
              <AnySvg
                name="sendIcon"
                width={28}
                height={28}
                svgStyle={{marginBottom: 20}}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameText: {
    fontSize: 16,
    marginBottom: 2,
    fontFamily: fonts.UrbanistBold,
  },
  timeText: {
    fontSize: 14,
    color: '#B6CFEB',
    fontFamily: fonts.UrbanistMedium,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: fonts.UrbanistMedium,
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: fonts.UrbanistMedium,
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 6,
  },
  postImage: {
    width: '100%',
    height: 145,
    borderRadius: 9,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  reactionRow: {
    gap: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    marginLeft: 6,
    fontSize: 15,
  },
  separator: {
    height: 0.6,
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
  },
});
