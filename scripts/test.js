const commentForm = document.getElementById('commentForm');
const commentDiv = document.getElementById('commentDiv');

window.onload = function () {
  loadComments();
};

document.getElementById('commentForm').onsubmit = function (e) {
e.preventDefault();

// 입력된 이름과 댓글 내용 가져오기
let name = document.getElementById('name').value;
let comment = document.getElementById('comment').value;

// 댓글 객체 생성
let newComment = {
  user: name,
  review: comment,
};

// 기존 댓글 배열 가져오기
let comments = getComments();

// 새로운 댓글 추가
comments.push(newComment);

// 변경된 댓글 배열 저장
localStorage.setItem('comments', JSON.stringify(comments));

// 댓글 목록 다시 불러오기
loadComments();

// 폼 초기화
document.getElementById('commentForm').reset();
};
function getComments() {
  let comments = localStorage.getItem('comments');

  if (comments) {
    return JSON.parse(comments);
  } else {
    return [];
  }
}
function loadComments() {
  let commentList = document.getElementById('commentList');
  commentList.innerHTML = '';

  let comments = getComments();

  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];

    let listItem = document.createElement('li');
    listItem.innerHTML =
      '<strong>' + comment.user + ':</strong> ' + comment.review;

    commentList.appendChild(listItem);
  }
}