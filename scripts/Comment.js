const formTagCheck = document.getElementById("formInput");
const btnAddTxt = document.getElementById('UserCheckBtn');
const userName = document.getElementById('inputName');
const InnerPassword = document.getElementById("PasswordInput");
const CommentArea = document.getElementById("CommentText");
const deleteBtn = document.getElementById("UserDeleteBtn");
const RepairBtn= document.getElementById("UserRepairBtn");

 // 배열 선언
const comments = [];

// 고유 키 생성 함수
function generateUniqueKey() {
    // 현재 시간을 기반으로 임의의 문자열을 생성
    const key = Math.random().toString(36).substr(2,7);
    return key;
}

btnAddTxt.addEventListener("click", (e) => {
    e.preventDefault();
    if (userName.value.trim() === " ") {
    alert('작성자를 입력해주세요.');
    userName.focus();
} else if (InnerPassword.value.trim() === false) {
    alert('설정할 비밀번호를 입력해주세요.');
    InnerPassword.focus();
} else if (CommentArea.value.trim() === false) {
    alert("내용을 입력해주세요");
    CommentArea.focus();
} else if(isNaN) {
        // 표시에 추가할 HTML 생성 (어떻게 사용할지 명확하지 않아서 추가 설명 필요)
        function Template(addList) {
            return `
        <div class="comment">
            <h3 class="comment-title">REVIEW</h3>
            <p><strong class="comment-label">작성자ID :</strong> <span class="comment-username">${userName.value}</span></p>
            <p><strong class="comment-label">댓글 :</strong> ${CommentArea.value}</p>
        </div>
    `;
        }


        const generatedKey = generateUniqueKey();
        // 생성한 키가 로컬 스토리지에 존재하지 않는지 확인
        if (!localStorage.getItem(generatedKey)) {
            let userInfo = {id: userName.value, pwd: InnerPassword.value, comment: CommentArea.value};
            localStorage.setItem(generatedKey, JSON.stringify(userInfo));
            console.log('생성된 고유 키: ' + generatedKey, JSON.stringify(userInfo));  // generateKey 에서 레퍼런스 에러뜸
        } else {
            alert('키 중복 발생! 다시 시도하세요.');
        }
                    // 댓글 중복 생성 기능 구현 예정

           let newComment = Template(userName.value, CommentArea.value);
                formTagCheck.innerHTML += newComment;
        function displayKeyAndValue(generatedKey) {
            const container = document.getElementById('btnAddTxt');
            const formElement = document.createElement('form');
            const headingElement = document.createElement('h4');
            headingElement.textContent = generatedKey;
            const paragraphElement = document.createElement('p');
            paragraphElement.className = 'ReviewText';
            paragraphElement.textContent = generatedKey;
            formElement.appendChild(headingElement);
            formElement.appendChild(paragraphElement);
            container.appendChild(formElement);
        }
      // 상태유지
         formTagCheck.innerHTML += Template();
            userName.value = " ";
            InnerPassword.value = " ";
            CommentArea.value = " ";
    }

});






