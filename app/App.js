import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, WebView } from 'react-native';
import { Camera, Permissions, LinearGradient } from 'expo';
// import Camera from './components/Camera';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={ ['#5161B9', '#9C69CC'] } style={{ position: 'absolute', height:900, width:400 }}/>
        {/* <WebView source={{uri: 'https://open.spotify.com/embed/user/al8876/playlist/29cVVsRNbl6tdFFv2B6yfp'}} style={{ height:300, width:300 }}/> */}
        <TouchableOpacity>
          <Text style={{ fontSize:20, color:'white' }}>TAP TO BEGIN</Text>
          
          <Image style={{ width: 150, height: 150 }} source={{uri: 'https://78.media.tumblr.com/48a0d13c52b402e976bc5d4416552671/tumblr_onew3c4x8a1vxu8n6o1_500.gif'}}/>    
          {/* <Camera></Camera>               */}
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