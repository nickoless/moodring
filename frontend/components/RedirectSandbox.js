
import Expo, { Constants, WebBrowser } from 'expo';
import React from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import qs from 'qs';
import querystring from 'querystring';

export default class Redirect extends React.Component {
  state = {
    redirectData: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>OMFG PLS WORK</Text>

        <Button
          onPress={this._openWebBrowserAsync}
          title="Tap here to try it out"
        />

        {this._maybeRenderRedirectData()}
      </View>
    );
  }

  // TODO: STEP 2 - LINK TO SPOTIFY AUTH
  // ------------------------------------------------------------

  _generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


  //  STEP 3 - spotify should redirect to this url 
  //  Setup spotify whitelist URL in spotify dev
  //  *** CHANGE REDIRECT_URI 
  _getSpotifyAuthURL = () => {
    const client_id = '817050870e3542749870ff522e26192d';
    const client_secret = '195579d0f69a477e870fb8974fec7cd9';
    const redirect_uri = `https://redirect-server.now.sh/callback`;

    var state = this._generateRandomString(16);
    var scope = 'user-read-private user-read-email';

    var oShit = querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: scope,
      state: state
    })

    // console.log('https://accounts.spotify.com/authorize?' + oShit);
    console.log(Constants.linkingUri);
    
    return 'https://accounts.spotify.com/authorize?' + oShit;
  }

  // ------------------------------------------------------------

  _handleRedirect = event => {
    WebBrowser.dismissBrowser();

    let query = event.url.replace(Constants.linkingUri, '');
    let data;
    if (query) {
      data = qs.parse(query);
    } else {
      data = null;
    }

    this.setState({ redirectData: data });
  };

  _openWebBrowserAsync = async () => {
    const spotifyUrl = this._getSpotifyAuthURL();
    
    this._addLinkingListener();
    let result = await WebBrowser.openBrowserAsync(
      spotifyUrl
    );

    console.log(spotifyUrl);
    console.log('fuck your mother', typeof spotifyUrl);

    this._removeLinkingListener();
    this.setState({ result });
  };

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };

  _maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
      return;
    }

    return <Text>{JSON.stringify(this.state.redirectData)}</Text>;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    marginBottom: 25,
  },
});