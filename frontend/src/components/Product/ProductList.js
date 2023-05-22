import React, { useEffect, useRef, useState } from 'react';
import ProductItem from './ProductItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { Box, Checkbox, CircularProgress, FormControl, Grid, NativeSelect, Paper, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectedDataDeleteModal from '../Modal/SelectedDataDeleteModal';

/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 38.5px;
    padding: 4px;
  }
`;
const ProductList = ({
  products,
  productDetail,
  deleteItemHandler,
  itemAddHandler,
  setItem,
  rowColor,
  codeChk,
  searchEvent,
  loading,
}) => {
  /** fetch, 즉 list를 출력하기 위한 state */
  const refForm = useRef(null);
  /** Delete를 위한 체크박스 State */
  const [checkedButtons, setCheckedButtons] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  /** form 데이터 */
  const [data, setData] = useState({});
  /**  submit하기위한 check여부 */
  const isCheck = useRef(true);
  useEffect(() => {}, [data]);
  useEffect(() => {
    if (codeChk) {
      refForm.current.reset();
    }
  }, [codeChk]);
  useEffect(() => {
    refForm.current.reset();
  }, [searchEvent]);

  /** form데이터를 베열에 넣어 add*/
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Array.from(refForm.current.elements, (input) => {
      return { n: input.name, v: input.value };
    })
      .filter(({ n }) => n !== '')
      .reduce((res, { n, v }) => {
        //console.log(`res: ${res}, n: ${n}, v: ${v}`);
        if (v === '') {
          if (isCheck.current) {
            isCheck.current = false;
            document.getElementById(n).focus();
          }
        }
        res[n] = v;
        return res;
      }, {});
    setData(formData);
    if (isCheck.current) {
      itemAddHandler(formData);
      if (!codeChk) {
        document.getElementById('code').focus();
      }
    }
    isCheck.current = true;
  };
  /** 마지막행에서 Enter 누르면 */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  /** Delete를 체크박스 Handler  */
  const changeHandler = (checked, code) => {
    //console.log(`checked: ${checked}, code: ${code}`);
    checked
      ? setCheckedButtons([...checkedButtons, code])
      : // console.log("체크 반영 완료");
        // console.log(checkedButtons);
        // console.log(checkedButtons.length);
        // 클릭된 'code'랑 같으면 제거해서 새로운 배열을 만듬
        setCheckedButtons(checkedButtons.filter((el) => el !== code));
    // console.log("체크 해제 반영 완료");
    if (isChecked) {
      setIsChecked(false);
    }
    console.log(products.length);
    console.log(checkedButtons.length);
    if (checked) {
      if (!isChecked) {
        products.length === checkedButtons.length + 1 ? setIsChecked((prev) => !prev) : null;
      }
    }
  };
  /** 모두 선택해주는 체크박스 */
  const allCheckBox = (e) => {
    if (!isChecked) {
      // e.currentTarget.checked
      setIsChecked(e.target.checked);
      // checkedButtons에 business의 모든 code 값 넣기
      const data = products.map((el) => el.code);
      console.log(data);
      setCheckedButtons(data);
    } else {
      setIsChecked(e.target.checked);
      setCheckedButtons([]);
    }
  };

  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    setItem({ code: '', name: '', phone: '' });
  };

  //삭제 모달 관련
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setItem({ code: '', name: '', phone: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalMessage = () => {
    const length = checkedButtons.length;
    if (isChecked) {
      return '품목 전체를 삭제하시겠습니까?';
    }
    if (length === 0) {
      return '선택한 데이터가 없습니다.';
    }
    if (length === 1) {
      console.log(checkedButtons);
      return checkedButtons[0] + '을 삭제하시겠습니까?';
    }
    return length + '개의 품목을 삭제하시겠습니까?';
  };

  const onDeleteButton = () => {
    deleteItemHandler(checkedButtons);
    setCheckedButtons([]);
    setIsChecked(false);
    setItem({ code: '', name: '', phone: '' });
    handleClose();
  };

  return (
    <Grid
      item
      xs={8}
      sx={{
        width: '100%',
        height: '730px',
        marginRight: 4,
        backgroundColor: '#FFF',
        borderRadius: '8px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <SelectedDataDeleteModal
        open={open}
        handleClose={handleClose}
        modalMessage={modalMessage}
        checkedButtons={checkedButtons}
        onDeleteButton={onDeleteButton}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box sx={{ width: '97%', display: 'flex' }}>
          <DeleteIcon sx={{ padding: '7px', cursor: 'pointer', marginLeft: 'auto' }} onClick={handleOpen} />
        </Box>
        <FormControl component="form" onSubmit={handleSubmit} ref={refForm}>
          <TableContainer
            component={Paper}
            sx={{
              width: '94%',
              paddingLeft: 3,
              paddingTop: 0,
              boxShadow: 'none',
              height: 550,
              // marginLeft: "40px",
            }}
            // onScroll={handleScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ height: 3 }}>
                  <TableCell
                    sx={{
                      width: '10%',
                      backgroundColor: '#F6F7F9',
                      textAlign: 'center',
                      p: 0,
                    }}
                  >
                    <Checkbox
                      align="center"
                      size="small"
                      onChange={(e) => {
                        allCheckBox(e);
                      }}
                      checked={isChecked}
                    />
                  </TableCell>
                  <TableCell sx={{ width: '10%', backgroundColor: '#F6F7F9', fontWeight: '800' }}>순번</TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>품번</TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>품명</TableCell>
                  <TableCell sx={{ backgroundColor: '#F6F7F9', fontWeight: '800' }}>규격</TableCell>
                  <TableCell sx={{ width: '15%', backgroundColor: '#F6F7F9', fontWeight: '800' }}>단위</TableCell>
                </TableRow>
                <TableRow sx={{ height: 2, p: 0 }}>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell></TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="code"
                      name="code"
                      type="text"
                      placeholder="품번"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={(data && data.code === '') || (!codeChk && codeChk != null) ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="name"
                      name="name"
                      type="text"
                      placeholder="품명"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.name === '' ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <TextField
                      id="size"
                      name="size"
                      type="text"
                      placeholder="규격"
                      variant="outlined"
                      size="small"
                      onKeyPress={handleKeyDown}
                      error={data && data.size === '' ? true : false}
                      InputProps={{ sx: { height: 30 } }}
                    ></TextField>
                  </TableStickyTypeCell>
                  <TableStickyTypeCell>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'unit',
                        id: 'uncontrolled-native',
                      }}
                      onKeyPress={handleKeyDown}
                    >
                      <option value={'EA'}>EA</option>
                      <option value={'PK'}>PK</option>
                    </NativeSelect>
                  </TableStickyTypeCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : products.length > 0 ? (
                  products.map((product, index) => (
                    <ProductItem
                      key={index}
                      no={index}
                      code={product.code}
                      name={product.name}
                      size={product.size}
                      unit={product.unit}
                      productDetail={productDetail}
                      checkedButtons={checkedButtons}
                      changeHandler={changeHandler}
                      rowColor={rowColor}
                      handleCheckboxClick={handleCheckboxClick}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                      등록된 품목이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default ProductList;
