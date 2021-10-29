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
    Alert
} from 'react-native';
import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,
faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';




const WIDTH =Dimensions.get('window').width;



const PersonInfo = ({navigation,route}) =>{
   
    const user = route.params.userDetail;
    //console.log(user);
    const [passwordError, setPasswordError] = useState([]);
    const [changeError, setChagneError] =useState([]);
  

    const [userInfo,setUserInfo] = useState({
        lastname:user.lastname,
        firstname:user.firstname,
        email:user.email,
        telephone:user.telephone,
        newPassword:'',
        confirmPassword:'',
    })

    const handleChagne=()=>{
        //console.log(userInfo);
        //console.log(user);
        
        if(user.lastname==userInfo.lastname && user.firstname==userInfo.firstname && user.email==userInfo.email
        && user.telephone==userInfo.telephone)
        {

        }else{
            fetch('https://goldrich.top/api/rest/account', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                },body:JSON.stringify({
                    "firstname": user.firstname==userInfo.firstname?user.firstname:userInfo.firstname,
                    "lastname": user.lastname==userInfo.lastname?user.lastname:userInfo.lastname,
                    "email": user.email==userInfo.email?user.email:userInfo.email,
                    "telephone": user.telephone==userInfo.telephone?user.telephone:userInfo.telephone,
                })
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                if(responseJson.success==1){
                   
                }else if(responseJson.success==0){
                    setChagneError(responseJson.error[0]);
                }
            }).catch((err)=>console.log(err))
            
        }

        if(userInfo.newPassword.length>=1){
            fetch('https://goldrich.top/api/rest/account/password', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                },body:JSON.stringify({
                    "password": userInfo.newPassword,
                    "confirm": userInfo.confirmPassword
                })
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                console.log(responseJson);
                if(responseJson.success==1){
                    Alert.alert(
                        '個人資料已更新',
                        '',
                        [
                            {
                              text: 'OK',
                              onPress: () => navigation.goBack(),
                              style: 'cancel',
                            },
                        ]
                      );
                }else if(responseJson.success==0){
                    setPasswordError(responseJson.error);
                }
            }).catch((err)=>console.log(err))
        }



    }

    

    useEffect(()=>{
        setPasswordError([]);
        setChagneError([]);
    },[userInfo])

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

                    <Text style={styles.textTitle}>個人資料</Text>
            
                    
                </View> 
            </View>
           
                <View style={{padding:25}}>
                   
                    <View style={{backgroundColor:'white',paddingHorizontal:20,paddingTop:10,paddingBottom:70,borderRadius:10}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputsTitle}>姓</Text>
                                    <TextInput
                                        style={styles.inputs}
                                        value={userInfo.lastname}
                                        onChangeText={(lastname)=>setUserInfo({...userInfo,lastname})}
                                        
                                        placeholder="輸入新姓"
                                    />
                                </View>
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputsTitle}>名</Text>
                                    <TextInput
                                        style={styles.inputs}
                                        value={userInfo.firstname}
                                        onChangeText={(firstname)=>setUserInfo({...userInfo,firstname})}
                                        
                                        placeholder="輸入新名"
                                    />
                                </View>

                            </View>
                        <View>
                            <Text style={styles.inputsTitle}>電郵</Text>
                            <TextInput
                                style={styles.inputs}
                                value={userInfo.email}
                                onChangeText={(email)=>setUserInfo({...userInfo,email})}
                                placeholder="輸入新電郵"
                            />
                        </View>
                        <View>
                            <Text style={styles.inputsTitle}>電話號碼</Text>
                            <TextInput
                                style={styles.inputs}
                                value={userInfo.telephone}
                                onChangeText={(telephone)=>setUserInfo({...userInfo,telephone})}
                                placeholder="輸入新電話號碼"
                            />
                        </View>
                        <View>
                            <Text style={styles.inputsTitle}>更改新密碼</Text>
                            <TextInput
                                style={styles.inputs}
                                value={userInfo.newPassword}
                                onChangeText={(newPassword)=>setUserInfo({...userInfo,newPassword})}
                                secureTextEntry={true}
                                placeholder="輸入新密碼"
                            />
                        </View>
                        <View>
                            <Text style={styles.inputsTitle}>再次輸入新密碼</Text>
                            <TextInput
                                style={styles.inputs}
                                value={userInfo.confirmPassword}
                                onChangeText={(confirmPassword)=>setUserInfo({...userInfo,confirmPassword})}
                                secureTextEntry={true}
                                placeholder="再次輸入新密碼"
                            />
                        </View>
                        {changeError &&changeError.map((er,index)=>{
                           
                           return(
                               <Text key={index} style={[styles.errorText,{fontSize:16}]}>{er}</Text>
                           )
                           
                        })}
                        {passwordError &&passwordError.map((item,index)=>{
                           
                            return(
                                <Text key={index} style={[styles.errorText,{fontSize:16}]}>{item}</Text>
                            )
                            
                        })}
                       
                    </View>

                    <View >

                        <Button  
                            buttonStyle={{  
                                alignSelf:'center',
                                marginTop:50,
                                width:230,                    
                                padding:10,
                                borderWidth: 0,
                                borderRadius:40, 
                                backgroundColor:"#d9a21b",
                            }} 
                            title="儲存" 
                            onPress={handleChagne} 
                        />
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
    },
    errorText:{
        color:"red",
        fontSize:12,
        paddingLeft:5
    },
    
});

export default PersonInfo;