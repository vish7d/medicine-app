import React from 'react';
import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { initializeApp } from 'firebase/app';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import Dashboard from './pages/dashboard';
import MedicinesPage from './pages/medicines';
import CartPage from './pages/cart';
import TransactionsPage from './pages/transactions';
import DoctorAppointmentPage from './pages/doctorAppointment';
import LabAppointmentPage from './pages/labAppointment';

import { GolbalContextProvider } from './context/globalContext';

const firebaseConfig = {
  apiKey: process.env.APP_KEY,
  databaseURL: 'https://medicine-app-73bbf-default-rtdb.firebaseio.com',
  authDomain: 'medicine-app-73bbf.firebaseapp.com',
  projectId: 'medicine-app-73bbf',
  storageBucket: 'medicine-app-73bbf.appspot.com',
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID,
};
initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <GolbalContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerStyle: { backgroundColor: '#4d94ff' } }}>
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: true, headerBackVisible: false }} />
            <Stack.Screen name="Medicines" component={MedicinesPage} options={{ headerShown: true }} />
            <Stack.Screen name="DoctorAppointment" component={DoctorAppointmentPage} options={{ headerShown: true, title: 'Doctor Appointment' }} />
            <Stack.Screen name="LabAppointment" component={LabAppointmentPage} options={{ headerShown: true, title: 'Lab Appointment' }} />
            <Stack.Screen name="Cart" component={CartPage} options={{ headerShown: true }} />
            <Stack.Screen name="Transactions" component={TransactionsPage} options={{ headerShown: true }} />
          </Stack.Navigator>
        </NavigationContainer>
      </GolbalContextProvider>
    </RootSiblingParent>
  );
}
