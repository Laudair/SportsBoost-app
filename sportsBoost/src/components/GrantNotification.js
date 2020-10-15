import React, { useState, useContext } from 'react';
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
import { SelectedGrant } from '../pages/context/ContextSelectedGrant';

function GrantNotification({ navigation, grantName, navigate }) {
  const [selectedGrant, setSelectedGrant] = useContext(SelectedGrant);

  return (
    <View style={styles.grantBox}>
      <Text style={styles.text}>{grantName.substring(0, 20)}</Text>
      <TouchableOpacity style={styles.buttonReadMore} onPress={navigate}>
        <Text style={styles.textReadMore}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonReadMore: {
    backgroundColor: 'red',
    borderRadius: 8,
    color: '#fff',
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
    height: wp('8%'),
    marginLeft: wp('3%'),
    marginRight: wp('1%'),
    marginTop: hp('0.8%'),
    overflow: 'hidden',
    padding: 2,
    textAlign: 'center',
    width: wp('25%'),
  },
  grantBox: {
    backgroundColor: '#FFF',
    borderColor: '#707070',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: wp('20%'),
    marginTop: hp('2%'),

    padding: 20,
    width: wp('90%'),
  },
  text: {
    color: '#999',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    width: wp('50%'),
  },

  textReadMore: {
    color: '#fff',
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
    padding: 2,
    textAlign: 'center',
  },
});
export default GrantNotification;
