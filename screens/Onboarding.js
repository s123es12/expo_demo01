import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    View,
    Text,

} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS, SIZES } from "../constants";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

const Onboarding = ({ navigation, route }) => {

    const [authorization, setAuthorization] = useState(null);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [storeInfo, setStoreInfo] = useState({});
    const [resetAuth, setResetAuth] = useState(false);

    const [userGoogleInfo, setUserGoogleInfo] = useState({});
    const [googleSubmitting, setGoogleSubmitting] = useState(false);



    useEffect(() => {
        console.log('user', route.params)
        if (route.params && route.params.authorization !== null) {
            setAuthorization(route.params.authorization);
            fetch('https://goldrich.top/api/rest/stores/0', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + route.params.authorization,

                }
            })
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.success == 1) {
                        setStoreInfo(responseJson.data);
                    } else if (responseJson.success == 0) {

                    }

                }).catch((err) => console.log(err));
        }
    }, [])

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const handleGoogleSignin = async () => {
        setGoogleSubmitting(true);
        const config = {
            iosStandaloneAppClientId: '937805820238-t5co7vg2ev6qr43nrja4ud890pvitg21.apps.googleusercontent.com',
            androidStandaloneAppClientId: `937805820238-6jcqdlhperrjlfkqo98go9l6grh4b6rr.apps.googleusercontent.com`,
            androidClientId: `1063096795567-g273bevnp3bbt2v0cef49luvo7v0hi7u.apps.googleusercontent.com`,
            iosClientId: `1063096795567-kbqgahiqk83oh6chop9nspr7nuqjnif5.apps.googleusercontent.com`,
            scopes: ['profile', 'email'],

        }

        Google.logInAsync(config)
            .then((result) => {
                console.log(result)
                const { type, accessToken, user } = result;

                if (type == 'success') {

                    handleMessage('Google signin successful', 'SUCCESS');
                    //setTimeout(()=>navigation.navigate('LoginByPhone',{authorization:authorization,userInfo:user}),1000);
                    fetch('https://goldrich.top/api/rest/sociallogin', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + authorization,

                        }, body: JSON.stringify({
                            "email": user.email,
                            "social_access_token": accessToken,
                            "provider": "google"
                        })
                    })
                        .then(response => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            if (responseJson.success == 1) {
                                handleMessage('');
                                setTimeout(() => navigation.navigate('User', { authorization: authorization, data: responseJson.data }), 1000);

                            } else if (responseJson.success == 0) {
                                setError(responseJson.error);
                                setTimeout(() => navigation.navigate('LoginByPhone', { authorization: authorization, userInfo: user }), 1000);
                            } else if (JSON.stringify(responseJson.error[0]).match('The access token provided is invalid')) {
                                setResetAuth(!resetAuth);
                            }
                        }).catch((err) => console.log(err))
                } else {
                    handleMessage('Google signin was cancelled');
                }
                setGoogleSubmitting(false);
            })
            .catch(error => {
                console.log(error);
                handleMessage('An error occurred. Check your network and try again', error);
                setGoogleSubmitting(false);
                setGoogleSubmitting(true);
            })

    }


    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '1346816965720981',
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
                const obj = await response.json();
                fetch('https://goldrich.top/api/rest/sociallogin', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authorization,

                    }, body: JSON.stringify({
                        "email": obj.email,
                        "social_access_token": token,
                        "provider": "facebook"
                    })
                })
                    .then(response => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        if (responseJson.success == 1) {
                            handleMessage('');
                            setTimeout(() => navigation.navigate('User', { authorization: authorization, data: responseJson.data }), 1000);

                        } else if (responseJson.success == 0) {
                            setError(responseJson.error);
                            //setTimeout(()=>navigation.navigate('LoginByPhone',{authorization:authorization,userInfo:user}),1000);
                        }
                    }).catch((err) => console.log(err))

            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            console.log(`Facebook Login Error: ${message}`);
        }
    }

    useEffect(() => {

    }, [])

    return (
        /** 
            使用Facebook帳戶登入
            使用Google帳戶登入
            使用電話號碼登入
            或
            使用電郵登入
            還未有帳戶？立即註冊
        */
        <ScrollView>
            <View style={{ flex: 1, padding: SIZES.padding, marginTop: 40 }}>
                <View style={{ flexDirection: 'column' }}>
                    {/* <Text style={{
                        fontSize:SIZES.h2,
                        color:"black",
                        fontWeight:'700',
                        
                    }}>{storeInfo.store_name}</Text> */}
                    <Image
                        style={{
                            height: 175,
                            width: 250,
                        }}
                        resizeMode='contain'
                        source={{ uri: storeInfo.store_image }}
                    />
                    <Text style={[FONTS.h2, { fontWeight: "700", marginTop: 20 }]}>歡迎回來</Text>
                    <Text style={[FONTS.h3, { marginBottom: 60 }]}>登入你的帳戶</Text>
                </View>

                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={{ height: 44, marginBottom: 24, fontSize: 18 }}
                    onPress={async () => {
                        try {
                            const credential = await AppleAuthentication.signInAsync({

                                requestedScopes: [
                                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                    AppleAuthentication.AppleAuthenticationScope.EMAIL,

                                ],
                            });
                            //console.log('social login');
                            console.log(credential);



                            fetch('https://goldrich.top/api/rest/sociallogin', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + authorization,

                                }, body: JSON.stringify({
                                    "familyName": credential.fullName.familyName,
                                    "givenName": credential.fullName.givenName,
                                    "social_access_token": credential.identityToken,
                                    "provider": "apple",
                                    "user": credential.user
                                })
                            })
                                .then(response => response.json())
                                .then((responseJson) => {
                                    console.log('social login');
                                    console.log(responseJson);
                                    if (responseJson.success == 1) {
                                        handleMessage('');
                                        navigation.navigate('User', { authorization: authorization, data: responseJson.data });

                                    } else if (responseJson.success == 0) {
                                        // setError(responseJson.error);
                                        // setTimeout(()=>navigation.navigate('LoginByPhone',{authorization:authorization,userInfo:user}),1000);
                                    } else if (JSON.stringify(responseJson.error[0]).match('The access token provided is invalid')) {
                                        setResetAuth(!resetAuth);
                                    }
                                }).catch((err) => console.log(err))

                            // signed in



                        } catch (e) {
                            if (e.code === 'ERR_CANCELED') {
                                // handle that the user canceled the sign-in flow
                            } else {
                                // handle other errors
                            }
                        }
                    }}
                />

                <View style={{ marginBottom: SIZES.padding }}>
                    <Button
                        icon={
                            <Icon
                                name="facebook"
                                size={22}
                                color="white"
                            />
                        }
                        buttonStyle={{ backgroundColor: '#1877f2' }}
                        titleStyle={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}
                        title="使用Facebook帳戶登入"
                        onPress={logIn}
                    />
                </View>

                <View style={{ marginBottom: SIZES.padding, borderWidth: 1, borderRadius: 5 }}>
                    {!googleSubmitting && (

                        <Button
                            icon={
                                <Icon
                                    name="google"
                                    size={22}

                                />

                            }
                            disabled={false}
                            buttonStyle={{ backgroundColor: 'transparent' }}
                            titleStyle={{ color: '#000', marginLeft: 10, fontSize: 18, fontWeight: "bold" }}
                            title="使用Google帳戶登入"
                            onPress={handleGoogleSignin}
                        />


                    )}
                    {googleSubmitting && (

                        <Button
                            icon={
                                <Icon
                                    name="google"
                                    size={22}

                                />

                            }
                            disabled={true}
                            buttonStyle={{ backgroundColor: 'transparent' }}
                            titleStyle={{ color: '#000', marginLeft: 10, fontSize: 18, fontWeight: "bold" }}
                            title="使用Google帳戶登入"
                            onPress={handleGoogleSignin}

                        />

                    )}
                </View>
                <Text style={[styles.errorText, { fontSize: 16, color: messageType == 'SUCCESS' ? 'green' : 'red' }]}>{message}</Text>

                <Text style={styles.textStyle}>或</Text>

                <View style={{ marginBottom: SIZES.padding, borderWidth: 1, borderRadius: 5 }}>
                    <Button
                        icon={
                            <Icon name='envelope' size={22} />
                        }

                        buttonStyle={{ backgroundColor: 'transparent' }}
                        titleStyle={{ color: '#000', marginLeft: 10, fontSize: 18, fontWeight: "bold" }}
                        title="使用電郵登入"
                        onPress={() => navigation.navigate('LoginByEmail', { authorization: authorization })}
                    />

                </View>
                <View style={{ marginBottom: SIZES.padding, borderWidth: 1, borderRadius: 5 }}>

                    <Button
                        icon={
                            <Icon name='home' size={22} />
                        }

                        buttonStyle={{ backgroundColor: 'transparent' }}
                        titleStyle={{ color: '#000', marginLeft: 10, fontSize: 18, fontWeight: "bold" }}
                        title="返回首頁"
                        onPress={() => navigation.navigate('User', { authorization: authorization })}
                    />
                </View>
                <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

                    <Text style={{}}>還未有帳戶？</Text>
                    <Text style={{ flex: 1 }} onPress={() => navigation.navigate('Register', { authorization: authorization })} style={{ color: "red" }}>立即註冊</Text>
                </View>

            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: SIZES.padding,
        fontSize: 22,
        fontWeight: "700"
    },
    errorText: {
        fontSize: 12,
        paddingLeft: 5
    }
})

export default Onboarding;