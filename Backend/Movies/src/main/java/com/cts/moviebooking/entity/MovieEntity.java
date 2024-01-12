package com.cts.moviebooking.entity;

import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "movies")
public class MovieEntity {

    @Id
    private String id;

    private int rank;
    private String title;
    private String description;
    private String image;
    private String bigImage;
    private String thumbnail;
    private String rating;
    private List<String> genre;
    private int year;
    private String imdbId;
    private String imdbLink;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getBigImage() {
		return bigImage;
	}
	public void setBigImage(String bigImage) {
		this.bigImage = bigImage;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
	public String getRating() {
		return rating;
	}
	public void setRating(String rating) {
		this.rating = rating;
	}
	public List<String> getGenre() {
		return genre;
	}
	public void setGenre(List<String> genre) {
		this.genre = genre;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public String getImdbId() {
		return imdbId;
	}
	public void setImdbId(String imdbId) {
		this.imdbId = imdbId;
	}
	public String getImdbLink() {
		return imdbLink;
	}
	public void setImdbLink(String imdbLink) {
		this.imdbLink = imdbLink;
	}
	public MovieEntity(String id, int rank, String title, String description, String image, String bigImage,
			String thumbnail, String rating, List<String> genre, int year, String imdbId, String imdbLink) {
		
		this.id = id;
		this.rank = rank;
		this.title = title;
		this.description = description;
		this.image = image;
		this.bigImage = bigImage;
		this.thumbnail = thumbnail;
		this.rating = rating;
		this.genre = genre;
		this.year = year;
		this.imdbId = imdbId;
		this.imdbLink = imdbLink;
	}
	public MovieEntity() {
	
		// TODO Auto-generated constructor stub
	}
    
    

}
