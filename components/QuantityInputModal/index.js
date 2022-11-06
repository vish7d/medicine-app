import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Text, Modal, Pressable, Image,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import PropTypes from 'prop-types';
import Toast from 'react-native-root-toast';
import commonStyles from '../../styles/styles';
import { useCartItems } from '../../context/globalContext';
import CustomButton from '../CustomButton';
import CloseIcon from '../../assets/close.png';

function QuantityInputModal({ medicineDetails, showQuantityModal, closeQuantityModal }) {
  const [file, setFile] = useState(null);
  const [cartItems, setCartItems] = useCartItems();

  const addItemtoCart = (quantity) => {
    setCartItems([...cartItems, { ...medicineDetails, quantity }]);
    Toast.show('Item aded to cart.', {
      duration: Toast.durations.SHORT,
      backgroundColor: '#AAFBA4',
      textColor: 'black',
      position: -60,
    });
    closeQuantityModal();
  };

  const handleDocumentUpload = async () => {
    const response = await DocumentPicker.getDocumentAsync();
    setFile(response);
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showQuantityModal}
    >
      <View style={styles.quantityInput}>
        <View style={{ justifyContent: 'flex-end', width: '100%', flexDirection: 'row' }}>
          <Pressable
            onPress={closeQuantityModal}
          >
            <Image source={CloseIcon} style={{ height: 25, width: 25 }} />
          </Pressable>
        </View>

        <Text style={commonStyles.title}>{medicineDetails.name}</Text>
        <Text style={commonStyles.subTitle}>{`Per item cost: $${medicineDetails.price}`}</Text>

        {medicineDetails.prescriptionRequired && (
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text style={{
              fontSize: 15, textAlign: 'center', fontWeight: '500',
            }}
            >
              Upload the prescription to proceed.
            </Text>

            {!file ? (
              <View style={{ margin: 5, width: 100 }}>
                <CustomButton title="Upload" onPress={handleDocumentUpload} />
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <Text>{`Selected file: ${file.name}`}</Text>
                <Pressable style={{ marginHorizontal: 10 }} onPress={() => { handleRemove(); }}>
                  <Text style={{ color: 'red', textDecorationLine: 'underline' }}>Remove</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}

        {medicineDetails.prescriptionRequired && file && (
          <QuantityInputField
            addItemtoCart={addItemtoCart}
            closeQuantityModal={closeQuantityModal}
          />
        )}

        {!medicineDetails.prescriptionRequired && (
        <QuantityInputField
          addItemtoCart={addItemtoCart}
          closeQuantityModal={closeQuantityModal}
        />
        )}

      </View>
    </Modal>
  );
}

QuantityInputModal.propTypes = {
  medicineDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    prescriptionRequired: PropTypes.bool.isRequired,
  }).isRequired,
  showQuantityModal: PropTypes.bool.isRequired,
  closeQuantityModal: PropTypes.func.isRequired,
};

export default QuantityInputModal;

function QuantityInputField({ addItemtoCart, closeQuantityModal }) {
  const [quantity, setQuantity] = useState(0);
  return (
    <>
      <TextInput
        value={quantity}
        style={commonStyles.input}
        placeholder="Enter Quantity"
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <View style={{ flexDirection: 'row' }}>
        <View style={{ margin: 5, width: 100 }}>
          <CustomButton title="Add" onPress={() => addItemtoCart(quantity)} />
        </View>

        <View style={{ margin: 5, width: 100 }}>
          <CustomButton title="Cancel" onPress={closeQuantityModal} color="#ff4d4d" />
        </View>
      </View>
    </>
  );
}

QuantityInputField.propTypes = {
  addItemtoCart: PropTypes.func.isRequired,
  closeQuantityModal: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  quantityInput: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 3,
  },
});
