import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    isAuthenticated: false,
  };

  login = async () => {
    const {email, password} = this.state;
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      this.setState({isAuthenticated: true});
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Type email"
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
        style={styles.input}
          placeholder="Type Password"
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity onPress={this.login}>
          <Text>Login</Text>
        </TouchableOpacity>
        {this.state.isAuthenticated ? <Text>login success</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    color: '#fff',
    padding: 8,
    width:wp('90%'),
    borderBottomColor:'#fff',
    borderBottomWidth:1,
    marginLeft:wp('5%'),
    marginRight:wp('5%'),
    marginTop:18,
    alignItems: 'center'

 },
});
