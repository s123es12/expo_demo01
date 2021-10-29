import React,{useEffect, useState} from 'react';
import { 
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo} from '@fortawesome/free-solid-svg-icons';
import {useIsFocused} from "@react-navigation/native";
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";

import { Button } from 'react-native-elements';

const WIDTH =Dimensions.get('window').width;



const Carts = ({navigation,route}) =>{
   
    const [isLoading, setLoading] = useState(true);

    
    const [couponNumber, setCouponNumber] = useState(null);
    const [discount,setDiscount] =useState(null);
    
    const [couponText, setCouponText] = useState(null);

    const [cartsList, setCartsList] = useState({});

    const [cartsReload, setCartsReload]=useState(false);

    const isVisible = useIsFocused();
    
    const [countClick, setCountClick]=useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isDiscountVisible,setDiscountVisible]=useState(false);

    const [canClick,setCanClick]=useState(false);
    const [update,setUpdate]=useState(false);
    const handleCoupon = (couponName) =>{
        fetch('https://goldrich.top/api/rest/coupon', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },
            body:JSON.stringify({
                'coupon':couponName
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success==1){
               //console.log(responseJson);
               setCouponNumber(responseJson.message[0]);
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
    }
    const toggleModal = () => {
        
            
            setModalVisible(!isModalVisible);
        
    };
    const showDelModal=(bool)=>{

        fetch('https://goldrich.top/api/rest/coupon', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success==1){
               //console.log(responseJson);
               
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))



        setCouponNumber(null);
        setDiscount(null);
        if(bool){
            setDiscountVisible(!isDiscountVisible);
        }
    }

    const deleteItem =(key) =>{
        fetch('https://goldrich.top/api/rest/cart', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },
            body:JSON.stringify({
                'key':key
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success==1){
               //console.log(responseJson);
               setUpdate(!update);
               
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
        .finally(()=>{setCartsReload(!cartsReload);setUpdate(!update);})
        
    }
   
    const handleAddition = (key, count)=>{

        fetch('https://goldrich.top/api/rest/cart', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                'key':key,
                "quantity":count+1
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success==1){
                //console.log(responseJson);
               
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
        .finally(()=>{setCartsReload(!cartsReload)})
    }
    const handleReduction =(key,count)=>{
        fetch('https://goldrich.top/api/rest/cart', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                'key':key,
                "quantity":count-1
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success==1){
                //console.log(responseJson);
                
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
        .finally(()=>{setCartsReload(!cartsReload)})
    }

    useEffect(()=>{
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
            if(responseJson.success==1){
               //console.log(responseJson);
               setCartsList(responseJson.data);
                
               if(responseJson.data.cart_count_products==0 || responseJson.data.length==0){
                showDelModal(false);
                
               }else{

                    if(responseJson.data.totals.length&&responseJson.data.totals.length==3){
                        //console.log(responseJson.data.totals[1].value);
                        let result = ''+responseJson.data.totals[1].value;
                        let new_result = '-$'+result.split('-')[1];
                        setCouponText(new_result);
                       
                    }else{
                        
                    }
                    
               }
               
               
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
        .finally(()=>{setLoading(false)});

    },[isLoading,couponNumber,isVisible,cartsReload,update])

    const handlePayment =() =>{
        fetch('https://goldrich.top/api/rest/account/address', {
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
                if(responseJson.data.addresses.length>=1){
                    setTimeout(()=>
                        navigation.navigate('PayAddress',{authorization:route.params.authorization})
                    ,1000); 
                }else{
                    Alert.alert(
                        '請新增最少一個個人地址再進行結賬程序',
                        '',
                        [
                            {
                              text: 'OK',
                              onPress: () => navigation.navigate('addNewAddress',{authorization:route.params.authorization}),
                              style: 'cancel',
                            },
                        ]
                    );
                }
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        .finally(()=>setLoadDefault(false))
    }


    useEffect(()=>{
        if(isVisible){
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
                if(responseJson.success==1){
               //console.log(responseJson.data);
                setCartsList(responseJson.data);
                //console.log(cartsList);
                
                }else if(responseJson.success==0){

                }
            }).catch((err)=>console.log(err))
            .finally(()=>{setLoading(false);});
        }

    },[])



    return(
            
            <View style={{flex:1}}>
                <Modal style={{alignItems:'center'}} isVisible={isModalVisible}>

                    {cartsList.length==0?
                        <View style={{ width:WIDTH*0.8}}>
                        <View style={{backgroundColor:'white',padding:30,borderRadius:10}}>
                            <View style={{borderBottomWidth:2,borderColor:'#d9d9d9',marginBottom:15}}>

                                <Text style={[{fontWeight:"700",marginBottom:15,fontSize:19}]}>優惠券</Text>
                            </View>
                            <View style={{alignItems:'center'}}>

                                <Text style={{fontWeight:"700",marginBottom:15,fontSize:18,textAlign:'center'}}>請加入商品到購物車</Text>
                            </View>
                            
                            <Button  
                                buttonStyle={{  
                                    alignSelf:'center',
                                    marginTop:40,
                                    width:230,                    
                                    padding:10,
                                    borderWidth: 0,
                                    borderRadius:40, 
                                    backgroundColor:"#cc6a3e",
                                }} 
                                title="確認" 
                                onPress={()=>{toggleModal();}} 
                            />
                        </View>
                    </View>
                    :
                        <View style={{ width:WIDTH*0.8}}>
                            <View style={{backgroundColor:'white',padding:30,borderRadius:10}}>
                                <View style={{borderBottomWidth:2,borderColor:'#d9d9d9',marginBottom:15}}>

                                    <Text style={[{fontWeight:"700",marginBottom:15,fontSize:19}]}>優惠券</Text>
                                </View>
                                <Text style={{fontWeight:"700",marginBottom:15,fontSize:14}}>優惠碼</Text>
                                <TextInput
                                    style={styles.inputBar}
                                    placeholder="輸入優惠碼"
                                    onChangeText={setDiscount}
                                    value={discount}
                                />
                                <Button  
                                    buttonStyle={{  
                                        alignSelf:'center',
                                        marginTop:50,
                                        width:230,                    
                                        padding:10,
                                        borderWidth: 0,
                                        borderRadius:40, 
                                        backgroundColor:"#cc6a3e",
                                    }} 
                                    title="確認" 
                                    onPress={()=>{handleCoupon(discount);toggleModal();}} 
                                />
                            </View>
                        </View>
                    }


                </Modal>
                <Modal isVisible={isDiscountVisible}>
                    <View style={{ flex: 1,alignItems:'center' ,justifyContent:'center'}}>
                        <View style={{backgroundColor:'white',alignItems:'center',padding:50,borderRadius:10}}>
                            <FontAwesomeIcon icon={faCheckCircle} size={60} style={{color:"#cc6a3e",marginBottom:30}}/>
                            <Text style={[{fontWeight:"700",marginBottom:15,fontSize:19}]}>刪除成功</Text>
                            <Text style={{marginBottom:50,fontSize:14,fontWeight:"600"}}>請重新加入項目</Text>
                            <Button  buttonStyle={[styles.confirmBtn,{  width:230}]} title="確認" onPress={()=>{
                                setDiscountVisible(!isDiscountVisible);
                                
                            }} />
                        </View>
                    </View>
                </Modal>
                

                <View style={{
                    backgroundColor:"#cc6a3e",
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
                    paddingTop:40,
                    height:100,
                }}>
                    <View style={{alignItems:'center',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.textTitle}>購物車</Text>
                
                        <TouchableOpacity
                            style={{
                                marginLeft:SIZES.padding,
                                marginRight:SIZES.padding,
                            }}
                            onPress={()=>console.log("heart")}
                        >
                            <FontAwesomeIcon 
                                icon={faHeart} color='white' size={25}/>
                        </TouchableOpacity>
                    </View> 


                


                </View>
                <ScrollView style={{marginBottom:50}}>
                    <View style={{alignItems:'center',marginBottom:20}}>
                        {isLoading?<ActivityIndicator/>: cartsList.products?cartsList.products.map((item,index)=>{
                            
                            return(
                              
                                    <View style={[styles.listItem,{flex:1,flexDirection:'row'}]} key={item.key}>
                                        <View style={{position:'absolute',right:0,paddingTop:5,paddingRight:10}}>
                                            <TouchableOpacity 
                                                onPress={()=>{deleteItem(item.key)}}>
                                                <FontAwesomeIcon icon={faTimes} size={20}/> 
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Image source={{uri:item.thumb}} style={{height:'100%',width:'100%'}} resizeMode='cover'/>
                                        </View>
                                        <View style={{flex:2,paddingLeft:10,justifyContent:'center'}}>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={styles.itemPrice}>${item.price_raw.toFixed(1)}</Text>
                                                <View style={{alignItems:'center'}}>
                                                    <View style={{flexDirection:'row'}}>
                                                        {countClick? <Button 
                                                            title="-" 
                                                            titleStyle={{}} 
                                                            buttonStyle={{borderTopLeftRadius:9,borderBottomLeftRadius:9,padding:5,paddingHorizontal:7,height:26,backgroundColor:'#cc6a3e'}}
                                                            onPress={()=>handleReduction(item.key,parseInt(item.quantity))}
                                                        />:null}
                                                        
                                                        <Text onPress={()=>setCountClick(!countClick)} style={countClick?styles.count:styles.itemCount}>{countClick?null:'x'}{item.quantity}</Text>
                                                        {countClick?
                                                             <Button  
                                                             title="+" 
                                                             titleStyle={{}} 
                                                             buttonStyle={{borderTopRightRadius:9,borderBottomRightRadius:9,padding:5,paddingHorizontal:5,height:26,backgroundColor:'#cc6a3e'}}
                                                             onPress={()=>{handleAddition(item.key,parseInt(item.quantity))}}
                                                         />
                                                        :null}
                                                       

                                                    </View>
                                                </View>
                                              
                                            </View>
                                        </View>
                                    </View>
                           
                                
                            )
                            
                           
                        }):null}
                    </View>
                    <View style={{alignItems:'flex-end',marginRight:25,marginBottom:50}}>
                        {couponNumber!=null?
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <TouchableOpacity style={{marginRight:5}} onPress={()=>showDelModal(true)}>
                                    <FontAwesomeIcon icon={faUndo} color='#d17b56'/>
                                </TouchableOpacity>
                                <Text style={styles.couponText}>{couponNumber}:{couponText}</Text>
                            </View>
                            :
                            <Text style={styles.couponText} onPress={toggleModal}>+ 加入優惠券</Text>
                        }
                        
                    </View>
                </ScrollView>
            
            
          
                <View style={{position:'absolute',right:0,left:0,bottom:0,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{height:50,flex:2,backgroundColor:"#d9a21b",flexDirection:'row',alignItems:'center',borderTopLeftRadius:10,justifyContent:'space-between',paddingLeft:20,paddingRight:20}}>
                        <Text style={{alignItems:'flex-start',color:'#fff',fontWeight:'700',fontSize:17}}>合計({isLoading?<ActivityIndicator/>:cartsList.total_product_count?cartsList.total_product_count:0})
                            
                        </Text>
                        <Text style={{alignItems:'flex-end',color:'#fff',fontWeight:'700',fontSize:17}}>HKD$ {isLoading?<ActivityIndicator/>:cartsList.total_raw?cartsList.total_raw.toFixed(1):0}</Text>
                    </View>
                   
                        {
                           cartsList.products&&cartsList.products.length>0?
                            <View style={{height:50,flex:1,backgroundColor:"#623f31",borderTopRightRadius:10}}>
                            <TouchableOpacity 
                                style={{flex:1,justifyContent:'center'}} onPress={handlePayment}>
                                    
                                
                                <Text style={{alignSelf:'center',color:'#fff',fontWeight:'700',fontSize:17}}>前往結賬</Text>
                            </TouchableOpacity>
                            </View>
                        :
                            <View style={{height:50,flex:1,backgroundColor:"#cfc5c1",borderTopRightRadius:10}}>
                                <View style={{flex:1,justifyContent:'center'}}>
                                    
                                    <Text style={{alignSelf:'center',color:'#7f7f7f',fontWeight:'700',fontSize:17}}>前往結賬</Text>
                                </View>
                            </View>
                        }
                        
                   
                </View>
         
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
    },
    listItem:{
        
        height:100,
        width:340,
        backgroundColor:'white',
        marginTop:20,
        borderRadius:5,
        padding:10
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
      
        backgroundColor:"#d37c57",
        color:'white',
       
        borderRadius:6,
        paddingVertical:3,
        paddingHorizontal:10
    },
    count:{
        backgroundColor:"transparent",
        color:'black',
        borderRadius:6,
        paddingVertical:3,
        paddingHorizontal:10
    }
    ,
    inputBar:{
        height:40,
        padding:5,
        paddingLeft:30,
        backgroundColor:'#f2f2f2'
    },
    confirmBtn:{
        padding:10,
        borderWidth: 0,
        borderRadius:40, 
        backgroundColor:"#cc6a3e",
            
    },
    couponText:{
        color:"#d17b56",
        fontSize:15,
        fontWeight:'700'
    }
});

export default Carts;