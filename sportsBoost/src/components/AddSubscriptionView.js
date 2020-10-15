import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import PaymentFormView from './PaymentFormView';

export default class AddSubscriptionView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} ref={(ref) => (this.scrollViewRef = ref)}>
          <View style={styles.textWrapper}></View>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>Single payment: AUD 5.00</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>Insert your credit card details</Text>
          </View>
          <View style={styles.cardFormWrapper}>
            <PaymentFormView {...this.props} />
          </View>
        </ScrollView>
        {/* Scrolls to the payment form */}
        <KeyboardSpacer
          onToggle={() => {
            setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }), 0);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardFormWrapper: {
    margin: 10,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  infoText: {
    fontSize: 18,
    marginTop: 50,
    textAlign: 'center',
  },
  textWrapper: {
    margin: 10,
  },
});
