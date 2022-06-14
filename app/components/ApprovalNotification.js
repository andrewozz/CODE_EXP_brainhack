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



const ApprovalNotification = ({navigation}) => {

    const navigateHome = () =>
    {
        console.log("navigating to home");
        navigation.navigate("Home")
    }

    const navigateActivity = () =>
    {
        console.log("navigating to activity");
        navigation.pop(5);
        navigation.navigate("Activities");
    }

  return (
    <SafeAreaView style={ styles.bg}>
        <View style={styles.card}>
            <Text style={styles.title}>APPROVAL HAS BEEN GRANTED</Text>
            <TouchableOpacity style={styles.btn} onPress={navigateHome}>
                <Text style={styles.btntxt}>RETURN TO HOME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={navigateActivity}>
                <Text style={styles.btntxt}>VIEW ACTIVITY</Text>
            </TouchableOpacity>
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
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center",
        color: "white",
        marginVertical: 8,
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
        paddingHorizontal: 25,
        paddingVertical: 25,
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
    btn:
    {
        width:  "100%",
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "white", 
        borderRadius: 6,
        marginVertical: 8,
    },
    btntxt:
    {
        textAlign: "center",
        color: "white",
        fontSize: 18,
    },
    
})

export default ApprovalNotification