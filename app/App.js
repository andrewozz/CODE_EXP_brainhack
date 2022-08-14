import React from 'react';
import { LogBox } from 'react-native';
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

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
console.disableYellowBox = true;


//components
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import ScanStore from './components/ScanStore';
import Storeitems from './components/Storeitems';
import Storeitem from './components/Storeitem';
import Summary from './components/Summary';
import Activities from './components/Activities';


//notification components
import LoadingNotification from './components/LoadingNotification';
import LoadingNotification2 from './components/LoadingNotification2';
import ApprovalNotification from './components/ApprovalNotification';

//context providers
import {AuthProvider} from "./context/AuthContext";
import { StoreProvider } from './context/StoreContext';

//navigation 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderPlaced from './components_ik/OrderPlaced';

import UserFlow from './UserFlow';
import AdminFlow from './AdminFlow';

const Stack = createNativeStackNavigator();


const App = () => {

  return (
      <AuthProvider>
        <StoreProvider>

          <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
              }} >

                {/* Main tabs for user auth*/}
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup} />

                {/* nested stacks for user and admin respectively */}
                <Stack.Screen name="UserFlow" component={UserFlow} />
                <Stack.Screen name="AdminFlow" component={AdminFlow} />

            </Stack.Navigator>
          </NavigationContainer>
        </StoreProvider>
      </AuthProvider>
    

  );
};



export default App;
