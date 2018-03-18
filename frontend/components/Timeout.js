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
import Exponent, { Constants, registerRootComponent, LinearGradient } from 'expo';


export default class Timeout extends React.Component {
  constructor(props) {
    super(props);
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };


  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <Image style={{ width: 250, height: 200 }} source={{ uri: 'http://78.media.tumblr.com/d6bee4d844d4bb58dfe88ac089689f81/tumblr_nv6igeY9I71uzh6soo1_500.png'}}/>
        <Text style={{color: 'white', fontSize: 15, textAlign: 'center' }}>Uh Oh! Looks like your connection timed out! {"\n"}{"\n"} Try clearing your phones cache or restarting your phone!</Text>        
        <TouchableOpacity onPress={this._returnHome} style={{paddingTop: 50}}>
          <Text style={{color: 'white', fontSize: 20, borderWidth: 2, borderColor: 'white', paddingHorizontal: 20, paddingVertical: 10 }}>TAP HERE TO GO BACK</Text>
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