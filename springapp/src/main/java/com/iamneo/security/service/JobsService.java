package com.iamneo.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.Jobs;
import com.iamneo.security.repository.JobsRepository;

@Service
public class JobsService {

	@Autowired
    private JobsRepository jobsRepository;
	 public List<Jobs> getAppliedJobs() {
	        return jobsRepository.findByIsAppliedTrue();
	    }
	public List<Jobs> getLastThreeJobs() {
	        return jobsRepository.findTop3ByOrderByIdDesc();
	    }

    public List<Jobs> getAllJobs() {
        return jobsRepository.findAll();
    }


    public Jobs getJobById(int id) {
        return jobsRepository.findById(id).orElse(null);
    }

    public Jobs createJob(Jobs job) {
        return jobsRepository.save(job);
    }

    public Jobs updateJob(int id, Jobs job) {
        Jobs existingJob = jobsRepository.findById(id).orElse(null);
        if (existingJob != null) {
            // Update all fields
            existingJob.setJobTitle(job.getJobTitle());
            existingJob.setMode(job.getMode());
            existingJob.setDept(job.getDept());
            existingJob.setRequirement(job.getRequirement());
            existingJob.setSalary(job.getSalary());
            existingJob.setDescription(job.getDescription());
            existingJob.setLocation(job.getLocation());
            existingJob.setMin_experience(job.getMin_experience());
            existingJob.setMax_experience(job.getMax_experience());
            existingJob.setApplied(job.isApplied());
            existingJob.setEmail(job.getEmail());
            return jobsRepository.save(existingJob);
        }
        return null;
    }

    public void deleteJob(int id) {
        jobsRepository.deleteById(id);
    }
}
