import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieListService } from 'src/app/userservices/movielist.service';
import { MovieDto } from 'src/app/models/movie.dto';


describe('MovieListService', () => {
  let service: MovieListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieListService],
    });

    service = TestBed.inject(MovieListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

   const mockResponse: MovieDto[] = [
    {
      id: '1',
      rank: 1,
      title: 'Movie 1',
      description: 'Description for Movie 1',
      image: 'movie1.jpg',
      bigImage: 'movie1_big.jpg',
      thumbnail: 'movie1_thumb.jpg',
      rating: '8.5',
      genre: ['Action', 'Drama'],
      year: 2020,
      imdbid: 'tt1234567',
      Imdblink: 'https://www.imdb.com/title/tt1234567/',
    },
  
  ];

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get top 100 movies', () => {
    const token = 'testToken';

    service.getTop100Movies(token).subscribe((movies) => {
      expect(movies).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/topdb100`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush(mockResponse);
  });

 
  
  it('should get movies by genres', () => {
    const genres = ['Action', 'Drama'];
    const token = 'testToken';

    service.getMoviesByGenres(genres).subscribe((movies) => {
      expect(movies).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/byGenres?genres=${genres.join(',')}`);
    expect(req.request.method).toBe('GET');
    // expect(req.request.headers.get('Authorization')).toBe(`Bearer `);

    req.flush(mockResponse);
  });

  it('should get movies by rating range', () => {
    const minRating = 3;
    const maxRating = 5;
    const token = 'testToken';

    service.getMoviesByRatingRange(minRating, maxRating).subscribe((movies) => {
      expect(movies).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/byRating?minRating=${minRating}&maxRating=${maxRating}`,
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush(mockResponse);
  });

  it('should handle HTTP errors', () => {
    const token = 'testToken';

    service.getTop100Movies(token).subscribe(
      () => fail('Expected an error, but got a successful response'),
      (error) => {
        expect(error.status).toBe(500); // Adjust the expected status code as needed
        expect(error.error).toEqual('Server error'); // Adjust the expected error message as needed
      },
    );

    const req = httpMock.expectOne(`${service['apiUrl']}/topdb100`);
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });

 
});
