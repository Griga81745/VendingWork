import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  makeStyles,
  Box, Checkbox, TableHead, TableSortLabel,
  Hidden, Avatar, Button, Tooltip, TableContainer, Table, TableBody, TableRow, TableCell, IconButton
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from '@material-ui/icons/Stop';
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { isActive } from "app/utils/index";
import Moment from "react-moment";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from "@material-ui/icons/Close";
import { ViewCampContext } from "../../../../app/context/DataCampContext";

const useStyles = makeStyles(theme => ({
  screenTable: {
    border: "1px solid #e6e7ee",
    borderTop: "none",
    width: "150px",
    marginLeft: "40px"
  },
  companyName: {
    color: "#222",
    fontSize: 14,
    fontWeight: 500
  },
  colorBlock: {
    width: 4,
    height: 26,
    backgroundColor: "#2786fb",
    margin: "0 20px"
  },
  numberScreensBlock: {
    display: "flex",
    alignItems: "center",
    padding: "25px 20px 20px 50px"
  },
  dataContainer: {
    alignSelf: "center",
    backgroundColor: "transparent",
    zIndex: 2
  },
  companyInfo: {
    paddingLeft: "3rem",
    backgroundColor: "transparent",
    zIndex: 2,
    alignSelf: "center",
    cursor: "pointer"
  },
  companyInfo2: {
    backgroundColor: "transparent",
    zIndex: 2,
    alignSelf: "center",
    cursor: "pointer"
  },
  screenDataBlock: {
    borderBottom: "1px solid #e6e7ee",
    padding: "10px 0 0"
  },
  screenData: {
    color: "#222",
    fontSize: 14,
    fontWeight: 500,
    paddingBottom: 10,
    padding: "0 5px"
  },
  screenTitle: {
    color: "#888888",
    fontSize: 12
  },
  row: {
    position: "relative",
    padding: "9px 0 9px",
    minHeight: "70px"
    // "&:hover": {
    //     backgroundColor: '#efefef'
    // }
  },
  TableCellNameA: {
    fontSize: '13px',
    color: '#222',
    fontWeight: 500
  },
}));
const headCells = [
  {
    field: 'name',
    label: "Название",
    align: "left",
    padding: "0 0 0 46px",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: true,
    filter: false
  },
  {
    field: 'res',
    label: "Разрешение",
    align: "right",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: true,
    filter: false
  },
  {
    field: 'bite',
    label: "Вес",
    align: "right",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: false
  },
  {
    field: 'date',
    label: "Дата",
    align: "right",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: true,
    filter: true,
    padRight: 25
  },
  {
    field: 'shows',
    label: "Показов",
    align: "right",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: true,
    padRight: 25
  },
  {
    field: 'status',
    label: "Статус",
    align: "left",
    minwidth: 80,
    width: "80px",
    numeric: false,
    padding: "0 0 0 40px",
    disablePadding: true,
    filter: true,
    padRight: 25
  },
  {
    field: 'actions',
    label: "Действия",
    align: "left",
    minwidth: 80,
    width: "80px",
    numeric: false,
    disablePadding: false,
    filter: true,
    padRight: 25
  }
];
const ViewTableMyDevices = props => {
  const {
    currentUser,
    boards,
    type,
    addFile,
    setAddFile
  } = props;
  const useViewCampContext = useContext(ViewCampContext);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleScreens, setVisibleScreens] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [value, setValue] = useState("100");
  const [hide, setHide] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const classes = useStyles();
  const [selected, setSelected] = React.useState({});

  const handleChangeFile = file => {
    if (file.type !== "video/mp4") {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        let have_res = false;
        Object.values(props.data.boards).forEach(board => {
          if (board.resolution == `${image.width}x${image.height}`) {
            have_res = true;
          }
        });
        if (have_res) {
          uploadNewAlbum(file);
        } else {
          getError();
        }
      };
    } else {
      uploadNewAlbum(file);
    }
  };

  const routerCheck = (selected, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    return newSelected;
  }
  const handleClick = (event, boardId, creativeId) => {
    let newSelected = { ...selected };
    if (!newSelected[boardId]) {
      newSelected[boardId] = routerCheck([], +creativeId)
    } else {
      newSelected[boardId] = routerCheck(newSelected[boardId], +creativeId)
    }
    setSelected(newSelected);
  }
  const handleClickForCreative = (event, creativeId) => {
    let newSelecteds = { ...selected };
    if (event.target.checked) {
      Object.entries(boards).forEach(([key, creative]) => {
        if (key == creativeId) {
          creative.boards.map(bo => {
            if (typeof newSelecteds[bo] === 'undefined') {
              newSelecteds[bo] = [creative["B" + bo].id]
            } else if (newSelecteds[bo].indexOf(creative["B" + bo].id) == -1) {
              newSelecteds[bo].push(creative["B" + bo].id)
            }
          });
        }
      });
    } else {
      Object.entries(newSelecteds).forEach(([key, board]) => {
        board.map((creative, index) => {
          if (creative == +creativeId) {
            newSelecteds[key].splice(index, 1)
          }
        })
      })
    }
    setSelected(newSelecteds);
  }
  const handleSelectAllClick = (event) => {
    let newSelecteds = {};
    if (event.target.checked) {
      Object.entries(boards).forEach(([key, creative]) => {
        creative.boards.map(bo => {
          if (typeof newSelecteds[bo] === 'undefined') {
            newSelecteds[bo] = [creative["B" + bo].id]
          } else if (newSelecteds[bo].indexOf(creative["B" + bo].id) == -1) {
            newSelecteds[bo].push(creative["B" + bo].id)
          }
        });
      });
    }
    setSelected(newSelecteds);
  }

  let fileInput = null;
  const uploadNewAlbum = file => {
    let formData = new FormData();
    formData.append("file", file);
    axios
      .post(
        `/creative/upload-creative-all-group?camp_id=${props.id}&subuser=${currentUser.id}`,
        formData
      ).then(res => res.data)
      .then(res => {
        if (res.status = 'ok') {
          changeStatusCreativeUpload(res.file)
        }

        //props.getTableData();
      })
      .catch(console.error);
  };
  const getError = () => {
    Swal.fire({
      title: "Файл не подходит!",
      icon: "error",
      text: "Разрешение файла не соответствует выбранным экранам!"
    });
  };
  function changeStatusCreativeUpload(file) {
    let newData = { ...useViewCampContext.data }
    Object.entries(newData.all_data["schedule"]).forEach(([key_schedule, schedule]) => {
      Object.entries(schedule["boards"]).forEach(([key, val]) => {
        let resolution = newData.boards[key]['resolution'].split("x")
        if (+resolution[0] === +file['resw'] && +resolution[1] === +file['resh']) {
          let cretivesCopy = [...val["creatives"], { id: file.id, status: "running", active: 1 }]

          console.log("cretivesCopy")
          console.log(cretivesCopy)

          newData.all_data["schedule"][key_schedule]["boards"][key]['creatives'] = cretivesCopy
          newData['creatives'][file.id] = file
        }
      });
    });
    useViewCampContext.setData(newData)
  }
  useEffect(() => {
    if (addFile) {
      setAddFile(false);
      fileInput.click();
    }
  }, [addFile]);


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    return Object.keys(array);
  }
  const [expanded, setExpanded] = useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSelectAllClickCheck = () => {
    let sel = false;
    let countCre = 0;
    Object.values(selected).forEach(board => {
      countCre += board.length
    })

    let countCre2 = 0;
    Object.values(boards).forEach(creative => {
      countCre2 += creative.boards.length
    });

    if (countCre == countCre2) {
      sel = true
    }
    return sel;
  }
  const isSelected = (boardId, creativeId) => {
    let sel = false;
    if (!!selected[boardId]) {
      if (selected[boardId].indexOf(+creativeId) !== -1) {
        sel = true;
      }
    }
    return sel;
  }
  const isSelectedBoard = creativeId => {
    let sel = false;
    let countCre = 0;
    Object.values(selected).forEach(board => {
      board.map(creative => {
        if (creative == creativeId) {
          countCre++
        }
      })
    })

    if (countCre == boards[creativeId].boards.length) {
      sel = true
    }
    return sel;
  }
  const isSelectedLineMenu = () => {
    let sel = false;
    Object.values(selected).forEach(board => {
      if (board.length > 0) {
        sel = true
      }
    })
    return sel;
  }


  const activeF = async (data, active) => {
    if (data == null) {
      data = selected
    }
    try {
      let res = await axios.post(
        `/campaign/active-creative?subuser=${currentUser.id}`,
        {
          data: JSON.stringify(data),
          active: active,
          camp: +props.id
        }
      )
      setSelected({})
      if (res.data.status === "fail") {
        //alertError("Ошибка2");
      } else {

        changeStatusCreative(data, active)
        //props.getTableData();
      }
    } catch (err) {
      //alertError("Ошибка1");
      console.error(err);
    }
  };

  function changeStatusCreative(data, active) {
    let newData = { ...useViewCampContext.data }
    let boardID = Object.keys(data)
    if (!boardID.length) {
      return
    }
    Object.entries(newData.all_data["schedule"]).forEach(([key_schedule, schedule]) => {
      Object.entries(schedule["boards"]).forEach(([key, val]) => {
        if (boardID.indexOf(key) > -1 || boardID.indexOf("all") > -1) {
          let cretivesCopy = []
          val["creatives"].forEach(valCre => {
            if (((!!data[key] && data[key].indexOf(valCre['id']) > -1) || (!!data["all"] && data["all"].indexOf(valCre['id']) > -1)) && valCre['active'] !== active) {
              let newCre = valCre
              newCre.active = active
              cretivesCopy.push(newCre);
            } else {
              cretivesCopy.push(valCre);
            }
          });
          newData.all_data["schedule"][key_schedule]["boards"][key]['creatives'] = cretivesCopy
        }
      });
    });
    useViewCampContext.setData(newData)
  }
  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <div className={`fontGR mx-4 helpSelect align-items-center mt-3 c274C77 fS14 ${isSelectedLineMenu() ? "d-flex" : "d-none"}`}>
          <Button
            className={'helpButton c455A64 fontGR'}
            variant="outlined" color="secondary"
            startIcon={<PlayArrowIcon />}
            onClick={() => activeF(null, 1)}
          >
            Включить
          </Button>
          <Button
            className={'helpButton c455A64 fontGR'}
            variant="outlined" color="secondary"
            startIcon={<StopIcon />}
            onClick={() => activeF(null, 0)}
          >
            Отключить
          </Button>
          <Tooltip title="Delete" className={'ml-auto'}>
            <IconButton className={'helpButton c455A64 fontGR'} onClick={() => setSelected({})} className={'p-2'}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <div className={`w-100 fontGR helpSelect2 align-items-center mt-3 c274C77 fS14 ${isSelectedLineMenu() ? "d-flex" : "d-none"}`}>
          <Button
            className={'helpButton c455A64 fontGR'}
            variant="outlined" color="secondary"
            startIcon={<PlayArrowIcon />}
            onClick={() => activeF(null, 1)}
          >Включить</Button>
          <Button
            className={'helpButton c455A64 fontGR'}
            variant="outlined" color="secondary"
            startIcon={<StopIcon />}
            onClick={() => activeF(null, 0)}
          >Отключить</Button>
          <Tooltip title="Delete" className={'ml-auto'}>
            <IconButton size="small" className={'helpButton small c274C77'} onClick={() => setSelected({})} className={'p-2'}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Hidden>

      <TableContainer className={"px-4 bgcfff pt-4"} style={{ paddingBottom: 5 }}>
        <Table>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            rowCount={10}
            onSelectAllClick={handleSelectAllClick}
            onSelectAllClickCheck={onSelectAllClickCheck}
          />
          <TableBody>
            {!!Object.keys(boards).length && stableSort(boards, getComparator(order, orderBy)).map(keyyy => {
              return <Row activeF={activeF} data={props.data}
                setting={props.setting} setSetting={props.setSetting}
                key={keyyy + "rowMyDevice"}
                boards={boards}
                keyyy={keyyy}
                handleClickForCreative={handleClickForCreative}
                handleClick={handleClick}
                isSelectedBoard={isSelectedBoard}
                isSelected={isSelected}
              />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ paddingBottom: 60 }}></div>
      {(!!type && type == "moder" || 1 == 1) && (
        <input
          style={{ opacity: "0", width: "0.5px", height: "0.5px" }}
          type="file"
          ref={input => (fileInput = input)}
          accept=".mp4, .jpg, .jpeg"
          // onClick={e => props.uploadNewAlbum(e)}
          onChange={e => handleChangeFile(e.target.files[0])}
        />
      )}
    </>
  );
};

