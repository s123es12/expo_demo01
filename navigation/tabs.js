import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Home, Onboarding,Register,CheckAccount,LoginByEmail,ForgetAccount,ResetPassword} from '../screens';
import {User} from '../screens/users'
import { COLORS, icons } from '../constants';

const Tab = createBottomTabNavigator();

const tabOption ={
    showLabel :false,
    style:{
        height:90,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.53,
        shadowRadius:13.97,

        elevation:21,
    }
}

const Tabs = ()=>{
    return (
        <Tab.Navigator
            tabBarOptions={tabOption}
            screenOptions={({route})=>({
                tabBarIcon:({focused})=>{
                    const tintColor = focused ? COLORS.primary : COLORS.gray;

                    switch(route.name){
                        case "Home":
                            return (
                                <Image
                                    source={require("../assets/icons/home.png")}
                                    resizeMode="contain"
                                    style={{
                                        tintColor:tintColor,
                                        height:30,
                                        width:30,

                                    }}
                                />
                        )
                        case "Search":
                            return (
                                <Image
                                    source={require("../assets/icons/search.png")}
                                    resizeMode="contain"
                                    style={{
                                        tintColor:tintColor,
                                        height:30,
                                        width:30,

                                    }}
                                />
                        )
                        case "Product":
                            return (
                                <Image
                                    source={require("../assets/icons/product.png")}
                                    resizeMode="contain"
                                    style={{
                                        tintColor:tintColor,
                                        height:30,
                                        width:30,

                                    }}
                                />
                        )
                        case "User":
                            return (
                                <Image
                                    source={require("../assets/icons/user.png")}
                                    resizeMode="contain"
                                    style={{
                                        tintColor:tintColor,
                                        height:30,
                                        width:30,

                                    }}
                                />
                        )





                    }
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Search"
                component={Home}
            />
            <Tab.Screen
                name="Product"
                component={Home}
            />
            <Tab.Screen
                name="User"
                component={Home}
            />
             <Tab.Screen
                name="Register"
                component={Register}
            />
            <Tab.Screen 
                name="CheckAccount"
                component={CheckAccount}
            />
            <Tab.Screen 
                name="LoginByEmail"
                component={LoginByEmail}
            />
            <Tab.Screen 
                name="ForgetAccount"
                component={ForgetAccount}
            />
            <Tab.Screen 
                name="ResetPassword"
                component={ResetPassword}
            />
            <Tab.Screen 
                name="User"
                component={User}
            />


        </Tab.Navigator>
    )
}

export default Tabs;







