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
import Feather from 'react-native-vector-icons/Feather';
import Ant from 'react-native-vector-icons/AntDesign';
import Homepage from 'react-native-vector-icons/AntDesign';
import Inbox from 'react-native-vector-icons/MaterialIcons';
import Person from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Home = () => {

    const [user,setUser] = useState({name: "Andrew", msg: "welcome"})

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal :20, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <ScrollView style={{width: "100%"}}>
            <ImageBackground source={require("../images/motorcylist.png") } imageStyle={{borderRadius: 7}} style={styles.headercard}>
                <View style={styles.translucentBg}></View>
                <Text style={{fontSize: 35, color: "white", fontWeight: "600", textAlign: "center", zIndex: 10,position:"absolute", bottom: 20, left: "6%"}}>Welcome {user.name}</Text>
            </ImageBackground>

        </ScrollView>

        {/* Taksbar widget with styling */}
        <View style={styles.taskbar}>
            <Inbox name="forward-to-inbox" size={30} color="white" />
            <Ant name="search1" size={30} color="white" />
            <Homepage name="home" size={30} color="white" />
            <Person name="person" size={30} color="white" />
            <Feather name="settings" size={30} color="white" />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
        marginTop: 25,
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
                
    }
})

export default Home;