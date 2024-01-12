package com.cts.moviebooking.entity;

import com.cts.moviebooking.dto.MovieDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "wishlist")
public class WishListEntity {

    @Id
    private String id;

    private String username;

    private List<MovieDto> movies;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<MovieDto> getMovies() {
		return movies;
	}

	public void setMovies(List<MovieDto> movies) {
		this.movies = movies;
	}

	public WishListEntity(String id, String username, List<MovieDto> movies) {
		super();
		this.id = id;
		this.username = username;
		this.movies = movies;
	}

	public WishListEntity() {
	
		// TODO Auto-generated constructor stub
	}
    
    

}
