import React, { useState, useEffect } from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'
function ColorPicker({setColor}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [pickerColor, setPickerColor] = useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  });
  
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setPickerColor(color.rgb)
    setColor(color.hex.substr(1))
  };
    
  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ pickerColor.r }, ${ pickerColor.g }, ${ pickerColor.b })`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        background: '#fff',
        padding: '10px',
        borderRadius: '5px',
        position: 'absolute',
        zIndex: '2',
        
      },
    },
  });

  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ styles.color } />
      </div>
        { displayColorPicker ? <div style={ styles.popover }>
      <div style={ styles.cover } onClick={ handleClose }/>
        <CirclePicker color={ pickerColor } onChange={ handleChange }/>
      </div> : null }
    </div>
  ); 
}

export default ColorPicker
// class ColorPicker extends React.Component {
//   state = {
//     displayColorPicker: false,
//     color: {
//       r: '241',
//       g: '112',
//       b: '19',
//       a: '1',
//     },
//   };

//   handleClick = () => {
//     this.setState({ displayColorPicker: !this.state.displayColorPicker })
//   };

//   handleClose = () => {
//     this.setState({ displayColorPicker: false })
//   };

//   handleChange = (color) => {
//     this.setState({ color: color.rgb })
//     this.props.setColor(color.hex.substr(1))
//   };

//   render() {

//     const styles = reactCSS({
//       'default': {
//         color: {
//           width: '36px',
//           height: '14px',
//           borderRadius: '2px',
//           background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b })`,
//         },
//         swatch: {
//           padding: '5px',
//           background: '#fff',
//           borderRadius: '1px',
//           boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
//           display: 'inline-block',
//           cursor: 'pointer',
//         },
//         popover: {
//           background: '#fff',
//           padding: '10px',
//           borderRadius: '5px',
//           position: 'absolute',
//           zIndex: '2',
          
//         },
//       },
//     });

//     return (
//       <div>
//         <div style={ styles.swatch } onClick={ this.handleClick }>
//           <div style={ styles.color } />
//         </div>
//         { this.state.displayColorPicker ? <div style={ styles.popover }>
//         <div style={ styles.cover } onClick={ this.handleClose }/>
//           <CirclePicker color={ this.state.color } onChange={ this.handleChange }/>
//         </div> : null }
//       </div>
//     )
//   }
// }

