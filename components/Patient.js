
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';

const styles = {
  background: {
    width: 360,
    height: 550,
    background: "#F0F4F8",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "box-shadow": "0px 3px 6px #F6F6F6"
  },
  card: {
    width: 315,
    height: 487,
    background: "#FFFFFF",
    "box-shadow": "#BCCCDC"
  }
};

const Patient = props => ({

  render() {
    let { classes } = props;
    return(
      <div className = {classes.background}>
        <div className = {classes.card}></div>
      </div>
    );
  }
});

export default withStyles(styles)(Patient);