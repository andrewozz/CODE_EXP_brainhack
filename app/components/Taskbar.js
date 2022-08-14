import React,{useState,useEffect} from 'react';
import axios from "axios"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
  Image,
  TextInput,
  View,
  Alert,
} from 'react-native';

import Ant from 'react-native-vector-icons/AntDesign';
import Homepage from 'react-native-vector-icons/AntDesign';
import Inbox from 'react-native-vector-icons/MaterialIcons';
import Person from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Taskbar = ({navigateHome, navigateStore, navigateProfile}) => {

    return (
    <View>
        <View style={styles.taskbar}>
            <Inbox name="forward-to-inbox" size={30} color="white" />
            <Homepage name="home" onPress={navigateHome} size={30} color="white" />
            <Person onPress={navigateProfile} name="person" size={30} color="white" />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    taskbar:
    {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#483d8b",
        width: "100%",
        borderRadius: 7,
        display: "flex",
        justifyContent:"space-around",
        flexDirection: "row",
                
    },
  })
  

export default Taskbar