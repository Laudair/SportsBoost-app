import React from 'react';
import { View, SafeAreaView } from 'react-native';

import { WebView } from 'react-native-webview';

export default class Paypal extends React.Component {
  handleResponse = (data) => {
    if (data.title === 'success') {
      this.props.navigation.navigate('Paid');
    } else if (data.title === 'cancel') {
      this.props.navigation.navigate('Payment');
    } else {
      return;
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: '#4BD2A0', flex: 1 }}>
        <SafeAreaView></SafeAreaView>
        <View style={{ flex: 1 }}>
          <WebView
            style={{ marginTop: 48 }}
            source={{ uri: 'http://localhost:3001' }}
            onNavigationStateChange={(data) => this.handleResponse(data)}
          />
        </View>
      </View>
    );
  }
}
