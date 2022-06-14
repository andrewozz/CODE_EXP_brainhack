import React,{useState,useEffect} from 'react';
import axios from "axios"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
  Image,
  TextInput,
  View,
  Alert,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const LoadingNotification2 = ({navigation}) => {


    // For demo purposes, this will auto redirect to store items in 3s, but ltr on, will change to after permission granted by IK
    useEffect( () => {
         const timeout = setTimeout(() => {
                navigation.pop(1); //pops the loading screen so that the back button in Store item would bring user back to the prev screen before loading
                navigation.push("ApprovalNotification");
              }, 2500);
        
    },[])


  return (
    <SafeAreaView style={ styles.bg}>
        <View style={styles.card}>
            <Text style={styles.text}>PLEASE WAIT WHILE YOU ARE GRANTED APPROVAL TO LEAVE THE STORE!</Text>
            <ActivityIndicator style={{marginTop :15}} size={50} color="#00ff00" />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    bg:
    {
        backgroundColor: "#EDECF3",
        height: windowHeight,
        display: "flex",
        flexDirection: "column",
        alignItems:  "center",
    },
    
    title : {
        fontSize: 23,
        fontWeight: "500",
        textAlign: "center",
    }
    ,
    text: {
        color: "white",
        fontSize: 18,
        textAlign :"center"
    }
    ,
    card : {
        marginTop: windowHeight* 0.2,
        backgroundColor: "#483d8b",
        width: windowWidth*0.6,
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 20,
        display :"flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "justify",
    },
    input:
    {
        borderColor: "#483d8b",
        borderBottomColor: "white",
        color: "white",
        fontSize: 14,
        width: "90%",
        borderWidth: 1,
        textDecorationLine: "none"
    },
    
})

export default LoadingNotification2