import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const useStyles = makeStyles(theme => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

const actions = [
  { icon: <i className="fas fa-car fa-lg"></i>, name: 'driving' },
  { icon: <i className="fas fa-bus fa-lg"></i>, name: 'transit' },
  { icon: <i className="fas fa-walking fa-lg"></i>, name: 'walking' },
  { icon: <i className="fas fa-bicycle fa-lg"></i>, name: 'bicycling' },
];

export default function SpeedDials(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [chosenAction, setChosenAction] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const chooseAction = index => {
    setChosenAction(index);
    props.changeTravelMode(actions[index].name);
    handleClose();
  };
  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
        id="transportSpeedDial"
          ariaLabel="Choose transport"
          className={classes.speedDial}
          icon={actions[chosenAction].icon}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
          {actions.map((action, index) => {
            if (index !== chosenAction) {
              return (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => chooseAction(index)}
                />
              );
            }
          })}
        </SpeedDial>
      </div>
    </div>
  );
}
