import React, { useContext, useEffect, useState } from 'react';
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
import app from './../constants/ApiKeys';
import { ContextUser } from './context/ContextUser';

function Profile({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [emailUser, setEmailUser] = useContext(ContextUser);
  const [userData, setUserData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [render, setRender] = useState(false);
  const [userId, setUserId] = useState('');

  const update = () => {
    const db = app.firestore();
    const data = {
      fullName,
      email,
      category,
    };
    db.collection('users')
      .doc(userId)
      .set(data)
      .then(() => setOpenEdit(false) & setRender(!render))
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    setOpenEdit(false);
    const db = app.firestore();
    const fetchData = async () => {
      const data = await db.collection('users').where('email', '==', emailUser).get();
      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setEmail(emailUser);
    };

    fetchData();
  }, [render]);

  if (openEdit) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.cardBox}>
            <Text style={styles.textButton}>Full Name</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              style={styles.input}
              clearButtonMode="always"
              value={fullName}
              onChangeText={setFullName}
            />
            <Text style={styles.textButton}>Category</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              style={styles.input}
              clearButtonMode="always"
              value={category}
              onChangeText={setCategory}
            />
          </View>
          <TouchableOpacity onPress={() => update()}>
            <Text style={styles.buttonProceed}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Profile</Text>
        <View>
          <Text style={styles.text}>NAME:</Text>
          {userData.map((users) => (
            <Text style={styles.textDetails}>{users.fullName}</Text>
          ))}
        </View>
        <View>
          <Text style={styles.text}>EMAIL:</Text>
          {userData.map((users) => (
            <Text style={styles.textDetails}>{users.email}</Text>
          ))}
        </View>
        <View>
          <Text style={styles.text}>CATEGORY:</Text>
          {userData.map((users) => (
            <Text style={styles.textDetails}>{users.category}</Text>
          ))}
          <View>
            {userData.map((users) => (
              <TouchableOpacity onPress={() => setOpenEdit(true) & setUserId(users.id)}>
                <Text style={styles.buttonProceed}>Edit</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: hp('25%'),
    overflow: 'hidden',
    padding: 20,
    textAlign: 'center',
    width: wp('90%'),
  },
  buttonProceed: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#707070',
    borderRadius: 22,
    borderWidth: 1,
    color: '#999',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginTop: hp('16%'),
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    width: wp('40%'),
  },
  cardBox: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderColor: '#707070',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'column',
    height: hp('38%'),

    marginTop: hp('10%'),
    width: wp('90%'),
  },
  container: {
    backgroundColor: '#4BD2A0',
    flex: 1,
  },
  input: {
    alignSelf: 'center',
    borderBottomColor: '#E5DEDE',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: hp('1.8%'),

    marginTop: hp('1.8%'),

    width: wp('80%'),
  },
  scrollView: {
    marginTop: hp('8.5%'),
  },
  text: {
    color: '#FFF',
    fontSize: hp('2.7%'),
    fontWeight: 'bold',
    marginLeft: hp('3%'),
    marginTop: hp('5%'),
  },
  textButton: {
    color: '#707070',
    fontSize: hp('1.7%'),
    fontWeight: 'normal',
    marginLeft: hp('2%'),
    marginRight: hp('14%'),
    marginTop: hp('4%'),
  },
  textDetails: {
    color: '#FFF',
    fontSize: hp('2%'),
    fontWeight: 'normal',
    marginLeft: hp('3%'),
    marginTop: hp('1%'),
  },
  textWrapper: {
    height: hp('90%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  title: {
    color: '#fff',
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    marginTop: hp('7%'),
    textAlign: 'center',
  },
});
export default Profile;
