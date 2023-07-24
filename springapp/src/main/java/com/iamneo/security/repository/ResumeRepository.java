package com.iamneo.security.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Resume;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Integer> {
	 Optional<Resume> findByEmail(String email);
	    // Add custom query to get the count of distinct email addresses in the resumes table
	    @Query("SELECT COUNT(*) FROM Resume")
	    int findDistinctEmailCount();
	    // Custom query to get the count of unique applicant emails
	    @Query("SELECT COUNT(DISTINCT r.email) FROM Resume r")
	    int findUniqueApplicantEmailsCount();
}
