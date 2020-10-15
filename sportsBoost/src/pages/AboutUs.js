import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Formik,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function AboutUs({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>About us</Text>
        <Text style={styles.text}>
          {' '}
          We work with amateur sporting clubs, and individual athletes to gain funding grants and
          sponsorships to help boost their sporting endeavours
        </Text>
        <TouchableOpacity>
          <Text style={styles.buttonGrants} onPress={() => navigation.navigate('Filter')}>
            Browse for Grants
          </Text>
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: hp('25%'),
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
    marginTop: hp('8%'),
    textAlign: 'center',
  },
  textWrapper: {
    height: hp('80%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  title: {
    color: '#fff',
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
});
export default AboutUs;
