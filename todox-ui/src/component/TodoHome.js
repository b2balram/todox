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
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          TODOX
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
                  <Avatar alt="Profile Picture" />
                </ListItemAvatar>
                <ListItemText primary={todo.title} secondary={todo.description} />
                <IconButton onClick={() => {setActiveFormData(todo); setOpen(2)}}>
                  <EditIcon/>
                </IconButton>
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add" onClick={() => {setOpen(1)}}>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TodoFormDialog open={open} setOpen={setOpen} data={activeFormData}/>
    </React.Fragment>
  );
}
