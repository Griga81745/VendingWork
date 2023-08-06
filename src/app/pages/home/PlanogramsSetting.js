import React, {useEffect, useState} from "react";
import {useParams, withRouter} from "react-router-dom";
import moment from "moment/moment";
import axios from "axios";
import Swal from "sweetalert2";
import {validateEmail} from "../../utils";
import {CreateCamp} from "../../context/DataCampContext";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Backdrop, Box, Button,
    CircularProgress, FormControl, Hidden,
    IconButton,
    ListItem,
    ListItemText, makeStyles, Paper, TextField, Tooltip, Typography, withStyles
} from "@material-ui/core";
import CampaignAccordion from "../../components/CreateCampaign/CampaignAccordion";
import ShowsAccordion from "../../components/CreateCampaign/ShowsAccordion";
import LocationsAccordion from "../../components/CreateCampaign/LocationsAccordion";
import CreativesAccordion from "../../components/CreateCampaign/CreativeAccordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MapIcon from "@material-ui/icons/Map";
import TuneIcon from "@material-ui/icons/Tune";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationOffOutlinedIcon from "@material-ui/icons/LocationOffOutlined";
import VideoLabelOutlinedIcon from "@material-ui/icons/VideoLabelOutlined";
import DevicesMap from "../../components/CreateCampaign/map";
import DisplayCheckUp from "../../components/CreateCampaign/DisplayCheckUp";
import ReactImageVideoLightbox from "react-image-video-lightbox";
import {connect} from "react-redux";
import * as auth from "../../store/ducks/auth.duck";


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


