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

const Login = ({navigation}) => {

    const [email,setOnChangeEmail] = useState("")
    const [password,setOnChangePassword] = useState("")

    const navigateToLogin =() =>
    {
        navigation.navigate("Signup");
    }

    const clearForm = () =>
    {
        setOnChangeEmail("");
        setOnChangePassword("");
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
        
        //send email and pasword to server to authenticate user
        axios.get("http://10.0.2.2:3005/api/users/login-user",{params: {email: email, password: password}})
        .then((res)=> {Alert.alert(`welcome ${res.data.name}`);clearForm();navigation.navigate("Home");})
        .catch((err)=> {clearForm();Alert.alert(err.response.data);console.log(err.message)})

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
                    value ={email}
                    />
                    <TextInput
                    clearButtonMode="always"
                    style={styles.input}
                    onChangeText={setOnChangePassword}
                    placeholder = "password"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="white" 
                    secureTextEntry={true}
                    value = {password}
                    />
                    <View style={{position:  "relative", paddingVertical: 20,marginTop: 5,}}>
                        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                            <Text style={styles.btntxt}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text onPress={navigateToLogin}  style={{textAlign:"center",marginTop: 3, color: "white"}}>Sign up for an account here!</Text>
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
        height: windowHeight*0.8,
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

export default Login