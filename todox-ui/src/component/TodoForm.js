import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TodoxDateTimePicker from './TodoxDateTimePicker';
import PriorityRadio from './PriorityRadio';

export default function TodoForm({setFormState, formState}) {
    const [title, setTitle] = React.useState(formState?.title);
    const [description, setDescription] = React.useState(formState?.description);
    const [dueDate, setDueDate] = React.useState(formState?.dueDate);
    const [priority, setPriority] = React.useState(formState?.priority);
    const [status, setStatus] = React.useState(formState?.status);

    React.useEffect(() => {
        setFormState({
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status
        })
    }, [title, description, dueDate, priority, status])

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
            autoFocus
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
        <TodoxDateTimePicker label="Due Date" onChange={(value) => setDueDate(value)}/>
        <br/>
        <PriorityRadio selectedValue={priority} handleChange={e => {console.log(e.target.value); setPriority(e.target.value)}}/>
    </Box>
  );
}