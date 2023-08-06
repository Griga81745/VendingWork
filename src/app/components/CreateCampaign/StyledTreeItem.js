//libraries
import React from 'react'
import TreeItem from '@material-ui/lab/TreeItem';
import {Box, Checkbox, makeStyles} from "@material-ui/core";

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        '&:hover > $content': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
            backgroundColor: 'transparent!important',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        border: 2,
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: theme.spacing(2),
        },
    },
    expanded: {},
    selected: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
        color: "rgba(0, 0, 0, 0.87)",
        fontWeight: 400,
        marginLeft:6
    },
    rootCheck:{
        padding:'1px 0'
    }
}));

const StyledTreeItem = (props) => {

    const classes = useTreeItemStyles();
    const {valName, clickHandle, active, small, labelText, labelIcon: LabelIcon, labelInfo, color, nodeId, bgColor, ...other } = props;
    
    return(
        <TreeItem
            label={
                <div className={classes.labelRoot} >
                    <Checkbox
                        name={labelText}
                        color="primary"
                        classes={{root: classes.rootCheck}}
                        checked={active}
                        onChange={(e)=>clickHandle({name: valName, checked: e.target.checked})}
                        onClick={ e => e.stopPropagation() }
                        size={small ? 'small': 'medium'}
                        //valName={valName}
                    />
                    <Box fontSize={small ? 13: 16} className={classes.labelText}>
                        {labelText}
                    </Box>
                </div>
            }
            nodeId={nodeId}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    )
}

export default StyledTreeItem