var moments = require("moment");
const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    subHeading: {
        fontSize: "16px",
    },
    heading: {
        fontSize: "20px",
        fontWeight: 500,
        letterSpacing: '.0125em!important',
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
        }
    },
    AccordionSummary: {
        minHeight: '64px',
        padding: 0
    },
    root: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.5) !important"
    },
    rootTree: {
        flexGrow: 1,
        maxWidth: 400,
    },
    tabsContainer: {
        borderRight: "1px solid #eeeef4",
        padding: "4.5rem 1.3rem 4.5rem 1.5rem"
    },
    tab: {
        maxWidth: "100%",
        padding: ".75rem 1.5rem",
        marginRight: "15px",
        overflow: "visible",
        borderRadius: ".5rem",
        display: "flex",
        justifyContent: "left",
        "& .MuiTab-wrapper": {
            width: "auto"
        }
    },
    smallDigit: {
        backgroundColor: "#448AFF",
        minWidth: 20,
        height: 20,
        color: "#fff",
        textAlign: "center",
        borderRadius: "50%",
        lineHeight: "21px",
        paddingRight: "1px",
        fontSize: "14px",
        marginLeft: "8px"
    },
    availbDisplays: {
        backgroundColor: "#EDF7FF",
        borderRadius: "4px",
        height: 45,
        fontSize: "14px",
        color: "#274C77",
        textAlign: "center",
        padding: "14px 16px"
    },
    activeTab: {
        backgroundColor: "#f4f6f9",
        "&::before": {
            content: "''",
            display: "block",
            width: 20,
            height: 20,
            backgroundColor: "#f4f6f9",
            position: "absolute",
            right: "-10px",
            transform: "rotate(45deg)"
        }
    },
    tabItem: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    headerS: {
        fontSize: 13,
        fontWeight: 500,
        lineHeight: '24px',
        color: '#000E40'
    },
    typographyBlock: {
        textAlign: "left",
        textTransform: "none"
    },
    typographyTitle: {
        // color: "#50566a",
        color: "#000000",
        fontWeight: 500,
        fontSize: "1.1rem"
    },
    typographyDeswcription: {
        color: "#959cb6"
    },
    mapBlock: {
        [theme.breakpoints.down('sm')]: {
            position: "fixed",
            display: "none",
            zIndex: 92,
            width: "100%",
            height: "calc(100vh - 50px)",
            top: "50px",
            "& .mapboxgl-map": {
                height: "calc(100vh - 50px)!important"
            }
        }
    },
    showBlockMap: {
        [theme.breakpoints.down('sm')]: {
            display: "block!important"
        }
    },
    headerText: {
        fontSize: "1.2rem",
        fontWeight: 500,
        color: "#434349"
    },
    drawerContentContainer: {
        padding: "32.5px"
    },
    drawerHeader: {
        marginBottom: "39px"
    },
    drawerHeaderText: {
        fontSize: "1.4rem",
        fontWeight: 500,
        color: "#48465b"
    },
    drawerHeaderButton: {
        color: "#5867dd",
        "&:hover": {
            color: "#2739c1",
            cursor: "pointer"
        }
    },
    AppBar: {
        backgroundColor: '#fff',
        boxShadow: 'none',
        zIndex: 64
    },
    AccordionDetails: {
        padding: '0 0 12px 0'
    },
    helperText: {
        color: "#ff5252"
    },
    startButton: {
        color: '#fff',
        fontSize: "14px",
        backgroundColor: "#0277BD",
        borderRadius: "4px",
        width: "272px",
        border: "1px solid #0277BD",
        padding: "14px 0 13px 0",
        "&:hover": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.8) !important",
        },
        "&:active": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.95) !important",
        }
    },
    mapButton: {
        color: '#52495C',
        fontSize: "13px",
        backgroundColor: "#fff",
        borderRadius: "22px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        width: "118px",
        height: "44px",
        position: "fixed",
        bottom: "20px",
        zIndex: 111,
        left: "50%",
        transform: "translate(-50%, 0)",
        "&:hover": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.8) !important",
        },
        "&:active": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.95) !important",
        }
    },
    mapButtonBack: {
        color: '#52495C',
        fontSize: "13px",
        backgroundColor: "#fff",
        borderRadius: "22px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        width: "137px",
        height: "44px",
        position: "fixed",
        bottom: "20px",
        zIndex: 111,
        left: "50%",
        transform: "translate(-50%, 0)",
        "&:hover": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.8) !important",
        },
        "&:active": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.95) !important",
        }
    },
    MapWidget: {
        position: "absolute",
        right: '20px',
        zIndex: 99
    },
    MapWidgetH: {
        height: 44,
        minWidth: 150
    }
}));
const getTypeBoardName = value => {
    if (value == "BB") {
        return "Билборд"
    } else if (value == "SS") {
        return "Суперсайт";
    } else if (value == "VS") {
        return "Видеоэкран";
    } else {
        return value;
    }
}
const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 10,
        label: '10',
    },
    {
        value: 15,
        label: '15',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 25,
        label: '25',
    },
    {
        value: 30,
        label: '30',
    }
];
const worker = new Worker(new URL('../../webworkers/create_camp.worker.js', import.meta.url))
const CreateCampaign = props => {
    const classes = useStyles();
    const { currentUser, token } = props;
    //const [metaData, setMetaData] = useState({});
    //const [metaDataRadio, setMetaDataRadio] = useState({});
    const [boards, setBoards] = useState([]);
    const [allboards, setAllBoards] = useState({});
    const [freeShowsAllboards, setFreeShowsAllBoards] = useState({});
    //const [allmediaplan, setAllmediaplan] = useState([]);
    const [showBlockMapV, setShowBlockMapV] = useState(false);
    const { id } = useParams();
    //const [radio, setRadio] = useState([]);
    const [options, setOptions] = useState(null);
    const [hours, setHours] = useState([]);
    //const [size, setSize] = useState([]);
    const [choosedBoards, setChoosedBoards] = useState({});
    //const [choosedRadio, setChoosedRadio] = useState([]);
    const [choosedCreatives, setChoosedCreatives] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [openBackdrop, updateBackdrop] = useState(false);
    const [searchBoardInput, setSearchBoardInput] = useState("");

    //const [duration, setDuration] = useState(5);
    //const [selectedFiles, setSelectedFiles] = useState({});
    const [filter, setFilterData] = useState({
        activeCustomer: 1,
        currentPage: 1,
        perPage: "10",
        companyStartDate: "",
        companyStartTime: "00",
        companyEndDate: "",
        companyEndTime: "00",
        city: [],
        daysOfWeek: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        resolution: [],
        m2: [],
        title: "Кампания №",
        nameClient: "",
        blockLength: 1,
        amountInBlock: 1,
        showsAmount: 0,
        showsAmountRadio: 0,
        isRestricted: false,
        restrictedShows: 60,
        duration: 5,
        typeCountOts: 0,
        typeCountShows: 0
    });

    // const { data: fetchCampaignData, error: fetchCampaignError, isLoading: fetchCampaignloading, refetch, status } = useQuery(["camp_data", id],
    //     () => fetchCampaign(id, currentPage, currentUser.id),
    //     {
    //         refetchOnWindowFocus: false,
    //         refetchOnmount: false,
    //         refetchOnReconnect: false,
    //     }
    // );


    const updateCompanyData = data => {

        let newFilter = { ...data };
        let newSetting = { ...setting };
        if (filter.title != data.title) {
            newFilter.title = data.title;

            let dataEr = FirstTab1Valid(data.title, 'slowCheck');
            if (!!dataEr) {
                newSetting.titleErrorText = dataEr.inputErr;
            } else {
                newSetting.titleErrorText = '';
            }
        }

        if (filter.duration != data.duration) {
            if (data.duration > 3600) {
                newFilter.duration = 3600;
            }
            newFilter.duration = data.duration;
        }

        if (filter.blockLength != data.blockLength || (filter.duration != data.duration && data.duration != '' && data.duration != 0)) {
            newSetting.amountInBlockMax = data.blockLength * 60 / data.duration;
        }
        setFilterData(newFilter);
        setSetting(newSetting);

    };



    //const updateBackdrop = status => {
    //    setOpenBackdrop(status);
    //};

    const [setting, setSetting] = useState({
        devices: 1,
        tab: 0,
        tab3: 0,
        tabLimiter: 1,
        tabDayT: "one",
        typeShows: 1,
        typeShowsOTSerror: false,
        typeShowsShowsError: false,
        currentTab: 1,
        typeFirstTab: 1,
        devicesFirstTab: 1,
        outdoorSize: [],

        resolution: [],
        resolutionUser: [],

        typeDisplay: [],
        typeDisplayUser: [],

        pageBoardList: 1,

        screenOrientOpen: false,
        screenSizeWOpen: false,
        screenSizeHOpen: false,
        orientationG: true,
        orientationV: true,
        sizeBoardWMeter: [0, 30],
        sizeBoardHMeter: [0, 30],

        openErrorDialog: '',
        openErrorDialogTitle: "",

        typeRekKonstrukzii: '',

        lightboxOpen: -1,
        lightboxFiles: [],

        openMenuAddOrSubtractBoards: null,

        outdoorResolution: [],
        indoorSize: [],
        indoorResolution: [],
        tabMedia: "",
        tabShowsCart: 0,
        stepsBySite: [],
        titleErrorText: "",
        openSearchCity: false,
        searchCityInput: "",
        dopSettings: false,
        amountInBlockMax: 12,
        freeDurationAmount: false,
        cityLoader: false,
        checkUpPage: false,

        budgetType3: 1000,
        betMaxType3: 2,

        emailphoto: ""
    });
    const updateSetting = data => {
        //console.log('updateSetting --- 11111')
        if (data.checkUpPage) {
            //  console.log('updateSetting --- indow.location checkUp')
            window.location.hash = "checkUp";
        } else {
            // console.log('updateSetting --- window.location.hash =')
            window.location.hash = "";
        }

        //if (data.lightboxOpen > -1) {
        //   setTimeout(() => {
        //    let mydiv = document.getElementsByClassName("lightBox");
        //    console.log('lightboxOpenlightboxOpenlightboxOpen')
        //    console.log(mydiv)
        //mydiv.appendChild(document.createTextNode("bar"));
        //  }, 1000);
        // }

        if (setting.devicesFirstTab !== data.devicesFirstTab) {
            updateCompanyData({
                ...filter,
                activeCustomer: data.devicesFirstTab === 2 ? 1 : 0
            })
        }
        setSetting(data);
    };

    const [timer, setTimer] = useState(null);
    const [firstSkip, setFirstSkip] = useState(false);
    useEffect(() => {
        if (!firstSkip) {
            setFirstSkip(true);
            return;
        }
        clearTimeout(timer);
        let t = setTimeout(() => {
            getFilterBoards();
            getFirstBoardsSettings();
        }, 800);
        setTimer(t);
    }, [
        filter.currentPage,
        filter.isRestricted,
        filter.restrictedShows,
        filter.resolution,
        filter.city,
        filter.hours,
        filter.daysOfWeek,
        filter.activeCustomer,
        filter.m2,
        filter.duration,
        filter.shows_radio_in_hour,
        searchBoardInput,
        setting.resolutionUser,
        setting.typeDisplayUser,
        setting.sizeBoardWMeter,
        setting.sizeBoardHMeter,
        setting.typeRekKonstrukzii,
        setting.orientationG,
        setting.orientationV,
        setting.typeShows
    ]);


    useEffect(() => {
        if (!Object.keys(freeShowsAllboards).length) {
            return
        }
        setTimeout(() => {
            getFilterBoards();
            getFirstBoardsSettings();
        }, 500);
    }, [
        freeShowsAllboards
    ]);

    const [firstSkip3, setFirstSkip3] = useState(false);
    useEffect(() => {
        if (!firstSkip3) {
            setFirstSkip3(true);
            return;
        }

        //  if (setting.tabDayT == 'two' && filter.daysOfWeek.length == 7 && filter.hours.length == 24) {
        //console.log('setting.tabDayTsetting.tabDayTsetting.tabDayTsetting.tabDayTsetting.tabDayT3333')
        //  return;
        //}

        clearTimeout(timer);
        let t = setTimeout(() => {
            getFilterBoards();
            getFirstBoardsSettings();
        }, 800);
        setTimer(t);

    }, [
        setting.tabDayT,
        // allboards
    ]);

    function isLatitude(lat) {
        return isFinite(lat) && Math.abs(lat) <= 90;
    }
    function isLongitude(lng) {
        return isFinite(lng) && Math.abs(lng) <= 90;
    }

    const [firstSkip2, setFirstSkip2] = useState(false);
    const getFirstBoardsSettings = () => {
        if (!!allboards) {
            if (!firstSkip2) {
                setFirstSkip(true);
            } else {
                return;
            }
            //// get resolution boards
            let resF = [];
            let typeF = [];
            Object.entries(allboards).forEach(([key, value]) => {
                if (resF.indexOf(value.resolution) == -1) {
                    resF.push(value.resolution);
                }
                if (typeF.indexOf(value.typeD) == -1) {
                    typeF.push(value.typeD);
                }
            });
            setSetting({ ...setting, resolution: resF, typeDisplay: typeF });
        }
    }

    const getFilterBoards = () => {

        if (!!allboards) {

            let activeBoards = JSON.parse(JSON.stringify(allboards));

            Object.keys(activeBoards).map((key, index) => {
                if ((activeBoards[key].user_id != currentUser.id && currentUser.role === "owner") && currentUser.id != 72) {
                    delete activeBoards[key];
                } else if (freeShowsAllboards[key] != "undefined") {
                    activeBoards[key].availableShows = 100
                }
            })

            console.log('disabledBoardsdisabledBoards2222222222  ');
            console.log(filterChoosedBoards)
            console.log(activeBoards)

            //console.log('disabledBoardsdisabledBoards1');
            //console.log(activeBoards)
            //console.log('////');
            // console.log(filterChoosedBoards)

            //   if( setting.type !== 3 ){
            //       Object.entries(activeBoards).forEach(([key, value]) => {
            //     if (activeBoards[key]['provider'] == "gallery"){
            ///             delete activeBoards[key];
            //         }
            //     });
            //   }
            //
            //    console.log( activeBoards )


            var filterChoosedBoards = {};
            if (Object.keys(choosedBoards).length) {
                //  console.log( 'filterChoosedBoardsfilterChoosedBoards0000' );
                // console.log( choosedBoards )
                Object.entries(choosedBoards).map(([key, val]) => {
                        filterChoosedBoards[key] = { ...val, choosedButNotAvailble: false };
                        return false;
                    }
                );
            }



            //console.log( 'filterChoosedBoardsfilterChoosedBoards' );
            // console.log( filterChoosedBoards )
            // let activeBoards2 = [];

            //   console.log('fillllllttttttteerrrrrrrr')
            // console.log(activeBoards)

            if (!setting.orientationG || !setting.orientationV) {
                Object.entries(activeBoards).forEach(([key, value]) => {
                    if (!setting.orientationG && activeBoards[key].width > activeBoards[key].height) {
                        // console.log('sizeBoardWMeter22222 -- ')
                        delete activeBoards[key];
                    } else if (!setting.orientationV && activeBoards[key].height >= activeBoards[key].width) {
                        delete activeBoards[key];
                    }
                });
            }


            if (setting.typeRekKonstrukzii != 3 && setting.typeRekKonstrukzii != '') {
                let searchType = [];
                if (setting.typeRekKonstrukzii == 2) {
                    searchType = ['VS'];
                } else {
                    searchType = ['SS', 'BB', 'CB', 'SC'];
                }
                Object.entries(activeBoards).forEach(([key, value]) => {
                    if (searchType.indexOf(activeBoards[key].typeD) == -1) {
                        // console.log('sizeBoardWMeter22222 -- ')
                        delete activeBoards[key];
                    }
                });
            }


            if (setting.sizeBoardWMeter[0] != 0 || setting.sizeBoardWMeter[1] != 30) {
                Object.entries(activeBoards).forEach(([key, value]) => {
                    //console.log('sizeBoardWMeter -- ')
                    // console.log(setting.sizeBoardWMeter[0])
                    // console.log(activeBoards[key].width/100)
                    if (setting.sizeBoardWMeter[0] > activeBoards[key].width / 100 || setting.sizeBoardWMeter[1] < activeBoards[key].width / 100) {
                        //  console.log('sizeBoardWMeter22222 -- ')
                        delete activeBoards[key];
                    }
                });
            }

            if (setting.sizeBoardHMeter[0] != 0 || setting.sizeBoardHMeter[1] != 30) {
                Object.entries(activeBoards).forEach(([key, value]) => {
                    // console.log('sizeBoardHMeter -- ')
                    // console.log(setting.sizeBoardHMeter[0])
                    // console.log(activeBoards[key].height/100)
                    if (setting.sizeBoardHMeter[0] > activeBoards[key].height / 100 || setting.sizeBoardHMeter[1] < activeBoards[key].height / 100) {
                        // console.log('sizeBoardHMeter22222 -- ')
                        delete activeBoards[key];
                    }
                });
            }

            let filterRes = setting.resolutionUser.length;
            if (filterRes > 0) {
                //console.log('filterRes11')
                Object.entries(activeBoards).forEach(([key, value]) => {
                    //console.log('filterRes00 -- ' + setting.resolutionUser)
                    //console.log('filterRes11 -- ' + value.resolution)
                    if (setting.resolutionUser.indexOf(value.resolution) > -1) {
                        // console.log('filterRes222 -- ' + value.resolution)
                        delete activeBoards[key];
                    }
                });
            }


            let filtertypeD = setting.typeDisplayUser.length;
            //   console.log('filterRes0000000000000000001 -- ' + filtertypeD)
            if (filtertypeD > 0) {
                // console.log('filterRes000000000000000000 -- ' )
                Object.entries(activeBoards).forEach(([key, value]) => {
                    // console.log('filterRes00 -- ' + setting.typeDisplayUser )
                    //   console.log('filterRes11 -- ' + value.typeD )

                    if (setting.typeDisplayUser.indexOf(value.typeD) > -1) {
                        ///  console.log('filterRes222 -- ' + value.typeD)
                        delete activeBoards[key];
                    }
                });
            }


            if (searchBoardInput !== "") {
                Object.entries(activeBoards).forEach(([key, value]) => {
                    if (value.title.toLowerCase().indexOf(searchBoardInput.toLowerCase()) == -1
                        // && (!!value.address && value.address.toLowerCase().indexOf( setting.searchBoardInput.toLowerCase() ) == -1)
                    ) {
                        delete activeBoards[key];
                    }
                });
            }


            let filterHoursLength = filter.hours.length;
            console.log('filterHoursLengthfilterHoursLengthfilterHoursLength222')
            console.log(filter.hours)
            console.log(filterHoursLength)
            if (filterHoursLength < 24 && setting.tabDayT != 'one') {
                Object.entries(activeBoards).forEach(([key, value]) => {
                    let len = activeBoards[key].hours.length;
                    for (var j = 0; j < filterHoursLength; j++) {
                        console.log('keykeykey')
                        console.log(activeBoards[key].hours)
                        console.log(filter.hours[j])
                        if (activeBoards[key].hours.indexOf(filter.hours[j]) > -1) {
                            //console.log('keykeykey')
                            //console.log(key)
                            break;
                        } else if (j + 1 == filterHoursLength) {
                            //console.log(key)
                            delete activeBoards[key];
                        }
                    }
                });
            }

            let filterDaysOfWeekLength = filter.daysOfWeek.length;
            if (filterDaysOfWeekLength < 7 && setting.tabDayT != 'one') {
                Object.entries(activeBoards).forEach(([key, value]) => {
                    let len = activeBoards[key].days.length;
                    for (var j = 0; j < len; j++) {
                        //console.log('filterDaysOfWeekLength')
                        //console.log(key)
                        //console.log(activeBoards[key].days[j])
                        ///console.log(filter.daysOfWeek)
                        // console.log(filter.daysOfWeek)
                        if (filter.daysOfWeek.indexOf(activeBoards[key].days[j]) > -1) {
                            // console.log('filterDaysOfWeekLength1111')
                            //console.log(key)
                            break;
                            //}else if(j + 1  == len){
                        } else if (j + 1 == len) {
                            if (!filterChoosedBoards[key]) {
                                delete activeBoards[key];
                            } else {
                                filterChoosedBoards[key]['choosedButNotAvailble'] = true;
                            }
                        }
                    }
                });
            }



            // if (Object.keys(activeBoards).length > 0) {
            //   Object.keys(activeBoards).map(key => {
            //let valueB = activeBoards[key];
            //  console.log( 'gggggggggg4444444444' );
            // console.log(  activeBoards[value.id]);
            // console.log(props.currentUser.id );
            //  console.log( setting.typeShows );


            //if( props.currentUser.id != 72 && activeBoards[value.id]["user_id"] != props.currentUser.id && (setting.typeShows == '2' || setting.typeShows == '1')  ){
            //    delete activeBoards[value.id];
            //     return;
            // }

            //activeBoards[value.id]['timestamp'] = timestamp;

            //activeBoards[key]['availableShows'] = 0;
            //activeBoards[key]['unavalibleHours'] = 0;
            // activeBoards[key]['avalibleHoursList'] = {};
            //activeBoards[key]['avalibleHours'] = 0;
            //activeBoards[key]['diffDays'] = 0;
            //  });
            // }
            //   console.log( activeBoards );


            ///let lenA = allmediaplan.length;
            //console.log( 'gggggggggggggggg111' );
            //console.log( lenA );
            // console.log(filter.restrictedShows);

            let startDString = moment(filter.companyStartDate + ' ' + filter.companyStartTime + ':00:00');
            let endDString = moment(filter.companyEndDate + ' ' + filter.companyEndTime + ':00:00');

            if (filter.restrictedShows > 0) {
                var disabledBoards = [];

                //console.log('difffffffffffffffffffffffffff')
                //console.log(endDString.diff(startDString, 'hours'))
                //console.log(endDString.diff(startDString, 'days'))



                let startD = startDString.unix();
                let endD = endDString.unix();

                /*  for(var x=0; x < lenA; x++ ){

                      if(!activeBoards[+allmediaplan[x].b]) continue;

                      let tT = moment(allmediaplan[x].f, 'YYYY-MM-DD HH:mm:ss');
                      let timeS = tT.unix();
                      if(timeS >= startD && timeS < endD){

                          if(filter.restrictedShows * filter.duration > 3600 - allmediaplan[x].s){
                              activeBoards[+allmediaplan[x].b]['unavalibleHours']++;
                          }else{
                              activeBoards[+allmediaplan[x].b]['avalibleHours']++;
                              activeBoards[+allmediaplan[x].b]['availableShows'] += filter.restrictedShows;
                              activeBoards[+allmediaplan[x].b]['avalibleHoursList'][allmediaplan[x].f] = 1;
                          }

                      }
                  }*/
            }

            //console.log( 'disabledBoardsdisabledBoardsr5656656565656' );
            //console.log( activeBoards )

            /*
                        if( Object.keys(activeBoards).length > 0 ){

                            Object.keys(activeBoards).map(key => {

                                if(key.indexOf("g") > -1){
                                    return;
                                }
                                let value = activeBoards[key];
                                //let diffDays = endDString.diff(startDString, 'hours');
                                let diffHours = 0;
                                let timeStamp = 0;
                                let startDString = moment(filter.companyStartDate + ' ' + filter.companyStartTime  + ':00:00');
                                let endDString = moment(filter.companyEndDate + ' ' + filter.companyEndTime  + ':00:00');

                                while (timeStamp + 3600 < endDString.unix()) {
                                    let nextHour = startDString
                                    timeStamp = nextHour.unix();
                                    let weekD = nextHour.locale("en").format('ddd').toLowerCase()
                                    let hourD = +nextHour.format('kk')

                                    //  console.log( nextHour.format("YYYY/MM/DD HH:mm:ss") );
                                    //  console.log( value.days );
                                    //  console.log( weekD );

                                    // console.log( 'timeStamp1111' );
                                    // console.log( timeStamp );
                                    // console.log( endDString.unix() );

                                    if(
                                        value.days.indexOf(weekD) > -1 &&
                                        value.hours.indexOf(''+hourD) > -1 &&
                                        (setting.tabDayT == 'one' || (setting.tabDayT != 'one' && filter.hours.indexOf(''+hourD) > -1 )) &&
                                        (setting.tabDayT == 'one' || (setting.tabDayT != 'one' && filter.daysOfWeek.indexOf(weekD) > -1 ))
                                    ){

                                        diffHours++;

                                    }else{
                                        if( !!value['avalibleHoursList'][nextHour.format('YYYY-MM-DD HH:mm:ss')] ){
                                            activeBoards[value['id']]['avalibleHours']--;
                                            activeBoards[value['id']]['availableShows'] -= filter.restrictedShows;
                                            delete activeBoards[value['id']]['avalibleHoursList'][nextHour.format('YYYY-MM-DD HH:mm:ss')];
                                        }
                                    }
                                    startDString.add(1, "h")
                                }


                              //  console.log( 'currentBoardId difff000' );
                              //  console.log( value );
                              //  console.log( diffHours );
                              //  console.log( value['avalibleHours'] +' // '+ value['unavalibleHours']);


                                if(diffHours > value['avalibleHours'] + value['unavalibleHours']){
                                    let emptyH = diffHours - (value['avalibleHours'] + value['unavalibleHours']);
                                    let emptyHShows = emptyH*filter.restrictedShows;

                                    activeBoards[value['id']]['availableShows'] += emptyHShows;
                                    activeBoards[value['id']]['diffDays'] = diffHours;
                                }

                                if(activeBoards[value['id']]['availableShows'] == 0){
                                    delete activeBoards[value['id']];
                                }
                            });
                        }
            */

            /*   console.log( 'disabledBoardsdisabledBoards' );
               console.log( activeBoards )
               console.log( '////' );
               console.log( filterChoosedBoards )*/


            setChoosedBoards(r => filterChoosedBoards);
            setBoards(activeBoards);


        }
    }
    useEffect(() => {
        worker.postMessage({
            token: token
        })

    }, []);
    useEffect(() => {
        worker.onmessage = ({ data: { list } }) => {
            if (!Object.keys(list).length || !list) {
                setSetting({ ...setting, openErrorDialogTitle: "У вас нет устройств, на которых можно создать кампанию", openErrorDialog: "Добавьте устройство" });
                return true;
            }
            setAllBoards(list);
            setBoards(JSON.parse(JSON.stringify(list)))
            getOptionsForSelectors(list);
        };
    }, []);
    const getOptionsForSelectors = async (listBoards) => {

        console.log("choosedBoards 222222", choosedBoards)

        updateBackdrop(true);
        try {
            let res
            await axios.all([
                axios.get(`/campaign/new-create${!!id ? "/" + id : ""}?subuser=${currentUser.id}`),
            ]).then(axios.spread((resV) => {
                res = resV
            }));

            setOptions(res.data);

            if (!!res.data && !!res.data.campData) {
                let campData = res.data.campData

                let startTime = moment.unix(campData.start).tz('UTC');
                let endTime = moment.unix(campData.end).tz('UTC');
                if(!campData.start && !campData.end){
                    startTime = moment().add(1, 'hour');
                    endTime = moment().add(7, 'days')
                }

                updateCompanyData({
                    ...filter,

                    companyStartDate: startTime.format("YYYY/MM/DD"),
                    companyStartTime: startTime.format("HH"),

                    minHour: startTime.format("HH"),
                    minDate: startTime.format("YYYY/MM/DD"),

                    companyEndTime: endTime.format("HH"),
                    companyEndDate: endTime.format("YYYY/MM/DD"),

                    title: !!campData.title ? campData.title : filter.title + campData.id,
                    nameClient: campData.client ? campData.client : "",
                    blockLength: !!campData.blength ? campData.blength : 1,
                    amountInBlock: !!campData.amountInBlock ? campData.amountInBlock : 1,
                    duration: !!campData.creativeDuration ? campData.creativeDuration : 5,
                    camp_id: campData.id

                });

                updateSetting({
                    ...setting,
                    typeShows: !!campData.type ? campData.type : (currentUser.role === "user" ? 3 : 1),
                    emailphoto: !!campData.emailphoto ? campData.emailphoto : "",
                    budgetType3: !!campData.budgetType3 ? campData.budgetType3 : 1000,
                    betMaxType3: !!campData.betMaxType3 ? campData.betMaxType3 : 2,
                })
            }
            initOldCamp(res.data, listBoards);
        } catch (e) {
            console.error(e);
        }
        updateBackdrop(false);
    };


    const initOldCamp = (dataNew, listBoards) => {
        console.log("choosedBoardsvv  333333", choosedBoards)

        if (!!id && !!dataNew.oldCampCreatives && !!dataNew.campData) {
            let addChoosedOldBoards = {};

            console.log("startOldssss")
            console.log(addChoosedOldBoards)

            dataNew.campData.boards.forEach((value, key) => {
                addChoosedOldBoards[value] = listBoards[value];
            })


            console.log("startOld 22 ")
            console.log(addChoosedOldBoards)

            setChoosedBoards(r => addChoosedOldBoards);
            setPictures(dataNew.oldCampCreatives);
        }
    }

    // const getFreeSecontInBoards = async () => {

    //     let startTimestamp = moment(filter.companyStartDate + ' ' + filter.companyStartTime + ':00:00').unix();
    //     let endTimestamp = moment(filter.companyEndDate + ' ' + filter.companyEndTime + ':00:00').unix();

    //     let res = await axios.get(`https://ru.de4.ru/boardStat?start=${startTimestamp}&end=${endTimestamp}`);

    //     console.log("filter.companyStartDate filter.companyStartDate filter.companyStartDate111");
    //     console.log(res.data);

    //     setFreeShowsAllBoards(res.data);

    // }
    const setPictures = fileCreative => {

        let obj = { ...uploadedFiles };
        let files = { ...choosedCreatives };
        fileCreative.forEach((value, key) => {
            obj[value.id] = value
            files[value.id] = 1;
        })

        setUploadedFiles(obj);
        setChoosedCreatives(files);

    };

    const newCampaign = data => {
        updateBackdrop(true);
        let formData = {};
        if (filter.companyStartDate.length > 0) {
            //formData.append("startDate", filter.companyStartDate);
            let startTimestamp = moment(filter.companyStartDate + ' ' + filter.companyStartTime + ':00:00').tz('UTC');
            formData["start"] = startTimestamp.unix();
        }

        console.log("formData11111")
        console.log(filter.companyStartDate + ' ' + filter.companyStartTime + ':00:00')
        console.log(formData)
        // return;


        if (filter.companyEndDate.length > 0) {
            /// formData.append("endDate", filter.companyEndDate);
            let entTimestamp = moment(filter.companyEndDate + ' ' + filter.companyEndTime + ':00:00').tz('UTC');
            formData["end"] = entTimestamp.unix()
        }

        if (!filter.daysOfWeek.length) {
            updateBackdrop(false);
            Swal.fire("Ошибка!", "Не выбраны дни недели!", "error");
            return;
        }
        if (filter.daysOfWeek.length < 7) {
            formData["days"] = filter.daysOfWeek
        }

        let choosedCreativesArrKey = Object.keys(choosedCreatives)
        if (!choosedCreativesArrKey.length) {
            updateBackdrop(false);
            Swal.fire("Ошибка!", "Нет креативов 1!", "error");
            return;
        }
        if (filter.hours.length < 24) {
            formData["hours"] = filter.hours
        }


        formData["type"] = +setting.typeShows
        formData["title"] = filter.title

        if (filter.nameClient !== "") {
            formData["client"] = filter.nameClient
        }

        formData["creativeDuration"] = filter.duration
        formData["blength"] = +filter.blockLength
        formData["amountInBlock"] = +filter.amountInBlock
        formData["id"] = filter.camp_id

        if (setting.typeShows == 3) {
            //formData.append("step[showSummaryType3]", setting.showSummaryType3);
            if (!setting.budgetType3) {
                updateBackdrop(false);
                Swal.fire("Ошибка!", "Неверный Бюджет на рекламную кампанию", "error");
                return;
            }
            formData["budgetType3"] = setting.budgetType3

            if (!setting.betMaxType3) {
                updateBackdrop(false);
                Swal.fire("Ошибка!", "Укажите максимальную ставку за показ", "error");
                return;
            }
            formData["betMaxType3"] = setting.betMaxType3
        }
        if (setting.emailphoto !== "" && !!setting.emailphoto) {
            if (validateEmail(setting.emailphoto.trim())) {
                formData["emailphoto"] = setting.emailphoto.trim()
            } else {
                updateBackdrop(false);
                Swal.fire("Ошибка!", "Неверный Email!", "error");
                return;
            }
        }

        let empty = {}
        Object.values(choosedBoards).forEach((board) => {
            choosedCreativesArrKey.forEach((creativeId) => {
                let creative = uploadedFiles[creativeId];
                let creativeResol = creative.resw + "x" + creative.resh;
                if (creativeResol === board.resolution || creative.mime === "text/html") {
                    empty[board.id] = 1
                }
            })
        })
        if (Object.keys(empty).length !== Object.keys(choosedBoards).length) {
            updateBackdrop(false);
            Swal.fire("Ошибка!", "Нет креативов 2!", "error");
            return;
        }
        formData["creatives"] = choosedCreativesArrKey.map(Number)
        formData["boards"] = Object.keys(empty).map(Number)
        formData["timezone"] = moment().utcOffset()

        axios.post(`https://ru.de4.ru/campaignStart`, formData)
            .then(res => {
                updateBackdrop(false);
                if (!!res.data.error) {
                    if (res.data.status == "fail") {
                        Swal.fire("Ошибка!", "Что-то пошло не так!", "error");
                    }
                } else {
                    props.history.push(`/campaign/view/${res.data.campaign_id}`);
                }
            }).catch((error) => {
            // Error
            updateBackdrop(false);
            Swal.fire("Ошибка!", "Ошибка при создании!", "error");
            return;
        });
    };

    const updateChoosedBoards = (id, action = null) => {

        if (!action) {
            //let selectedBoard = choosedBoards.find(board => board.id === id)

            let selectedBoard = choosedBoards[id]

            // console.log('choosedBoardsds[id]22222655555')
            // console.log(id)
            // console.log(boards)
            // console.log(choosedBoards)
            // console.log(selectedBoard)
            let newBoards = { ...choosedBoards };

            if (!!selectedBoard) {
                delete newBoards[id];
                setChoosedBoards(newBoards);
                return
            }

            if (!boards[id]) {
                return
            }

            newBoards[id] = boards[id];

            //console.log("newBoardsnewBoardsnewBoardsnewBoards")
            //console.log(newBoards)
            setChoosedBoards(newBoards);
            return
        }


        if (action === "add") {
            let board = boards.find(board => board.id === id);
            board.requested = 0;
            //console.log('boardboardboardboardchoosedBoards');
            //console.log([...choosedBoards, board]);
            setChoosedBoards([...choosedBoards, board]);
        }
        if (action === "remove") {
            let newBoards = choosedBoards.filter(board => board.id !== id);
            setChoosedBoards(newBoards);
        }
        if (action === "addAll") {
            setChoosedBoards(boards);
        }
        if (action === "removeAll") {
            setChoosedBoards([]);
        }
    };

    const addFileToCamp = fileIdArr => {
        // let obj = {}
        // console.log("addFileToCampaddFileToCampaddFileToCamp")
        // console.log(fileIdArr)
        let obj = { ...choosedCreatives }
        fileIdArr.forEach(fileId => {
            if (!choosedCreatives[fileId]) {
                obj[fileId] = 1
            } else {
                //let { [fileId]: removedProperty, ...choosedCreativesExclude } = choosedCreatives;
                //obj = choosedCreativesExclude;
                delete obj[fileId]
            }
        })

        //  console.log('addFileToCamp.cho')
        // console.log(obj)
        setChoosedCreatives(obj);
    };


    useEffect(() => {
        console.log('window.location.hash')
        if (window.location.hash == "#checkUp" && !setting.checkUpPage && !!Object.keys(choosedBoards).length) {
            console.log('window.location.hash1111')
            updateSetting({ ...setting, checkUpPage: true })
        } else if (window.location.hash == "#checkUp" && !setting.checkUpPage) {
            console.log('window.location.hash11118888888')
            updateSetting({ ...setting, checkUpPage: false })
        } else if (window.location.hash == "" && setting.checkUpPage) {
            console.log('window.location.hash2222')
            updateSetting({ ...setting, checkUpPage: false })
        }
    }, [window.location.hash]);


    const FirstTab1Valid = (titl, from) => {
        if (titl === null) titl = filter.title;
        if (titl.length === 0) {
            if (from == 'button') {
                setSetting({ ...setting, openErrorDialogTitle: "Вы забыли дать название для вашей кампании", openErrorDialog: "Придумайте название, которое будет больше трёх и меньше 50ти символов", inputErr: "Назовите кампанию" });
                return true;
            }
            return ({ inputErr: "Назовите кампанию" })
        } else if (!!titl.length && titl.length < 3) {
            if (from == 'button') {
                setSetting({ ...setting, openErrorDialogTitle: "Название кампании должно быть больше 3х символов", openErrorDialog: "Придумайте название, которое будет больше трёх и меньше 50ти символов", inputErr: "Не меньше трёх символов" });
                return true;
            }
            return ({ inputErr: "Не меньше трёх символов" })
        }
        return false
    }
    const SecondTab1Valid = () => {
        if (!!filter.companyStartDate && filter.companyStartDate != '' &&
            !!filter.companyEndDate && filter.companyEndDate != ''
        ) {
            return false
        }
        setSetting({ ...setting, openErrorDialogTitle: "Забыли про даты проведения кампании", openErrorDialog: "Установите даты и время проведения кампании" });
        return true;
    }

    const ThreeStepValid = () => {

        console.log('ThreeStepValid')

        console.log(!Object.keys(choosedBoards).length)
        if (!Object.keys(choosedBoards).length) {
            console.log('ThreeStepValid111111')
            setSetting({ ...setting, openErrorDialogTitle: "Выберите нужные вам устройства", openErrorDialog: "Для создания кампании вам необходимо подобрать конструкции, которые будут отвечать вашим требованиям" });
            return true
        }
        return false
    };


    const checkCurrentTab = () => {
        let curTab = setting.currentTab + 1;
        if (curTab == 5 && setting.currentTab > 1 && (setting.typeFirstTab == 1 || setting.typeFirstTab == 2 || setting.typeFirstTab == 3)) {
            curTab = 6;
        }
        return curTab;
    }

    const stepLinksValidate = () => {

        console.log('stepLinksValidatestepLinksValidatestepLinksValidatestepLinksValidate')

        if (FirstTab1Valid(null, 'button')) {
            console.log('stepLinks2222')
            return false;
        }
        if (SecondTab1Valid()) {
            console.log('stepLinks3333')
            return false;
        }
        if (ThreeStepValid()) {
            console.log('stepLinks4444')
            return false;
        }
        /*if (count >= 5 && !finish4Step()) {
            console.log('stepLink555555')
            Swal.fire("Ошибка на четвёртом шаге!", "", "info");
            return true
        }
        if (!error) {
            console.log(setting.stepsBySite)
            setSetting({...setting, currentTab: setting.stepsBySite[count - 1]})
        }*/

        return true;
    }
    const city_list = [
        { title: 'Нижний Новгород', value: 'NN' },
        { title: 'Москва', value: 'MSK' }
    ];
    const marks2 = [
        {
            value: 5,
            label: "5"
        },
        {
            value: 10,
            label: "10"
        },
        {
            value: 15,
            label: "15"
        },
        {
            value: 20,
            label: "20"
        },
        {
            value: 25,
            label: "25"
        },
        {
            value: 30,
            label: "30"
        },
        {
            value: 35,
            label: "35"
        },
        {
            value: 40,
            label: "40"
        },
        {
            value: 45,
            label: "45"
        },
        {
            value: 50,
            label: "50"
        },
        {
            value: 55,
            label: "55"
        },
        {
            value: 60,
            label: "60"
        },
        {
            value: 12,
            label: "Другая длина показа"
        }
    ];
    useEffect(() => {
        if (setting.currentTab > 1) {
            let ar = [1, 2, 3, 4, 5, 6]
            if (setting.typeFirstTab == 1 || setting.typeFirstTab == 3) {
                ar = [1, 2, 3, 4, 6, 6]
            }
            if (setting.typeFirstTab == 2) {
                ar = [1, 2]
            }
            setSetting({ ...setting, stepsBySite: ar })
        }
    }, [setting.currentTab]);

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
    const anchorRef = React.useRef(null);
    const handleCloseSearchCity = (event, city) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        let setObj = {};
        setObj.openSearchCity = false
        setObj.searchCityInput = ''
        setObj.cityLoader = false

        if (!!city) {
            let ar = [...filter.city];
            let arrCheck = ar.filter(item => item.value == city.value);
            console.log('arrCheck')
            console.log(arrCheck)
            if (!arrCheck.length) {
                ar.push(city);
            }
            //setObj.city = ar;
            updateCompanyData({ ...filter, city: ar });
        }


        setSetting({ ...setting, ...setObj })
    };

    const [value, setValue] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [expanded2, setExpanded2] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const handleToggle = (event, nodeIds) => {
        setExpanded2(nodeIds);
    };
    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    const filterInput = value => {
        if (value == '') {
            return '';
        }
        let resSh = String(value).replace(/[^0-9]/g, "");
        resSh = resSh.replace(/^0+/, "");
        return resSh;
    }

    //const [cursorOver, setCursorOver] = React.useState('left');
    /*const onMouseOverToMap = (position) => {
        setCursorOver(position);
        if(position == 'map' || position == 'right'){
            setExpanded('panel0')
        }

        window.setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 400);

    };
*/

    useEffect(() => {
        let showsSum = 0;
        let hoursSum = 0;
        Object.values(choosedBoards).map(board => {
            //console.log('ffffffffff')
            //console.log(board)
            // console.log(boards[board.id])
            //console.log(!!board.availableShows)
            if (!!boards[board.id] && !!boards[board.id].availableShows) {
                // console.log('ffffffffff111')
                showsSum += boards[board.id].availableShows;
            }
            if (!!boards[board.id] && !!boards[board.id].availableHours) {
                hoursSum += boards[board.id].availableHours;
            }
        });

        //console.log('setShowsSummary(showsSum)')
        //console.log(choosedBoards)
        //console.log(showsSum)

        setShowsSummary(showsSum);
        setHoursSummary(hoursSum);
    }, [choosedBoards, boards]);

    const [showSummary, setShowsSummary] = useState(0);
    const [hoursSummary, setHoursSummary] = useState(0);
    const showsLogic = data => {
        let log = "";
        if (data.length > 0) {
            if (+data > 0) {
                if (+data <= showSummary) {
                    log = `${+data / (+hoursSummary * 60)}`;
                    updateCompanyData({
                        ...filter,
                        blockLength: "1",
                        amountInBlock: log,
                        showsAmount: data
                    });
                } else {
                    log = `${+showSummary / (+hoursSummary * 60)}`;
                    updateCompanyData({
                        ...filter,
                        blockLength: "1",
                        amountInBlock: log,
                        showsAmount: showSummary
                    });
                }
            }
        } else {
            updateCompanyData({ ...filter, showsAmount: data });
        }
    };
    const calcShowsLogic = (data, type) => {
        switch (type) {
            case "length":
                if (+data > 0 && +filter.amountInBlock > 0) {
                    let log = "";
                    log = `${((+hoursSummary * 60) / +data) * +filter.amountInBlock}`;
                    if (+log <= showSummary) {
                        updateCompanyData({
                            ...filter,
                            blockLength: data,
                            showsAmount: log,
                            amountInBlock: 1
                        });
                        splitEquile(log);
                    } else {
                        updateCompanyData({
                            ...filter,
                            blockLength: data,
                            showsAmount: showSummary,
                            amountInBlock: 1
                        });
                        splitEquile(showSummary);
                    }
                } else {
                    updateCompanyData({ ...filter, blockLength: data, amountInBlock: 1 });
                }
                break;
            case "amount":
                if (+data > 0 && +props.filter.blockLength > 0) {
                    let log = "";
                    log = `${((+hoursSummary * 60) / +filter.blockLength) * +data}`;
                    if (+log <= showSummary) {
                        updateCompanyData({
                            ...filter,
                            amountInBlock: data,
                            showsAmount: log
                        });
                        splitEquile(log);
                    } else {
                        let dataD =
                            showSummary /
                            `${(+hoursSummary * 60) / +filter.blockLength}`;
                        updateCompanyData({
                            ...filter,
                            amountInBlock: dataD,
                            showsAmount: showSummary
                        });
                        splitEquile(showSummary);
                    }
                } else {
                    updateCompanyData({ ...filter, amountInBlock: data });
                }
                break;
            default:
                break;
        }
    };

    const splitEquile = (val, Boards_or_Radio = "choosedBoards") => {
        var all_val = val;
        //var data = props[Boards_or_Radio];
        var data = choosedBoards;

        data.forEach(board => {
            board.requested = 0;
        });

        var count_boards = data.length;
        var ii = 0;
        var val_val = Math.floor(all_val / count_boards);
        while (all_val > 0) {
            data.forEach(board => {
                if (all_val > 0 && board.availableShows > board.requested) {
                    if (board.requested + val_val > board.availableShows) {
                        all_val = all_val - (board.availableShows - board.requested);
                        board.requested = board.availableShows;
                    } else {
                        all_val = all_val - val_val;
                        board.requested += val_val;
                    }
                }
            });

            if (all_val <= count_boards) {
                val_val = 1;
            } else {
                val_val = Math.floor(all_val / count_boards);
            }
        }
    }
    const typeShowsBaraban = data => {
        let obj = {}

        obj.blockLength = !!data.blockLength ? data.blockLength : filter.blockLength;

        if (!!data.blockLength && data.blockLength < filter.blockLength) {
            obj.amountInBlock = 1;
        } else {
            obj.amountInBlock = !!data.amountInBlock ? data.amountInBlock : filter.amountInBlock;
        }

        let restrictedShows = 60 / obj.blockLength * obj.amountInBlock;
        obj.restrictedShows = restrictedShows;

        updateCompanyData({ ...filter, ...obj })
    }

    return (
        <>
            {!!Object.values(allboards).length ? (

                <CreateCamp.Provider value={{
                    setSearchBoardInput: setSearchBoardInput,
                    setSetting: setSetting,
                    setting: setting
                }} >
                    <Backdrop className={classes.backdrop} open={openBackdrop} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    {setting.checkUpPage == false &&
                        <div className={'row nol mx-0'}>
                            <div className={`tranz p-2 p-sm-3 col-md-6 col-lg-5 col-xl-5 col-12`}>

                                <CampaignAccordion
                                    classes={classes}
                                    expanded={expanded}
                                    handleChange={handleChange}
                                    setting={setting}
                                    filter={filter}
                                    updateCompanyData={updateCompanyData}
                                    options={options}
                                    setHours={setHours}
                                    hours={hours}
                                    setSetting={setSetting}
                                    updateSetting={updateSetting}
                                />



                                <ShowsAccordion
                                    expanded={expanded}
                                    handleChange={handleChange}
                                    setting={setting}
                                    filter={filter}
                                    updateCompanyData={updateCompanyData}
                                    updateSetting={updateSetting}
                                    currentUser={currentUser}
                                    setSetting={setSetting}
                                    typeShowsBaraban={typeShowsBaraban}
                                />


                                <LocationsAccordion
                                    expanded={expanded}
                                    handleChange={handleChange}
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
                                    freeShowsAllboards={freeShowsAllboards}
                                    choosedBoards={choosedBoards}
                                    setChoosedBoards={setChoosedBoards}
                                    options={options}
                                    setHours={setHours}
                                    hours={hours}
                                    updateChoosedBoards={updateChoosedBoards}
                                />


                                <CreativesAccordion
                                    ///choosedRadio={choosedRadio}
                                    setPictures={setPictures}
                                    uploadedFiles={uploadedFiles}
                                    setUploadedFiles={setUploadedFiles}
                                    choosedCreatives={choosedCreatives}
                                    addFileToCamp={addFileToCamp}
                                    expanded={expanded}
                                    handleChange={handleChange}
                                    setting={setting}
                                    filter={filter}
                                    updateSetting={updateSetting}
                                    choosedBoards={choosedBoards}
                                    options={options}
                                    freeShowsAllboards={freeShowsAllboards}
                                />


                                {setting.typeShows == 3 &&
                                    <Accordion expanded={expanded.indexOf('panel6') > -1}
                                               onChange={() => {
                                                   if (expanded.indexOf('panel6') == -1) handleChange('panel6');
                                               }}
                                               className={'px-2 px-md-3'}
                                               elevation={2}
                                    >
                                        <AccordionSummary
                                            expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel6')} ><ExpandMoreIcon /></IconButton>}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            classes={{ root: classes.AccordionSummary }}
                                        >
                                            <ListItem className={"p-0"}>
                                                <div className={classes.smallDigit}>5</div>
                                                <ListItemText primary="Бюджет" className={`fS20 c5E6366 m-0 ml-3`} />
                                            </ListItem>
                                        </AccordionSummary>
                                        <AccordionDetails className={`flex-column px-0`} >
                                            <div className={'row'} >
                                                <div className={`col-xl-6`} >
                                                    <FormControl className={'w-100'} >
                                                        <TextField
                                                            variant="outlined"
                                                            className="minHeight70"
                                                            label={"Бюджет на рекламную кампанию"}
                                                            helperText=""
                                                            type="number"
                                                            value={setting.budgetType3}
                                                            fullWidth
                                                            onChange={e => {
                                                                setSetting({ ...setting, budgetType3: +e.target.value })
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>

                                                <div className={`col-xl-6`}>
                                                    <FormControl className={'w-100'}>
                                                        <TextField
                                                            variant="outlined"
                                                            className="minHeight70"
                                                            label="Максимальная ставка за 1 показ"
                                                            helperText=""
                                                            value={setting.betMaxType3}
                                                            fullWidth
                                                            type="number"
                                                            max={200}
                                                            onChange={e => {
                                                                setSetting({ ...setting, betMaxType3: +e.target.value })
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>

                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                }

                                <div className="my-4 text-center text-md-right">
                                    <Button
                                        endIcon={<ArrowForwardIosIcon>finish</ArrowForwardIosIcon>}
                                        className={`btn tTraN ml-auto ${classes.startButton} `}
                                        onClick={e => {
                                            if (!stepLinksValidate()) {
                                                return;
                                            }
                                            updateSetting({ ...setting, checkUpPage: true })
                                        }}
                                    >
                                        <Box fontSize={14} fontWeight={500} className={'text-center'}>Проверить кампанию</Box>
                                    </Button>
                                    <Hidden only={["md", "lg", "xl"]}>
                                        <div style={{ height: 100 }}></div>
                                    </Hidden>
                                </div>

                                <Hidden mdUp>
                                    <Button
                                        startIcon={<MapIcon style={{ "color": "#90CAF9" }} >finish</MapIcon>}
                                        className={`btn tTraN ml-auto ${classes.mapButton} `}
                                        onClick={e => setShowBlockMapV(!showBlockMapV)}
                                    >
                                        <Box fontSize={13} fontWeight={500} className={'text-center'}>Карта</Box>
                                    </Button>
                                </Hidden>

                            </div>

                            <Hidden mdUp>
                                {!!showBlockMapV &&
                                    <Button
                                        startIcon={<TuneIcon style={{ "color": "#90CAF9" }} >finish</TuneIcon>}
                                        className={`btn tTraN ml-auto ${classes.mapButtonBack} `}
                                        onClick={e => setShowBlockMapV(!showBlockMapV)}
                                    >
                                        <Box fontSize={13} fontWeight={500} className={'text-center'}>Hастройки</Box>
                                    </Button>
                                }
                            </Hidden>


                        </div>
                    }

                    {setting.checkUpPage == true &&
                        <DisplayCheckUp
                            filter={filter}
                            setting={setting}
                            updateSetting={updateSetting}
                            updateCompanyData={updateCompanyData}
                            choosedBoards={choosedBoards}
                            showSummary={showSummary}
                            showsLogic={showsLogic}
                            splitEquile={splitEquile}
                            uploadedFiles={uploadedFiles}
                            setPictures={setPictures}
                            //selectedFiles={selectedFiles}
                            //setSelectedFiles={setSelectedFiles}
                            newCampaign={newCampaign}
                            setChoosedCreatives={setChoosedCreatives}
                            freeShowsAllboards={freeShowsAllboards}
                            choosedCreatives={choosedCreatives}
                            addFileToCamp={addFileToCamp}
                        />
                    }

                    {
                        setting.lightboxOpen >= 0 &&
                        <div className={'lightBox'}>
                            <div className={'backClose'} onClick={() => setSetting({ ...setting, lightboxOpen: -1 })}></div>
                            <ReactImageVideoLightbox
                                data={setting.lightboxFiles}
                                startIndex={setting.lightboxOpen}
                                showResourceCount={true}
                                onCloseCallback={() => setSetting({ ...setting, lightboxOpen: -1 })} />
                        </div>
                    }
                </CreateCamp.Provider>

            ) : null }
        </>
    );
};

const mapStateToProps = store => ({
    user: store.auth.user,
    currentUser: store.auth.currentUser,
    boardsG: store.auth.boardsG,
    updateBoards: store.auth.updateBoards,
    token: store.auth.authTokenG
});
export default withRouter(connect(mapStateToProps, auth.actions)(CreateCampaign));