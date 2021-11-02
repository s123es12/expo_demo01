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
import { useIsFocused } from '@react-navigation/native';

const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const PayAddress = ({navigation,route}) =>{
 
    const [defaultAdd, setDefaultAdd] = useState({
        lastname:'',
        firstname:'',
        city:'',
        country_id:"",
        zone_id:'',
        address_1:'',
        address_2:'',
        postcode:'',
        company:''
    });
    const [existAdd, setExistAdd]=useState({})
    const [selectedCountryId, setSelectedCountryId] = useState();
    const [selectedZoneId, setSelectedZoneId] = useState();
    const [countryList,setCountryList] = useState([]);
    const [zoneList, setZoneList] =useState([]);
    const [selectedCountry, setSelectedCountry] =useState();
    const [PaymentError, setPaymentError] = useState([]);
    
    const [isLoadDefault,setLoadDefault] = useState(true);


    const [recipientAdd, setRecipientAdd] = useState({
        lastname:'',
        firstname:'',
        city:'',
        country_id:"",
        zone_id:'',
        address_1:'',
        address_2:'',
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

    const [selectPayment,setSelectPayment]=useState(false);
    const [selectReadd,setSelectReadd]=useState(false);

   

    const changeAdd = (add)=>{
        setSelectPayment(true);
        setDefaultAdd(add);
        
        setSelectedCountryId(add.country);
        setSelectedCountry(add.country_id);
        setSelectedZoneId(add.zone);

    }
    const changeAdd2 = (add)=>{
        setSelectReadd(true);
        setRecipientAdd(add);
        setSelectedCountryId2(add.country);
        setSelectedCountry2(add.country_id);
        setSelectedZoneId2(add.zone);

    }


    const onSubmit = data =>{
        //navigation.navigate('PayDelivery',{authorization:route.params.authorization});
        //console.log('defaultAdd: ',defaultAdd);
        //console.log('recipientAdd: ',recipientAdd);

        setTimeout(()=>{navigation.navigate('PayDelivery',{authorization:route.params.authorization})},1000);
    }
    

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
                    return item.default ==true?item:{ 
                        lastname:'',
                        firstname:'',
                        city:'',
                        country_id:"",
                        zone_id:'',
                        address1:'',
                        address2:'',
                        postcode:'',
                        company:''
                    };
                })
                if(defaultAddress==null){
                    defaultAddress={ 
                        lastname:'',
                        firstname:'',
                        city:'',
                        country_id:"",
                        zone_id:'',
                        address1:'',
                        address2:'',
                        postcode:'',
                        company:''
                    }

                }
               //console.log(defaultAddress);
                //setDefaultAdd(defaultAddress[0]);
                setExistAdd(defaultAddress[0]);
                //console.log(defaultAdd);
                setSelectedCountryId(defaultAddress[0].country);
                setSelectedCountry(defaultAddress[0].country_id);
                setSelectedZoneId(defaultAddress[0].zone);
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        .finally(()=>setLoadDefault(false))
        

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
               //setDefaultAdd(responseJson.data.addresses[0]);
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
        // if(defaultAdd.lastname){}else{
        //     navigation.goBack();
        //     console.log('if(defaultAdd.lastname)');
        // }
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
                        {isLoadDefault?<ActivityIndicator/>:
                        <View style={{backgroundColor:'white',padding:20}}>
                            <Text style={{borderBottomWidth:1}}>聯絡資料（寄件人）</Text>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputTitle}>姓</Text>                  
                                    <TextInput 
                                        editable={false}
                                        style={styles.inputs}
                                        value={defaultAdd.lastname}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,lastname:value})}
                                        placeholder="輸入姓"
                                    />
                                
                                </View>
                                
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputTitle}>名</Text>
                                    <TextInput 
                                        editable={false}
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
                                        editable={false}
                                        value={defaultAdd.city}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,city:value})}
                                        placeholder="輸入寄件人所在城市"
                                    />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>郵遞區號</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        editable={false}
                                        value={defaultAdd.postcode}
                                        onChangeText={(value)=>setDefaultAdd({...defaultAdd,postcode:value})}
                                        placeholder="輸入寄件人郵遞區號"
                                    />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>公司名</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        editable={false}
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
                                    enabled={false}
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
                                        enabled={false}
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
                                        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>navigation.navigate('PaymentAddressList',{authorization:route.params.authorization,addressType:'PAYMENT',changeAdd:changeAdd})}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} size={20} color="#623f31" />
                                            <Text style={{color:"#623f31",marginLeft:5,fontSize:16,fontWeight:"bold"}}>地址簿</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <TextInput 
                                    style={styles.inputs}
                                    editable={false}
                                    value={defaultAdd.address_1}
                                    onChangeText={(value)=>setDefaultAdd({...defaultAdd,address_1:value})}
                                    placeholder="輸入寄件人地址1"
                                />
                            
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>地址2</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        editable={false}
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
                         }           
                        <Text style={{fontWeight:'700',marginTop:20,marginBottom:20}}>如選擇到店取件, 收件人地址請填寫金富諾有限公司</Text>

                        <View style={{backgroundColor:'white',padding:20}}>
                            <Text style={{borderBottomWidth:1}}>聯絡資料（收件人）</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputTitle}>姓</Text>                  
                                    <TextInput 
                                        style={styles.inputs}
                                        editable={false}
                                        value={recipientAdd.lastname}
                                        onChangeText={(value)=>setRecipientAdd({...recipientAdd,lastname:value})}
                                        placeholder="收件人姓"
                                    />
                                
                                </View>
                            
                                <View style={{width:WIDTH*0.35}}>
                                    <Text style={styles.inputTitle}>名</Text>
                                    <TextInput 
                                        style={styles.inputs}
                                        editable={false}
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
                                    editable={false}
                                    value={recipientAdd.city}
                                    onChangeText={(value)=>setRecipientAdd({...recipientAdd,city:value})}
                                    placeholder="輸入收件人所在城市"
                                />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>郵遞區號</Text>
                                <TextInput 
                                    style={styles.inputs}
                                    editable={false}
                                    value={recipientAdd.postcode}
                                    onChangeText={(value)=>setRecipientAdd({...recipientAdd,postcode:value})}
                                    placeholder="輸入收件人郵遞區號"
                                />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>公司名</Text>
                                <TextInput 
                                    style={styles.inputs}
                                    editable={false}
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
                                    enabled={false}
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
                                        enabled={false}
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
                                        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>navigation.navigate('PaymentAddressList',{authorization:route.params.authorization,addressType:'SHIPPING',changeAdd2:changeAdd2})}>
                                            <FontAwesomeIcon icon={faMapMarkedAlt} size={20} color="#623f31" />
                                            <Text style={{color:"#623f31",marginLeft:5,fontSize:16,fontWeight:"bold"}}>地址簿</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                    <TextInput 
                                        style={styles.inputs}
                                        editable={false}
                                        value={recipientAdd.address_1}
                                        onChangeText={(value)=>setRecipientAdd({...recipientAdd,address_1:value})}
                                        placeholder="輸入收件人地址1"
                                    />
                            </View>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle}>地址2</Text>
                                <TextInput 
                                    style={styles.inputs}
                                    editable={false}
                                    value={recipientAdd.address_2}
                                    onChangeText={(value)=>setRecipientAdd({...recipientAdd,address_2:value})}
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
                                disabled={selectPayment&&selectReadd?false:true}
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