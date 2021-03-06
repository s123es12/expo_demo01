import React,{useEffect, useState} from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
import {faChevronLeft,faPen,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { Button} from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

const WIDTH =Dimensions.get('window').width;



const PaymentAddressList = ({navigation,route}) =>{
   
    const type = route.params.addressType;
    const isFocused = useIsFocused();
    
    const [addressList,setAddressList] = useState([]);

   
    

    const [changeList,setChangeList] =useState(false);

    const handleDeleteAddress = (item) =>{
        //console.log(item);
        fetch('https://goldrich.top/api/rest/account/address/'+item.address_id, {
            method: 'DELETE',
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
                setChangeList(!changeList);
            }else if(responseJson.success==0){
                setError(responseJson.error);
            }
        }).catch((err)=>console.log(err))
        .finally(()=>setChangeList(!changeList))
    }

    const handleBack =(index,item)=>{
        navigation.goBack();

        if(type=='PAYMENT'){
            route.params.changeAdd(item,type);
            fetch('https://goldrich.top/api/rest/paymentaddress/existing', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                },body:JSON.stringify({
                    "address_id": item.address_id
                })
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                if(responseJson.success ==1){
                
                    
                }else if(responseJson.success==0){

                }
            
            }).catch((err)=>console.log(err));
        }else{
            route.params.changeAdd2(item,type);
            fetch('https://goldrich.top/api/rest/shippingaddress/existing', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                },body:JSON.stringify({
                    "address_id": item.address_id
                })
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                if(responseJson.success ==1){
                
                    
                }else if(responseJson.success==0){

                }
            
            }).catch((err)=>console.log(err));
        }

        
        
    }

    useEffect(()=>{

        //console.log(type);


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
            //console.log(responseJson);
            if(responseJson.success ==1){
                let new_list = [...responseJson.data.addresses];
                for(var i=0;i<new_list.length;i++){
                    new_list[i].showDelModal=false;
                }
                setAddressList(new_list);
                //console.log(new_list);
                
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err));
    },[isFocused,changeList])

    return(
        <View >
        <ScrollView>
           
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

                    <Text style={styles.textTitle}>????????????</Text>
                </View> 
            </View>
            
                <View style={{paddingHorizontal:15,paddingTop:10}}>
                    <View style={{paddingBottom:70}}>
                        <ScrollView>
                            {addressList.map((item,index)=>{
                                return ( 
                                <TouchableOpacity key={item+index} onPress={()=>handleBack(index,item)}>
                                    <View  style={{margin:10,flex:1,borderRadius:10,backgroundColor:'white'}}>
                                        <View>

                                            <View style={{marginTop:10,marginHorizontal:25,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                <Text style={styles.itemName}>{item.firstname} {item.lastname}</Text>
                                                <TouchableOpacity>
                                                    <FontAwesomeIcon icon={faPen} color="#d9a21b"
                                                        onPress={()=>navigation.navigate('editAddress',{list:addressList,addressData:item,addressId:item.address_id,authorization:route.params.authorization})}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{marginHorizontal:25,marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={styles.itemContent}>{item.address_1}</Text>
                                                <Text style={styles.itemContent}>{item.email?item.email:null}</Text>
                                            </View>
                                            <View style={{marginBottom:10,marginHorizontal:25,marginVertical:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                <Text style={styles.itemAddress}>{item.zone}</Text>
                                                {addressList.length==1? 
                                                <View>
                                                    <FontAwesomeIcon icon={faTrashAlt} color='#c3c3c3'/>
                                                </View>
                                               :

                                                <TouchableOpacity>
                                                    <FontAwesomeIcon icon={faTrashAlt} onPress={()=>{
                                                        let copy_list = [...addressList];
                                                        copy_list[index].showDelModal=true;
                                                        setAddressList(copy_list);
                                                    }}/>
                                                </TouchableOpacity>
                                                }
                                            </View>
                                            
                                            {
                                               addressList[index].showDelModal==true?
                                                    <View 
                                                        style={{justifyContent:'space-around',position:'absolute',height:'100%',width:'100%',backgroundColor:'black',opacity:0.84,borderRadius:10}}
                                                    >
                                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                            <FontAwesomeIcon icon={faTrashAlt} color="white" size={18}/>
                                                            <Text style={{color:'white',marginLeft:10,fontSize:17,fontWeight:'700'}}>????????????????????????</Text>
                                                        </View>
                                                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                                            <Button title="??????" onPress={()=>{
                                                                let copy_list = [...addressList];
                                                                copy_list[index].showDelModal=false;
                                                                setAddressList(copy_list);
                                                            }}
                                                                buttonStyle={{width:90,borderRadius:7,height:30,backgroundColor:'transparent',borderWidth:1,borderColor:'white'}}
                                                            />
                                                            <Button title="??????" onPress={()=>handleDeleteAddress(item)} buttonStyle={{width:90,borderRadius:7,height:30,backgroundColor:"#cc6a3e"}}/>
                                                        </View>
                                                    </View>
                                               :null
                                            
                                            }



                                        </View>
                                    </View>
                                </TouchableOpacity>
                                )
                            })}
                            
                        </ScrollView>
                        <View style={{}}>
                            <Button  
                                buttonStyle={{  
                                    alignSelf:'center',
                                    width:230,                    
                                    padding:10,
                                    borderWidth: 0,
                                    borderRadius:40, 
                                    backgroundColor:"#623f31",
                                }} 
                                title="???????????????" 
                                onPress={()=>navigation.navigate('addNewAddress',{authorization:route.params.authorization})} 
                            />
                        </View>
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
    },
    itemName:{
        fontWeight:'700',
        fontSize:20
    },
    itemContent:{
        color:"#76787b",
        fontSize:14
    },
    itemAddress:{
        fontSize:15,
        
    }
    
});

export default PaymentAddressList;