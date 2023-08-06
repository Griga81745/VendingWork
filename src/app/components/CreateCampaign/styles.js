import { makeStyles } from "@material-ui/core";

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
    AppBar:{
        backgroundColor: '#fff',
        boxShadow: 'none',
        zIndex: 64
    },
    AccordionDetails:{
        padding: '0 0 12px 0'
    },
    helperText:{
        color:"#ff5252"
    },
    startButton:{
        color: '#fff',
        fontSize: "14px",
        backgroundColor: "#0277BD",
        borderRadius: "4px",
        minWidth: "272px",
        border: "1px solid #0277BD",
        padding: "14px 0 13px 0",
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        "&:hover": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.8) !important",
        },
        "&:active": {
            color: '#fff',
            backgroundColor: "rgba(2, 119, 189, 0.95) !important",
        }
    },
    MapWidget:{
        position: "absolute",
        right: '20px',
        zIndex: 99
    },
    MapWidgetH:{
        height:44,
        minWidth:150
    }
}));

export default useStyles