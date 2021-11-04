import React,{useEffect, useState,useRef} from 'react';
import { 
    View,
    Text,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput
} from 'react-native';

import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,
faChevronLeft,faMapPin,faMapMarkerAlt,faAngleDoubleDown, faMapMarkedAlt,faThLarge,
faLevelDownAlt,faSortAmountDown} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem ,CheckBox} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const Service = ({navigation,route}) =>{
   

    const [product_lists,setProductList] = useState([]);

    const [isLoading, setLoading] = useState(true);

    const [highPrice, setHighPrice] = useState();
    
    const [priceList, setPriceList] = useState([]);

 

    const [reload,setReload] =useState(false);
   


   




    useEffect(()=>{

        fetch('https://goldrich.top/api/rest/products', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            }
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success==1){
                //console.log(responseJson.data);
                setProductList(responseJson.data);
              
            }else if(responseJson.success==0){

            }
          
        }).catch((err)=>console.log(err))
        

        fetch('https://goldrich.top/index.php?route=feed/rest_api/products&sort=price&order=desc', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+route.params.authorization,
                    
                }
            })
            .then(response=>response.json())
            .then((responseJson)=>{
                setHighPrice(responseJson.data[0].price);
                var new_array =[];
                for(var i=0;i<5;i++){
                    let num =i* 0.25;
                    
                    if(i>=2){
                        new_array[i]=new Object({start:new_array[i-1].end+1,end:highPrice * num}) ;
                    }else if(i==1){
                        new_array[i]=new Object({start:new_array[i-1].end,end:highPrice * num}) ;
                    }
                    else{
                        new_array[i]=new Object({end:highPrice * num}) ;
                    }
                }
                setPriceList(new_array);
            
            }).catch((err)=>console.log(err))
            .finally(() => setLoading(false));


    },[isLoading])


   useEffect(()=>{
   
    
   },[])
    
    
    const [isOrderByVisible,setOrderByVisible]=useState(false);
  
    const showOrderByModal=()=>{
      
        setOrderByVisible(!isOrderByVisible);
    }
    

    

   

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);

    const [checkSort, setCheckSort] = useState();


    const handleOrderOption = (num) => {
        
        setCheckSort(num);
        
        let priceStart; 
        let priceEnd;
        let filterBody;
       if(checkPrice >= 1 && checkPrice <=4){
           priceStart =priceList[checkPrice].start;
           priceEnd = priceList[checkPrice].end;
           filterBody=[
            {
                field:'price',
                operand:'>=',
                value:priceStart
            },
            {
                field:'price',
                operand:'<=',
                value:priceEnd
            }
        ]
       }else{
            filterBody=[];
       }





        switch(num){
            case 1:
               
                setCheck1(!check1); setCheck2(false);setCheck3(false);setCheck4(false);

                if(check1==false&&(checkFitter1||checkFitter2||checkFitter3||checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:'date_added',
                            order:'asc',
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[checkPrice].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[checkPrice].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(check1==true&&(checkFitter1||checkFitter2||checkFitter3||checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[checkPrice].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[checkPrice].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(check1==false&&(!checkFitter1&&!checkFitter2&&!checkFitter3&&!checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:'date_added',
                            order:'asc',
                           
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else{
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:"date_added",
                            order:'asc',
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }
                
                break;
            case 2:
                setCheck2(!check2);setCheck1(false);setCheck3(false);setCheck4(false);
                if(check2==false&&(checkFitter1||checkFitter2||checkFitter3||checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:'rating',
                            order:'desc',
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[checkPrice].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[checkPrice].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(check2==true&&(checkFitter1||checkFitter2||checkFitter3||checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[checkPrice].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[checkPrice].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(check2==false&&(!checkFitter1&&!checkFitter2&&!checkFitter3&&!checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:'rating',
                            order:'desc',
                           
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else{
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:"date_added",
                            order:'asc',
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }
                break;
            case 3:
                setCheck3(!check3);setCheck1(false);setCheck2(false);setCheck4(false);
                if(check3==false&&(checkFitter1||checkFitter2||checkFitter3||checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:'price',
                            order:'desc',
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[checkPrice].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[checkPrice].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(check3==true&&(checkFitter1||checkFitter2||checkFitter3||checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[checkPrice].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[checkPrice].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(check3==false&&(!checkFitter1&&!checkFitter2&&!checkFitter3&&!checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:'price',
                            order:'desc',
                           
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else{
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:"date_added",
                            order:'asc',
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }
                
                    
                break;
            case 4:
                setCheck4(!check4);setCheck1(false); setCheck2(false);setCheck3(false);
                if(check4==false&&(checkFitter1||checkFitter2||checkFitter3||checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:'price',
                            order:'asc',
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[checkPrice].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[checkPrice].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(check4==true&&(checkFitter1||checkFitter2||checkFitter3||checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[checkPrice].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[checkPrice].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(check4==false&&(!checkFitter1&&!checkFitter2&&!checkFitter3&&!checkFitter4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:'price',
                            order:'asc',
                           
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else{
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:"date_added",
                            order:'asc',
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }
                    
                break;
            
        }

       


        showOrderByModal();
        
    }







    const [isFitterVisible,setFitterVisible]=useState(false);
  
    const showFitterModal=()=>{
      
        setFitterVisible(!isFitterVisible);
    }

    const [checkFitter1, setCheckFitter1] = useState(false);
    const [checkFitter2, setCheckFitter2] = useState(false);
    const [checkFitter3, setCheckFitter3] = useState(false);
    const [checkFitter4, setCheckFitter4] = useState(false);

    const [isColMode,setColMode]=useState(false);
    const [checkPrice, setCheckPrice] =useState();

    const handlePriceFilter = (num) =>{
        //console.log(priceList);
        // console.log(checkSort);
        let sortValue; 
        let sortOrder;

        switch(checkSort){
            case 1:
                sortValue='date_added';sortOrder='desc'
                break;

            case 2:
                sortValue='rating';sortOrder='desc'
                break;

            case 3:
                sortValue='price';sortOrder='desc'
                break;

            case 4:
                sortValue='price';sortOrder='asc'
                break;
            default:
                sortValue='date_added';sortOrder='desc'
                break;
        }


        setCheckPrice(num);

        switch(num){
            case 1:
                setCheckFitter1(!checkFitter1); setCheckFitter2(false);setCheckFitter3(false);setCheckFitter4(false);
              

                if(checkFitter1==false&&(check1||check2||check3||check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:sortValue,
                            order:sortOrder,
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[num].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[num].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(checkFitter1==true&&(check1||check2||check3||check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:sortValue,
                            order:sortOrder,
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(checkFitter1==false&&(!check1&&!check2&&!check3&&!check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[num].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[num].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else{
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:"date_added",
                            order:'asc',
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }
                
                break;
            case 2:
                setCheckFitter1(false); setCheckFitter2(!checkFitter2);setCheckFitter3(false);setCheckFitter4(false);
                if(checkFitter2==false&&(check1||check2||check3||check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:sortValue,
                            order:sortOrder,
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[num].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[num].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(checkFitter2==true&&(check1||check2||check3||check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:sortValue,
                            order:sortOrder,
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(checkFitter2==false&&(!check1&&!check2&&!check3&&!check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[num].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[num].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else{
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:"date_added",
                            order:'asc',
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }
                break;
            case 3:
                setCheckFitter1(false); setCheckFitter2(false);setCheckFitter3(!checkFitter3);setCheckFitter4(false);
                if(checkFitter3==false&&(check1||check2||check3||check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:sortValue,
                            order:sortOrder,
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[num].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[num].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(checkFitter3==true&&(check1||check2||check3||check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:sortValue,
                            order:sortOrder,
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(checkFitter3==false&&(!check1&&!check2&&!check3&&!check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[num].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[num].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else{
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:"date_added",
                            order:'asc',
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }
                
                    
                break;
            case 4:
                setCheckFitter1(false); setCheckFitter2(false);setCheckFitter3(false);setCheckFitter4(!checkFitter4);
                if(checkFitter4==false&&(check1||check2||check3||check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:sortValue,
                            order:sortOrder,
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[num].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[num].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(checkFitter4==true&&(check1||check2||check3||check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:sortValue,
                            order:sortOrder,
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else if(checkFitter4==false&&(!check1&&!check2&&!check3&&!check4)){
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            filters:[
                                {
                                    field:'price',
                                    operand:'>=',
                                    value:priceList[num].start
                                },
                                {
                                    field:'price',
                                    operand:'<=',
                                    value:priceList[num].end
                                }
                            ]
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }else{
                    fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization':'Bearer '+route.params.authorization,
                            
                        },body:JSON.stringify({
                            sort:"date_added",
                            order:'asc',
                        })
                    })
                    .then(response=>response.json())
                    .then((responseJson)=>{
                        //console.log(responseJson);
                        if(responseJson.success==1){
                            setProductList(responseJson.data);
                        }else if(responseJson.success==0){
                            
                        }
                    }).catch((err)=>console.log(err))
                    .finally(() => setReload(!reload));
                }
                    
                break;
            
        }

        
        
        
      
    }






    const addProduct =(productId)=>{
       
        //console.log(productId)
        fetch('https://goldrich.top/api/rest/cart', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                'product_id':productId,
                'quantity':1
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success ==1){
              
            }else{
                
            }
            
          
        }).catch((err)=>console.log(err));
    }
    


    

    return(
            <View >
                <Modal isVisible={isOrderByVisible}>
                    <View style={{ flex: 1,alignItems:'center' ,justifyContent:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <View style={{backgroundColor:'white',padding:30,borderRadius:10,width:WIDTH*0.8}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,borderBottomColor:'cccccc',borderBottomWidth:1}}>
                                    <Text style={{fontSize:20,fontWeight:'700',paddingLeft:10}}>請選擇排序方式</Text>
                                    <FontAwesomeIcon icon={faTimes} size={30} onPress={showOrderByModal}/>
                                </View>
                                <View style={{paddingVertical:10,paddingHorizontal:WIDTH*0.15,alignItems:'flex-start'}}>
                                   
                                        <CheckBox
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,alignSelf:'flex-start'}}
                                            title='預設'
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={check1}
                                            onPress={()=>{handleOrderOption(1);}}
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                            
                                            
                                        />
                                        <CheckBox
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,alignSelf:'flex-start'}}
                                            title='評價高 > 低'
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={check2}
                                            onPress={()=>handleOrderOption(2)}
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                        />
                                        <CheckBox
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,alignSelf:'flex-start'}}
                                            title='價格高 > 低'
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={check3}
                                            onPress={()=>{handleOrderOption(3);}}
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                            
                                        />
                                        <CheckBox
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,alignSelf:'flex-start'}}
                                            title='價格低 > 高'
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={check4}
                                            onPress={()=>{handleOrderOption(4);}}
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                        />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal isVisible={isFitterVisible}>
                    <View style={{ flex: 1,alignItems:'center' ,justifyContent:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <View style={{backgroundColor:'white',padding:30,borderRadius:10,width:WIDTH*0.8}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingBottom:10,borderBottomColor:'cccccc',borderBottomWidth:1}}>
                                    <Text style={{fontSize:20,fontWeight:'700',paddingLeft:10}}>請選擇排序方式</Text>
                                    <FontAwesomeIcon icon={faTimes} size={30} onPress={showFitterModal}/>
                                </View>
                                <View style={{paddingVertical:10,paddingHorizontal:WIDTH*0.15,alignItems:'flex-start'}}>
                                        <Text style={{fontWeight:'700'}}>價格範圍</Text>
                                        <CheckBox
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,alignSelf:'flex-start'}}
                                            title={isLoading ?<ActivityIndicator/> :'$'+priceList[1].start + ' - $'+priceList[1].end}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={checkFitter1}
                                            onPress={()=>{handlePriceFilter(1)}}
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                            
                                        />
                                        <CheckBox
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,alignSelf:'flex-start'}}
                                            title={isLoading ?<ActivityIndicator/> :'$'+priceList[2].start + ' - $'+priceList[2].end}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={checkFitter2}
                                            onPress={()=>{handlePriceFilter(2)}}
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                        />
                                        <CheckBox
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,alignSelf:'flex-start'}}
                                            title={isLoading ?<ActivityIndicator/> :'$'+priceList[3].start + ' - $'+priceList[3].end}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={checkFitter3}
                                            onPress={()=>{handlePriceFilter(3)}}
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                        />
                                        <CheckBox
                                            containerStyle={{backgroundColor:'transparent',borderWidth:0,alignSelf:'flex-start'}}
                                            title={isLoading ?<ActivityIndicator/> :'$'+priceList[4].start + ' - $'+priceList[4].end}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={checkFitter4}
                                            onPress={()=>{handlePriceFilter(4)}}
                                            checkedColor='#d9a21b'
                                            uncheckedColor='#d9a21b'
                                        />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView style={{paddingBottom:125}}>
            <View style={{
                backgroundColor:"#cc6a3e",
                borderBottomLeftRadius:10,
                borderBottomRightRadius:10,
                paddingTop:40,
                height:100,
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

                        <Text style={styles.textTitle}>寄件服務</Text>
                    </View>
                    

                    <TouchableOpacity
                        style={{
                            alignItems:'flex-end',
                            marginRight:SIZES.padding,
                        }}
                        onPress={()=>console.log("heart")}
                    >
                        <FontAwesomeIcon 
                            icon={faHeart} color='white' size={25}/>
                    </TouchableOpacity>
                    
                </View> 
            </View>
                <View style={{paddingHorizontal:25,paddingBottom:25}}>
             
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:WIDTH*0.03,paddingVertical:WIDTH*0.05}}>
                        <TouchableOpacity onPress={()=>setColMode(!isColMode)}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <FontAwesomeIcon icon={isColMode==false?faThLarge:faBars} color={isColMode==false?'#cc6a3e':'#d9a21b'} size={20}/>
                                <Text style={{marginLeft:10,fontSize:16}}>顯示方式</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showOrderByModal}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <FontAwesomeIcon icon={faLevelDownAlt} color='#cc6a3e' size={20}/>
                                <Text style={{marginLeft:10,fontSize:16}}>排序</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showFitterModal}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <FontAwesomeIcon icon={faSortAmountDown} color='#cc6a3e' size={20}/>
                                <Text style={{marginLeft:10,fontSize:16}}>篩選</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                        
                        <View style={{flexDirection:isColMode==false?'row':'column',flexWrap:'wrap',justifyContent:'space-between'}}>
                        
                        {isLoading ?<ActivityIndicator/> : product_lists.map((item,index)=>{
                            if(isColMode==false){
                                return (
                                    <TouchableOpacity key={item.key?item.key:item+index} onPress={()=>navigation.navigate('ServiceProduct',{id:item.id,authorization:route.params.authorization})}>
                                        <View style={{borderRadius:8,padding:10,margin:5,width:WIDTH*0.41,height:HEIGHT*0.3,backgroundColor:'#fff'}}>
                                        
                                            <Image source={{uri:item.image}} style={{height:'70%',width:'100%'}} resizeMode='cover'/>

                                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:5}}>
                                                <Text>{item.name}</Text>
                                                <TouchableOpacity
                                                    onPress={()=>console.log("heart")}
                                                >
                                                    <FontAwesomeIcon 
                                                        icon={faHeart} color='#cc6a3e' size={20}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:5}}>
                                                <Text style={{color:'#cc6a3e',marginRight:5}}>${item.price.toFixed(1)}</Text>
                                                <Button 
                                                    disabled={item.quantity<=0?true:false}
                                                    buttonStyle={{backgroundColor:'#623f31',color:"#000",height:20,padding:12,borderRadius:5}}
                                                    title="加入購物車"
                                                    titleStyle={{fontSize:12}}
                                                    onPress={()=>addProduct(item.product_id)}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }else{
                                return(
                                    <TouchableOpacity key={item.key?item.key:item+index} onPress={()=>navigation.navigate('ServiceProduct',{id:item.id,authorization:route.params.authorization})}>
                                        <View style={{borderRadius:8,padding:10,marginVertical:5,width:'100%',width:WIDTH*0.9,height:HEIGHT*0.15,backgroundColor:'#fff',flexDirection:'row'}}>
                                            <View style={{flex:1}}>
                                                <Image source={{uri:item.image}} style={{height:'100%',width:'100%'}} resizeMode='cover'/>
                                            </View>

                                            <View style={{flex:1,marginLeft:10,flexDirection:'column',justifyContent:'space-between'}}>
                                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:5}}>
                                                    <Text style={{fontSize:16}}>{item.name}</Text>
                                                    <TouchableOpacity
                                                        onPress={()=>console.log("heart")}
                                                    >
                                                        <FontAwesomeIcon 
                                                            icon={faHeart} color='#cc6a3e' size={20}/>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:5}}>
                                                    <Text style={{color:'#cc6a3e',fontSize:18,fontWeight:'700',marginRight:5}}>${item.price.toFixed(1)}</Text>
                                                    <Button 
                                                        buttonStyle={{backgroundColor:'#623f31',color:"#000",height:20,padding:12,borderRadius:5}}
                                                        disabled={item.quantity<=0?true:false}
                                                        title="加入購物車"
                                                        titleStyle={{fontSize:12}}
                                                        onPress={()=>addProduct(item.product_id)}
                                                    />
                                                </View>

                                            </View>
                                        </View>                               
                                    </TouchableOpacity>
                                )
                            }
                           
                        })}
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
    }
    
});

export default Service;