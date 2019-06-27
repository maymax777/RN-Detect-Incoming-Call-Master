/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {PermissionsAndroid,Alert, Platform, StyleSheet, Text, View, NativeModules, TextInput, TouchableOpacity} from 'react-native';
import CallDetectionManager from './CallDetectionManager';

var callDetector = undefined;

//. request phone call permission
async function requestPhoneCallPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: 'Phone Call Service Permission',
        message:
          'Aceess to phone call service.' ,          
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the phone call');      
    } else {
      console.log('phone call permission denied');      
    }
  } catch (err) {
    console.warn(err);     
  }
}



//////////////////////////////////////////////////////////////////////////////////////////
type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={
      greetingMessage :"init state..",
      callState :[],      
    };
    this.startListenerTapped = this.startListenerTapped.bind(this);
  }

  componentWillMount(){        
  }
  componentDidMount(){
    requestPhoneCallPermission();
  }

  

  startListenerTapped(){    
    this.setState({greetingMessage : 'listening state..'});
    callDetector = new CallDetectionManager((event, number) =>{
      console.log(event + ' ' + number);
      if(number != null)
        this.setState({greetingMessage : number});            
      else
        this.setState({greetingMessage : 'listening state..'});            
    },
    true,
    ()=>{},
    {
      title : 'Phone State Permission',
      message : 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
    });
  }

  greetUserCallback = () =>{
    const state = this.state;        
    CallDetectionManager.greetUser(state.userName, this.displayResult);        
    //console.log(state.userName);
  }

  displayResult = (result)=>{    
    this.setState({greetingMessage : result});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>Detecting Incoming Calls</Text>
        <Text style={styles.instructions}>Press Button To Listen</Text>        
        <Text style={styles.welcome}>*{this.state.greetingMessage}*</Text>
        <TouchableOpacity onPress={this.startListenerTapped} >        
          <Text style={styles.start_button}>Start Listen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color : '#2AAB2B',
  },
  instructions: {
    textAlign: 'center',
    color: '#73A3A3',
    marginBottom: 5,
    fontSize : 18,
  },
  start_button : {
    backgroundColor : '#326212',
    color : '#EEFFEE',
    fontSize : 20,
    margin :15,
    padding : 15,    
  },
});
