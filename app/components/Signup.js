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
    const [name,setOnChangeName] = useState("")

    const clearForm = () =>
    {
        setOnChangeEmail("");
        setOnChangeConfirmPassword("")
        setOnChangePassword("");
    }
    
    const handleSignup = () =>
    {   

        //validations for field inputs
        if (email === "" || password === "" || confirmPassword === "")
        {
            Alert.alert("Please fil up all the fields!");
            clearForm();    
            return;
        }

        if (password !== confirmPassword){Alert.alert("Passwords do not match!"); clearForm(); return;}
        
        axios.post("http://10.0.2.2:3005/api/users/create-user-account" , {params: {"email": email, "password": password, "name" : name} })
        .then(()=>  {Alert.alert("succssful!"); navigation.navigate("Login"); clearForm(); })
        .catch((err) => {alert(err.response.data);clearForm();} )
    }

    const navigateToLogin = () =>
    {
        clearForm();
        navigation.navigate("Login");
    }

    return (
        <ScrollView>
            <SafeAreaView
                contentInsetAdjustmentBehavior="automatic"
                style ={styles.bg}
                >
                <View style={styles.card}>
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangeEmail}
                    underlineColorAndroid="transparent"
                    placeholder = "email"
                    placeholderTextColor="white" 
                    value={email}
                    />
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangeName}
                    underlineColorAndroid="transparent"
                    placeholder = "name"
                    placeholderTextColor="white" 
                    value={name}
                    />
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangePassword}
                    placeholder = "password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="white" 
                    secureTextEntry={true}
                    value ={password}
                    />
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangeConfirmPassword}
                    placeholder = "confirm password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="white" 
                    secureTextEntry={true}
                    value = {confirmPassword}
                    />

                    <View style={{position:  "relative", paddingVertical: 20,marginTop: 5,}}>
                        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
                            <Text style={styles.btntxt}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <Text onPress={navigateToLogin} style={{textAlign:"center",marginTop: 3, color: "white"}}>Login to an existing account!</Text>
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
        justifyContent : "center",
        alignItems: "center",
        height: windowHeight*0.75,
    },
    card:{
        backgroundColor: "#483d8b",
        width: "75%",
        borderRadius: 4,
        padding: 25,
        position: "relative"
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
    }
})


export default Signup