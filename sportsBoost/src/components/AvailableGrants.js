import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SelectedGrant } from '../pages/context/ContextSelectedGrant';
import { ContextUser } from '../pages/context/ContextUser';
import app from '../constants/ApiKeys';

function AvailableGrants({
  grantName,
  price,
  closeDate,
  navigation,
  navigate,
  state,
  grantId,
  navigatePaid,
  paid,
}) {
  const [selectedGrant, setSelectedGrant] = useContext(SelectedGrant);
  const [emailUser, setEmailUser] = useContext(ContextUser);
  const [isPaid, setIsPaid] = useState(false);
  const [grantsData, setGrantsData] = useState([]);

  useEffect(() => {
    const db = app.firestore();
    const fetchData = async () => {
      const data = await db
        .collection('payment')
        .where('emailUser', '==', emailUser)
        .where('selectedGrant', '==', grantName)
        .get();
      setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  return (
    <View style={styles.grantBox}>
      <View style={styles.textBox}>
        <Text style={styles.text}>{grantName.substring(0, 20)}</Text>
        <Text style={styles.text}>Close date: {closeDate}</Text>
        <Text style={styles.textPrice}>Grant value: {price}</Text>
        <Text style={styles.text}>State: {state}</Text>
      </View>
      {grantsData === 'undefined' || grantsData.length > 0 || grantsData === null ? (
        <TouchableOpacity style={styles.buttonView} onPress={navigatePaid}>
          <Text style={styles.textApply}>View</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonApply} onPress={navigate}>
          <Text style={styles.textApply}>Apply</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  buttonApply: {
    backgroundColor: '#FF9BA3',
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 1,
    color: '#fff',
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
    height: wp('8%'),
    marginLeft: wp('10%'),
    marginRight: wp('1%'),
    marginTop: hp('6%'),
    overflow: 'hidden',
    padding: 2,
    textAlign: 'center',
    width: wp('25%'),
  },
  buttonView: {
    backgroundColor: '#73e1fa',
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 1,
    color: '#fff',
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
    height: wp('8%'),
    marginLeft: wp('10%'),
    marginRight: wp('1%'),
    marginTop: hp('6%'),
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
    height: wp('34%'),
    marginTop: hp('2%'),
    width: wp('90%'),
  },
  text: {
    color: '#999',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
    textAlign: 'left',
    width: wp('50%'),
  },
  textApply: {
    color: '#fff',
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
    padding: 2,
    textAlign: 'center',
  },
  textBox: {
    flexDirection: 'column',
  },
  textPrice: {
    color: 'black',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
    textAlign: 'left',
    width: wp('50%'),
  },
});
export default AvailableGrants;
