
import React,  {Component, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Input,
    Alert
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForm, Controller} from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';

import { CheckAccount } from '../screens';
import { Tab } from 'react-native-elements';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const LoginByPhone= ({ navigation,route }) => {

   
    const user = route.params.userInfo;
    const [error, setError] = useState([]);


    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(
        {
            defaultValues: {
                phoneNumber:'',
                password:'',
                confirmPassword:'',
              },
        }
    );

    const onSubmit = data =>{
        console.log(user);

        fetch('https://goldrich.top/api/rest/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                "firstname": user.givenName,
                "lastname": user.familyName,
                "email": user.email,
                "password": data.password,
                "confirm": data.confirmPassword,
                "telephone": data.phoneNumber,
                "agree":false
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.success==1){
               navigation.navigate('User',{authorization:route.params.authorization,data:responseJson.data});
            }else if(responseJson.success==0){
                setError(responseJson.error);
            }
        }).catch((err)=>console.log(err))
        



        
    }


   
    return (    
           
     
        <View style={[styles.container]}>
        
        <Text style={{height:100}}>LOGO</Text>
        <Text style={[FONTS.h2,{fontWeight:"700"}]}>歡迎回來</Text>
        <Text style={[FONTS.h3,{marginBottom:60}]}>注册你的帳戶密碼</Text>

        <View style={{marginBottom:5}}>
            <Text style={styles.inputsTitle}>電話號碼</Text>
            <Controller 
                control={control} 
                render={({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        style={styles.inputs}
                        onBlur={onBlur}
                        maxLength={8}
                        onChangeText={(value)=>{
                            onChange(value);
                            
                        }}
                        value={value}
                        placeholder="輸入你的電話號碼"
                    />
                )}
                name="phoneNumber" 
                rules={{required:true}}
            />
            
            {errors.phoneNumber && <Text style={styles.errorText}>請輸入電話號碼.</Text>}
        </View>
        <View style={{marginBottom:5}}>
            <Text style={styles.inputsTitle}>密碼</Text>
            <Controller 
                control={control} 
                render={({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        style={styles.inputs}
                        onBlur={onBlur}
                        onChangeText={value=>onChange(value)}
                        value={value}
                        secureTextEntry={true}
                        placeholder="輸入你的密碼"
                    />
                )}
                name="password" 
                rules={{required:true}}
            />
              {errors.password && <Text style={styles.errorText}>請輸入密碼.</Text>}
        </View>
        <View style={{marginBottom:5}}>
            <Text style={styles.inputsTitle}>再次輸入密碼</Text>
            <Controller 
                control={control} 
                render={({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        style={styles.inputs}
                        onBlur={onBlur}
                        onChangeText={value=>onChange(value)}
                        value={value}
                        secureTextEntry={true}
                        placeholder="再次輸入你的密碼"
                    />
                )}
                name="confirmPassword" 
                rules={{required:true}}
            />
             {errors.confirmPassword && <Text style={styles.errorText}>請再次輸入密碼.</Text>}
        </View>
        <View style={{marginBottom:5}}>
            {error.length>=1?error.map((item,index)=>{
                return(
                    <Text key={index} style={[styles.errorText,{fontSize:16}]}>{item}</Text>
                )
            }):null}
        </View>
        <View style={{marginBottom:5,marginTop:30}}>
            <Button
                buttonStyle={styles.confirmBtn}
                title="注册"
                onPress={handleSubmit(onSubmit)}  
            />
        </View>
       
        <View style={{marginBottom:5,marginTop:15,flex:1,flexDirection:'row',justifyContent:'center'}}>
            <Text style={styles.textStyle}>或使用</Text>
            <Text style={[styles.textStyle,{color:"#cc6a3e",textDecorationLine:'underline'}]} onPress={()=>{navigation.navigate("Onboarding")}}>其他方式</Text>
            <Text style={styles.textStyle}>登入</Text>
        </View>
        <View style={{alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontSize:16}}>還未有帳戶？</Text>
            <Text style={{fontSize:16}} onPress={() => navigation.navigate('Register',{authorization:authorization})} style={{color:"#dba829"}}>立即註冊</Text>
        </View>

       
  </View>

        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding:36
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputs:{
        backgroundColor:'#f2f2f2',
        borderRadius:4,
        padding:10,
        paddingLeft:36,
        fontSize:16
    },
    inputTitle:{
        fontSize:18,
        fontWeight:"bold",
        marginBottom:16,
        marginTop:16
    },
    errorText:{
        color:"red",
        fontSize:12,
        paddingLeft:5
    },
    confirmBtn:{
            padding:10,
            borderWidth: 0,
            borderRadius:20, 
            backgroundColor:"#d9a21b"
    },
    textStyle:{
        fontSize:16,
        fontWeight:'bold'
    }
});

export default LoginByPhone;
