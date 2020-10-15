import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import SignUp from './SignUp';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Filter from './Filter';
import Notification from './Notification';
import Profile from './Profile';
import Grants from './Grants';

const Tab = createBottomTabNavigator();

export default function DashboardRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'About Us') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Contact Us') {
            iconName = focused ? 'comments' : 'comments';
          } else if (route.name === 'Filter') {
            iconName = focused ? 'plus-circle' : 'plus-circle';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'star' : 'star';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4BD2A0',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#fff',
        },
        showLabel: false,
      }}
    >
      <Tab.Screen name="About Us" component={AboutUs} />
      <Tab.Screen name="Contact Us" component={ContactUs} />
      <Tab.Screen name="Filter" component={Filter} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
