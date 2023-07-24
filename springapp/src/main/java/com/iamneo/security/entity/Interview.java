package com.iamneo.security.entity;
import java.time.LocalTime;
import java.util.Date;

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
@Getter
@Setter
@Entity
public class Interview {
  @Id
  @GeneratedValue
  private int id;
  private String JobTitle;
  private String Link;
  private Date date;
  private String dept;
  private String email;
  private LocalTime time;
  private String mode;
  private String location;
}
