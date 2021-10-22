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

import {faBars,faPeopleArrows,faMicrophone, faLiraSign,faTimes,faCheckCircle,faUndo,faChevronRight,
faChevronLeft,faMapPin,faMapMarkerAlt,faAngleDoubleDown, faMapMarkedAlt,faThLarge,
faLevelDownAlt,faSortAmountDown,faShareAlt,faCaretRight} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import Modal from "react-native-modal";
import { Button,Avatar,ListItem ,CheckBox,Rating} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import DateTimePicker from '@react-native-community/datetimepicker';



const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;


const ServiceCommentList = ({navigation,route}) =>{
 

    

    const [product_info, setProductInfo] = useState(route.params.info);
    
    const [commentList, setCommentList] = useState(product_info.reviews);

    useEffect(()=>{
       
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

                            <Text style={styles.textTitle}>評論</Text>
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
                <ScrollView style={{marginBottom:80}}>
                    <View style={{padding:25}}>
                            {commentList.reviews?commentList.reviews.map((item,index)=>{
                                return (
                                    <View key={item+index} style={{backgroundColor:'white',padding:20,marginVertical:10}}>
                                        <View style={{flexDirection:'row',borderBottomColor:'#d2d2d2',borderBottomWidth:1,justifyContent:'space-between',paddingBottom:10}}>
                                            <View style={{flex:1}}>
                                                <Text style={{fontWeight:'700'}}>{item.author}</Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text>{item.text}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Rating style={{alignItems:'flex-start'}} showRating={false} imageSize={20} fractions={1} startingValue={item.rating} readonly={true}/>
                                                <Text style={{marginLeft:10}}>{item.rating.toFixed(1)}</Text>
                                            </View>
                                            <View>
                                                <Text>{item.date_added}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }):null}
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

export default ServiceCommentList;