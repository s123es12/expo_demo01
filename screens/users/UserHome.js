import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { faSignOutAlt, faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { SIZES } from '../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import Carousel from 'react-native-banner-carousel';
import Modal from 'react-native-modal';
import { Input } from 'react-native-elements';


const numColumn = 2;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const UserHome = ({ navigation, route }) => {

    const [product_lists, setProductList] = useState([]);

    const [isLoading, setLoading] = useState(true);

    const [storeInfo, setStoreInfo] = useState({});

    const isFocused = useIsFocused();

    const [banners, setBanners] = useState([]);

    const [ShowBanner, setShowBanner] = useState(false);
    const [bannerDetail, setBannerDetail] = useState();
    const [loadBanner, setLoadBanner] = useState(true);
    const [bannerName, setBannerName] = useState();

    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);


    const [userLogin, setUserLogin] = useState(false);

    const handleLogout = () => {

        fetch('https://goldrich.top/api/rest/logout', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + route.params.authorization,

            }, body: JSON.stringify({

            })
        })
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.success == 1) {
                    navigation.navigate('Onboarding', { authorization: route.params.authorization });
                } else {
                    console.log(responseJson);
                }


            }).catch((err) => console.log(err));

    }

    const handleBanner = (id, name) => {
        fetch('https://goldrich.top/api/rest/banners/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + route.params.authorization,

            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if (responseJson.success == 1) {
                    setBannerDetail(responseJson.data[0]);
                    setBannerName(name);
                } else {

                }


            }).catch((err) => console.log(err))
            .finally(() => { setLoadBanner(false); setShowBanner(true); });
    }

    const addProduct = (productId) => {

        //console.log(productId)
        fetch('https://goldrich.top/api/rest/cart', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + route.params.authorization,

            }, body: JSON.stringify({
                'product_id': productId,
                'quantity': 1
            })
        })
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.success == 1) {

                } else {

                }


            }).catch((err) => console.log(err));
    }


    useEffect(() => {

        fetch('https://goldrich.top/api/rest/products', {
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
                    setProductList(responseJson.data);
                } else if (responseJson.success == 0) {

                }

            }).catch((err) => console.log(err))
            .finally(() => setLoading(false));

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

        fetch('https://goldrich.top/api/rest/banners/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + route.params.authorization,

            }
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson.data);
                if (responseJson.success == 1) {
                    //console.log(responseJson.data);
                    setBanners(responseJson.data);
                } else if (responseJson.success == 0) {

                }

            }).catch((err) => console.log(err))

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
                //console.log('UserHome', responseJson);
                if (responseJson.success == 1) {
                    setUserLogin(true);
                } else if (responseJson.success == 0) {
                    setUserLogin(false);
                }
            }).catch((err) => console.log(err))


    }, [isLoading, isFocused])

    useEffect(() => {
        //console.log(route)
        fetch('https://goldrich.top/api/rest/products/custom_search/limit/10/page/1', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + route.params.authorization,

            }, body: JSON.stringify({
                "sort": "name",
                "order": "asc",
                "filters": [
                    {
                        "field": "name",
                        "operand": "like",
                        "value": searchText
                    },
                ]
            })
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if (responseJson.success == 1) {




                    setSearchResult(responseJson.data);

                    //console.log(searchResult);
                } else if (responseJson.success == 0) {

                }
            }).catch((err) => console.log(err))

    }, [searchText])



    return (



        <View>



            <View style={{
                backgroundColor: "#cc6a3e",
                paddingBottom: 40,
                // borderBottomLeftRadius:10,
                // borderBottomRightRadius:10,
                height: 200
            }}>

                <View style={{ alignItems: 'center', marginTop: 40, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {userLogin == false ?
                        <TouchableOpacity
                            style={{
                                marginRight: SIZES.padding,
                                marginLeft: SIZES.padding,
                            }}
                            disabled={true}
                        >
                            <FontAwesomeIcon
                                icon={faSignOutAlt} color="rgba(0,0,0,0.2)"
                                size={25}

                            />

                        </TouchableOpacity> :
                        <TouchableOpacity
                            style={{
                                marginRight: SIZES.padding,
                                marginLeft: SIZES.padding,
                            }}
                            onPress={handleLogout}
                        >
                            <FontAwesomeIcon
                                icon={faSignOutAlt} color="white"
                                size={25}

                            />

                        </TouchableOpacity>

                    }
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

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        lineHeight: 70,
                        marginRight: SIZES.padding,
                        marginLeft: SIZES.padding,
                        fontSize: SIZES.h2,
                        color: "white",
                        fontWeight: '700',

                    }}>{storeInfo.store_name}</Text>
                    <Image
                        style={{
                            height: 70,
                            width: 100,
                            marginRight: SIZES.padding,
                            marginLeft: SIZES.padding,
                        }}
                        source={{ uri: storeInfo.store_image }}
                    />
                </View>

            </View>

            <Modal
                isVisible={ShowBanner}
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}
            >

                {loadBanner ? <ActivityIndicator />
                    :
                    <View style={{ backgroundColor: '#fff', padding: 10, justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 24, textAlign: 'center', color: '#cc6a3e' }}>{bannerName}</Text>
                        <Image style={{ height: '50%', width: '100%' }} resizeMode={'contain'} source={{ uri: bannerDetail.image }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: '#cc6a3e' }}>優惠券: </Text>
                            <Text style={{ fontSize: 20, color: 'red', fontWeight: '700' }}>{bannerDetail.title}</Text>
                        </View>

                        <Button title="OK" buttonStyle={{ backgroundColor: '#cc6a3e', width: WIDTH * 0.5, alignSelf: 'center' }} onPress={() => setShowBanner(false)} />
                    </View>
                }

            </Modal>

            <ScrollView >
                <View style={{ marginBottom: 10, backgroundColor: '#fff' }}>


                    {/* <Carousel
                        autoplay={true}
                        autoplayTimeout={5000}
                        loop={true}
                        index={0}
                        pageSize={WIDTH}
                        showsPageIndicator={false}
                    >
                        {banners.map((item, index) => {
                            if (item.status == 1) {
                                return (
                                    <TouchableOpacity key={item + index} onPress={() => handleBanner(item.banner_id, item.name)}>
                                        <Text style={{ height: 40, padding: 10, textAlign: 'center', color: '#cc6a3e' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            } else {
                                null;
                            }

                        })}
                    </Carousel> */}

                </View>






                <View style={{ marginBottom: 220 }}>

                    <ScrollView>
                        <Input
                            containerStyle={{ width: '100%', paddingHorizontal: WIDTH * 0.05, marginRight: 0 }}
                            inputContainerStyle={{ paddingLeft: 20, paddingRight: 10, borderBottomWidth: 0, backgroundColor: 'white', borderRadius: 10 }}
                            placeholder='搜尋產品/服務'

                            value={searchText}
                            onChangeText={(txt) => setSearchText(txt)}
                        />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: WIDTH * 0.05 }}>

                            {isLoading ? <ActivityIndicator /> : searchResult.length >= 1 ? searchResult.map((item, index) => {
                                return (
                                    <TouchableOpacity key={item.key ? item.key : item + index} onPress={() => navigation.navigate('ServiceProduct', { id: item.id, authorization: route.params.authorization })}>
                                        <View style={{ borderRadius: 8, padding: 10, marginVertical: 10, width: WIDTH * 0.43, height: HEIGHT * 0.3, backgroundColor: '#fff' }}>

                                            <Image source={{ uri: item.original_image }} style={{ height: '70%', width: '100%' }} resizeMode='cover' />

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                                <Text>{item.name}</Text>
                                                <TouchableOpacity
                                                    onPress={() => console.log("heart")}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faHeart} color='#cc6a3e' size={20} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: '#cc6a3e' }}>${item.price.toFixed(1)}</Text>
                                                <Button
                                                    buttonStyle={{ backgroundColor: '#623f31', color: "#000", height: 20, borderRadius: 5, height: 'auto' }}
                                                    disabled={item.quantity <= 0 ? true : false}
                                                    title="加入購物車"
                                                    titleStyle={{ fontSize: 12 }}
                                                    onPress={() => addProduct(item.product_id)}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                                : product_lists.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={item.key ? item.key : item + index} onPress={() => navigation.navigate('ServiceProduct', { id: item.id, authorization: route.params.authorization })}>
                                            <View style={{ borderRadius: 8, padding: 10, marginVertical: 10, width: WIDTH * 0.43, height: HEIGHT * 0.3, backgroundColor: '#fff' }}>

                                                <Image source={{ uri: item.original_image }} style={{ height: '70%', width: '100%' }} resizeMode='cover' />

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                                    <Text>{item.name}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => console.log("heart")}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faHeart} color='#cc6a3e' size={20} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                                    <Text style={{ color: '#cc6a3e' }}>${item.price.toFixed(1)}</Text>
                                                    <Button
                                                        buttonStyle={{ backgroundColor: '#623f31', color: "#000", height: 20, padding: 12, borderRadius: 5 }}
                                                        disabled={item.quantity <= 0 ? true : false}
                                                        title="加入購物車"
                                                        titleStyle={{ fontSize: 12 }}
                                                        onPress={() => addProduct(item.product_id)}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })

                            }





                        </View>
                    </ScrollView>




                </View>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: "#3232ff",
        alignItems: "center",
        justifyContent: "center",
        width: WIDTH / 2,
        flex: 1,
        margin: 1,
        height: WIDTH / numColumn
    },
    itemText: {
        color: "#fff",
        fontSize: 24,

    }
});
export default UserHome;