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


  //   if (!image) {
  //     return (
  //       <View
  //         style={{
  //           marginTop: 30,
  //           width: 250,
  //           elevation: 2,
  //           shadowColor: 'rgba(0,0,0,1)',
  //           shadowOpacity: 0.2,
  //           shadowOffset: { width: 4, height: 4 },
  //           shadowRadius: 5,
  //         }}>
  //         <View
  //           style={{
  //             borderRadius: 50,
  //             overflow: 'hidden',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           <Image source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' }} style={styles.image} />
  //         </View>

  //         <Text style={styles.systemMessage}>  ANALYZING MOOD</Text>
  //       </View>

  //     )
  //   }
  //   return (
  //     <View
  //       style={{
  //         marginTop: 30,
  //         width: 250,
  //         elevation: 2,
  //         shadowColor: 'rgba(0,0,0,1)',
  //         shadowOpacity: 0.2,
  //         shadowOffset: { width: 4, height: 4 },
  //         shadowRadius: 5,
  //       }}>
  //       <View
  //         style={{
  //           borderRadius: 50,
  //           overflow: 'hidden',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}>
  //         <Image source={{ uri: image }} style={styles.image} />
  //       </View>
  //       <Text style={styles.systemMessage}>  ANALYZING MOOD</Text>
  //     </View>
  //   );
  // };

export default class Analyze extends React.Component {
  constructor(props) {
    super(props);
  }

  _maybeRenderImage = () => {
    let { image } = this.props;

    // render loading ball gif - no image yet
    if (!image) {
      return (
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' }} style={styles.image} />
          <Text style={styles.systemMessage}>  ANALYZING MOOD</Text>
        </View>

      )
    }
    // IF HAS IMAGE
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.systemMessage}>  ANALYZING MOOD</Text>
      </View>
    );
  };

  _returnState = () => {
    console.log('THIS IS THE STATE');
    console.log(this.props);
  }

  // ------------------------------------------------------
  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // ------------------------------------------------------
  componentDidMount() {
    setTimeout(() => {
      this.props.setScreen('PLAYLIST');
    }, 15000);
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <TouchableOpacity onPress={this._returnState()}>
          {this._maybeRenderImage()}
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
  systemMessage: { 
    color: 'white', 
    fontSize: 20, 
    paddingVertical: 30, 
    paddingHorizontal: 30, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  imageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150, 
    height: 150, 
    borderRadius: 100
  }
});