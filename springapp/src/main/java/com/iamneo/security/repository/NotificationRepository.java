package com.iamneo.security.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Notification;

@Repository	
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    // Add custom query methods if needed
}
