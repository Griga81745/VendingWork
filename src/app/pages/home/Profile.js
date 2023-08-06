import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { toAbsoluteUrl } from "app/utils/index";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  Checkbox,
  makeStyles,
  Box,
  Tooltip,
  Grid,
  TableFooter,
  Divider,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Hidden,
  Fade,
  Menu,
  MenuItem,
  withStyles, IconButton, AccordionSummary, AccordionDetails, Accordion
} from "@material-ui/core";

import ProfileTabs from "../../components/Profile/ProfileTabs";
import FinanceTabs from "../../components/Profile/FinanceTabs";
import MembersTabs from "../../components/Profile/MembersTabs";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionHead from "../../components/CreateCampaign/Accordion/AccordionHead";

const useStyles = makeStyles({
  menuItem: {
    fontWeight: 500,
    fontSize: "12px",
    minHeight: "auto"
  },
  AccordionSummary: {
    minHeight: '64px',
    padding: 0
  },
});

const Profile = props => {
  const [currentMenu, setCurrentMenu] = useState(1);

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(['panel1', 'panel2', 'panel3', 'panel4', 'panel5', 'panel6']);
  const handleChange = panel => (event, isExpanded) => {
    let ar = [...expanded];
    if (ar.indexOf(panel) == -1) {
      ar.push(panel);
    } else {
      let arrr = ar.filter(item => item != panel);
      ar = arrr;
    }
    setExpanded(ar);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className={'mx-2'}>
            <Accordion expanded={expanded.indexOf('panel2') > -1}
              onChange={() => handleChange('panel2')}
              className={'px-md-3 px-2 mt-3'}
              elevation={1}
            >
              <AccordionSummary
                expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel2')}><ExpandMoreIcon /></IconButton>}
                aria-controls="panel1bh-content"
                className={'px-0'}
                classes={{ root: classes.AccordionSummary }}
              >
                <AccordionHead name={"Настройки доступа"} numb={'1'} />
              </AccordionSummary>
              <AccordionDetails className={'flex-column container-fluid nol pt-0 pb-3'}>
                <MembersTabs />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded.indexOf('panel3') > -1}
              onChange={() => handleChange('panel3')}
              className={'px-md-3 px-2 mt-3'}
              elevation={1}
            >
              <AccordionSummary
                expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel3')}><ExpandMoreIcon /></IconButton>}
                aria-controls="panel1bh-content"
                className={'px-0'}
                classes={{ root: classes.AccordionSummary }}
              >
                <AccordionHead name={"Данные пользователя"} numb={'2'} />
              </AccordionSummary>
              <AccordionDetails className={'flex-column container-fluid nol pt-0 pb-3'}>
                <ProfileTabs />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded.indexOf('panel1') > -1}
              onChange={() => handleChange('panel1')}
              className={'px-md-3 px-2 my-3'}
              elevation={1}
            >
              <AccordionSummary
                expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel1')}><ExpandMoreIcon /></IconButton>}
                aria-controls="panel1bh-content"
                className={' px-0'}
                classes={{ root: classes.AccordionSummary }}
              >
                <AccordionHead name={"Баланс"} numb={'3'} />
              </AccordionSummary>
              <AccordionDetails className={'flex-column container-fluid nol pt-0 pb-3'}>
                <FinanceTabs />
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
