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
    Platform,
    ActivityIndicator
} from 'react-native';

import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,
faChevronLeft,faMapPin,faMapMarkerAlt,faAngleDoubleDown, faMapMarkedAlt,faRoute,faTruck,faListAlt} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { alignItems } from 'styled-system';

const WIDTH =Dimensions.get('window').width;



const OrderDetail = ({navigation,route}) =>{
    //console.log(route.params.id)
    const id = route.params.id;
    const [status, setStatus]=useState();
    const [isLoad, setLoading]=useState(true);
    const [order, setOrder] = useState({});
    

    const generateBoxShadowStyle = (
        xOffset,
        yOffset,
        shadowColorIos,
        shadowOpacity,
        shadowRadius,
        elevation,
        shadowColorAndroid,
      ) => {
        if (Platform.OS === 'ios') {
          styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: {width: xOffset, height: yOffset},
            shadowOpacity,
            shadowRadius,
          };
        } else if (Platform.OS === 'android') {
          styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
          };
        }
      };
    

    useEffect(()=>{
        fetch('https://goldrich.top/api/rest/customerorders/'+route.params.id, {
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
                setOrder(responseJson.data);
                setStatus(responseJson.data.histories[responseJson.data.histories.length-1].status);
                //console.log(status);
            }else if(responseJson.success==0){
                
            }
        }).catch((err)=>console.log(err))
        .finally(() => setLoading(false));
    },[])
    generateBoxShadowStyle(-2, 4, '#f5f5f5', 0.2, 3, 4, '#f5f5f5');

   



    return(
        <View >
            <ScrollView >
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
            
           
                <View style={{paddingHorizontal:25,paddingVertical:20}}>
                    <View style={{backgroundColor:'white',padding:20}}>
                        <View style={{alignItems:'center',borderBottomWidth:1,paddingBottom:20,borderBottomColor:'#c5c5c5'}}>
                            {isLoad?<ActivityIndicator/>:
                               <View style={{alignItems:'center'}}>
                                    {status=='Complete'?<QRCode value={route.params.id} size={40}/>:status=='Shipped'?<FontAwesomeIcon icon={faTruck} size={40} style={{}}/>:status=='Pending'?<FontAwesomeIcon icon={faListAlt} size={40} style={{}}/>:null}
                                    <Text style={{fontSize:18,color:'#623f31',fontWeight:'700',marginTop:5}}>{status=='Complete'?`到店自取券編號: #${route.params.id}`:status=='Shipped'?'運輸中':status=='Pending'?'待辦的':null}</Text>
                                    <Text style={{fontSize:18, color:'#cf744a',fontWeight:'700',marginTop:5}}>+ 積分</Text>             
                                </View>
                                
                                
                            }
                                {isLoad?<ActivityIndicator/>:order.products.map((item,index)=>{
                                    return(
                                        <View key={item.name+index} style={[styles.listItem,styles.boxShadow]}>
                                            <View style={{flex:1}}>
                                                <Image source={item.image||null} style={{height:'100%',width:'100%'}} resizeMode='cover'/>
                                            </View>
                                            <View style={{flex:2,paddingLeft:10,justifyContent:'center'}}>
                                                <Text style={styles.itemName}>{item.name}</Text>
                                                <View >
                                                    <Text style={styles.itemPrice}>${item.price_raw.toFixed(1)}</Text>
                                                    <Text style={styles.itemCount}>x{item.quantity}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                                

                                {isLoad?<ActivityIndicator/>:order.totals.map((item,index)=>{
                                    return(
                                        <View key={item.code+index} style={{marginTop:5,flexDirection:'row',flex:1,justifyContent:"space-between",alignSelf:'flex-end',marginHorizontal:10,width:'50%'}}>
                                            <Text style={{fontWeight:'700',alignItems:'flex-start'}}>{item.title}</Text>                    
                                            <Text style={{alignItems:'flex-end'}}>${parseInt(item.value).toFixed(1)}</Text>
                                        </View>
                                    )
                                })}
                                
                                
                        </View>
                        {isLoad?<ActivityIndicator/>:
                            <View style={{flexDirection:'column',padding:10}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={styles.inputsTitle}>寄件方姓名</Text>
                                        <Text style={styles.inputs}>{order.payment_firstname} {order.payment_lastname}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.inputsTitle}>聯絡電話</Text>
                                        <Text style={styles.inputs}>{order.telephone}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>聯絡電郵</Text>
                                    <Text style={styles.inputs}>{order.email}</Text>
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>寄件方地址</Text>
                                    <Text style={styles.inputs}>{order.payment_address_1}</Text>
                                </View>
                            </View>
                        }
                        
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, height: 1, backgroundColor: '#c5c5c5'}} />
                            <View >
                                <FontAwesomeIcon icon={faRoute} size={30} style={{marginHorizontal:10}}/>
                            </View>
                            <View style={{flex: 1, height: 1, backgroundColor: '#c5c5c5'}} />
                        </View>

                        {isLoad?<ActivityIndicator/>:
                            <View style={{flexDirection:'column',padding:10,borderBottomWidth:1,borderBottomColor:'#c5c5c5'}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={styles.inputsTitle}>收件方姓名</Text>
                                        <Text style={styles.inputs}>{order.shipping_firstname} {order.shipping_lastname}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.inputsTitle}>聯絡電話</Text>
                                        <Text style={styles.inputs}></Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>聯絡電郵</Text>
                                    <Text style={styles.inputs}></Text>
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>收件方地址</Text>
                                    <Text style={styles.inputs}>{order.shipping_address_1}</Text>
                                </View>
                            </View>
                        }
                        

                        {isLoad?<ActivityIndicator/>:
                        <View style={{padding:10,marginBottom:15}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <View style={{flex:2}}>
                                    <View >
                                        <Text style={styles.inputsTitle}>上門收件時間</Text>
                                        <Text style={styles.inputs}></Text>
                                    </View>
                                    <View >
                                        <Text style={styles.inputsTitle}>付款方式</Text>
                                        <Text style={styles.inputs}>{order.payment_method}</Text>
                                    </View>
                                    <View >
                                        <Text style={styles.inputsTitle}>下單時間</Text>
                                        <Text style={styles.inputs}>{order.date_modified}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1}}>
                                    <View >
                                        <Text style={styles.inputsTitle}>可取件日期</Text>
                                        <Text style={styles.inputs}></Text>
                                    </View>
                                    <View >
                                        <Text style={styles.inputsTitle}>運送方式</Text>
                                        <Text style={styles.inputs}>{order.shipping_method}</Text>
                                    </View> 
                                    <View >
                                        <Text style={styles.inputsTitle}>{status=='Complete'?'到店取件券編號':'帳單編號'}</Text>
                                        <Text style={styles.inputs}>#{order.order_id}</Text>
                                        {status=='Complete'?<QRCode value={order.order_id} size={40}/>:null}
                                        
                                    </View>
                                </View>
                            </View>
                            
                        </View>
}






                    </View>
                
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
        paddingTop:10,
        paddingBottom:8
    },
    inputs:{
        fontSize:14,
        color:'#623f31',
        marginBottom:10
    },listItem:{
        flex:1,
        flexDirection:'row',
        height:100,
        width:WIDTH*0.7,
        backgroundColor:'white',
        marginTop:20,
        borderRadius:5,
        padding:10,
        marginHorizontal:10,
        
       
    },
    itemName:{
        fontSize:18,
        marginBottom:10
    },
    itemPrice:{
        fontSize:18,
        fontWeight:'700',
        color:"#d37c57",
        alignItems:'flex-start'
    },
    itemCount:{
        position:'absolute',
        bottom:0,
        right:0,
        backgroundColor:"#d37c57",
        color:'white',
       
        borderRadius:6,
        paddingVertical:1,
        paddingHorizontal:10
    },
    
});

export default OrderDetail;