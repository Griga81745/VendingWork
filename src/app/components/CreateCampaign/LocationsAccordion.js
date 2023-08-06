import
React, { useState } from "react";
//import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './styles';
import { Tabs, IconButton, AppBar, Tab as TabM, Icon, Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../../../_metronic/_assets/scss/default.scss"
import "../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss";
import "moment/locale/ru";
// import SwipeableViews from "react-swipeable-views";
import LocationSettings from "./LocationSettings";
import LocationDevices from "./LocationDevices";
import AccordionHead from "./Accordion/AccordionHead";

const LocationsAccordion = (props) => {

  const classes = useStyles()
  const expanded = props.expanded
  const handleChange = props.handleChange
  const setting = props.setting
  const filter = props.filter
  const setSetting = props.setSetting
  const updateSetting = props.updateSetting
  const boards = props.boards
  const anchorRef = props.anchorRef
  const handleCloseSearchCity = props.handleCloseSearchCity
  const city_list = props.city_list
  const updateCompanyData = props.updateCompanyData
  const getTypeBoardName = props.getTypeBoardName
  const marks = props.marks
  const choosedBoards = props.choosedBoards
  const setChoosedBoards = props.setChoosedBoards
  const options = props.options
  const setHours = props.setHours
  const hours = props.hoursTabs
  const updateChoosedBoards = props.updateChoosedBoards

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Accordion expanded={expanded.indexOf('panel4') > -1}
      onChange={() => {
        if (expanded.indexOf('panel4') == -1) {
          handleChange('panel4')
        }
        ;
      }}
      elevation={2}
      style={{ marginBottom: 28 }}
    >
      <AccordionSummary
        expandIcon={<IconButton className={'ExpandArrow'}
          onClick={handleChange('panel4')}><ExpandMoreIcon /></IconButton>}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        className={'mx-2 mx-md-3'}
        classes={{ root: classes.AccordionSummary }}
      >
        <AccordionHead name={"Локации и настройки проведения кампании"} numb={'3'} classes={classes} pos={"top"} />
      </AccordionSummary>

      <AccordionDetails className={'px-0 pt-0 flex-column'}>
        <AppBar position="static" elevation={0} color="default" className={`${classes.AppBar} px-2 px-md-3`}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            className={'w-100'}
            aria-label="full width tabs example"
          >
            <TabM icon={<div className={'d-flex align-items-center'}>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.33203 8.49955C1.33203 7.92289 1.40536 7.36422 1.5427 6.83022C1.91101 6.84958 2.2775 6.76672 2.60166 6.5908C2.92582 6.41488 3.19502 6.15274 3.3795 5.83338C3.56399 5.51402 3.65657 5.14986 3.64701 4.78117C3.63746 4.41247 3.52614 4.0536 3.32536 3.74422C4.13133 2.95126 5.12589 2.37655 6.21536 2.07422C6.38269 2.4032 6.63779 2.67946 6.95242 2.87243C7.26705 3.06539 7.62894 3.16752 7.99803 3.16752C8.36712 3.16752 8.72901 3.06539 9.04364 2.87243C9.35827 2.67946 9.61337 2.4032 9.7807 2.07422C10.8702 2.37655 11.8647 2.95126 12.6707 3.74422C12.4697 4.05365 12.3582 4.41266 12.3486 4.78153C12.339 5.15039 12.4316 5.51473 12.6162 5.83423C12.8007 6.15373 13.0701 6.41593 13.3945 6.59183C13.7189 6.76773 14.0856 6.85046 14.454 6.83088C14.5914 7.36422 14.6647 7.92289 14.6647 8.49955C14.6647 9.07622 14.5914 9.63489 14.454 10.1689C14.0857 10.1494 13.7191 10.2322 13.3948 10.408C13.0706 10.5839 12.8013 10.846 12.6167 11.1654C12.4321 11.4848 12.3395 11.849 12.349 12.2178C12.3586 12.5865 12.4699 12.9455 12.6707 13.2549C11.8647 14.0478 10.8702 14.6226 9.7807 14.9249C9.61337 14.5959 9.35827 14.3196 9.04364 14.1267C8.72901 13.9337 8.36712 13.8316 7.99803 13.8316C7.62894 13.8316 7.26705 13.9337 6.95242 14.1267C6.63779 14.3196 6.38269 14.5959 6.21536 14.9249C5.12589 14.6226 4.13133 14.0478 3.32536 13.2549C3.52637 12.9454 3.63785 12.5864 3.64748 12.2176C3.6571 11.8487 3.5645 11.4844 3.37991 11.1649C3.19531 10.8454 2.92593 10.5832 2.60157 10.4073C2.2772 10.2314 1.9105 10.1486 1.54203 10.1682C1.40536 9.63555 1.33203 9.07689 1.33203 8.49955ZM4.5347 10.4996C4.9547 11.2269 5.0747 12.0636 4.9107 12.8489C5.1827 13.0422 5.47203 13.2096 5.77536 13.3489C6.38648 12.8014 7.17824 12.499 7.9987 12.4996C8.8387 12.4996 9.62403 12.8136 10.222 13.3489C10.5254 13.2096 10.8147 13.0422 11.0867 12.8489C10.9183 12.0462 11.0522 11.2096 11.4627 10.4996C11.8724 9.78913 12.53 9.25499 13.3094 8.99955C13.3402 8.66693 13.3402 8.33217 13.3094 7.99955C12.5298 7.74426 11.8719 7.2101 11.462 6.49955C11.0515 5.78951 10.9177 4.95291 11.086 4.15022C10.8141 3.95683 10.5246 3.78943 10.2214 3.65022C9.61042 4.19751 8.81893 4.49996 7.9987 4.49955C7.17824 4.50012 6.38648 4.19766 5.77536 3.65022C5.47212 3.78943 5.18262 3.95684 4.9107 4.15022C5.07907 4.95291 4.94518 5.78951 4.5347 6.49955C4.12495 7.20997 3.46735 7.74412 2.68803 7.99955C2.6572 8.33217 2.6572 8.66693 2.68803 8.99955C3.4676 9.25485 4.12545 9.78901 4.53536 10.4996H4.5347ZM7.9987 10.4996C7.46827 10.4996 6.95956 10.2888 6.58448 9.91377C6.20941 9.53869 5.9987 9.02998 5.9987 8.49955C5.9987 7.96912 6.20941 7.46041 6.58448 7.08534C6.95956 6.71027 7.46827 6.49955 7.9987 6.49955C8.52913 6.49955 9.03784 6.71027 9.41291 7.08534C9.78798 7.46041 9.9987 7.96912 9.9987 8.49955C9.9987 9.02998 9.78798 9.53869 9.41291 9.91377C9.03784 10.2888 8.52913 10.4996 7.9987 10.4996ZM7.9987 9.16622C8.17551 9.16622 8.34508 9.09598 8.4701 8.97096C8.59513 8.84593 8.66536 8.67636 8.66536 8.49955C8.66536 8.32274 8.59513 8.15317 8.4701 8.02815C8.34508 7.90312 8.17551 7.83289 7.9987 7.83289C7.82189 7.83289 7.65232 7.90312 7.52729 8.02815C7.40227 8.15317 7.33203 8.32274 7.33203 8.49955C7.33203 8.67636 7.40227 8.84593 7.52729 8.97096C7.65232 9.09598 7.82189 9.16622 7.9987 9.16622Z"
                  fill={value === 0 ? "#0277BD" : "#78909C"} />
              </svg>
              <span style={{ marginLeft: 11 }} className={`${value === 0 ? "c0277BD" : "c455A64"}`}>Настройки</span>
            </div>} className={'w-50 borderBC0277BD'}>
            </TabM>
            <TabM icon={<div className={'d-flex align-items-center'}>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.33204 3.16667C1.33204 2.79867 1.63538 2.5 1.99338 2.5H14.004C14.3694 2.5 14.6654 2.79667 14.6654 3.16667V12.5C14.6654 12.868 14.362 13.1667 14.004 13.1667H1.99338C1.90613 13.1665 1.81977 13.1491 1.73927 13.1155C1.65876 13.0818 1.58569 13.0326 1.52424 12.9707C1.4628 12.9088 1.41419 12.8353 1.38121 12.7545C1.34822 12.6737 1.33152 12.5872 1.33204 12.5V3.16667ZM2.66538 3.83333V11.8333H13.332V3.83333H2.66538ZM3.33204 13.8333H12.6654V15.1667H3.33204V13.8333Z"
                  fill={value === 1 ? "#0277BD" : "#78909C"} />
              </svg>
              <span style={{ marginLeft: 11 }} className={`${value === 1 ? "c0277BD" : "c455A64"}`}>Устройства</span>
            </div>} className={'w-50 borderBC0277BD'}>
            </TabM>
            {/*<div className={'d-flex align-items-center w-100 justify-content-center'}>*/}
            {/*    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*        <path d="M1.33204 3.16667C1.33204 2.79867 1.63538 2.5 1.99338 2.5H14.004C14.3694 2.5 14.6654 2.79667 14.6654 3.16667V12.5C14.6654 12.868 14.362 13.1667 14.004 13.1667H1.99338C1.90613 13.1665 1.81977 13.1491 1.73927 13.1155C1.65876 13.0818 1.58569 13.0326 1.52424 12.9707C1.4628 12.9088 1.41419 12.8353 1.38121 12.7545C1.34822 12.6737 1.33152 12.5872 1.33204 12.5V3.16667ZM2.66538 3.83333V11.8333H13.332V3.83333H2.66538ZM3.33204 13.8333H12.6654V15.1667H3.33204V13.8333Z" fill="#78909C"/>*/}
            {/*    </svg>*/}
            {/*    <TabM label="Устройства"  className={'w-50'} />*/}
            {/*</div>*/}
          </Tabs>
        </AppBar>

        <div>
          {/* ///////////////////////////  Settings panel ///////////////////////////// */}
          <LocationSettings
            value={value}
            setting={setting}
            filter={filter}
            setSetting={setSetting}
            updateSetting={updateSetting}
            anchorRef={anchorRef}
            handleCloseSearchCity={handleCloseSearchCity}
            city_list={city_list}
            updateCompanyData={updateCompanyData}
            getTypeBoardName={getTypeBoardName}
            marks={marks}
            boards={boards}
          />
          {/* ///////////////////////////  Devices panel ///////////////////////////// */}
          <LocationDevices
            value={value}
            freeShowsAllboards={props.freeShowsAllboards}
            setting={setting}
            filter={filter}
            setSetting={setSetting}
            updateSetting={updateSetting}
            updateCompanyData={updateCompanyData}
            boards={boards}
            choosedBoards={choosedBoards}
            setChoosedBoards={setChoosedBoards}
            options={options}
            setHours={setHours}
            hours={hours}
            updateChoosedBoards={updateChoosedBoards}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default LocationsAccordion
