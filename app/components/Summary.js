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
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";


import Remove from 'react-native-vector-icons/MaterialCommunityIcons';

const Summary = ({navigation}) => {
  
  const {campName,storeIdName,activities,setActivities} = useStore();
  const {userInfo} = useAuth();


  const handleCheckOut = () =>
  {
    //get activities from context 
    axios.post("http://10.0.2.2:3005/api/inventory/update-user-activities",{params: {"camp": campName, "storeId" : storeIdName, "activities": activities, "uid": userInfo.uid }})
    .then((res)=> {
      console.log("successfully updated activities");

    })
    .catch((err)=> {Alert.alert("smth went wrong! Please try again!");console.log(err.message)})
    
    
    //update the db with the updated activities/transactions
    
    
    //reset activities to empty list [] for next store entry after successfully updated db activtiies
    setActivities([])
    navigation.navigate("Loading2")
  }


  return (
    <SafeAreaView style={{position: "relative", width: "100%",height: windowHeight, backgroundColor: "#EDECF3", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <View style={{height: windowHeight*0.7}}>
          <ScrollView style={{paddingHorizontal: 30, paddingVertical: 20, width: windowWidth}}>
            {activities !== undefined ? activities.map((activity)=>{
              return (
                <View style={styles.activity}>
                  <Remove name ='delete' size={35} style={{position: "absolute", right: "10%", bottom: "50%", color: "darkslateblue"}}/>
                  <View style={{width: "75%"}}>
                    <Text style={styles.txt}>Item: {activity.name}</Text>
                    <Text  style={styles.txt}>{activity.quantity < 0 ? `Qty Taken: ${-1*activity.quantity}` :  `Qty Deposited: ${activity.quantity}`}</Text>
                    <Text  style={styles.dateTxt}>Date: {activity.date}</Text>
                  </View>
                  
                </View>
              )
            }): <View></View>}
          </ScrollView>
        </View>
        <View style={{marginTop: 20}}>
          <TouchableOpacity style={styles.btn} >
                <Text style={styles.btntxt} onPress={handleCheckOut}>Leave store</Text>
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
  },
  dateTxt:
  {
    fontSize: 18,
    fontWeight: "500",
    color: 'black'
  },
  fade:{
    backgroundColor: "yellow",
    height: 30,
    paddingHorizontal: 30, 
    paddingVertical: 20, 
    width: windowWidth,


  }
})
export default Summary