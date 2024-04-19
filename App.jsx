import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TaskScreen from './src/screens/TaskScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import {StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'teal',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontSize: 24,
              marginBottom: 8,
            },
            tabBarItemStyle: {
              padding: 0,
            },
          }}>
          <Tab.Screen
            name="Tasks"
            component={TaskScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => <></>,
              tabBarItemStyle: {
                borderRightWidth: 2,
                borderRightColor: 'black',
              },
            }}
          />
          <Tab.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => <></>,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
