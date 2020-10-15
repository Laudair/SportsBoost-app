import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { ContextGender } from './context/ContextGender';
import { ContextAge } from './context/ContextAge';
import { ContextType } from './context/ContextType';
import { ContextState } from './context/ContextState';
import { ContextAmount } from './context/ContextAmount';
import { SelectedGrant } from './context/ContextSelectedGrant';
import { ContextUser } from './context/ContextUser';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AvailableGrants from '../components/AvailableGrants';
import app from './../constants/ApiKeys';

function Grants({ navigation }) {
  const [age, setAge] = useContext(ContextAge);
  const [type, setType] = useContext(ContextType);
  const [gender, setGender] = useContext(ContextGender);
  const [state, setState] = useContext(ContextState);
  const [amount, setAmount] = useContext(ContextAmount);
  const [selectedGrant, setSelectedGrant] = useContext(SelectedGrant);
  const [emailUser, setEmailUser] = useContext(ContextUser);

  const [grantsData, setGrantsData] = useState([]);
  const [grantPaid, setGrantPaid] = useState([]);

  const [grantName, setGranName] = useState();

  const test = [age, type, gender];

  /* useEffect(() => {
    const db = app.firestore();
    alert(age);
    const fetchData = async () => {
      if (age !== undefined || type !== undefined || gender !== undefined || state !== undefined) {
        if (state !== undefined) {
          const data = await db.collection('grants').where('state', '==', state).get();
          setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } else {
          const data = await db
            .collection('grants')
            .where('target', 'array-contains-any', [age, type, gender])
            .where('state', '==', state)
            .get();
          setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          alert('filter');
        }
      } else {
        const data = await db.collection('grants').get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        alert('any');
      }
    };
    fetchData();
  }, [age, type, state, gender]);*/
  useEffect(() => {
    const db = app.firestore();
    const fetchData = async () => {
      if ((age !== undefined) & (type !== undefined) & (gender !== undefined)) {
        const data = await db
          .collection('grants')
          .where('target', 'array-contains-any', [age, type, gender])
          .get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else if ((age !== undefined) & (type !== undefined)) {
        const data = await db
          .collection('grants')
          .where('target', 'array-contains-any', [age, type])
          .get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else if ((gender !== undefined) & (type !== undefined)) {
        const data = await db
          .collection('grants')
          .where('target', 'array-contains-any', [gender, type])
          .get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else if ((gender !== undefined) & (age !== undefined)) {
        const data = await db
          .collection('grants')
          .where('target', 'array-contains-any', [gender, age])
          .get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else if (age !== undefined) {
        const data = await db.collection('grants').where('target', 'array-contains-any', age).get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else if (gender !== undefined) {
        const data = await db
          .collection('grants')
          .where('target', 'array-contains-any', gender)
          .get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else if (type !== undefined) {
        const data = await db
          .collection('grants')
          .where('target', 'array-contains-any', type)
          .get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        const data = await db.collection('grants').get();
        setGrantsData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };
    fetchData();
  }, [age, type, state, gender]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: hp('9%') }}>
        <Text style={styles.title}>Available Grants</Text>
        {grantsData.map((grants) => (
          <AvailableGrants
            key={grants.grantName}
            grantName={grants.grantName}
            price={grants.amount}
            closeDate={grants.closeDate}
            state={grants.state}
            paid={grants.emailUser}
            navigatePaid={() => navigation.navigate('Paid') & setSelectedGrant(grants.grantName)}
            navigate={() => navigation.navigate('Payment') & setSelectedGrant(grants.grantName)}
            grantId={() => setSelectedGrant(grants.id)}
          ></AvailableGrants>
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
export default Grants;
