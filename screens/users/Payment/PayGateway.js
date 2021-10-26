import React,{useEffect, useState,Component} from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Modal
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

    const [showModal, setShowModal] = useState(false);
    const [htmlCode, setHtmlCode] = useState('');

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
        setShowModal(!showModal);
       

        // fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization':'Bearer A21AAJKtY-So9Vvk4tBQc9Ix5T9C1DWdiEhedMX-CrCgADbOHECNIesWEDFUMfHZFZJQ7CbRZNGAdWq5_Hpl7PeBg_nOwuhQg',
                
        //     },body:JSON.stringify({
        //         "intent": "CAPTURE",
        //         "purchase_units": [
        //             {
        //             "amount": {
        //                 "currency_code": "USD",
        //                 "value": "100.00"
        //             }
        //             }
        //         ]
        //     })
        // })
        // .then(response=>response.json())
        // .then((responseJson)=>{
        //     console.log(responseJson);
           
        //     setPaypalOrderId(responseJson.id);
        //     fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${responseJson.id}/capture`, {
        //             method: 'POST',
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'Authorization':'Bearer A21AAJKtY-So9Vvk4tBQc9Ix5T9C1DWdiEhedMX-CrCgADbOHECNIesWEDFUMfHZFZJQ7CbRZNGAdWq5_Hpl7PeBg_nOwuhQg',
                        
        //             }
        //         })
        //         .then(response=>response.json())
        //         .then((responseJson)=>{
        //             console.log(responseJson);
        //             if(responseJson.success == 0){
                            
        //             }else if(responseJson.success ==1){
                       
        //             }
        //         }).catch((err)=>console.log(err));
            
        // }).catch((err)=>console.log(err));

        
     



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
              setHtmlCode(responseJson.data.payment);
               
            }
        }).catch((err)=>console.log(err));

        fetch('https://goldrich.top/api/rest/pay', {
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
        
                    if(responseJson.success == 0){
                    
                    }else if(responseJson.success ==1){
                  
        
                    }
                }).catch((err)=>console.log(err));

    }
    const handleWebViewNavigationStateChange = (newNavState) => {
        const { url } = newNavState;
        if (!url) return;

        if (url.includes('https://goldrich.top/index.php?route=checkout/success')) {
           
            setShowModal(false);
            console.log("finsih");
          }
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
           // console.log(responseJson);

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
                            onPress={()=>onSubmit()}  
                        />
                         
                    </View>
                   
                </View>
              
                <Modal 
                    style={{flex:1,width:WIDTH,height:HEIGHT}}
                    visible={showModal}
                >
                    <Button
                        buttonStyle={{
                            padding:10,
                            borderWidth: 0,
                            borderRadius:20, 
                            backgroundColor:"#d9a21b",
                            
                            width:WIDTH*0.6
                        }}
                        title="付款"
                        onPress={()=>setShowModal(!showModal)}  
                    />
                    <WebView 
                        originWhitelist={['*']}
                        onNavigationStateChange={handleWebViewNavigationStateChange}
                        source={{html:
                            `<html>
                                <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                </head>
                                <style>
                                    .btn{
                                        background-color:red;
                                        display:none;
                                    }
                                    .alert-danger{
                                        display:none;
                                    }
                                </style>
                                <script>
                                window.onload=function(){   
                                    const sendBtn = document.getElementsByClassName("btn-primary");
                                    sendBtn[0].click();;
                                }
                               
                                </script>
                            <body>`
                                +htmlCode+
                            `</body>
                            </html>`
                        
                        }}
                    />
                </Modal>
               




                
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