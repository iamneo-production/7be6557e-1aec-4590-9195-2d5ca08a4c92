package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.HrUser;

@Repository
public interface HrUserRepository extends JpaRepository<HrUser, Integer> {
    // Add custom query methods if needed
}
