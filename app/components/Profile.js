import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
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
import Photo from 'react-native-vector-icons/FontAwesome';


import Taskbar from './Taskbar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Profile = ({navigation}) => {

  const [name,setName] = useState("");
  const [contact,setContact] = useState("");
  const [description,setDescription] = useState("");
  const [unit,setUnit] = useState("");


  const handleLogout = () =>
  {
    console.log("logout!");
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={{paddingHorizontal :20, paddingTop: 20,display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#EDECF3", position: "relative", height: windowHeight, }}>
        
        
        <View style={styles.profile}>
            <View style={{display: "flex",flexDirection: "column", alignItems: "center"}}>


              {/* Image of personnel */}
              <View style={[styles.picture, {display: "flex", justifyContent:"center", alignItems: "center"}]}>
                 <Photo name='photo' size={30} color ="black" />
              </View>

              <View style={styles.card}>
                      <TextInput
                      clearButtonMode="always"
                      style={styles.input}
                      onChangeText={setName}
                      underlineColorAndroid="transparent"
                      placeholder = "Name"
                      placeholderTextColor="white"
                      value={name} 
                      />
                      <TextInput
                      clearButtonMode="always"
                      style={styles.input}
                      onChangeText={setDescription}
                      underlineColorAndroid="transparent"
                      placeholder = "Description"
                      placeholderTextColor="white"
                      value={description} 
                      />
                      <TextInput
                      clearButtonMode="always"
                      style={styles.input}
                      onChangeText={setContact}
                      placeholder = "Contact"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="white" 
                      value={contact} 

                      />
                       <TextInput
                      clearButtonMode="always"
                      style={styles.input}
                      onChangeText={setUnit}
                      placeholder = "Army Unit"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="white" 
                      value={unit} 

                      />                            
              </View>
              <View style={styles.logout}>
                    <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                        <Text style={styles.btntxt}>Logout</Text>
                    </TouchableOpacity>
              </View>


            </View>
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
  profile:
  {
    height: windowHeight*0.8,
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical :25,
    paddingBottom: "25%",
    
  },
  Taskbar:
  {
    width : "100%",
    marginTop: 20,
  },
  btn:
    {
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "darkslateblue",
        width: windowWidth*0.6,
        borderWidth: 2,
        borderColor: "white", 
        borderRadius: 8,
        zIndex: 10,
        marginTop: 25,
    },
    btntxt:
    {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "700",
    },
  picture:{
    width:  windowHeight*0.18,
    height: windowHeight*0.18,
    backgroundColor: "yellow",
    top: 0,
    position: "absolute",
    zIndex: 10,
    borderRadius: windowHeight*0.09, //to make circle, use border radius half of the width of the square
    backgroundColor: "#D3D3D3",

  },
  taskbar:
  {
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: "#483d8b",
      position: "absolute",
      width: "90%",
      borderRadius: 7,
      bottom: windowHeight*0.15,
      display: "flex",
      justifyContent:"space-around",
      flexDirection: "row",
              
  },
  card:{
    backgroundColor: "#483d8b",
    width: "75%",
    marginTop: "20%",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 30,
    paddingTop: "15%"
},
input:
{
    borderColor: "#483d8b",
    borderBottomColor: "white",
    color: "white",
    fontSize: 13,
    borderWidth: 1,
    textDecorationLine: "none"
}
,
})



export default Profile;
