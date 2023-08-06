import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    makeStyles,
    Tabs, Tab as TabMennu,
    AppBar, Tooltip, withStyles,
    Dialog, Paper, Divider, LinearProgress,
    DialogActions, Button, Collapse
} from "@material-ui/core";
// import ViewDataMenu from "./ViewDataMenu";
import ViewTable from "./ViewTable/ViewTable";
import { useParams, withRouter, Link } from "react-router-dom";
import axios from "axios";
import CreateIcon from '@material-ui/icons/Create';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import StopIcon from '@material-ui/icons/Stop';
import { connect } from "react-redux";
import Moment from "react-moment";
import 'moment-timezone';
import TimelineIcon from '@material-ui/icons/Timeline';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LockIcon from '@material-ui/icons/Lock';
//import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { onUpdateWeek, LightBoxVideo } from "app/utils/index";
import { fetchCampaign } from "app/crud/auth.crud";
import { ViewCampContext } from "app/context/DataCampContext";

import { useQuery } from 'react-query';

import "moment/locale/ru";

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#293d4d',
        borderColor: '#293d4d',
        fontSize: 9,
        fontWeight: 500
    },
    popper: {
        fontSize: 9,
    }
}))(Tooltip);

//var moment = require("moment");
const useStyles = makeStyles(theme => ({
    title: {
        fontSize: "1.2rem",
        fontWeight: "500",
        color: "#434349",
        paddingRight: 12,
        borderRight: "1px solid #e6e7ee"
    },
    item: {
        padding: "0 12px",
        borderRight: "1px solid #e6e7ee",
        fontWeight: "500"
    },
    loader: {
        position: 'absolute',
        width: '100%',
    },
    status: {
        margin: "0 12px",
        padding: "0 10px",
        color: "#ffffff",
        background: "#1dc9b7",
        borderRadius: "2px",
        fontSize: "10px",
        height: "16px"
    },
    container: {
        padding: "15px 0"
    },
    buttonBlock: {
        margin: "10px 0"
    },
    block: {
        background: "linear-gradient(to bottom, #f7f7f9, #ffffff)",
        marginBottom: "20px",
        padding: "0 20px"
    },
    button: {
        padding: "4px 12px",
        display: "flex"
    },
    rootPaper: {
        height: '48px',
        borderTop: '1px solid rgba(0, 0, 0, 0.12) !important',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12) !important',
        boxShadow: 'unset !important',
        backgroundColor: 'unset'
    },
    headerBlock: {
        margin: "0 90px",
        [theme.breakpoints.down('sm')]: {
            margin: "0 20px"
        }
    },
    headTitle: {
        fontSize: '28px!important',
        lineHeight: '2.5rem',
        fontWeight: 600
    },
    font12: {
        color: "rgba(0,0,0,.6)",
        fontSize: 12
    },
    dataBoard: {
        maxWidth: '550px'
    }
}));
const worker = new Worker(new URL('../../webworkers/camp.worker.js', import.meta.url))

