import React, { useEffect,useState } from 'react';
import { 
    View,
    Text,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserHome from './UserHome';
import {faBars,faHome,faThLarge,faSearch,faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons'
import {SIZES} from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Category from './Category';
import Search from './Search';
import Carts from './Carts';
import Account from './Account';
import PersonInfo from './PersonInfo';

const Tab = createBottomTabNavigator();
const Stack =createStackNavigator();

const user = ({route})=>{
    

    return(
        
            
                 
            <Tab.Navigator
                screenOptions={({route})=>({
                    
                    tabBarIcon:({focused,color,size})=>{
                        switch(route.name){
                            case "UserHome":
                                return (
                                    <FontAwesomeIcon icon={faHome} size={24}/>
                                )
                            case "Category":
                                return (
                                    <FontAwesomeIcon icon={faThLarge} size={20} />
                                )
                            case "Search":
                                return (
                                    <FontAwesomeIcon icon={faSearch} size={20}/>
                                )
                            case "Carts":
                                return (
                                    <FontAwesomeIcon icon={faShoppingCart} size={20}/>
                                )
                            case "Account":
                                return (
                                    <FontAwesomeIcon icon={faUser} size={20}/>
                                )
                        }
                    }
                })}
                
                
            >
                <Tab.Screen 
                    options={{
                        headerShown:false,
                        title:"主頁"
                    }}
                    name="UserHome"
                    initialParams={{authorization:route.params.authorization}}
                    component={UserHome}
                />
                <Tab.Screen 
                    options={{
                        headerShown:false,
                        title:"分類"
                    }}
                    initialParams={{authorization:route.params.authorization}}
                    name="Category" 
                    component={Category}
                />
                <Tab.Screen 
                    options={{
                        headerShown:false,
                        title:"搜尋"
                    }}
                    name="Search"
                    initialParams={{authorization:route.params.authorization}}
                    component={Search}
                />
                <Tab.Screen 
                    options={{
                        headerShown:false,
                        title:"購物車"
                    }}
                    name="Carts" 
                    initialParams={{authorization:route.params.authorization}}
                    component={Carts}
                />
                <Tab.Screen 
                    options={{
                        headerShown:false,
                        title:"個人"
                    }}
                    name="Account" 
                    initialParams={{authorization:route.params.authorization,data:route.params.data}}
                    component={Account}
                />
                




            </Tab.Navigator>
           
            
      
    )
}

export default user;


