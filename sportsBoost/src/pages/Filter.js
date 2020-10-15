import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Formik,
  SafeAreaView,
  ScrollView,
  Slider,
} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import app from './../constants/ApiKeys';
import { ContextGender } from './context/ContextGender';
import { ContextAge } from './context/ContextAge';
import { ContextType } from './context/ContextType';
import { ContextState } from './context/ContextState';
import { ContextAmount } from './context/ContextAmount';
import { SelectedGrant } from './context/ContextSelectedGrant';

const items = [
  // this is the parent or 'item'
  {
    name: 'Adult',
    id: 11,
  },
  {
    name: 'Youth',
    id: 12,
  },
  {
    name: 'Female',
    id: 13,
  },
  {
    name: 'Male',
    id: 14,
  },
  {
    name: 'Clubs',
    id: 15,
  },
  {
    name: 'Individual',
    id: 16,
  },
  {
    name: 'Diverse',
    id: 17,
  },
  {
    name: 'Travel',
    id: 18,
  },
  {
    name: 'Coaches',
    id: 19,
  },
  {
    name: 'Pavilions',
    id: 20,
  },
];

function Filter({ navigation }) {
  const [slideValue, setSlideValue] = useState(1000);
  const [keywords, setKeywords] = useState([]);

  const [isAthlete, setIsAthlete] = useState(false);
  const [isClub, setIsClub] = useState(false);
  const [isYouth, setIsYouth] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [isVic, setIsVic] = useState(false);
  const [isWa, setIsWa] = useState(false);
  const [isSa, setIsSa] = useState(false);
  const [isNsw, setIsNsw] = useState(false);
  const [isTas, setIsTas] = useState(false);
  const [isQld, setIsQld] = useState(false);

  const [selectedGrant, setSelectedGrant] = useContext(SelectedGrant);

  const styleAthlete = isAthlete ? styles.buttonTypes2 : styles.buttonTypes;
  const styleClub = isClub ? styles.buttonTypes2 : styles.buttonTypes;
  const styleYouth = isYouth ? styles.buttonTypes2 : styles.buttonTypes;
  const styleAdult = isAdult ? styles.buttonTypes2 : styles.buttonTypes;

  const styleVic = isVic ? styles.buttonState2 : styles.buttonState;
  const styleQld = isQld ? styles.buttonState2 : styles.buttonState;
  const styleTas = isTas ? styles.buttonState2 : styles.buttonState;
  const styleSa = isSa ? styles.buttonState2 : styles.buttonState;
  const styleNsw = isNsw ? styles.buttonState2 : styles.buttonState;
  const styleWa = isWa ? styles.buttonState2 : styles.buttonState;

  const [age, setAge] = useContext(ContextAge);
  const [type, setType] = useContext(ContextType);
  const [gender, setGender] = useContext(ContextGender);
  const [selectState, setSelectState] = useContext(ContextState);
  const [amount, setAmount] = useContext(ContextAmount);
  const db = app.firestore();

  useEffect(() => {
    setIsAthlete(false);
    setIsClub(false);
    setIsYouth(false);
    setIsAdult(false);
    setIsNsw(false);
    setIsQld(false);
    setIsSa(false);
    setIsTas(false);
    setIsVic(false);
    setIsWa(false);
    setKeywords([]);
    setSlideValue(50);
    setAge();
    setGender();
    setType();
    setSelectState();
    setAmount();
  }, [selectedGrant]);

  const grantItem = async () => {
    try {
      await db
        .collection('grants')
        .where('target', 'array-contains', 'adults')
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          console.log(data);

          {
            keywords.includes(11) ? setAge('adults') : null;
            keywords.includes(12) ? setAge('youth') : null;
            keywords.includes(13) ? setGender('female') : null;
            keywords.includes(14) ? setGender('male') : null;
            keywords.includes(15) ? setType('clubs') : null;
            keywords.includes(16) ? setType('individual') : null;
          }
          navigation.navigate('Grants');
        });
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.select}>
            <SectionedMultiSelect
              styles={{
                button: { backgroundColor: '#4BD2A0' },
                chipContainer: { backgroundColor: '#FF9BA3' },
                itemText: { fontSize: hp('2.3%') },
                chipIcon: { color: '#fff' },
                chipText: { color: '#fff' },
                selectToggle: { color: '#fff', fontSize: hp('2.3%') },
                selectToggleText: { color: '#fff', fontSize: hp('2.3%') },
              }}
              highlightChildren
              animateDropDowns={true}
              items={items}
              uniqueKey="id"
              selectText="Keywords"
              onSelectedItemsChange={setKeywords}
              selectedItems={keywords}
            />
          </View>
          <Text style={styles.text}>Browse as:</Text>
          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => setIsAthlete(!isAthlete) & setIsClub(false) & setType('individual')}
            >
              <Text style={styleAthlete}>Individual</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsClub(!isClub) & setIsAthlete(false) & setType('clubs')}
            >
              <Text style={styleClub}>Club</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>State</Text>
          <View style={{ flex: 2, flexDirection: 'row', marginLeft: wp('3%') }}>
            <TouchableOpacity
              onPress={() =>
                setIsVic(!isVic) &
                setIsNsw(false) &
                setIsTas(false) &
                setIsSa(false) &
                setIsQld(false) &
                setIsWa(false) &
                setSelectState('vic')
              }
            >
              <Text style={styleVic}>VIC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setIsNsw(!isNsw) &
                setIsVic(false) &
                setIsTas(false) &
                setIsSa(false) &
                setIsQld(false) &
                setIsWa(false) &
                setSelectState('nsw')
              }
            >
              <Text style={styleNsw}>NSW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setIsTas(!isTas) &
                setIsNsw(false) &
                setIsVic(false) &
                setIsSa(false) &
                setIsQld(false) &
                setIsWa(false) &
                setSelectState('tas')
              }
            >
              <Text style={styleTas}>TAS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setIsSa(!isSa) &
                setIsNsw(false) &
                setIsTas(false) &
                setIsVic(false) &
                setIsQld(false) &
                setIsWa(false) &
                setSelectState('sa')
              }
            >
              <Text style={styleSa}>SA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setIsQld(!isQld) &
                setIsNsw(false) &
                setIsTas(false) &
                setIsSa(false) &
                setIsVic(false) &
                setIsWa(false) &
                setSelectState('qld')
              }
            >
              <Text style={styleQld}>QLD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setIsWa(!isWa) &
                setIsNsw(false) &
                setIsTas(false) &
                setIsSa(false) &
                setIsQld(false) &
                setIsVic(false) &
                setSelectState('wa')
              }
            >
              <Text style={styleWa}>WA</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Amount</Text>
          <Text style={styles.textValue}>{slideValue * 1000}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#fff"
            step={2}
            value={slideValue}
            minimumTrackTintColor="#777777"
            maximumTrackTintColor="gray"
            onValueChange={(slideValue) => setSlideValue(slideValue) & setAmount(slideValue * 1000)}
          />
          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textUndSlide}>0</Text>
            <Text style={styles.textUndSlide}>100000</Text>
          </View>

          <Text style={styles.text}>Browse for</Text>
          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => setIsAdult(!isAdult) & setIsYouth(false) & setAge('adults')}
            >
              <Text style={styleAdult}>Adults</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsYouth(!isYouth) & setIsAdult(false) & setAge('youth')}
            >
              <Text style={styleYouth}>Youth</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => grantItem()}>
            <Text style={styles.buttonNext}>NEXT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonNext: {
    color: '#fff',
    fontSize: hp('2.3%'),
    fontWeight: 'bold',
    marginTop: hp('10%'),
    textAlign: 'center',
  },
  buttonState: {
    backgroundColor: '#fff',
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
    color: '#999',
    fontSize: hp('1.3%'),
    fontWeight: 'normal',
    marginRight: wp('1.5%'),
    marginTop: hp('2%'),

    overflow: 'hidden',
    padding: 11,
    textAlign: 'center',
    width: wp('14.5%'),
  },
  buttonState2: {
    backgroundColor: '#FF9BA3',
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
    color: '#fff',
    fontSize: hp('1.3%'),
    fontWeight: 'normal',
    marginRight: wp('1.5%'),
    marginTop: hp('2%'),

    overflow: 'hidden',
    padding: 11,
    textAlign: 'center',
    width: wp('14.5%'),
  },
  buttonTypes: {
    backgroundColor: '#fff',
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
    color: '#999',
    fontSize: hp('2.3%'),
    fontWeight: 'normal',
    marginLeft: wp('8%'),
    marginRight: wp('8%'),
    marginTop: hp('2%'),
    overflow: 'hidden',
    padding: 15,
    textAlign: 'center',
    width: wp('35%'),
  },
  buttonTypes2: {
    backgroundColor: '#FF9BA3',
    borderColor: '#707070',
    borderRadius: 10,
    borderWidth: 1,
    color: '#fff',
    fontSize: hp('2.3%'),
    fontWeight: 'normal',
    marginLeft: wp('8%'),
    marginRight: wp('8%'),
    marginTop: hp('2%'),
    overflow: 'hidden',
    padding: 15,
    textAlign: 'center',
    width: wp('35%'),
  },
  container: {
    backgroundColor: '#4BD2A0',
    flex: 1,
  },
  scrollView: {
    marginTop: hp('8.5%'),
  },
  select: {
    marginLeft: wp('3%'),
    marginTop: hp('1.5%'),
  },
  slider: {
    height: 45,
    marginLeft: '5%',
    width: '90%',
  },
  text: {
    color: '#FFF',
    fontSize: hp('2.5%'),
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: hp('2.8%'),
  },
  textUndSlide: {
    color: '#FFF',
    fontSize: hp('1.5%'),
    marginLeft: wp('4%'),

    marginRight: wp('4%'),
    textAlign: 'center',
  },
  textValue: {
    color: '#FFF',
    fontSize: hp('2%'),
    marginLeft: wp('3%'),

    marginRight: wp('3%'),
    textAlign: 'center',
  },
  textWrapper: {
    height: hp('90%'),
    width: wp('100%'),
  },
  title: {
    color: '#fff',
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    textAlign: 'center',
  },
});
export default Filter;
