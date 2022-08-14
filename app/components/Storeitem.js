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

const images = {
	shoes: require("../images/shoes.png"),
	bag: require("../images/bag.png"),
	torch: require("../images/torch.png"),
    knife: require("../images/knife.png"),
	jacket: require("../images/jacket.png"),
};
const images2 = {
	shoes: require("../images/shoes.png"),
    cream: require("../images/cream.png"),
	torch: require("../images/torch.png"),
	knife: require("../images/knife.png"),
    jacket: require("../images/jacket.png"),
    shirt: require("../images/shirt.png"),
    shorts: require("../images/shorts.png"),


};

const keys = ["shoes","bag", "torch",  "knife", "jacket"]
const keys2 = ["shoes","cream", "torch", "knife", "jacket",  "shirt", "shorts"];


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Add from 'react-native-vector-icons/Ionicons';
import Minus from 'react-native-vector-icons/Feather';
import IconSummary from 'react-native-vector-icons/Ionicons';
import { IconBase } from 'react-icons';
import { useStore } from "../context/StoreContext";
import { useItem } from '../context/ItemContext';
import { useAuth } from "../context/AuthContext";



const Storeitem = ({route,navigation}) => {

  const {update,setUpdate} = useStore();
  const {itemInfo,setItemInfo} = useItem();
  const {userInfo} = useAuth();


  const [currentQuantity,setCurrentQuantity] = useState(0);
  const [storeItem,setStoreItem] = useState(null);
  const [quantity,setQuantity] = useState(0);
  const[index,setIndex] = useState(0);
  const {campName,storeIdName,activities,setActivities} = useStore();

  useEffect(()=>
  {
    const item = route.params;
    if (item !== undefined)
    { 
      setStoreItem(item);
      setCurrentQuantity(item.quantity);
      setIndex(item.itemId-1);
      console.log(item);
    }
  
  },[])


  //function to use the quantity value by user and update the total quantity of the stock items
  const handleConfirm =()=>
  {

    // call axios to go to backend to update the total quantity for that particular store item selected
    axios.post("http://10.0.2.2:3005/api/inventory/update-quantity-store-item",{params: {"camp": campName, "storeId" : storeIdName, "itemId" : storeItem.itemId, "change": quantity,"userInfo" :userInfo, "itemName" : storeItem.name, "date": `${Date().toLocaleString()}`}})
    .then((res)=> {
        if (quantity<0) Alert.alert(`You withdrew ${-1*quantity} ${storeItem.name}!`);
        else if (quantity >0) Alert.alert(`You deposited ${quantity} ${storeItem.name}!`)
        else {Alert.alert(`You did not withdraw or deposit any ${storeItem.name}! `)}
        
        // add this activity to the useState variable, activities
        let today = new Date();
        const activity = {"name": `${storeItem.name}`, "quantity": `${quantity}`, "date": `${today.toLocaleString()}`}
        setActivities([...activities,activity]); //append to list of activities
        setCurrentQuantity(currentQuantity+quantity); //update quantity on ui
        setUpdate(update+1); // represents a change where the event listener would make an axios req to get updated data
        setQuantity(0); //reset input field

        
        
    })
    .catch((err)=> {clearForm(); Alert.alert( "something went wrong! PLease try again");console.log(err.message)})



  }

  //arithemtic operations
  const add = () => setQuantity(quantity+1);
  const minus = () => setQuantity(quantity-1);

  return (
    <SafeAreaView style={styles.bg}>
        <ScrollView style={{position: "relative"}}>
          <IconSummary onPress={()=> navigation.navigate("Summary")} name='exit' size={45} style={{position: "absolute", zIndex: 100, top: 10, right: 10, color: "darkslateblue"}}/>
          <Image source={images[keys[index]]} style={{width: windowWidth, resizeMode: 'cover', height: windowHeight*0.35}}></Image>
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