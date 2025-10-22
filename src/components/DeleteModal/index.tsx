import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../utils/Colors';
import fonts from '../../utils/Fonts';

interface DeletePopupModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeletePopupModal: React.FC<DeletePopupModalProps> = ({
  visible,
  onCancel,
  onDelete,
}) => {
  const isDarkMode = useSelector((state: any) => state.theme?.switchDarkTheme);
  const bgColor = isDarkMode ? Colors.darkInputBg : Colors.lightInputBg;
  const textColor = isDarkMode ? Colors.white : Colors.black;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, {backgroundColor: bgColor}]}>
          <Text style={[styles.title, {color: textColor}]}>Delete</Text>
          <Text style={[styles.message, {color: textColor}]}>
            Are you sure you want to delete. Remember this action cannot be
            undone.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>No, Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteButton, {borderColor: Colors.red}]}
              onPress={onDelete}>
              <Text style={[styles.deleteButtonText, {color: Colors.red}]}>
                Yes, Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeletePopupModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: 170,
    borderRadius: 8,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 1.5, height: 2.99},
    shadowOpacity: 0.2,
    shadowRadius: 11,
    elevation: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.UrbanistBold,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: fonts.UrbanistMedium,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 80,
    width: 84,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.white,
    fontFamily: fonts.UrbanistMedium,
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: 80,
    width: 84,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 12,
    fontFamily: fonts.UrbanistMedium,
  },
});
