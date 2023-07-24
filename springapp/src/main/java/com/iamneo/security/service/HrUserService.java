package com.iamneo.security.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.HrUser;
import com.iamneo.security.repository.HrUserRepository;

@Service
public class HrUserService {


    @Autowired
    private HrUserRepository hrUserRepository;

    public List<HrUser> getAllHrUsers() {
        return hrUserRepository.findAll();
    }

    public HrUser getHrUserById(int id) {
        return hrUserRepository.findById(id).orElse(null);
    }

    public HrUser createHrUser(HrUser hrUser) {
        return hrUserRepository.save(hrUser);
    }

    public HrUser updateHrUser(int id, HrUser hrUser) {
        HrUser existingHrUser = hrUserRepository.findById(id).orElse(null);
        if (existingHrUser != null) {
            // Update the fields you want to allow updating
            existingHrUser.setFirstName(hrUser.getFirstName());
            existingHrUser.setLastName(hrUser.getLastName());
            existingHrUser.setContact(hrUser.getContact());
            existingHrUser.setEmail(hrUser.getEmail());
            existingHrUser.setPassword(hrUser.getPassword());
            existingHrUser.setDesignation(hrUser.getDesignation());
            return hrUserRepository.save(existingHrUser);
        }
        return null;
    }

    public void deleteHrUser(int id) {
        hrUserRepository.deleteById(id);
    }
}
