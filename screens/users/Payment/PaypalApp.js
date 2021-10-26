import React from 'react';
import { View, Text, TouchableOpacity,Modal } from 'react-native';
import {WebView} from 'react-native-webview';

const styles = {
    container:{
        flex:1,
    }
}

const PaypalApp = () =>{
    <View style={styles.container}>
        <WebView source={{uri:'https://google.com'}}/>
    </View>
}

export default PaypalApp;