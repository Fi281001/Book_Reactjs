import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
  
import React from 'react';
import {useState, useRef} from 'react'
import  PropTypes  from 'prop-types';

UserSearch.propTypes = {
    onSubmit: PropTypes.func,
}
UserSearch.defaultProps ={
    onSubmit: null
}

export default function UserSearch(props) {
    const {onSubmit} = props;
    const [search,setSearch] = useState("")
    const typingTimeOutRef = useRef(null)
    
    function handleSearch(e){
        const value = e.target.value
        setSearch(value)
        if(!onSubmit) return;

        if(typingTimeOutRef.current){
            clearTimeout(typingTimeOutRef.current);
        }
        typingTimeOutRef.current = setTimeout(() => {
            const formvalue = {
                search: value,
            }
            onSubmit(formvalue)    
        }, 300);
    }

    return(
            <Card sx={{ p: 2 }}>
          <OutlinedInput
          
            fullWidth
            type="text"
            placeholder="Search User"
          
            value={search}
            onChange={handleSearch}
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon
                  color="action"
                  fontSize="small"
                >
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            )}
            sx={{ maxWidth: 500 }}
          />
        </Card>
          )
}

