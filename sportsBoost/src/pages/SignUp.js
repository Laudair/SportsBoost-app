import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Picker } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import app from './../constants/ApiKeys';
import RNPickerSelect from 'react-native-picker-select';
import { ContextUser } from './context/ContextUser';

function SignUp({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAthlete, setIsAthlete] = useState(false);
  const [isClub, setIsClub] = useState(false);
  const [category, setCategory] = useState('');
  const [emailUser, setEmailUser] = useContext(ContextUser);

  const styleAthlete = isAthlete ? styles.buttonTypes2 : styles.buttonTypes;
  const styleClub = isClub ? styles.buttonTypes2 : styles.buttonTypes;

  const register = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            email,
            fullName,
            category,
          };
          const usersRef = app.firestore().collection('users');
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigation.navigate('AboutUs', { user: data });
              setEmailUser(email);
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.textSignUp}>Sign up</Text>
        <Text style={styles.textFullName}>Full Name</Text>
        <TextInput
          id="fullname"
          style={styles.input}
          clearButtonMode="always"
          value={fullName}
          onChangeText={setFullName}
        />
        <Text style={styles.textFullName}>Enter your Email</Text>
        <TextInput
          autoCapitalize="none"
          id="email"
          style={styles.input}
          clearButtonMode="always"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.textFullName}>Enter your password</Text>
        <TextInput
          autoCapitalize="none"
          id="password"
          style={styles.input}
          clearButtonMode="always"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.textFullName}>Confirm your password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          clearButtonMode="always"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Text style={styles.textFullName}>Please select a category</Text>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => setIsAthlete(!isAthlete) & setIsClub(false) & setCategory('individual')}
          >
            <Text style={styleAthlete}>Individual</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsClub(!isClub) & setIsAthlete(false) & setCategory('clubs')}
          >
            <Text style={styleClub}>Club</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => register()}>
          <Text style={styles.buttonSignUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonSignUp: {
    backgroundColor: '#fff',
    borderRadius: 30,
    color: '#999',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: hp('4%'),
    overflow: 'hidden',
    padding: 20,
    textAlign: 'center',
    width: wp('90%'),
  },
  buttonTypes: {
    backgroundColor: '#fff',
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
    color: '#999',
    fontSize: hp('2.3%'),
    fontWeight: 'normal',
    marginLeft: wp('8%'),
    marginRight: wp('8%'),
    marginTop: hp('4%'),
    overflow: 'hidden',
    padding: 15,
    textAlign: 'center',
    width: wp('35%'),
  },
  buttonTypes2: {
    backgroundColor: '#FF9BA3',
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
    color: '#fff',
    fontSize: hp('2.3%'),
    fontWeight: 'normal',
    marginLeft: wp('8%'),
    marginRight: wp('8%'),
    marginTop: hp('4%'),
    overflow: 'hidden',
    padding: 15,
    textAlign: 'center',
    width: wp('35%'),
  },
  container: {
    backgroundColor: '#4BD2A0',
    flex: 1,
  },
  input: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    color: '#fff',
    marginLeft: 20,
    marginTop: 10,
    padding: 4,
    width: wp('90%'),
  },
  pickerSelect: {
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    marginTop: hp('2%'),
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingTop: 40,
    paddingVertical: 12,
  },
  textFullName: {
    color: '#fff',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: hp('2%'),
  },
  textSignUp: {
    color: '#fff',
    fontSize: hp('2.7%'),
    marginTop: hp('14%'),
    textAlign: 'center',
  },
  textWrapper: {
    height: hp('80%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
});

export default SignUp;
