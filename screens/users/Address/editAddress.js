import React,{useEffect, useRef, useState} from 'react';
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
import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,
faChevronLeft,faPen,faTrashAlt,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem,CheckBox } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';


const WIDTH =Dimensions.get('window').width;



const editAddress = ({navigation,route}) =>{
   
    const address_id = route.params.addressId||null;
    const addressData = route.params.addressData;
    const [selectedCountryId, setSelectedCountryId] = useState();
    const [selectedZoneId, setSelectedZoneId] = useState();
    
    const [countryList,setCountryList] = useState([]);
    const [zoneList, setZoneList] =useState([]);
    const [check,setCheck] =useState();

    const [selectedCountry, setSelectedCountry] =useState();

    const [error, setError] = useState([]);

    const [AddressDetail,setAddressDetail] = useState({
        lastname:addressData.lastname,
        firstname:addressData.firstname,
        company:addressData.company,
        country:addressData.country,
        address_1:addressData.address_1,
        address_2:addressData.address_2,
        postcode:addressData.postcode,
        selectCountry:addressData.selectedCountry,
        selectZone:addressData.selectZone,
        defaultAddress:addressData.defaultAddress,
    });
    const handleDefaultAddress = (defaultBool)=>{
        //console.log(defaultBool);
        if(defaultBool){
            setAddressDetail({...AddressDetail,defaultAddress:1});
        }else{
            setAddressDetail({...AddressDetail,defaultAddress:0});
        }
        
        
    }

    const handleAddAddress =()=>{

        //console.log(AddressDetail);
        //console.log(check);
        
        let address_list = route.params.list;
        let new_address = address_list.filter((item,index,arr)=>{
            return item.default==true;
        })
        console.log(new_address);

        if(AddressDetail.defaultAddress==1){
            fetch('https://goldrich.top/api/rest/account/address/'+new_address.address_id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                },body:JSON.stringify({
                    "firstname": new_address.firstname,
                    "lastname": new_address.lastname,
                    "city": new_address.city,
                    "address_1": new_address.address_1,
                    "address_2": new_address.address_2,
                    "country_id": new_address.country_id,
                    "postcode": new_address.postcode,
                    "zone_id": new_address.zone_id,
                    "company": new_address.company,
                    "default": 0
                })
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                if(responseJson.success==1){
                  
                }else if(responseJson.success==0){
                    //setError(responseJson.error);
                }
            }).catch((err)=>console.log(err))
        }


        fetch('https://goldrich.top/api/rest/account/address/'+address_id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                },body:JSON.stringify({
                    "firstname": AddressDetail.firstname,
                    "lastname": AddressDetail.lastname,
                    "city": AddressDetail.country,
                    "address_1": AddressDetail.address_1,
                    "address_2": AddressDetail.address_2,
                    "country_id": AddressDetail.selectCountry,
                    "postcode": AddressDetail.postcode,
                    "zone_id": AddressDetail.selectZone==''?0:AddressDetail.selectZone,
                    "company": AddressDetail.company,
                    "default": check==true?1:0
                })
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                if(responseJson.success==1){
                  
                }else if(responseJson.success==0){
                    setError(responseJson.error);
                }
            }).catch((err)=>console.log(err))

        


    }

   useEffect(()=>{
        fetch('https://goldrich.top/api/rest/account/address/'+address_id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.success==1){
                setSelectedCountryId(responseJson.data.country);
                setSelectedCountry(responseJson.data.country_id);
                setSelectedZoneId(responseJson.data.zone);
                setAddressDetail({...AddressDetail,defaultAddress:responseJson.data.default});
                setCheck(responseJson.data.default);
            }else if(responseJson.success==0){
                setError(responseJson.error);
            }
        }).catch((err)=>console.log(err))
   },[])

    useEffect(()=>{
        //console.log(addressData);
        fetch('https://goldrich.top/api/rest/countries/'+selectedCountry, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            // console.log('zones:--------------');
            //console.log(responseJson.data);
            if(responseJson.success==1){
                setZoneList(responseJson.data.zone);
            }else if(responseJson.success==0){
                
            }
        }).catch((err)=>console.log(err))
    },[selectedCountry])


    useEffect(()=>{
       
        fetch('https://goldrich.top/api/rest/countries', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            // console.log('countries:--------------');
            // console.log(responseJson);
            if(responseJson.success==1){
                setCountryList(responseJson.data);
            }else if(responseJson.success==0){
                
            }
        }).catch((err)=>console.log(err))
    },[])

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

                    <Text style={styles.textTitle}>地址管理</Text>
            
                    
                </View> 
            </View>
                <View style={{paddingHorizontal:20,paddingTop:20}}>
                    <View style={{paddingBottom:40}}>
                        <View style={{backgroundColor:'white',paddingTop:10,paddingBottom:30,borderRadius:10}}>
                            <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#d9d9d9'}}>
                                <View style={{paddingHorizontal:20,flexDirection:'row',alignItems:'center'}}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size={26}/>
                                    <Text style={[styles.inputsTitle,{marginLeft:30}]}>地址資料</Text>
                                </View>
                            </View>
                            
                            <View style={{paddingHorizontal:20}}>
                            
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <View style={{width:WIDTH*0.35}}>
                                        <Text style={styles.inputsTitle}>姓</Text>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="輸入姓氏"
                                            value={AddressDetail.lastname}
                                            onChangeText={(lastname)=>{setAddressDetail({...AddressDetail,lastname})}}
                                        />
                                    </View>
                                    <View style={{width:WIDTH*0.35}}>
                                        <Text style={styles.inputsTitle}>名</Text>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="輸入名字"
                                            value={AddressDetail.firstname}
                                            onChangeText={(firstname)=>{setAddressDetail({...AddressDetail,firstname})}}
                                        />
                                    </View>

                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>公司名</Text>
                                    <TextInput
                                        style={styles.inputs}
                                        value={AddressDetail.company}
                                        onChangeText={(company)=>{setAddressDetail({...AddressDetail,company})}}
                                    
                                        placeholder="輸入公司名"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>所在城市</Text>
                                    <TextInput
                                        style={styles.inputs}
                                        value={AddressDetail.country}
                                        onChangeText={(country)=>{setAddressDetail({...AddressDetail,country})}}
                                        
                                        placeholder="輸入所在城市"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>地址1</Text>
                                    <TextInput
                                        style={styles.inputs}
                                        value={AddressDetail.address_1}
                                        onChangeText={(address_1)=>{setAddressDetail({...AddressDetail,address_1})}}
                                    
                                        placeholder="輸入地址1"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>地址2</Text>
                                    <TextInput
                                        style={styles.inputs}
                                        value={AddressDetail.address_2}
                                        onChangeText={(address_2)=>{setAddressDetail({...AddressDetail,address_2})}}
                                    
                                        placeholder="輸入地址2"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>郵遞區號</Text>
                                    <TextInput
                                        style={styles.inputs}
                                        value={AddressDetail.postcode}
                                        onChangeText={(postcode)=>{setAddressDetail({...AddressDetail,postcode})}}    
                                    
                                        placeholder="輸入郵遞區號"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.inputsTitle} >所在國家</Text>
                                    <Picker
                                        style={{ 
                                            backgroundColor:'#f2f2f2',
                                            borderRadius:4,
                                            padding:20,
                                            paddingLeft:36,
                                        
                                        }}
                                        
                                        itemStyle={{
                                            fontSize:16,
                                            color:'#d3835f',
                                            fontWeight:'700',
                                            marginLeft:36
                                        }}
                                        
                                        selectedValue={selectedCountryId}
                                        onValueChange={(itemValue, itemIndex) =>{
                                                setSelectedCountryId(itemValue);
                                                // console.log(itemValue);
                                                //console.log(countryList[itemIndex].country_id);
                                                
                                                setSelectedCountry(countryList[itemIndex].country_id);
                                                setAddressDetail({...AddressDetail,selectCountry:countryList[itemIndex].country_id});
                                                
                                            }}
                                    
                                        >

                                        {countryList.length>=1&&countryList.map((item,index)=>{
                                            return(
                                            
                                                <Picker.Item style={{color:'#d3835f'}}
                                                key={index} label={item.name} value={item.name} />
                                                
                                            )
                                        
                                        })}

                                    </Picker>

                                </View>
                                <View>
                                    <Text style={styles.inputsTitle}>地區或省份</Text>
                                    <Picker
                                        style={{ 
                                            backgroundColor:'#f2f2f2',
                                            borderRadius:4,
                                            padding:20,
                                            paddingLeft:36,
                                        
                                        }}
                                        
                                        itemStyle={{
                                            fontSize:16,
                                            color:'#d3835f',
                                            fontWeight:'700',
                                            paddingLeft:36
                                        }}
                                        
                                        selectedValue={selectedZoneId}
                                        onValueChange={(itemValue, itemIndex) =>{
                                                setSelectedZoneId(itemValue);

                                                if(itemValue==null){

                                                }else{

                                                    setAddressDetail({...AddressDetail,selectZone:itemValue});
                                                    //console.log(zoneList[itemIndex].zone_id);
                                                    setAddressDetail({...AddressDetail,selectZone:zoneList[itemIndex].zone_id?zoneList[itemIndex].zone_id:0});
                                                }
                                            }
                                            
                                        }>

                                        {zoneList?zoneList.map((item,index)=>{
                                            return(
                                            
                                                <Picker.Item style={{color:'#d3835f'}}
                                                key={index} label={item.name} value={item.name} />
                                                
                                            )
                                        
                                        }):null}

                                    </Picker>
                                </View>
                                <View style={{flexDirection:'row',marginTop:15}}>        
                                    <CheckBox 
                                        title="默認收件地址"
                                        checked={check}
                                        onPress={()=>{setCheck(!check);handleDefaultAddress(!check)}}
                                        containerStyle={{
                                            padding:0,borderWidth:0,marginLeft:0,marginRight:0,backgroundColor:'transparent',
                                        
                                        }}
                                    />
                                
                                </View>
                                {error.length>=1?error.map((item,index)=>{
                                    return(

                                        <Text key={index} style={[styles.errorText,{fontSize:16}]}>{item}</Text>
                                    )
                                }):null}
                            </View>




                        </View>

                       
                    </View>

                    <View style={{}}>
                            <Button  
                                buttonStyle={{  
                                    alignSelf:'center',
                                    width:230,                    
                                    padding:10,
                                    borderWidth: 0,
                                    borderRadius:40, 
                                    backgroundColor:"#623f31",
                                    marginBottom:40
                                }} 
                                title="確認" 
                                onPress={handleAddAddress} 
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
    }
    
    
});

export default editAddress;