package com.iamneo.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import com.iamneo.security.dto.request.FeedbackRequest;
import com.iamneo.security.dto.request.UserRequest;
import com.iamneo.security.entity.User;
import com.iamneo.security.repository.UserRepository;
import com.iamneo.security.vo.Feedback;

public class FeedbackService {
private  UserRepository userRepository;
@Autowired
private  RestTemplate restTemplate;

   
	

	public void addUserFeedback(UserRequest userRequest) {
		var user = User.builder().firstName(userRequest.getFirstName()).email(userRequest.getEmail()).build();
		var feedback = FeedbackRequest.builder().email(userRequest.getEmail()).feedback(userRequest.getFeedback()).build();
		userRepository.save(user);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<FeedbackRequest> requestEntity = new HttpEntity<>(feedback, headers);
		restTemplate.postForObject("http://FEEDBACK-SERVICE/api/v1/feed/addFeedback", requestEntity, Feedback.class);
	}
}
