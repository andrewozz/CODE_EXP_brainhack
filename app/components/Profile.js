import React,{useState,useEffect} from 'react';
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

import Taskbar from './Taskbar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Profile = () => {
  return (
    <SafeAreaView style={{paddingHorizontal :20, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#EDECF3", position: "relative", height: windowHeight, }}>
        
        
        <View style={styles.profile}>
          <ScrollView >
            <View>
              <Text style={styles.text} >Profile</Text>
            </View>
          </ScrollView>
        </View>

        {/* use taskbar component */}
        <View style={styles.Taskbar}>
          <Taskbar/>
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profile:
  {
    height: windowHeight*0.7,
    width: "100%",
    backgroundColor: "yellow",
    
  },
  Taskbar:
  {
    width : "100%",
    marginTop: 20,
  },
  text:
  {
    
  }
})



export default Profile;
