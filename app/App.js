import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
} from 'react-native';



import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import ScanStore from './components/ScanStore';
import Storeitems from './components/Storeitems';
import Storeitem from './components/Storeitem';
import LoadingNotification from './components/LoadingNotification';
import Summary from './components/Summary';

import {AuthProvider} from "./context/AuthContext";
import { StoreProvider } from './context/StoreContext';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


const App = () => {

  return (
      <AuthProvider>
        <StoreProvider>
          <NavigationContainer>
            <Stack.Navigator >

                {/* Main tabs for user */}
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Select Store" component={ScanStore} />
                <Stack.Screen name="Summary" component={Summary} />
                <Stack.Screen name="Store Items" component={Storeitems} />
                <Stack.Screen name="Store Item" component={Storeitem} />


                {/* Sub-tabs */}
                <Stack.Screen name="Loading" options={{ title: 'Requesting Permission' }} component={LoadingNotification} />



            </Stack.Navigator>
          </NavigationContainer>
        </StoreProvider>
      </AuthProvider>
    

  );
};



export default App;
