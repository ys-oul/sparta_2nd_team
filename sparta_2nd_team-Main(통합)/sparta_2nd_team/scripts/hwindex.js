const clickId = localStorage.getItem("movie_id");
localStorage.removeItem("movie_id");


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

    const selectedMoive = results.find((item) => {
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
  <img class = "backImage" src="https://image.tmdb.org/t/p/original/${selectedMoive.backdrop_path}">
  <div  id= "movieInfo">
  <img class = "posterImage" src="https://image.tmdb.org/t/p/original/${selectedMoive.poster_path}">
  <div class = "content">
  <h3 class = "movieTitle">${selectedMoive.title}</h3>
  <p class = "movieOverView">${selectedMoive.overview}</p>
  <p class = "movieRate">Rating: ${selectedMoive.vote_average}</p>
  </div>
  </div>
  `;

    movieBox.appendChild(card);
  });
up_btn.addEventListener("click", () => {
  let body = document.getElementsByTagName("body")[0];
  //창의 스크롤을 본문 최상단으로 부드럽게 이동시킵니다.
  window.scroll({
    behavior: "smooth",
    top: body.offsetTop,
  });
});