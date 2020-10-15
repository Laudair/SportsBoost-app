import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Formik,
  SafeAreaView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ContextUser } from './context/ContextUser';
import app from './../constants/ApiKeys';

function ContactUs({ navigation }) {
  const [emailUser, setEmailUser] = useContext(ContextUser);
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState();
  const [render, setRender] = useState(false);

  const postMessage = () => {
    const db = app.firestore();
    const data = {
      message,
      emailUser,
    };
    db.collection('messages')
      .doc()
      .set(data)
      .then(() => setRender(!render))
      .catch((error) => {
        alert(error);
      });
    setMessage('');
    alert('We will get back to you soon!');
  };

  useEffect(() => {
    const db = app.firestore();
    const fetchData = async () => {
      const data = await db.collection('users').where('email', '==', emailUser).get();
      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, [render]);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Contact Us</Text>
        <View>
          <Text style={styles.textWhite}>From:</Text>
          {userData.map((users) => (
            <Text style={styles.textDetails}>{users.fullName}</Text>
          ))}
          {userData.map((users) => (
            <Text style={styles.textDetails}>{users.email}</Text>
          ))}
        </View>
        <Text style={styles.textMessage}>Message:</Text>
        <View style={styles.textBox}>
          <TextInput
            style={styles.inputBox}
            multiline={true}
            maxLength={250}
            clearButtonMode="always"
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <TouchableOpacity onPress={() => postMessage() & setRender(!render)}>
          <Text style={styles.buttonGrants}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonGrants: {
    backgroundColor: '#fff',
    borderRadius: 30,
    color: '#999',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginLeft: wp('33.3%'),
    marginRight: 20,
    marginTop: hp('8%'),
    overflow: 'hidden',
    padding: 20,
    textAlign: 'center',
    width: wp('30%'),
  },
  container: {
    alignItems: 'center',
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
  inputBox: {
    color: '#999',
    height: wp('40%'),
    marginLeft: 20,
    width: wp('80%'),
  },
  text: {
    color: '#000',
    fontSize: hp('2.7%'),
    marginLeft: hp('3%'),
    marginRight: hp('3%'),
    marginTop: hp('6%'),
    textAlign: 'center',
  },
  textBox: {
    alignContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#707070',
    borderRadius: 5,
    borderWidth: 1,
    height: hp('26%'),
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
    width: wp('90%'),
  },
  textDetails: {
    color: '#FFF',
    fontSize: hp('2%'),
    fontWeight: 'normal',
    marginLeft: hp('3%'),
    marginTop: hp('1%'),
  },
  textFullName: {
    color: '#fff',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
    marginTop: hp('5%'),
  },
  textMessage: {
    color: '#FFF',
    fontSize: hp('2%'),
    fontWeight: 'normal',
    marginLeft: hp('3%'),
    marginTop: hp('5%'),
  },
  textUnder: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'normal',
    marginLeft: wp('3%'),
    marginTop: hp('5%'),
  },
  textWhite: {
    color: '#FFF',
    fontSize: hp('2.7%'),
    fontWeight: 'bold',
    marginLeft: hp('3%'),
    marginTop: hp('5%'),
  },
  textWrapper: {
    height: hp('80%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  title: {
    color: '#fff',
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    marginTop: hp('10%'),
    textAlign: 'center',
  },
});
export default ContactUs;
