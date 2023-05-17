import { Button, FormControl, TextField, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { format } from 'date-fns';
import dayjs from 'dayjs';
const SerchBar = ({ callback, seDate }) => {
  const [searchKw, setSearchKw] = useState({ rcode: '', bname: '', startdt: '', enddt: '' });
  const [searchChk, setSearchChk] = useState();
  const [minDate, setMindate] = useState();

  const refForm = useRef(null);
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((prev) => ({ ...prev, [name]: value }));
  };

  const handleAcceptStart = (date) => {
    setMindate(date);
    setSearchKw({ ...searchKw, startdt: format(date.$d, 'yyyy-MM-dd') });
    setSearchChk(true);
  };
  const handleAcceptEnd = (date) => {
    setSearchKw({ ...searchKw, enddt: format(date.$d, 'yyyy-MM-dd') });
  };
  const submit = (e) => {
    e.preventDefault();
    if (searchKw.startdt !== '') {
      setSearchChk(true);
    } else {
      setSearchChk(false);
    }
    if (searchChk) {
      // setSearchKw({ ...searchKw, startdt: formattedDate });
      callback(searchKw);
      setSearchChk();
      setSearchKw({ rcode: '', bname: '', startdt: '', enddt: '' });
    }
  };

  useEffect(() => {
    return () => {};
  }, [searchKw]);
  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 3,
        backgroundColor: '#FFF',
        borderRadius: '8px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
        height: '100px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '30px',
          marginTop: '6px',
        }}
      >
        <span
          style={{
            fontSize: '23px',
            fontWeight: 800,
            marginRight: '15px',
          }}
        >
          입고
        </span>

        <span
          style={{
            backgroundColor: '#EBF2FF',
            padding: '3px 8px',
          }}
        >
          <span
            style={{
              color: 'gray',
              fontSize: '9px',
              marginLeft: '8px',
            }}
          >
            입고를 조회할 수 있습니다.
          </span>
        </span>
      </Box>

      <FormControl
        component="form"
        ref={refForm}
        onSubmit={(e) => {
          submit(e);
        }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: '5px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <label style={{ fontSize: '0.9rem' }}>입고코드</label>
          <TextField
            type="text"
            name="rcode"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchKw.rcode}
          />
          <label style={{ fontSize: '0.9rem' }}>거래처</label>
          <TextField
            type="text"
            name="bname"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchKw.bname}
          />
          <label style={{ fontSize: '0.9rem' }}>기간</label>
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: '60px' }}>
            <DemoContainer
              components={['DatePicker']}
              sx={{
                p: 0,
                minWidth: 0,
                '& .css-1xhypcz-MuiStack-root': {
                  padding: 0,
                },
              }}
            >
              <DatePicker
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { size: 'small', style: { minWidth: 'unset' } },
                }}
                sx={{
                  minWidth: 0,
                  paddingLeft: 2,
                  overflow: 'hidden',
                  '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                    padding: 0,
                    height: 30,
                    width: 105,
                    marginLeft: '10px',
                  },
                  '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                    border: searchChk === false || null ? '1px solid red' : null,
                    width: '165px',
                  },
                  '& .css-e1omjc-MuiStack-root>.MuiTextField-root': {
                    minWidth: 0,
                    height: '35px',
                  },
                }}
                onAccept={handleAcceptStart}
                value={searchKw.startdt || dayjs(seDate.sDate) || null}
              ></DatePicker>
              <span>~</span>
              <DatePicker
                readOnly={searchKw.startdt === '' || searchKw.startdt === null}
                style={{
                  '& .css-3tvb69-MuiStack-root>.MuiTextField-root': {
                    minWidth: 0,
                    backgroundColor: '#333',
                  },
                }}
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { size: 'small' },
                }}
                sx={{
                  minWidth: 0,
                  paddingRight: 5,
                  overflow: 'hidden',
                  '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                    padding: 0,
                    height: 30,
                    width: 105,
                    marginLeft: '10px',
                  },
                  '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                    border: searchChk === false || null ? '1px solid red' : null,
                    width: '165px',
                  },
                  '& .css-e1omjc-MuiStack-root>.MuiTextField-root': {
                    minWidth: 0,
                    height: '35px',
                  },
                }}
                minDate={minDate || null}
                onAccept={handleAcceptEnd}
                value={searchKw.enddt || dayjs(seDate.eDate) || null}
              ></DatePicker>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button type="submit" variant="outlined" sx={{ marginRight: 6 }}>
          <SearchIcon />
        </Button>
      </FormControl>
    </Grid>
  );
};

export default SerchBar;
