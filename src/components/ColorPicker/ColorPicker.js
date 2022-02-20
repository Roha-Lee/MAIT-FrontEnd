import React, { useState, useEffect } from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'
function ColorPicker({setColor, pickerColor, setPickerColor, displayColorPicker, setDisplayColorPicker}) {
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setPickerColor(color.rgb)
    setColor(color.hex.substr(1))
    handleClose();
  };
    
  const styles = reactCSS({
    'default': {
      color: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: `rgba(${ pickerColor.r }, ${ pickerColor.g }, ${ pickerColor.b })`,
      },
      swatch: {
        padding: '5px',
        borderRadius: '50%',
        background: '#fff',
      
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
