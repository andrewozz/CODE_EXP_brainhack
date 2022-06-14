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
import Homepage from 'react-native-vector-icons/AntDesign';
import Inbox from 'react-native-vector-icons/MaterialIcons';
import Person from 'react-native-vector-icons/Ionicons';


const OrderPlaced = ({navigation}) => {

    
    // @jh fill up the navigation functions for the buttons and the taskbar

    const returnToInventory = ()=>
    {
        //navigate to inventory
    }

    const viewOrderHistory = () =>
    {
        //navigate to order history
    }
    //fill up the taskbar navigations
    const navigateToHome = () => {};
    const navigateToProfile =() => {};
    const navigateToManage =()=>{ };


  return (
    <SafeAreaView style={ styles.bg}>
        <View style={styles.card}>
            <Text style={styles.text}>ORDER HAS BEEN PLACED!</Text>
            <View>
                <TouchableOpacity style={styles.btn} onPress={returnToInventory}>
                    <Text style={styles.btntxt}>RETURN TO INVENTORY</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={viewOrderHistory}>
                    <Text style={styles.btntxt}>VIEW ORDER HISTORY</Text>
                </TouchableOpacity>
            </View>
        </View>
         {/* Taksbar widget with styling */}
         <View style={styles.taskbar}>
            <Inbox name="forward-to-inbox" onPress={navigateToManage} size={30} color="white" />
            <Homepage onPress={navigateToHome} name="home" size={30} color="white" />
            <Person onPress={navigateToProfile} name="person" size={30} color="white" />
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
    taskbar:
    {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#483d8b",
        position: "absolute",
        width: "80%",
        borderRadius: 7,
        bottom: 100,
        display: "flex",
        justifyContent:"space-around",
        flexDirection: "row",
                
    },
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
    btn:
    {
        width:  windowWidth*0.5,
        textAlign: "center",
        marginTop: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "white", 
        borderRadius: 3,
    },
    btntxt:
    {
        textAlign: "center",
        color: "white",
        fontSize: 18,
    },
    
})

export default OrderPlaced