package com.iamneo.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.entity.HrUser;
import com.iamneo.security.service.HrUserService;

@RestController
@RequestMapping("/api/hr-users")
public class HrUserController {
    @Autowired 
    private  HrUserService hrUserService;

     
    @GetMapping
    public ResponseEntity<List<HrUser>> getAllHrUsers() {
        List<HrUser> hrUsers = hrUserService.getAllHrUsers();
        return ResponseEntity.ok(hrUsers);
    }
    @GetMapping("/{id}")
    public ResponseEntity<HrUser> getHrUserById(@PathVariable int id) {
        HrUser hrUser = hrUserService.getHrUserById(id);
        if (hrUser != null) {
            return ResponseEntity.ok(hrUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<HrUser> createHrUser(@RequestBody HrUser hrUser) {
        HrUser createdHrUser = hrUserService.createHrUser(hrUser);
        return ResponseEntity.ok(createdHrUser);
    }

    // Endpoint to update an existing HR user
    @PutMapping("/{id}")
    public ResponseEntity<HrUser> updateHrUser(@PathVariable int id, @RequestBody HrUser hrUser) {
        HrUser updatedHrUser = hrUserService.updateHrUser(id, hrUser);
        if (updatedHrUser != null) {
            return ResponseEntity.ok(updatedHrUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete an HR user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHrUser(@PathVariable int id) {
        hrUserService.deleteHrUser(id);
        return ResponseEntity.ok().build();
    }
}
