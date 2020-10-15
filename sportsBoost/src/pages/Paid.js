import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Formik,
  SafeAreaView,
  Modal,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import app from './../constants/ApiKeys';
import { SelectedGrant } from './context/ContextSelectedGrant';
import { WebView } from 'react-native-webview';
import { ContextUser } from './context/ContextUser';
import { ContextHistory } from './context/ContextHistory';

function Paid({ navigation }) {
  const [selectedGrant, setSelectedGrant] = useContext(SelectedGrant);
  const [emailUser, setEmailUser] = useContext(ContextUser);
  const [paidHistory, setPaidHistory] = useContext(ContextHistory);
  const [grantData, setGrantData] = useState([]);
  const [webview, setWebview] = useState(false);
  const [link, setLink] = useState();
  const [paidGrant, setPaidGrant] = useState([]);

  const pay = () => {
    const db = app.firestore();
    const dataUpdate = {
      selectedGrant,
      emailUser,
    };
    db.collection('payment').doc().set(dataUpdate) && setPaidHistory(!paidHistory);
  };

  useEffect(() => {
    const db = app.firestore();
    const fetchData = async () => {
      const data = await db.collection('grants').where('grantName', '==', selectedGrant).get();
      setGrantData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
    const fetchPaid = async () => {
      const data = await db
        .collection('payment')
        .where('selectedGrant', '==', selectedGrant)
        .where('emailUser', '==', emailUser)
        .get();
      setPaidGrant(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchPaid();
    /* {
      !paidGrant.length
        ? db.collection('payment').doc().set(dataUpdate) && setPaidHistory(!paidHistory)
        : setPaidHistory(!paidHistory);
    }*/
  }, [selectedGrant]);

  if (webview) {
    return (
      <View style={styles.container}>
        <SafeAreaView></SafeAreaView>
        <WebView style={{ marginTop: 48 }} source={{ uri: link }}></WebView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ marginLeft: wp('80%'), marginTop: hp('1.3%') }}
          onPress={() => navigation.navigate('AboutUs')}
        >
          <Text style={styles.textButtonRight}>Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Grant info</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>NAME:</Text>
          {grantData.map((grants) => (
            <Text style={styles.textInfo}>{grants.grantName.substring(0, 20)}</Text>
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>CLOSE DATE:</Text>
          {grantData.map((grants) => (
            <Text style={styles.textInfo}>{grants.closeDate}</Text>
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>AMOUNT:</Text>
          {grantData.map((grants) => (
            <Text style={styles.textInfo}>{grants.amount}</Text>
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>STATE:</Text>
          {grantData.map((grants) => (
            <Text style={styles.textInfo}>{grants.state}</Text>
          ))}
        </View>
        <View>
          <Text style={styles.text}>DESCRIPTION:</Text>
          {grantData.map((grants) => (
            <Text style={styles.textInfo}>{grants.description.substring(0, 250)}</Text>
          ))}
        </View>
        <View>
          {grantData.map((grants) => (
            <TouchableOpacity
              style={styles.buttonGrants}
              onPress={() => setWebview(true) & setLink(grants.link) & pay()}
            >
              <Text style={styles.textButton}>Open</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonGrants: {
    alignSelf: 'center',
    backgroundColor: '#FF9BA3',
    borderColor: '#707070',
    borderRadius: 30,

    borderWidth: 1,
    color: '#999',

    fontSize: hp('1.8%'),
    marginTop: hp('12%'),
    overflow: 'hidden',
    padding: 8,
    textAlign: 'center',
    width: wp('30%'),
  },
  container: {
    backgroundColor: '#4BD2A0',
    flex: 1,
  },
  text: {
    color: '#FFF',
    fontSize: hp('2.7%'),
    fontWeight: 'bold',
    marginLeft: hp('3%'),
    marginRight: hp('3%'),
    marginTop: hp('3%'),
  },
  textButton: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: hp('2.7%'),
    fontWeight: 'bold',
  },
  textButtonRight: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'normal',
  },
  textInfo: {
    color: '#FFF',
    fontSize: hp('2.5%'),
    fontWeight: 'normal',
    marginLeft: hp('3%'),
    marginRight: hp('3%'),
    marginTop: hp('3.2%'),
  },
  textWrapper: {
    height: hp('90%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  title: {
    color: '#fff',
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    marginLeft: hp('3%'),
    marginTop: hp('2%'),
  },
});
export default Paid;
