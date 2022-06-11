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
  ImageBackground,
  useColorScheme,
  Image,
  TextInput,
  View,
  Alert,
} from 'react-native';
// import Qr from 'react-native-vector-icons/AntDesign';
// import { set } from 'express/lib/application';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ScanStore = ({navigation}) => {

    const [storeId, setStoreId] = useState("");
    const [camp,setCamp] = useState("");

    const clearForm = () =>
    {
        setStoreId("");
        setCamp("");
    }
    
    const handleSubmit = () =>
    {
        //clear form after submission
        clearForm();
        //validate if storeID and passcode matches using axios req to backend



        // Assuming axios returns res.status(200) and user successfully enters correct ID and password for store
        navigation.navigate("Loading");

    }

  return (
    <SafeAreaView style={[{padding: 15, display: "flex",flexDirection: "column", alignItems: "center", height: windowHeight},styles.bg]}>
        {/* <Text>scanning store</Text> */}
        {/* <View style={styles.box}>
            <Qr name="qrcode" size={260} color = "black"></Qr>
        </View> */}
        {/* <Text style={styles.title}>Scan QR code</Text> */}
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
                    

                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btntxt}>ENTER</Text>
                </TouchableOpacity>

            </View>
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