import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useUserDetails } from '../../context/globalContext';
import commonStyles from '../../styles/styles';
import LogoutImg from '../../assets/logout.png';
import MedicinesIcon from '../../assets/medicines.png';
import DoctorAppointmentIcon from '../../assets/appointment.png';
import LabAppointmentIcon from '../../assets/medical_appointment.png';

function Dashboard({ navigation }) {
  const [userDetails] = useUserDetails();
  const userfullname = userDetails.fullname || '';

  const formattedUsername = () => `${userfullname?.charAt(0)?.toUpperCase()}${userfullname.slice(1)}`;

  return (
    <View style={styles.dashboardPageContainer}>
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>{`Welcome ${formattedUsername(userfullname)}`}</Text>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            elevation: 1,
            shadowColor: 'red',
          }}
          onPress={() => { navigation.navigate('Login'); }}
        >
          <Image style={commonStyles.tinyIcon} source={LogoutImg} />
          <Text style={{ fontWeight: '600' }}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.tilesContainer}>
        <TouchableOpacity style={styles.tile} onPress={() => { navigation.navigate('Medicines'); }}>
          <Image source={MedicinesIcon} style={{ height: 70, width: 50 }} />
          <Text style={styles.tileText}>Order Medicines</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} onPress={() => { navigation.navigate('DoctorAppointment'); }}>
          <Image source={DoctorAppointmentIcon} style={commonStyles.mediumIcon} />
          <Text style={styles.tileText}>Book Doctor Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tile} onPress={() => { navigation.navigate('LabAppointment'); }}>
          <Image source={LabAppointmentIcon} style={commonStyles.mediumIcon} />
          <Text style={styles.tileText}>Book Lab Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Dashboard;

const styles = StyleSheet.create({
  dashboardPageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 2,
  },
  pageTitle: {
    fontWeight: '500',
    fontSize: 20,
    fontStyle: 'italic',
  },
  tilesContainer: {
    justifyContent: 'space-around',
  },
  tile: {
    height: 150,
    width: 350,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 20,
    elevation: 5,
  },
  tileText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
