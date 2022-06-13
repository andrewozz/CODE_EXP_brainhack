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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Add from 'react-native-vector-icons/Ionicons';
import Minus from 'react-native-vector-icons/Feather';
import IconSummary from 'react-native-vector-icons/Ionicons';
import { IconBase } from 'react-icons';
import { useStore } from "../context/StoreContext";
import { useItem } from '../context/ItemContext';




const Storeitem = ({route,navigation}) => {

  const {update,setUpdate} = useStore();
  const {itemInfo,setItemInfo} = useItem();

  const [currentQuantity,setCurrentQuantity] = useState(0);
  const [storeItem,setStoreItem] = useState(null);
  const [quantity,setQuantity] = useState(0);
  const {campName,storeIdName} = useStore();

  useEffect(()=>
  {
    const item = route.params;
    if (item !== undefined)
    { 
      setStoreItem(item);
      setCurrentQuantity(item.quantity);
    }
  
  },[])


  //function to use the quantity value by user and update the total quantity of the stock items
  const handleConfirm =()=>
  {

    // call axios to go to backend to update the total quantity for that particular store item selected
    axios.post("http://10.0.2.2:3005/api/inventory/update-quantity-store-item",{params: {"camp": campName, "storeId" : storeIdName, "itemId" : storeItem.itemId, "change": quantity}})
    .then((res)=> {
        console.log("successfully edited quanity!");
        if (quantity<0) Alert.alert(`You withdrew ${-1*quantity} ${storeItem.name}!`);
        else if (quantity >0) Alert.alert(`You deposited ${quantity} ${storeItem.name}!`)
        else
        {
          Alert.alert(`You did not withdraw or deposit any ${storeItem.name}! `)
        }
        setQuantity(0); //reset input field
        console.log("NOW",currentQuantity+quantity)
        setCurrentQuantity(currentQuantity+quantity);
        setUpdate(update+1);
        
    })
    .catch((err)=> {clearForm(); Alert.alert( "something went wrong! PLease try again");console.log(err.message)})



  }

  //arithemtic operations
  const add = () => setQuantity(quantity+1);
  const minus = () => setQuantity(quantity-1);

  return (
    <SafeAreaView style={styles.bg}>
        <ScrollView style={{position: "relative"}}>
          <IconSummary onPress={()=> navigation.navigate("Summary")} name='newspaper' size={35} style={{position: "absolute", zIndex: 100, top: 15, right: 15, color: "white"}}/>
          <Image source={require("../images/boots.jpg")} style={{width: windowWidth, resizeMode: 'cover', height: windowHeight*0.35 ,overflow: 'hidden', }}></Image>
          {/* {console.log(item)} */}
          {storeItem ? 
            <View>
                <Text style={styles.title}>{storeItem.name}</Text>
                <Text style={styles.h1}>{`Current Quantity: ${currentQuantity}`}</Text>
                <Text style ={styles.h5}>{storeItem.description}</Text>
                <View style={{display: "flex",flexDirection: "column", alignItems: "center"}}>
                  <View style={[styles.card,{display: "flex",flexDirection: "column", alignItems: "center"}]}>
                    <View style={{display: "flex",flexDirection: "row", justifyContent: "space-around", marginBottom: 15}}>
                      <TouchableOpacity style={[styles.arithmetic,{marginHorizontal: 15}]} onPress={add}>
                        <Add name='add-circle-outline' size = {35} color ="white"></Add>
                      </TouchableOpacity>
                      <Text style={{fontSize: 25, color:  "white", marginHorizontal: 10}}>{quantity}</Text>
                      <TouchableOpacity style={[styles.arithmetic,{paddingTop: 2, marginHorizontal: 15}]} onPress={minus}>
                        <Minus name="minus-circle" size={30} color= "white" style={{margin: 0}}></Minus>
                      </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={styles.btn} onPress={handleConfirm}>
                        <Text style={styles.btntxt}  >Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View> 
            : <View><Text>Item Unavailable</Text></View>
          }
        
        </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  bg:
  {
      backgroundColor: "#EDECF3",
      height: windowHeight,
      display: "flex",
      flexDirection: "column",
      alignItems:  "center",
  },
  
  title : {
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
      color: "white",
      marginTop: 20,
      backgroundColor: "#483d8b",
      paddingVertical: 10,
      paddingTop :10,
  }
  ,
  h1:{
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
      color: "white",
      backgroundColor: "#483d8b",
      paddingVertical: 10,
      paddingBottom: 10,
  },
  h5:
  {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal :10,
    paddingVertical: 10,
  },
  text: {
      color: "white",
      fontSize: 18,
      textAlign :"center"
  },
  card:
  {
    backgroundColor: "#483d8b",
    paddingVertical: 20,
    marginTop: 5,
    paddingHorizontal: 20,
    width: windowWidth*0.65,
    borderRadius: 5,
  },
  btn:
    {
        width:  "80%",
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
})

export default Storeitem