import React,{useEffect, useState} from 'react';
import { 
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';

import {
faChevronLeft,faShareAlt,faCaretRight} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  

import { Button,Rating} from 'react-native-elements';




const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const ServiceProduct = ({navigation,route}) =>{
    const newId = route.params.id;
    const [isLoading, setLoading] = useState(true);

    const [productInfo,setProductInfo]=useState({});

    const [suggestList, setSuggestList] = useState([]);

    const [product_id, setProductId] = useState(newId);

    const [productCount, setProductCount]=useState(1);

    const [orderDate, setOrderDate] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [orderTime, setOrderTime] = useState()
    const [open, setOpen] = useState(false);

    const handleAddition = (productQ)=>{
        let count = productCount;
        if(productQ>count){
            count +=1;
        }
        setProductCount(count);
     
    }
    const handleReduction =()=>{
        let count = productCount;
        if(count>1){
            count -=1;
        }
        
        setProductCount(count);
    }

    const addProduct =()=>{

        fetch('https://goldrich.top/api/rest/cart', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                'product_id':productInfo.product_id,
                'quantity':productCount
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            if(responseJson.success ==1){
              
            }else{
                
            }
            
          
        }).catch((err)=>console.log(err));
    }

    useEffect(()=>{
        fetch('https://goldrich.top/api/rest/products/'+product_id, {
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
                
                setProductInfo(responseJson.data);
            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))
        .finally(()=>setLoading(false));

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
            //console.log(responseJson);
            if(responseJson.success==1){
               
                let new_array = responseJson.data;
                let filter = new_array.filter((item,index,array)=>{
                    return item.id != product_id;
                })
                setSuggestList(filter);

            }else if(responseJson.success==0){

            }
        }).catch((err)=>console.log(err))




    },[isLoading,product_id])

    const addProductOne =(productId)=>{
       
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

                {/* {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    minimumDate={new Date()}
                    onChange={(event,date)=>{
                        setShow(!show);
                        if(date==null){
                            
                        }else{
                            let time = date.toISOString();
                            let year = time.substring(0,4);
                            let month = time.substring(5,7);
                            let day = time.substring(8,10);
                            
                            let result = day+" / "+month+" / "+year;
                            setOrderDate(result);
                        
                        }
                       
                        
                        
                       

                    }}
                    
                    />
                )}

                {open && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode='time'
                    is24Hour={true}
                    display="spinner"
                    
                    onChange={(event,time)=>{
                        setOpen(!open);
                       
                       
                        if(time==null){
                            
                        }else{
                            let new_time =time.toTimeString();
                            let hour = new_time.substring(0,2);
                            let mintes = new_time.substring(3,5);
                            let result = hour+":"+mintes;
                            setOrderTime(result);
                            
                        }
                        
                       
                    }}
                    />
                )} */}
               



               {isLoading?<ActivityIndicator/>:

                <ScrollView>
                <View style={{
                    backgroundColor:"#cc6a3e",
                    borderBottomLeftRadius:10,
                    borderBottomRightRadius:10,
                    paddingTop:40,
                    height:100,
                    zIndex:5
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
                
                
                

           
                <View style={{width:WIDTH,height:300,marginTop:-10}}>
                    <Image source={{uri:productInfo.image}} style={{height:'100%',width:'100%'}} resizeMode='cover'/>
                </View>

               

                <View style={{paddingHorizontal:25}}>
                    <View style={{}}>
                        <View style={{flexDirection:'column',backgroundColor:'#fff',padding:15,borderRadius:10,marginTop:20,marginBottom:15}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                    <Text style={{fontWeight:'700',color:'#000',fontSize:20}}>{productInfo.name}</Text>
                                    <Text style={{color:'#fff',backgroundColor:'#d9a21b',borderRadius:8,paddingHorizontal:10,paddingVertical:2}}>熱門</Text>
                                </View>
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <FontAwesomeIcon icon={faShareAlt} size={20}/>
                                </View>
                            </View>
                            <View style={{borderBottomWidth:1,borderBottomColor:'#d3d3d3',paddingBottom:10}}>
                                <Text style={{fontSize:20,fontWeight:'700'}}>{productInfo.price.toFixed(1)}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
                                {/* <Text style={{fontWeight:'700'}}>預約收件時間</Text> */}
                                <Text style={{color:'#56585e'}}>{productInfo.quantity>=1?'有存貨 ('+productInfo.quantity+')':'沒有存貨'}</Text>
                            </View>
                            {/* <View style={{flexDirection:'row'}} >
                                <View style={{flex:1,
                                    backgroundColor:orderDate==null?'transparent':'#cc6a3e',
                                    borderWidth:1,borderColor:orderDate==null?'#623f31':'#cc6a3e',
                                    color:'#623f31',borderRadius:3,justifyContent:'center'}}
                                >
                                    <Button 
                                        buttonStyle={{width:'100%',backgroundColor:'transparent',borderColor:'transparent'}} 
                                        type='outline' 
                                        titleStyle={{color:orderDate==null?'#623f31':'#fff'}} 
                                        title={orderDate==null?"-- / -- / --":orderDate} 
                                        onPress={()=>setShow(!show)}
                                    />
                                </View>
                                <View style={{flex:1,
                                    backgroundColor:orderTime==null?'transparent':'#cc6a3e',
                                    borderWidth:1,borderColor:orderTime==null?'#623f31':'#cc6a3e',
                                    color:'#623f31',borderRadius:3,justifyContent:'center'}}
                                >
                                    
                                        <Button 
                                            buttonStyle={{width:'100%',borderColor:'transparent'}} 
                                            type='outline' 
                                            titleStyle={{color:orderTime==null?'#623f31':'#fff'}} 
                                            title={orderTime==null?"-- / --":orderTime} 
                                            onPress={()=>setOpen(!open)}
                                        />
                                    
                                
                                </View>
                            </View> */}
                            <View style={{flexDirection:'row',alignItems:'center',paddingTop:0,paddingBottom:10,justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                                    <Button 
                                        title="-" 
                                        titleStyle={{alignItems:'center',fontSize:12}} 
                                        buttonStyle={{borderTopLeftRadius:5,borderBottomLeftRadius:5,width:30,paddingHorizontal:12,height:'auto'}}
                                        onPress={handleReduction}
                                    />
                                    <Text style={{marginHorizontal:10,}}>{productCount}</Text>
                                    <Button  
                                        title="+" 
                                        titleStyle={{alignItems:'center',fontSize:12}} 
                                        buttonStyle={{borderTopRightRadius:5,borderBottomRightRadius:5,width:30,paddingHorizontal:12,height:'auto'}}
                                        onPress={()=>handleAddition(productInfo.quantity)}
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <Button 
                                        disabled={productInfo.quantity>=1?false:true}
                                        
                                        buttonStyle={{backgroundColor:'#623f31',color:"#000",height:'auto',paddingHorizontal:15,borderRadius:5}}
                                        title="加入購物車"
                                        titleStyle={{fontSize:12}}
                                        onPress={addProduct}
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <TouchableOpacity
                                        style={{
                                            alignItems:'flex-end',
                                            
                                        }}
                                        onPress={()=>console.log("heart")}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faHeart} color='#cc6a3e' size={25}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{flexDirection:'column',backgroundColor:'#fff',padding:15,borderRadius:10,marginVertical:10}}>
                            <Text>服務說明</Text>
                            <Text>{productInfo.description}</Text>
                            
                        </View>

                        <View style={{flexDirection:'column',backgroundColor:'#fff',padding:15,borderRadius:10,marginVertical:15}}>
                            <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ccc',paddingBottom:15,paddingLeft:10}}>
                                <Rating style={{alignItems:'flex-start'}} type='star' showRating={false} imageSize={20} fractions={1} startingValue={productInfo.rating} readonly={true}/>
                                <Text style={{color:'#623f31',fontSize:18,fontWeight:'700',marginLeft:10}}>{productInfo.rating}</Text>
                            </View>
                                
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
                                <View style={{paddingLeft:10}}>
                                    <Button 
                                        buttonStyle={{backgroundColor:'#623f31',color:"#000",height:'auto',paddingHorizontal:15,borderRadius:5}}
                                        title="寫下評論"
                                        titleStyle={{fontSize:12}}
                                        onPress={()=>navigation.navigate('ServiceComment',{id:productInfo.product_id,authorization:route.params.authorization})}
                                    />
                                </View>
                                <View>
                                    <TouchableOpacity  onPress={()=>navigation.navigate('ServiceCommentList',{id:productInfo.product_id,info:productInfo,authorization:route.params.authorization})}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text>(</Text>
                                            <Text style={{marginLeft:5}}>{productInfo.reviews.review_total}則評論</Text>
                                            <FontAwesomeIcon icon={faCaretRight} size={20} />
                                            <Text>)</Text>
                                        </View>
                                    </TouchableOpacity>
                
                                </View>
                            </View>
                
                        </View>
                
                    </View>
                </View>

                        <View style={{paddingBottom:25,paddingLeft:25}}>
                            <Text style={{fontWeight:'700',paddingBottom:8}}>您可能感興趣</Text>
                            <ScrollView horizontal>
                                {suggestList.map((item,index)=>{
                                    return (
                                    <TouchableOpacity key={item+index} onPress={()=>{setProductId(item.id)}}>
                                        <View style={{borderRadius:8,padding:10,margin:5,marginLeft:0,width:WIDTH*0.4,height:HEIGHT*0.3,backgroundColor:'#fff'}}>
                                        
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
                                                <Text style={{color:'#cc6a3e'}}>${item.price.toFixed(1)}</Text>
                                                <Button 
                                                    buttonStyle={{backgroundColor:'#623f31',color:"#000",height:'auto',paddingHorizontal:12,borderRadius:5}}
                                                    disabled={item.quantity=='0'?true:false}
                                                    title="加入購物車"
                                                    titleStyle={{fontSize:12}}
                                                    onPress={()=>addProductOne(item.product_id)}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )
                                })}
                </ScrollView>
                </View>

                
               


                </ScrollView>}
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

export default ServiceProduct;