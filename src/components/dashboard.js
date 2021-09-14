import './Dashboard.css';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import EnhancedTable from './table';
import { useDispatch } from 'react-redux';
import { searched } from '../redux/sliceSearch';
import { clear } from '../redux/sliceSearch';
import { createStyles, alpha, makeStyles, } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import { useState } from 'react';
import { logout } from '../redux/sliceLogin';
import { useSelector } from 'react-redux';
import { selectSearched } from '../redux/sliceSearch';


const useStyles = makeStyles((theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '200px',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    })
);


function Dashboard() {

    // State to hold search input 
    const [searchTerm, setSearchTerm] = useState("");

    const searchedValue = useSelector(selectSearched);

    //console.log('redux value', searchedValue.searchValue)

    const classes = useStyles();

    // using action reducer from redux
    const dispatch = useDispatch();

    // current value of input field
    const getSearchTerm = (event) => {
        let searchWord = event.target.value;
        setSearchTerm(searchWord);
    }

    // passing current search input  
    const doSearch = () => {
        dispatch(searched({
            searchValue: searchTerm,
        }));
    }

    // to clear search term on click
    const clearSearch = () => {
        setSearchTerm("")
        dispatch(clear());
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <div className="App">
            <div className="wrapper">
                <div className="container-table">
                    <div className="head">
                        <div className="heading-btn">
                            <h5 className='management'>MANAGEMENT</h5>
                            <div className="logout"></div>
                            <Button
                                onClick={(e) => handleLogout(e)}
                                style={{ width: '206px', height: '42px' }}
                                variant="outlined" color="primary" href="#outlined-buttons">
                                Log out
                            </Button>
                        </div>
                        <div className="head-middle">
                            <h2>Clients</h2>
                            <div className="button-collection">
                                <Button style={{ backgroundColor: '#5900B4', color: '#FFFFFF', fontSize: '15px', fontWeight: '900', width: '206px', height: '42px' }}
                                    variant="contained"
                                    className='add-collection-btn'
                                    startIcon={<AddIcon />}
                                >
                                    New Collection
                                </Button>
                            </div>
                        </div>
                        <div className="head-bottom">
                            <div className="head-button">


                                <div className="search">
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search..."
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            onChange={getSearchTerm}
                                            value={searchTerm}
                                        />
                                    </div>
                                </div>
                                <Button onClick={doSearch}
                                    style={{ backgroundColor: 'white', color: 'black', width: '100px', height: '40px', marginLeft: '20px', marginRight: '20px' }} variant="contained">
                                    Search
                                </Button>
                                <Button onClick={clearSearch}
                                    style={{ backgroundColor: 'white', color: 'black', width: '100px', height: '40px' }} variant="contained">
                                    Clear
                                </Button>
                            </div>

                            <Button
                                style={{ backgroundColor: 'transparent', color: '#5900B4', width: '206px', height: '42px', borderColor: '#5900B4', fontSize: '15px', fontWeight: '900' }}
                                variant="outlined" color="primary"
                                startIcon={<FilterListIcon />}
                            >
                                SHOW FILTER
                            </Button>
                        </div>
                        <div className="table">

                            <EnhancedTable />
                        </div>

                    </div>
                </div>

            </div>
        </div >
    );
}

export default Dashboard;