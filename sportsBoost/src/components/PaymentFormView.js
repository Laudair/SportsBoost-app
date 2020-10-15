import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { FontAwesome } from '@expo/vector-icons';

/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */
export default class PaymentFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: { valid: false } };
  }

  render() {
    const { onSubmit, submitted, error } = this.props;

    return (
      <View>
        <View>
          <CreditCardInput requiresName onChange={(cardData) => this.setState({ cardData })} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Subscribe"
            disabled={!this.state.cardData.valid || submitted}
            onPress={() => onSubmit(this.state.cardData)}
          />
          {/* Show errors */}
          {error && (
            <View style={styles.alertWrapper}>
              <View style={styles.alertIconWrapper}>
                <FontAwesome name="exclamation-circle" size={20} style={{ color: '#c22' }} />
              </View>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alertIconWrapper: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center',
    padding: 5,
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400',
  },
  alertTextWrapper: {
    alignItems: 'center',
    flex: 20,
    justifyContent: 'center',
  },
  alertWrapper: {
    alignItems: 'center',
    backgroundColor: '#ecb7b7',
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 5,
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
});
