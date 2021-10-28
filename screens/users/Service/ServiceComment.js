import React,{useEffect, useState,useRef} from 'react';
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
faChevronLeft,faMapPin,faMapMarkerAlt,faAngleDoubleDown, faMapMarkedAlt,faThLarge,
faLevelDownAlt,faSortAmountDown,faShareAlt,faCaretRight,faPenNib} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem ,CheckBox,Rating,AirbnbRating} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useForm, Controller} from "react-hook-form";



const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const ServiceComment = ({navigation,route}) =>{
 
    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(
        {
            defaultValues: {
                name: '',
                commentContext:''
              },
        }
    );

    
    const [suggestList, setSuggestList] = useState([]);

    const [showSuccess,setSuccess] = useState(false);
    
    const [commentRating, setCommentRat] = useState(0);

    const [productId, setProductId]= useState(route.params.id);

    const [errorComment, setErrorComment] =useState(null);

    const onSubmit = value =>{
        //console.log(value);
        fetch('https://goldrich.top/api/rest/products/'+productId+'/review', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+route.params.authorization,
                
            },body:JSON.stringify({
                'name':value.name,
                'text':value.commentContext,
                'rating':commentRating
            })
        })
        .then(response=>response.json())
        .then((responseJson)=>{
            //console.log(responseJson);
            if(responseJson.success ==1){
                console.log(responseJson);
                setSuccess(true);
            }else{
                console.log(responseJson);
                setErrorComment(responseJson.error[0]);
            }
        }).catch((err)=>console.log(err));



    }

    useEffect(()=>{
        // fetch('https://goldrich.top/api/rest/products', {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization':'Bearer '+route.params.authorization,
                
        //     }
        // })
        // .then(response=>response.json())
        // .then((responseJson)=>{
        //     if(responseJson.success==1){
               
        //         let new_array = responseJson.data;
                
        //         setSuggestList(new_array);
        //         console.log(responseJson.data);
        //     }else if(responseJson.success==0){

        //     }
        // }).catch((err)=>console.log(err))
    },[])


    return(

            <View >

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

                <View style={{padding:25}}>
                    <View style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:20,borderRadius:5}}>
                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                            <FontAwesomeIcon icon={faPenNib} size={22} color="#623f31" />
                            <Text style={{fontSize:17,marginLeft:10,color:"#623f31",fontWeight:'700'}}>撰寫評論</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',margin:30}}>
                            <View style={{alignItems:'center',flexDirection:'row'}}>

                                <Rating type='custom' showRating={false} imageSize={30}  defaultRating={commentRating} 
                                    ratingBackgroundColor='#b5b5b5' ratingColor='#fdd952' startingValue={0}
                                    onFinishRating={(rating)=>{setCommentRat(rating)}}
                                />
                                <Text style={{marginLeft:10}}>滿分</Text>
                            </View>
                        </View>
                        <View style={{paddingHorizontal:20}}>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle} >姓名</Text>
                                <Controller 
                                    control={control} 
                                    render={({field:{onChange,onBlur,value}})=>(
                                        <TextInput 
                                            style={styles.inputs}
                                            onBlur={onBlur}
                                            onChangeText={value=>onChange(value)}
                                            value={value}qwe
                                            placeholder="輸入你的名字"
                                        />
                                    )}
                                    name="name" 
                                    rules={{required:true}}
                                />
                                {errors.name && <Text style={styles.errorText}>This is required.</Text>}
                            </View>
                        </View>

                        <View style={{paddingHorizontal:20}}>
                            <View style={{marginBottom:5}}>
                                <Text style={styles.inputTitle} >評論主題</Text>
                                
                                <Controller 
                                    control={control} 
                                    render={({field:{onChange,onBlur,value}})=>(
                                        <TextInput 
                                            style={[styles.inputs,{}]}
                                            onBlur={onBlur}
                                            onChangeText={value=>onChange(value)}
                                            value={value}
                                            placeholder="寫下您的評價吧！"
                                            multiline
                                            numberOfLines={4}
                                        />
                                    )}
                                    name="commentContext" 
                                    rules={{required:true}}
                                />
                                {errorComment!=null?<Text style={styles.errorText}>{errorComment}</Text>:null}
                                {errors.commentContext && <Text style={styles.errorText}>This is required.</Text>}
                            </View>
                        </View>
                        <View>
                            <View style={{marginBottom:5,marginTop:10}}>
                            <Button  
                                buttonStyle={{  
                                    alignSelf:'center',
                                    marginTop:50,
                                    width:230,                    
                                    padding:10,
                                    borderWidth: 0,
                                    borderRadius:40, 
                                    backgroundColor:"#d9a21b",
                                    
                                }} 
                                titleStyle={{fontWeight:'700'}}
                                title="提交" 
                                onPress={handleSubmit(onSubmit)
                                    //setSuccess(true);
                                }
                            />
                            </View>
                        </View>
                        
                        




                    </View>
                   
                    <View style={{backgroundColor:'white',position:'absolute',height:showSuccess==true?'100%':0,width:showSuccess==true?'100%':0,margin:25,borderRadius:5,flexDirection:'column',justifyContent:'space-evenly'}}>
                    <ScrollView>
                        <View style={{
                            //borderBottomWidth:1,borderBottomColor:'#d2d2d2',
                            alignItems:'center',paddingBottom:40}}>
                            {showSuccess==true?<FontAwesomeIcon icon={faCheckCircle} size={80} color='#623f31' style={{marginTop:10,marginBottom:20}}/>:null}
                            <Text style={{color:'#623f31',fontWeight:'700',marginBottom:10}}>評論成功發佈</Text>
                            <Text style={{color:'#56585e'}}>請耐心等待管理員批閱，待完成後您可於服務資料中</Text>
                            <Text style={{color:'#56585e'}}>看到您的評論</Text>
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
                                    onPress={()=>navigation.navigate('User',{authorization:route.params.authorization})}  
                                />
                            </View>
                        </View>
                        {/* <View style={{paddingBottom:25,paddingLeft:25,paddingRight:25}}>
                            <Text style={{fontWeight:'700',paddingTop:16,paddingBottom:8}}>您可能感興趣</Text>
                            <ScrollView horizontal>
                            {suggestList.map((item,index)=>{
                                    return (
                                    <TouchableOpacity key={item+index} onPress={()=>navigation.navigate('ServiceProduct',{id:suggestList[inde].product_id,authorization:route.params.authorization})}>
                                        <View style={{borderRadius:8,padding:10,margin:5,marginLeft:0,width:WIDTH*0.4,height:HEIGHT*0.3,backgroundColor:'white'}}>
                                        
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
                                                
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View> */}
                        </ScrollView>
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
    inputs:{
        backgroundColor:'#f2f2f2',
        borderRadius:8,
        padding:10,
        paddingLeft:36,
        fontSize:16
    },
    inputTitle:{
        fontSize:18,
        fontWeight:"bold",
        marginBottom:16,
        marginTop:16
    },
    shadowProduct:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 7,
    },
    errorText:{
        color:"red",
        fontSize:14,
        paddingLeft:5
    }
  
});

export default ServiceComment;