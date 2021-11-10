import React,{useEffect, useState} from 'react';
import { 
    View,
    Text,
    Image,
    
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    SafeAreaView
} from 'react-native';
import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import {Input,ListItem} from 'react-native-elements';
import { Button} from 'react-native-elements';

const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;



const Category = ({navigation,route}) =>{
    
    const [searchList, setSearchList] = useState('');
    const [searchText, setSearchText] = useState('');
    var sList = [...searchList];
     
    const [searchResult, setSearchResult] =useState([]);

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
        
        fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                "sort":"name",
                "order":"asc",
                "filters":[
                    {
                        "field":"name",
                        "operand":"like",
                        "value":searchText
                    },
                ]
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
        // console.log(responseJson);
            if(responseJson.success==1){
                

                

                setSearchResult(responseJson.data);
                
                //console.log(searchResult);
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
        
    },[searchText])

    const onHandle=()=>{
        fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                "sort":"name",
                "order":"asc",
                "filters":[
                    {
                        "field":"name",
                        "operand":"like",
                        "value":searchText
                    },
                ]
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
           // console.log(responseJson);
            if(responseJson.success==1){
                setSearchResult(responseJson.data);
                //console.log(searchResult);
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
        
    }


    return(
        <View>
            <View style={{
                    backgroundColor:"#cc6a3e",
                   
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
                    paddingTop:40,
                    height:100,
            }}>
                <View style={{alignItems:'center',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.textTitle}>快速搜尋</Text>
            
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
            <ScrollView >
            <View >
                <Text style={styles.text}>搜尋產品/服務</Text>
                <Input 
                    containerStyle={{marginLeft:10,width:WIDTH*0.95}}
                    inputContainerStyle={{paddingLeft:20,paddingRight:10,borderBottomWidth:0,backgroundColor:'white',borderRadius:10}}
                    placeholder='搜尋產品/服務'
                    maxLength={30}
                    value={searchText}
                    onChangeText={(txt)=>setSearchText(txt)}
                />
             
            </View>
           
            <View>
                <Text style={[styles.text,{paddingBottom:15}]}>搜尋記錄</Text>
                
                    
                    <View style={{marginBottom:140}}>
                        {searchResult.length>=1?searchResult.map((item,index)=>{
                            return(
                                <TouchableOpacity key={item+index} onPress={()=>navigation.navigate('ServiceProduct',{id:item.id,authorization:route.params.authorization})}>
                                    <View style={{borderRadius:8,marginLeft:20,padding:10,marginVertical:5,width:'100%',width:WIDTH*0.9,height:HEIGHT*0.15,backgroundColor:'#fff',flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Image source={{uri:item.image}} style={{height:'100%',width:'100%'}} resizeMode='cover'/>
                                        </View>

                                        <View style={{flex:1,marginLeft:10,flexDirection:'column',justifyContent:'space-between'}}>
                                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:5}}>
                                                <Text style={{fontSize:16}}>{item.name}</Text>
                                                <TouchableOpacity
                                                    onPress={()=>console.log("heart")}
                                                >
                                                    <FontAwesomeIcon 
                                                        icon={faHeart} color='#cc6a3e' size={20}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:5}}>
                                                <Text style={{color:'#cc6a3e',fontSize:18,fontWeight:'700',marginRight:5}}>${item.price.toFixed(1)}</Text>
                                                <Button 
                                                    buttonStyle={{backgroundColor:'#623f31',color:"#000",height:'auto',paddingHorizontal:12,borderRadius:5}}
                                                    title="加入購物車"
                                                    titleStyle={{fontSize:12}}
                                                    onPress={()=>addProduct(item.product_id)}
                                                />
                                            </View>

                                        </View>
                                    </View>                               
                                </TouchableOpacity>

                            )
                        })
                        :
                        <Text style={{marginLeft:20}}>Not fund!!</Text>}
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
    text:{
        padding:20,
        fontWeight:'700',
        fontSize:17
    },
    listItem:{
        
        fontSize:17,
        paddingLeft:20,
        
    }
});

export default Category;