import React,{useEffect, useState} from 'react';
import { 
    View,
    Text,
    Image,
   TouchableHighlight,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput
} from 'react-native';
import { WebView } from 'react-native-webview';
import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,
faChevronLeft,faMapPin,faMapMarkerAlt,faAngleDoubleDown, faMapMarkedAlt,faThLarge,
faLevelDownAlt,faSortAmountDown,faShareAlt,faCaretRight} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem ,CheckBox,Rating} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import DateTimePicker from '@react-native-community/datetimepicker';



const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const PayGateway= ({navigation,route}) =>{
 

    const sender={
        name:'Lee, Jordan',
        phone:'+852 9000 4710',
        email:'wendylou@gmail.com',
        address:''
    }
    
    const recipient={
        name:'Sam Wong',
        phone:'+852 9000 4710',
        email:'Sam.W@gmail.com',
        address:''
    }
    

    const onSubmit = data =>{

        fetch('https://goldrich.top/api/rest/confirm', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);

            if(responseJson.success ==1){
              
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))




    }
    

    useEffect(()=>{
        fetch('https://goldrich.top/api/rest/paymentmethods', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);

            if(responseJson.success ==1){
              
                fetch('https://goldrich.top/api/rest/paymentmethods', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer '+route.params.authorization,
                        
                    },body:JSON.stringify({
                        "payment_method": "pp_standard",
                        "agree": 1,
                        "comment": ""
                    })
                })
                .then(response=>response.json())
                .then((responseJson)=>{
                    console.log(responseJson);
                    if(responseJson.success == 0){
                            
                    }else if(responseJson.success ==1){
                       
                    }
                }).catch((err)=>console.log(err));




            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))


        
    },[])


    return(

            <View >

                <View style={{
                    backgroundColor:"#cc6a3e",
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
                    paddingTop:40,
                    height:100,
                    zIndex:5,
                    
                }}>
                    <View style={{alignItems:'center',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity
                                style={{
                                    marginLeft:SIZES.padding,
                                    
                                }}
                                onPress={()=>navigation.goBack()}
                            >
                                <FontAwesomeIcon 
                                    icon={faChevronLeft} color='white' size={25}/>
                            </TouchableOpacity>

                            <Text style={styles.textTitle}>結賬</Text>
                        </View>
                        

                       
                        
                    </View> 
                </View>
                
                <View style={{padding:25,marginBottom:120}}>
                    <View style={{backgroundColor:'white',paddingHorizontal:20,borderRadius:10}}>
                        <Text style={{fontWeight:'700',borderBottomWidth:1,borderBottomColor:'#d2d2d2',paddingVertical:10}}>付款方式</Text>
                        <View style={{flexDirection:'row',paddingVertical:10}}>
                            <Image source={require('../../../assets/visa.png')} style={{width:50,height:50}}/>
                            <Image source={require('../../../assets/mc.png')} style={{width:50,height:50,marginHorizontal:30}}/>
                            <Image source={require('../../../assets/unionpay.png')} style={{width:50,height:50}}/>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Button
                            buttonStyle={{
                                padding:10,
                                borderWidth: 0,
                                borderRadius:20, 
                                backgroundColor:"#d9a21b",
                                marginTop:60,
                                width:WIDTH*0.6
                            }}
                            title="付款"
                            onPress={onSubmit}  
                        />
                    </View>
                </View>
                <WebView 
                    style={styles.container}
                    source={{ uri: 'https://expo.dev' }}
                />




                
            </View>
          

           
           
            
       
    )
}

const styles =StyleSheet.create({
    textTitle:{
        marginLeft:15,
        marginRight:SIZES.padding,
        fontSize:20,
        fontWeight:'700',
        color:'#fff'
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    
});

export default PayGateway;