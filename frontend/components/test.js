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

export default class Test extends React.Component {
 constructor(props) {
   super(props);
   this.state = { screen: this.props.screen };
 }

 _spotifyAPI = async () => {
   uploadResponse = await this.spotifyRequest();
   let playlist = uploadResponse.playlists.items[0].external_urls.spotify;
   console.log('THIS IS IT!!!! __-------_____')
   console.log(playlist);

   
 };


 async spotifyRequest() {
   let apiUrl = 'https://api.spotify.com/v1/search?q=urban&type=playlist&limit=1'

   let options = {
     method: 'GET',
     headers: {
       Accept: 'application/json',
       Authorization: 'Bearer BQD8CEsUS4i3o7_GkMJwblEBEzNqwd12uPiCBc1edfnZ3BNpKdB9SEyw-zui1gkJqKnnWK1yGjKMWBz1OfqpCLTNIbXIM02now_eqTspMebWmt9pDKyxNtPQ6secrG46Jeke8vIkoatWJ6KAmedKBmgy75uD9kn86CE',
     }      
   }

   return fetch(apiUrl, options).then(result => result.json())
 }

 render() {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <View style={styles.container}>
         <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />
         <TouchableOpacity onPress={this._spotifyAPI} style={{ color: 'white', fontSize: 20 }}>
           <Text>TEST BUTTON FOR SPOITIFY API</Text>
         </TouchableOpacity>
       </View>
     </View >
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