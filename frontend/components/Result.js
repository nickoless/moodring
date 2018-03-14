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

    console.log('THIS IS PROPS FROM PLAYLIST-------')
    console.log(this.props)
    console.log('THIS IS THE FIRST EMOTION FROM THE EMOTION LIST ---------')
    console.log(this.props.emotions[0])

    let percentage1 = this.props.percentage[0];
    let percentage2 = this.props.percentage[1];
    let percentage3 = this.props.percentage[2];

    let emotion1 = this.props.emotions[0];
    let emotion2 = this.props.emotions[1];
    let emotion3 = this.props.emotions[2];

    const data =[]

    data[0] = percentage1;
    data[1] = percentage2;
    data[2] = percentage3;

    console.log('THIS IS DATA FOR PIE CHART');
    console.log(data)

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

        <View style={styles.title}>
          <Text style={{ color: 'white', justifyContent: 'center', textAlign: 'center', fontSize: 30 }}>MOOD RESULTS</Text>
        </View>
        
        <View style={styles.chart}>
          <PieChart
              style={{ height: 125, width: 125 }}
              data={ pieData }
              />
        </View>

        <View>
          <Text style={styles.data}>
            {emotion1} - {percentage1}{"\n"}
            {emotion2} - {percentage2}{"\n"}
            {emotion3} - {percentage3}{"\n"}
          </Text>
        </View>

        <TouchableOpacity onPress={this._returnPlaylist}>
          <Text style={styles.button}>BACK TO PLAYLIST</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    top: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  chart: {
  },
  data: {
    color: 'white',
  },
  button: {
    color: 'white',
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  }
});