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
import { PieChart } from 'react-native-svg-charts';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: this.props.screen };
  }

  _returnPlaylist = () => {
    this.props.setScreen('PLAYLIST');
  };


  render() {

    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

    const pieData = data
        .filter(value => value > 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: randomColor(),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))


    return (
      <View style={styles.container}>
        
        <LinearGradient colors={['#5161B9', '#9C69CC']} style={{ position: 'absolute', height: 900, width: 400 }} />

        <TouchableOpacity onPress={this._showResults}>
          <Text style={{ color: 'white', paddingHorizontal: 30 }}>MOOD RESULTS</Text>
        </TouchableOpacity>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <PieChart
                  style={ { height: 125, width: 125 } }
                  data={ pieData }
              />
          <Text style={{ flexDirection: 'column' }}>
            Results
          </Text>
          <Text style= {{ flexDirection: 'column' }}>
            Happy - 80 %
            Calm - 20 %
            Surprised - 0 %
            Angry - 0 %
            Sad - 0 %
          </Text>
        </View>

        <TouchableOpacity onPress={this._returnPlaylist}>
          <Text style={{ fontSize: 20, color: 'white', padding: 20, paddingTop: 5,  }}>BACK TO PLAYLIST</Text>
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
