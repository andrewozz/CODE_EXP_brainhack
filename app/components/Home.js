import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  View,
  Alert,
} from 'react-native';

import Homepage from 'react-native-vector-icons/AntDesign';
import Inbox from 'react-native-vector-icons/MaterialIcons';
import Person from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useAuth } from "../context/AuthContext";



const Home = ({navigation}) => {

    const [name,setName] = useState("")
    const {userInfo} = useAuth();

    useEffect(()=>
    {
        const nameGiven = userInfo.name; 
        setName(nameGiven);
    },[])
    
    const navigateScanStore = () => navigation.navigate("Select Store");
    const navigateProfile = () => navigation.navigate("Profile");
   

    return (
    <SafeAreaView style={{flex: 1, paddingHorizontal :20, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#EDECF3"}}>
        <ScrollView style={{width: "100%"}}>
            <ImageBackground source={require("../images/soldiers.jpg") } imageStyle={{borderRadius: 7}} style={styles.headercard}>
                <View style={styles.translucentBg}></View>
                <View style ={{display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center",height: "100%", zIndex: 10, marginTop: 20,}}>
                    <Text style={{fontSize: 35, color: "white", fontWeight: "600", textAlign: "center", zIndex: 10}}>Welcome {name}</Text>
                    <TouchableOpacity style={styles.btn} onPress={navigateScanStore}>
                                <Text style={styles.btntxt}>Select Store</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <Text style={styles.title}>LAST VISITED</Text>

        </ScrollView>

        {/* Taksbar widget with styling */}
        <View style={styles.taskbar}>
            <Inbox name="forward-to-inbox" size={30} color="white" />
            <Homepage name="home" size={30} color="white" />
            {/* <Ant onPress={navigateScanStore} name="scan1" size={30} color="white" /> */}
            <Person onPress={navigateProfile} name="person" size={30} color="white" />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    bg:
    {
        backgroundColor: "#EDECF3",
    },
    title:
    {
        fontFamily: "Rammetto One",
        fontWeight:  "800",
        fontSize: 30,
        padding: 10,
        marginTop: 10,
        color: "black"
    },
    translucentBg:{
        width: "100%",
        zIndex: 3,
        position: "absolute",
        backgroundColor: "#483d8b",
        height: "100%",
        opacity: 0.5,
        borderRadius: 7,
    },

    headercard:
    {
        marginTop: 30,
        width:  "100%",
        backgroundColor: "#483d8b",
        textAlign: "center",
        height: windowHeight*0.28,
        borderRadius: 70,
    },

    taskbar:
    {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#483d8b",
        position: "absolute",
        width: "100%",
        borderRadius: 7,
        bottom: 50,
        display: "flex",
        justifyContent:"space-around",
        flexDirection: "row",
                
    },
    btn:
    {
        width:  "75%",
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "white", 
        borderRadius: 5,
        zIndex: 10,
        margin: 14,
    },
    btntxt:
    {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "700",
    },
})

export default Home;