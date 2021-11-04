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
faChevronLeft,faMapPin,faMapMarkerAlt,faAngleDoubleDown, faMapMarkedAlt,faThLarge,
faLevelDownAlt,faSortAmountDown,faShareAlt,faCaretRight,faPen} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem ,CheckBox,Rating} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import DateTimePicker from '@react-native-community/datetimepicker';



const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const PayDelivery = ({navigation,route}) =>{
 

    const [error,setErrorMsg]=useState();
    
    const [isLoad, setLoad]=useState(true);
    const [isLoad2, setLoad2]=useState(true);
    const [cartsList, setCartsList] = useState({});

    const [shippingMethods, setShippingMethods] = useState([]);
    const [methodCheck, setMethodCheck]=useState([]);

    const [paymentAddress, setPaymentAddress] = useState({});
    const [shippingAddress, setShippingAddress] =useState({});
    const [isLoadPaymentAdd,setLoadPaymentAdd]=useState(true);
    const [isLoadShippingAdd,setLoadShippingAdd]=useState(true);

    const [checkOrderAddress,setOrderAddress] = useState(true);

    const [commentText,setCommentText] = useState(null);

    const onSubmit = data =>{
        //console.log('Comment Test: ',commentText);

        let checkBool = methodCheck.filter((item,index)=>{
            return item==true;
        })
        //console.log(checkBool);
        if(checkBool.length<=0){
            setErrorMsg('請選擇送貨方式');
        }else{
            navigation.navigate('PayGateway',{authorization:route.params.authorization,comment:commentText,showToastMessage:route.params.showToastMessage});
        }

        
        
       
    }

    

    useEffect(()=>{
        // try {
            
        // } catch (error) {
            
        // }finally{
        //     setLoad(false);
        //     setLoad2(false);
        //     setLoadShippingAdd(false);
        //     setLoadPaymentAdd(false);
        // }
        fetch('https://goldrich.top/api/rest/cart', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
           // console.log(responseJson);
            //console.log(responseJson.data);
            if(responseJson.success ==1){
                setCartsList(responseJson.data);
                //console.log(cartsList);
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        .finally(()=> setLoad(false))
        

        fetch('https://goldrich.top/api/rest/shippingmethods', {
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
            if(responseJson.success ==1){
                let new_array = responseJson.data;
                new_array.shipping_methods.map((item,index)=>{
                    item.checked = false;
                    let temp = [];
                    temp[index]=false;
                    setMethodCheck(temp);
                })
                setShippingMethods(new_array);

                //console.log(responseJson.data.shipping_methods);
                // console.log(methodCheck);
                // console.log(shippingMethods);
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        .finally(()=>setLoad2(false))


        fetch('https://goldrich.top/api/rest/paymentaddress', {
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
            if(responseJson.success ==1){
                if(responseJson.data.address_id==''||responseJson.data.address_id==null){

                }else{
                    let add_id = responseJson.data.address_id;
                    let address = responseJson.data.addresses.filter((item,index)=>{
                        return item.address_id == add_id;
                    })
                    setPaymentAddress(address[0]);
                    //console.log(address);

                }
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        .finally(()=>{setLoadPaymentAdd(false);})

        fetch('https://goldrich.top/api/rest/shippingaddress', {
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
            if(responseJson.success ==1){
                if(responseJson.data.address_id==''||responseJson.data.address_id==null){

                }else{
                    let add_id = responseJson.data.address_id;
                    let address = responseJson.data.addresses.filter((item,index)=>{
                        return item.address_id == add_id;
                    })
                    setShippingAddress(address[0]);
                    //console.log(address);

                }
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        .finally(()=>{setLoadShippingAdd(false);})

        

    },[])


    const handleShippingChecked = (index)=>{
        // console.log(index);
        // console.log(shippingMethods);

        let check =[...methodCheck];
        
        for(var i=0;i<methodCheck.length;i++){
            check[i]=false;
        }
        check[index] = !check[index];
        setMethodCheck(check);

        //console.log(shippingMethods.shipping_methods[index].quote[0].code);
        
        fetch('https://goldrich.top/api/rest/shippingmethods', {
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
            if(responseJson.success ==1){
                fetch('https://goldrich.top/api/rest/shippingmethods', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer '+route.params.authorization,
                        
                    },body:JSON.stringify({
                        "shipping_method": shippingMethods.shipping_methods[index].quote[0].code,
                        "comment": ""
                    })
                })
                .then(response=>response.json())
                .then((responseJson)=>{
        
                    //console.log(responseJson);
        
                    if(responseJson.success ==1){
                       // console.log(responseJson);
                    }else if(responseJson.success==0){
        
                    }
                  
                }).catch((err)=>console.log(err))
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        

        

       


    }

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
                
                <ScrollView>
                    <View style={{padding:25,marginBottom:120}}>
                        <View style={{backgroundColor:'white',padding:20,alignItems:'center',borderRadius:10}}>
                            {!isLoad&&cartsList.products?cartsList.products.map((item,index)=>{
                                return(
                                    <View key={item.key} style={styles.listItem}>
                                        <View style={{position:'absolute',right:0,paddingTop:5,paddingRight:10}}>
                                            
                                        </View>
                                        <View style={{flex:1}}>
                                            <Image source={{uri:item.thumb}} style={{height:'100%',width:'100%'}} resizeMode='cover'/>
                                        </View>
                                        <View style={{flex:2,paddingLeft:10,justifyContent:'center'}}>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <View style={{}}>
                                                <Text style={styles.itemPrice}>${item.price_raw.toFixed(1)}</Text>
                                                <Text style={styles.itemCount}>x{item.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }):<ActivityIndicator/>}
                            {isLoad?<ActivityIndicator/>:
                                <View style={{width:'100%'}}>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,marginTop:10}}>
                                        <Text>小計</Text>
                                        <Text>{cartsList.totals[0].value||null}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text>運費</Text>
                                        <Text>$0.0</Text>
                                    </View>
                                    
                                    <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomColor:'#d2d2d2',borderBottomWidth:1,paddingVertical:10}}>
                                        <Text style={{color:'#cc6a3e'}}>{cartsList.totals.length==3?cartsList.totals[1].title:'優惠碼'}</Text>
                                        <Text style={{color:'#cc6a3e'}}>{cartsList.totals.length==3?cartsList.totals[1].value:'0'}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
                                        <Text style={{color:'black',fontWeight:'700'}}>總計</Text>
                                        <Text style={{color:'#cc6a3e',fontWeight:'700'}}>${cartsList.totals.length==3?cartsList.totals[2].value:cartsList.totals[1].value}</Text>
                                    </View>
                                </View>
                            }
                        </View>

                        <View style={{backgroundColor:'white',marginTop:20,paddingHorizontal:20,borderRadius:10,paddingBottom:10}}>
                            <Text style={{fontWeight:'700',borderBottomWidth:1,borderBottomColor:'#d2d2d2',paddingVertical:10}}>送貨方式</Text>
                            {!isLoad&&shippingMethods.shipping_methods?shippingMethods.shipping_methods.map((item,index)=>{
                                return(
                                    <CheckBox
                                        key={item+index}
                                        containerStyle={{backgroundColor:'transparent',borderWidth:0,marginLeft:10,marginVertical:5,padding:0}}
                                        textStyle={{margin:0}}
                                        title={item.title}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={methodCheck[index]}
                                        onPress={()=>handleShippingChecked(index)}
                                        checkedColor='#d9a21b'
                                        uncheckedColor='#d9a21b'
                                    />
                                )
                            }):<ActivityIndicator/>}
                            
                           
                        </View>
                        <View style={{backgroundColor:'white',marginTop:20,paddingHorizontal:20,borderRadius:10,paddingBottom:10}}>
                            <Text style={{fontWeight:'700',borderBottomWidth:1,borderBottomColor:'#d2d2d2',paddingVertical:10}}>地址</Text>
                            {isLoadPaymentAdd?<ActivityIndicator/>:
                                <View>
                                    <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={styles.itemAddressName}>寄件人</Text>
                                            <Text style={styles.itemAddressName}>{paymentAddress.firstname} {paymentAddress.lastname}</Text>
                                        </View>
                                        
                                        {/* <TouchableOpacity>
                                            <FontAwesomeIcon icon={faPen} color="#d9a21b"
                                                onPress={()=>navigation.navigate('editAddress')}
                                            />
                                        </TouchableOpacity> */}
                                    </View>
                                    <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={[styles.itemContent,{}]}>{paymentAddress.zone}</Text>
                                        <Text style={styles.itemContent}>{paymentAddress.city}</Text>
                                    </View>
                                    <View style={{marginBottom:10,marginVertical:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <Text style={styles.itemAddress}>{paymentAddress.address_1}</Text>
                                        
                                    </View>
                                </View>
                            
                            }
                            {isLoadShippingAdd?<ActivityIndicator/>:
                                <View>
                                    <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={styles.itemAddressName}>收件人</Text>
                                            <Text style={styles.itemAddressName}>{shippingAddress.firstname} {shippingAddress.lastname}</Text>
                                        </View>
                                        
                                        {/* <TouchableOpacity>
                                            <FontAwesomeIcon icon={faPen} color="#d9a21b"
                                                onPress={()=>navigation.navigate('editAddress')}
                                            />
                                        </TouchableOpacity>  */}
                                    </View>
                                    <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={[styles.itemContent,{}]}>{shippingAddress.zone}</Text>
                                        <Text style={styles.itemContent}>{shippingAddress.city}</Text>
                                    </View>
                                    <View style={{marginBottom:10,marginVertical:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <Text style={styles.itemAddress}>{shippingAddress.address_1}</Text>
                                        
                                    </View>
                                </View>
                            
                            } 
                           
                            

                        </View>

                        <View style={{backgroundColor:'white',marginTop:20,paddingHorizontal:20,borderRadius:10,paddingBottom:10}}>
                            <Text style={{fontWeight:'700',borderBottomWidth:1,borderBottomColor:'#d2d2d2',paddingVertical:10}}>賬單地址</Text>
                            <CheckBox
                                containerStyle={{backgroundColor:'transparent',borderWidth:0,marginLeft:10,marginVertical:5,padding:0}}
                                title='跟寄件地址一樣'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={checkOrderAddress}
                                onPress={()=>{
                                    setOrderAddress(!checkOrderAddress);
                                }}
                                checkedColor='#d9a21b'
                                uncheckedColor='#d9a21b'
                            />
                        </View>

                        <View style={{backgroundColor:'white',marginTop:20,paddingHorizontal:20,borderRadius:10}}>
                            <Text style={{fontWeight:'700',borderBottomWidth:1,borderBottomColor:'#d2d2d2',paddingVertical:10}}>備註</Text>
                            <TextInput 
                                style={styles.inputs}
                                value={commentText}
                                onChangeText={setCommentText}
                                placeholder='輸入備註'
                            />
                        </View>
                        {error&&  <Text style={[styles.errorText,{fontSize:14}]}>{error}</Text>}

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
                                title="下一步"
                                onPress={onSubmit}  
                            />
                        </View>

                    </View>
                </ScrollView>



                
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
    listItem:{
        flex:1,
        flexDirection:'row',
        height:100,
        width:WIDTH*0.8,
        backgroundColor:'white',
        marginTop:10,
        borderRadius:5,
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
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
    itemAddressName:{
        fontSize:16,
        marginRight:10,
        color:'#cc6a3e',
        fontWeight:'700'
        
    },inputs:{
        backgroundColor:'#f2f2f2',
        borderRadius:4,
        padding:8,
        paddingLeft:24,
        fontSize:14,
        marginVertical:16
    },errorText:{
        color:"red",
        fontSize:12,
        paddingLeft:5
    },
    
});

export default PayDelivery;