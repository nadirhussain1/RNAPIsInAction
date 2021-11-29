import React from 'react';
import {StyleSheet, Platform, StatusBar,View,Text} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {getStatusBarHeight} from 'react-native-status-bar-height';



export default class Status extends React.Component{

   state={
     info:'',
   };

   handleChange= (status) => {
      const info = status.isConnected ? 'yes' : 'none';
      this.setState({info});
   }

   async componentDidMount(){
      this.subscription = NetInfo.addEventListener(this.handleChange)

       NetInfo.fetch().then(status => {
           const info = status.isConnected ? 'yes' : 'none';
           this.setState({info});
       });
   }

   componentWillUnmount(){
     this.subscription();
   }


   render(){
      const{info} = this.state;

      const isConnected = info !=='none';
      const backgroundColor = isConnected ? 'white' : 'red';
      const statusBar = (
        <StatusBar
          backgroundColor = {backgroundColor}
          barStyle = {isConnected ? 'dark-content' : 'light:content'}
          animated={false}
        />
      );

      const messageContainer = (
        <View style={styles.messageContainer} pointerEvents={'none'}>
            {statusBar}
            {!isConnected && (
                <View style={styles.bubble}>
                   <Text style={styles.text}>No network connection</Text>
               </View>
             )}
         </View>
      );


        return messageContainer;


   }




}


const statusHeight=(Platform.OS === 'ios' ? getStatusBarHeight() : 0);

const styles = StyleSheet.create({

  status:{
    zIndex:1,
    height:statusHeight,
  },

  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },

  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
   },

  text: {
    color: 'white',
  },
});
