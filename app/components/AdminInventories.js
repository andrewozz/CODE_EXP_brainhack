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
  Modal
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useStore } from "../context/StoreContext";
import OrderItem from './OrderItem';



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
                    
                    
                    {(items!== [] && items!== undefined ) ? items.map((item,index)=>
                    {
                        {/* Each store item is returned here */}
                        {console.log(item)}
                        return(
                        <View style={{display:"flex", flexDirection: "column", width: "100%", paddingHorizontal: 10, paddingVertical: 15, alignItems: "center"}}>
                            <OrderItem item={item}/>
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
         
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5
      }
})
export default AdminInventories