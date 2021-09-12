import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useMemo } from 'react';


const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Client Name' },
    { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
    { id: 'industry', numeric: true, disablePadding: false, label: 'Industry' },
    { id: 'contact', numeric: true, disablePadding: false, label: 'Point of Contact' },
    { id: 'website', numeric: true, disablePadding: false, label: 'Website' },
    { id: 'btn-icon', numeric: true, disablePadding: false, label: '' },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;


    return (
        <TableHead>
            <TableRow style={{ backgroundColor: '#F5F6F8', height: '120px' }}>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    return (
        <Toolbar>
            {
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Clients
                </Typography>
            }
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable(props) {

    //console.log("these r props for table component", props);

    const { searchTerm } = props;


    //console.log("table searchTerm value", searchTerm)

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);



    // state to hold the data
    const [data, setData] = useState([]);

    // getting data from api
    const getData = async () => {
        try {
            const data = await axios.get("http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/getallclients/tenant/reesby");
            setData(data.data);
            //console.log('This is data from axios', data.data);
        } catch (e) {
            console.log("this is error for fetching data", e)
        }

    }



    // To make component mout on loading
    useEffect(() => {
        getData();
    }, [])

    // filtering data from api for search bar
    const filtered = useMemo(() => {
        if (!searchTerm) {
            return data;
        }
        const term = searchTerm.toLowerCase()

        return data.filter(({ clientName, clientEmail }) => clientName.toLowerCase().includes(term)
            || clientEmail.toLowerCase().includes(term)
        )

    }, [data, searchTerm])

    return (
        <div className={classes.root}>

            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                        />
                        <TableBody>
                            {/* Rendering the data from api */}
                            {filtered
                                .map((item, index) => {
                                    return (

                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                />
                                            </TableCell>
                                            <TableCell valuecomponent="th" scope="row" padding="none">{item.clientName}</TableCell>
                                            <TableCell align="right">{item.clientEmail}</TableCell>
                                            <TableCell align="right">{item.clientWorkPhone}</TableCell>
                                            <TableCell align="right">{item.clientIndustry}</TableCell>
                                            <TableCell align="right">{item.tenantId}</TableCell>
                                            <TableCell align="right">{item.clientWebsite}</TableCell>
                                            <TableCell align="right">
                                                <Button style={{ backgroundColor: 'transparent', color: '#5900B4' }}
                                                    variant="outlined" color="primary" href="#outlined-buttons" >
                                                    {<CreateIcon />}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>

        </div>
    );
}