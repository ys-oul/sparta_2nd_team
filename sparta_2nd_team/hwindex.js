const clickId = localStorage.getItem("movie_id");
localStorage.removeItem("movie_id");
alert(clickId);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDdlZGM5YmFmNTdhZWI2NmUzYjAxNjA2MmQ1NzY4OCIsInN1YiI6IjY1MmY3ODMwYTgwMjM2MDExYWM3ZmJkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BzKQnq-sGM9wsD00EU-pfpoqsIH7GXPTJF8nY9w0Gcs",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    const results = data.results;
    console.log(results);
    const movieBox = document.querySelector(".movieBox");

    const selectedMoive = results.filter((item) => {
      if (item.id == clickId) {
        return true;
      } else {
        return false;
      }

      console.log(item.id);
    });

    console.log(selectedMoive);

    const card = document.createElement("div");
    card.classList.add("movieBox");

    card.innerHTML = `
  <img class = "backImage" src="https://image.tmdb.org/t/p/original/${selectedMoive[0].backdrop_path}">
  <div  id= "movieInfo">
  <img class = "posterImage" src="https://image.tmdb.org/t/p/original/${selectedMoive[0].poster_path}">
  <div class = "content">
  <h3 class = "movieTitle">${selectedMoive[0].title}</h3>
  <p class = "movieOverView">${selectedMoive[0].overview}</p>
  <p class = "movieRate">Rating: ${selectedMoive[0].vote_average}</p>
  </div>
  </div>
  `;

    movieBox.appendChild(card);
  });
