import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  View,
  Alert,
} from 'react-native';

import Taskbar from './Taskbar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Profile = () => {
  return (
    <SafeAreaView style={{paddingHorizontal :20, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#EDECF3", position: "relative"}}>
        <ScrollView style={styles.profile}>
            <Text>Profile</Text>
        </ScrollView>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profile:
  {
    height: 20,
    width: 20,
    backgroundColor: "red",
  }
})


export default Profile;
