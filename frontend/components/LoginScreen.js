import React from 'react';
import SpotifyWebApi from 'react-native-spotify-web-api';
import axios from 'axios';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Input,
  Linking,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent, LinearGradient } from 'expo';

const spotifyApi = new SpotifyWebApi();

export default class LoginScreen extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        playlistUri: null
      }
      this._getPlaylists = this._getPlaylists.bind(this);
    }

    _getPlaylists = async () => {
      const randomNum = Math.floor(Math.random() * 50);
      return fetch(`https://api.spotify.com/v1/search?q=happy&type=playlist&limit=1`, {
        method: 'GET',
        headers: { Authorization: 'Bearer BQBmS89sauyK_scCsAf-h_00tFZlUWpPR-Mt6rhV77pL80acCeerJncjJnDpIS9iFgoQfE2KH4yv5cWQr4K6Wv4viZ3sQurQzxiyn7sc7XLb0600lxqmm9-ShnMW4dlDHPKjpNe75hWCc0ZqgKFx7vsX5NmZJLV9qvH54A&refresh_token=AQDQfytkm4ZPHxqOZBd57a2kosehh-VAVd_-7VQLSweAN-3rGw7fQBnCnl5ece5duBOAF6wZ-UJfO7ahkGR2rn3ntePowgXNrL3qE9RhJhJiSiWzI24MTr7n9Mi0Gc2ZoZ8'
        }})
      .then((response) => {
        // const parsedResults = JSON.parse(response);
        // console.log(response._bodyInit.playlists);
        console.log("HERE", response._bodyInit.playlists);
        const results = response._bodyinit;
        for (let item in results) {
          let playlistInfo = results[item];
          console.log("NOW HERE", playlistInfo);
          // this.setState({playlistUri: playlistInfo.uri});
          // console.log(this.state.playlistUri);
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }

    render() {

      if (this.state.currentPlaylist) {
      nowPlaying =
        <div>
          <h3>Now playing:</h3>
          <p>Playlist Name: {this.state.playlistName}</p>
          <p>Playlist owner: {this.state.playlistOwner}</p>
          <p><a href={this.state.currentPlaylist}>URL</a></p>
          <img src={this.state.playlistImage} alt={this.state.playlistName} />
          {renderedPlaylist}
        </div>
      }

      return (

        <View style={styles.container}>
          <View>
            <Text style={styles.AppTitle}>LOG IN THIS MUH</Text>
          </View>
          <View>
            <Image style={{ width: 300, height: 300 }} source={{ uri: 'http://shop.mopop.org/mediacontent//2017/12/08/19/s7930_191885.jpg' }}/>
          </View>
          <View>
            <Button title="click here" onPress={ this._getPlaylists } />
          </View>
        </View>

      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  App: {
    textAlign: 'center',
  },
  AppHeader: {
    height: 150,
    padding: 20,
    backgroundColor: 'red',
  },
  AppTitle: {
    fontSize: 40,
    color: 'black',
  }
});