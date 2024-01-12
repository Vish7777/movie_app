package com.cts.moviebooking.dto;

import java.io.Serializable;

public class UserDetailsResponseDto implements Serializable {

    private String email;

    private String userName;

    private String firstName;

    private String password;

    private String role;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public UserDetailsResponseDto(String email, String userName, String firstName, String password, String role) {
		this.email = email;
		this.userName = userName;
		this.firstName = firstName;
		this.password = password;
		this.role = role;
	}

	public UserDetailsResponseDto() {
	}
    
    
}

