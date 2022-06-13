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
} from 'react-native';

//importing components
import Taskbar from './Taskbar';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ScanStore = ({navigation}) => {

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
        navigation.navigate("Loading"); 
        clearForm(); 
    
        })
        .catch((err) => {alert("smth went wrong! Please try again!");clearForm();} )


    }

    // Navigations
    const navigateHome = () => navigation.navigate("Home");
    const navigateProfile = () => navigation.navigate("Profile")
    const navigateStore = () => navigation.navigate("Scan Select Store")


  return (
        
    <SafeAreaView style={[{padding: 15, display: "flex",flexDirection: "column", alignItems: "center", height: windowHeight*0.9, position: "relative"},styles.bg]}>

        <View style= {{ marginTop: windowHeight*0.15,display: "flex",flexDirection: "column", alignItems: "center"}}>

            <Text style={{marginTop: 8, fontSize :  23}}>SELECT STORE</Text>
            <View style= {styles.card}>

                <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setCamp}
                    underlineColorAndroid="transparent"
                    placeholder = "Camp/ Air base"
                    placeholderTextColor="white" 
                    value ={camp}
                    />
                <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setStoreId}
                    underlineColorAndroid="transparent"
                    placeholder = "Store ID"
                    placeholderTextColor="white" 
                    value ={storeId}
                    />
                <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder = "password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="white" 
                    secureTextEntry={true}
                    value = {password}
                />
                    

                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btntxt}>ENTER</Text>
                </TouchableOpacity>

            </View>

        </View>

        <View style={{width: "90%", position: "absolute", bottom: "10%"}}>
            <Taskbar navigateHome = {navigateHome} navigateStore ={navigateStore} navigateProfile ={navigateProfile}/>
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
export default ScanStore