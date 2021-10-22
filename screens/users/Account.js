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
import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,faDonate,faCube} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { useIsFocused } from '@react-navigation/native';

const WIDTH =Dimensions.get('window').width;



const Account = ({navigation,route}) =>{
   
    const isFocused = useIsFocused();
    const [userData, setUserData] = useState({});
    const [userPoints, setUserPoints] =useState(null);

  
    
    const [isMemberVisible,setMemberVisible]=useState(false);
  
    const showMemberModal=()=>{
      
        setMemberVisible(!isMemberVisible);
    }

   
    

    
    

    useEffect(()=>{
        fetch('https://goldrich.top/api/rest/account', {
            method: 'GET',
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
                setUserData(responseJson.data);
                if(!responseJson.data.reward_total){
                    let points_list = responseJson.data.rewards;
                    let point =0;
                    for(var i=0;i<points_list.length;i++){
                        point += parseInt(points_list[i].points);
                    }
                    setUserPoints(point);
                }else{
                    setUserPoints(responseJson.data.reward_total);
                }
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
        .finally(()=>{})

       



    },[isFocused])

    return(
            <View>
                <Modal isVisible={isMemberVisible}>
                    <View style={{ flex: 1,alignItems:'center' ,justifyContent:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <View style={{backgroundColor:'white',padding:30,borderRadius:10,width:WIDTH*0.8}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,borderBottomColor:'cccccc',borderBottomWidth:1}}>
                                    <Text style={{fontSize:20,fontWeight:'700',paddingLeft:10}}>會員</Text>
                                    <FontAwesomeIcon icon={faTimes} size={30} onPress={showMemberModal}/>
                                </View>
                                <View style={{alignItems:'center',padding:20}}>
                                    <QRCode value={userData.customer_id} />
                                    <Text style={{marginTop:20,fontSize:16,color:'#56585e'}}>會員編號:{userData.customer_id}</Text>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,paddingHorizontal:WIDTH*0.15,alignItems:'center'}}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <FontAwesomeIcon icon={faDonate} color="#fdd952"/>
                                        <Text style={{fontWeight:'700',color:'#000',marginLeft:8}}>{userPoints}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <FontAwesomeIcon icon={faCube} color="#c1c1c1"/>
                                        <Text style={{color:'#c1c1c1',marginLeft:8}}>銀</Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
           
            <View style={{
                backgroundColor:"#cc6a3e",
                borderBottomLeftRadius:10,
                borderBottomRightRadius:10,
                paddingTop:40,
                height:100,
            }}>
                <View style={{alignItems:'center',flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.textTitle}>個人</Text>
            
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

                    <ScrollView>
                        <TouchableOpacity onPress={()=>setMemberVisible(!isMemberVisible)}>

                            <View style={{flex:1,flexDirection:'row',height:100,backgroundColor:'white',borderRadius:10,padding:20,alignItems:'center',justifyContent:'space-between'}}>
                                <Avatar rounded source={require('../../assets/profile-45x45.png')} size={'large'} />
                                <View style={{marginLeft:20,marginRight:35}}>
                                    <Text style={{marginBottom:10,fontWeight:'700',fontSize:18}}>{userData.lastname} {userData.firstname}</Text>
                                    <Text>{userData.email}</Text>
                                </View>
                                <QRCode 
                                    value={userData.customer_id}
                                    size={40}
                                />
                            </View>
                        </TouchableOpacity>

                        <View style={styles.settingList}>
                            <TouchableOpacity onPress={()=>navigation.navigate('PersonInfo',{userDetail:userData,authorization:route.params.authorization})}>
                                <View style={styles.settingItem}>
                                    <Text style={styles.settingText}>個人資料</Text>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('Address',{authorization:route.params.authorization})}>
                                <View style={styles.settingItem}>
                                    <Text style={styles.settingText}>地址管理</Text>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('Order',{authorization:route.params.authorization})}>
                                <View style={styles.settingItem}>
                                    <Text style={styles.settingText}>我的訂單</Text>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </View>
                            </TouchableOpacity>
                        </View>



                    </ScrollView>


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
    },settingList:{
        borderRadius:10,
        backgroundColor:'white',
        marginTop:20,
        marginBottom:20,
        paddingHorizontal:16,
        paddingVertical:8
        
    },settingItem:{
        margin:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
        
    },
    settingText:{
        fontSize:16,
        fontWeight:'700'
    }
    
});

export default Account;