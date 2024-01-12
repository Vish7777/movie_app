package com.cts.moviebooking.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;

import com.cts.moviebooking.dto.BasicUserDetails;
import com.cts.moviebooking.dto.UserDetailsRequestDto;
import com.cts.moviebooking.dto.UserDetailsResponseDto;
import com.cts.moviebooking.exception.CustomErrorResponse;
import com.cts.moviebooking.repo.UserRepo;
import com.cts.moviebooking.serviceimpl.AdminRegistrationServiceImp;

@SpringBootTest
class AdminRegistrationControllerTest {
	
	@Mock
	private KafkaTemplate<String, UserDetailsResponseDto> kafkaTemplate;

	@Mock
	private UserRepo userRepository;

	@Mock
	private AdminRegistrationServiceImp adminRegistrationService;

	@InjectMocks
	private AdminRegistrationController adminRegistrationController;

	private List<BasicUserDetails> sampleUserDetailsList;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		BasicUserDetails user1 = new BasicUserDetails("John", "john_doe", "john@example.com", "USER");
		BasicUserDetails user2 = new BasicUserDetails("Jane", "jane_doe", "jane@example.com", "ADMIN");
		sampleUserDetailsList = Arrays.asList(user1, user2);
	}

	@Test
	void testCreateUser_Success() {
		// Given
		UserDetailsRequestDto userDetails = new UserDetailsRequestDto();
		userDetails.setUserName("testUser");
		userDetails.setEmail("test@example.com");
		userDetails.setPassword("testPassword");
		userDetails.setConfirmPassword("testPassword");

		UserDetailsResponseDto responseDto = new UserDetailsResponseDto();
		responseDto.setUserName("testUser");
		responseDto.setEmail("test@example.com");
		responseDto.setPassword("encodedPassword");

		when(userRepository.existsByUserName(any())).thenReturn(false);
		when(userRepository.existsByEmail(any())).thenReturn(false);
		when(adminRegistrationService.createAdmin(any())).thenReturn(responseDto);

		ResponseEntity<?> responseEntity = adminRegistrationController.createAdmin(userDetails);

		verify(adminRegistrationService, times(1)).createAdmin(any(UserDetailsRequestDto.class));
		assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
		assertNotNull(responseEntity.getBody());
		assertTrue(responseEntity.getBody() instanceof UserDetailsResponseDto);
		UserDetailsResponseDto responseBody = (UserDetailsResponseDto) responseEntity.getBody();
		assertEquals("testUser", responseBody.getUserName());
	}

	@Test
	void testCreateUser_DuplicateEntryException() {
		UserDetailsRequestDto userDetails = new UserDetailsRequestDto();
		userDetails.setUserName("existingUser");
		userDetails.setEmail("existing@example.com");
		userDetails.setPassword("testPassword");
		userDetails.setConfirmPassword("testPassword");

		when(userRepository.existsByUserName(any())).thenReturn(true);
		when(userRepository.existsByEmail(any())).thenReturn(false);

		ResponseEntity<?> responseEntity = adminRegistrationController.createAdmin(userDetails);

		verify(adminRegistrationService, never()).createAdmin(any(UserDetailsRequestDto.class));
		assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
		assertTrue(responseEntity.getBody() instanceof CustomErrorResponse);
		CustomErrorResponse errorResponse = (CustomErrorResponse) responseEntity.getBody();
		assertEquals(HttpStatus.CONFLICT.value(), errorResponse.getStatus());
		assertEquals("Username already exists", errorResponse.getMessage());
	}

	@Test
    void testGetAllUserDetails() {
		when(adminRegistrationService.getAllUsers()).thenReturn(sampleUserDetailsList);

        ResponseEntity<List<BasicUserDetails>> responseEntity = adminRegistrationController.getAllUserDetails();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        List<BasicUserDetails> resultUserDetailsList = responseEntity.getBody();
        assertEquals(sampleUserDetailsList.size(), resultUserDetailsList.size());

        BasicUserDetails expectedResultUser1 = sampleUserDetailsList.get(0);
        BasicUserDetails actualResultUser1 = resultUserDetailsList.get(0);
        assertEquals(expectedResultUser1.getFirstName(), actualResultUser1.getFirstName());
        assertEquals(expectedResultUser1.getUserName(), actualResultUser1.getUserName());
        assertEquals(expectedResultUser1.getEmail(), actualResultUser1.getEmail());
        assertEquals(expectedResultUser1.getRole(), actualResultUser1.getRole());

        BasicUserDetails expectedResultUser2 = sampleUserDetailsList.get(1);
        BasicUserDetails actualResultUser2 = resultUserDetailsList.get(1);
        assertEquals(expectedResultUser2.getFirstName(), actualResultUser2.getFirstName());
        assertEquals(expectedResultUser2.getUserName(), actualResultUser2.getUserName());
        assertEquals(expectedResultUser2.getEmail(), actualResultUser2.getEmail());
        assertEquals(expectedResultUser2.getRole(), actualResultUser2.getRole());

        Mockito.verify(adminRegistrationService, Mockito.times(1)).getAllUsers();
        
	}

}
