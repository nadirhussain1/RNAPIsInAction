import {StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';


const ToolBarButton = ({title, onPress}) => (
     <TouchableOpacity onPress={onPress}>
          <Text style={styles.button}>{title}</Text>
     </TouchableOpacity>
 );

ToolBarButton.propTypes = {
   title:PropTypes.string.isRequired,
   onPress:PropTypes.func.isRequired
 };

export default class Toolbar extends React.Component{

   static propTypes = {
     isFocused:PropTypes.bool.isRequired,
     onChangeFocus:PropTypes.func,
     onSubmit:PropTypes.func,
     onPressCamera:PropTypes.func,
     onPressLocation:PropTypes.func,
   };

   static defaultProps = {
      onChangeFocus: () => {},
      onSubmit : () => {},
      onPressCamera : () => {},
      onPressLocation: () => {},
   };

   state={
     text:'',
   }

   setInputRef = (ref) => {
     this.input=ref
   }

   componentWillReceiveProps(nextProps){
      if(nextProps.isFocused !== this.props.isFocused){

        if(nextProps.isFocused){
           this.input.focus() ;
        }else{
           this.input.blur();
        }

      }
   }

   handleChangeText = (text) =>{
     this.setState({text})
   }

   handleSubmitEditing = () =>{
     const {onSubmit} = this.props;
     const {text} = this.state;

     if(!text){
       return
     }

     onSubmit(text)
     this.setState({text:''})
   }



   handleFocus = () => {
     const{onChangeFocus} = this.props;

     onChangeFocus(true)
   }

   handleBlur = () => {
     const{onChangeFocus} = this.props;

     onChangeFocus(false)
   }


   render(){
     const {onPressCamera,onPressLocation} = this.props;
     const {text} = this.state

     return(
        <View style={styles.toolbar}>
            <ToolBarButton title={'📷'} onPress={onPressCamera} />
            <ToolBarButton title={'📍'} onPress={onPressLocation} />
            <View style={styles.inputContainer}>
                 <TextInput
                  style={styles.input}
                  underlineColorAndroid={'transparent'}
                  placeholder={'Type something!'}
                  blurOnSubmit={false}
                  value={text}
                  onChangeText={this.handleChangeText}
                  onSubmitEditing={this.handleSubmitEditing}
                  ref={this.setInputRef}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                 />
            </View>
        </View>
     )
   }

}

const styles = StyleSheet.create({

  toolbar:{
    flexDirection:'row',
    paddingHorizontal:20,
    paddingTop:10,
    alignItems:'center'
  },

  button:{
    marginRight:12,
    fontSize:20,
    color:'grey'
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
},

input: {
    flex: 1,
    fontSize: 16,
 },

});
