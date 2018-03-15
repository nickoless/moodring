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

  // CHANGES STATE TO PLAYLIST SCREEN
  _returnPlaylist = () => {
    this.props.setScreen('PLAYLIST');
  };

  _dataReturn = () => {

    // EMOTION VARIABLES TOTAL PERCENTAGE
    let emotionTotal = (this.props.percentage[0] + this.props.percentage[1] + this.props.percentage[2]);

    // LABEL VARIABLES TOTAL PERCENTAGE
    let labelTotal = (this.props.labelsPercentage[0] + this.props.labelsPercentage[1] + this.props.labelsPercentage[2]);

    // PIE CHART DATA ARRAY
    const data =[]

    // RETURN RESULTS FOR EMOTIONS
    if (this.props.face) {
      data[0] = Math.floor((this.props.percentage[0]/emotionTotal) * 100);
      data[1] = Math.floor((this.props.percentage[1]/emotionTotal) * 100);
      data[2] = Math.floor((this.props.percentage[2]/emotionTotal) * 100);

      _parsedData = () => {
        return (
        <View>
          <Text style={styles.data}>
            {this.props.emotions[0]} - {data[0]}%{"\n"}{"\n"}
            {this.props.emotions[1]} - {data[1]}%{"\n"}{"\n"}
            {this.props.emotions[2]} - {data[2]}%{"\n"}{"\n"}
            Estimated Age - {this.props.age}
          </Text>
        </View>
        )
      }

    // RETURN RESULTS FOR LABELS
    } else {
      data[0] = Math.floor((this.props.labelsPercentage[0]/labelTotal) * 100);
      data[1] = Math.floor((this.props.labelsPercentage[1]/labelTotal) * 100);
      data[2] = Math.floor((this.props.labelsPercentage[2]/labelTotal) * 100);

      _parsedData = () => {
        return (
        <View>
          <Text style={styles.data}>
            {this.props.labels[0]} - {data[0]}%{"\n"}{"\n"}
            {this.props.labels[1]} - {data[1]}%{"\n"}{"\n"}
            {this.props.labels[2]} - {data[2]}%{"\n"}{"\n"}
          </Text>
        </View>
        )
      }
    }

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

    // FUNCTION RETURN WITH MODUAL FOR EMOTION OR LABEL
    return (
      <View>
        <View style={styles.chart}>
            <PieChart
            style={{ height: 125, width: 125 }}
            data={ pieData }
            />
        </View>
        {_parsedData()}
      </View>
    )
  }

  // FINAL RENDER
  render() {
    return (
      <View style={styles.container}>
        
        <LinearGradient colors={this.props.backgroundColor} style={{ position: 'absolute', height: 900, width: 400 }} />

        <View style={styles.title}>
          <Text style={{ color: 'white', justifyContent: 'center', textAlign: 'center', fontSize: 30 }}>MOOD RESULTS</Text>
        </View>
        
        {this._dataReturn()}

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
    margin: 10,
  },
  data: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
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