import React from 'react';
import { StyleSheet, StatusBar, View, Alert } from 'react-native';

import {createTextMessage,createImageMessage,createLocationMessage} from './utils/MessageUtils';
import Status from './components/Status';
import MessageList from './components/MessageList';


export default class App extends React.Component {

     state = {
         messages:[

           createImageMessage('https://unsplash.it/300/300'),
           createLocationMessage({
             latitude: 29.6459,
             longitude:70.5919,
           }),
           createTextMessage('Check these messages'),
           createTextMessage('Hi Nadir'),
         ]
      };


  displayDeleteAlert = (id) => {
   return Alert.alert(
            'Confirm',
            'Do you want to delete this message?',
            [
              {
                 text: 'No',
                 style:'cancel'
              },

              {
                 text:'Yes',
                 style:'destructive',
                 onPress:() => {
                   const {messages} = this.state;
                   this.setState({
                     messages:messages.filter( message => message.id !== id)
                   });

                 },
              }
            ]
          );
 };

  handleMessagePress = ({id, type}) => {
     switch (type) {
       case 'text':
           this.displayDeleteAlert(id);
         break;
       default:

     }
  }

  renderMessageList(){
    const {messages} = this.state;
    return (
         <View style={styles.content}>
            <MessageList messages={messages} onPressMessage={this.handleMessagePress} />
         </View>
      );
   }

   renderInputMethodEditor(){
     return (
         <View style={styles.inputMethodEditor}></View>
      );
   }

   renderToolbar() {
     return (
      <View style={styles.toolbar}></View>
    );
   }

   render() {
     return(
       <View style={styles.container}>
           <Status />
           {this.renderMessageList()}

       </View>
     );
   }
}

const styles=StyleSheet.create({

    container: {
       flex: 1,
       backgroundColor: 'white',
    },

    content: {
      flex: 1,
      backgroundColor: 'white',
    },

    inputMethodEditor: {
        flex: 1,
        backgroundColor: 'white',
     },

     toolbar: {
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.04)',
      backgroundColor: 'white',
    },

  });
