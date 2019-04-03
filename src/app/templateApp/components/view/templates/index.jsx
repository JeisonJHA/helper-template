import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import TemplateContext from '../../../context/templateContext';
import Template from './templateitem';

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

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'paper',
    width: '100 %',
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
  const context = useContext(TemplateContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  const tabs = context.config;
  return (
    tabs && (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {tabs.files.map((file, index) => (
              <Tab key={index} label={file.name} />
            ))}
          </Tabs>
        </AppBar>
        <SwipeableViews axis="x" index={value} onChangeIndex={handleChangeIndex}>
          {tabs.files.map((file, index) => (
            <TabContainer key={index} dir="x">
              <Template
                key={index}
                folder={tabs.folder}
                file={file.name}
                type={file.type}
                name={file.nameAlias ? file.nameAlias : undefined}
              />
            </TabContainer>
          ))}
        </SwipeableViews>
      </div>
    )
  );
}

export default Templates;
