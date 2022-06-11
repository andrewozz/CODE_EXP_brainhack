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



const Storeitem = ({route,navigation}) => {

  const [storeItem,setStoreItem] = useState(null);
  const [quantity,setQuantity] = useState(0);

  useEffect(()=>
  {
    const item = route.params;
    if (item !== undefined)
    { 
      setStoreItem(item);
    }
  
  },[])

  //function to use the quantity value by user and update the total quantity of the stock items
  const handleConfirm =()=>
  {
    // call axios to go to backend to update the total quantity for that particular store item selected
  
    //Dummy data 
    console.log("UPDATED QTY: ", storeItem.Quantity + (quantity));


  }

  //arithemtic operations
  const add = () => setQuantity(quantity+1);
  const minus = () => setQuantity(quantity-1);

  return (
    <SafeAreaView style={styles.bg}>
        <ScrollView>
          <Image source={require("../images/boots.jpg")} style={{width: windowWidth, resizeMode: 'cover', height: windowHeight*0.35 ,overflow: 'hidden', }}></Image>
          {/* {console.log(item)} */}
          {storeItem ? 
            <View>
                <Text style={styles.title}>{storeItem.Name}</Text>
                <Text style={styles.h1}>{`Current Quantity: ${storeItem.Quantity}`}</Text>
                <Text style ={styles.h5}>{storeItem.Description}</Text>
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
                        <Text style={styles.btntxt}>Confirm</Text>
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
      paddingVertical: 5,
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