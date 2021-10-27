import React from 'react';
import { View, Text, TouchableOpacity,Modal,  StyleSheet,Dimensions } from 'react-native';
import {faStar,faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {SIZES} from '../../../constants/theme';
import { Button} from 'react-native-elements';

const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;

const PaypalApp = ({navigation,route}) =>{


    const onSubmit = () =>{
        fetch('https://goldrich.top/api/rest/confirm', {
            method: 'PUT',
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
                navigation.navigate('User',{authorization:route.params.authorization});
            }
           
          
        }).catch((err)=>console.log(err))
        
      
         
    }


    return(
       
        <View style={{flex:1}}>

        <View style={{
            backgroundColor:"#cc6a3e",
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10,
            paddingTop:40,
            height:100,
            zIndex:5,
            
        }}>
            <View style={{alignItems:'center',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity
                        style={{
                            marginLeft:SIZES.padding,
                            
                        }}
                        onPress={()=>navigation.goBack()}
                    >
                        <FontAwesomeIcon 
                            icon={faChevronLeft} color='white' size={25}/>
                    </TouchableOpacity>

                    <Text style={styles.textTitle}>結賬</Text>
                </View>
                

                 
                
            </View> 
          
           
                   
              
        </View>
        
        

        <View style={{padding:25,marginBottom:120,alignItems:'center'}}>
            <FontAwesomeIcon icon={faStar} size={60} style={{marginBottom:20}} color='#f5ce42'/>
            <Text style={{fontSize:30,marginBottom:20}}>已完成訂購</Text>
            <Text>您的訂單已經成功送出，我們會在第一時間進行處理！如有任何問題或意見，請 聯絡我們.感謝您的訂購！</Text>
            <View style={{alignItems:'center'}}>
            <Button
                buttonStyle={{
                    padding:10,
                    borderWidth: 0,
                    borderRadius:20, 
                    backgroundColor:"#d9a21b",
                    marginTop:60,
                    width:WIDTH*0.6
                }}
                title="回到首頁"
                onPress={onSubmit}  
            />
                
        </View>
        </View>

       

        
    </View>
    )
   
}
const styles =StyleSheet.create({
    textTitle:{
        marginLeft:15,
        marginRight:SIZES.padding,
        fontSize:20,
        fontWeight:'700',
        color:'#fff'
    },
    container: {
        flex: 1,
        marginTop: 20,
        width: '100%',
		height: 500,
    },
    
});
export default PaypalApp;