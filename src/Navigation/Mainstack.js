import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Add, Popup, testSecond } from '../Screens';
// import Test from '../Screens/Test';


const Stack = createNativeStackNavigator();


const Mainstack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"
                // screenOptions={{
                //     headerShown: false
                // }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Add" component={Add} />
                <Stack.Screen name="Popup" component={Popup} />
                <Stack.Screen name="TestScreen" component={testSecond} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});


export default Mainstack;
