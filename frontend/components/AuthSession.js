import React from 'react';
import { Button, StyleSheet, Text, View, Linking } from 'react-native';
import { AuthSession, Constants, WebBrowser, LinearGradient } from 'expo';
import qs from 'qs';
import querystring from 'querystring';
import { Buffer } from 'buffer'
// import request from 'request';

const stateKey = 'spotify_auth_state';
const client_id = 'ec0f50a8fa1d4abc8a1740376f64ed97';
const client_secret = '097ec13156344d21949b606291eba5be';
let redirect_uri = AuthSession.getRedirectUrl();


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };
  }
  
  render() {
    // let spotifyResponse = await this.spotifyRequest('dank memes');
    // let playlist = spotifyResponse.playlists.items[0].external_urls.spotify;
    
    return (
      <View style={styles.container}>
        <Button title="Open Spotify Auth" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>HOW 2 GO NEXT SCREEN</Text>
        ) : null}
      </View>
    );
  }

  componentDidMount() {
    if (this.state.result) {
      this._returnHome();
    }
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  async _printState() {
    return this.state.result
  }

  _generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  _handlePressAsync = async () => {

    console.log(redirect_uri);
    
    let state = this._generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    let oShit = querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: scope,
      state: state
    })

    let result = await AuthSession.startAsync({
      authUrl: 'https://accounts.spotify.com/authorize?' + oShit
    });

    // let callback = _callback()
    // this.setState({ result });
    await this._callback(result);
  };

  // TODO: IMPLEMENT THIS TO MAKE THE POST REQUEST FOR THE ACCESS TOKEN
  // FIXME: WHY KEEP GETTING 415 RESPONSE
  _callback = async (res) => {
    console.log(res);
    const spotifyUrl = 'https://accounts.spotify.com/api/token'
    let authOptions = {  
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      },
      body: querystring.stringify({
        grant_type: "authorization_code",
        code: res.params.code,
        redirect_uri: redirect_uri,
      })
    };

    // 'Content-Type': 'application/x-www-form-urlencoded',

    // let token = await this._postToSpotify(spotifyUrl, authOptions)

    console.log(authOptions);

    let response = await fetch(spotifyUrl, authOptions)
      .then((res) => querystring.stringify(res))
      .then((resToQuery) => querystring.parse(resToQuery))
      .then((queryToJSON) => JSON.parse(queryToJSON._bodyInit))
      .catch(e => console.log(e));

    // this should be a json object
    this.setState({ result: response })
    this.props.setToken(this.state.result.access_token);
    this._returnHome();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});