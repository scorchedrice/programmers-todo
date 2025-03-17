document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    const id = document.querySelector("input[name='id']").value;
    const password = document.querySelector("input[name='passwd']").value;
    const errorMessage = document.getElementById("login-error");

    if (!id || !password) {
        errorMessage.textContent = "아이디와 비밀번호를 입력하세요.";
    } else {
        errorMessage.textContent = "";
        alert("로그인 성공!"); // 실제 서버 연동 시 이 부분 변경
    }
});
