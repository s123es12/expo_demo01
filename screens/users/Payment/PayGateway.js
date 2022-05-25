import React, { useEffect, useState, Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Modal
} from 'react-native';
import { WebView } from 'react-native-webview';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { SIZES } from '../../../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, CheckBox } from 'react-native-elements';





const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const PayGateway = ({ navigation, route }) => {

    const commentText = route.params.comment;

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isloadMethod, setLoadMethod] = useState(true);
    const [paymentList, setPaymentList] = useState([]);
    const [paymentSelect, setPaymentSelect] = useState();
    const [paymentId, setPaymentId] = useState();

    const [showModal, setShowModal] = useState(false);
    const [htmlCode, setHtmlCode] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const [getConfirm, setConfirm] = useState(false);
    const [progressNum, setProgressNum] = useState(0);

    const [htmlCode2, setHtmlCode2] = useState('');
    const [showModal2, setShowModal2] = useState(false);
    const [paymentAdd, setPaymentAdd] = useState();
    const handlePayment = (payment, index) => {
        //console.log(payment, index);
        let new_list = [...paymentList];
        setPaymentSelect(payment);

        for (var i = 0; i < paymentList.length; i++) {
            new_list[i] = false;
        }
        new_list[index] = !new_list[index];
        setPaymentList(new_list);
        setPaymentId(index);

        fetch('https://goldrich.top/api/rest/paymentmethods', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + route.params.authorization,

            }, body: JSON.stringify({
                "payment_method": paymentMethods[index].code,
                "agree": 1,
                "comment": JSON.stringify(commentText)
            })
        })
            .then(response => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if (responseJson.success == 0) {

                } else if (responseJson.success == 1) {

                }
            }).catch((err) => console.log(err));

    }



    const onSubmit = () => {
        //console.log(paymentSelect);
        //console.log(paymentMethods[paymentId]);
        switch (paymentSelect) {
            case 'PayPal': {
                //console.log('paypal');
                fetch('https://goldrich.top/api/rest/confirm', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + route.params.authorization,
                        'X-Oc-Currency': 'HKD'
                    }
                })
                    .then(response => response.json())
                    .then((responseJson) => {
                        //console.log(responseJson);

                        if (responseJson.success == 0) {

                        } else if (responseJson.success == 1) {

                            setShowModal(true);
                            setHtmlCode(responseJson.data.payment);


                        }
                    }).catch((err) => console.log(err));
                break;
            }
            case '貨到付款': {
                //console.log('貨到付款');
                fetch('https://goldrich.top/api/rest/confirm', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + route.params.authorization,
                        'X-Oc-Currency': 'HKD'
                    }
                })
                    .then(response => response.json())
                    .then((responseJson) => {
                        //console.log(responseJson.data.payment);


                    }).catch((err) => console.log(err));
                setTimeout(() => navigation.navigate('PaymentResult', { shipping_method: '貨到付款', authorization: route.params.authorization, showToastMessage: route.params.showToastMessage }), 1000)

                break;
            }
            case '銀行轉帳': {
                //console.log('銀行轉帳');
                fetch('https://goldrich.top/api/rest/confirm', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + route.params.authorization,
                        'X-Oc-Currency': 'HKD'
                    }
                })
                    .then(response => response.json())
                    .then((responseJson) => {
                        //console.log(responseJson);
                        if (responseJson.success == 1) {

                            let text = responseJson.data.payment;
                            let new_txt = text.split('<div class="buttons">');
                            //console.log(new_txt[0].replace(/(<([^>]+)>)/gi,''));
                            //setPaymentAdd(new_txt[0].replace(/(<([^>]+)>)/gi,''));
                            setTimeout(() => navigation.navigate('PaymentResult', { shipping_method: '銀行轉帳', paymentAdd: new_txt[0].replace(/(<([^>]+)>)/gi, ''), authorization: route.params.authorization, showToastMessage: route.params.showToastMessage }), 1000)
                        }

                        // console.log(responseJson.data.payment);
                        // console.log(JSON.parse(responseJson.data.payment));


                    }).catch((err) => console.log(err));

                break;
            }
            default: {

            }
        }


    }
    const handleWebViewNavigationStateChange = (newNavState) => {
        const { url } = newNavState;
        if (!url) return;

        if (url.includes('https://goldrich.top/index.php?route=checkout/success')) {

            setShowModal(false);
            console.log("finsih");
            navigation.navigate('PaypalApp', { authorization: route.params.authorization, showToastMessage: route.params.showToastMessage });
        } else if (url.includes('https://goldrich.top/index.php?route=checkout/cart')) {

            setShowModal(false);
            console.log("cancel");

        }

    }
    const handleWebViewNavigationStateChange2 = (newNavState) => {

    }

    useEffect(() => {
        fetch('https://goldrich.top/api/rest/paymentmethods', {
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
                    setPaymentMethods(responseJson.data.payment_methods);
                    responseJson.data.payment_methods.map((item, index) => {
                        let list = [];
                        list[index] = false;
                        setPaymentList(list);
                    })
                } else if (responseJson.success == 0) {
                    setConfirm(true);
                    let errMsg = responseJson.error.map((item, index) => {
                        item[index] = item;
                    })
                    setErrorMessage(errMsg);
                    if (JSON.stringify(responseJson.error[0]).match('Missing payment address')) {
                        setTimeout(() => navigation.navigate('PayAddress', { authorization: route.params.authorization }), 2000)
                    }
                }

            }).catch((err) => console.log(err))
            .finally(() => setLoadMethod(false))

        //console.log(commentText);
    }, [])


    return (

        <View style={{ flex: 1 }}>


            <View style={{
                backgroundColor: "#cc6a3e",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingTop: 40,
                height: 100,
                zIndex: 5,

            }}>


                <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                marginLeft: SIZES.padding,

                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft} color='white' size={25} />
                        </TouchableOpacity>

                        <Text style={styles.textTitle}>結賬</Text>

                    </View>




                </View>
            </View>

            <View style={{ padding: 25, marginBottom: 120 }}>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 20, borderRadius: 10 }}>
                    <Text style={{ fontWeight: '700', borderBottomWidth: 1, borderBottomColor: '#d2d2d2', paddingVertical: 10 }}>付款方式</Text>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, flexWrap: 'wrap' }}>
                        {isloadMethod ? <ActivityIndicator /> :
                            paymentMethods.map((item, index) => {
                                return (
                                    <CheckBox
                                        key={item + index}
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginLeft: 10, marginVertical: 5, padding: 0 }}
                                        textStyle={{ margin: 0 }}
                                        title={item.title}
                                        checkedIcon='dot-circle-o'
                                        checked={index == paymentId}
                                        onPress={() => handlePayment(item.title, index)}
                                        uncheckedIcon='circle-o'
                                        checkedColor='#d9a21b'
                                        uncheckedColor='#d9a21b'
                                    />
                                )
                            })
                        }
                        {getConfirm && <Text style={[styles.errorText, { fontSize: 16 }]}>{errorMessage}</Text>}
                    </View>

                </View>

                <View style={{ alignItems: 'center' }}>
                    <Button
                        buttonStyle={{
                            padding: 10,
                            borderWidth: 0,
                            borderRadius: 20,
                            backgroundColor: "#d9a21b",
                            marginTop: 60,
                            width: WIDTH * 0.6
                        }}
                        title="付款"
                        onPress={() => onSubmit()}
                    />

                </View>

            </View>

            <Modal
                style={{ flex: 1, width: WIDTH, height: HEIGHT }}
                visible={showModal}
            >

                <View style={{ justifyContent: 'center' }}>
                    {progressNum < 0.5 ? <ActivityIndicator size="large" color="#00ff00" /> : null}
                </View>

                <WebView
                    originWhitelist={['*']}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                    onLoadProgress={({ nativeEvent }) => setProgressNum(nativeEvent.progress)}

                    source={{
                        html:
                            `<html>
                                <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                </head>
                                <style>
                                    .btn{
                                        background-color:red;
                                        display:none;
                                    }
                                    .alert-danger{
                                        display:none;
                                    }
                                </style>
                                <script>
                                window.onload=function(){   
                                    const sendBtn = document.getElementsByClassName("btn-primary");
                                    sendBtn[0].click();;
                                }
                               
                                </script>
                            <body>`
                            + htmlCode +
                            `</body>
                            </html>`

                    }}
                />
            </Modal>

            <Modal
                style={{ flex: 1, width: WIDTH, height: HEIGHT }}
                visible={showModal2}
            >

                <View style={{ justifyContent: 'center' }}>
                    {progressNum < 0.5 ? <ActivityIndicator size="large" color="#00ff00" /> : null}
                </View>

                <Text>{htmlCode2}</Text>
            </Modal>




        </View>






    )
}


const styles = StyleSheet.create({
    textTitle: {
        marginLeft: 15,
        marginRight: SIZES.padding,
        fontSize: 20,
        fontWeight: '700',
        color: '#fff'
    },
    container: {
        flex: 1,
        marginTop: 20,
        width: '100%',
        height: 500,
    },

});

export default PayGateway;