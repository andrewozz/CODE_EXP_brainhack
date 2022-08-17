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



const AdminActivity = ({navigation}) => {
  

  
  const {userInfo} = useAuth();
  const {campName,storeIdName} = useStore();

  const [activities,setActivities] = useState([]); // list of all activities by the user
  useEffect(()=>
  {
      //fetch all the activities from the database band upload here as activity component
      axios.get("http://10.0.2.2:3005/api/inventory/get-all-store-activities" , {params: {"camp": campName, "storeId": storeIdName}})
      .then((res)=>  {
         
         setActivities(res.data);
       })
      .catch((err) => {Alert.alert(err.response.data);} )

  },[])


  return (
    <SafeAreaView style={{position: "relative", width: "100%",height: windowHeight, backgroundColor: "#EDECF3", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <View style={{height: windowHeight*0.80, paddingVertical: 20, width:"85%"}}>
          <ScrollView style={{paddingHorizontal: 30, paddingVertical: 10, width: windowWidth}}>
            {activities!==[] && activities !== null ? activities.map((activity)=>{
              return (
                <View style={styles.activity}>
                  <View style={{width: "75%"}}>
                    <Text style={styles.txt}><Text style={{fontWeight: "900"}}>Time: </Text> {activity.date}</Text>
                    <Text  style={styles.txt}><Text style={{fontWeight: "900"}}>Item Name: </Text>{activity.itemName}</Text>
                    <Text  style={styles.txt}><Text style={{fontWeight: "900"}}>Name of personnel: </Text> {activity.name}</Text>
                    <Text  style={styles.txt}><Text style={{fontWeight: "900"}}>User ID of personnel:</Text> {activity.uid}</Text>
                    <Text  style={[styles.txt, {fontWeight: "900"}]}>{activity.change < 0 ? `Qty Taken: ${-1*activity.change}` :  `Qty Deposited: ${activity.change}`}</Text>
                  
                  </View>
                  
                </View>
              )
            }): <View></View>}
          </ScrollView>

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
    width: "80%",
    display: "flex",
    flexDirection: "column",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  txt:
  {
    fontSize: 16,
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
export default AdminActivity