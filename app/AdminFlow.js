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
import Home2 from './components/HomeAdmin';
import StoreActivities from './components/StoreActivities';
import ManageStore from './components/ManageStore';
import AdminInventories from './components/AdminInventories';
import AdminActivity from './components/AdminActivity';

const Stack = createNativeStackNavigator();


const AdminFlow = () => {
  return (
    <Stack.Navigator initialRouteName='Home2'>

          <Stack.Screen options={{headerShown: false}} name="Home2" component={Home2} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name = "Activities" component={Activities}/>
          <Stack.Screen name="Manage Store" component={ManageStore} />
          <Stack.Screen name="Store Activities" component={StoreActivities} />
          <Stack.Screen name="Admin Inventories" component={AdminInventories} />
          <Stack.Screen name="Admin Activity" component={AdminActivity} />



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

export default AdminFlow