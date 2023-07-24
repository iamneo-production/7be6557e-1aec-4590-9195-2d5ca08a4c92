package com.iamneo.security.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iamneo.security.entity.Savedjobs;
import com.iamneo.security.repository.SavedjobsRepository;

@Service
public class SavedjobsService {
    private final SavedjobsRepository savedjobsRepository;

    public SavedjobsService(SavedjobsRepository savedjobsRepository) {
        this.savedjobsRepository = savedjobsRepository;
    }

    @Transactional
    public Savedjobs saveSavedjobs(Savedjobs savedjobs) {
        return savedjobsRepository.save(savedjobs);
    }

    @Transactional
    public void deleteSavedjobsByEmailAndJobTitle(String email, String jobTitle) {
        savedjobsRepository.deleteByEmailAndJobTitle(email, jobTitle);
    }
     @Transactional
    public Savedjobs findByEmailAndJobTitle(String email, String jobTitle) {
        return savedjobsRepository.findByEmailAndJobTitle(email, jobTitle);
    }

}
