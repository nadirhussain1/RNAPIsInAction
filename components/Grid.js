import {StyleSheet,FlatList,Dimensions,PixelRatio} from 'react-native'
import React from 'react';
import PropTypes from 'prop-types'


export default class Grid extends React.Component{
   static propTypes={
     numColumns:PropTypes.number,
     itemMargin:PropTypes.number,
     renderItem:PropTypes.func.isRequired,
   }

   static defaultProps={
      numColumns:4,
      itemMargin:StyleSheet.hairlineWidth,
   }

   renderGridItem = (info) =>{

         const {itemMargin, numColumns, renderItem} = this.props;
         const {index} = info;
         const {width} = Dimensions.get('window');

         const columnSize = (width- itemMargin*(numColumns-1))/numColumns;
         const size = PixelRatio.roundToNearestPixel(columnSize);

         const marginLeft = (index%numColumns) === 0 ? 0 : itemMargin;
         const marginTop = (index < numColumns) === 0 ? 0 : itemMargin;

         return renderItem({...info,size,marginLeft,marginTop});

   }

   render(){
     return <FlatList {...this.props} renderItem={this.renderGridItem} />
   }
}
