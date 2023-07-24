package com.iamneo.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.iamneo.security.entity.Interview;
import com.iamneo.security.service.InterviewService;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

	@Autowired
    private InterviewService interviewService;

    

    // Endpoint to retrieve all interviews
    @GetMapping
    public ResponseEntity<List<Interview>> getAllInterviews() {
        List<Interview> interviews = interviewService.getAllInterviews();
        return ResponseEntity.ok(interviews);
    }

    // Endpoint to retrieve a specific interview by ID
    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable int id) {
        Interview interview = interviewService.getInterviewById(id);
        if (interview != null) {
            return ResponseEntity.ok(interview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to create a new interview
    @PostMapping
    public ResponseEntity<Interview> createInterview(@RequestBody Interview interview) {
        Interview createdInterview = interviewService.createInterview(interview);
        return ResponseEntity.ok(createdInterview);
    }

    // Endpoint to update an existing interview
    @PutMapping("/{id}")
    public ResponseEntity<Interview> updateInterview(@PathVariable int id, @RequestBody Interview interview) {
        Interview updatedInterview = interviewService.updateInterview(id, interview);
        if (updatedInterview != null) {
            return ResponseEntity.ok(updatedInterview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete an interview by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable int id) {
        interviewService.deleteInterview(id);
        return ResponseEntity.ok().build();
    }
}
