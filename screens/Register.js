
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

import { Button } from 'react-native-elements';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import {useForm, Controller} from "react-hook-form";
import { ScrollView } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Register = ({ navigation,route }) => {

    const [invaildPhone,setInvaildPhone] = useState(false);
    const [check,setCheck] =useState(false);
    const [defaultFollow,setFollow]=useState();
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
                firstname: '',
                lastname:'',
                email: '',
                phoneNumber:'',
                password:'',
                confirmPassword:'',
                agree:false
              },
        }
    );

    const handleFollow = (defaultBool)=>{
        //console.log(defaultBool);
        if(defaultBool){
            setFollow(1);
         
        }else{
            setFollow(0);
            
        }
        
    }
    const onSubmit = data =>{
       
       
       
       
        fetch('https://goldrich.top/api/rest/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                "firstname": data.firstname,
                "lastname": data.lastname,
                "email": data.email,
                "password": data.password,
                "confirm": data.confirmPassword,
                "telephone": data.phoneNumber,
                "agree":data.agree
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            //console.log(responseJson);
            if(responseJson.success==1){
                navigation.navigate('User',{authorization:route.params.authorization,data:responseJson.data});
            }else if(responseJson.success==0){
                setError(responseJson.error);
            }
        }).catch((err)=>console.log(err))
        
    }
   


    // Render
    return (    
           /** 
            注册你的帳戶！
            姓名
            電郵
            電話號碼
            出生日期
            密碼
            再次輸入密碼
            立即註冊
            或使用其他方式登入

            輸入你的姓名
        */
        <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={[styles.container]}>
        
        <Text style={{height:100}}>LOGO</Text>
        <Text style={[FONTS.h2,{fontWeight:"700"}]}>歡迎回來</Text>
        <Text style={[FONTS.h3,{marginBottom:60}]}>注册你的帳戶！</Text>

       
        <View style={{marginBottom:5}}>
            <Text style={styles.inputsTitle}>名字</Text>
            <Controller 
                control={control} 
                render={({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        style={styles.inputs}
                        onBlur={onBlur}
                        onChangeText={value=>onChange(value)}
                        value={value}
                        placeholder="輸入你的名字"

                    />
                )}
                name="firstname" 
                rules={{required:true}}
            />
            
            {errors.firstname && <Text style={styles.errorText}>請輸入名字.</Text>}
        </View>
        <View style={{marginBottom:5}}>
            <Text style={styles.inputsTitle}>姓氏</Text>
            <Controller 
                control={control} 
                render={({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        style={styles.inputs}
                        onBlur={onBlur}
                        onChangeText={value=>onChange(value)}
                        value={value}
                        placeholder="輸入你的姓氏"

                    />
                )}
                name="lastname" 
                rules={{required:true}}
            />
            
            {errors.lastname && <Text style={styles.errorText}>請輸入姓氏.</Text>}
        </View>
        <View style={{marginBottom:5}}>
            <Text style={styles.inputsTitle}>電郵</Text>
            <Controller 
                control={control} 
                render={({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        style={styles.inputs}
                        onBlur={onBlur}
                        onChangeText={value=>onChange(value)}
                        value={value}
                        placeholder="輸入你的電郵"
                    />
                )}
                name="email" 
                rules={{required:true}}
            />
            {errors.email && <Text style={styles.errorText}>請輸入電郵.</Text>}
        </View>
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
           
        <View style={{marginBottom:5,marginTop:50}}>
            <Button
                buttonStyle={styles.confirmBtn}
                title="立即註冊"
                onPress={handleSubmit(onSubmit)} 
            />
        </View>
        <View style={{marginBottom:5,marginTop:50,flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Text>或使用</Text>
            <Text style={{color:"#cc6a3e",textDecorationLine:'underline'}} onPress={()=>{navigation.navigate("Onboarding")}}>其他方式</Text>
            <Text>登入</Text>
        </View>
  

       
  </View>
  </ScrollView>
        
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
        fontSize:16,
        fontWeight:"bold",
        marginBottom:16
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
            backgroundColor:"#cc6a3e"
    }
});

export default Register;
