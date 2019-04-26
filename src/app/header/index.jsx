import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Link } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      color: '#D50000',
      // marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    // appBarShift: {
    //   marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    // },
    // menuButton: {
    //   marginLeft: 12,
    //   marginRight: 36,
    // },
    hide: {
      display: 'none',
    },
    drawer: {
      zIndex: 0,
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing.unit * 7 + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9 + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
  }),
  { defaultTheme: theme },
);

const links = [{ path: '/', caption: 'Home' }, { path: '/template', caption: 'Template App' }];

function Header() {
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(true);

  function handleDrawerOpen() {
    setOpen(!open);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classNames(classes.appBar)}>
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            UNJ App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        <List>
          {links.map((link, index) => (
            <ListItem button key={link.caption} component={Link} to={link.path}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={link.caption} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default Header;
