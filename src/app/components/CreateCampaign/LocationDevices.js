//libraries
import React, { useContext } from 'react';
import useStyles from './styles';
import { Box, Button, IconButton, InputAdornment, Input, Tab as TabM, FormControl } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import FirstTab3to2 from './FirstTab3to2';
import "../../../_metronic/_assets/scss/default.scss"
import '../../../_metronic/_assets/sass/pages/wizard/wizard-2.scss';
import 'moment/locale/ru';
import TabPanel from './TabPanel';
import { CreateCamp } from "../../../app/context/DataCampContext";
function countAmountPage(boards) {
  let page = Math.ceil(Object.keys(boards).length / 10);
  if (page === 0) page = 1
  return page
}
const LocationDevices = (props) => {
  const classes = useStyles();
  const useCreateCamp = useContext(CreateCamp);
  const value = props.value;
  const setting = props.setting;
  const filter = props.filter;
  const setSetting = props.setSetting;
  const updateSetting = props.updateSetting;
  const boards = props.boards;
  const updateCompanyData = props.updateCompanyData;
  const choosedBoards = props.choosedBoards;
  const setChoosedBoards = props.setChoosedBoards;
  const options = props.options;
  const setHours = props.setHours;
  const hours = props.hours;
  const updateChoosedBoards = props.updateChoosedBoards;

  console.log('🚀 ~ file: LocationDevices.js ~ line 31 ~ LocationDevices ~ options', options);

  return (
    <TabPanel value={value} index={1}>
      <div className={'d-flex flex-column pt-3'}>

        <Box className={`${classes.availbDisplays} fontGR d-flex mb-3 mx-2 mx-md-3`}>
          <div className={`mr-auto`}>
            Доступно экранов: <div className={`fontGM d-inline`}>{Object.keys(boards).length}</div>
          </div>
          <div style={{ marginTop: '-3px' }} className={'d-flex'}>
            <div style={{ marginTop: '3px' }}>
              {setting.pageBoardList} из {countAmountPage(boards)}
            </div>
            <div className={'ml-2 d-flex mb-2'}>
              <IconButton
                onClick={() => {
                  let page = setting.pageBoardList - 1;
                  if (page < 1) {
                    page = 1;
                  }
                  setSetting({ ...setting, pageBoardList: page });
                }}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => {
                  let page = setting.pageBoardList + 1;
                  let pages = Math.ceil(Object.keys(boards).length / 10);
                  if (page > pages) {
                    page = pages;
                  }
                  setSetting({ ...setting, pageBoardList: page });
                }}>
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </Box>

        <div className={'d-flex px-2 px-md-3 search-device-block'}>
          <FormControl className={'cityInput w-100 bor'}>
            <Input
              id="input-with-icon-adornment"
              className={'bgcfff'}
              placeholder={'Поиск устройства'}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              endAdornment={(function () {
                if (useCreateCamp.searchBoardInput != '') {
                  return (
                    <InputAdornment
                      position="end"
                      className={'cursor-pointer'}
                      onClick={() => {
                        useCreateCamp.setSearchBoardInput("")
                        setSetting({
                          ...setting,
                          pageBoardList: 1,
                        });
                      }}>
                      <CloseIcon style={{ color: '#004fff' }} />
                    </InputAdornment>
                  );
                }
              })()}
              value={useCreateCamp.searchBoardInput}
              onChange={(event) => {
                useCreateCamp.setSearchBoardInput(event.target.value)
                setSetting({
                  ...setting,
                  pageBoardList: 1,
                });
              }}
              disableUnderline={true}
            />
          </FormControl>
          {Object.keys(boards).length > 0 && (
            <div
              className={'d-flex mb-2'}
              style={{
                minWidth:
                  Object.keys(boards).length === Object.keys(choosedBoards).length
                    ? '112px'
                    : '123px',
              }}>
              <Button
                disableRipple
                variant="outlined"
                size="medium"
                color="primary"
                className={`fontGR ml-md-2 mb-0 tTraN c448AFF`}
                onClick={() => {
                  if (Object.keys(boards).length === Object.keys(choosedBoards).length) {
                    setChoosedBoards({});
                  } else {
                    setChoosedBoards(boards);
                  }
                }}>
                {Object.keys(boards).length === Object.keys(choosedBoards).length
                  ? 'Убрать все'
                  : 'Выбрать все'}
              </Button>
            </div>
          )}
        </div>
        {options !== null && (
          <div className={''}>
            <FirstTab3to2
              freeShowsAllboards={props.freeShowsAllboards}
              options={options}
              setHours={setHours}
              hours={hours}
              boards={boards}
              page={setting.pageBoardList}
              //setSize={setSize}
              filter={filter}
              updateData={updateCompanyData}
              //setPrevTab={() => setCurrentTab(1)}
              setNextTab={() => setSetting({ ...setting, currentTab: setting.currentTab + 1 })}
              durationRadio={filter.durationRadio}
              updateSetting={updateSetting}
              setting={setting}
              choosedBoards={choosedBoards}
              updateChoosedBoards={updateChoosedBoards}
              key={'FirstTab3to2'}
            />
          </div>
        )}
      </div>
    </TabPanel>
  );
};

export default LocationDevices;
