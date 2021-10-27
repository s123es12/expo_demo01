import React, { useEffect, useRef ,useState} from 'react';
import { 
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-elements';
import {faBars,faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer'; 

const numColumn = 2;
const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;
const UserHome = ({navigation,route}) =>{

    const [product_lists,setProductList] = useState([]);

    const [isLoading, setLoading] = useState(true);

    const [storeInfo, setStoreInfo] = useState({});



    const handleLogout = () =>{

        fetch('https://goldrich.top/api/rest/logout', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success ==1){
                navigation.navigate('Onboarding');
            }else{
                console.log(responseJson);
            }
            
          
        }).catch((err)=>console.log(err));

    }

    const addProduct =(productId)=>{
       
        //console.log(productId)
        fetch('https://goldrich.top/api/rest/cart', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                'product_id':productId,
                'quantity':1
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success ==1){
              
            }else{
                
            }
            
          
        }).catch((err)=>console.log(err));
    }
 

    useEffect(()=>{

        fetch('https://goldrich.top/api/rest/products', {
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
                setProductList(responseJson.data);
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        .finally(() => setLoading(false));

        fetch('https://goldrich.top/api/rest/stores/0', {
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
                setStoreInfo(responseJson.data);
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err));



    },[isLoading])

 
    

    return(
        

  
        <View>
           


            <View style={{
                backgroundColor:"#cc6a3e",
                paddingBottom:40,
                borderBottomLeftRadius:10,
                borderBottomRightRadius:10,
                height:200
            }}>
                
                <View style={{alignItems:'center',marginTop:40,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity
                        style={{
                            marginRight:SIZES.padding,
                            marginLeft:SIZES.padding,
                        }}
                        onPress={handleLogout}
                    >
                    <FontAwesomeIcon
                        icon={faSignOutAlt} color="white"
                        size={25}
                    
                    />
                        
                    </TouchableOpacity>
            
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

                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{
                            lineHeight:70,
                            marginRight:SIZES.padding,
                            marginLeft:SIZES.padding,
                            fontSize:SIZES.h2,
                            color:"white",
                            fontWeight:'700',
                            
                        }}>{storeInfo.store_name}</Text>
                    <Image
                        style={{
                            height:70,
                            width:100,
                            marginRight:SIZES.padding,
                            marginLeft:SIZES.padding,
                        }}
                        source={{uri:storeInfo.store_image}}
                    />
                </View> 

            </View>
            <ScrollView >
            <View style={{height:200,padding:20,paddingBottom:10}}>
                
                <Image
                    source={require("../../assets/images/L01.jpeg")}
                    style={{height:'100%',width:'100%',resizeMode:'cover',borderRadius:10}}
                />
            </View>
              
              
              
              
              
              
                <View style={{marginBottom:220}}>

                <ScrollView>
                    <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',paddingHorizontal:WIDTH*0.05}}>
                        
                        {isLoading ?<ActivityIndicator/> : product_lists.map((item,index)=>{
                            return (
                                <TouchableOpacity key={item.key?item.key:item+index} onPress={()=>navigation.navigate('ServiceProduct',{id:item.id,authorization:route.params.authorization})}>
                                <View style={{borderRadius:8,padding:10,marginVertical:10,width:WIDTH*0.43,height:HEIGHT*0.3,backgroundColor:'#fff'}}>
                                
                                    <Image source={{uri:item.original_image}} style={{height:'70%',width:'100%'}} resizeMode='cover'/>

                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:5}}>
                                        <Text>{item.name}</Text>
                                        <TouchableOpacity
                                            onPress={()=>console.log("heart")}
                                        >
                                            <FontAwesomeIcon 
                                                icon={faHeart} color='#cc6a3e' size={20}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:5}}>
                                        <Text style={{color:'#cc6a3e'}}>${item.price.toFixed(1)}</Text>
                                        <Button 
                                            buttonStyle={{backgroundColor:'#623f31',color:"#000",height:20,padding:12,borderRadius:5}}
                                            title="加入購物車"
                                            titleStyle={{fontSize:12}}
                                            onPress={()=>addProduct(item.product_id)}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                        })
                        
                        }
                        
                            
                       


                    </View>
                </ScrollView>
                    
                    
                
                
                </View>
            </ScrollView>
        </View>    
 
    )
}
const styles =StyleSheet.create({
    item:{
        backgroundColor:"#3232ff",
        alignItems:"center",
        justifyContent:"center",
        width:WIDTH/2,
        flex:1,
        margin:1,
        height:WIDTH/numColumn
    },
    itemText:{
        color:"#fff",
        fontSize:24,
        
    }
});
export default UserHome;