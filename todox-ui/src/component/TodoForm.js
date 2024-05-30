import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TodoxDateTimePicker from './TodoxDateTimePicker';
import PriorityRadio from './Radio/PriorityRadio';
import dayjs from 'dayjs';
import RecurringRadio from './Radio/RecurringRadio';
import { FormControlLabel, Switch } from '@mui/material';
import ReminderChannelRadio from './ReminderChannelCheckbox';

export default function TodoForm({setFormState, formState}) {
    formState = formState?formState:{
        title: "",
        description: "",
        dueDate: new Date(),
        priority: 0,
        status: 0,
        recur: {
            enabled: false,
            mode: 1
        },
        reminder: {
            enabled: false,
            channels: {
                inApp: true,
                email: false
            },
            beforeHour: 0
        }
    }

    const [title, setTitle] = React.useState(formState?.title);
    const [description, setDescription] = React.useState(formState?.description);
    const [dueDate, setDueDate] = React.useState(formState?.dueDate);
    const [priority, setPriority] = React.useState(formState?.priority);
    const [status, setStatus] = React.useState(formState?.status);
    const [recur, setRecur] = React.useState(formState?.recur);
    const [reminder, setReminder] = React.useState(formState?.reminder)

    React.useEffect(() => {
        setFormState({
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status,
            recur: recur,
            reminder: reminder
        })
    }, [title, description, dueDate, priority, status, recur, reminder])

  return (
    <Box
    >
      <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            value={title}
            fullWidth
            variant="standard"
            onChange={e => {
                setTitle(e.target.value)
            }}
        />
        <br/>
        <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            value={description}
            fullWidth
            variant="standard"
            onChange={e => {
                setDescription(e.target.value)
            }}
        />
        <br/><br/>
        <TodoxDateTimePicker label="Due Date" value={dayjs(dueDate)} onChange={(value) => setDueDate(value)}/>
        <br/>
        <PriorityRadio selectedValue={priority} handleChange={e => {console.log(e.target.value); setPriority(e.target.value)}}/>
        <br/>
        <FormControlLabel control={
            <Switch checked={recur?.enabled} onChange={e => setRecur({...recur, enabled: e.target.checked})} size="small" inputProps={{ 'aria-label': 'controlled' }}/>
        } label="Recurring"/>
        {recur?.enabled && <>
            <br/><br/>
            <RecurringRadio selectedValue={recur?.mode} handleChange={e => {setRecur({...recur, mode: Number(e.target.value)})}}/>
        </>
        }
        <br/>
        <FormControlLabel control={
        <Switch checked={reminder?.enabled} onChange={e => setReminder({...reminder, enabled: e.target.checked})} size="small" inputProps={{ 'aria-label': 'controlled' }} />
        } label="Reminder"/>
        {reminder?.enabled && <>
            <br/><br/>
            <ReminderChannelRadio selectedValue={reminder.channels} handleChange={value => {setReminder({...reminder, channels: value})}}/>
            <TextField
                required
                margin="dense"
                id="Before Hours"
                name="Before Hours"
                label="Before Hours"
                type="number"
                value={reminder?.beforeHour}
                fullWidth
                variant="standard"
                onChange={e => {
                    setReminder({...reminder, beforeHour: e.target.value})
                }}
            />
        </>
        }
    </Box>
  );
}