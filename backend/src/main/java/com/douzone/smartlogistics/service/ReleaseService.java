package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.smartlogistics.repository.ReleaseRepository;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReleaseDetailVo;
import com.douzone.smartlogistics.vo.ReleaseMasterVo;


@Service
@Transactional
public class ReleaseService {

	@Autowired
	private ReleaseRepository releaseRepository;

	public List<ReleaseMasterVo> findByKeyword(String releaseCode, String businessName,String startDate, String endDate) {
		System.out.println("\\\\\\\\\\" + startDate+" /// "+endDate);
		return releaseRepository.findByKeyword(releaseCode, businessName,startDate, endDate);
	}

	public List<ReleaseDetailVo> findByMasterNo(String releaseCode) {
		return releaseRepository.findByMasterNo(releaseCode);
	}

	public boolean deleteMasterItem(List<String> masterNo) {
        boolean isDeleteMasterSuccess = releaseRepository.deleteMasterItem(masterNo);
        boolean isDeleteDetailSuccess = releaseRepository.deleteDetailByMasterNo(masterNo);
        return isDeleteMasterSuccess && isDeleteDetailSuccess;
    }

	public boolean deleteDetailItem(List<Integer> detailNo, String masterCode, int length) {
		System.out.println("선택된 detail no값: " + detailNo.size());
		System.out.println(detailNo.size() == length);
		boolean isDeleteDetailSuccess = releaseRepository.deleteDetailItem(detailNo);
		
		return (detailNo.size() == length) ? (isDeleteDetailSuccess && releaseRepository.deleteMasterByDetailNo(masterCode)) : releaseRepository.deleteDetailItem(detailNo);
	}
	
}
