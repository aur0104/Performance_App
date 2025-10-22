import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import AnySvg from '../AnySvg';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import {IMAGES} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

interface AccountReadyModalProps {
  visible: boolean;
  message: string;
  navigateTo: string;
}

const SuccessModal: React.FC<AccountReadyModalProps> = ({
  visible,
  message,
  navigateTo,
}) => {
  const {t} = useTranslation();
  const rotation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ).start();

      const timeout = setTimeout(() => {
        navigation.navigate(navigateTo as never);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [visible, navigateTo]);

  const rotateStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconWrapper}>
            <AnySvg name="doneIcon" size={185} />
          </View>
          <Text style={styles.title}>{t('Congratulations!')}</Text>
          <Text style={styles.message}>{t(message)}</Text>
          <View style={styles.loaderContainer}>
            <Animated.Image
              source={IMAGES.loader}
              style={[styles.loader, rotateStyle]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    width: '80%',
    height: 470,
    backgroundColor: Colors.white,
    borderRadius: 44,
    paddingTop: 40,
    paddingRight: 32,
    paddingBottom: 32,
    paddingLeft: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: fonts.UrbanistBold,
    color: Colors.black,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 0,
    color: Colors.black,
    fontFamily: fonts.UrbanistRegular,
  },
  loaderContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  loader: {
    width: 60,
    height: 60,
  },
});

export default SuccessModal;
