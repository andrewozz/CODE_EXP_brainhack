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

import Remove from 'react-native-vector-icons/MaterialCommunityIcons';




//Fetch all the data from the current activities of the account at that particular store. uid/camp/storeId current activities (unconfirmed until he leaves the store)

const Summary = () => {

  //dummy data for activities , - is for taken, + is for deposit
  const activities = 
  [ {"name": "Admin Shorts", "quantity": -10, "date": "06/11/2022 18:15"},
    {"name": "Torchlight", "quantity": 30, "date": "06/11/2022 18:10"},
    {"name": "water bottle", "quantity": 50, "date": "06/11/2022 17:30"},  
  ]



  return (
    <SafeAreaView style={{position: "relative", width: "100%",height: windowHeight, backgroundColor: "#EDECF3", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <View style={{height: windowHeight*0.7}}>
          <ScrollView style={{paddingHorizontal: 30, paddingVertical: 20, width: windowWidth}}>
            {activities.map((activity)=>{
              return (
                <View style={styles.activity}>
                  <Remove name ='delete' size={35} style={{position: "absolute", right: "10%", bottom: "50%", color: "darkslateblue"}}/>
                  <View style={{width: "70%"}}>
                    <Text style={styles.txt}>Item: {activity.name}</Text>
                    <Text  style={styles.txt}>{activity.quantity < 0 ? `Qty Taken: ${-1*activity.quantity}` :  `Qty Deposited: ${activity.quantity}`}</Text>
                    <Text  style={styles.txt}>Date: {activity.date}</Text>
                  </View>
                  
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View>
          <TouchableOpacity style={styles.btn} >
                <Text style={styles.btntxt}>Checkout</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btn:
  {
    backgroundColor: "darkslateblue",
    width:  windowWidth*0.5,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 6,
    textAlign: "center",
    margin: 15,
  },
  btntxt:
  {
    textAlign: "center",
    color: "white",
    fontSize: 26,
    fontWeight: "600"
  },
  activity:
  {
    position: "relative",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  txt:
  {
    fontSize: 20,
    fontWeight: "500",
    color: 'black'
  }
})
export default Summary