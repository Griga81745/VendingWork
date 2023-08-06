import React, {useEffect, useState} from "react";
import RoomIcon from "@material-ui/icons/Room";
import ReactMapboxGl, {Marker, ZoomControl, Cluster, Layer} from "react-mapbox-gl";
import {Tooltip, Grid, Typography, makeStyles, Box, Button} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import {LngLatBounds} from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
    mapContainer: {
        marginTop: 20
    },
    mapMarker: {
        height: "30px",
        width: "30px",
        color: "#ea4335"
    },
    mapMarkerSelected: {
        height: "40px",
        width: "40px",
        color: "#18d7aa"
    },
    mapMarkerDisabled: {
        height: "30px",
        width: "30px",
        color: "#4d5052"
    },
    mapMarkerDataContainer: {
        padding: 0
    },
    mapMarkerData: {
        color: "#455A64",
        fontWeight: 700,
        marginLeft: 128,
        padding: "11px 10px"
    },
    mapTooltip: {
        margin: 0,
        padding: 0,
        backgroundColor: "white",
        boxShadow: "1px 1px 12px 6px rgba(56, 56, 56, 0.16)",
        borderRadius: 8,
        border: "3px solid #fff",
        maxWidth: "none!important"
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
    photoBB: {
        position: "absolute"
    },
    emptyPhoto: {
        width: '128px',
        height: '128px',
        borderRadius: "6px 0 0 6px",
        backgroundColor: '#ECECEC',
        color: '#90A4AE',
        paddingTop: "55px",
        textAlign: 'center',
        fontSize: 13,
        alignSelf: 'center',
        [theme.breakpoints.down('md')]: {
            width: '80px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '80px',
            height: '80px',
        }
    },
    showPhoto: {
        width: '128px',
        height: '128px',
        borderRadius: "6px 0 0 6px",
        [theme.breakpoints.down('md')]: {
            width: '80px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '80px',
            height: '80px',
        }
    },
    markerPar: {
        width: 120
    },
    markerPar2: {
        width: 100
    },
}));
const clusterMarkerS = {
    width: '50px',
    height: '50px',
    color: '#004fff',
    backgroundColor: '#fff',
    borderRadius: '40px',
    border: '4px solid #0277BD',
    textAlign: 'center',
    fontSize: '22px',
    fontWeight:500,
    lineHeight: '45px',
    fontFamily: "GilroyM"
}
const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoibmlja3NtaXJub3Z2IiwiYSI6ImNrazljNzg2OTB3NGEyb212cGwxNGU1ajgifQ.O7lkswQoyle4rocy5q7kyg",
    trackResize: true
});
function isLatitude(lat) {
    return isFinite(lat) && Math.abs(lat) <= 90;
}
function isLongitude(lng) {
    return isFinite(lng) && Math.abs(lng) <= 90;
}

