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
import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,faDonate,faCube,faUserTag} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

const WIDTH =Dimensions.get('window').width;



const Category = ({navigation,route}) =>{
   
    const userDetail ={
        name:'Wendy Lau',
        email:'wendylou@gmail.com',
        userid:'0766476741'
    }
    
    const [isMemberVisible,setMemberVisible]=useState(false);
  
    const showMemberModal=()=>{
      
        setMemberVisible(!isMemberVisible);
    }

    

    
    

    useEffect(()=>{
        
    },[])

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
                        <Text style={styles.textTitle}>分類</Text>
                
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
                <View style={{padding:20}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Service',{authorization:route.params.authorization})}>

                        <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',borderRadius:10,alignItems:'center',paddingVertical:15,paddingLeft:30}}>
                            <View style={{flex:1}}>
                                <FontAwesomeIcon icon={faUserTag} size={60}/>
                            </View>
                            <View style={{flex:3}}>
                                <Text style={{fontWeight:'bold',fontSize:18,marginBottom:8}}>寄件服務</Text>
                                <Text>寄件,運送服務等</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    


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
    
});

export default Category;