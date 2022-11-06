import React from 'react';
import { View, Image } from 'react-native';
import Construction from '../../assets/construction.png';

function LabAppointmentPage() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <Image source={Construction} />
    </View>
  );
}

export default LabAppointmentPage;

