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
import { useStore } from "../context/StoreContext";



const Storeitems = ({navigation}) => {
    
    const [items,setItems] = useState([]);    
    const {campName,storeIdName,update} = useStore();


    //useEffect to get a list of all the items for that particulat StoreID. each item can be a json obj
    useEffect(()=>
    {
        axios.get("http://10.0.2.2:3005/api/inventory/get-all-store-items",{params: {"camp": campName, "storeId" : storeIdName}})
        .then((res)=> {
            //res.data will contain all the store items 
            // console.log(res.data.items);
            setItems(res.data.items);
            
        })
        .catch((err)=> {Alert.alert("Something went wrong! Please try again!");clearForm();console.log(err.message)})
        
    }, [update])


    //functions
    const showItem = (item) =>
    {
        console.log(item)
        navigation.navigate({name : "Store Item", params: item});
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
                            <TouchableOpacity onPress={()=>showItem(item)} style={{ backgroundColor: "#D9D9D9" , display:"flex", flexDirection: "column", alignItems: "center", paddingBottom: 15, borderRadius: 15}}>
                                <Image source={require("../images/boots.jpg")} style={{width: windowWidth*0.35, height: windowWidth*0.32,  borderRadius: 15, overflow: 'hidden', marginBottom: 5}}></Image>
                                <Text style={styles.title}>{item.name}</Text>
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
        fontSize: 16,
        fontWeight: "700",
        color: "black",
        paddingHorizontal :10,
        textAlign:  "center"
    },
    p:{
        fontSize: 16,
        fontWeight: "400",
        color: "black",


    }
})
export default Storeitems