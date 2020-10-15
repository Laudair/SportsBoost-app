import React, { useState } from 'react';
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

function CreditCard({ navigation }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const proceed = () => {
    if (
      cardName.length === 0 ||
      cardNumber.length === 0 ||
      expiryDate.length === 0 ||
      cvv.length === 0
    ) {
      alert('Please insert all values');
    } else {
      alert('Success');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Total price</Text>
        <Text style={styles.title}>AUD 5.00</Text>
        <Text style={styles.text}>Add Card</Text>
        <View style={styles.cardBox}>
          <Text style={styles.textButton}>Name on Card</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="off"
            style={styles.input}
            clearButtonMode="always"
            value={cardName}
            onChangeText={setCardName}
          />
          <Text style={styles.textButton}>Card Number</Text>
          <TextInput
            keyboardType="numeric"
            autoCapitalize="none"
            autoComplete="off"
            style={styles.input}
            clearButtonMode="always"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <View style={styles.wrapper}>
            <Text style={styles.textButton}>Expire Date</Text>
            <Text style={styles.textButton}>CVV</Text>
          </View>
          <View style={styles.wrapper}>
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              style={styles.inputSmall}
              clearButtonMode="always"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              style={styles.inputSmall}
              clearButtonMode="always"
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => proceed()}>
          <Text style={styles.buttonProceed}>Proceed</Text>
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

    marginLeft: hp('3%'),
    marginTop: hp('3%'),
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
    marginTop: hp('5%'),
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

    marginTop: hp('2%'),
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
  inputSmall: {
    borderBottomColor: '#E5DEDE',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: hp('1.8%'),
    marginLeft: wp('3%'),
    marginRight: hp('14%'),

    marginTop: hp('1.8%'),

    width: wp('20%'),
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
    color: '#707070',
    fontSize: hp('1.7%'),
    fontWeight: 'normal',
    marginLeft: hp('2%'),
    marginRight: hp('14%'),
    marginTop: hp('4%'),
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
  wrapper: {
    flexDirection: 'row',
  },
});
export default CreditCard;
