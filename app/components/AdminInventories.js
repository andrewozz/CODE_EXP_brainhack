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



const AdminInventories = ({navigation}) => {
    
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
                        <View style={{display:"flex", flexDirection: "column", width: "100%", paddingHorizontal: 10, paddingVertical: 15, alignItems: "center"}}>
                            
                            <View style={{ backgroundColor: "#D9D9D9" , display:"flex", flexDirection: "row", alignItems: "center", padding: 10, paddingHorizontal: 15,borderRadius: 15, justifyContent: "center"}}>
                                <View style={{ backgroundColor: "#D9D9D9" , display:"flex", flexDirection: "column", alignItems: "center", width: "80%",padding: 15, borderRadius: 15}}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <Text style={styles.p}>Qty: {item.quantity}</Text>
                                </View>
                                <TouchableOpacity style={{ backgroundColor: "darkslateblue" , display:"flex",borderRadius: 5, padding :10,paddingHorizontal: 20}}>
                                    <Text style={{color: "white"}}>Order</Text>
                                </TouchableOpacity>

                            </View>
                        </View>)
                    }): <View></View>}
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
})
export default AdminInventories