import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles"; // Import your color constants here
import { LightningAddress } from "@getalby/lightning-tools";
import { l } from "@log";


const PaymentModal = ({ isVisible, onClose, contact }) => {
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentRequest, setPaymentRequest] = React.useState("");
  const TAG = '[PaymentModal] ';  


  const handleConfirmPayment = async () => {
    // Handle payment logic here
    console.log('Payment initiated with amount:', amount);
    setShowConfirmation(false);
    try {
      const lightningAddress = new LightningAddress(contact?.lud16);
      await lightningAddress.fetch();
      const invoice = await lightningAddress.requestInvoice({
        satoshi: amount,
      });
      setPaymentRequest(invoice.paymentRequest);
      l(TAG, "Payment request:", invoice.paymentRequest);
    } catch (error) {
      console.error(error);
    }

    onClose();
  };

  const handlePay = () => {
    if (amount) {
      setShowConfirmation(true);
    } else {
      alert('Please enter a valid amount.');
    }
  };

  if (!isVisible) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          Enter Zap amount for {contact.username}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
        {showConfirmation && (
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
              Are you sure to pay {amount} sats to {contact.username}?
            </Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowConfirmation(false)}>
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: SECONDARY_COLOR,
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: windowWidth * 0.9, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: windowWidth * -0.45 }, { translateY: windowHeight * -0.4 }],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: DARK_GREY,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  payButton: {
    backgroundColor: SECONDARY_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  confirmationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  confirmationButtons: {
    flexDirection: 'row',
  },
  confirmButton: {
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PaymentModal;
