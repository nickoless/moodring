import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
  Linking,
} from 'react-native';
import { Constants, ImagePicker, registerRootComponent, LinearGradient, AuthSession, WebBrowser } from 'expo';

import querystring from 'querystring';
import qs from 'qs';

// --------- NEW CODE ----------

const FB_APP_ID = '672636582940821';

export default class LoginScreen extends React.Component {
  state = {
    result: null
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!this.state.result ? (
          <Button title="Open FB Auth" onPress={this._handlePressAsync} />
        ) : (
            this._renderUserInfo()
          )}
      </View>
    );
  }

  _renderUserInfo = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>HOLY FK IT WORKD {this.state.result}</Text>
      </View>
    );
  };


  _generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


  _handlePressAsync = async () => {
    const client_id = '817050870e3542749870ff522e26192d';
    const client_secret = '195579d0f69a477e870fb8974fec7cd9';
    // const redirect_uri = `https://9b5ea7b7.ngrok.io/callback`;
    const redirect_uri = 'https://expo.io/@hvdson/Moodring'

    var state = this._generateRandomString(16);
    var scope = 'user-read-private user-read-email';

    

    // try {
    //   let redirectUrl = AuthSession.getRedirectUrl().then((ok) => console.log(ok));
    // }
    // catch (e) {
    //   console.log('e:' + e);
    // }


    var oShit = querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      // scope: scope,
      state: state
    })



    console.log(`https://accounts.spotify.com/authorize?${oShit}`)

    let result = await WebBrowser.openBrowserAsync('https://accounts.spotify.com/authorize?' + oShit);

    // this._addLinkingListener();
    // let result = await WebBrowser.openBrowserAsync('https://accounts.spotify.com/authorize?' + oShit);
    // this._removeLinkingListener();
    this.setState({
      result
    });  

//   _handlePressAsync = async () => {
//     const client_id = '817050870e3542749870ff522e26192d';
//     const client_secret = '195579d0f69a477e870fb8974fec7cd9';
//     const redirect_uri = `https://9b5ea7b7.ngrok.io/callback`;

//     var state = this._generateRandomString(16);
//     var scope = 'user-read-private user-read-email';

//     var oShit = querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       redirect_uri: redirect_uri,
//       // scope: scope,
//       state: state
//     })

//     console.log('https://accounts.spotify.com/authorize?' + oShit);

//     this._addLinkingListener();
//     let result = await WebBrowser.openBrowserAsync('https://accounts.spotify.com/authorize?' + oShit);
//     this._removeLinkingListener();
//     this.setState({
//       result
//     });    
//   };

    

    // You need to add this url to your authorized redirect urls on your Facebook app
    // console.log({ redirectUrl });

    // NOTICE: Please do not actually request the token on the client (see:
    // response_type=token in the authUrl), it is not secure. Request a code
    // instead, and use this flow:
    // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
    // The code here is simplified for the sake of demonstration. If you are
    // just prototyping then you don't need to concern yourself with this and
    // can copy this example, but be aware that this is not safe in production.

    // let result = await AuthSession.startAsync({
    //   authUrl:
    //     `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
    //     `&client_id=${FB_APP_ID}` +
    //     `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    // });

    // if (result.type !== 'success') {
    //   alert('Uh oh, something went wrong');
    //   return;
    // }

    // let accessToken = result.params.access_token;
    // let userInfoResponse = await fetch(
    //   `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
    // );
    // const userInfo = await userInfoResponse.json();
    // this.setState({ userInfo });
  };
}


// ----------------------------
// OLD CODE
// ----------------------------

// export default class LoginScreen extends React.Component {
//   state = {
//     result: null,
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="FUCKING LOGIN" onPress={this._handlePressAsync} />
//         {this.state.result ? (
//           <Text>{JSON.stringify(this.state.result)}</Text>
//         ) : null}
//       </View>
//     );
//   }

// ----------------------------
// TODO: IMPLEMENT SPOTIFY AUTH
// ----------------------------

//   _generateRandomString = function (length) {
//     var text = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (var i = 0; i < length; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
//   };


//   _handlePressAsync = async () => {
//     const client_id = '817050870e3542749870ff522e26192d';
//     const client_secret = '195579d0f69a477e870fb8974fec7cd9';
//     const redirect_uri = `https://9b5ea7b7.ngrok.io/callback`;

//     var state = this._generateRandomString(16);
//     var scope = 'user-read-private user-read-email';

//     var oShit = querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       redirect_uri: redirect_uri,
//       // scope: scope,
//       state: state
//     })

//     console.log('https://accounts.spotify.com/authorize?' + oShit);

//     this._addLinkingListener();
//     let result = await WebBrowser.openBrowserAsync('https://accounts.spotify.com/authorize?' + oShit);
//     this._removeLinkingListener();
//     this.setState({
//       result
//     });    
//   };

//   _handleRedirect = event => {
//     WebBrowser.dismissBrowser();

//     let query = event.url.replace(Constants.linkingUri, '');
//     let data;
//     if (query) {
//       data = qs.parse(query);
//     } else {
//       data = null;
//     }

//     this.setState({
//       redirectData: data
//     });
//   };

//   _addLinkingListener = () => {
//     Linking.addEventListener('url', this._handleRedirect);
//   };

//   _removeLinkingListener = () => {
//     Linking.removeEventListener('url', this._handleRedirect);
//   };

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
