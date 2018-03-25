import React from 'react';
import { Button, StyleSheet, Text, View, Linking } from 'react-native';
import { AuthSession, Constants, WebBrowser, LinearGradient } from 'expo';
import qs from 'qs';
import querystring from 'querystring';
import { Buffer } from 'buffer'
// import request from 'request';

const stateKey = 'spotify_auth_state';
const client_id = '817050870e3542749870ff522e26192d';
const client_secret = '195579d0f69a477e870fb8974fec7cd9';
let redirect_uri = AuthSession.getRedirectUrl();


export default class App extends React.Component {
  state = {
    result: null,
  };

  render() {
    // let spotifyResponse = await this.spotifyRequest('dank memes');
    // let playlist = spotifyResponse.playlists.items[0].external_urls.spotify;
    
    return (
      <View style={styles.container}>
        <Button title="Open Spotify Auth" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>IT WORKD!</Text>
        ) : null}
      </View>
    );
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

    this._addLinkingListener();

    // let callback = _callback()
    this.setState({ result });
    let callback = await this._callback(result);
    console.log(callback);
    this._removeLinkingListener();
  };

  // TODO: IMPLEMENT THIS TO MAKE THE POST REQUEST FOR THE ACCESS TOKEN
  _callback = async (req) => {
  
    const spotifyUrl = 'https://accounts.spotify.com/api/token'
    let authOptions = {  
      method: 'POST',
      body: JSON.stringify({
        code: req.params.code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      }),
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      }
    };

    let token = await this._postToSpotify(spotifyUrl, authOptions)
    console.log(token);
    return token;
  }

  _postToSpotify = async (url, options) => {
    return fetch(url, options)
      .then(response => response.json())
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});