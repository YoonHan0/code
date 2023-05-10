import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  newData,
  checkedRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import React,{ useState, useEffect,useRef } from "react";
import Modal4DetailItem from "./Modal4DetailItem";
import checkImg from "../../assets/img/checkmark.png";
import Modal4OutItem from "./Modal4OutItem";
/** 테이블 Header 고정을 위한 styled component 사용 */
// top의 px값은 첫 행의 높이와 같게
const TableStickyTypeCell = styled(TableCell)`
  && {
    top: 50.5px;
  }
`;
const Modal4Outlist = ({ outdtail, modal4outlistDetail,selectedRowData,data,chulgoItemOnChangeCheck,setData }) => {
  const isAnyCheckedFalse = data.some(item => item.checked === false);
  console.log(outdtail)
  console.log("==== data ==== ")
  console.log(data);
  // data: [] === checkedButtons, deleteData: [{}, {}, ...] === rendering되는 state(data)
  //  const newData = checkedButtons.filter(item => !data.some(deleteItem => deleteItem.no === item));
  // 

  const [checkedButtons, setCheckedButtons] = useState([]); // [1, 2, 3, 4, ...]
  const [isChecked, setIsChecked] = useState(false);

  const deleteChulgo = (index) => {
    // 삭제하는 로직 추가필요
    let remainedData = data.filter((item) => !item.checked);
    setData(remainedData);
  }


//   const filteredRows = checkedRow.filter(row =>
//   row.detail.some(detail =>
//     data.some(item => item.no === detail.no && detail.state === 't')
//   )
// );
  
  useEffect(()=>{
    console.log("111 " + checkedButtons);
  }, [checkedButtons])



  const allCheckBox = (e) => {

    // e.currentTarget.checked;
    // 체크됐으면 data state에 checked 프로퍼티 true || 해제됐으면 false

    if (e.currentTarget.checked){
      console.log("선택됨")
      const updatedData = data.map(item => ({
        ...item,
        checked: true,
      }));
      setData(updatedData)
      
    }
    

    
    else{
      const updatedData = data.map(item => ({
        ...item,
        checked: false,
      }));
      setData(updatedData)
      const updatedCheckedButtons = isChecked ? data.map(item => item.no) : [];
    setCheckedButtons(updatedCheckedButtons);
    }
    }
  
    console.log("체크크크",checkedButtons);

   /** delete 체크박스 Handler  */
   const changeHandler = (checked, no) => {
    console.log(`checked: ${checked}, no: ${no}`);
    if (checked) {
      setCheckedButtons([...checkedButtons, no]);
      console.log('체크 반영 완료');
      console.log(checkedButtons);
      console.log(checkedButtons.length);
    } else {
        // 클릭된 'code'랑 같으면 제거해서 새로운 배열을 만듬
        setCheckedButtons(checkedButtons.filter(el => el !== no));
        console.log('체크 해제 반영 완료');
    }
   
  };
  // const dataa =Object.assign(data);
  // console.log(dataa);
  // const dataas = [dataa];
  // console.log(dataas);



  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        height: 230,
        // position: "relative",
        backgroundColor: "#FFF",
        borderRadius: "25px",
      }}
    >
      <Box sx={{ display: "flex", paddingLeft: 3, width: "94%" }}>
        <span
          style={{
            position: "relative",
            fontSize: "16px",
            fontWeight: 800,
            marginRight: "15px",
            marginTop: "5px",
            marginLeft: "2px",
          }}
        >
          추가된 출고 리스트
        </span>
      </Box>
        <Button  onClick={() => {deleteChulgo();}}><strong>삭제</strong></Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <FormControl component="form">
          <TableContainer
            component={Paper}
            sx={{
              width: "49%",
              paddingLeft: 3,
              paddingTop: 0,
              boxShadow: "none",
              height: 180,
              // marginLeft: "40px",
            }}
            // onScroll={handleScroll}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%", backgroundColor: "#F6F7F9" }}>
                  <Checkbox 
                      size='small'
                      onChange={(e)=> {
                        allCheckBox(e);
                      }}
                      
                      />
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    순번
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    품번
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#F6F7F9" }}>
                    품명
                  </TableCell>
                  <TableCell sx={{ width: "10%", backgroundColor: "#F6F7F9" }}>
                    출고할잔량
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data.length > 0 ? (
                  data.map((datas) => (
                    <Modal4OutItem
                        key={datas.no}
                        no={datas.no}
                        mcode={datas.mcode}
                        pcode={datas.pcode}
                        pname={datas.pname}
                        stockcnt={datas.stockcnt}
                        selectedRowData={selectedRowData} // 수정된 부분
                        checked={datas.checked}
                        chulgoItemOnChangeCheck={chulgoItemOnChangeCheck}
                        checkedButtons={checkedButtons}
                        changeHandler={changeHandler}
                        data={data}
                        setData={setData}
                       
                      />
                  ))
                ) : (
                    <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    등록된 품목이 없습니다.
                  </TableCell>
                </TableRow>
              )}
              {/* {Object.keys(data).length > 0 ? (
                // Object.values(data).map((data) => {
                      <Modal4OutItem
                        key={data.no}
                        mcode={data.mcode}
                        pcode={data.pcode}
                        pname={data.pname}
                        stockcnt={data.stockcnt}
                        selectedRowData={selectedRowData} // 수정된 부분
                      />
                            //  })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    등록된 품목이 없습니다.
                  </TableCell>
                </TableRow>
              )} */}
              </TableBody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Grid>
  );
};
export default Modal4Outlist;
