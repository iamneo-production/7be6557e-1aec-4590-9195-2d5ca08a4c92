package com.iamneo.security.controller;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.entity.Savedjobs;
import com.iamneo.security.service.SavedjobsService;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/savedjobs")
public class SavedjobsController {
    private final SavedjobsService savedjobsService;

    public SavedjobsController(SavedjobsService savedjobsService) {
        this.savedjobsService = savedjobsService;
    }

   

//    @GetMapping
//    public ResponseEntity<List<Savedjobs>> getAllSavedjobs() {
//        List<Savedjobs> savedjobsList = savedjobsService.getAllSavedjobs();
//        return new ResponseEntity<>(savedjobsList, HttpStatus.OK);
//    }

    
    @PostMapping
    public ResponseEntity<Savedjobs> saveSavedjobs(@RequestBody Savedjobs savedjobs) {
        Savedjobs savedSavedjobs = savedjobsService.saveSavedjobs(savedjobs);
        return new ResponseEntity<>(savedSavedjobs, HttpStatus.CREATED);
    }

    @DeleteMapping("/{email}/{jobTitle}")
    public ResponseEntity<Void> deleteSavedjobs(@PathVariable String email, @PathVariable String jobTitle) {
        savedjobsService.deleteSavedjobsByEmailAndJobTitle(email, jobTitle);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}