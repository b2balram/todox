import * as React from 'react';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';

export default function RecurringRadio({selectedValue, handleChange}) {

  const controlProps = (item) => ({
    checked: selectedValue == item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
        <FormControlLabel value="daily" control={<Radio {...controlProps(1)} color="success" />} label="Daily" />
        <FormControlLabel value="weekly" control={<Radio {...controlProps(2)} color="success" />} label="Weekly" />
        <FormControlLabel value="monthly" control={<Radio {...controlProps(3)} color="success" />} label="Monthly" />
    </div>
  );
}
