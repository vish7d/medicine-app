import {
  StyleSheet, Text, View, TextInput, Image, Pressable, ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getDatabase, ref, get, set,
} from 'firebase/database';
import Toast from 'react-native-root-toast';
import commonStyles from '../../styles/styles';
import { useUserDetails } from '../../context/globalContext';
import PersonProfileIcon from '../../assets/profile-person-icon.png';
import CustomButton from '../../components/CustomButton';

function SignupPage({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [, setUserDetails] = useUserDetails();

  const db = getDatabase();

  const onLoginPress = async () => {
    setErrorMessage(null);
    if (!username || !password || !fullname || !confirmPassword) {
      setErrorMessage('Enter all the details');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords does not match');
      return;
    }

    const userRef = ref(db, `/users/${username}`);
    const result = await get(userRef);
    if (JSON.stringify(result) === 'null') {
      const newUserRef = ref(db, `/users/${username}`);
      const userData = {
        fullname,
        password,
        username,
      };
      set(newUserRef, userData).then(() => {
        Toast.show('Account created.', {
          duration: Toast.durations.SHORT,
          backgroundColor: '#AAFBA4',
          textColor: 'black',
          position: -60,
        });
        setUserDetails({ id: username, fullname });
        navigation.navigate('Dashboard');
      });
    } else {
      setErrorMessage('User already exists');
    }
  };
  return (
    <ScrollView>
      <View style={styles.loginPageContainer}>
        <View style={{ marginVertical: 50, alignItems: 'center' }}>
          <Text style={styles.appTitle}>Medi-Stop</Text>
          <Text style={styles.appDescription}>One stop for all your medical needs.</Text>
        </View>

        <Image source={PersonProfileIcon} style={{ height: 60, width: 60, borderRadius: 30 }} />
        <Text style={styles.loginHeading}>Sign up</Text>
        <Text style={{ fontSize: 20, color: 'grey', marginBottom: 15 }}>Enter the below details.</Text>

        <View style={{ marginBottom: 15 }}>
          <TextInput
            style={errorMessage ? styles.input : commonStyles.input}
            value={fullname}
            onChangeText={setFullname}
            placeholder="Your full name"
            textAlign="center"
          />
        </View>

        <View style={{ marginBottom: 15 }}>
          <TextInput
            style={errorMessage ? styles.input : commonStyles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Specify a username"
            textAlign="center"
          />
        </View>

        <View style={{ marginBottom: 15 }}>
          <TextInput
            secureTextEntry
            style={errorMessage ? styles.input : commonStyles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Set Password"
            textAlign="center"
          />
        </View>

        <View style={{ marginBottom: 15 }}>
          <TextInput
            secureTextEntry
            style={errorMessage ? styles.input : commonStyles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            textAlign="center"
          />
        </View>

        {errorMessage && <Text style={{ color: 'red', fontSize: 15 }}>{errorMessage}</Text>}

        <View style={{ width: '50%' }}>
          <CustomButton title="Signup" onPress={onLoginPress} />
        </View>

        <View style={{ flexDirection: 'row', margin: 30 }}>
          <Text style={{ fontWeight: '500', marginHorizontal: 5 }}>Already an existing user?</Text>
          <Pressable onPress={() => { navigation.navigate('Login'); }}>
            <Text style={{ fontWeight: '800', color: 'blue' }}>Log in</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

SignupPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignupPage;

const styles = StyleSheet.create({
  loginPageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  appTitle: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  appDescription: {
    fontSize: 20,
  },
  loginHeading: {
    fontWeight: '600',
    fontSize: 25,
  },
  input: {
    height: 45,
    width: 260,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffb3b3',
  },
});
