package com.douzone.smartlogistics.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;
import com.douzone.smartlogistics.vo.ReleaseDetailVo;
import com.douzone.smartlogistics.vo.ReleaseMasterVo;
import com.douzone.smartlogistics.service.ReleaseService;
import com.douzone.smartlogistics.util.DateUtil;

@RestController
@RequestMapping("/api/release")
public class ReleaseController {

	@Autowired
	private ReleaseService releaseService;
	
	
	// release master list
	@GetMapping("/list")
	public ResponseEntity<JsonResult> readRelease(
			@RequestParam(value = "ic", required = true, defaultValue = "") String releaseCode,
			@RequestParam(value = "bn", required = true, defaultValue = "") String businessName,
			@RequestParam(value = "sdt", required = true, defaultValue = "") String startDate,
			@RequestParam(value = "edt", required = true, defaultValue = "") String endDate) {
		if (!startDate.equals("") && endDate.equals("")) {
			// startDate만 선택했을 시
			endDate = startDate;
		} 
		if (startDate.equals("")) {
			// 첫페이지(-7~오늘날짜~+7) => 2주치의 데이터 가져올 날짜
			startDate = DateUtil.minusDays(6);
			endDate = DateUtil.addDays(6);
		}
		System.out.println(startDate + " : " + endDate);

		List<ReleaseMasterVo> dataList = releaseService.findByKeyword(releaseCode, businessName, startDate, endDate);
		String sDate = startDate;
		String eDate = endDate;

		Map<String, Object> responseData = new HashMap<>();
		responseData.put("dataList", dataList);
		responseData.put("sDate", sDate);
		responseData.put("eDate", eDate);

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(responseData));
	}
	
	// release detail list
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readRelease(
			@RequestParam(value = "ic", required = true, defaultValue = "") String releaseCode) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(releaseService.findByMasterNo(releaseCode)));
	}
	
	// releae master item delete
	@PostMapping("/deleteMaster")
	public ResponseEntity<JsonResult> readRelease(@RequestBody List<String> masterNo) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(JsonResult.success(releaseService.deleteMasterItem(masterNo)));
	}
	
	// releae master item delete
	@GetMapping("/deleteDetail")
	public ResponseEntity<JsonResult> readRelease(
			@RequestParam (value = "no", required = true, defaultValue = "") List<Integer> no, 
			@RequestParam (value = "masterCode", required = true, defaultValue = "") String masterCode, 
			@RequestParam (value = "length", required = true, defaultValue = "") int length) {
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(releaseService.deleteDetailItem(no, masterCode, length)));
	}

	// release master,detail insert
	@PostMapping("/insert")
	@Transactional
	public ResponseEntity<JsonResult> insertRelease(@RequestBody ReleaseMasterVo releaseVo, @DBLog DBLogVo logVO) {
		
		// 출고 번호 생성(RV2305000001)
		String date = new DateUtil().getCode((releaseVo.getDate()));
		int no = releaseService.findSeqByDateAndState(date);
		String isCode = "IS".concat(date).concat(String.format("%06d", (Object) (no)));

		releaseVo.setCode(isCode);
		for (ReleaseDetailVo vo : releaseVo.getReleaseDetails()) {
			vo.setMasterCode(isCode);
		}

		releaseService.insertDetail(releaseVo.getReleaseDetails(), logVO);
		releaseService.insertMaster(releaseVo, logVO);
		releaseService.insertSeq(no, "IS", date, logVO);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(releaseVo));
	}
		
	// release detail insert
	@PostMapping("/insertdetail")
	public ResponseEntity<JsonResult> insertReceive(@RequestBody List<ReleaseDetailVo> releaseDetailVo, @DBLog DBLogVo logVO) {

		releaseService.insertDetail(releaseDetailVo, logVO);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(releaseDetailVo));
	}
	
	// my receive master list
	@GetMapping("/mylist")
	public ResponseEntity<JsonResult> readMyRelease(
			@RequestParam(value = "u", required = true, defaultValue = "") String userName) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(releaseService.findByName(userName)));
	}

}
