import React from 'react';

import {Colors} from './../components/styles';
const {tertiary, brand} = Colors;

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from "./../screens/Login";
import Welcome from "./../screens/Welcome";

const Stack = createNativeStackNavigator();

// Picks wich page appears first and navigation flow
const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent',
                        
                    },
                headerTintColor: tertiary,   
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                    }
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
             
                <Stack.Screen options={{ headerTintColor: brand }} name="Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>


    );
}

export default RootStack;
