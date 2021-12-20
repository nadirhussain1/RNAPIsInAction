import React from 'react';
import { StyleSheet, StatusBar, View, Alert,Image,TouchableHighlight , BackHandler} from 'react-native';

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
         ],

         fullScreenImageId:null
      };

  componentDidMount(){
    this.subscription = BackHandler.addEventListener('hardwareBackPress', ()=> {
        const {fullScreenImageId} = this.state

        if(fullScreenImageId){
          this.dismissFullScreen()
          return true
        }
        return false

    });
  }

  componentWillUnmount(){
    this.subscription.remove()
  }


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

  handleMessagePress = ({id, type,text,uri}) => {
     switch (type) {
       case 'text':
           this.displayDeleteAlert(id);
           break;
       case 'image':
            this.setState({fullScreenImageId:id})

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

   renderFullScreenImage(){
      if(fullScreenImageId){
        return
      }

      const {messages,fullScreenImageId} = this.state
      const image = messages.find( message => message.id == fullScreenImageId)

      if(image==null){
        return
      }

      const {uri} = image

      return(
        <TouchableHighlight style={styles.fullScreenOverlay} onPress={this.dismissFullScreen}>
          <Image style={styles.fullScreenImage} source= {{uri}} />
        </TouchableHighlight>
      )
   }

   dismissFullScreen = () => {
     this.setState({fullScreenImageId:null})
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
           {this.renderToolbar()}
           {this.renderInputMethodEditor()}
           {this.renderFullScreenImage()}

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

    fullScreenImage: {
     flex:1,
     resizeMode:'contain'
   },

   fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'black',
    zIndex:2,
  },

  });
