import React, { useState, useEffect } from "react";
import {
    Typography,
    Grid,
    makeStyles,
    Box,
    Button,
    Switch,
    TextField,
    MenuItem,
    Hidden,
    Divider,
    FormControlLabel,
    IconButton, Accordion,
    Tab as TabM,
    AccordionSummary, AccordionDetails, Collapse, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@material-ui/core";
import axios from "axios";
import { LightBoxVideo } from "../../utils/index";

import { device_info, save_device_edit_add } from "../../crud/auth.crud";
import { injectIntl } from "react-intl";
import DevicesMap from "./map";
import clsx from "clsx";
import { useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import SwipeableViews from "react-swipeable-views";
// import TreeView from "@material-ui/lab/TreeView";
// import ReactImageVideoLightbox from "react-image-video-lightbox";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik } from "formik";
import ScheduleSelector from "../../components/ScheduleSelector";
import Swal from "sweetalert2";
import AlbumViewTablet from "./AlbumViewTablet";
import AlbumViewDesktop from "./AlbumViewDesktop";
import AlbumViewMobile from "./AlbumViewMobile";
import AccordionHead from "../CreateCampaign/Accordion/AccordionHead";

import ProgressLoader from "../ViewMedia/ProgressLoader";
// import FsLightbox from "fslightbox-react";


const useStyles = makeStyles(theme => ({
    subHeading: {
        fontSize: "16px",
    },
    heading: {
        fontSize: "20px",
        fontWeight: 500,
        letterSpacing: '.0125em!important'
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
    mapButton: {
        backgroundColor: "#1dc9b7",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#18a899"
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
        borderRadius: 28,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
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
const typeDevice = [
    { label: "Приставка", value: "player" },
    { label: "Телевизор", value: "tv" },
    { label: "Остановка", value: "bus_stop" },
    { label: "Холодильник", value: "ref" }
];
const weekDevice = [
    { label: "Пнд", value: "mon" },
    { label: "Втр", value: "tue" },
    { label: "Срд", value: "wed" },
    { label: "Чтв", value: "thu" },
    { label: "Птн", value: "fri" },
    { label: "Сбт", value: "sat" },
    { label: "Вск", value: "sun" }
];
const typeDisplay = [
    { label: "Билборд", value: "BB" },
    { label: "Суперсайт", value: "SS" },
    { label: "Ситиборд", value: "CB" },
    { label: "Скроллер", value: "SC" },
    { label: "Видеоэкран", value: "VS" }
];
const vendorDevicePlayer = [
    { label: "SpinetiX", value: "SpinetiX" },
    { label: "BrightSign", value: "brightsign" },
    { label: "Iadea", value: "iadea" },
    { label: "Windows", value: "win" }
];
const vendorDeviceTv = [
    { label: "Samsung", value: "samsung" },
    { label: "Lg", value: "lg" },
];
const vendorDeviceBusStop = [
    { label: "Rostelecom", value: "rostelecom" }
];
const regionDevice = [
    { label: "Нижегородская область", value: "NO" },
    { label: "Московская область", value: "MO" }
];

const hoursData = [
    { label: "0-1", value: "0" },
    { label: "1-2", value: "1" },
    { label: "2-3", value: "2" },
    { label: "3-4", value: "3" },
    { label: "4-5", value: "4" },
    { label: "5-6", value: "5" },
    { label: "6-7", value: "6" },
    { label: "7-8", value: "7" },
    { label: "8-9", value: "8" },
    { label: "9-10", value: "9" },
    { label: "10-11", value: "10" },
    { label: "11-12", value: "11" },
    { label: "12-13", value: "12" },
    { label: "13-14", value: "13" },
    { label: "14-15", value: "14" },
    { label: "15-16", value: "15" },
    { label: "16-17", value: "16" },
    { label: "17-18", value: "17" },
    { label: "18-19", value: "18" },
    { label: "19-20", value: "19" },
    { label: "20-21", value: "20" },
    { label: "21-22", value: "21" },
    { label: "22-23", value: "22" },
    { label: "23-24", value: "23" }
];
const vendorFunc = type => {
    if (type == "tv") {
        return vendorDeviceTv;
    } else if (type == "bus_stop") {
        return vendorDeviceBusStop;
    } else if (type == "player") {
        return vendorDevicePlayer;
    } else {
        return [];
    }
}
const CreateDevice = props => {
    const { user, currentUser } = props;
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

    const [setting, setSetting] = useState({
        titleErrorText: "",
        file_path: '',
        togglerLightBox: false
    });
    const updateSetting = data => {
        setSetting(data);
    };

    const [hoursHelp, setHoursHelp] = useState(false);
    const [hoursHelp2, setHoursHelp2] = useState(50);

    // const [boards, setBoards] = useState([]);
    // const [isDrawerOpened, setDrawerState] = useState(false);
    // const [duration, setDuration] = useState(5);
    // const [selectedFiles, setSelectedFiles] = useState([]);
    // const [options, setOptions] = useState(null);
    // const [size, setSize] = useState([]);

    const [files, setFiles] = useState({});
    const { id } = useParams();
    useEffect(() => {
        getBoardInfo();
    }, []);

    const preSetFiles = (files, board) => {
        const fil = Object.entries(files).map(([key, value]) => {

            if (key == "night_pause" && files[key].length == 0) {
                var slide = {
                    id: "default",
                    title: "Заглушка по умолчанию",
                    mime: "image/jpeg",
                    link: "pause" + board.resolution.split('x')[0] + "x" + board.resolution.split('x')[1] + ".jpg",
                    path_url: "https://st.de4.ru/pauses/"
                }
                files[key][0] = slide
            }
        });

        console.log("onUpdateWeekonUpdateWeekonUpdateWeekonUpdateWeek")
        console.log(board.days)

        setFiles(files);
    };
    const getBoardInfo = async (type = "all") => {
        if (!id) return;
        //try {
        let res = await device_info(id, currentUser);
        console.log('preSetFilespreSetFilespreSetFilespreSetFiles22222');

        let arrCategoryFiles = ['photo', 'pause', "night_pause"]
        let board_files = {}
        arrCategoryFiles.forEach((val) => {
            if (!res.data.board.board_files || !res.data.board.board_files[val]) {
                board_files[val] = []
            } else {
                board_files[val] = res.data.board.board_files[val]
            }
        })

        res.data.board.board_files = board_files

        if (type == "files") {
            let newFileData = { ...data, board_files: res.data.board.board_files }
            setData(newFileData);
        } else {
            setData(Object.assign(res.data.board, res.data.board_device));

            let uniq = [...new Set(res.data.board.hour_cost)];
            if (uniq.length > 1) {
                setHoursHelp(true)
            } else {
                setHoursHelp2(uniq[0])
            }
            onUpdateWeek(res.data.board.days, true);
            onUpdateHours(res.data.board.hours, true);
        }

        console.log('preSetFilespreSetFilespreSetFilespreSetFiles');
        console.log(res.data.board.board_files);

        preSetFiles(res.data.board.board_files, res.data.board);

        // } catch (err) {
        //      alert({title: "Ошибка!", text: "Мы исправляем ошибку"});
        //      console.error(err);
        // }
    };

    const { intl } = props;
    const [loading, setLoading] = useState(false);
    const [loadingButtonStyle, setLoadingButtonStyle] = useState({
        paddingRight: "2.5rem"
    });
    const enableLoading = () => {
        setLoading(true);
        setLoadingButtonStyle({ paddingRight: "3.5rem" });
    };
    const disableLoading = () => {
        setLoading(false);
        setLoadingButtonStyle({ paddingRight: "2.5rem" });
    };

    const cityDevice = {
        MO: [{ label: "Москва", value: "MSK" }],
        NO: [{ label: "Нижний Новгород", value: "NN" }]
    };

    const sideDisplay = [
        { label: "A", value: "A" },
        { label: "B", value: "B" }
    ];
    const [week, setWeek] = useState(weekDevice);

    const [hours, setHours] = useState(hoursData);
    const onUpdateHours = (e, status = 0) => {
        let hhh = e => {
            const hour = hours.map((item, j) => {
                if (e.includes(item.value)) {
                    item.checked = status != 0 ? status : !item.checked;
                    return item;
                } else {
                    return item;
                }
            });
            return hour;
        };

        let data = hhh(e);

        setHours(data);
    };
    const onUpdateWeek = (e, status = 0) => {
        let hhh = e => {
            const wee = week.map((item, j) => {
                if (e.includes(item.value)) {
                    item.checked = status != 0 ? status : !item.checked;
                    return item;
                } else {
                    return item;
                }
            });
            return wee;
        };
        let data = hhh(e);
        console.log('hhh(e)hhh(e)hhh(e)hhh(e)hhh(e)hhh(e)')
        console.log(data)

        setWeek(data);
    };
    const [data, setData] = useState({
        title: "",
        description: "",
        width: "",
        height: "",
        resolution: "",
        type: "",
        vendor: "",
        lat: "",
        lng: "",
        timezone: "",
        region: "",
        city: "",
        response_length: "",
        activeCustomer: 1,
        active: 1,
        //activeYandex: 0,
        model: "",
        ip: "",
        rtsp: "",
        idshopster: "",
        hour_cost: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        tvserial: "",
        typeD: "",
        side: "",
        address: ""
    });

    const alert = data => {
        Swal.fire({
            title: data.title,
            timer: 3000,
            text: data.text
        });
    };
    const [uploadProgress, updateUploadProgress] = useState(0);
    const [uploadGo, setUploadGo] = useState(false);

    let fileInput = null;
    const triggerInputFile = () => fileInput.click();

    let fileInput2 = null;
    const triggerInputFile2 = () => fileInput2.click();

    let fileInput3 = null;
    const triggerInputFile3 = () => fileInput3.click();

    const handleChangeFile = (file, type) => {
        // let file = event.target.files[0]
        if (file.type !== "video/mp4") {
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                uploadNewFile(file, type);
                //setImgUrl([...imgUrl, image.src]);
            };
        } else {
            uploadNewFile(file, type);
        }
    };
    const uploadNewFile = (file, type) => {
        let formData = new FormData();
        formData.append("file", file);

        setUploadGo(type);
        const options = {
            onUploadProgress: (ev) => {
                const progress = (ev.loaded / ev.total) * 100;
                updateUploadProgress(Math.round(progress));
            }
        };
        axios
            .post(
                `https://ru.de4.ru/updateBF?subuser=${currentUser.id}&id=${id}&type=${type}`,
                formData,
                options
            )
            .then(res => {
                setUploadGo("");
                if (res.data.status === "fail") {
                    if (res.data.error === "no_more") {
                        alert({ title: "Вы привысили лимит в 15 файлов!" });
                    } else if (res.data.error === "no_resolution") {
                        alert({ title: "Разрешение файла не соответствует устройству" });
                    } else {
                        alert({ title: "Не удалось загрузить файл!" });
                    }
                } else {
                    alert({ title: "Файл загружен!" });
                    //window.scrollTo(0, 0);
                    getBoardInfo("files");
                    //props.setPictures(res.data.file);
                    //addNewFile(res.data.file);
                }
            })
            .catch(error => {
                setUploadGo("");
                console.log(error);
            });
    };

    return (
        <>
            <Formik
                key={'formikKey'}
                validateOnChange={true}
                enableReinitialize={true}
                initialValues={{
                    title: data.title,
                    description: data.description,
                    width: data.width,
                    height: data.height,
                    resolution: data.resolution,
                    resolutionX: data.resolution == "" ? "" : data.resolution.split('x')[0],
                    resolutionY: data.resolution == "" ? "" : data.resolution.split('x')[1],
                    type: data.type,
                    vendor: data.vendor,
                    model: data.model,
                    idshopster: data.idshopster,
                    rtsp: data.rtsp,
                    ip: data.ip,
                    lat: data.lat,
                    lng: data.lng,
                    timezone: data.timezone,
                    days: [],
                    hours: [],
                    region: data.region,
                    city: data.city,
                    response_length: data.response_length,
                    activeCustomer: data.activeCustomer,
                    active: data.active,
                    //activeYandex: data.activeYandex,
                    //yandex_page: data.yandex_page,
                    //yandex_id: data.yandex_id,
                    hour_cost: data.hour_cost,
                    hour0_cost: data.hour_cost[0],
                    hour1_cost: data.hour_cost[1],
                    hour2_cost: data.hour_cost[2],
                    hour3_cost: data.hour_cost[3],
                    hour4_cost: data.hour_cost[4],
                    hour5_cost: data.hour_cost[5],
                    hour6_cost: data.hour_cost[6],
                    hour7_cost: data.hour_cost[7],
                    hour8_cost: data.hour_cost[8],
                    hour9_cost: data.hour_cost[9],
                    hour10_cost: data.hour_cost[10],
                    hour11_cost: data.hour_cost[11],
                    hour12_cost: data.hour_cost[12],
                    hour13_cost: data.hour_cost[13],
                    hour14_cost: data.hour_cost[14],
                    hour15_cost: data.hour_cost[15],
                    hour16_cost: data.hour_cost[16],
                    hour17_cost: data.hour_cost[17],
                    hour18_cost: data.hour_cost[18],
                    hour19_cost: data.hour_cost[19],
                    hour20_cost: data.hour_cost[20],
                    hour21_cost: data.hour_cost[21],
                    hour22_cost: data.hour_cost[22],
                    hour23_cost: data.hour_cost[23],
                    tvserial: data.tvserial,
                    typeD: data.typeD,
                    side: data.side,
                    address: data.address
                }}
                validate={values => {
                    values.hours = [];
                    hours.map((item, j) => {
                        if (item.checked) {
                            values.hours.push(item.value);
                        }
                    });

                    values.days = [];
                    week.map((item, j) => {
                        if (item.checked) {
                            values.days.push(item.value);
                        }
                    });

                    let req = intl.formatMessage({
                        id: "AUTH.VALIDATION.REQUIRED_FIELD"
                    });
                    const errors = {};

                    if (!values.title || values.title.length < 4) {
                        errors.title = `${req}, не менее 4 символов`;
                    }

                    if (!!values.ip &&
                        !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(values.ip)
                    ) {
                        errors.ip = "Неверный IP";
                    }
                    //if (!values.ip) {
                    //    errors.ip = req;
                    // }
                    if (!values.description) {
                        errors.description = req;
                    }
                    if (!values.width) {
                        errors.width = req;
                    }
                    if (!values.height) {
                        errors.height = req;
                    }
                    if (!values.resolutionX) {
                        errors.resolutionX = req;
                    }
                    if (!values.resolutionY) {
                        errors.resolutionY = req;
                    }
                    if (!values.model) {
                        errors.model = req;
                    }
                    if (!values.type) {
                        errors.type = req;
                    }
                    //if (!values.vendor) {
                    //    errors.vendor = req;
                    //}
                    if (!values.days.length) {
                        errors.days = "Укажите дни";
                    }
                    if (!values.hours.length) {
                        errors.hours = "Укажите часы";
                    }
                    return errors;
                }}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                    enableLoading();
                    setSubmitting(true);
                    setTimeout(() => {
                        let hour_cost = [];
                        let sortVal = {};
                        Object.keys(values).map((key) => {
                            if (key.indexOf('_cost') > -1) {
                                let numH = key.replace("_cost", "");
                                numH = numH.replace("hour", "");
                                hour_cost[numH] = +values[key]
                                return;
                            }
                            if (key.indexOf('resolution') > -1) {
                                return;
                            }
                            if (!!values[key]) {
                                sortVal[key] = values[key];
                            }
                        })
                        sortVal["hour_cost"] = hour_cost
                        sortVal["activeCustomer"] = values.activeCustomer ? 1 : 0
                        sortVal["active"] = values.active ? 1 : 0
                        //if (values.activeCustomer) {
                        //    sortVal["activeCustomer"] = 1;
                        //}
                        //if (values.active) {
                        //    sortVal["active"] = 1;
                        //}

                        sortVal["resolution"] = values["resolutionX"] + 'x' + values["resolutionY"];

                        //  console.log('hour_costhour_costhour_cost1')
                        //   console.log(hour_cost)
                        //console.log(sortVal)

                        save_device_edit_add(id, sortVal, currentUser)
                            .then(({ data: { status, error, id } }) => {
                                if (status === "fail") {
                                    setSubmitting(false);
                                    var error_data = "";
                                    Object.entries(error).map(([key, value]) => {
                                        error_data += value;
                                    });
                                    alert({
                                        title: "Ошибка, не сохранено",
                                        text: error_data
                                    });
                                } else {
                                    alert({ title: "Cохранено" });
                                    let urlB = '/myboards';

                                    if (!!id) {
                                        urlB = urlB + '/view/' + id;
                                    }

                                    setTimeout(() => {
                                        props.history.push(urlB);
                                    }, 800);
                                }
                                disableLoading();
                            })
                            .catch(err => {
                                disableLoading();
                                setSubmitting(false);
                                alert({ title: "Ошибка, не сохранено" });
                            });
                    }, 500);
                }}
            >
                {({
                    values,
                    status,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                    dirty
                }) => (
                    <form
                        key={'formikKeyForm'}
                        //noValidate={true}
                        autoComplete="off"
                        className="kt-form kt-portlet__body"
                        onSubmit={handleSubmit}
                    >
                        <div className={'row nol mx-0'}>
                            <div className={`tranz p-0 p-sm-3 col-md-6 col-12`}>
                                <Accordion expanded={expanded.indexOf('panel1') > -1}
                                    onChange={() => {
                                        if (expanded.indexOf('panel1') == -1) handleChange('panel1');
                                    }}
                                    className={'px-md-3 px-2 mt-3'}
                                    elevation={2}
                                >
                                    <AccordionSummary
                                        expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel2')}><ExpandMoreIcon /></IconButton>}
                                        className={'px-0'}
                                    >
                                        <AccordionHead name={"Данные устройства"} numb={'1'} />
                                    </AccordionSummary>
                                    <AccordionDetails className={'flex-column container-fluid nol pt-0 pb-2'}>
                                        <div className={'container-fluid'}>
                                            <div className={'row'}>
                                                <div className="col-12 col-lg-9 col-xl-8 text-md-left px-0">
                                                    <TextField
                                                        variant="outlined"
                                                        label="Название устройства"
                                                        value={values.title}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.title && errors.title}
                                                        error={Boolean(touched.title && errors.title)}
                                                        placeholder=""

                                                        name={'title'}
                                                        fullWidth
                                                        FormHelperTextProps={{ classes: { root: classes.helperText } }}
                                                        //InputLabelProps={{
                                                        //    shrink: true,
                                                        // }}
                                                        className={'minHeight70'}
                                                    />
                                                </div>
                                                <div className="col-12 col-lg-9 col-xl-8 text-md-left px-0">
                                                    <TextField
                                                        variant="outlined"
                                                        label="Описание"
                                                        // rows={1}
                                                        value={values.description}
                                                        placeholder=""
                                                        fullWidth
                                                        FormHelperTextProps={{ classes: { root: classes.helperText } }}
                                                        className={'minHeight70'}
                                                        name="description"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={
                                                            touched.description && errors.description
                                                        }
                                                        error={Boolean(
                                                            touched.description && errors.description
                                                        )}
                                                    />
                                                </div>

                                                <div className="col-12 pb-0 mt-1 mb-3 px-0">
                                                    <Typography className={`font-weight-bold ml-2 ml-md-0`}>Размеры</Typography>
                                                </div>

                                                <div className="col-xl-6 px-0 pr-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        className={'minHeight70'}
                                                        label="Ширина в см"
                                                        value={values.width}
                                                        name="width"
                                                        type="number"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        inputProps={{ maxLength: 4 }}
                                                        onChange={handleChange}
                                                        helperText={touched.width && errors.width}
                                                        error={Boolean(touched.width && errors.width)}
                                                    />
                                                </div>
                                                <div className="col-xl-6 px-0 pl-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Высота в см"
                                                        inputProps={{ maxLength: 4 }}
                                                        value={values.height}
                                                        name="height"
                                                        type="number"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.height && errors.height}
                                                        error={Boolean(
                                                            touched.height && errors.height
                                                        )}
                                                    />
                                                </div>
                                                <div className="col-xl-6 px-0 pr-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        select
                                                        fullWidth
                                                        label="Тип экрана"
                                                        className="minHeight70 form-control form-control-lg"
                                                        value={values.typeD}
                                                        name="typeD"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.typeD && errors.typeD}
                                                        error={Boolean(touched.typeD && errors.typeD)}
                                                    >
                                                        {typeDisplay.map(option => (
                                                            <MenuItem
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>
                                                <div className="col-xl-6 px-0 pl-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        select
                                                        fullWidth
                                                        label="Сторона"
                                                        className="minHeight70"
                                                        value={values.side}
                                                        name="side"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.side && errors.side}
                                                        error={Boolean(
                                                            touched.side && errors.side
                                                        )}
                                                    >
                                                        {sideDisplay.map(option => (
                                                            <MenuItem
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>
                                                <div className="col-xl-6 px-0 pr-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Разрешение по ширине (px)"
                                                        value={values.resolutionX}
                                                        name="resolutionX"
                                                        type="number"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{ maxLength: 4 }}
                                                        helperText={
                                                            touched.resolutionX && errors.resolutionX
                                                        }
                                                        error={Boolean(
                                                            touched.resolutionX && errors.resolutionX
                                                        )}
                                                    />
                                                </div>
                                                <div className="col-xl-6 px-0 pl-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Разрешение по высоте (px)"
                                                        value={values.resolutionY}
                                                        name="resolutionY"
                                                        type="number"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={
                                                            touched.resolutionY && errors.resolutionY
                                                        }
                                                        inputProps={{ maxLength: 4 }}
                                                        error={Boolean(
                                                            touched.resolutionY && errors.resolutionY
                                                        )}
                                                    />
                                                </div>

                                                <div className="col-12 pb-0 mt-1 mb-3 px-0">
                                                    <Typography className={`font-weight-bold ml-2 ml-md-0`}>Вид оборудования</Typography>
                                                </div>

                                                <div className="col-xl-6 px-0 pr-md-2">
                                                    <TextField
                                                        select
                                                        label="Тип устройства"
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        value={values.type}
                                                        name="type"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.type && errors.type}
                                                        error={Boolean(touched.type && errors.type)}
                                                    >
                                                        {typeDevice.map(option => (
                                                            <MenuItem
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>

                                                <div className="col-xl-6 px-0 pl-md-2">
                                                    <TextField
                                                        select
                                                        label="Производитель"
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        value={values.vendor}
                                                        name="vendor"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.vendor && errors.vendor}
                                                        error={Boolean(
                                                            touched.vendor && errors.vendor
                                                        )}
                                                    >
                                                        {vendorFunc(values.type).map(option => (
                                                            <MenuItem
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>
                                                <div className="col-xl-6 px-0 pr-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Модель"
                                                        value={values.model}
                                                        name="model"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.model && errors.model}
                                                        error={Boolean(touched.model && errors.model)}
                                                    />
                                                </div>
                                                <div className="col-xl-6 px-0 pl-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="IP"
                                                        value={values.ip}
                                                        name="ip"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.ip && errors.ip}
                                                        error={Boolean(touched.ip && errors.ip)}
                                                    />
                                                </div>
                                                {values.type == "tv" &&
                                                    <div className="col-xl-6 px-0">
                                                        <TextField
                                                            variant="outlined"
                                                            className="minHeight70"
                                                            label="TV серийный номер"
                                                            value={values.tvserial}
                                                            name="tvserial"
                                                            fullWidth
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            helperText={
                                                                touched.tvserial && errors.tvserial
                                                            }
                                                            error={Boolean(
                                                                touched.tvserial && errors.tvserial
                                                            )}
                                                        />
                                                    </div>
                                                }
                                                <div className="col-12 pb-0 mt-1 mb-3 px-0">
                                                    <Typography className={`font-weight-bold ml-2 ml-md-0`}>Подключение данных</Typography>
                                                </div>
                                                <div className="col-xl-6 px-0 pr-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Id Шопстер"
                                                        value={values.idshopster}
                                                        name="idshopster"
                                                        fullWidth
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.idshopster && errors.idshopster}
                                                        error={Boolean(touched.idshopster && errors.idshopster)}
                                                    />
                                                </div>
                                                <div className="col-xl-6 px-0 pl-md-2">
                                                    <TextField
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="RTSP URL"
                                                        value={values.rtsp}
                                                        name="rtsp"
                                                        fullWidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.rtsp && errors.rtsp}
                                                        error={Boolean(touched.rtsp && errors.rtsp)}
                                                    />
                                                </div>





                                                <div className="col-12 pb-0 my-1 px-0">
                                                    <Typography className={`font-weight-bold ml-2 ml-md-0`}>Расписание работы</Typography>
                                                </div>

                                                <div className="col-12 col-lg-9 col-xl-8 text-md-left px-0">
                                                    <div className="mb-2 Mui-error">
                                                        <ScheduleSelector
                                                            selection={week}
                                                            error={errors.days}
                                                            onChange={e => onUpdateWeek([e.target.value])}
                                                        />
                                                    </div>
                                                    <div>
                                                        <ScheduleSelector
                                                            selection={hours}
                                                            error={errors.hours}
                                                            onChange={e => onUpdateHours([e.target.value])}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-12 pb-0 mt-1 mb-3 px-0">
                                                    <Typography className={`font-weight-bold ml-2 ml-md-0`}>Расположение</Typography>
                                                </div>

                                                <div className="col-xl-6 px-0 pr-md-2">
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Широта"
                                                        name="lat"
                                                        //size="small"
                                                        value={values.lat}
                                                        onChange={e => {
                                                            var rgx = /^[0-9]*\.?[0-9]*$/;
                                                            if (e.target.value.match(rgx)) {
                                                                handleChange(e)
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-xl-6 px-0 pl-md-2">
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Долгота"
                                                        name="lng"
                                                        //size="small"
                                                        value={values.lng}
                                                        onChange={e => {
                                                            var rgx = /^[0-9]*\.?[0-9]*$/;
                                                            if (e.target.value.match(rgx)) {
                                                                handleChange(e)
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div className="col-xl-6 px-0 pr-md-2">
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Регион"
                                                        select
                                                        value={values.region}
                                                        name="region"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={touched.region && errors.region}
                                                        error={Boolean(
                                                            touched.region && errors.region
                                                        )}
                                                    >
                                                        {regionDevice.map(option => (
                                                            <MenuItem
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </div>
                                                <div className="col-xl-6 px-0 pl-md-2">
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Город"
                                                        select
                                                        value={values.city}
                                                        name="city"
                                                        onBlur={handleBlur}
                                                        disabled={values.region == ''}
                                                        onChange={handleChange}
                                                        helperText={touched.city && errors.city}
                                                        error={Boolean(touched.city && errors.city)}
                                                    >
                                                        {values.region != '' && cityDevice[values.region].map(option => (
                                                            <MenuItem
                                                                key={option.value}
                                                                value={option.value}
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                        {values.region == '' &&
                                                            <MenuItem
                                                                key={'emptyCity'}
                                                                value={''}
                                                            ></MenuItem>
                                                        }
                                                    </TextField>
                                                </div>

                                                <div className="col-12 px-0">
                                                    <TextField
                                                        fullWidth
                                                        className="minHeight70"
                                                        label="Часовой пояс"
                                                        name="timezone"
                                                        variant="outlined"
                                                        value={values.timezone}
                                                    />
                                                </div>

                                                <div className="col-12 px-0">
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Адрес"
                                                        rows={1}
                                                        value={values.address}
                                                        name="address"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        helperText={
                                                            touched.address && errors.address
                                                        }
                                                        error={Boolean(
                                                            touched.address && errors.address
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>


                                {!!id &&
                                    <>
                                        <Accordion expanded={expanded.indexOf('panel2') > -1}
                                            onChange={expanded.indexOf('panel2') == -1 ? handleChange('panel2') : ""}
                                            elevation={2}
                                        >
                                            <AccordionSummary
                                                expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel2')}><ExpandMoreIcon /></IconButton>}
                                            >
                                                <AccordionHead name={"Фото экрана"} numb={'2'} />
                                            </AccordionSummary>
                                            <AccordionDetails className={`flex-column px-0`}>
                                                <Box fontSize={14} className={'px-4 pt-0 pb-3'}> Максимальный размер файла
                                                    5MB, Максимум 15 файлов</Box>
                                                {!!files &&
                                                    !!files.photo &&
                                                    files.photo.map(option => (
                                                        <Box>
                                                            <Hidden only={["xs", "sm"]}>
                                                                <AlbumViewDesktop
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"photo"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                            <Hidden only={["md", "lg", "xl", "xs"]}>
                                                                <AlbumViewTablet
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"photo"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                            <Hidden only={["md", "lg", "xl", "sm"]}>
                                                                <AlbumViewMobile
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"photo"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                        </Box>
                                                    ))}
                                                {uploadGo == 'photo' && (
                                                    <>
                                                        <Grid
                                                            container
                                                            className="justify-content-center"
                                                        >
                                                            <Grid
                                                                item
                                                                md={7}
                                                                classes={{ root: classes.dataContainer }}
                                                            >
                                                                <ProgressLoader progress={uploadProgress} />
                                                            </Grid>
                                                        </Grid>
                                                        <Divider />
                                                    </>
                                                )}
                                                <div className={'px-4'}>
                                                    <input
                                                        style={{
                                                            opacity: "0",
                                                            width: "0.5px",
                                                            height: "0.5px"
                                                        }}
                                                        type="file"
                                                        ref={input => (fileInput3 = input)}
                                                        accept=".mp4, .jpg, .jpeg"
                                                        onChange={e => {
                                                            if (!!e.target.files[0]) {
                                                                handleChangeFile(e.target.files[0], 'photo')
                                                            }
                                                        }
                                                        }
                                                    />
                                                    <Button variant="outlined" size="medium" color="primary"
                                                        className={`w-100 mb-0 ${classes.margin}`}
                                                        onClick={triggerInputFile3}>
                                                        Добавить файлы
                                                    </Button>
                                                </div>

                                            </AccordionDetails>
                                        </Accordion>


                                        <Accordion expanded={expanded.indexOf('panel3') > -1}
                                            onChange={expanded.indexOf('panel3') == -1 ? handleChange('panel3') : ""}
                                            elevation={2}
                                        >
                                            <AccordionSummary expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel3')}><ExpandMoreIcon /></IconButton>} >
                                                <AccordionHead name={"Файлы заглушек"} numb={'3'} />
                                            </AccordionSummary>
                                            <AccordionDetails className={`flex-column px-0`}>

                                                <Box fontSize={14} className={'px-4 pt-0 pb-3'}>Максимальный размер файла
                                                    8MB, Максимум 15 файлов</Box>
                                                {!!files &&
                                                    !!files.pause &&
                                                    files.pause.map(option => (
                                                        <>
                                                            <Hidden only={["xs", "sm"]}>
                                                                <AlbumViewDesktop
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"pause"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                            <Hidden only={["md", "lg", "xl", "xs"]}>
                                                                <AlbumViewTablet
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"pause"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                            <Hidden only={["md", "lg", "xl", "sm"]}>
                                                                <AlbumViewMobile
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"pause"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                        </>
                                                    ))}
                                                {uploadGo == 'pause' && (
                                                    <>
                                                        <Grid container className="justify-content-center" >
                                                            <Grid
                                                                item
                                                                md={7}
                                                                classes={{ root: classes.dataContainer }}
                                                            >
                                                                <ProgressLoader progress={uploadProgress} />
                                                            </Grid>
                                                        </Grid>
                                                        <Divider />
                                                    </>
                                                )}
                                                <div className={'px-4'}>
                                                    <input
                                                        style={{
                                                            opacity: "0",
                                                            width: "0.5px",
                                                            height: "0.5px"
                                                        }}
                                                        type="file"
                                                        ref={input => (fileInput = input)}
                                                        accept=".mp4, .jpg, .jpeg"
                                                        onChange={e => {
                                                            if (!!e.target.files[0]) {
                                                                handleChangeFile(e.target.files[0], 'pause')
                                                            }
                                                        }
                                                        }
                                                    />
                                                    <Button variant="outlined" size="medium" color="primary"
                                                        className={`w-100 mb-0 ${classes.margin}`}
                                                        onClick={triggerInputFile}>
                                                        Добавить файлы
                                                    </Button>
                                                </div>

                                            </AccordionDetails>
                                        </Accordion>


                                        <Accordion expanded={expanded.indexOf('panel4') > -1}
                                            onChange={expanded.indexOf('panel4') == -1 ? handleChange('panel4') : ""}
                                            elevation={2}
                                        >
                                            <AccordionSummary
                                                expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel4')}><ExpandMoreIcon /></IconButton>}
                                            >
                                                <AccordionHead name={"Ночные заглушки"} numb={'4'} />
                                            </AccordionSummary>
                                            <AccordionDetails className={`flex-column px-0`}>
                                                <Box fontSize={14} className={'px-4 pt-0 pb-3'}>Максимальный размер файла 5MB, Максимум 15 файлов</Box>
                                                {!!files &&
                                                    !!files.night_pause && !!files.night_pause.length &&
                                                    files.night_pause.map(option => (
                                                        <>
                                                            <Hidden only={["xs", "sm"]}>
                                                                <AlbumViewDesktop
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"night"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                            <Hidden only={["md", "lg", "xl", "xs"]}>
                                                                <AlbumViewTablet
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"night"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                            <Hidden only={["md", "lg", "xl", "sm"]}>
                                                                <AlbumViewMobile
                                                                    setSetting={setSetting}
                                                                    setting={setting}
                                                                    classes={classes}
                                                                    option={option}
                                                                    getBoardInfo={getBoardInfo}
                                                                    id={id}
                                                                    type={"night"}
                                                                    currentUser={currentUser}
                                                                />
                                                            </Hidden>
                                                        </>
                                                    ))}
                                                {uploadGo == 'night' && (
                                                    <>
                                                        <Grid
                                                            container
                                                            className="justify-content-center"
                                                        >
                                                            <Grid
                                                                item
                                                                md={7}
                                                                classes={{ root: classes.dataContainer }}
                                                            >
                                                                <ProgressLoader progress={uploadProgress} />
                                                            </Grid>
                                                        </Grid>
                                                        <Divider />
                                                    </>
                                                )}
                                                <div className={'px-4'}>
                                                    <input
                                                        style={{
                                                            opacity: "0",
                                                            width: "0.5px",
                                                            height: "0.5px"
                                                        }}
                                                        type="file"
                                                        ref={input => (fileInput2 = input)}
                                                        accept=".mp4, .jpg, .jpeg"
                                                        onChange={e => {
                                                            if (!!e.target.files[0]) {
                                                                handleChangeFile(e.target.files[0], 'night')
                                                            }
                                                        }
                                                        }
                                                    />
                                                    <Button variant="outlined" size="medium" color="primary"
                                                        className={`w-100 mb-0 ${classes.margin}`}
                                                        onClick={triggerInputFile2}>
                                                        Добавить файлы
                                                    </Button>
                                                </div>

                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                }

                                <Accordion expanded={expanded.indexOf('panel5') > -1}
                                    onChange={expanded.indexOf('panel5') == -1 ? handleChange('panel5') : ""}
                                    className={''}
                                    elevation={2}
                                >
                                    <AccordionSummary expandIcon={<IconButton className={'ExpandArrow'} onClick={handleChange('panel5')}><ExpandMoreIcon /></IconButton>} >
                                        <AccordionHead name={"Дополнительные настройки"} numb={'5'} />
                                    </AccordionSummary>
                                    <AccordionDetails className={`flex-column px-0 pt-0`}>
                                        <div className={'container-fluid'}>
                                            <div className={'row'}>
                                                <div className="col-12 pb-0 mt-1 mb-3 px-3">
                                                    <Typography className={`font-weight-bold ml-2 ml-md-0`}>Стоимость 5ти секунд</Typography>
                                                </div>

                                                <div className="col-xl-6 px-3 pr-md-2">
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        className="minHeight70"
                                                        label="Единая цена"
                                                        type="number"
                                                        value={hoursHelp2}
                                                        name="hour_cost"
                                                        onBlur={handleBlur}
                                                        onChange={e => {
                                                            let cc = e.target.value;

                                                            let rgx = /^[0-9]*\.?[0-9]*$/;
                                                            if (cc === '' || cc.match(rgx) !== null) {

                                                                console.log(cc);

                                                                setHoursHelp2(cc);
                                                                setData({
                                                                    ...values,
                                                                    hour_cost: new Array(24).fill(cc), resolution: data.resolution
                                                                })
                                                            }
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={hoursHelp}
                                                                onChange={() => setHoursHelp(!hoursHelp)}
                                                                color="primary"
                                                                inputProps={{
                                                                    "aria-label": "primary checkbox"
                                                                }}
                                                            />
                                                        }
                                                        label="Плавающая цена"
                                                        labelPlacement="end"
                                                        size={'small'}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <Collapse in={hoursHelp}>
                                                        <div className={'container-fluid'}>
                                                            <div className={'row'}>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="00-01"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        value={values.hour0_cost}
                                                                        name="hour0_cost"
                                                                        type="number"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour0_cost && errors.hour0_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour0_cost && errors.hour0_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="01-02"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour1_cost}
                                                                        name="hour1_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour1_cost && errors.hour1_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour1_cost && errors.hour1_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="02-03"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour2_cost}
                                                                        name="hour2_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour2_cost && errors.hour2_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour2_cost && errors.hour2_cost
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="03-04"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour3_cost}
                                                                        name="hour3_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour3_cost && errors.hour3_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour3_cost && errors.hour3_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="04-05"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour4_cost}
                                                                        name="hour4_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour4_cost && errors.hour4_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour4_cost && errors.hour4_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="05-06"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour5_cost}
                                                                        name="hour5_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour5_cost && errors.hour5_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour5_cost && errors.hour5_cost
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="06-07"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour6_cost}
                                                                        name="hour6_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour6_cost && errors.hour6_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour6_cost && errors.hour6_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="07-08"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour7_cost}
                                                                        name="hour7_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour7_cost && errors.hour7_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour7_cost && errors.hour7_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="08-09"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour8_cost}
                                                                        name="hour8_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour8_cost && errors.hour8_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour8_cost && errors.hour8_cost
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="09-10"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour9_cost}
                                                                        name="hour9_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour9_cost && errors.hour9_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour9_cost && errors.hour9_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="10-11"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour10_cost}
                                                                        name="hour10_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour10_cost && errors.hour10_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour10_cost && errors.hour10_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="11-12"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour11_cost}
                                                                        name="hour11_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour11_cost && errors.hour11_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour11_cost && errors.hour11_cost
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="12-13"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour12_cost}
                                                                        name="hour12_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour12_cost && errors.hour12_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour12_cost && errors.hour12_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="13-14"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour13_cost}
                                                                        name="hour13_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour13_cost && errors.hour13_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour13_cost && errors.hour13_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="14-15"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour14_cost}
                                                                        name="hour14_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour14_cost && errors.hour14_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour14_cost && errors.hour14_cost
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="15-16"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour15_cost}
                                                                        name="hour15_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour15_cost && errors.hour15_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour15_cost && errors.hour15_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="16-17"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour16_cost}
                                                                        name="hour16_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour16_cost && errors.hour16_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour16_cost && errors.hour16_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="17-18"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour17_cost}
                                                                        name="hour17_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour17_cost && errors.hour17_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour17_cost && errors.hour17_cost
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="18-19"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour18_cost}
                                                                        name="hour18_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour18_cost && errors.hour18_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour18_cost && errors.hour18_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="19-20"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour19_cost}
                                                                        name="hour19_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour19_cost && errors.hour19_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour19_cost && errors.hour19_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="20-21"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour20_cost}
                                                                        name="hour20_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour20_cost && errors.hour20_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour20_cost && errors.hour20_cost
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="21-22"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour21_cost}
                                                                        name="hour21_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour21_cost && errors.hour21_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour21_cost && errors.hour21_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="22-23"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour22_cost}
                                                                        name="hour22_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour22_cost && errors.hour22_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour22_cost && errors.hour22_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className="col-xl-3">
                                                                    <TextField
                                                                        className="form-control form-control-lg"
                                                                        label="23-24"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        type="number"
                                                                        value={values.hour23_cost}
                                                                        name="hour23_cost"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                        helperText={
                                                                            touched.hour23_cost && errors.hour23_cost
                                                                        }
                                                                        error={Boolean(
                                                                            touched.hour23_cost && errors.hour23_cost
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Collapse>
                                                </div>

                                                <div className="col-12 pb-0 mt-3 mb-1 px-3">
                                                    <Typography className={`font-weight-bold ml-2 ml-md-0`}>Настройки приватности</Typography>
                                                </div>

                                                <div className="col-xl-6 px-3 pr-md-2">
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={values.activeCustomer}
                                                                onChange={handleChange}
                                                                color="primary"
                                                                name="activeCustomer"
                                                                inputProps={{
                                                                    "aria-label": "primary checkbox"
                                                                }}
                                                            />
                                                        }
                                                        label="Доступен рекламодателю"
                                                        labelPlacement="end"
                                                    />
                                                </div>

                                                <div className="col-xl-6 px-3 pr-md-2">
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={values.active}
                                                                onChange={handleChange}
                                                                color="primary"
                                                                name="active"
                                                                inputProps={{
                                                                    "aria-label": "primary checkbox"
                                                                }}
                                                            />
                                                        }
                                                        label="Включить/Выключить устройство"
                                                        labelPlacement="end"
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                    </AccordionDetails>
                                </Accordion>


                                <div className="my-4 text-right">
                                    <button
                                        className={`btn btn-success text-uppercase ml-auto ${classes.startButton} ${clsx({
                                            "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": isSubmitting
                                        })}`}
                                        type="submit"
                                        disabled={isSubmitting}
                                    // disabled={ ((!(isValid && dirty)) || isSubmitting) }
                                    >
                                        <Box fontSize={14} fontWeight={500} className={'text-center'}>Сохранить</Box>
                                    </button>
                                </div>
                            </div>
                            <Hidden xsDown>
                                <div className={`tranz m-0 p-0 col-md-6 col-12`}>
                                    <div className={'sticky-column'}>
                                        <DevicesMap setData={setData} data={values} id={id} />
                                    </div>
                                </div>
                            </Hidden>
                            <Hidden xsUp>
                            </Hidden>
                        </div>
                    </form>
                )}
            </Formik>
            {setting.togglerLightBox && <LightBoxVideo setting={setting} setSetting={setSetting} />}
        </>
    );
};

const mapStateToProps = store => ({
    user: store.auth.user,
    currentUser: store.auth.currentUser
});

export default injectIntl(withRouter(connect(mapStateToProps)(CreateDevice)));


