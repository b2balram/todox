import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

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
      <Radio {...controlProps(0)} color="success" />
      <Radio {...controlProps(1)} color="default" />
      <Radio
        {...controlProps(2)}
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}
      />
    </div>
  );
}
