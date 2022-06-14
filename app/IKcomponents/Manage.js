import React from 'react';
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

const App = ({navigation}) => {
    return (<ScrollView>
        <SafeAreaView style={styles.bg}>
            <View style={{marginTop: 50, display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "80%"}}>
                <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate("Inventory")}}>
                    <Text style={styles.btntxt}>Inventory</Text>
                    <Inventory name="inventory" size={45} color="white" style={{paddingVertical: 12}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} >
                    <Text style={styles.btntxt}>Activity</Text>
                    <Feed name="feed" size={45} color="white" style={{paddingVertical: 15, marginHorizontal: 4}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} >
                    <Text style={styles.btntxt}>Order History</Text>
                    <History name="history" size={50} color="white" style={{paddingVertical: 8, marginHorizontal: -4}}/>
                </TouchableOpacity>
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
        width:  "100%",
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 2,
        borderWidth: 1,
        borderColor: "white", 
        borderRadius: 3,
    },
    btntxt:
    {
        textAlign: "left",
        color: "white",
        fontSize: 22,
        paddingVertical: 20,
    },
    card:{
        backgroundColor: "#483d8b",
        width: "100%",
        marginTop: 15,
        height: 70,
        borderRadius: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent : "space-between",
        paddingHorizontal: 20,
    },
})

export default App;