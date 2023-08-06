import React from "react";
import { IconButton, TextField, Tab as TabM } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import AccordionHead from "./Accordion/AccordionHead";

import FirstTab2 from "./FirstTab2";
import "../../../_metronic/_assets/scss/default.scss";
import "../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss";
import "moment/locale/ru";

const CampaignAccordion = (props) => {

  const {
    expanded, handleChange, classes, setting, filter, updateCompanyData,
    options, setHours, hours, setSetting, updateSetting
  } = props

  return (
    <Accordion expanded={expanded.indexOf('panel2') > -1}
      onChange={() => {
        if (expanded.indexOf('panel2') == -1) handleChange('panel2');
      }}
      className={'px-md-3 px-2 mt-3'}
      style={{ marginBottom: 28 }}
      elevation={2}
    >
      <AccordionSummary
        expandIcon={<IconButton className={'ExpandArrow'} key={'panel2key'}><ExpandMoreIcon /></IconButton>}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        onClick={e => {
          handleChange('panel2')
        }}
        classes={{ root: classes.AccordionSummary }}
      >
        <AccordionHead name={"Данные о кампании"} numb={'1'} classes={classes} />
      </AccordionSummary>
      <AccordionDetails className={'flex-column container-fluid nol pt-0 pb-3'}>
        <div className="py-0">
          <div className="text-md-left py-0">
            <TextField
              id="standard-basic"
              label="Название кампании"
              variant="outlined"
              helperText={setting.titleErrorText}
              //placeholder="Новая кампания"
              value={filter.title}
              fullWidth
              onChange={e => {
                updateCompanyData({ ...filter, title: e.target.value });
              }
              }
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
              //InputLabelProps={{
              //  shrink: true,
              //}}
              className={'minHeight70'}
            />
          </div>
        </div>

        <div className="py-0">
          <div className="text-md-left py-0">
            <TextField
              id="standard-basic"
              label="Название клиента"
              variant="outlined"
              value={filter.nameClient}
              onChange={e => {
                updateCompanyData({ ...filter, nameClient: e.target.value });
              }
              }
              helperText=""
              placeholder=""
              fullWidth
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
              className={'minHeight70'}
            />
          </div>
        </div>

        {options !== null &&
          <FirstTab2
            options={options}
            setHours={setHours}
            hours={hours}
            //setSize={setSize}
            filter={filter}
            // setDuration={setDuration}
            updateData={updateCompanyData}
            //  setPrevTab={() => setCurrentTab(1)}
            setNextTab={() => setSetting({ ...setting, currentTab: (setting.currentTab + 1) })}
            durationRadio={filter.durationRadio}
            updateSetting={updateSetting}
            setting={setting}
            key={"FirstTab2"}
          />
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default CampaignAccordion
