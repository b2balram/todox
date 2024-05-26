import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Container } from '@mui/material';
import TodoForm from './TodoForm';
import {createTodo} from '../actions/todoActions'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TodoFormDialog({open, setOpen, data}) {

    const [formState, setFormState] = React.useState({});

    React.useEffect(() => {
        setFormState(data);
    }, [data])

  const handleClose = () => {
    setOpen(0);
  };

  const handleOnSubmit = () => {
    createTodo(formState);
  }


  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open>0}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleOnSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <br/>
        <Container>
            <TodoForm setFormState={setFormState} formState={data}/>
        </Container>
      </Dialog>
    </React.Fragment>
  );
}
