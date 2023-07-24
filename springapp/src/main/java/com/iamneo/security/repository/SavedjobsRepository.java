package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.security.entity.Savedjobs;

public interface SavedjobsRepository extends JpaRepository<Savedjobs, Integer> {
	  Savedjobs findByEmailAndJobTitle(String email, String jobTitle);
	    void deleteByEmailAndJobTitle(String email, String jobTitle);
}
