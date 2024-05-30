import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
import TodoFormDialog from './TodoFormDialog';
import { cancelTodo, fetchAll, deleteTodo } from '../actions/todoActions';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import dayjs from 'dayjs';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PersonIcon from '@mui/icons-material/Person';
import { priorityColors } from '../constant';
import { useUser } from '@descope/react-sdk';
import Novu from './Novu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Divider } from '@mui/material';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

function timeDifference(previous) {

  var current = new Date()
  previous = new Date(previous)

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = previous - current;

  if (elapsed < msPerMinute) {
       return Math.round(elapsed/1000) + ' seconds';   
  }

  else if (elapsed < msPerHour) {
       return Math.round(elapsed/msPerMinute) + ' minutes';   
  }

  else if (elapsed < msPerDay ) {
       return Math.round(elapsed/msPerHour ) + ' hours';   
  }

  else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed/msPerDay) + ' days';   
  }

  else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months';   
  }

  else {
      return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years';   
  }
}

export default function BottomAppBar() {

  const [open, setOpen] = React.useState(0);
  const [todoList, setTodoList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [activeFormData, setActiveFormData] = React.useState(undefined);
  const { user } = useUser();

  React.useEffect(() => {
    refresh()
  }, [open])

  const refresh = () => {
    setLoading(true);
    fetchAll().then(res => {
      console.log("res..", res)
      setTodoList(res.data);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log("Error while fetching todo list.", err)
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          <strong>TodoX</strong>
        </Typography>
        <List sx={{ mb: 2 }}>
          
          {todoList.map((todo) => (
            <React.Fragment key={todo._id}>
              <ListItemButton>
                <ListItemAvatar>
                <ArrowUpwardIcon color={priorityColors[todo.priority]} fontSize='large' />
                </ListItemAvatar>
                <ListItemText primary={todo.title} secondary={todo.description} />
                <span>due in {timeDifference(todo.dueDate)}</span>
                {todo.reminder.enabled && <NotificationsActiveIcon color='primary'/>}
                <IconButton onClick={() => {setActiveFormData(todo); setOpen(2)}}>
                  <EditIcon/>
                </IconButton>
                <IconButton disabled={todo.status == 2} onClick={() => {
                  cancelTodo(todo).then(res => {
                    refresh();
                  })
                }}>
                  <CancelIcon/>
                </IconButton>
                <IconButton onClick={() => {
                  deleteTodo(todo).then(res => {
                    refresh();
                  })
                }}>
                  <DeleteIcon/>
                </IconButton>
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <AssignmentTurnedInIcon />
          </IconButton>
          <StyledFab aria-label="add" onClick={() => {setActiveFormData(undefined); setOpen(1)}}>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Novu subscriberId={user.email}/>
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
          <span>{user.name}</span>
        </Toolbar>
      </AppBar>
      <TodoFormDialog open={open} setOpen={setOpen} data={activeFormData}/>
    </React.Fragment>
  );
}
