const formTagCheck = document.getElementById("formInput");
const btnAddTxt = document.getElementById('UserCheckBtn');
const userName = document.getElementById('inputName');
const InnerPassword = document.querySelectorAll("PasswordInput");
const CommentArea = document.querySelectorAll("CommentText");

//임의의 값으로 key 값 자동으로 새성하는 제네레이터 함수
function generateUniqueKey() {
    // 현재 시간을 기반으로 임의의 문자열을 생성하고 사용
    const key = Date.now().toString() + Math.random().toString(36).substring(2);
    return key;
}

btnAddTxt.addEventListener("click", (e) => {
      e.preventDefault();
    const generatedKey = generateUniqueKey();
    if (!localStorage.getItem(generatedKey)) {
        localStorage.setItem(generatedKey, '임의의 값');
        console.log('생성된 고유 키: ' + generatedKey);
    } else {
        alert('키 중복 발생! 다시 시도하세요.');
    }
    let userInfo = {id: userName, pwd: InnerPassword, comment: CommentArea}
    localStorage.setItem(generatedKey, JSON.stringify(userInfo));
    window.localStorage.getItem(generatedKey);
        return generatedKey;
});

function saveValue(userInfo) {
    this.userInfo = userInfo;
};

function displayKeyAndValue(userInfo) {
            // 표현할 엘리먼트 생성
            const divElement = document.createElement('h4');
            const divElement2 = document.createElement('p');
            divElement.innerHTML = `<h4>${userName}</h4>`;
            divElement2.innerHTML =  `<p class="ReviewText">${CommentArea}</p>`;
            // 문서에 추가
            document.getElementById('btnAddTxt').appendChild(userInfo);
        }
        // 예시 데이터를 이용해서 함수 호출
        displayKeyAndValue("이름", "John");
        displayKeyAndValue("나이", "30");
        displayKeyAndValue("직업", "프로그래머");
let addList = '';
if (userName.value == " ") {
    alert('작성자를 입력해주세요.');
    userName.focus();
} else if (CommentArea.value == "") {
    alert('내용을 입력해주세요.');
    CommentArea.focus();
} else if (InnerPassword.value === "number") {
    alert("숫자만 입력해주세요.")
    InnerPassword.focus();
} else {

    generateKey =
        '<h4>`${userName}`</h4>'
        + '<br>'
        + '<p className="ReviewText">`${CommentArea}`</p>';

    btnAddTxt.innerHTML = addList;
    btnAddTxt.prepend(addList);
}