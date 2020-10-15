import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ContextTypeProvider } from './context/ContextType';
import { ContextAgeProvider } from './context/ContextAge';
import { ContextGenderProvider } from './context/ContextGender';
import { ContextStateProvider } from './context/ContextState';
import { ContextAmountProvider } from './context/ContextAmount';
import { ContextUserProvider } from './context/ContextUser';
import { SelectedGrantProvider } from './context/ContextSelectedGrant';
import { ContextHistoryProvider } from './context/ContextHistory';

import Main from './Main';
import SignUp from './SignUp';
import Grants from './Grants';
import Payment from './Payment';
import AvailableGrants from './../components/AvailableGrants';
import CreditCard from './CreditCard';
import Paypal from './Paypal';
import Paid from './Paid';
import AddSubscription from './AddSubscriptionScreen';

import DashboardRoutes from './dashboard.routes';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <ContextHistoryProvider>
        <SelectedGrantProvider>
          <ContextStateProvider>
            <ContextTypeProvider>
              <ContextGenderProvider>
                <ContextAgeProvider>
                  <ContextAmountProvider>
                    <ContextUserProvider>
                      <Stack.Navigator>
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                          }}
                          name="Main"
                          component={Main}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                            headerBackTitle: 'Back',
                          }}
                          name="SignUp"
                          component={SignUp}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                            headerLeft: null,
                          }}
                          name="AboutUs"
                          component={DashboardRoutes}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                          name="ContactUs"
                          component={DashboardRoutes}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                          name="AvailableGrants"
                          component={AvailableGrants}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                          name="Filter"
                          component={DashboardRoutes}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                          }}
                          name="Notification"
                          component={DashboardRoutes}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                            headerBackTitle: 'Back',
                          }}
                          name="Grants"
                          component={Grants}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                            headerBackTitle: 'Back',
                          }}
                          name="Payment"
                          component={Payment}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                            headerBackTitle: 'Back',
                          }}
                          name="CreditCard"
                          component={CreditCard}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                            headerBackTitle: 'Back',
                          }}
                          name="Paypal"
                          component={Paypal}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                            headerBackTitle: 'Back',
                          }}
                          name="Paid"
                          component={Paid}
                        />
                        <Stack.Screen
                          options={{
                            title: 'SportsBoost',
                            headerTransparent: 'true',
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                              fontWeight: 'normal',
                            },
                            headerBackTitle: 'Back',
                          }}
                          name="addSubscription"
                          component={AddSubscription}
                        />
                      </Stack.Navigator>
                    </ContextUserProvider>
                  </ContextAmountProvider>
                </ContextAgeProvider>
              </ContextGenderProvider>
            </ContextTypeProvider>
          </ContextStateProvider>
        </SelectedGrantProvider>
      </ContextHistoryProvider>
    </NavigationContainer>
  );
}

export default Routes;
