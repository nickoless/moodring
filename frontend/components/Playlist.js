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
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent, LinearGradient } from 'expo';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: this.props.screen };
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <Text style={{ marginTop: 30, color: 'white', fontSize: 20, padding: 10 }}>YOUR CUSTOM PLAYLIST</Text>
        <Text style={{ color: 'white', paddingHorizontal: 30 }}>Our Artificial Inteligence shows you are 80% Happy and 20% calm today</Text>
        <WebView source={{ uri: 'https://open.spotify.com/embed?uri=spotify%3Aalbum%3A2rp5riHULWgrXPsDtsp1ir' }} style={{ marginTop: 20, marginBottom: 30, height: 380, width: 300 }} />
        <TouchableOpacity onPress={this._returnHome}>
          <Text style={{ fontSize: 20, color: 'white', padding: 20, paddingTop: 5 }}>START OVER</Text>
        </TouchableOpacity>
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
});