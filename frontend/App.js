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

import HomeScreen from './components/HomeScreen.js'
import Analyze from './components/Analyze.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      screen: 'HOME',
    };
  }
  
  // ------------------------------------------------------
  // Pass this to props to change the state and advance step
  // ------------------------------------------------------
  setScreen(screen) {
    this.setState({screen: screen})
  };

  setUploading(bool) {
    this.setState({uploading: bool})
  };

  setImage(img) {
    this.setState({image: img})
  };

  // ---------------------
  // render state: should only have components - TODO: Dry up code and take out logic
  // ---------------------
  render() {
    let { image } = this.state;

    if (this.state.screen === 'HOME') {
      // return (<HomeScreen setScreen={this.setScreen.bind(this)} nextScreen={this.state.screen}/>)
      return (<HomeScreen {...this.state} setScreen={this.setScreen.bind(this)} setUploading={this.setUploading.bind(this)} setImage={this.setImage.bind(this)}/>)

    } else if (this.state.screen === 'ANALYZE') {
      return (<Analyze {...this.state} setScreen={this.setScreen.bind(this)}/>)

    } else if (this.state.screen === 'PLAYLIST') {
      return (<Playlist {...this.state} setScreen={this.setScreen.bind(this)}/>)
    }
  }
}



// ------------------------------------------------------
// STEP 1: HOME SCREEN - Take picture using native camera
// TODO: Move to component
// ------------------------------------------------------

// ------------------------------------------------------
// STEP 2: ANALYZE SCREEN - Take picture using native camera
// ------------------------------------------------------
// class Analyze extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   _maybeRenderImage = () => {
//     let { image } = this.props;
//     if (!image) {
//       return (
//         <View
//           style={{
//             marginTop: 30,
//             width: 250,
//             elevation: 2,
//             shadowColor: 'rgba(0,0,0,1)',
//             shadowOpacity: 0.2,
//             shadowOffset: { width: 4, height: 4 },
//             shadowRadius: 5,
//           }}>
//         <View
//           style={{
//             borderRadius: 50,
//             overflow: 'hidden',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Image source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' }} style={{ width: 150, height: 150, borderRadius: 100 }} />
//         </View>

//         <Text style={{ color: 'white', fontSize: 20, paddingVertical: 30, paddingHorizontal: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>  ANALYZING MOOD</Text>
//       </View>

//       )
//     }
//     // IF HAS IMAGE
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
//           <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100 }} />
//         </View>
//         <Text style={{ color: 'white', fontSize: 20, paddingVertical: 30, paddingHorizontal: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>  ANALYZING MOOD</Text>
//       </View>
//     );
//   };

//   _returnState = () => {
//     console.log('THIS IS THE STATE');
//     console.log(this.props);
//   }

//   // ------------------------------------------------------
//   // Called after the component was rendered and it was attached to the DOM.
//   // This is a good place to make AJAX requests or setTimeout.
//   // ------------------------------------------------------
//   componentDidMount() {
//     setTimeout(() => {
//       this.props.setScreen('PLAYLIST');
//     }, 15000);
//   }

//   render() {
//     return( 
//       <View style={styles.container}>
//         <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
//           <TouchableOpacity onPress={this._returnState()}>
//             {this._maybeRenderImage()}
//           </TouchableOpacity>
//       </View>
//     );  
//   }
// }


// ------------------------------------------------------
// STEP 3: SPOTIFY SCREEN - After picture was taken
// TODO: move to component
// ------------------------------------------------------

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screen: this.props.screen};
  }

  _returnHome = () => {
    this.props.setScreen('HOME');
  };

  render() {
    return( 
      <View style={styles.container}>
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
        <Text style={{ marginTop: 30, color: 'white', fontSize: 20, padding: 10 }}>YOUR CUSTOM PLAYLIST</Text>
        <Text style={{ color: 'white', paddingHorizontal: 30 }}>Our Artificial Inteligence shows you are 80% Happy and 20% calm today</Text>
        <WebView source={{uri: 'https://open.spotify.com/embed?uri=spotify%3Aalbum%3A2rp5riHULWgrXPsDtsp1ir'}} style={{ marginTop: 20, marginBottom: 30, height:380, width: 300 }}/>
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