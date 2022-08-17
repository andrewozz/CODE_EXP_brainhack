import React,{useState,useEffect} from 'react';
import axios from "axios"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
  Image,
  TextInput,
  View,
  Alert,
  Modal,    
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//react native vector icons import
import Close from 'react-native-vector-icons/AntDesign';

import { useStore } from "../context/StoreContext";


const OrderItem = ({item}) => {
    const {campName,storeIdName} = useStore();

    const [showModal, setShowModal] = useState(false);
    const [orderQuantity,setOrderQuanity] = useState(0);

    const toggleModal = ()=>
    {
        setShowModal(!showModal);
    }

    const submitOrder = ()=>
    {
       const {itemId,name} = item;
       var currentdate = new Date();
       currentdate = currentdate.toLocaleString(); 


       if (orderQuantity === 0)
       {
         Alert.alert("Please order at least one or more quanitites!");
         return;
       }
       const orderedItem = {campName,storeIdName,itemId,name,orderQuantity,currentdate}

       
        //do a http post request to send orders to backend db, primary key: campName-storeIdNAME
        axios.post("http://10.0.2.2:3005/api/order/send-order-item" , {params: orderedItem})
        .then(()=>  {Alert.alert(`Successfully ordered ${orderedItem.orderQuantity} of ${orderedItem.name}!`);setShowModal(!showModal);setOrderQuanity(0); })
        .catch((err) => {Alert.alert("something went wrong!");setShowModal(!showModal);setOrderQuanity(0); } )





    }
  return (
            <View style={{ backgroundColor: "#D9D9D9" , display:"flex", flexDirection: "row", alignItems: "center", padding: 10, paddingHorizontal: 15,borderRadius: 15, justifyContent: "center"}}>
                <View style={{ backgroundColor: "#D9D9D9" , display:"flex", flexDirection: "column", alignItems: "center", width: "80%",padding: 15, borderRadius: 15}}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.p}>Qty: {item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={toggleModal} style={{ backgroundColor: "darkslateblue" , display:"flex",borderRadius: 5, padding :10,paddingHorizontal: 20}}>
                    <Text style={{color: "white"}}>Order</Text>
                </TouchableOpacity>

                <Modal animationType="fade" transparent={true} visible={showModal}>

                    <View style={[styles.centeredView,{paddingHorizontal: 5, paddingVertical: 20,backgroundColor: "rgba(0,0,0,0.5)"}]} blurRadius = {100} >
                        <View style={[styles.modalView,{paddingHorizontal: 20, paddingVertical: 40,}]}>

                            {/* insert close modal icon */}
                            <Close style={styles.close} onPress={toggleModal} name="closecircle" size={25} color = "darkslateblue"/>

                            <Text style={styles.header}>Making orders for {item.name}</Text>
                            <TextInput
                            clearButtonMode="always"
                            style={styles.input}
                            onChangeText={setOrderQuanity}
                            keyboardType='numeric'

                            placeholder = "Order Quantity"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="darkslateblue" 
                            secureTextEntry={false}
                            // value = {password}
                            />
                            <TouchableOpacity onPress={submitOrder} style={{ marginVertical: 20, backgroundColor: "darkslateblue" , display:"flex",borderRadius: 5, paddingVertical : 15,paddingHorizontal: 20, width: "90%", marginLeft: "auto", marginRight: "auto", justifyContent: "center"}}>
                                <Text style={{color: "white", textAlign: "center", fontSize: 16}}>Submit Order</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>


        </View>
  )
}

const styles = StyleSheet.create({
   
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "black",
        paddingHorizontal :10,
        textAlign:  "center",
    },
    p:{
        fontSize: 18,
        fontWeight: "400",
        color: "black",
        textAlign: "center"


    }
    ,
    close: {
        position: "absolute",
        top: 0,
        right:0,
        margin: 20,

    },
    input:
    {
        fontSize: 15,
        borderColor: "#483d8b",
        borderBottomColor: "darkslateblue",
        borderWidth: 2,
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        textDecorationLine: "none"
    },
    header:
    {
        fontSize: 25,
        textAlign: "center",
        marginVertical: 25,
        color: "darkslateblue",
        fontWeight:  "600"
    }
    ,
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position:"relative"
      },
      modalView: {
        width:"100%",
        position:"absolute",
        bottom:0,

        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
         
        shadowColor: "#4048BF",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5
      }
})

export default OrderItem