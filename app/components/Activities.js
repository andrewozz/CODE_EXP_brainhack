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
import Homepage from 'react-native-vector-icons/AntDesign';
import Inbox from 'react-native-vector-icons/MaterialIcons';
import Person from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";



const Activities = ({navigation}) => {
  
  
  const {userInfo} = useAuth();
  const [activities,setActivities] = useState([]); // list of all activities by the user
  useEffect(()=>
  {
      //fetch all the activities from the database band upload here as activity component
      axios.get("http://10.0.2.2:3005/api/inventory/get-all-user-activities" , {params: {"uid": userInfo.uid} })
      .then((res)=>  {
          console.log("successfully obtained all user activities");
          const data =res.data;
          const listActivities = [];
          const keys =Object.keys(data);
          for (var i=0; i<keys.length;i++)
          {

            listActivities.push(data[keys[i]]);
          }
          setActivities(listActivities);
          console.log(listActivities);
       })
      .catch((err) => {alert("smt went wrong!");} )

  },[])


  return (
    <SafeAreaView style={{position: "relative", width: "100%",height: windowHeight, backgroundColor: "#EDECF3", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <View style={{height: windowHeight*0.80, paddingVertical: 20, width:"85%"}}>
          <ScrollView style={{paddingHorizontal: 30, paddingVertical: 10, width: windowWidth}}>
            {activities ? activities.map((activity)=>{
              return (
                <View style={styles.activity}>
                  <View style={{width: "75%"}}>
                    <Text style={styles.txt}>Camp: {activity.camp}</Text>
                    <Text  style={styles.txt}>store ID: {activity.storeId}</Text>
                    <Text  style={styles.txt}>Item: {activity.name}</Text>
                    <Text  style={styles.txt}>{activity.quantity < 0 ? `Qty Taken: ${-1*activity.quantity}` :  `Qty Deposited: ${activity.quantity}`}</Text>
                    <Text  style={styles.txt}>Date: {activity.date}</Text>
                  
                  </View>
                  
                </View>
              )
            }): <View></View>}
          </ScrollView>

        </View>
        {/* use taskbar component */}
        <View style={styles.taskbar}>
            <Inbox onPress={()=>navigation.navigate("Activities")} name="forward-to-inbox" size={30} color="white" />
            <Homepage onPress={()=>navigation.navigate("Home")}  name="home" size={30} color="white" />
            <Person onPress={()=>navigation.navigate("Profile")} name="person" size={30} color="white" />
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
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
    width: "85%",
    display: "flex",
    flexDirection: "column",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  txt:
  {
    fontSize: 17,
    fontWeight: "400",
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
  },
  taskbar:
    {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#483d8b",
        position: "absolute",
        width: "80%",
        borderRadius: 7,
        bottom: windowHeight*0.15,
        display: "flex",
        justifyContent:"space-around",
        flexDirection: "row",
                
    },
})
export default Activities