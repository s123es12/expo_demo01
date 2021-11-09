import React, { useState, useRef } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    View,
    Text,
    Alert,
    Dimensions,
    
} from "react-native";
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS, SIZES } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMobileAlt, faFacebook,faGoogle,faEnvelope,faCheckCircle,faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons'
import { TextInput } from "react-native-gesture-handler";
import { useScrollToTop } from "@react-navigation/native";
import { color } from "react-native-elements/dist/helpers";
import Modal from "react-native-modal";
import {useForm, Controller} from "react-hook-form";


const ForgetAccount =({navigation,route})=>{
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
     
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
            
                password:'',
                confirmPassword:'',
              },
        }
    );
    
    const onSubmit = data =>{
        setModalVisible(true);
        
    }
    
    


    return (
        /** 
            忘記密碼
            請輸入你的電郵, 你將會收到重設密碼的電郵, 請根據電郵指示重設密碼

            重設密碼
            我們收到你的重設密碼的通知, 請根據指示重設密碼
        */
      
       <View style={[styles.container,{padding:SIZES.padding}]}>


                <Modal isVisible={isModalVisible}
                    
                >
                    <View style={{ flex: 1,alignItems:'center' ,justifyContent:'center'}}>
                        <View style={{backgroundColor:'white',alignItems:'center',padding:50,borderRadius:10}}>
                            <FontAwesomeIcon icon={faCheckCircle} size={60} style={{color:"#cc6a3e",marginBottom:30}}/>
                            <Text style={[{fontWeight:"700",marginBottom:15,fontSize:19}]}>重設密碼成功</Text>
                            <Text style={{marginBottom:50,fontSize:14,fontWeight:"600"}}>請重新登入</Text>
                            <Button  buttonStyle={[styles.confirmBtn,{  width:230}]} title="確認" onPress={()=>{
                                toggleModal();
                                navigation.navigate("Onboarding");
                            }} />
                        </View>
                    </View>
                </Modal>
          

            <Text style={{height:100}}></Text>
            <Text style={[FONTS.h2,{fontWeight:"700"}]}>重設密碼</Text>
            <View style={{marginBottom:5,marginTop:20}}>
                <Text style={[FONTS.h4]}>我們收到你的重設密碼的通知, 請根據指示重設密碼</Text>
            </View>
            <View style={{marginBottom:5}}>
            <Text style={styles.inputTitle}>密碼</Text>
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
              {errors.password && <Text style={styles.errorText}>This is required.</Text>}
        </View>
        <View style={{marginBottom:40}}>
            <Text style={styles.inputTitle}>再次輸入密碼</Text>
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
             {errors.confirmPassword && <Text style={styles.errorText}>This is required.</Text>}
        </View>
            
            
        <View style={{marginBottom:5,marginTop:10}}>
            <Button
                buttonStyle={styles.confirmBtn}
                title="確認"
                onPress={handleSubmit(onSubmit)}  
            />
        </View>
            
        <View style={{alignItems:'flex-end',flex:1,flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontSize:16}}>還未有帳戶？</Text>
            <Text style={{fontSize:16}} onPress={() => navigation.navigate('Register')} style={{color:"#dba829"}}>立即註冊</Text>
        </View>

            
           
       </View>
       
    )
}

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
        backgroundColor:"#d9a21b",
      
    },
    textStyle:{
        fontSize:16,
        fontWeight:'bold'
    }
})

export default ForgetAccount;