const DevicesMap = React.memo(props => {
    const classes = useStyles();
    const {choosedBoards,filterBoards,setStyle} = props;



    const clusterMarker = (coordinates, pointCount) => {
        let clusterMa = {...clusterMarkerS}
        if(pointCount > 40 && pointCount < 100){
            clusterMa.border = '4px solid #FF8F00';
            clusterMa.color = '#FF8F00'
        }else if(pointCount >= 100){
            clusterMa.border = '4px solid #D32F2F';
            clusterMa.width = '60px';
            clusterMa.height = '60px';
            clusterMa.fontSize = '25px';
            clusterMa.lineHeight = '54px';
            clusterMa.color = '#D32F2F'
        }


       return <Marker coordinates={coordinates} style={clusterMa} key={"cl" + coordinates[0] + '-' + coordinates[1]}>
            {pointCount}
        </Marker>
    };

    const [boundsSet, setBoundsSet] = useState(false);

    const getBounds = () => {

            const bounds = new mapboxgl.LngLatBounds();

           // console.log("bounds22222222 211111")
          //  console.log(props.boards)

            Object.keys(props.boards).map(key => {

              //  console.log("bounds22222222 key")
              //  console.log( props.boards[key].lat )
              //  console.log( props.boards[key].lng )

                if( isLatitude(parseFloat(props.boards[key].lat)) && isLongitude(parseFloat(props.boards[key].lng))  ){

                 //   console.log("bounds22222222")
                 //   console.log([props.boards[key].lat, props.boards[key].lng])

                    bounds.extend([props.boards[key].lat, props.boards[key].lng]);
                }
            })



            let bArr = bounds.toArray();
            let arrChangePosition = [[bArr[0][1], bArr[0][0]], [bArr[1][1], bArr[1][0]]];
            setBoundsSet(arrChangePosition);


    }
    //const [firstSkip, setFirstSkip] = useState(false);
    useEffect(() => {

        if(Object.keys(props.boards).length == 0){
            return;
        }
        getBounds();

    }, [ props.boards ]);

    const [refresh, setRefresh] = useState(true);
    const [refreshF, setRefreshF] = useState(false);
    useEffect(() => {

        if(!refreshF){
            setRefreshF(true);
            return;
        }

        setRefresh(false)
        setTimeout(() => {
            setRefresh(true);
        }, 1);
    }, [ props.showBlockMapV ]);

    const getStatusMarker = id => {

        if(!choosedBoards){
            return 'mapMarker';
        }

        if(!!choosedBoards[id] && !choosedBoards[id].choosedButNotAvailble){
            return 'mapMarkerSelected';
        }else if(!filterBoards[id] || (!!choosedBoards[id] && !!choosedBoards[id].choosedButNotAvailble)){
            return 'mapMarkerDisabled';
        }
        return 'mapMarker';
    }
    return (
        <>
            {!!boundsSet && refresh &&
                <Map
                    fitBounds={boundsSet}
                    fitBoundsOptions={{
                        "padding": {
                            "top": 45,
                            "bottom": 45,
                            "left": 45,
                            "right": 45
                        }
                    }
                    }
                    style="mapbox://styles/nicksmirnovv/ckk9ca0bp27j917p1w9oblcom"
                    containerStyle={{
                        ...setStyle,
                        height: "calc(100vh - 60px)",
                        width: "100%"
                    }}
                    //center={[44.039406, 56.323852]}
                    /* fitBounds={()=>{

                         var bounds = new mapboxgl.LngLatBounds();
                         Object.keys(props.boards).map(key => {
                             bounds.extend([32.958984, -5.353521]);
                         })

                       //  markers.features.forEach(function(feature) {
                        //     bounds.extend(feature.geometry.coordinates);
                       //  });
                         return bounds;
                     }}*/
                    //zoom={[4]}
                >


                    <ZoomControl position={'top-left'} />
                    <Cluster className={'cursor-pointer'} zoomOnClick={true} zoomOnClickPadding={115} pointCount={true} ClusterMarkerFactory={clusterMarker} >
                        {!!props.boards &&
                        Object.keys(props.boards).map(key => (
                            <Marker
                                coordinates={[props.boards[key].lng, props.boards[key].lat]}
                                anchor="bottom"
                                key={"coor"+props.boards[key].lng+'-'+props.boards[key].lat+"-"+key}
                            >
                                <Tooltip
                                    //open={true}
                                    placement="top"
                                    classes={{tooltip: classes.mapTooltip}}
                                    title={
                                        <Grid
                                            container
                                            direction="column"
                                            classes={{root: classes.mapMarkerDataContainer}}
                                        >
                                            <div className={`${classes.photoBB}`}>
                                                {(!!props.boards[key].board_files && !!props.boards[key].board_files.photo && !!props.boards[key].board_files.photo.length) ? (
                                                    <div className={'empty-photo-box'}>
                                                        {getStatusMarker(key) == 'mapMarkerSelected' && (
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
                                                            src={`https://st.de4.ru/boards/${props.boards[key].id}/thumb${props.boards[key].board_files.photo[0].link.replace(
                                                                /(\.[m][p][4])/g,
                                                                '.jpg',
                                                            )}`}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className={'empty-photo-box'}>
                                                        {getStatusMarker(key) == 'mapMarkerSelected' && (
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
                                            </div>
                                            <div className={`${classes.mapMarkerData}`}>
                                                <Typography>{!!props.boards[key].title ? props.boards[key].title : props.boards[key]["surface_address"]}</Typography>
                                                <Button className={`btn tTraN mr-auto ml-auto boardStButton mt-2`}>Работает</Button>
                                                <div className={'d-flex mt-2'}>
                                                    <div className={classes.markerPar}>Видеоэкран</div>
                                                    <div className={classes.markerPar2}>{props.boards[key].resolution}</div>
                                                </div>
                                                <div className={'d-flex mt-1'}>
                                                    <div className={classes.markerPar}>{props.boards[key].width > props.boards[key].height ? "Горизонтальная" : "Вертикальная"}</div>
                                                    <div className={classes.markerPar2}>{props.boards[key].width}x{props.boards[key].height} м</div>
                                                </div>
                                            </div>




                                            {/*
                                            <Typography classes={{root: classes.mapMarkerData}}>
                                                {key.indexOf('g') == -1 ?
                                                    (
                                                        <FormattedMessage id={"CITY_" + props.boards[key].city}/>
                                                    ) :
                                                    (props.boards[key].door)
                                                }
                                            </Typography>
                                            <Typography classes={{root: classes.mapMarkerData}}>
                                                {props.boards[key].description}
                                            </Typography>
                                            */}
                                        </Grid>
                                    }
                                >
                                    <RoomIcon classes={{root: classes[getStatusMarker(key)] }}/>
                                </Tooltip>
                            </Marker>
                        ))}
                    </Cluster>
                </Map>
            }
        </>
    );
});

export default DevicesMap;
