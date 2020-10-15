import React, { useState, useContext } from 'react';
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
import { WebView } from 'react-native-webview';

import { SelectedGrant } from './context/ContextSelectedGrant';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

function Payment({ navigation }) {
  const [selectedGrant, setSelectedGrant] = useContext(SelectedGrant);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Total price</Text>
        <Text style={styles.title}>AUD 5.00</Text>
        <Text style={styles.text}>Choose the payment method</Text>
        <TouchableOpacity
          style={styles.buttonGrants}
          onPress={() => navigation.navigate('addSubscription')}
        >
          <Text style={styles.textButton}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGrants} onPress={() => navigation.navigate('Paypal')}>
          <Text style={styles.textButton}>PayPal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonGrants: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#707070',
    borderRadius: 30,

    borderWidth: 1,
    color: '#999',

    fontSize: hp('1.8%'),
    marginTop: hp('3%'),
    overflow: 'hidden',
    padding: 20,
    textAlign: 'center',
    width: wp('90%'),
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
    marginTop: hp('5%'),
  },
  textButton: {
    color: '#999',
    fontSize: hp('2.7%'),
    fontWeight: 'bold',
    marginLeft: hp('3%'),
    marginRight: hp('3%'),
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
export default Payment;
