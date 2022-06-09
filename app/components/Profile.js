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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Profile = () => {
  return (
    <SafeAreaView>
        <ScrollView>
            <Text>Profile</Text>
        </ScrollView>
        <View>
            <Text>TaskBar</Text>
        </View>
    </SafeAreaView>
  )
}

export default Profile;