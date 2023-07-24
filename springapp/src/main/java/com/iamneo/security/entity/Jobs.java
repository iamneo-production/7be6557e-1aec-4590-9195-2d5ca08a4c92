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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
public class Jobs {
	@Id
	@GeneratedValue
	private int id;
	   private String JobTitle;
	   private String Mode;
	   private String dept;
	   @Column(length = 2000)
	   private String requirement;
	   private double salary;
	   @Column(length = 5000)
	   private String description;
	   @Column(length =2000)
	   private String benefits;
	   private String location;
	   private int min_experience;
	   private int max_experience;
	   private boolean isApplied;
	   private boolean selected;
	   private String cemail;
	   private String ocontact;
	   private String email;
	   private String semail;
}
