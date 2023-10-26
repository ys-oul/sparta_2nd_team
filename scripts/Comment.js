

const formTagCheck = document.getElementById("formInput");
const btnAddTxt = document.getElementById('UserCheckBtn');
  const userName = document.getElementById('inputName');
  const InnerPassword = document.querySelectorAll("PasswordInput");
  const CommentArea = document.querySelectorAll("CommentText");

  if ( btnAddTxt !== null) {
    alert("The element exists");
}
else {
    alert("The element does not exist");
}

  // btnAddTxt.addEventListener("click", ()=> {
  //   console.log(btnAddTxt.value);
  //   console.log(InnerPassword.value);
  //   console.log(CommentArea.value);
  //   let userInfo = {id:userName.value, pwd:InnerPassword, comment:CommentArea}
  //   localStorage.setItem();
  // });
btnAddTxt.addEventListener("click", test);

function test() {
console.log(btnAddTxt.value);
console.log(InnerPassword.value);
console.log(CommentArea.value);
let userInfo = {
id: userName.value,
pwd: InnerPassword,
comment: CommentArea,
};
 localStorage.setItem();
};

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let msecond = date.getMilliseconds();
  let fullDateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + msecond;

  let addList = '';

  if (userName.value == "") {
    alert('작성자를 입력해주세요.');
    userName.focus();
  } else if (CommentArea.value == "") {
    alert('내용을 입력해주세요.');
    CommentArea.focus();
  } else if(InnerPassword.value === "number"){
    InnerPassword.focus();
  } else {
    addList = '<div>'
        + '<p class="title">' + title.value + '<span class="reply-count"></span></p>'
        + '<p class="user-info fs-12 txt-gray">' + userName.value + ' | ' + fullDateTime + '</p>'
        + '</div>'
        + '<div>'
        + '<p class="content">' + content.value + '</p>'
        + '</div>'
        + '<div class="reply-box fs-12">'
        + '<div class="reply-write">'
        + '<input type="text" name="replyUserName" style="width: 18%;">'
        + '<input type="text" name="replyContent" style="width: 70%;">'
        + '<button name="btnAddReply" class="btn btn--gray">등록</button>'
        + '</div>'
        + '<div class="reply-list"></div>'
        + '</div>';
    btnAddTxt.innerHTML = addList;
    CommentArea.prepend(CommentArea);
}