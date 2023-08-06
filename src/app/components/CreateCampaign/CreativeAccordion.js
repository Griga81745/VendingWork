import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import {
  IconButton,
  Tab as TabM, Accordion, AccordionDetails, AccordionSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThirdTab from './ThirdTab';
import '../../../_metronic/_assets/scss/default.scss';
import '../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss';
import AccordionHead from "./Accordion/AccordionHead";
import 'moment/locale/ru';

const CreativesAccordion = (props) => {
  const classes = useStyles();
  const expanded = props.expanded;
  const handleChange = props.handleChange;
  const setting = props.setting;
  const filter = props.filter;
  const updateSetting = props.updateSetting;
  const choosedBoards = props.choosedBoards;
  const options = props.options;

  const [choosedBoardsLength, setChoosedBoardsLength] = useState(0);
  useEffect(() => {
    setChoosedBoardsLength(Object.keys(choosedBoards).length)
  }, [choosedBoards]);
  return (
    <Accordion disabled={!choosedBoardsLength}
      expanded={expanded.indexOf('panel5') > -1 && !!choosedBoardsLength}
      onChange={() => {
        if (expanded.indexOf('panel5') == -1) handleChange('panel5');
      }}
      elevation={2}
      style={{ marginBottom: 28 }}
      className={'px-2 px-md-3'}
    >
      <AccordionSummary
        expandIcon={
          <IconButton className={'ExpandArrow'} onClick={handleChange('panel5')}>
            <ExpandMoreIcon />
          </IconButton>
        }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        classes={{ root: classes.AccordionSummary }}>
        <AccordionHead name={"Креативы"} numb={'4'} classes={classes} />
      </AccordionSummary>
      <AccordionDetails className={`flex-column px-0 pt-0`}>
        {options !== null && !!choosedBoardsLength && (

          <ThirdTab
            type={'list'}
            choosedBoards={choosedBoards}
            uploadedFiles={props.uploadedFiles}
            setUploadedFiles={props.setUploadedFiles}
            setPictures={props.setPictures}
            filter={filter}
            duration={filter.duration}
            key={'ThirdTab1'}
            checkUp={'create'}
            setting={setting}
            updateSetting={updateSetting}
            choosedCreatives={props.choosedCreatives}
            addFileToCamp={props.addFileToCamp}
            freeShowsAllboards={props.freeShowsAllboards}
          />

        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CreativesAccordion;
