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
    TextInput,
    ActivityIndicator
} from 'react-native';

import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,
faChevronLeft,faMapPin,faMapMarkerAlt,faAngleDoubleDown, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

const WIDTH =Dimensions.get('window').width;



const Order = ({navigation,route}) =>{
   
  
  

    
    const [isLoad, setLoading]=useState(false);
    const [orderLists, setOrderLists]=useState([])
    
    

    useEffect(()=>{
        fetch('https://goldrich.top/api/rest/customerorders/limit/10/page/1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            //console.log(responseJson);
            if(responseJson.success==1){
                setOrderLists(responseJson.data);
                
                
            }else if(responseJson.success==0){
                
            }
        }).catch((err)=>console.log(err))
        .finally(() => setLoading(!isLoad));

       




    },[])

    return(
            <View >

           
            <View style={{
                backgroundColor:"#cc6a3e",
                borderBottomLeftRadius:10,
                borderBottomRightRadius:10,
                paddingTop:40,
                height:100,
            }}>
                <View style={{alignItems:'center',flex:1,flexDirection:'row'}}>
                    <TouchableOpacity
                        style={{
                            marginLeft:SIZES.padding,
                            
                        }}
                        onPress={()=>navigation.goBack()}
                    >
                        <FontAwesomeIcon 
                            icon={faChevronLeft} color='white' size={25}/>
                    </TouchableOpacity>

                    <Text style={styles.textTitle}>我的訂單</Text>
            
                    
                </View> 
            </View>
                <ScrollView>
                <View style={{paddingHorizontal:25,paddingTop:10,marginBottom:140}}>
                    {!isLoad?<ActivityIndicator/>:orderLists.map((item,index)=>{
                        return (
                            <TouchableOpacity key={item+index}  onPress={()=>{
                                    navigation.navigate('OrderDetail',{id:item.order_id,authorization:route.params.authorization,status:item.status})
                                    //console.log(orderLists);
                                }}>
                                <View style={{backgroundColor:'white',paddingVertical:10,paddingHorizontal:20,borderRadius:5,marginVertical:10}}>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#d9d9d9',paddingBottom:7}}>
                                        <Text style={{fontSize:14}}>訂單編號: #{item.order_id}</Text>
                                        <Text style={{fontSize:14}}>{item.date_added} </Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#d9d9d9'}}>
                                        <View style={{flex:3,flexDirection:'column',paddingVertical:5}}>
                                            {/* <View style={{flexDirection:'row',paddingVertical:5}}>
                                                <FontAwesomeIcon icon={faMapPin} size={22} color="#d9a21b"/><Text style={{marginLeft:5,fontSize:16}}>{}</Text>
                                            </View> */}
                                            <View style={{flexDirection:'row',paddingVertical:5}}>
                                            
                                                <FontAwesomeIcon icon={faAngleDoubleDown} size={22} color="#994100"/>
                                                <Text style={{marginLeft:5,fontSize:16,fontWeight:'700',color:'#cc6a3e'}}>{item.status}</Text>
                                            </View>
                                            {/* <View style={{flexDirection:'row',paddingVertical:5}}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} color="#cc6a3e" size={22}/><Text style={{marginLeft:5,fontSize:16}}>{}</Text>
                                            </View> */}
                                        </View>

                                        <View style={{flex:1,flexDirection:'column',justifyContent:'flex-end',alignItems:'flex-end',paddingBottom:15,paddingRight:15}}>
                                            {
                                                item.qrCode?
                                                    <QRCode 
                                                        value={'123'}
                                                        size={40}
                                                    />
                                                    :null
                                            }
                                        </View>
                                    </View>
                                    

                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:7,alignItems:'center'}}>
                                        <Text style={{fontSize:14}}></Text>
                                        <Text style={{fontSize:18,fontWeight:'700'}}>HK${parseInt(item.total_raw).toFixed(1)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            
                        )
                    })}
                    





                </View>
                </ScrollView>
            </View>
          

           
           
            
       
    )
}

const styles =StyleSheet.create({
    textTitle:{
        marginLeft:SIZES.padding,
        marginRight:SIZES.padding,
        fontSize:20,
        fontWeight:'700',
        color:'#fff'
    },inputsTitle:{
        fontWeight:'700',
        fontSize:16,
        paddingVertical:15
    },
    inputs:{
        backgroundColor:'#f2f2f2',
        borderRadius:4,
        padding:10,
        paddingLeft:36,
        fontSize:16,
        color:'#d3835f',
        fontWeight:'700'
    }
    
});

export default Order;