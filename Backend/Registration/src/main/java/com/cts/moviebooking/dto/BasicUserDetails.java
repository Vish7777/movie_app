package com.cts.moviebooking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class BasicUserDetails {

    private String firstName;
    private String userName;
    private String email;
    private String role;
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public BasicUserDetails(String firstName, String userName, String email, String role) {
		this.firstName = firstName;
		this.userName = userName;
		this.email = email;
		this.role = role;
	}
	public BasicUserDetails() {
	}

    
}
