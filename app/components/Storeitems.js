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
import { color } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Storeitems = ({navigation}) => {
    
    //Dummy Items 
    const dummyData = [{"ItemId": 1, "Name" : "Shoes", "Description" : "US size 10 Adidas shoes", "quantity" : 10},
    {"ItemId": 2, "Name" : "Admin bag", "Description" : "30 by 50 cm bag, made with resistant and waterproof material ", "quantity" : 70},
    {"ItemId": 3, "Name" : "Torch", "Description" : "10wh battery torchlight, with multiple shades of green", "quantity" : 5},
    {"ItemId": 4, "Name" : "Swiss knife", "Description" : "sharpened swiss blade, made in france", "quantity" : 30},
    {"ItemId": 5, "Name" : "Jacket", "Description" : "windbreaker jacket", "quantity" : 40},
    {"ItemId": 6, "Name" : "Jacket", "Description" : "windbreaker jacket", "quantity" : 40}]
    
    
    const [items,setItems] = useState([]);

    //useEffect to get a list of all the items for that particulat StoreID. each item can be a json obj
    useEffect(()=>
    {
        console.log("hello")
        setItems(dummyData);
        console.log(items)
    }, [])


    //functions
    const showItem = (item) =>
    {
        console.log(item)
        navigation.navigate("Store Item");
    }


    return (
        <SafeAreaView>
            <ScrollView style= {styles.bg}>
                <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", paddingVertical: 10, paddingHorizontal: 15,}}>
                    
                    {/* Each item represents an element in the items list -> item is a json object, containing the info of a particular item of that store */}
                    
                    {(items!== [] && items!== undefined ) ? items.map((item,index)=>
                    {
                        {/* Each store item is returned here */}
                        return(
                        <View style={{display:"flex", flexDirection: "column", width: "50%", paddingHorizontal: 10, paddingVertical: 15, alignItems: "center"}}>
                            <TouchableOpacity onPress={()=>showItem(item)} style={{ backgroundColor: "#D9D9D9" , display:"flex", flexDirection: "column", alignItems: "center", paddingBottom: 15, borderBottomRightRadius: 15, borderBottomLeftRadius: 15}}>
                                <Image source={require("../images/boots.jpg")} style={{width: windowWidth*0.35, height: windowWidth*0.32,  borderRadius: 15, overflow: 'hidden',}}></Image>
                                <Text style={styles.title}>ITEM {item.ItemId}</Text>
                                <Text style={styles.p}>Qty: {item.quantity}</Text>
                            </TouchableOpacity>
                        </View>)
                    }): <View>casc</View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bg:
    {
        backgroundColor: "#EDECF3",
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "black",
    },
    p:{
        fontSize: 16,
        fontWeight: "400",
        color: "black",


    }
})
export default Storeitems