package com.iamneo.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.entity.Resume;
import com.iamneo.security.service.ResumeService;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/resumes")
public class ResumeController {


    private final ResumeService resumeService;

    @Autowired
    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }
    @GetMapping
    public ResponseEntity<List<Resume>> getAllResumes() {
        List<Resume> resumes = resumeService.getAllResumes();
        return new ResponseEntity<>(resumes, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<String> uploadResume(@RequestBody Resume resume) {
        try {
            resumeService.uploadResume(resume);
            return ResponseEntity.ok("Resume link uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the resume link.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResumeById(@PathVariable Integer id) {
        Resume resume = resumeService.getResumeById(id);
        if (resume != null) {
            return ResponseEntity.ok(resume);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/totalResumes")
    public ResponseEntity<Long> getTotalResumesCount() {
        long count = resumeService.getTotalResumesCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/uniqueApplicantEmailsCount")
    public ResponseEntity<Integer> getUniqueApplicantEmailsCount() {
        int count = resumeService.getUniqueApplicantEmailsCount();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

}
