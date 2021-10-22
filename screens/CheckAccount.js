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
import { faMobileAlt, faFacebook,faGoogle,faEnvelope,faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { TextInput } from "react-native-gesture-handler";
import { useScrollToTop } from "@react-navigation/native";
import { color } from "react-native-elements/dist/helpers";
import Modal from "react-native-modal";


const CheckAccount =({navigation,route})=>{
    const num01 = useRef();
    const num02 = useRef();
    const num03 = useRef();
    const num04 = useRef();
    const num05 = useRef();
    const num06 = useRef();
    const [numberText,setNumberText] = useState([
        {
            index:1,
            num:''
        },
        {
            index:2,
            num:''
        },
        {
            index:3,
            num:''
        },
        {
            index:4,
            num:''
        },
        {
            index:5,
            num:''
        },
        {
            index:6,
            num:''
        },
    ]);
    
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    
    const phoneNumber  = route.params.data.phoneNumber.slice(4,8);
    

    return (
        /** 
            請輸入一次性驗證碼
            驗證碼已發送到****5432的號碼
            確認

            註冊成功
            請重新登入
        */
      
       <View style={{padding:SIZES.padding}}>

            <Modal isVisible={isModalVisible}
            
            >
                <View style={{ flex: 1,alignItems:'center' ,justifyContent:'center'}}>
                    <View style={{backgroundColor:'white',alignItems:'center',padding:50,borderRadius:10}}>
                        <FontAwesomeIcon icon={faCheckCircle} size={60} style={{color:"#cc6a3e",marginBottom:30}}/>
                        <Text style={[{fontWeight:"700",marginBottom:15,fontSize:19}]}>註冊成功</Text>
                        <Text style={{marginBottom:50,fontSize:14,fontWeight:"600"}}>請重新登入</Text>
                        <Button  buttonStyle={[styles.confirmBtn,{  width:230}]} title="確認" onPress={()=>{
                            toggleModal();
                            navigation.navigate("Onboarding");
                        }} />
                    </View>
                </View>
            </Modal>




            <Text style={{height:100}}>LOGO</Text>
            <Text style={[FONTS.h2,{fontWeight:"700"}]}>請輸入一次性驗證碼</Text>
            {/* 驗證碼已發送到****5432的號碼 */}
            <View style={{marginBottom:5,marginTop:20,flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-start'}}>
                <Text style={[FONTS.h3]}>驗證碼已發送到</Text>
                <Text style={[FONTS.h3,{color:"#cc6a3e"}]} >****{phoneNumber}</Text>
                <Text style={[FONTS.h3]}>的號碼</Text>
            </View>
            <View style={[styles.flexSpaceAround,{flex:1,flexDirection:'row',alignItems:'flex-start',marginBottom: 120}]}>
            
                <TextInput 
                    selectTextOnFocus
                    ref={num01}
                    style={[styles.confirmMsg]}
                    value={numberText[0].num}
                    onChangeText={(e)=>{
                        let copy_numList = [...numberText];
                        copy_numList[0].num=e;
                        setNumberText(copy_numList);
                        num02.current.focus();
                    }}
                    
                    maxLength={1}
                />
                <TextInput 
                    selectTextOnFocus
                    ref={num02}
                    style={styles.confirmMsg}
                    value={numberText[1].num}
                    onChangeText={(e)=>{
                        console.log(e);
                        let copy_numList = [...numberText];
                        copy_numList[1].num=e;
                        setNumberText(copy_numList);
                        num03.current.focus();
                    }}
                    maxLength={1}
                />
                <TextInput 
                    selectTextOnFocus
                    ref={num03}
                    style={styles.confirmMsg}
                    value={numberText[2].num}
                    onChangeText={(e)=>{
                        console.log(e);
                        let copy_numList = [...numberText];
                        copy_numList[2].num=e;
                        setNumberText(copy_numList);
                        num04.current.focus();
                    }}
                    maxLength={1}
                />
                <TextInput
                    selectTextOnFocus 
                    ref={num04}
                    style={styles.confirmMsg}
                    value={numberText[3].num}
                    onChangeText={(e)=>{
                        console.log(e);
                        let copy_numList = [...numberText];
                        copy_numList[3].num=e;
                        setNumberText(copy_numList);
                        num05.current.focus();
                    }}
                    maxLength={1}
                />
                <TextInput
                    selectTextOnFocus 
                    ref={num05}
                    style={styles.confirmMsg}
                    value={numberText[4].num}
                    onChangeText={(e)=>{
                        console.log(e);
                        let copy_numList = [...numberText];
                        copy_numList[4].num=e;
                        setNumberText(copy_numList);
                        num06.current.focus();
                    }}
                    maxLength={1}
                />
                <TextInput
                    selectTextOnFocus 
                    ref={num06}
                    style={styles.confirmMsg}
                    value={numberText[5].num}
                    onChangeText={(e)=>{
                        console.log(e);
                        let copy_numList = [...numberText];
                        copy_numList[5].num=e;
                        setNumberText(copy_numList);
                    }}
                    maxLength={1}
                />
                
            </View>
            
            
            <View>

            <Button 
                buttonStyle={styles.confirmBtn}
                title="確認"
                onPress={()=>{
                    setModalVisible(true);
                }}
            />
            </View>
            
            <View style={{marginBottom:5,marginTop:50,flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Text>或使用</Text>
                <Text style={{color:"#cc6a3e",textDecorationLine:'underline'}} onPress={()=>{navigation.navigate("Onboarding")}}>其他方式</Text>
                <Text>登入</Text>
            </View>

            
           
       </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white
    },
    shadow:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    textStyle:{
        textAlign:'center',
        marginBottom:SIZES.padding,
        fontSize:22,
        fontWeight:"700"
    },
    confirmBtn:{
            padding:10,
            borderWidth: 0,
            borderRadius:20, 
            backgroundColor:"#cc6a3e",
            
    },
    confirmMsg:{
        borderBottomWidth:3,
        width:Dimensions.get('window').width*0.1,
        marginLeft:5,
        marginRight:5,
        textAlign:'center',
        
        height:100,
        padding: 10,
        fontSize:25,
    },
    flexSpaceAround:{
        justifyContent:'space-around'
    }
})

export default CheckAccount;