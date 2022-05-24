import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Linking,
    Platform,
    Alert
} from 'react-native';
import { faTimes, faChevronRight, faDonate, faCube, faSms } from '@fortawesome/free-solid-svg-icons'
import { SIZES } from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Modal from "react-native-modal";
import { Avatar } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';


const WIDTH = Dimensions.get('window').width;



const Account = ({ navigation, route }) => {

    const isFocused = useIsFocused();
    const [userData, setUserData] = useState({});
    const [userPoints, setUserPoints] = useState(null);

    const [loadUser, setLoadUser] = useState(true);

    const [isMemberVisible, setMemberVisible] = useState(false);

    const [storeDetail, setStoreDetail] = useState();
    const [loadStore, setLoadStore] = useState(true);

    const showMemberModal = () => {

        setMemberVisible(!isMemberVisible);
    }


    const handleContact = () => {
        let store_name = storeDetail.store_name.trim();
        let text = '你好 我想問關於' + store_name + '的資料'
        if (Platform.OS == 'ios') {
            if (loadStore == false) {
                Linking.openURL(`https://api.whatsapp.com/send/?phone=852${storeDetail.store_telephone}&text=${text}&app_absent=0`);
            } else {
                setTimeout(() => Linking.openURL(`https://api.whatsapp.com/send/?phone=852${text}&text&app_absent=0`), 2000)
            }
        } else if (Platform.OS == 'android') {

            if (loadStore == false) {
                WebBrowser.openBrowserAsync(`https://api.whatsapp.com/send/?phone=852${storeDetail.store_telephone}&text=${text}&app_absent=0`);
            } else {
                setTimeout(() => WebBrowser.openBrowserAsync(`https://api.whatsapp.com/send/?phone=852${text}&text&app_absent=0`), 2000)
            }
        }
    }




    useEffect(() => {
        console.log('Account', route.params.authorization)
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
                    //console.log(responseJson.data);
                    setStoreDetail(responseJson.data);
                } else if (responseJson.success == 0) {

                }

            }).catch((err) => console.log(err))
            .finally(() => setLoadStore(false));


        fetch('https://goldrich.top/api/rest/account', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + route.params.authorization,

            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log('Account', responseJson);
                if (responseJson.success == 1) {
                    setUserData(responseJson.data);

                    if (!responseJson.data.reward_total) {
                        let points_list = responseJson.data.rewards;
                        let point = 0;
                        for (var i = 0; i < points_list.length; i++) {
                            point += parseInt(points_list[i].points);
                        }
                        setUserPoints(point);
                    } else {
                        setUserPoints(responseJson.data.reward_total);
                    }
                } else if (responseJson.success == 0) {
                    if (isFocused == true) {
                        Alert.alert(responseJson.error[0], '', [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'Login', onPress: () => navigation.navigate("Onboarding", { authorization: route.params.authorization }) },
                        ]);
                    }
                }
            }).catch((err) => console.log(err))
            .finally(() => setLoadUser(false))
    }, [isFocused == true])




    return (
        <View>
            <Modal isVisible={isMemberVisible}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10, width: WIDTH * 0.8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottomColor: 'cccccc', borderBottomWidth: 1 }}>
                                <Text style={{ fontSize: 20, fontWeight: '700', paddingLeft: 10 }}>會員</Text>
                                <FontAwesomeIcon icon={faTimes} size={30} onPress={showMemberModal} />
                            </View>
                            <View style={{ alignItems: 'center', padding: 20 }}>
                                <QRCode value={userData.email} size={200} />
                                <Text style={{ marginTop: 20, fontSize: 16, color: '#56585e' }}>會員編號:{userData.customer_id}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: WIDTH * 0.15, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faDonate} color="#fdd952" />
                                    <Text style={{ fontWeight: '700', color: '#000', marginLeft: 8 }}>{userPoints}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faCube} color="#c1c1c1" />
                                    {loadUser ? <ActivityIndicator /> :
                                        userData.custom_fields == undefined ? null :
                                            <Text style={{ color: '#c1c1c1', marginLeft: 8 }}>{userData.custom_fields[0].custom_field_value[0].name}</Text>
                                    }
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{
                backgroundColor: "#cc6a3e",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingTop: 40,
                height: 100,
            }}>
                <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.textTitle}>個人</Text>

                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: SIZES.padding,
                        }}
                        onPress={() => console.log("heart")}
                    >
                        <FontAwesomeIcon
                            icon={faHeart} color='white' size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ padding: 20 }}>

                <ScrollView>
                    {loadUser ? <ActivityIndicator /> :
                        <TouchableOpacity onPress={() => setMemberVisible(!isMemberVisible)}>

                            <View style={{ backgroundColor: 'white', borderRadius: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', height: 100, padding: 20, justifyContent: 'space-between' }}>
                                    <Avatar rounded source={require('../../assets/profile-45x45.png')} size={'large'} />
                                    <View style={{ marginVertical: 10, flexDirection: 'column' }}>
                                        <Text style={{ marginBottom: 10, fontWeight: '700', fontSize: 18 }}>{userData.lastname} {userData.firstname}</Text>
                                        <Text>{userData.email}</Text>
                                    </View>
                                    <QRCode
                                        value={userData.email}
                                        size={80}
                                    />
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: WIDTH * 0.15, alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faDonate} color="#fdd952" />
                                        <Text style={{ fontWeight: '700', color: '#000', marginLeft: 8 }}>{userPoints}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faCube} color="#c1c1c1" />
                                        {loadUser ? <ActivityIndicator /> :
                                            userData.custom_fields == undefined ? null :
                                                <Text style={{ color: '#c1c1c1', marginLeft: 8 }}>{userData.custom_fields[0].custom_field_value[0].name}</Text>
                                        }
                                    </View>

                                </View>
                            </View>


                        </TouchableOpacity>
                    }
                    <View style={styles.settingList}>
                        <TouchableOpacity onPress={() => navigation.navigate('PersonInfo', { userDetail: userData, authorization: route.params.authorization })}>
                            <View style={styles.settingItem}>
                                <Text style={styles.settingText}>個人資料</Text>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Address', { authorization: route.params.authorization })}>
                            <View style={styles.settingItem}>
                                <Text style={styles.settingText}>地址管理</Text>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Order', { authorization: route.params.authorization })}>
                            <View style={styles.settingItem}>
                                <Text style={styles.settingText}>我的訂單</Text>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.settingList}>
                        <TouchableOpacity onPress={() => handleContact()}>
                            <View style={styles.settingItem}>
                                <Text style={styles.settingText}>與我們聯絡</Text>
                                <FontAwesomeIcon icon={faSms} size={30} />
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>


            </View>

        </View>






    )
}

const styles = StyleSheet.create({
    textTitle: {
        marginLeft: SIZES.padding,
        marginRight: SIZES.padding,
        fontSize: 20,
        fontWeight: '700',
        color: '#fff'
    }, settingList: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 8

    }, settingItem: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    settingText: {
        fontSize: 16,
        fontWeight: '700'
    }

});

export default Account;