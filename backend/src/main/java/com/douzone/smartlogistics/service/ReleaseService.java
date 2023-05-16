package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.smartlogistics.repository.ReleaseRepository;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;
import com.douzone.smartlogistics.vo.ReleaseDetailVo;
import com.douzone.smartlogistics.vo.ReleaseMasterVo;


@Service
@Transactional
public class ReleaseService {

	@Autowired
	private ReleaseRepository releaseRepository;

	public List<ReleaseMasterVo> findByKeyword(String releaseCode, String businessName,String startDate, String endDate) {
		System.out.println(releaseCode + " : " + businessName + " : " + startDate + " : " + endDate);
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
		boolean isDeleteDetailSuccess = releaseRepository.deleteDetailItem(detailNo);
		
		return (detailNo.size() == length) ? (isDeleteDetailSuccess && releaseRepository.deleteMasterByDetailNo(masterCode)) : releaseRepository.deleteDetailItem(detailNo);
	}

	public void insertMaster(ReleaseMasterVo releaseVo, DBLogVo logVO) {
		releaseRepository.insertMaster(releaseVo, logVO);

	}

	@Transactional
	public void insertDetail(List<ReleaseDetailVo> releaseDetailVo, DBLogVo logVO) {
		for (ReleaseDetailVo vo : releaseDetailVo) {
			vo.setLog(logVO);
			releaseRepository.insertDetail(vo);
			releaseRepository.insertStock(vo);
		}
	}
	
	public int findSeqByDateAndState(String date) {
		return releaseRepository.findSeqByDateAndState(date);
	}

	public void insertSeq(int no, String state, String date, DBLogVo logVO) {
		releaseRepository.insertSeq(no, state, date, logVO);
	}

	public List<ReleaseMasterVo> findByName(String userName) {
		return releaseRepository.findByName(userName);
	}


	
}
