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
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import TodoFormDialog from './TodoFormDialog';
import { fetchAll } from '../actions/todoActions';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import dayjs from 'dayjs';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Icon } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PersonIcon from '@mui/icons-material/Person';
import { priorityColors } from '../constant';
import { useUser } from '@descope/react-sdk';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomAppBar() {

  const [open, setOpen] = React.useState(0);
  const [todoList, setTodoList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [activeFormData, setActiveFormData] = React.useState({});
  const { user } = useUser();

  React.useEffect(() => {
    setLoading(true);
    fetchAll().then(res => {
      console.log("res..", res)
      setTodoList(res.data);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log("Error while fetching todo list.", err)
    })
  }, [open])

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          <strong>TODOX</strong>
        </Typography>
        <List sx={{ mb: 2 }}>
          
          {todoList.map((todo) => (
            <React.Fragment key={todo._id}>
              {todo._id === 1 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Today
                </ListSubheader>
              )}
              {todo._id === 3 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Yesterday
                </ListSubheader>
              )}
              <ListItemButton>
                <ListItemAvatar>
                  <ArrowUpwardIcon color={priorityColors[todo.priority]} />
                  <AssignmentIcon/>
                </ListItemAvatar>
                <ListItemText primary={todo.title} secondary={todo.description} />
                <span style={{float: 'right'}}>{dayjs(todo.dueDate).toString()}</span>
                <IconButton onClick={() => {setActiveFormData(todo); setOpen(2)}}>
                  <EditIcon/>
                </IconButton>
                <IconButton onClick={() => {setActiveFormData(todo); setOpen(2)}}>
                  <CancelIcon/>
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
          <StyledFab color="secondary" aria-label="add" onClick={() => {setOpen(1)}}>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
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
