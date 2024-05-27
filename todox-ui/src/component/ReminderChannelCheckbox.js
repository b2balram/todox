import * as React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function ReminderChannelRadio({selectedValue, handleChange}) {

  const controlProps = (item) => ({
    checked: selectedValue[item],
    onChange: (e) => {handleChange({
      ...selectedValue,
      [item]: e.target.checked
    })},
    name: 'check-box',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
        <FormControlLabel value="inApp" control={<Checkbox {...controlProps("inApp")} color="success" />} label="In App" />
        <FormControlLabel value="email" control={<Checkbox {...controlProps("email")} color="success" />} label="Email" />
    </div>
  );
}
