import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TodoFormDialog from './TodoFormDialog';
import { fetchAll, deleteTodo } from '../actions/todoActions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import { useUser } from '@descope/react-sdk';
import Novu from './Novu';
import TodoTable from './TodoTable';

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
        <TodoTable data={todoList} setActiveFormData={setActiveFormData} setOpen={setOpen} refresh={refresh} deleteTodo={deleteTodo}/>
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
