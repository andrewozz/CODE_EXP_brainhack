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
            <View style={{marginTop: 10, display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "80%"}}>
                <View style={[styles.card, styles.warn]}>
                    <View>
                        <Text style={styles.txt}>Item ID: 1</Text>
                        <Text style={styles.txt}>Name: Admin bag</Text>
                        <Text style={styles.txt}>Quantity: 0</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>EDIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.card, styles.warn]}>
                    <View>
                        <Text style={styles.txt}>Item ID: 2</Text>
                        <Text style={styles.txt}>Name: Shoes</Text>
                        <Text style={styles.txt}>Quantity: 0</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>EDIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.txt}>Item ID: 3</Text>
                        <Text style={styles.txt}>Name: Socks</Text>
                        <Text style={styles.txt}>Quantity: 10</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>EDIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.txt}>Item ID: 4</Text>
                        <Text style={styles.txt}>Name: Cups</Text>
                        <Text style={styles.txt}>Quantity: 10</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>EDIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btntxt}>ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    }
})

export default App;