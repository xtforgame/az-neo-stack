// @flow weak

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(3),
    width: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  flex1: {
    flex: 1,
  },
}));

export default (props) => {
  const {
    onToggleMenu = () => {},
    onToggleNotificationPanel = () => {},
  } = props;

  const [t] = useTranslation('app-common');
  // console.log('============t("appTitle") :', t('appTitle'));
  // useEffect(() => {
  //   console.log('useEffect ===== t("appTitle") :', t('appTitle'));
  // }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" className={classes.menuButton} onClick={onToggleMenu} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex1}>
            {t('appTitle')}
          </Typography>
          <IconButton color="inherit" onClick={onToggleNotificationPanel} aria-label="NotificationList">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
