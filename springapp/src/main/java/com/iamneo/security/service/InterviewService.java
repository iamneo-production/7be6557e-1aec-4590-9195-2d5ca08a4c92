package com.iamneo.security.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.Interview;
import com.iamneo.security.repository.InterviewRepository;

@Service
public class InterviewService  {

	@Autowired
    private InterviewRepository interviewRepository;

    
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    
    public Interview getInterviewById(int id) {
        return interviewRepository.findById(id).orElse(null);
    }

    
    public Interview createInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

   
    public Interview updateInterview(int id, Interview interview) {
        Interview existingInterview = interviewRepository.findById(id).orElse(null);
        if (existingInterview != null) {
            existingInterview.setJobTitle(interview.getJobTitle());
            existingInterview.setLink(interview.getLink());
            existingInterview.setDate(interview.getDate());
            existingInterview.setDept(interview.getDept());
            existingInterview.setTime(interview.getTime());
            existingInterview.setMode(interview.getMode());
            existingInterview.setLocation(interview.getLocation());
            return interviewRepository.save(existingInterview);
        }
        return null;
    }

    public void deleteInterview(int id) {
        interviewRepository.deleteById(id);
    }
}