const View = props => {

    const classes = useStyles();
    const [data, setData] = useState(false);
    const [dataStat, setDataStat] = useState(false);
    const [boards, setBoards] = useState(false);
    const [boardsShows, setBoardsShows] = useState([]);
    const { id } = useParams();
    const [currentTab, setCurrentTab] = useState(0);
    const [tabStatOrModer, setTabStatOrModer] = useState(0);

    //const [anchorEl, setAnchorEl] = React.useState(null);
    const { currentUser, token } = props;

    const [currentPage, setCurrentPage] = useState(0);

    const [currentPageModer, setCurrentPageModer] = useState(0);
    const [addFile, setAddFile] = useState(false);

    const [dataShowsReserved, setDataShowsReserved] = useState(false);

    useEffect(() => {
        //console.log('1111111111111111111111111111111111111111111111111111111111111')
        worker.onmessage = ({ data: { id: campId, count } }) => {
            console.log('worker.onmessagedataShowsReserveddataShowsReserveddataShowsReserved')
            console.log(count)
            console.log(id)
            console.log(campId)
            if (id == campId) {
                setDataShowsReserved(count)
            }
        };
    }, []);


    const { data: fetchCampaignData, error: fetchCampaignError, isLoading: fetchCampaignloading, refetch, status } = useQuery(["camp_data", id],
        () => fetchCampaign(id, currentPage, currentUser.id),
        {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
        }
    );
    useEffect(() => {
        if (!!fetchCampaignData) {

            //console.log("fetchCampaignDatafetchCampaignDatafetchCampaignDatafetchCampaignData ");
            //console.log(status);
            //console.log(fetchCampaignData);
            let dataF = fetchCampaignData.data
            let typeString = ""
            if (!!dataF.all_data && !!dataF.all_data.type) {
                if (dataF.all_data.type == 3) {
                    typeString = "Динамическая"
                } else if (dataF.all_data.type == 1) {
                    typeString = "Фиксированная"
                } else if (dataF.all_data.type == 2) {
                    typeString = "Динамическая"
                }
            }

            setSetting({ ...setting, typeString: typeString });
            // if (!!fetchCampaignData && !fetchCampaignloading && !!data) {
            //     let fff =
            //          setData(dataF);
            // }
        }
    }, [fetchCampaignData]);

    const { data: fetchCampaignStat, error: campaignStatError, isLoading: campaignStatIsLoading, refetch: campaignStatRefetch } = useQuery(["camp_data_stat", id],
        () => {
            let dataF = fetchCampaignData.data
            let myBoards_v = {};
            let statShowsByBoards = []
            let creativeDuration = 0;
            if (!!dataF.all_data) {
                Object.values(dataF.all_data["schedule"]).forEach(schedule => {
                    //dataF.campDays = schedule.days;
                    //creativeDuration = schedule.creativeDuration;
                    Object.entries(schedule["boards"]).forEach(([key, val]) => {
                        myBoards_v[key] = [dataF.all_data["id"]];
                        statShowsByBoards[key] = { shows: 0, name: "board.board.title" };
                    });
                });

                console.log("fetchCampaignSmyBoards_vmyBoards_vmyBoards_v1");
                console.log(myBoards_v);
                setBoards(myBoards_v);
            }
            //dataF.all_data.creativeDuration = creativeDuration;

            setBoardsShows(statShowsByBoards);
            setData(dataF);

            console.log("fetchCampaignStat 1111111111111111");
            console.log(fetchCampaignData);
            console.log(dataF);
            if (dataF.all_data["user_id"] == 72) {
                return axios.post("https://parni.de4.ru/getDataBoards?date=true&date_h=true", myBoards_v);
            } else {
                return axios.post("https://ru.de4.ru/getDataCamp?date=true&camp_id=" + dataF.all_data["id"], myBoards_v);
            }
        },
        {
            enabled: !!fetchCampaignData && !fetchCampaignloading,
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
        }
    )
    useEffect(() => {

        console.log("fetchCampaignStat11222")
        console.log(fetchCampaignStat)
        console.log(data)

        if (fetchCampaignStat && (!!fetchCampaignStat.data || fetchCampaignStat.data === null) && !!data) {

            console.log("fetchCampaignStat11222 555555555555")

            let statDWas = []
            if (fetchCampaignStat.data !== null) {
                fetchCampaignStat.data.forEach(statData => {
                    let id = statData.name.replace("board", "");
                    //statD[id] = statData.Data;

                    statData.Data.forEach(statDataB => {
                        /// показы относительно экрана
                        //statShowsByBoards[id].shows += +statDataB.total;
                        if (typeof statDWas[statDataB._id.date] === 'undefined') {
                            statDWas[statDataB._id.date] = { all_showed: 0, all_cost: 0 };
                        }
                        statDWas[statDataB._id.date].all_showed += +statDataB.total;
                        statDWas[statDataB._id.date].all_cost += +statDataB.cost;

                        if (typeof statDWas[statDataB._id.date].data_board === 'undefined') {
                            //statD[statDataB._id.date].data_board = {shows:0, showed:0, cost:0};
                            statDWas[statDataB._id.date].data_board = {};
                        }
                        if (typeof statDWas[statDataB._id.date].data_board[id] === 'undefined') {
                            statDWas[statDataB._id.date].data_board[id] = { showed: 0, cost: 0 };
                        }
                        statDWas[statDataB._id.date].data_board[id].showed += +statDataB.total;
                        statDWas[statDataB._id.date].data_board[id].cost += +statDataB.cost;

                    });
                });
            }



            console.log("statDWas -- statDWas111 ");
            console.log({
                token: token,
                id: +id,
                boards_ids: data.all_data.boards,
                start: data.all_data.start,
                finished: data.all_data.finished
            });
            console.log(statDWas);
            setDataStat(statDWas);

            worker.postMessage({
                token: token,
                id: +id,
                boards_ids: data.all_data.boards,
                start: data.all_data.start,
                finished: data.all_data.finished
                //start: data.all_data.start,
                //finished: data.all_data.finished
            })

        }
    }, [fetchCampaignStat, data]);

    const deleteCamp = async () => {
        setSetting({ ...setting, openErrorDialog: '', openErrorDialogTitle: "" })
        try {
            await axios.post(
                `/campaign/delete?campaign_id=${id}&subuser=${currentUser.id
                }`
            ).then(res => {
                console.log(res.data);
                if (res.data.status == "ok") {
                    //Swal.fire("Успешно!", "Кампания была остановлена!", "success");
                    setSetting({ ...setting, openErrorDialogTitle: "Кампания была остановлена!" });
                    refetch()
                }
            });
        } catch (e) {
            setSetting({ ...setting, openErrorDialogTitle: "Ошибка!, Что-то пошло не так!" })
        }

    }


    //const changeCampaignStatus = () => {
    ////  getAlert();
    //};

    const [setting, setSetting] = useState({
        openErrorDialog: '',
        openErrorDialogTitle: "",
        buttonOk: "",
        buttonOkFunction: null,
        typeString: "",
        file_path: '',
        togglerLightBox: false
    });

    const handleChange = (event) => {
        setSetting({
            ...setting,
            openErrorDialogTitle: "Вы уверены, что хотите остановить кампанию?",
            buttonOk: "Остановить",
            buttonOkFunction: deleteCamp
        });
    };
    const downloadEmployeeData = () => {
        //setAnchorEl(false);
        axios.post("https://ru.de4.ru/getCsv", boards).then(response => {
            let url = window.URL.createObjectURL(new Blob([response.data]));
            //let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;

            a.download = "data.csv";
            a.click();
        });
    };
    const downloadPhotoScreens = () => {
        // setAnchorEl(false);
        axios.get("https://ru.de4.ru/getArchiveSnap?camp_id=" + id).then(response => {
            if (response.data.status === "ok") {
                let a = document.createElement("a");
                a.href = response.data.url;
                a.download = "data.zip";
                a.click();
            }
        });
    };
    const [checked, setChecked] = React.useState(false);

    const handleChange1 = () => {
        setChecked((prev) => !prev);
    };
    return (
        <>

            <div className={`py-0 pt-4 d-flex ${classes.headerBlock} flex-column flex-md-row`}>
                <div className={'mb-1'}>
                    {!!data.all_data && data.all_data.client &&
                        <Box fontSize={10} className={'d-block text-uppercase'}>{data.all_data.client}</Box>
                    }
                    <h3 className={`${classes.headTitle} m-0 c0277BD`}>
                        {data.all_data && data.all_data.title}
                    </h3>
                    <Grid container direction="row" alignItems="center" className={'mb-2 c5E6366 fS16'}>
                        {setting.typeString == "" ? <TimelineIcon fontSize="small" /> : <LockIcon fontSize="small" />}
                        <div className={'ml-2 fontGR'}>{setting.typeString}</div>
                    </Grid>
                    {!!data.all_data && data.all_data.start && data.all_data.end &&
                        <Box fontSize={13} fontWeight={400} className={`d-block c5E6366`} ><Moment tz="UTC" format="DD.MM.YYYY/HHч" unix>
                            {data.all_data.start}
                        </Moment> - <Moment tz="UTC" format="DD.MM.YYYY/HHч" unix>
                                {data.all_data.end}
                            </Moment>
                        </Box>
                    }
                    <div onClick={handleChange1} className={'mt-2 c448AFF fS13 cursor-pointer'} >
                        {!checked ? "Технические настройки" : "Скрыть настройки"}
                    </div>
                    <Collapse in={checked}
                    //collapsedSize={40}
                    >
                        <Grid className={`kt-widget kt-widget--user-profile-3 ${classes.dataBoard}`} >
                            <Divider className={'my-3'} />
                            <Grid className=" mt-0 border-0  px-0 container">
                                <div className={'row'}>
                                    {!!data.campDays &&
                                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                                            <Tab
                                                icon={"flaticon-calendar-with-a-clock-time-tools"}
                                                name={"Время работы"}
                                                data={onUpdateWeek(data.campDays)}
                                            />
                                        </div>
                                    }
                                    {data.all_data && !!data.all_data.blength &&
                                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                                            <Tab
                                                icon={"flaticon-user-ok"}
                                                name={`Длина блока`}
                                                nameDop={data.all_data.blength + " мин"}
                                            />
                                        </div>
                                    }
                                    {data.all_data && !!data.all_data.amountInBlock &&
                                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                                            <Tab
                                                icon={"flaticon-internet"}
                                                name={"Кол-во выходов в блоке"}
                                                nameDop={data.all_data.amountInBlock}
                                            />
                                        </div>
                                    }
                                    {data.all_data && !!data.all_data.placed &&
                                        <div className={'pb-0 col-md-6 col-12 padding12'}>
                                            <Tab
                                                icon={"flaticon-internet"}
                                                name={"Заказано показов"}
                                                nameDop={data.all_data.placed}
                                            />
                                        </div>
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </Collapse>
                </div>

                <div className={`ml-sm-auto mt-3 mt-md-0`}>
                    <div className={'c78909C fontGR text-sm-right mb-2'}>
                        {!!data.all_data && data.all_data.status === "running" ? "Кампания запущена" : ""}
                        {!!data.all_data && data.all_data.status === "finished" ? "Кампания остановлена" : ""}
                        {!!data.all_data && data.all_data.status === "pending" ? "Кампания в ожидании" : ""}
                    </div>
                    {!!data.all_data && data.all_data.status === "finished" &&
                        <div className={'text-sm-right fS14'}><Moment tz="UTC" format="DD.MM.YYYY/HHч" unix>{data.all_data.finished + (data.all_data.timezone * 60)}</Moment></div>
                    }
                    <div className="text-right">
                        {!!data.all_data && (data.all_data.status === "running" || data.all_data.status === "pending") &&
                            <Button startIcon={<StopIcon />} className={`btn tTraN stopB `} onClick={handleChange} >
                                <Box fontSize={14} fontWeight={500} className={'text-center'}>Остановить</Box>
                            </Button>
                        }
                        <LightTooltip title="Редактировать кампанию" aria-label="add" placement="bottom" >
                            <Button
                                to={`/campaign/new-create/${id}`}
                                component={Link}
                                className={`ml-2 btn tTraN shareP `} >
                                <CreateIcon fontSize="small" />
                            </Button>
                        </LightTooltip>
                        {!!data.all_data && !!data.all_data.emailphoto &&
                            <LightTooltip title="Фотоотчёт" aria-label="add" placement="bottom" >
                                <Button className={`ml-2 btn tTraN sharePAdd`} onClick={downloadPhotoScreens} >
                                    <AddAPhotoIcon fontSize="small" />
                                </Button>
                            </LightTooltip>
                        }
                    </div>
                    <div className={'text-sm-right cursor-pointer fontGR mt-2'} onClick={downloadEmployeeData}>Скачать CSV</div>
                </div>
            </div>

            <Paper className={`paper`}>
                <AppBar position="static" color="default" className={`AppBar mt-3`}>
                    <Tabs
                        value={currentTab}
                        indicatorColor="primary"
                        className={"tabsMenu ml-4"}
                        textColor="primary"
                        variant="scrollable"
                        onChange={(event, newValue) => {
                            if (newValue == "addFile") {
                                setAddFile(true);
                            } else {
                                setCurrentTab(newValue)
                            }
                        }}
                        aria-label="full width tabs example"
                    >
                        <TabMennu label="Статистика" />
                        {!!Object.keys(data).length && (tabStatOrModer == 1 || tabStatOrModer == 3) && (
                            <TabMennu label="Мои устройства" value={1} />
                        )}
                        {!!Object.keys(data).length && (tabStatOrModer == 2 || tabStatOrModer == 3) && (
                            <TabMennu label="Модерация" value={2} />
                        )}
                        {currentTab > 0 && !!Object.keys(data).length && currentUser.id == data.all_data["user_id"] &&
                            <TabMennu label="Добавить файл" className={"ml-auto mr-2"} value={"addFile"} />
                        }
                    </Tabs>
                    {(fetchCampaignloading || campaignStatIsLoading) && currentTab !== 1 ? <LinearProgress className={classes.loader} /> : null}
                </AppBar>

                <Divider />
                {!!data.all_data &&
                    <ViewCampContext.Provider value={{
                        dataShowsReserved: dataShowsReserved,
                        dataStat: dataStat,
                        data: data,
                        setData: setData
                    }} >
                        <ViewTable
                            setCurrentPageModer={setCurrentPageModer}
                            currentPageModer={currentPageModer}
                            setting={setting} setSetting={setSetting}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            setCurrentTab={setCurrentTab}
                            currentTab={currentTab}
                            getTableData={refetch}
                            history={props.history}
                            data={data}
                            setTabStatOrModer={setTabStatOrModer}
                            boardsShows={boardsShows}
                            boards={boards}
                            id={id}
                            setAddFile={setAddFile}
                            addFile={addFile}
                            dataStat={dataStat}
                        />
                    </ViewCampContext.Provider>
                }
            </Paper>


            <ErrorDialog setting={setting} setSetting={setSetting} />
            {setting.togglerLightBox && <LightBoxVideo setting={setting} setSetting={setSetting} />}
        </>
    );
};
const mapStateToProps = store => ({
    user: store.auth.user,
    currentUser: store.auth.currentUser,
    token: store.auth.authTokenG
});
export default withRouter(connect(mapStateToProps)(View));


function ErrorDialog(props) {
    const { setting, setSetting, errorText } = props;

    return (
        <Dialog open={!!setting.openErrorDialog || !!setting.openErrorDialogTitle}
            onClose={() => {
                setSetting({ ...setting, openErrorDialog: '', openErrorDialogTitle: "" })
            }}
            maxWidth="md"
        >
            <div className={'Wdialog'}>
                <div className={'d-flex'}>
                    <div>
                        <div className={'fS18 c212121'}>{setting.openErrorDialogTitle}</div>
                        <div className={'fS14 c546E7A mt-2 w-75'}>{setting.openErrorDialog}</div>
                    </div>
                </div>
            </div>
            <DialogActions>
                <Button onClick={() => { setSetting({ ...setting, openErrorDialog: '', openErrorDialogTitle: "" }) }} color="primary">
                    Закрыть
                </Button>

                {!!setting.buttonOk &&
                    <Button onClick={setting.buttonOkFunction} color="primary">
                        {setting.buttonOk}
                    </Button>
                }

            </DialogActions>
        </Dialog>
    );
}

const Tab = props => {
    let ff = !!props.font ? props.font : "20px";
    let lh = !!props.lineHeight ? props.lineHeight : "2rem";

    return (
        <Grid className="greyField" item>
            <Grid className="greyField2 p-0">
                <div className="greyFSmall fontGR c546E7A">{props.name}{!!props.nameDop && <Box component="span" className={'fontGM'}>{" "}{props.nameDop}</Box>}</div>
                {!!props.data && <Box className="greyFBig c455A64 fS14" lineHeight={lh} >{props.data}{" "}</Box>}
            </Grid>
        </Grid>
    );
};
