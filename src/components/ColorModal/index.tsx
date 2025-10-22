import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Pressable,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';
import {IMAGES} from '../../assets/images';

type ColoredText = {
  label: string;
  color: string;
  description: string;
};

type CustomColorModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  selectableTexts: ColoredText[];
  onSelect: (color: string) => void;
};

const getBeltImage = (label: string) => {
  switch (label.toLowerCase()) {
    case 'white':
      return IMAGES.belt;
    case 'blue':
      return IMAGES.blueBelt;
    case 'purple':
      return IMAGES.purpleBelt;
    case 'brown':
      return IMAGES.brownBelt;
    case 'black':
      return IMAGES.blackBelt;
    default:
      return null;
  }
};

const CustomColorModal = ({
  visible,
  onClose,
  title,
  selectableTexts,
  onSelect,
}: CustomColorModalProps) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const {width, height} = useWindowDimensions();

  const backgroundColor = isDarkMode ? Colors.darkInputBg : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  const separatorColor = isDarkMode ? '#424242' : '#E0E0E0';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <Pressable style={[styles.modal, {backgroundColor}]}>
            <View>
              {selectableTexts.map((item, index) => {
                const beltImage = getBeltImage(item.label);
                return (
                  <View key={index} style={styles.itemBlock}>
                    <Pressable
                      style={styles.row}
                      onPress={() => {
                        onSelect(item.label);
                        onClose();
                      }}>
                      {beltImage && (
                        <Image
                          source={beltImage}
                          style={[
                            styles.beltImage,
                            {borderColor: isDarkMode ? '' : '#D4D4D4'},
                          ]}
                        />
                      )}
                      <Text style={[styles.part, {color: textColor}]}>
                        {item.label}
                      </Text>
                    </Pressable>

                    <Text style={[styles.description, {color: textColor}]}>
                      {item.description}
                    </Text>

                    {index < selectableTexts.length - 1 && (
                      <View
                        style={[
                          styles.separator,
                          {backgroundColor: separatorColor},
                        ]}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomColorModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    padding: 20,
    justifyContent: 'flex-start',
  },

  itemBlock: {
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  beltImage: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginTop: 6,
    resizeMode: 'contain',
    borderWidth: 1,
    borderRadius: 5,
  },
  part: {
    fontSize: 14,
    fontFamily: fonts.UrbanistBold,
  },
  description: {
    fontSize: 13,
    fontFamily: fonts.UrbanistRegular,
    marginLeft: 35,

    lineHeight: 18,
  },
  separator: {
    height: 1,
    marginTop: 14,
    marginBottom: 10,
    width: '100%',
  },
});
