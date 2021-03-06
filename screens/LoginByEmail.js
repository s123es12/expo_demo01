
import React,  {useEffect, useState} from 'react';
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
import { COLORS, FONTS} from '../constants';
import {useForm, Controller} from "react-hook-form";


const LoginByEmail = ({ navigation ,route}) => {

    const [loginFail,setLoginFail] = useState(false);
    const [errorMsg,setErrorMsg]=useState(null);

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
                email: '',
                password:'',
                
              },
        }
    );

    const onSubmit = data =>{

        //console.log(data)

        fetch('https://goldrich.top/api/rest/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                email:data.email,
                password:data.password
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            //console.log(responseJson);
           if(responseJson.success == 0){
                if(JSON.stringify(responseJson.error[0]).match('User is logged.')){
                    navigation.navigate('User',{authorization:route.params.authorization});
                }else if(JSON.stringify(responseJson.error[0]).match('The access token provided is invalid"')){

                    fetch('https://goldrich.top/api/rest/oauth2/token/client_credentials', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Basic c2hvcHBpbmdfb2F1dGhfY2xpZW50OnNob3BwaW5nX29hdXRoX3NlY3JldA=='
                        },body:JSON.stringify({
                            "old_token": route.params.authorization,
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                       if(responseJson.data.success==1){
                        fetch('https://goldrich.top/api/rest/login', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization':'Bearer '+responseJson.data.access_token,
                                
                            },body:JSON.stringify({
                                "email":data.email,
                                "password":data.password
                            })
                        })
                        .then(response=>response.json())
                        .then((responseJson)=>{
                            //console.log(responseJson);
                            if(responseJson.success == 0){
                                    
                            }else if(responseJson.success ==1){
                                navigation.navigate('User',{authorization:'Bearer '+responseJson.data.access_token,data:responseJson.data});
                            }
                        }).catch((err)=>console.log(err));
                       }
                        
                        
                    }).catch((err)=>console.log(err));



                }
                setErrorMsg(responseJson.error[0]);
                setLoginFail(true);
           }else if(responseJson.success ==1){
               //console.log(responseJson);

               navigation.navigate('User',{authorization:route.params.authorization,data:responseJson.data});
           }
        }).catch((err)=>console.log(err));

       

        
    }

    useEffect(()=>{

        

    },[])
    

 
    return (    

     
        <View style={[styles.container]}>
        
        <Text style={{height:100}}></Text>
        <Text style={[FONTS.h2,{fontWeight:"700"}]}>????????????</Text>
        <Text style={[FONTS.h3,{marginBottom:60}]}>??????????????????</Text>

    
        <View style={{marginBottom:5}}>
            <Text style={styles.inputTitle}>??????</Text>
            <Controller 
                control={control} 
                render={({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        style={styles.inputs}
                        onBlur={onBlur}
                        onChangeText={value=>onChange(value)}
                        value={value}
                        placeholder="??????????????????"
                    />
                )}
                name="email" 
                rules={{required:true}}
            />
            {errors.email && <Text style={styles.errorText}>This is required.</Text>}
            {loginFail && <Text style={[styles.errorText,{fontSize:16}]}>{errorMsg}</Text>}
        </View>
        
        
        <View style={{marginBottom:5}}>
            <Text style={styles.inputTitle}>??????</Text>
            <Controller 
                control={control} 
                render={({field:{onChange,onBlur,value}})=>(
                    <TextInput 
                        style={styles.inputs}
                        onBlur={onBlur}
                        onChangeText={value=>onChange(value)}
                        value={value}
                        secureTextEntry={true}
                        placeholder="??????????????????"
                    />
                )}
                name="password" 
                rules={{required:true}}
            />
              {errors.password && <Text style={styles.errorText}>This is required.</Text>}
              {loginFail && <Text style={[styles.errorText,{fontSize:16}]}>{errorMsg}</Text>}
        </View>
        <View style={{alignItems:'flex-end',marginBottom:10,marginTop:5}}>
            <Text style={{color:"#cc6a3e"}} onPress={()=>navigation.navigate("ForgetAccount",{authorization:route.params.authorization})}>???????????????</Text>
        </View>
        <View style={{marginBottom:5,marginTop:10}}>
            <Button
                buttonStyle={styles.confirmBtn}
                title="??????"
                onPress={handleSubmit(onSubmit)}  
            />
        </View>
       
        <View style={{marginBottom:5,marginTop:15,flex:1,flexDirection:'row',justifyContent:'center'}}>
            <Text style={styles.textStyle}>?????????</Text>
            <Text style={[styles.textStyle,{color:"#cc6a3e",textDecorationLine:'underline'}]} onPress={()=>{navigation.navigate("Onboarding")}}>????????????</Text>
            <Text style={styles.textStyle}>??????</Text>
        </View>
        <View style={{alignItems:'center',flex:1,flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontSize:16}}>??????????????????</Text>
            <Text style={{fontSize:16}} onPress={() => navigation.navigate('Register',{authorization:route.params.authorization})} style={{color:"#dba829"}}>????????????</Text>
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
            backgroundColor:"#cc6a3e"
    },
    textStyle:{
        fontSize:16,
        fontWeight:'bold'
    }
});

export default LoginByEmail;
