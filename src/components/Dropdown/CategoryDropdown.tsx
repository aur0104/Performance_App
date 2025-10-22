import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './dropdownStyles';
import {Colors} from '../../utils/Colors';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import DeletePopupModal from '../DeleteModal';
import AnySvg from '../AnySvg';
import {Category} from '../../interfaces';
interface CategoryDropdownProps {
  visible: boolean;
  categories: Category[];
  selectedCategory?: Category | null;
  onSelect: (category: Category) => void;
  onClose: () => void;
  onToggle: () => void;
  showAddCategoryButton?: boolean;
  from?: 'AddReviewScreen' | 'AddTraining';
  sizeZero?: boolean;
  onPressAddCategory?: () => void;
  onPressEdit?: (category: Category) => void;
  onPressDelete?: (category: Category) => void;
}
const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  visible,
  categories,
  selectedCategory,
  onSelect,
  onClose,
  onToggle,
  from,
  sizeZero = false,
  showAddCategoryButton = false,
  onPressAddCategory,
  onPressDelete,
  onPressEdit,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const navigation = useNavigation();
  const isDark = useSelector((state: any) => state.theme.switchDarkTheme);
  const dynamicText = isDark ? Colors.white : Colors.black;
  const dynamicBg = isDark ? '#616161' : Colors.white;
  const separatorColor = isDark ? '#424242' : '#E0E0E0';
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  return (
    <>
      <TouchableOpacity
        style={[styles.dropdown, {width: sizeZero ? 0 : undefined}]}
        onPress={onToggle}>
        <Text
          style={[
            styles.dropdownText,
            selectedCategory && {color: dynamicText},
          ]}>
          {selectedCategory?.name || 'Select Category'}
        </Text>
        {sizeZero ? null : (
          <AnySvg name={isDark ? 'darkDown' : 'lightDown'} size={16} />
        )}
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={onToggle}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.popup}>
                {categories?.length > 0
                  ? categories.map((category, index) => (
                      <View key={index} style={styles.popupItemRow}>
                        <TouchableOpacity
                          key={index}
                          style={styles.popupItem}
                          onPress={() => {
                            onSelect(category);
                            onToggle();
                          }}>
                          <Text
                            style={[
                              styles.popupItemText,
                              selectedCategory?._id === category._id &&
                                styles.popupItemTextSelected,
                            ]}>
                            {category?.name}
                          </Text>
                        </TouchableOpacity>
                        {category?.isCustom && (
                          <TouchableOpacity
                            onPress={() => {
                              setCurrentCategory(category);
                              setOptionModalVisible(true);
                            }}>
                            <AnySvg name="dotsIcon" size={22} />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))
                  : null}

                {showAddCategoryButton && (
                  <TouchableOpacity
                    style={styles.addSkillRow}
                    onPress={() => {
                      onClose?.();
                      if (onPressAddCategory) onPressAddCategory();
                      // setTimeout(() => {
                      //   navigation.navigate('AddCategory' as never);
                      // }, 50);
                    }}>
                    <AnySvg name="add" size={14} />
                    <Text style={[styles.addSkillText, {color: dynamicText}]}>
                      Add Category
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        <Modal transparent visible={optionModalVisible} animationType="fade">
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setOptionModalVisible(false)}
            activeOpacity={1}>
            <View style={[styles.optionsModal, {backgroundColor: dynamicBg}]}>
              <TouchableOpacity
                onPress={() => {
                  setOptionModalVisible(false);
                  onPressEdit && onPressEdit(currentCategory);
                }}>
                <Text style={[styles.optionText, {color: dynamicText}]}>
                  Edit
                </Text>
              </TouchableOpacity>

              <View
                style={[styles.separator, {backgroundColor: separatorColor}]}
              />

              <TouchableOpacity
                onPress={() => {
                  setOptionModalVisible(false);
                  setShowDelete(true);
                }}>
                <Text style={[styles.optionText, {color: Colors.red}]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <DeletePopupModal
          visible={showDelete}
          onCancel={() => setShowDelete(false)}
          onDelete={() => {
            setShowDelete(false);
            onPressDelete && onPressDelete(currentCategory);
          }}
        />
      </Modal>
    </>
  );
};

export default CategoryDropdown;
