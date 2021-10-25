import React,{useEffect, useState} from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button,CheckBox} from 'react-native-elements';




const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const PayGateway= ({navigation,route}) =>{
 
    const commentText = route.params.comment;
   
    const [paymentMethods, setPaymentMethods]=useState([]);
    const [isloadMethod, setLoadMethod]=useState(true);
    const [paymentList, setPaymentList] = useState([]);
    const [paymentSelect, setPaymentSelect]=useState();
    const [paymentId,setPaymentId]=useState();

    const handlePayment = (payment,index)=>{
        //console.log(payment, index);
        let new_list=[...paymentList];
        setPaymentSelect(JSON.stringify(payment).toLowerCase());
        
        for(var i=0;i<paymentList.length;i++){
            new_list[i]=false;
        }
        new_list[index]=!new_list[index];
        setPaymentList(new_list);
        setPaymentId(index);

        fetch('https://goldrich.top/api/rest/paymentmethods', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
           // console.log(responseJson);

            if(responseJson.success ==1){
               
                
                fetch('https://goldrich.top/api/rest/paymentmethods', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer '+route.params.authorization,
                        
                    },body:JSON.stringify({
                        "payment_method": paymentMethods[paymentId].code,
                        "agree": 1,
                        "comment": commentText
                    })
                })
                .then(response=>response.json())
                .then((responseJson)=>{
                    //console.log(responseJson);
                    if(responseJson.success == 0){
                            
                    }else if(responseJson.success ==1){
                       
                    }
                }).catch((err)=>console.log(err));




            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))



    }



    const onSubmit = () =>{
        //console.log(paymentSelect);
        //console.log(paymentMethods[paymentId]);
        switch(paymentSelect){
            case 'paypal':{
                console.log('paypal');
                break;
            }
            
            default:{
                console.log(paymentSelect);
            }
        }
        
        


        fetch('https://goldrich.top/api/rest/confirm', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.success == 0){
               
            }else if(responseJson.success ==1){
                if(responseJson.data.payment_code=='cod'){

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
                        console.log(responseJson);
                        if(responseJson.success == 0){
                                
                        }else if(responseJson.success ==1){
                            
                        }
                    }).catch((err)=>console.log(err));
                }else{

                }

            }
        }).catch((err)=>console.log(err));



    }
    

    useEffect(()=>{
        fetch('https://goldrich.top/api/rest/paymentmethods', {
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

            if(responseJson.success ==1){
                setPaymentMethods(responseJson.data.payment_methods);
                responseJson.data.payment_methods.map((item,index)=>{
                    let list = [];
                    list[index]=false;
                    setPaymentList(list);
                })
                
                // fetch('https://goldrich.top/api/rest/paymentmethods', {
                //     method: 'POST',
                //     headers: {
                //         Accept: 'application/json',
                //         'Content-Type': 'application/json',
                //         'Authorization':'Bearer '+route.params.authorization,
                        
                //     },body:JSON.stringify({
                //         "payment_method": "pp_standard",
                //         "agree": 1,
                //         "comment": commentText
                //     })
                // })
                // .then(response=>response.json())
                // .then((responseJson)=>{
                //     console.log(responseJson);
                //     if(responseJson.success == 0){
                            
                //     }else if(responseJson.success ==1){
                       
                //     }
                // }).catch((err)=>console.log(err));




            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        .finally(()=>setLoadMethod(false))
       
        
    },[])


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
                
                <View style={{padding:25,marginBottom:120}}>
                    <View style={{backgroundColor:'white',paddingHorizontal:20,borderRadius:10}}>
                        <Text style={{fontWeight:'700',borderBottomWidth:1,borderBottomColor:'#d2d2d2',paddingVertical:10}}>付款方式</Text>
                        <View style={{flexDirection:'row',paddingVertical:10,flexWrap:'wrap'}}>
                            {isloadMethod?<ActivityIndicator/>:
                                paymentMethods.map((item,index)=>{
                                    return(
                                        <CheckBox
                                            key={item+index}
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,marginLeft:10,marginVertical:5,padding:0}}
                                            textStyle={{margin:0}}
                                            title={item.title}
                                            checkedIcon='dot-circle-o'
                                            checked={paymentList[index]}
                                            onPress={()=>handlePayment(item.title,index)}
                                            uncheckedIcon='circle-o'
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                        />
                                    )
                                })
                            }
                           
                        </View>
                    </View>
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
                            title="付款"
                            onPress={onSubmit}  
                        />
                    </View>
                </View>
                <WebView
                    source={{ uri: "https://google.com" }}
                    containerStyle={{
                        width: '100%',
                        height: 500,
                        backgroundColor: "white",
                        flex: 1,
                    }}
                />




                
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

export default PayGateway;