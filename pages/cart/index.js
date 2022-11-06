import React from 'react';
import {
  View, Text, StyleSheet, FlatList, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import Toast from 'react-native-root-toast';
import commonStyles from '../../styles/styles';
import { useCartItems, useUserDetails } from '../../context/globalContext';
import { calculateCartTotal, updateCartDataWithDate } from './utils';
import CustomButton from '../../components/CustomButton';

function CartPage({ navigation }) {
  const [cartItems, setCartItems] = useCartItems();
  const [userDetails] = useUserDetails();
  const total = calculateCartTotal(cartItems);

  const submitOrder = () => {
    const orderId = uuidv4();
    const updatedCartData = updateCartDataWithDate(cartItems, orderId);
    const db = getDatabase();
    const reference = ref(db, `orders/${userDetails.id}/${orderId}`);
    set(reference, updatedCartData).then(() => {
      setCartItems([]);
      Toast.show('Order Placed.', {
        duration: Toast.durations.SHORT,
        backgroundColor: '#AAFBA4',
        textColor: 'black',
        position: -60,
      });
      navigation.navigate('Medicines');
    });
  };

  if (cartItems.length > 0) {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.itemsHeaderLayout}>
          <Text style={styles.tableHeader}>Items</Text>
          <Text style={styles.tableHeader}>Price</Text>
        </View>

        <FlatList
          style={{ width: '100%' }}
          data={cartItems}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) => item.id}
        />

        <View style={{ width: '100%', alignItems: 'flex-end', paddingHorizontal: 25 }}>
          <Text style={commonStyles.title}>
            Total: $
            {total}
          </Text>
        </View>

        <View style={{ margin: 10, width: '50%' }}>
          <CustomButton title="Order" onPress={() => { submitOrder(); }} />
        </View>
      </View>
    );
  }
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Text style={{ fontSize: 35, fontWeight: '800' }}>Your cart is empty!</Text>
      <Text style={{ fontSize: 20 }}>Add items to cart to order.</Text>
    </View>
  );
}

CartPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

function CartItem({ item }) {
  const [cartItems, setCartItems] = useCartItems();

  const handleRemove = (obj) => {
    const res = cartItems.filter((x) => (
      x.id !== obj.id
    ));
    setCartItems(res);
  };

  return (
    <View style={styles.cartItem}>
      <View>
        <Text style={commonStyles.title}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={commonStyles.subTitle}>
            {`Qty: ${item.quantity}`}
          </Text>
          <Pressable style={{ marginHorizontal: 10 }} onPress={() => { handleRemove(item); }}>
            <Text style={{ color: 'red' }}>Remove</Text>
          </Pressable>
        </View>
      </View>

      <Text style={{ fontWeight: '600', fontSize: 20 }}>
        {`$ ${item.quantity * item.price}`}
      </Text>
    </View>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartPage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  cartItem: {
    marginVertical: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  itemsHeaderLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderBottomWidth: 2,
  },
  tableHeader: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
