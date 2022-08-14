import React,{useState,useEffect} from 'react';
import axios from "axios"
import { useStore } from "../context/StoreContext";

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
  StackActions,
} from 'react-native';

//importing components
import Taskbar from './Taskbar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const StoreActivities  = ({navigation}) => {

    const [camp,setCamp] = useState("");
    const [storeId, setStoreId] = useState("");
    const [password,setPassword] = useState("");

    //using store context to retrive the store id and password
    const {setCampName,setstoreIdName} = useStore();


    const clearForm = () =>
    {
        setStoreId("");
        setCamp("");
        setPassword("");
    }
    
    const handleSubmit = () =>
    {
        //clear form after submission
        clearForm();

        //validate if storeID and passcode matches using axios req to backend
        axios.post("http://10.0.2.2:3005/api/inventory/authenticate-store-entry" , {params: {"camp": camp, "storeId" : storeId, "password": password} })
        .then(()=>  {
        console.log(camp,storeId);
        setCampName(camp);setstoreIdName(storeId);
        navigation.navigate(""); 
        clearForm(); 
    
        })
        .catch((err) => {alert("Something went wrong! Please try again!");clearForm();} )


    }

    // Navigations
    const navigateHome = () => navigation.navigate("Home2");
    const navigateProfile = () => navigation.navigate("Profile")


  return (
        
    <SafeAreaView style={[{padding: 15, display: "flex",flexDirection: "column", alignItems: "center", height: windowHeight*0.9, position: "relative"},styles.bg]}>

        <View style= {{ marginTop: windowHeight*0.15,display: "flex",flexDirection: "column", alignItems: "center"}}>

            <Text style={{marginTop: 8, fontSize :  23}}>MANAGE STORE</Text>
            <View style= {styles.card}>


                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Admin Inventories")}>
                        <Text style={styles.btntxt}>Inventory</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Admin Activity")}>
                        <Text style={styles.btntxt}>Activity</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btntxt}>Order History</Text>
                </TouchableOpacity>


            </View>

        </View>

        <View style={{width: "90%", position: "absolute", bottom: "10%"}}>
            <Taskbar navigateHome = {navigateHome} navigateProfile ={navigateProfile}/>
        </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    bg:
    {
        backgroundColor: "#EDECF3",
    },
    box: {
        marginTop: 20,
        marginBottom: 10,
        height: windowWidth*0.65,
        width: windowWidth*0.65,
        borderColor: "black",
        borderWidth: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    }
    ,
    title : {
        fontSize: 23,
        fontWeight: "500",
    }
    ,
    card : {
        marginVertical: 10,
        backgroundColor: "#483d8b",
        width: windowWidth*0.7,
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 7,
        display :"flex",
        flexDirection: "column",
        alignItems: "center"
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
        marginVertical: 12,
        marginTop : 15,
        width:  "90%",
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "white", 
        borderRadius: 5,
    },
    btntxt:
    {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "700",
    },
})
export default StoreActivities