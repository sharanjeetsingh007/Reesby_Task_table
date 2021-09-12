import './App.css';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import EnhancedTable from './components/table';

import {
  createStyles,
  alpha,
  makeStyles,
} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import { useState } from 'react';

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


function App() {

  // State to hold search input 
  const [searchTerm, setSearchTerm] = useState("");

  const classes = useStyles();

  // state to hold search input when clicking
  const [buttonSearch, setButtonSearch] = useState("");


  // current value of input field
  const getSearchTerm = (event) => {

    let searchWord = event.target.value;

    setSearchTerm(searchWord);
    //console.log(searchWord);
  }

  // passing current search input  
  const doSearch = () => {

    //console.log('this is from the doSearch func', searchTerm)
    setButtonSearch(searchTerm);
  }


  // to clear search term on click
  const clearSearch = () => {
    //console.log('im working')
    setSearchTerm("");
    setButtonSearch("");

  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="container-table">
          <div className="head">
            <h5 className='management'>MANAGEMENT</h5>
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

                {/* Search bar */}
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
              {/* Table component */}
              <EnhancedTable
                searchTerm={buttonSearch}

              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
