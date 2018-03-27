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
  state = {
    result: null,
    token: null
  };

  render() {
    // let spotifyResponse = await this.spotifyRequest('dank memes');
    // let playlist = spotifyResponse.playlists.items[0].external_urls.spotify;
    
    return (
      <View style={styles.container}>
        <Button title="Open Spotify Auth" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <View>
            <Text>O FUK IT WORK </Text>
            <Text>{this.state.result.access_token}</Text>
          </View>
        ) : null}
      </View>
    );
  }

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

  // FIXME: For making the spotify playlist request - NEED ACCESS TOKEN FIRST
  async spotifyRequest(input) {

    let randomNum = Math.floor(Math.random() * 100) + 1;
    console.log('THIS IS THE RANDOM NUMBER FROM INSIDE SPOTIFY PLAYLIST REQUEST: ' + randomNum)

    let apiUrl = `https://api.spotify.com/v1/search?q=${input}&type=playlist&offset=${randomNum}&limit=1`

    let options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      }
    }
    return fetch(apiUrl, options).then(result => result.json())
  }

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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});