const mapStateToProps = store => ({
  user: store.auth.user,
  currentUser: store.auth.currentUser
});
export default withRouter(connect(mapStateToProps)(ViewTableMyDevices));


function Row(props) {
  const { setData, setOpenDialog, keyyy, boards, data, handleClick, isSelected, isSelectedBoard, handleClickForCreative } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const isItemSelected = isSelectedBoard(keyyy);

  return (
    <React.Fragment>
      <TableRow className={classes.rootTableRow}>
        <TableCell scope="row" padding="none" className={'px-2'} style={{ padding: '5px 0 5px 0', maxWidth: 200, overflow: "hidden", minWidth: 350 }} >
          <div className={'d-flex align-items-center'}>
            <IconButton className={'mx-2'} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Checkbox
              classes={{ checked: classes.CheckboxChecked }}
              checked={isItemSelected}
              // inputProps={{'aria-labelledby': labelId}}
              onChange={event => handleClickForCreative(event, keyyy)}
            />
            <Avatar
              onClick={() => {
                props.setSetting({
                  ...props.setting,
                  togglerLightBox: true,
                  file_path: process.env.REACT_APP_MY_HOST_CREATIVE + `/creative/${data.creatives[keyyy].group_id}/${data.creatives[keyyy].link}`
                })
              }
              }
              variant="rounded"
              src={
                process.env.REACT_APP_MY_HOST_CREATIVE +
                `/creative/${data.creatives[keyyy].group_id}/thumb${data.creatives[keyyy].link.split(".")[0]}.${data.creatives[keyyy].link.split(".")[1] == "jpeg" ? "jpeg" : "jpg"}`
              }
              className="mr-3 ml-2 filePrevIcon cursor-pointer"
            />
            <div className={'c448AFF'}>{data.creatives[keyyy].title}</div>
          </div>
        </TableCell>
        <TableCell align="right" padding="none" className={'fontGR px-2'} >{data.creatives[keyyy].resw}x{data.creatives[keyyy].resh}</TableCell>
        <TableCell align="right" className={'fontGR px-2'} >{data.creatives[keyyy].filesize !== 0 ? (data.creatives[keyyy].filesize / 1024 / 1024).toFixed(2) : "-"}</TableCell>
        <TableCell align="right" padding="none" className={'fontGR px-2'} >
          <Moment format="DD.MM.YYYY">
            {data.creatives[keyyy].created_at !== 0 ? data.creatives[keyyy].created_at : "-"}
          </Moment>
        </TableCell>
        <TableCell align="right" className={'px-2'} >--</TableCell>
        <TableCell align="right" padding="none" className={'px-2'}>
          <Grid item md={1} classes={{ root: classes.dataContainer }}>
            <Box className="fontGM text-nowrap" style={{ color: isActive(boards[keyyy].active) }} >
              <FormattedMessage id={"ACTIVE." + boards[keyyy].active} />
            </Box>
          </Grid>
        </TableCell>
        <TableCell align="right" className={'px-2'}>
          {(boards[keyyy].active == 1 || boards[keyyy].active == 2) &&
            <div className={'d-flex'}>
              <div className={'mr-4 c448AFF text-nowrap cursor-pointer'} onClick={() => props.activeF({ "all": [+keyyy] }, 0)}>Отключить</div>
            </div>
          }
          {(boards[keyyy].active == 0 || boards[keyyy].active == 2) &&
            <div className={'d-flex'}>
              <div className={'mr-4 c448AFF text-nowrap cursor-pointer'} onClick={() => props.activeF({ "all": [+keyyy] }, 1)}>Включить</div>
            </div>
          }
        </TableCell>
      </TableRow>

      {boards[keyyy].boards.map(keyB => {
        let isItemSelectedBo = isSelected(keyB, keyyy);
        return <TableRow
          key={keyB + "dataCre"}
          className={`cursor-pointer ${!!open ? "" : "d-none"}`}
        >
          <TableCell padding={'none'} style={{ padding: '0px 0 0px 55px' }} colSpan={4}>
            <div className={'d-flex align-items-center'}>
              <Checkbox
                classes={{ checked: classes.CheckboxChecked }}
                checked={isItemSelectedBo}
                // inputProps={{'aria-labelledby': labelId}}
                onChange={event => handleClick(event, keyB, keyyy)}
              />
              <div style={{ marginLeft: 56 }}>{data.boards[keyB].title}</div>
            </div>
          </TableCell>
          <TableCell padding={'none'} align="right" className={'px-2'}>--</TableCell>
          <TableCell padding={'none'} align="left" className={'px-2'}>
            <Box className="fontGM text-nowrap" style={{ color: isActive(boards[keyyy]["B" + keyB].active) }} >
              <FormattedMessage id={"ACTIVE." + boards[keyyy]["B" + keyB].active} />
            </Box>
          </TableCell>
          <TableCell align="right" className={'px-2'}>
            {boards[keyyy]["B" + keyB].active == 1 &&
              <div className={'d-flex'}>
                <div className={'mr-4 c448AFF text-nowrap cursor-pointer'} onClick={() => props.activeF({ [keyB]: [+keyyy] }, 0)}>Отключить</div>
              </div>
            }
            {boards[keyyy]["B" + keyB].active == 0 &&
              <div className={'d-flex'}>
                <div className={'mr-4 c448AFF text-nowrap cursor-pointer'} onClick={() => props.activeF({ [keyB]: [+keyyy] }, 1)}>Включить</div>
              </div>
            }
          </TableCell>
        </TableRow>

      })}

    </React.Fragment>
  );
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, onSelectAllClickCheck, numSelected, order, orderBy, rowCount, onRequestSort, checkedList } = props;
  const createSortHandler = (property) => (event) => {
    // onRequestSort(event, property);
  };
  return (
    <TableHead classes={{ root: classes.TableHead }}>
      <TableRow className={'TableRow tableS1'}>
        {headCells.map((headCell) => {
          return <TableCell
            //width={headCell.width}
            //style={{minWidth:headCell.minwidth, padding: !!headCell.padding ? headCell.padding : "" }}
            //style={{padding: !!headCell.padding ? headCell.padding : "" }}
            className={'px-2'}
            key={headCell.field + 'cam'}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.field == "name" && <Checkbox
              //indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={onSelectAllClickCheck()}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
            }
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <div className={'headCellLabel'}>{headCell.label}</div>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? '' : ''}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        })}
      </TableRow>
    </TableHead>
  );
}
