import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import green from '@material-ui/core/colors/green';
import TemplateContext from "../../../context/templateContext";
import Template from './templateitem'

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'paper',
    width: "100 %",
    position: 'relative',
    minHeight: 200,
  },
  fabGreen: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

function Templates() {
  const context = useContext(TemplateContext)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  const transitionDuration = {
    enter: 225,
    exit: 195,
  };

  const tabs = context.config
  return (
    tabs &&
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {tabs.files.map(tab => <Tab
            key={tabs.files.indexOf(tab)} label={tab} />)}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={'x' === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.files.map(file =>
          <TabContainer key={tabs.files.indexOf(file)} dir={'x'}>
            <Template
              key={tabs.files.indexOf(file)} folder={tabs.folder} file={file}
            />
          </TabContainer>
        )}
      </SwipeableViews>
      {tabs.files.map(file =>
        <Zoom
          key={tabs.files.indexOf(file)}
          in={value === tabs.files.indexOf(file)}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === tabs.files.indexOf(file) ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab color={"primary"}>
            <AddIcon />
          </Fab>
        </Zoom>
      )}
    </div >
  );
}

export default Templates;