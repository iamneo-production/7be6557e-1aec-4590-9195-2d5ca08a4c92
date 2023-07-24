package com.iamneo.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.entity.Jobs;
import com.iamneo.security.service.JobsService;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/jobs")
public class JobsController {

    private final JobsService jobsService;

    @Autowired
    public JobsController(JobsService jobsService) {
        this.jobsService = jobsService;
    }

    // Endpoint to retrieve all jobs
    @GetMapping
    public ResponseEntity<List<Jobs>> getAllJobs() {
        List<Jobs> jobs = jobsService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }
    @GetMapping("/applied")
    public ResponseEntity<List<Jobs>> getAppliedJobs() {
        List<Jobs> appliedJobs = jobsService.getAppliedJobs();
        return ResponseEntity.ok(appliedJobs);
    }
    @GetMapping("/lastThree")
    public ResponseEntity<List<Jobs>> getLastThreeJobs() {
        List<Jobs> lastThreeJobs = jobsService.getLastThreeJobs();
        return ResponseEntity.ok(lastThreeJobs);
    }
    // Endpoint to retrieve a specific job by ID
    @GetMapping("/{id}")
    public ResponseEntity<Jobs> getJobById(@PathVariable int id) {
        Jobs job = jobsService.getJobById(id);
        if (job != null) {
            return ResponseEntity.ok(job);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to create a new job
    @PostMapping
    public ResponseEntity<Jobs> createJob(@RequestBody Jobs job) {
        Jobs createdJob = jobsService.createJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }

    // Endpoint to update an existing job
    @PutMapping("/{id}")
    public ResponseEntity<Jobs> updateJob(@PathVariable int id, @RequestBody Jobs job) {
        Jobs updatedJob = jobsService.updateJob(id, job);
        if (updatedJob != null) {
            return ResponseEntity.ok(updatedJob);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete a job by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable int id) {
        jobsService.deleteJob(id);
        return ResponseEntity.ok().build();
    }
}
