package com.iamneo.security.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Resume {

    @Id
    @GeneratedValue
    private Long id;
    
    private String jobTitle;
    
    private String email;
    
    private String mobileNo;

    private String resumeLink;

    private String collegeName;
    @Column(length=5000)
    private String reason;
    @Column(length=5000)
    private String description;
    
}
