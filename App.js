import React from "react";
import {
  Button,
  Image,
  TouchableOpacity
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  BookingDetail, 
  Onboarding,
  Home,
  Register,
  CheckAccount,
  LoginByEmail,
  LoginByPhone,
  ForgetAccount, 
  ResetPassword,

} from "./screens/";
import {User, UserHome} from './screens/users';
import addNewAddress from './screens/users/Address/addNewAddress';
import editAddress from './screens/users/Address/editAddress';
import {COLORS, SIZES, icons} from "./constants";
import Tabs from "./navigation/tabs";
import PersonInfo from "./screens/users/PersonInfo";
import Address from "./screens/users/Address";
import Order from "./screens/users/Order";
import OrderDetail from "./screens/users/OrderDetail";
import Service from "./screens/users/Service";
import ServiceProduct from "./screens/users/Service/ServiceProduct";
import ServiceComment from "./screens/users/Service/ServiceComment";
import ServiceCommentList from "./screens/users/Service/ServiceCommentList";
import PayAddress from "./screens/users/Payment/PayAddress";
import PayDelivery from "./screens/users/Payment/PayDelivery";
import PayGateway from "./screens/users/Payment/PayGateway";
import PaypalApp from "./screens/users/Payment/PaypalApp";
import PaymentAddressList from "./screens/users/Payment/PaymentAddressList";
import PaymentResult from "./screens/users/Payment/PaymentResult";


const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    border:"transparent",
  }
}
const Stack =createStackNavigator();

const Drawer = createDrawerNavigator();

function myDrawer() {
  return (
    <Drawer.Navigator initialRouteName='UserHome' screenOptions={{drawerPosition:'left'}}>
      <Drawer.Screen name="UserHome" component={UserHome} />
      <Drawer.Screen name="Article" component={UserHome} />
    </Drawer.Navigator>
  );
}

const App =({navigation})=>{
  return (
    
    <NavigationContainer theme={theme}>

     


      <Stack.Navigator
        
       initialRouteName="Onboarding"
      >
        
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown:false,
            title:"",
            headerStyle:{
              backgroundColor:COLORS.white
            },
            headerLeft:null,
            headerRight:()=>{
              return(
                <TouchableOpacity
                  style={{marginRight:SIZES.padding}}
                  onPress={()=>console.log("Pressed App")}
                >
                  <Image 
                    source={require("./assets/icons/menu.png")}
                   
                    resizeMode="contain"
                    style={{
                      width:25,
                      height:25,
                      
                    }}
                  />

                 </TouchableOpacity>
                
              )
            }
          }}
        />
        <Stack.Screen 
          name="BookingDetail"
          component={BookingDetail}
          options={{headerShown:false}}
        />
         <Stack.Screen 
          name="Register"
          component={Register}
          options={{headerShown:false}}
        />
         <Stack.Screen 
          name="CheckAccount"
          component={CheckAccount}
          options={{headerShown:false}}
        />

        <Stack.Screen
          name="LoginByEmail"
          component={LoginByEmail}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="LoginByPhone"
          component={LoginByPhone}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="ForgetAccount"
          component={ForgetAccount}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="User"
          component={User}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="UserHome"
          component={UserHome}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="PersonInfo"
          component={PersonInfo}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="Address"
          component={Address}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="addNewAddress"
          component={addNewAddress}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="editAddress"
          component={editAddress}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="Order"
          component={Order}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="OrderDetail"
          component={OrderDetail}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Service"
          component={Service}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="ServiceProduct"
          component={ServiceProduct}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="ServiceComment"
          component={ServiceComment}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="ServiceCommentList"
          component={ServiceCommentList}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="PayAddress"
          component={PayAddress}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="PayDelivery"
          component={PayDelivery}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="PayGateway"
          component={PayGateway}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="PaypalApp"
          component={PaypalApp}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="PaymentAddressList"
          component={PaymentAddressList}
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="PaymentResult"
          component={PaymentResult}
          options={{headerShown:false}}
        />

        <Stack.Screen 
          name="Home"
          component={Tabs}
          options={{
            title:null,
            headerStyle:{
              backgroundColor:COLORS.white
            },
            headerLeft:({onPress})=>(
              <TouchableOpacity
                style={{marginLeft:SIZES.padding}}
                onPress={onPress}
              >
                <Image
                  source={require("./assets/icons/back.png")}
                  resizeMode="contain"
                  style={{
                    width:25,
                    height:25
                  }}
                />

              </TouchableOpacity>
            ),
            headerRight:()=>(
              <TouchableOpacity
                style={{marginRight:SIZES.padding}}
                onPress={()=>console.log("Menu")}
              >
                <Image
                  source={require("./assets/icons/menu.png")}
                  resizeMode="contain"
                  style={{
                    width:25,
                    height:25
                  }}
                />
              </TouchableOpacity>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ()=>{
  return <App/>;
}