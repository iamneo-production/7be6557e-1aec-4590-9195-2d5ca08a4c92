package com.iamneo.security.service;

import com.iamneo.security.entity.User;
import com.iamneo.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(int id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setEmail(user.getEmail());
           
            existingUser.setContactNo(user.getContactNo());
            existingUser.setDegree(user.getDegree());
            existingUser.setSpecilization(user.getSpecilization());
            existingUser.setAddress(user.getAddress());
            existingUser.setPassingYear(user.getPassingYear());
            existingUser.setCgpa(user.getCgpa());

            return userRepository.save(existingUser);
        }
        return null;
    }


    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}

