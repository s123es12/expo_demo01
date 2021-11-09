module.exports={
    project:{
        ios:{
            "supportsTablet": true,
            "bundleIdentifier": "com.goldrichtop.goldrichtop"
          },
          
        android:{
            "adaptiveIcon": {
              "foregroundImage": "./assets/icon_app.png",
              "backgroundColor": "#FFFFFF"
            },
            "config": {
              "googleSignIn": {
                    "certificateHash": "CF:8D:DE:15:EB:37:70:6D:DC:2A:AB:38:FB:FB:06:11:BA:62:7E:E1",
                    "apiKey":"AIzaSyCzpAQPsICrj8e96EL7OY8YlBh8PJxSgMA"
                }
            },
            "package": "com.goldrichtop.goldrichtop"
          },
    },
    assets:["./assets/fonts/"]
}