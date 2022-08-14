import React from 'react'
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

const Stack = createNativeStackNavigator();


const UserFlow = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name = "Activities" component={Activities}/>
          <Stack.Screen name="Select Store" component={ScanStore} />
          <Stack.Screen name="Summary" component={Summary} />
          <Stack.Screen name="Store Items" component={Storeitems} />
          <Stack.Screen name="Store Item" component={Storeitem} />
          
          {/* Sub-tabs/ Notifications */}
          <Stack.Screen name="Loading" options={{ title: 'Requesting Permission' }} component={LoadingNotification} />
          <Stack.Screen name="Loading2" options={{ title: 'Requesting Permission' }} component={LoadingNotification2} />
          <Stack.Screen name="ApprovalNotification" options={{ title: 'Notification' }} component={ApprovalNotification} />

      </Stack.Navigator>
    
  )
}

export default UserFlow