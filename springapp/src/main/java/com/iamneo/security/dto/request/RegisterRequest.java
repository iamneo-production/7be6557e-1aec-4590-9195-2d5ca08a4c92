package com.iamneo.security.dto.request;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@Getter
@AllArgsConstructor
@Setter
public class RegisterRequest {
	@Id
	@GeneratedValue
    private int id;
	private String firstName;
	private String lastName;
	private String address; 
	private String contactNo; 
	private String degree;
	private String specilization;
	private String passingYear;
	private float cgpa;
	private String email;
	private String password;
}
