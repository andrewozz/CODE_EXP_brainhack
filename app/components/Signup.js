import React,{useState,useEffect} from 'react';
import axios from "axios"

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
import { set } from 'express/lib/application';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Signup = ({navigation}) => {
    const [email,setOnChangeEmail] = useState("")
    const [password,setOnChangePassword] = useState("")
    const [confirmPassword,setOnChangeConfirmPassword] = useState("")
    const [name,setOnChangeName] = useState("");
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [role,setRole] = useState("");

    const clearForm = () =>
    {
        setOnChangeEmail("");
        setOnChangeConfirmPassword("");
        setOnChangeName("");
        setOnChangePassword("");
    }
    
    const handleSignup = () =>
    {   

        //validations for field inputs
        if (email === "" || password === "" || confirmPassword === "")
        {
            Alert.alert("Please fill up all the fields!");
            clearForm();    
            return;
        }

        if (password !== confirmPassword){Alert.alert("Passwords do not match!"); clearForm(); return;}
        
        axios.post("http://10.0.2.2:3005/api/users/create-user-account" , {params: {"email": email, "password": password, "name" : name, "role": role} })
        .then(()=>  {Alert.alert("Successful!"); navigation.navigate("Login"); clearForm(); })
        .catch((err) => {alert(err.response.data);clearForm();} )
    }

    const navigateToLogin = () =>
    {
        clearForm();
        navigation.navigate("Login");
    }

    return (
        <View>
            <SafeAreaView
                contentInsetAdjustmentBehavior="automatic"
                style ={[styles.bg,{display:"flex", flexDirection:"column"}]}
                >
                <View style={styles.card}>
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangeEmail}
                    underlineColorAndroid="transparent"
                    placeholder = "NRIC"
                    placeholderTextColor="white" 
                    value={email}
                    />
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangeName}
                    underlineColorAndroid="transparent"
                    placeholder = "Full Name"
                    placeholderTextColor="white" 
                    value={name}
                    />
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangePassword}
                    placeholder = "Password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="white" 
                    secureTextEntry={true}
                    value ={password}
                    />
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangeConfirmPassword}
                    placeholder = "Confirm Password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="white" 
                    secureTextEntry={true}
                    value = {confirmPassword}
                    />
                    <View style ={{marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <TouchableOpacity style={[styles.btn,styles.smallerbtn,isUser ? styles.selected:styles.unselected]} onPress={()=>{setIsUser(true);setIsAdmin(false); setRole("user")}}>
                                <Text style={[styles.btntxt,isUser ? styles.selectedtxt:styles.unselected]}>User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,styles.smallerbtn,isAdmin ? styles.selected:styles.unselected]} onPress={()=>{setIsAdmin(true);setIsUser(false);setRole("admin")}}>
                                <Text style={[styles.btntxt, isAdmin ? styles.selectedtxt: styles.unselected]}>Admin</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{position:  "relative", paddingVertical: 20,marginTop: 5,}}>
                        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
                            <Text style={styles.btntxt}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <Text onPress={navigateToLogin} style={{textAlign:"center",marginTop: 3, color: "white"}}>Login to an existing account!</Text>
                </View>

                <View>
                    <TouchableOpacity style={[styles.btn,styles.singpass]}>
                        <Text style={styles.btntxt}>Singpass Signup</Text>
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    bg:
    {
        display: "flex",
        flexDirection: "row",
        justifyContent : "center",
        alignItems: "center",
    },
    card:{
        backgroundColor: "#483d8b",
        width: "75%",
        borderRadius: 4,
        padding: 25,
        position: "relative",
        marginTop: 0.1* windowHeight,

    },
    input:
    {
        borderColor: "#483d8b",
        borderBottomColor: "white",
        color: "white",
        fontSize: 16,
        borderWidth: 1,
        textDecorationLine: "none"
    }
    ,
    btn:
    {
        width:  "100%",
        textAlign: "center",
        paddingVertical: 8,
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
    smallerbtn:
    {
        width: 120,
    },
    selected:
    {
        backgroundColor: "white",

    }
    ,
    selectedtxt:
    {
        color: "#483d8b",
    },
    singpass:
    {
        backgroundColor: "red",
        marginTop :20,
        borderRadius: 6,
        width :windowWidth*0.75,
        paddingHorizontal: 10,
        paddingVertical :12,

    }
})


export default Signup