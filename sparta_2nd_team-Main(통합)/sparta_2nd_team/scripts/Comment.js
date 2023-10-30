//  댓글 요소를 생성하는 함수
function createCommentElement(comment) {
    const commentElement = document.createElement('div'); // 새로운 div 엘리먼트를 생성
    commentElement.className = 'Comment'; // div 엘리먼트에 'Comment' 클래스를 할당

    const commentTitle = document.createElement('h3'); // 새로운 h3 엘리먼트를 생성
    commentTitle.className = 'comment-title'; // h3 엘리먼트에 'comment-title' 클래스를 할당
    commentTitle.innerText = 'REVIEW'; // h3 엘리먼트의 텍스트 내용을 'REVIEW'로 설정
    commentElement.appendChild(commentTitle); // h3 엘리먼트를 commentElement에 추가

    const commentUser = document.createElement('p'); // 새로운 p 엘리먼트를 생성
    commentUser.innerHTML = `<strong class="comment-label">작성자ID :</strong> <span class="comment-username">${comment.name}</span>`; // p 엘리먼트의 HTML 내용을 설정
    commentElement.appendChild(commentUser); // p 엘리먼트를 commentElement에 추가

    const commentContent = document.createElement('p'); // 새로운 p 엘리먼트를 생성
    commentContent.innerHTML = `<strong class="comment-label">댓글 :</strong> ${comment.content}`; // p 엘리먼트의 HTML 내용을 설정
    commentElement.appendChild(commentContent); // p 엘리먼트를 commentElement에 추가

    const RepairBtn = document.createElement('span'); // 새로운 span 엘리먼트를 생성
    RepairBtn.innerHTML = `<button id="repairBtnComponent" class="comment-label">수정</button> `; // p 엘리먼트의 HTML 내용을 설정
    commentElement.appendChild(RepairBtn); // span 엘리먼트를 commentElement에 추가

     const deleteBtn = document.createElement('span'); // 새로운 span 엘리먼트를 생성
    deleteBtn.innerHTML = `<button id="deleteBtnComponent" class="comment-label">삭제</button> `; // span 엘리먼트의 HTML 내용을 설정
    commentElement.appendChild(deleteBtn); // span 엘리먼트를 commentElement에 추가

    return commentElement; // 생성한 commentElement를 반환
}

//  로컬 스토리지에서 댓글을 불러와서 화면에 표시하는 함수
function loadCommentsFromLocalStorage() {
    const commentContainer = document.getElementById('comment-container'); // 'comment-container' 엘리먼트를 가져옵
    commentContainer.innerHTML = ''; // 'comment-container' 엘리먼트의 내용을 비웁

    const comments = JSON.parse(localStorage.getItem('comments')) || []; // 로컬 스토리지에서 댓글을 불러옵
    comments.forEach(comment => { // 불러온 댓글을 순환하면서 처리
        const commentElement = createCommentElement(comment); // 댓글 엘리먼트를 생성
        commentContainer.appendChild(commentElement); // 댓글 엘리먼트를 'comment-container'에 추가
    });
}

//  페이지가 로딩될 때 댓글을 로컬 스토리지에서 불러와서 표시하는 이벤트 리스너를 추가
document.addEventListener('DOMContentLoaded', loadCommentsFromLocalStorage);


//  'Enter' 버튼 클릭 이벤트에 대한 핸들러를 추가
const btnAddTxt = document.getElementById('UserCheckBtn'); // 'UserCheckBtn' 엘리먼트를 가져옵

btnAddTxt.addEventListener('click', (e) => { // 'Enter' 버튼 클릭 이벤트를 처리하는 함수를 등록
    e.preventDefault(); // 기본 동작(폼 제출)을 막습
            // element를 가져옴
    const userName = document.getElementById('inputName');
    const InnerPassword = document.getElementById('PasswordInput');
    const CommentArea = document.getElementById('CommentText');

    if (userName.value.trim() === '') { // 작성자 입력란이 비어있는지 확인
        alert('작성자를 입력해주세요.'); // 알림창을 띄웁
        userName.focus(); // 작성자 입력란에 포커스를 맞춥
    } else if (InnerPassword.value.trim() === '') { // 비밀번호 입력란이 비어있는지 확인
        alert('설정할 비밀번호를 입력해주세요.'); // 알림창을 띄웁
        InnerPassword.focus(); // 비밀번호 입력란에 포커스를 맞춥
    } else if (CommentArea.value.trim() === '') { // 댓글 입력란이 비어있는지 확인
        alert('내용을 입력해주세요'); // 알림창을 띄웁
        CommentArea.focus(); // 댓글 입력란에 포커스를 맞춤
    } else {
        //  새로운 댓글 객체를 생성
        const comment = {
            name: userName.value, // 작성자 이름
            password: InnerPassword.value, // 비밀번호
            content: CommentArea.value, // 댓글 내용
        };

        //  로컬 스토리지에 댓글을 저장
        const comments = JSON.parse(localStorage.getItem('comments')) || []; // 이전 댓글을 로드하거나 빈 배열을 생성
        comments.push(comment); // 새로운 댓글을 배열에 추가
        localStorage.setItem('comments', JSON.stringify(comments)); // 업데이트된 댓글을 로컬 스토리지에 저장

        // 입력 필드를 지웁
        userName.value = '';
        InnerPassword.value = '';
        CommentArea.value = '';

        // 업데이트된 댓글을 화면에 표시
        loadCommentsFromLocalStorage();
    }
});
const ArrayContent = [];
   const deleteBtnId = document.getElementById("#deleteBtnComponent");
deleteBtnId.addEventListener("click", (e) => function (){
    function deleteComment(comment){
        const findIndex = localStorage.removeItem(comment);
        if(findIndex != -1){
            ArrayContent.splice(findIndex,1);
              deleteComment();
        }
    };
});





