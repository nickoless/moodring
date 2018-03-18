import React from 'react';
import {
  ActivityIndicator,
  BackHandler,
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

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log("CHANGING TO HOME");
      this.props.setScreen('HOME');
    });
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };


  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <Image style={{ width: 250, height: 100 }} source={{ uri: 'https://vignette.wikia.nocookie.net/hellokitty/images/7/77/Sanrio_Characters_Gudetama_Image004.png/revision/latest?cb=20170403223437'}}/>
        <Text style={{color: 'white', fontSize: 15 }}>Uh Oh! Looks like this picture doesn't work!</Text>
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