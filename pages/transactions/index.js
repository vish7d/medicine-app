import React, { useState, useEffect } from 'react';
import {
  View, FlatList, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { getDatabase, ref, onValue } from 'firebase/database';
import Toast from 'react-native-root-toast';
import commonStyles from '../../styles/styles';
import { useUserDetails, useCartItems } from '../../context/globalContext';
import { getAllTransactions } from './utils';
import CustomButton from '../../components/CustomButton';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const [userDetails] = useUserDetails();
  const db = getDatabase();
  const ordersRef = ref(db, `/orders/${userDetails.id}`);
  useEffect(() => {
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const transactionData = getAllTransactions(data);
      setTransactions(transactionData);
    });
  }, []);

  if (transactions.length > 0) {
    return (
      <View>
        <FlatList
          style={{ width: '100%' }}
          data={transactions}
          renderItem={({ item }) => <TransactionItem item={item} />}
          keyExtractor={(item) => item.order_id + item.id}
        />
      </View>
    );
  }
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Text style={{ fontSize: 35, fontWeight: '800' }}>No order history found.</Text>
    </View>
  );
}

function TransactionItem({ item }) {
  const [cartItems, setCartItems] = useCartItems();
  const handleReorder = () => {
    const orderItem = { ...item };
    delete orderItem.order_id;
    delete orderItem.ordere_date;
    delete orderItem.cost;
    setCartItems([...cartItems, orderItem]);
    Toast.show('Item aded to cart.', {
      duration: Toast.durations.SHORT,
      backgroundColor: '#AAFBA4',
      textColor: 'black',
      position: -60,
    });
  };

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1,
    }}
    >
      <View style={{ width: '70%' }}>
        <Text style={commonStyles.title}>{item.name}</Text>
        <Text style={commonStyles.subTitle}>
          {`Ordered on ${item.ordered_date}`}
        </Text>
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
          <Text style={{ ...commonStyles.subTitle, marginRight: 5 }}>
            {`Qty: ${item.quantity}`}
          </Text>
          <Text style={{ ...commonStyles.subTitle, marginLeft: 5 }}>
            {`Cost: $${item.cost}`}
          </Text>
        </View>

      </View>

      <View width="30%">
        <CustomButton title="Refill" onPress={handleReorder} />
      </View>
    </View>
  );
}

TransactionItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    order_id: PropTypes.string.isRequired,
    ordered_date: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
  }).isRequired,
};

export default TransactionsPage;
