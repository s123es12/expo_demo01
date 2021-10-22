import React,{useEffect, useState} from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    ActivityIndicator
} from 'react-native';
import {
    faChevronLeft,
    faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {useForm, Controller} from "react-hook-form";
import { Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';


const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const PayAddress = ({navigation,route}) =>{
 
    const [defaultAdd, setDefaultAdd] = useState({});
    const [existAdd, setExistAdd]=useState({})
    const [selectedCountryId, setSelectedCountryId] = useState();
    const [selectedZoneId, setSelectedZoneId] = useState();
    const [countryList,setCountryList] = useState([]);
    const [zoneList, setZoneList] =useState([]);
    const [selectedCountry, setSelectedCountry] =useState();
    const [PaymentError, setPaymentError] = useState([]);
    
    const [recipientAdd, setRecipientAdd] = useState({
        lastname:'test',
        firstname:'test',
        city:'test',
        country_id:"96",
        zone_id:'',
        address1:'test',
        address2:'',
        postcode:'',
        company:''
    });
    const [selectedCountryId2, setSelectedCountryId2] = useState("Hong Kong");
    const [selectedZoneId2, setSelectedZoneId2] = useState();
    const [countryList2,setCountryList2] = useState([]);
    const [zoneList2, setZoneList2] =useState([]);
    const [selectedCountry2, setSelectedCountry2] =useState(96);
    const [ShippingError, setShippingError] = useState([]);
    const [existShippAdd,setExistShippAdd] = useState();

    const [paymentSuccess,setPaymentSuccess] = useState(false);
    const [shippingSuccess,setShippingSuccess] = useState(false);
    const [checkBtn, setCheckBtn]=useState(false);

    const onSubmit = data =>{
        //navigation.navigate('PayDelivery',{authorization:route.params.authorization});
        //console.log('defaultAdd: ',defaultAdd);
        //console.log('recipientAdd: ',recipientAdd);

        

        if(defaultAdd == existAdd){
            fetch('https://goldrich.top/api/rest/paymentaddress/existing', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                },body:JSON.stringify({
                    "address_id": existAdd.address_id
                })
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                if(responseJson.success ==1){
                    console.log('Set existing payment address to order');
                    setPaymentSuccess(true);
                }else if(responseJson.success==0){

                }
            
            }).catch((err)=>console.log(err));
        }else{

            fetch('https://goldrich.top/api/rest/paymentaddress', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                },body:JSON.stringify({
                    "firstname": defaultAdd.firstname,
                    "lastname": defaultAdd.lastname,
                    "city": defaultAdd.city,
                    "address_1": defaultAdd.address_1,
                    "address_2": defaultAdd.address_2,
                    "country_id": defaultAdd.country_id,
                    "postcode": defaultAdd.postcode,
                    "zone_id": defaultAdd.zone_id,
                    "company": defaultAdd.company,
                })
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                if(responseJson.success ==1){
                   console.log('Add new payment address to order');
                   setPaymentError([]);
                   setPaymentSuccess(true);
                }else if(responseJson.success==0){
                    setPaymentError(responseJson.error);
                }
              
            }).catch((err)=>console.log(err));
        }

        fetch('https://goldrich.top/api/rest/shippingaddress', {
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
            if(responseJson.success ==1){
                let isFoundSame = false;
                let found_Id ;
                responseJson.data.addresses.map((item,index)=>{
                    if(
                        recipientAdd.lastname==item.lastname&
                        recipientAdd.firstname==item.firstname&
                        recipientAdd.city==item.city&
                        recipientAdd.country_id==item.country_id&
                        recipientAdd.zone_id==item.zone_id&
                        recipientAdd.address1==item.address_1&
                        recipientAdd.address2==item.address_2&
                        recipientAdd.postcode==item.postcode&
                        recipientAdd.company==item.company
                    )
                    {
                        isFoundSame = true;
                        found_Id = item.address_id;
                        //console.log("same found 1",item);
                    }else{
                        isFoundSame = false;
                    }
               })

                if(isFoundSame){
                    fetch('https://goldrich.top/api/rest/shippingaddress/existing', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            "address_id": found_Id
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success ==1){
                            console.log('Set existing shipping address to order');
                            setShippingError([]);
                            setShippingSuccess(true);
                        }else if(responseJson.success==0){
                            setShippingError(responseJson.error);
                        }
                    
                    }).catch((err)=>console.log(err));
                }else{
                    fetch('https://goldrich.top/api/rest/shippingaddress', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            "firstname": recipientAdd.firstname,
                            "lastname": recipientAdd.lastname,
                            "city": recipientAdd.city,
                            "address_1": recipientAdd.address1,
                            "address_2": recipientAdd.address2,
                            "country_id": recipientAdd.country_id,
                            "postcode": recipientAdd.postcode,
                            "zone_id": recipientAdd.zone_id,
                            "company": recipientAdd.company,
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success ==1){
                            console.log('Add new shipping address to order');
                            setShippingError([]);
                            setShippingSuccess(true);
                            
                        }else if(responseJson.success==0){
                            setShippingError(responseJson.error);
                        }
                    
                    }).catch((err)=>console.log(err));
                }



            }else if(responseJson.success==0){
                
            }
          
        }).catch((err)=>console.log(err))
        .finally(()=>{
            setCheckBtn(!checkBtn);
            
        });

        setTimeout(()=>{if(paymentSuccess ==true && shippingSuccess ==true){
            navigation.navigate('PayDelivery',{authorization:route.params.authorization});
        }},1000)
    }
    useEffect(()=>{
        if(paymentSuccess ==true && shippingSuccess ==true){
            navigation.navigate('PayDelivery',{authorization:route.params.authorization});
        }
    },[checkBtn])

    useEffect(()=>{
        
        fetch('https://goldrich.top/api/rest/account/address', {
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
            if(responseJson.success ==1){
                let array = responseJson.data.addresses;
                let defaultAddress = array.filter((item,index)=>{
                    return item.default ==true;
                })
               //console.log(defaultAddress);
                setDefaultAdd(defaultAddress[0]);
                setExistAdd(defaultAddress[0]);
                //console.log(defaultAdd);
                setSelectedCountryId(defaultAddress[0].country);
                setSelectedCountry(defaultAddress[0].country_id);
                setSelectedZoneId(defaultAddress[0].zone);
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        

        fetch('https://goldrich.top/api/rest/paymentaddress', {
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
            if(responseJson.success ==1){
               
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err));

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
                setCountryList2(responseJson.data);
            }else if(responseJson.success==0){
                
            }
        }).catch((err)=>console.log(err))
    },[])


    useEffect(()=>{
        //console.log('console');
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
        //console.log('console');
        fetch('https://goldrich.top/api/rest/countries/'+selectedCountry2, {
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
           // console.log(responseJson.data);
            if(responseJson.success==1){
                setZoneList2(responseJson.data.zone);
                setRecipientAdd({...recipientAdd,zone_id:responseJson.data.zone[0].zone_id});
            }else if(responseJson.success==0){
                
            }
        }).catch((err)=>console.log(err))
    },[selectedCountry2])

    

    return(

            <View >

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
                <ScrollView>
                    <View style={{padding:25,marginBottom:80}}>

                        <Text style={{fontWeight:'700',marginTop:20,marginBottom:20}}>每次下單寄/收件服務地址相同, 如寄/收件地址不同, 需獨立下單</Text>

                        <View style={{backgroundColor:'white',padding:20}}>
                            <Text style={{borderBottomWidth:1}}>聯絡資料（寄件人）</Text>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputTitle}>姓</Text>                  
                                    <TextInput 
                                        style={styles.inputs}
                                        value={defaultAdd.lastname}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,lastname:value})}
                                        placeholder="輸入姓"
                                    />
                                
                                </View>
                                
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputTitle}>名</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        value={defaultAdd.firstname}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,firstname:value})}
                                        placeholder="輸入名"
                                    />
                                </View>

                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>所在城市</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        value={defaultAdd.city}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,city:value})}
                                        placeholder="輸入寄件人所在城市"
                                    />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>郵遞區號</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        value={defaultAdd.postcode}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,postcode:value})}
                                        placeholder="輸入寄件人郵遞區號"
                                    />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>公司名</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        value={defaultAdd.company}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,company:value})}
                                        placeholder="輸入寄件人公司名"
                                    />
                            </View>
                            <View style={{marginBottom:5}}>
                            <Text style={styles.inputTitle} >所在國家</Text>
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
                                            setDefaultAdd({...defaultAdd,selectCountry:countryList[itemIndex].country_id});
                                            
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
                            <View style={{marginBottom:5}}>
                            <Text style={styles.inputTitle} >地區或省份</Text>
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

                                                    setDefaultAdd({...defaultAdd,selectZone:itemValue});
                                                    //console.log(zoneList[itemIndex].zone_id);
                                                    setDefaultAdd({...defaultAdd,selectZone:zoneList[itemIndex].zone_id});
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
                            <View style={{marginBottom:5}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                    <Text style={styles.inputTitle}>地址1</Text>

                                    <View>
                                        <TouchableOpacity style={{flexDirection:'row'}}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} size={20} color="#623f31" />
                                            <Text style={{color:"#623f31",marginLeft:5,fontSize:16,fontWeight:"bold"}}>地址簿</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <TextInput 
                                    style={styles.inputs}
                                    value={defaultAdd.address_1}
                                    onChangeText={(value)=>setDefaultAdd({...defaultAdd,address_1:value})}
                                    placeholder="輸入寄件人地址1"
                                />
                            
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>地址2</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        value={defaultAdd.address_2}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,address_2:value})}
                                        placeholder="輸入寄件人地址2"
                                    />
                            </View>
                            {PaymentError.length>=1?PaymentError.map((item,index)=>{
                                return(

                                    <Text key={index} style={[styles.errorText,{fontSize:14}]}>{item}</Text>
                                )
                            }):null}
                        </View>
                                    
                        <Text style={{fontWeight:'700',marginTop:20,marginBottom:20}}>如選擇到店取件, 收件人地址請填寫金富諾有限公司</Text>

                        <View style={{backgroundColor:'white',padding:20}}>
                            <Text style={{borderBottomWidth:1}}>聯絡資料（收件人）</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputTitle}>姓</Text>                  
                                    <TextInput 
                                        style={styles.inputs}
                                        value={recipientAdd.lastname}
                                        onChangeText={(value)=>setRecipientAdd({...recipientAdd,lastname:value})}
                                        placeholder="收件人姓"
                                    />
                                
                                </View>
                            
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputTitle}>名</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        value={recipientAdd.firstname}
                                        onChangeText={(value)=>setRecipientAdd({...recipientAdd,firstname:value})}
                                        placeholder="收件人名"
                                    />
                                </View>
                                
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>所在城市</Text>
                                <TextInput 
                                    style={styles.inputs}
                                    value={recipientAdd.city}
                                    onChangeText={(value)=>setRecipientAdd({...recipientAdd,city:value})}
                                    placeholder="輸入收件人所在城市"
                                />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>郵遞區號</Text>
                                <TextInput 
                                    style={styles.inputs}
                                    value={recipientAdd.postcode}
                                    onChangeText={(value)=>setRecipientAdd({...recipientAdd,postcode:value})}
                                    placeholder="輸入收件人郵遞區號"
                                />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>公司名</Text>
                                <TextInput 
                                    style={styles.inputs}
                                    value={recipientAdd.company}
                                    onChangeText={(value)=>setRecipientAdd({...recipientAdd,company:value})}
                                    placeholder="輸入收件人公司名"
                                />
                            </View>
                            <View style={{marginBottom:5}}>
                            <Text style={styles.inputTitle} >所在國家</Text>
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
                                    
                                    selectedValue={selectedCountryId2}
                                    onValueChange={(itemValue, itemIndex) =>{
                                            setSelectedCountryId2(itemValue);
                                            // console.log(itemValue);
                                            //console.log(countryList[itemIndex].country_id);
                                            
                                            setSelectedCountry2(countryList2[itemIndex].country_id);
                                            setRecipientAdd({...recipientAdd,selectCountry2:countryList2[itemIndex].country_id});
                                            setRecipientAdd({...recipientAdd,country_id:countryList2[itemIndex].country_id});
                                        }}
                                
                                    >

                                    {countryList2.length>=1&&countryList2.map((item,index)=>{
                                        return(
                                        
                                            <Picker.Item style={{color:'#d3835f'}}
                                            key={index} label={item.name} value={item.name} />
                                            
                                        )
                                    
                                    })}

                                </Picker>
                            </View>
                            <View style={{marginBottom:5}}>
                            <Text style={styles.inputTitle} >地區或省份</Text>
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
                                        
                                        selectedValue={selectedZoneId2}
                                        onValueChange={(itemValue, itemIndex) =>{
                                                setSelectedZoneId2(itemValue);
                                                if(itemValue==null){

                                                }else{

                                                    setRecipientAdd({...recipientAdd,selectZone2:itemValue});
                                                    //console.log(zoneList[itemIndex].zone_id);
                                                    setRecipientAdd({...recipientAdd,selectZone2:zoneList2[itemIndex].zone_id?zoneList2[itemIndex].zone_id:0});
                                                }
                                            }
                                            
                                        }>

                                        {zoneList2?zoneList2.map((item,index)=>{
                                            return(
                                            
                                                <Picker.Item style={{color:'#d3835f'}}
                                                key={index} label={item.name} value={item.name} />
                                                
                                            )
                                        
                                        }):null}

                                    </Picker>
                            </View>
                            <View style={{marginBottom:5}}>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                    <Text style={styles.inputTitle}>地址1</Text>

                                    <View>
                                        <TouchableOpacity style={{flexDirection:'row'}}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} size={20} color="#623f31" />
                                            <Text style={{color:"#623f31",marginLeft:5,fontSize:16,fontWeight:"bold"}}>地址簿</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                    <TextInput 
                                        style={styles.inputs}
                                        value={recipientAdd.address1}
                                        onChangeText={(value)=>setRecipientAdd({...recipientAdd,address1:value})}
                                        placeholder="輸入收件人地址1"
                                    />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>地址2</Text>
                                <TextInput 
                                    style={styles.inputs}
                                    value={recipientAdd.address2}
                                    onChangeText={(value)=>setRecipientAdd({...recipientAdd,address2:value})}
                                    placeholder="輸入收件人地址2"
                                />
                            </View>
                            {ShippingError.length>=1?ShippingError.map((item,index)=>{
                                return(

                                    <Text key={index} style={[styles.errorText,{fontSize:14}]}>{item}</Text>
                                )
                            }):null}
                        </View>
                        
                        <View style={{alignItems:'center'}}>
                            <Button
                                buttonStyle={{
                                    padding:10,
                                    borderWidth: 0,
                                    borderRadius:20, 
                                    backgroundColor:"#d9a21b",
                                    marginTop:60,
                                    marginBottom:30,
                                    width:WIDTH*0.6
                                }}
                                title="下一步"
                                onPress={onSubmit}  
                            />
                        </View>



                    </View>
                </ScrollView>





                
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
    },inputs:{
        backgroundColor:'#f2f2f2',
        borderRadius:4,
        padding:10,
        paddingLeft:36,
        fontSize:16
    },
    inputTitle:{
        fontSize:16,
        fontWeight:"bold",
        marginBottom:14,
        marginTop:14
    },errorText:{
        color:"red",
        fontSize:12,
        paddingLeft:5
    },
    
});

export default PayAddress;