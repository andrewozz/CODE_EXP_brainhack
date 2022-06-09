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


const Settings = () => {
  return (
    <SafeAreaView>
        <ScrollView>
            <Text>This is settings page</Text>
        </ScrollView>
        <View>
            <Text>TaskBar</Text>
        </View>
    </SafeAreaView>
  )
}

export default Settings;