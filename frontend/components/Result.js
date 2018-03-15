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

    // EMOTION VARIABLES
    // let emotionPercentage1 = Math.floor(this.props.percentage[0]);
    // let emotionPercentage2 = Math.floor(this.props.percentage[1]);
    // let emotionPercentage3 = Math.floor(this.props.percentage[2]);

    let emotionTotal = (this.props.percentage[0] + this.props.percentage[1] + this.props.percentage[2]);
    let percentage1OutOfTotal = Math.floor((this.props.percentage[0]/emotionTotal) * 100);
    let percentage2OutOfTotal = Math.floor((this.props.percentage[1]/emotionTotal) * 100);
    let percentage3OutOfTotal = Math.floor((this.props.percentage[2]/emotionTotal) * 100);

    let emotion1 = this.props.emotions[0];
    let emotion2 = this.props.emotions[1];
    let emotion3 = this.props.emotions[2];

    // LABEL VARIABLES
    let labelTotal = (this.props.labelsPercentage[0] + this.props.labelsPercentage[1] + this.props.labelsPercentage[2]);
    let labelPercentage1 = Math.floor((this.props.labelsPercentage[0]/labelTotal) * 100);
    let labelPercentage2 = Math.floor((this.props.labelsPercentage[1]/labelTotal) * 100);
    let labelPercentage3 = Math.floor((this.props.labelsPercentage[2]/labelTotal) * 100);

    let label1 = this.props.labels[0];
    let label2 = this.props.labels[1];
    let label3 = this.props.labels[2];

    console.log('this.props.labelsPercentage[0]')
    console.log(this.props.labelsPercentage[0])
    console.log('THIS IS LABEL TOTAL')
    console.log(labelTotal);
    console.log('THIS IS LABELPERCENTAGE1')
    console.log(labelPercentage1)
    console.log('THIS IS LABELPERCENTAGE2')    
    console.log(labelPercentage2)
    console.log('THIS IS LABELPERCENTAGE3')    
    console.log(labelPercentage3)

    const data =[]
    const text = []

    if (this.props.face) {
      data[0] = percentage1OutOfTotal;
      data[1] = percentage2OutOfTotal;
      data[2] = percentage3OutOfTotal;
      text[0] = emotion1;
      text[1] = emotion2;
      text[2] = emotion3;
    } else {
      data[0] = labelPercentage1;
      data[1] = labelPercentage2;
      data[2] = labelPercentage3;
      text[0] = label1;
      text[1] = label2;
      text[2] = label3;
    }

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
        
        <LinearGradient colors={this.props.backgroundColor} style={{ position: 'absolute', height: 900, width: 400 }} />

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
            {text[0]} - {data[0]}%{"\n"}{"\n"}
            {text[1]} - {data[1]}%{"\n"}{"\n"}
            {text[2]} - {data[2]}%{"\n"}{"\n"}
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