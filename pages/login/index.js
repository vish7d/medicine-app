import {
  StyleSheet, Text, View, TextInput, Image, Pressable,
} from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDatabase, ref, get } from 'firebase/database';
import commonStyles from '../../styles/styles';
import { useUserDetails } from '../../context/globalContext';
import PersonProfileIcon from '../../assets/profile-person-icon.png';
import CustomButton from '../../components/CustomButton';

function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [, setUserDetails] = useUserDetails();

  const db = getDatabase();

  const onLoginPress = async () => {
    setErrorMessage(null);
    if (!username || !password) {
      setErrorMessage('Enter Username and Password');
      return;
    }
    const userRef = ref(db, `/users/${username.toLowerCase()}`);
    const result = await get(userRef);
    if (JSON.stringify(result) === 'null') {
      setErrorMessage('Incorrect Username or Password');
      return;
    }
    if (result.toJSON().password !== password) {
      setErrorMessage('Incorrect Username or Password');
      return;
    }
    setUserDetails({ id: username, fullname: result.toJSON().fullname });
    setUsername('');
    setPassword('');
    navigation.navigate('Dashboard');
  };
  return (
    <View style={styles.loginPageContainer}>
      <View style={{ marginVertical: 50, alignItems: 'center' }}>
        <Text style={styles.appTitle}>Pharma-Store</Text>
        <Text style={styles.appDescription}>Medicine delivered at your door step.</Text>
      </View>

      <Image source={PersonProfileIcon} style={{ height: 60, width: 60, borderRadius: 30 }} />
      <Text style={styles.loginHeading}>Welcome</Text>
      <Text style={{ fontSize: 20, color: 'grey', marginBottom: 15 }}>Sign in</Text>

      <View style={{ marginBottom: 15 }}>
        <TextInput
          style={errorMessage ? styles.input : commonStyles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          textAlign="center"
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <TextInput
          secureTextEntry
          style={errorMessage ? styles.input : commonStyles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          textAlign="center"
        />
      </View>

      {errorMessage && <Text style={{ color: 'red', fontSize: 15 }}>{errorMessage}</Text>}

      <View style={{ width: '50%' }}>
        <CustomButton title="Login" onPress={onLoginPress} />
      </View>

      <View style={{ flexDirection: 'row', margin: 30 }}>
        <Text style={{ fontWeight: '500', marginHorizontal: 5 }}>Don't have an account?</Text>
        <Pressable onPress={() => { navigation.navigate('Signup'); }}>
          <Text style={{ fontWeight: '800', color: 'blue' }}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

LoginPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginPage;

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
