import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Formik,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import GrantNotification from '../components/GrantNotification';
import { ContextUser } from './context/ContextUser';
import { SelectedGrant } from './context/ContextSelectedGrant';
import { ContextHistory } from './context/ContextHistory';
import app from '../constants/ApiKeys';

function Notification({ navigation }) {
  const [emailUser, setEmailUser] = useContext(ContextUser);
  const [selectedGrant, setSelectedGrant] = useContext(SelectedGrant);
  const [grantsData, setGrantsData] = useState([]);
  const [paidHistory, setPaidHistory] = useContext(ContextHistory);

  useEffect(() => {
    const db = app.firestore();
    const fetchData = async () => {
      const data = await db.collection('payment').where('emailUser', '==', emailUser).get();
      setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [paidHistory]);
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: hp('9%') }}>
        <Text style={styles.title}>History</Text>
        {grantsData.map((grants) => (
          <GrantNotification
            grantName={grants.selectedGrant}
            navigate={() => navigation.navigate('Paid') & setSelectedGrant(grants.selectedGrant)}
          ></GrantNotification>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#4BD2A0',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
    textAlign: 'center',
  },
});
export default Notification;
