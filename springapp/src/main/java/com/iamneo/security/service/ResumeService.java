package com.iamneo.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.Resume;
import com.iamneo.security.repository.ResumeRepository;

@Service
public class ResumeService {


    private final ResumeRepository resumeRepository;

    @Autowired
    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public void uploadResume(Resume resume) {
        resumeRepository.save(resume);
    }

    public Resume getResumeById(int id) {
        return resumeRepository.findById(id).orElse(null);
    }

    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    public long getTotalResumesCount() {
        // Implement the logic to get the total number of resumes from the database
        // You can use the count method of the resumeRepository to count the total number of resumes
        return resumeRepository.count();
    }

    public int getUniqueApplicantEmailsCount() {
        return resumeRepository.findUniqueApplicantEmailsCount();
}
}
