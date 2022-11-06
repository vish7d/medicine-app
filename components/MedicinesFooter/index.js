import React from 'react';
import {
  View, Pressable, Text, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import commonStyles from '../../styles/styles';
import TransactionsIcon from '../../assets/transactions.png';
import CartIcon from '../../assets/cart.png';

function MedicinesFooter({ navigation }) {
  return (
    <View style={styles.medicineFooter}>
      <Pressable style={styles.footerButton} onPress={() => { navigation.navigate('Transactions'); }}>
        <Image style={commonStyles.tinyIcon} source={TransactionsIcon} />
        <Text style={{ fontWeight: '600' }}>Transactions</Text>
      </Pressable>

      <Pressable style={styles.footerButton} onPress={() => { navigation.navigate('Cart'); }}>
        <Image style={commonStyles.tinyIcon} source={CartIcon} />
        <Text style={{ fontWeight: '600' }}>Cart</Text>
      </Pressable>
    </View>
  );
}

MedicinesFooter.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MedicinesFooter;

const styles = StyleSheet.create({
  medicineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    elevation: 1,
    backgroundColor: 'white',
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
