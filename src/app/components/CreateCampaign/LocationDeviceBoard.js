import React, { useState } from 'react';
import { Typography, makeStyles, Chip, Collapse } from '@material-ui/core';
import '../../../_metronic/_assets/scss/datetime.scss';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DoneIcon from '@material-ui/icons/Done';

import 'react-dates/initialize';

// import {
//   DateRangePicker,
//   SingleDatePicker,
//   isInclusivelyBeforeDay,
//   isInclusivelyAfterDay,
// } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';
import 'moment/locale/ru';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import DeviceProperty from './DeviceProperty';

const useStyles = makeStyles(theme => ({
  tabContainer: {
    backgroundColor: '#fafafa',
    width: 476,
    position: 'absolute',
    top: 0,
  },
  elevation: {
    boxShadow: 'none!important',
    border: '1px solid #DDE7F0',
    backgroundColor: '#fafafa',
    margin: '0 0 10px 0',
  },
  tabHeader: {
    margin: '1.75rem 0',
    fontSize: '1.1rem',
    color: '#48465b',
  },
  twoItemsRowItem: {
    width: '100%',
  },
  iconContainer: {
    padding: '7px 1rem',
    border: '1px solid #e2e5ec',
    borderRadius: '0 4px 4px 0',
    fontSize: '1.4rem',
    backgroundColor: '#f7f8fa',
  },
  spacer: {
    marginBottom: '16px',
  },
  typographyTitle: {
    color: '#000E40',
    fontWeight: 500,
    fontSize: '15px',
  },
  checkBoard: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '160px',
    height: '90px',
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
      width: '140px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '296px',
      height: '124px',
    }
  },
  nextButton: {
    marginTop: '26px',
    padding: '12px 30px',
    backgroundColor: '#22b9ff',
    '&:hover': {
      backgroundColor: '#00abfb',
    },
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  expansionStyle: {
    margin: '0 !important',
    boxShadow: 'none !important',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    padding: '0 !important',
    borderRadius: '0 !important',
  },
  conteiner: {
    padding: '20px 20px 0 18px',
  },
  inputCity: {
    padding: '10px 0 20px 0',
  },
  emptyPhoto: {
    width: '160px',
    height: '90px',
    backgroundColor: '#ECECEC',
    color: '#90A4AE',
    paddingTop: "35px",
    textAlign: 'center',
    fontSize: 13,
    alignSelf: 'center',
    [theme.breakpoints.down('md')]: {
      width: '140px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '296px',
      height: '124px',
      paddingTop: "54px",
    }
  },
  showPhoto: {
    width: '160px',
    height: '90px',
    [theme.breakpoints.down('md')]: {
      width: '140px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '296px',
      height: '124px',
    }
  }
}));

const INCHES_PER_METER = 100 / 2.54;

const LocationDeviceBoard = (props) => {
  const {
    boardData,
    checkedB,
    create_file_paths,
    choosedBoards,
    updateChoosedBoards,
    setting,
  } = props;

  const classes = useStyles();
  const [collapseIn, setCollapseIn] = useState(false);

  const diagonalCount = (w, h) => {
    return `${Math.ceil(Math.sqrt(w * w + h * h) * INCHES_PER_METER)}''`;
  };

  return (
    <div key={boardData.id}>
      <div
        className={`boardCard px-2 d-flex ${checkedB ? 'check' : ''} ${!!choosedBoards[boardData.id] && !!choosedBoards[boardData.id].choosedButNotAvailble
          ? 'noAvail'
          : ''
          }`}
        onClick={(e) => {
          updateChoosedBoards(boardData.id);
        }}>
        {(!!boardData.board_files && !!boardData.board_files.photo && !!boardData.board_files.photo.length) ? (
          <div className={'empty-photo-box'}>
            {checkedB && (
              <div className={`${classes.checkBoard} d-flex justify-content-center`}>
                <CheckCircleIcon
                  className={'align-self-center'}
                  style={{ color: '#448AFF', width: '30px', height: '30px' }}
                />
              </div>
            )}
            <img
              //onClick={() => create_file_paths(boardData.id)}
              //variant="rounded"
              className={`${classes.showPhoto}`}
              src={`https://st.de4.ru/boards/${boardData.id}/thumb${boardData.board_files.photo[0].link.replace(
                /(\.[m][p][4])/g,
                '.jpg',
              )}`}
            />
          </div>
        ) : (
          <div className={'empty-photo-box'}>
            {checkedB && (
              <div className={`${classes.checkBoard} d-flex justify-content-center`}>
                <CheckCircleIcon
                  className={'align-self-center'}
                  style={{ color: '#448AFF', width: '30px', height: '30px' }}
                />
              </div>
            )}
            <div className={`${classes.emptyPhoto} fontGR m-auto`}>Нет фото</div>
          </div>
        )}
        <div style={{ marginTop: 5 }} className={'d-flex flex-column w-100'}>
          <div className={'d-flex'}>
            <div className={`boardInfo d-flex mr-auto flex-column`}>
              <Typography className={'fS12 c546E7A text-uppercase'}>Доступно показов: {Math.floor(boardData.availableShows / props.filter.duration)} {/*!!props.freeShowsAllboards && !!props.freeShowsAllboards[boardData.id] ? props.freeShowsAllboards[boardData.id]/props.filter.duration : 0*/}</Typography>
              <Typography className={'fS14 c263238'}>{boardData.title}</Typography>
              <Typography className={'fS12 c546E7A'}>{boardData.address}</Typography>
            </div>
            <div className={'checkedOverlay'}>


              {setting.typeShows === '1' && 1 == 2 && (
                <div>
                  <LocationOnIcon style={{ color: '#FF5252' }} />
                  <Chip
                    size="small"
                    label={boardData.availableShows}
                    //onClick={handleClick}
                    //onDelete={handleDelete}
                    deleteIcon={<DoneIcon />}
                  />
                </div>
              )}
            </div>
          </div>

          <div
            className={'d-flex mt-auto pl-3 show-details'}
            onClick={() => {
              setCollapseIn(!collapseIn);
            }}>
            <div
              className={'fS13 c448AFF mr-auto align-content-center'}
              style={{ lineHeight: '26px' }}>
              Показать подробности
            </div>
            <div className={'ml-auto'}>
              <ExpandMoreIcon className={'c78909C'} />
            </div>
          </div>
        </div>
      </div>
      <Collapse in={collapseIn}>
        <DeviceProperty name="Владелец" property="---" />
        <DeviceProperty name="Имя устройства" property={boardData.vendor} />
        <DeviceProperty name="ID устройства" property={boardData.device_id} />
        <DeviceProperty name="Категория" property={boardData.type} />
        <DeviceProperty name="Точные координаты" property={`${boardData.lat} / ${boardData.lng}`} />
        <DeviceProperty name="Размер экрана" property={boardData.model} />
        <DeviceProperty
          name="Диагональ"
          property={diagonalCount(boardData.width, boardData.height)}
        />
        <DeviceProperty name="Разрешение креатива" property={boardData.resolution} />
        <DeviceProperty name="Недельное кол-во зрит." property={boardData.availableShows} />
        <DeviceProperty name="Партнер-посредник" property="---" />
      </Collapse>
    </div>
  );
};

export default LocationDeviceBoard;
