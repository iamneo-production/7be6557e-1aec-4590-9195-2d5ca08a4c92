package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Interview;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Integer> {
    // Add custom query methods if needed
}
