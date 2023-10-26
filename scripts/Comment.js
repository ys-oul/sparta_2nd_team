const formTagCheck = document.getElementById("formInput");
const btnAddTxt = document.getElementById('UserCheckBtn');
const userName = document.getElementById('inputName');
const InnerPassword = document.querySelectorAll("PasswordInput");
const CommentArea = document.querySelectorAll("CommentText");

// 고유 키 생성 함수
function generateUniqueKey() {
    // 현재 시간을 기반으로 임의의 문자열을 생성
    const key = Date.now().toString() + Math.random().toString(36).substring(2);
    return key;
}

btnAddTxt.addEventListener("click", (e) => {
    e.preventDefault();
    const generatedKey = generateUniqueKey();

    // 생성한 키가 로컬 스토리지에 존재하지 않는지 확인
    if (!localStorage.getItem(generatedKey)) {
        let userInfo = { id: userName.value, pwd: InnerPassword.value, comment: CommentArea.value };
        localStorage.setItem(generatedKey, JSON.stringify(userInfo));
        console.log('생성된 고유 키: ' + generatedKey);
    } else {
        alert('키 중복 발생! 다시 시도하세요.');
    }
});

// userInfo를 저장하는 함수 (코드에서 사용하지 않음)
function saveValue(userInfo) {
    this.userInfo = userInfo;
}

// 키와 값을 표시하는 함수 (코드에서 사용하지 않음)
function displayKeyAndValue(key, value) {
    // 키와 값을 표시할 엘리먼트 생성
    const divElement = document.createElement('div');
    divElement.innerHTML = `<h4>${key}</h4><p class="ReviewText">${value}</p>`;

    // 엘리먼트를 문서에 추가
    document.getElementById('btnAddTxt').appendChild(divElement);
}

// 사용자 입력을 검증하고 표시에 추가 (어떻게 사용할지 명확하지 않아서 추가 설명 필요)
if (userName.value === "") {
    alert('작성자를 입력해주세요.');
    userName.focus();
} else if (CommentArea.value === "") {
    alert('내용을 입력해주세요.');
    CommentArea.focus();
} else if (isNaN(InnerPassword.value)) {
    alert("숫자만 입력해주세요.");
    InnerPassword.focus();
} else {
    // 표시에 추가할 HTML 생성 (어떻게 사용할지 명확하지 않아서 추가 설명 필요)
    const addList = `<h4>${userName.value}</h4><br><p class="ReviewText">${CommentArea.value}</p>`;
    // addList를 적절한 엘리먼트에 추가
    // btnAddTxt.innerHTML = addList;
    // btnAddTxt.prepend(addList);
}
