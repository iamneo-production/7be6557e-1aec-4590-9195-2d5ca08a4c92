package com.iamneo.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.Notification;
import com.iamneo.security.repository.NotificationRepository;

@Service
public class  NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

  
    public Notification getNotificationById(int id) {
        return notificationRepository.findById(id).orElse(null);
    }


    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
    public Notification updateNotification(int id, Notification notification) {
        Notification existingNotification = notificationRepository.findById(id).orElse(null);
        if (existingNotification != null) {
            // Update the fields you want to allow updating
            existingNotification.setDate(notification.getDate());
            existingNotification.setTitle(notification.getTitle());
            existingNotification.setNotification(notification.getNotification());

            return notificationRepository.save(existingNotification);
        }
        return null;
    }

    public void deleteNotification(int id) {
        notificationRepository.deleteById(id);
    }
}
