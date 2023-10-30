const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTM1ZTk2ZGQzNTBiYWRhZTQ5ZDVjNTU0M2QyZjI2YSIsInN1YiI6IjY1MzBhMWIwNTFhNjRlMDBhYmEwMGU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FRFQf3AHUFL0D0CZ7g8GOQP-J-y3b4_G84drHnBjtIE",
  },
};

//20개 영화 각 정보 배열 인덱스값==popularity순위
//포스터 이미지링크 배열
let img_url = [20];
//영화 제목 배열
let titles = [20];
//평점 배열
let averages = [20];
//영화 고유id 배열
let movie_ids = [20];
//개봉일 배열
let movie_release_date = [20];

//사전식 배열
let ABC_idx = [20];
//개봉일순 배열
let date_idx = [20];
//평점순 배열
let average_idx = [20];

const top_grid = document.getElementById("top_grid");
const rest_grid = document.getElementById("rest_grid");
const card_area = document.getElementById("card_area");
const page_name = document.getElementById("page_name");

const pop_btn = document.getElementById("pop_btn");
const ABC_btn = document.getElementById("ABC_btn");
const rlsd_btn = document.getElementById("rlsd_btn");
const average_btn = document.getElementById("average_btn");

const search_grid = document.getElementById("search_grid");

const search_input = document.querySelector("#search_box input");
const search_btn = document.querySelector("#search_box button");
const up_btn = document.getElementById("up_btn");

const isAllFalse = (value) => value === false;

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    const obj = response.results;
    //초기화면 영화 카드 구성
    init(obj);
  })
  .catch((err) => console.error(err));

//initialize&sorting
function init(obj) {
  for (let i = 0; i < 20; i++) {
    img_url[i] = {
      idx: i,
      url: "https://image.tmdb.org/t/p/original/" + obj[i].poster_path,
    };
    movie_ids[i] = {
      idx: i,
      id: obj[i].id,
    };
    titles[i] = {
      idx: i,
      title: obj[i].title,
    };
    averages[i] = {
      idx: i,
      average: obj[i].vote_average,
    };
    movie_release_date[i] = {
      idx: i,
      //문자열형태로 되어있는 날짜를 Date 형식으로 변환
      date: new Date(obj[i].release_date),
    };
  }
  //   console.log(movie_release_date[0].date);
  sort_card();
  create_pop();
}

let sort_card = () => {
  let tmp;
  //사전식 정렬
  tmp = JSON.parse(JSON.stringify(titles));
  tmp.sort(function (a, b) {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
  });

  tmp.forEach((element, index) => {
    ABC_idx[index] = element.idx;
  });

  //개봉일순 정렬
  tmp = JSON.parse(JSON.stringify(movie_release_date));
  tmp.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  tmp.forEach((element, index) => {
    date_idx[index] = element.idx;
    // console.log(element);
  });

  //평점순 정렬
  tmp = JSON.parse(JSON.stringify(averages));
  tmp.sort((a, b) => b.average - a.average);
  tmp.forEach((element, index) => {
    average_idx[index] = element.idx;
    // console.log(element);
  });
};

//영화카드 생성_TOP1
function add_card_1(i) {
  const new_card = `    
  <li class="top movie_card" id=${movie_ids[i].id}>
    <a href="detail.html">
      <img src=${img_url[i].url} alt="movie_poster"/>
      <p class="movie_title">${titles[i].title}</p>
    </a>
  </li>`;

  top_grid.insertAdjacentHTML("beforeend", new_card);
}

//영화카드 생성_TOP5
function add_card_5(i) {
  const new_card = `
  <li class="top5 movie_card" id=${movie_ids[i].id}>
    <a href="detail.html">
      <img src=${img_url[i].url} alt="movie_poster"/>
      <p class="movie_title">${titles[i].title}</p>
    </a>
  </li>`;

  top_grid.insertAdjacentHTML("beforeend", new_card);
}

//일반 영화카드 생성
function add_card(i) {
  const new_card = `
  <li class="rest movie_card" id=${movie_ids[i].id}>
    <a href="detail.html">  
      <img src=${img_url[i].url} alt="movie_poster"/>
      <p class="movie_title">${titles[i].title}</p>
    </a>
  </li>`;

  rest_grid.insertAdjacentHTML("beforeend", new_card);
}

