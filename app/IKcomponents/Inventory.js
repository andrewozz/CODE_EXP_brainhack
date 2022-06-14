import React, {useEffect, useState} from 'react';
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
import Inventory from 'react-native-vector-icons/MaterialIcons';
import History from 'react-native-vector-icons/MaterialIcons';
import Feed from 'react-native-vector-icons/FontAwesome';
import { useStore } from "../context/StoreContext";
import axios from "axios";

const App = ({navigation}) => {

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

    return (<ScrollView>
        <SafeAreaView style={styles.bg}>
            <View style={{marginTop: 10, display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "80%"}}>
                {(items!== [] && items!== undefined ) ? items.map((item,index)=>{
                    return (
                        <View style={[styles.card].concat(item.quantity<=10?[styles.warn]:[])}>
                            <View>
                                <Text style={styles.txt}>Item ID: {index}</Text>
                                <Text style={styles.txt}>Name: {item.name}</Text>
                                <Text style={styles.txt}>Quantity: {item.quantity}</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.btntxt}>EDIT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate({name : "Store Item", params: {item, event: 'order'}})}}>
                                    <Text style={styles.btntxt}>ORDER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }):<Text>No items!</Text>}
            </View>
        </SafeAreaView>
    </ScrollView>);
}

const styles = StyleSheet.create({
    bg:
    {
        display: "flex",
        flexDirection: "row",
        justifyContent : "center",
        alignItems: "center",
        backgroundColor: "#EDECF3",
        width: "100%",
    },
    btn:
    {
        backgroundColor: "#483d8b",
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    btntxt:
    {
        textAlign: "center",
        color: "white",
        fontSize: 17,
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 17,
    },
    card:{
        backgroundColor: "white",
        width: "100%",
        marginTop: 15,
        height: 100,
        borderRadius: 4,
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent : "space-between",
    },
    warn: {
        borderColor: 'red',
        borderWidth: 2,
        padding: 13,
        backgroundColor: '#f4cccc',
    }
})

export default App;