import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import app from './../constants/ApiKeys';
import { ContextUser } from './context/ContextUser';

function Main({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailUser, setEmailUser] = useContext(ContextUser);

  const login = async () => {
    try {
      const doLogin = await app.auth().signInWithEmailAndPassword(email, password);

      if (doLogin.user) {
        navigation.navigate('AboutUs');
        setEmailUser(email);
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Images/background.png')}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.textWelcome}>Welcome</Text>
          <Text style={styles.textJoinUs}>You're a new user? Join us now!</Text>
          <View style={styles.box}>
            <TouchableOpacity>
              <Text style={styles.buttonSignUp} onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.textUsername}>Email</Text>

          <TextInput
            autoCapitalize="none"
            id="email"
            autoComplete="off"
            style={styles.input}
            clearButtonMode="always"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.textUsername}>Password</Text>
          <TextInput
            autoCapitalize="none"
            id="password"
            style={styles.input}
            autoComplete="off"
            clearButtonMode="always"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.box}>
            <TouchableOpacity onPress={() => login()}>
              <Text style={styles.buttonLogIn}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
  },
  buttonLogIn: {
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 3,
    color: 'white',
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    marginBottom: hp('10%'),
    marginLeft: 20,
    marginRight: 20,
    marginTop: hp('12%'),
    padding: 10,
    textAlign: 'center',
    width: wp('90%'),
  },
  buttonSignUp: {
    backgroundColor: '#fff',
    borderRadius: 30,
    color: '#999',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
    overflow: 'hidden',
    padding: 20,
    textAlign: 'center',
    width: wp('90%'),
  },
  container: {
    backgroundColor: '#4BD2A0',
    flex: 1,
  },
  input: {
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    color: '#fff',
    fontSize: hp('1.8%'),
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    marginTop: 18,
    padding: 8,
    width: wp('90%'),
  },
  textJoinUs: {
    color: '#fff',
    fontSize: hp('1.8%'),
    marginLeft: wp('5%'),
    marginTop: hp('3%'),
  },
  textUsername: {
    color: '#fff',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginLeft: wp('5%'),
    marginRight: 20,
    marginTop: hp('8%'),
  },
  textWelcome: {
    color: '#fff',
    fontSize: hp('5%'),
    marginLeft: 20,
    marginTop: hp('10%'),
  },
  textWrapper: {
    // 80% of width device screen
  },
});

export default Main;
