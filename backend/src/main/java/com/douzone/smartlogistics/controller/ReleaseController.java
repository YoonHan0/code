package com.douzone.smartlogistics.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.service.ReleaseService;

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
			@RequestParam(value = "dt", required = true, defaultValue = "") String releaseDate) {
		System.out.println(releaseCode + " : " + businessName + " : " + releaseDate);
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(releaseService.findByKeyword(releaseCode, businessName, releaseDate)));
	}
	
	// release detail list
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readRelease(
			@RequestParam(value = "ic", required = true, defaultValue = "") String releaseCode) {
		System.out.println("=====화긴=====");
		System.out.println(releaseCode);
		System.out.println(releaseService.findByMasterNo(releaseCode));
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
		
		for (int item : no) {
			  System.out.println(item);
			}
		System.out.println("masterCode: " + masterCode);
		System.out.println("length: " + length);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(releaseService.deleteDetailItem(no, masterCode, length)));
	}


}