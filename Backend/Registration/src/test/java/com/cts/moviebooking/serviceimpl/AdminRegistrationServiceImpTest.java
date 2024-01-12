//package com.cts.moviebooking.serviceimpl;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//import java.util.Arrays;
//import java.util.List;
//
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//import com.cts.moviebooking.dto.BasicUserDetails;
//import com.cts.moviebooking.dto.UserDetailsRequestDto;
//import com.cts.moviebooking.dto.UserDetailsResponseDto;
//import com.cts.moviebooking.entity.UserEntity;
//import com.cts.moviebooking.repo.UserRepo;
//
//@SpringBootTest
//class AdminRegistrationServiceImpTest {
//
//	@Mock
//	private UserRepo userRepo;
//
//	@Mock
//	private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//	@InjectMocks
//	private AdminRegistrationServiceImp registrationService;
//
//	@Test
//	void testCreateUser() {
//		UserDetailsRequestDto userDetails = new UserDetailsRequestDto();
//		userDetails.setUserName("testUser");
//		userDetails.setEmail("test@example.com");
//		userDetails.setPassword("testPassword");
//		userDetails.setConfirmPassword("testPassword");
//
//		UserEntity savedUser = new UserEntity();
//		savedUser.setUserName("testUser");
//		savedUser.setEmail("test@example.com");
//		savedUser.setPassword("encodedPassword");
//
//		when(bCryptPasswordEncoder.encode(any())).thenReturn("encodedPassword");
//		when(userRepo.save(any())).thenReturn(savedUser);
//
//		UserDetailsResponseDto response = registrationService.createAdmin(userDetails);
//
//		verify(userRepo, Mockito.times(1)).save(any(UserEntity.class));
//		assertEquals("encodedPassword", savedUser.getPassword());
//		assertEquals("testUser", response.getUserName());
//	}
//
//	@Test
//	void testGetAllUsers() {
//		UserEntity user1 = new UserEntity();
//		user1.setFirstName("John");
//		user1.setUserName("john_doe");
//		user1.setEmail("john@example.com");
//		user1.setRole("USER");
//
//		UserEntity user2 = new UserEntity();
//		user2.setFirstName("Jane");
//		user2.setUserName("jane_doe");
//		user2.setEmail("jane@example.com");
//		user2.setRole("ADMIN");
//		
//		when(userRepo.findAll()).thenReturn(Arrays.asList(user1, user2));
//
//		List<BasicUserDetails> result = registrationService.getAllUsers();
//
//		Mockito.verify(userRepo, Mockito.times(1)).findAll();
//
//		assertEquals(2, result.size());
//
//		BasicUserDetails userDetails1 = result.get(0);
//		assertEquals("John", userDetails1.getFirstName());
//		assertEquals("john_doe", userDetails1.getUserName());
//		assertEquals("john@example.com", userDetails1.getEmail());
//		assertEquals("USER", userDetails1.getRole());
//
//		BasicUserDetails userDetails2 = result.get(1);
//		assertEquals("Jane", userDetails2.getFirstName());
//		assertEquals("jane_doe", userDetails2.getUserName());
//		assertEquals("jane@example.com", userDetails2.getEmail());
//		assertEquals("ADMIN", userDetails2.getRole());
//	}
//
//}
