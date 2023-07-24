package com.iamneo.security.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class HrUser {
	@Id
	@GeneratedValue
	private int id;
	private String firstName;
	private String lastName;
	private String contact;
	private String email;
	private String password;
	private String designation;
}

