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
import Navigator from "./routes/authStack"
import Login from './components/Login';
import Signup from './components/Signup';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const App = () => {


  return (
    <SafeAreaView style={styles.bg}>
        <Navigator/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    bg:
    {
      backgroundColor: "#F6F7FE",
      height: windowHeight,
    },
    para:{
      backgroundColor: "#424c8b"
    }
  
});

export default App;