//검색 결과 영화카드 생성
function search_card(i) {
  console.log("search_card  진입");
  const new_card = `
  <li class="search_card movie_card" id=${movie_ids[i].id}>
    <a href="detail.html">
      <img src=${img_url[i].url} alt="movie_poster"/>
      <p class="movie_title">${titles[i].title}</p>
    </a>
  </li>`;

  rest_grid.insertAdjacentHTML("beforeend", new_card);
}

//검색 버튼 이벤트 핸둘러
function btn_click() {
  //영화 카드 전체 삭제
  while (top_grid.firstChild) {
    top_grid.firstChild.remove();
  }
  while (rest_grid.firstChild) {
    rest_grid.firstChild.remove();
  }
  top_grid.style.display = "none";

  //입력 값 영화 제목 포함 여부 확인
  let check = titles.map(function (element) {
    let tmp = element.title.toUpperCase();
    return tmp.includes(search_input.value.toUpperCase());
  });

  //일치하는 결과 없을 경우
  if (check.every(isAllFalse)) {
    alert("검색 실패");
    location.reload();
    return;
  } else {
    // card_area.className += " search_section";
    rest_grid.className = "search_section";
    page_name.innerText = "검색 결과";

    //일치하는 결과 화면에 출력
    check.forEach(function (TorF, index) {
      if (TorF) {
        search_card(index);
      }
    });
  }
}

//input 요소에서 enter 누르면 검색 버튼 클릭한 것처럼
search_input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btn_click();
  }
});

function create_pop() {
  top_grid.style.display = "grid";
  rest_grid.className = "rest_poster_grid";
  while (top_grid.firstChild) {
    top_grid.firstChild.remove();
  }
  while (rest_grid.firstChild) {
    rest_grid.firstChild.remove();
  }
  let i = 0;
  page_name.innerText = "인기순위";
  add_card_1(i++);
  for (; i < 5; i++) {
    add_card_5(i);
  }
  for (; i < 20; i++) {
    add_card(i);
  }
}

function create_ABC() {
  top_grid.style.display = "grid";
  rest_grid.className = "rest_poster_grid";
  while (top_grid.firstChild) {
    top_grid.firstChild.remove();
  }
  while (rest_grid.firstChild) {
    rest_grid.firstChild.remove();
  }
  let i = 0;
  page_name.innerText = "ABC";
  add_card_1(ABC_idx[i++]);
  for (; i < 5; i++) {
    add_card_5(ABC_idx[i]);
  }
  for (; i < 20; i++) {
    add_card(ABC_idx[i]);
  }
}

function create_rlsd() {
  top_grid.style.display = "grid";
  rest_grid.className = "rest_poster_grid";
  while (top_grid.firstChild) {
    top_grid.firstChild.remove();
  }
  while (rest_grid.firstChild) {
    rest_grid.firstChild.remove();
  }
  let i = 0;
  page_name.innerText = "개봉일순";
  add_card_1(date_idx[i++]);
  for (; i < 5; i++) {
    add_card_5(date_idx[i]);
  }
  for (; i < 20; i++) {
    add_card(date_idx[i]);
  }
}

function create_average() {
  top_grid.style.display = "grid";
  rest_grid.className = "rest_poster_grid";
  while (top_grid.firstChild) {
    top_grid.firstChild.remove();
  }
  while (rest_grid.firstChild) {
    rest_grid.firstChild.remove();
  }
  let i = 0;
  page_name.innerText = "평점순";
  add_card_1(average_idx[i++]);
  for (; i < 5; i++) {
    add_card_5(average_idx[i]);
  }
  for (; i < 20; i++) {
    add_card(average_idx[i]);
  }
}
//검색 버튼 이벤트 리스너
search_btn.addEventListener("click", btn_click);
//sort option 버튼 이벤트 리스너
pop_btn.addEventListener("click", create_pop);
ABC_btn.addEventListener("click", create_ABC);
rlsd_btn.addEventListener("click", create_rlsd);
average_btn.addEventListener("click", create_average);

//상단 이동 버튼
up_btn.addEventListener("click", () => {
  alert("up");
  let body = document.getElementsByTagName("body")[0];
  //창의 스크롤을 본문 최상단으로 부드럽게 이동시킵니다.
  window.scroll({
    behavior: "smooth",
    top: body.offsetTop,
  });
});

card_area.addEventListener("click", (target) => {
  let click_element = target.target;
  let target_card = click_element.closest(".movie_card");
  localStorage.setItem("movie_id", target_card.id);
  alert("영화 id: " + target_card.id);
});
