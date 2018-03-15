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


export default class Error extends React.Component {
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
        <TouchableOpacity onPress={this._returnHome}>
          <Text style={{color: 'white', fontSize: 30 }}>NO IMAGE FOUND</Text>
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