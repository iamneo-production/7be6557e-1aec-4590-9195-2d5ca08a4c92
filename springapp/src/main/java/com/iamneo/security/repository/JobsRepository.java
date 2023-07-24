package com.iamneo.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Jobs;

@Repository
public interface JobsRepository extends JpaRepository<Jobs, Integer> {
	List<Jobs> findTop3ByOrderByIdDesc();
	 List<Jobs> findByIsAppliedTrue();
}
