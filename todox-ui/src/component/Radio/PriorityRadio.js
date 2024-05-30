import * as React from 'react';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';

export default function PriorityRadio({selectedValue, handleChange}) {

  const controlProps = (item) => ({
    checked: selectedValue == item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
        <span><strong>Priority</strong></span>
        <br/>
      <FormControlLabel label="Low" control={<Radio {...controlProps(0)} color="success"/>}/>
      <FormControlLabel label="Medium" control={<Radio {...controlProps(1)} color="warning"/>}/>
      <FormControlLabel label="High" control={<Radio {...controlProps(2)} color="error"/>}/>
    </div>
  );
}
