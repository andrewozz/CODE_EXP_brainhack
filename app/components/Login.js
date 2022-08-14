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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useAuth } from "../context/AuthContext";

import UserFlow from '../UserFlow';

const Login = ({navigation}) => {

    //use auth context -> set uid 
    const {userInfo,setUserInfo} = useAuth();

    const [email,setOnChangeEmail] = useState("") // both email n pw will be sent to db
    const [password,setOnChangePassword] = useState("")
    const [role,setRole] = useState(""); //user or admin role will be sent to db
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)


    const navigateToSignup =() =>
    {
        clearForm();
        navigation.navigate("Signup");
    }

    const clearForm = () =>
    {
        setOnChangeEmail("");
        setOnChangePassword("");
        setIsAdmin(false);
        setIsUser(false);
    }
    
    const handleLogin = () =>
    {   

        //validations for field inputs
        if (email === "" || password === "" )
        {
            Alert.alert("Please enter valid email or password!");
            clearForm();
            return;
        }   

        //send email and pasword to server to authenticate user --> response returns uid and name
        axios.get("http://10.0.2.2:3005/api/users/login-user",{params: {email: email, password: password, role: role}})
        .then((res)=> {Alert.alert(`welcome ${res.data.name}`);
        clearForm();
        const userData = res.data;
        console.log("BEFORE: ", userData)
        userData.name = res.data.name;
        userData.uid = res.data.uid;
        userData.role = res.data.role;
        console.log("AFTER: ", userData)
        setUserInfo(userData);

        //depending on role -> navigate to the correct user flow
        if (userData.role === "user")
        {
            navigation.navigate("UserFlow");

        }
        else if (userData.role === "admin")
        {
            navigation.navigate("AdminFlow");
        }
        else
        {
            throw new Error("invalid user type!")
        }


        navigation.navigate("Home");})
        .catch((err)=> {clearForm();Alert.alert(err.response.data);console.log(err.message)})

    }



    return (
        <ScrollView>
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
                    value ={email}
                    />
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangePassword}
                    placeholder = "Password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="white" 
                    secureTextEntry={true}
                    value = {password}
                    />
                    <View style ={{marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <TouchableOpacity style={[styles.btn,styles.smallerbtn,isUser ? styles.selected:styles.unselected]} onPress={()=>{setIsUser(true);setIsAdmin(false);setRole("user")}}>
                                <Text style={[styles.btntxt,isUser ? styles.selectedtxt:styles.unselected]}>User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,styles.smallerbtn,isAdmin ? styles.selected:styles.unselected]} onPress={()=>{setIsAdmin(true);setIsUser(false);setRole("admin")}}>
                                <Text style={[styles.btntxt, isAdmin ? styles.selectedtxt: styles.unselected]}>Admin</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{position:  "relative", paddingVertical: 20,marginTop: 5,}}>
                        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                            <Text style={styles.btntxt}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{position:  "relative"}}>
                        <TouchableOpacity style={styles.btn} onPress={navigateToSignup}>
                            <Text style={styles.btntxt}>Sign Up</Text>
                        </TouchableOpacity>
                    </View> */}
                    <Text onPress={()=> {clearForm();navigateToSignup()}}  style={{textAlign:"center",marginTop: 3, color: "white"}}>Sign up for an account here!</Text>
                </View>

                <View>
                    <TouchableOpacity style={[styles.btn,styles.singpass]}>
                        <Text style={styles.btntxt}>Singpass Login</Text>
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bg:
    {
        display: "flex",
        flexDirection: "row",            
        alignItems: "center",
        backgroundColor: "#EDECF3",
        height: windowHeight,
    },
    card:{
        backgroundColor: "#483d8b",
        width: "75%",
        marginTop: 100,
        height: 330,
        borderRadius: 4,
        padding: 25,
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

export default Login