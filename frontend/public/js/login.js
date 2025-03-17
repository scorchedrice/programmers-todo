document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault(); // 기본 제출 동작 방지

    const id = document.querySelector("input[name='id']").value;
    const password = document.querySelector("input[name='passwd']").value;
    const errorMessage = document.getElementById("login-error");

    if (!id || !password) {
        errorMessage.textContent = "아이디와 비밀번호를 입력하세요.";
    } else {
        errorMessage.textContent = "";
    }
});

// 회원가입
// login.js (로그인 페이지)
function goSign() {
    window.location.href = "http://localhost:8080/register";
}

async function tryLogin() {
    const email = document.querySelector('input[name="id"]').value.trim();
    const password = document.querySelector('input[name="passwd"]').value.trim();
    const response = await fetch("http://localhost:3000/auth/login/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(email + ":" + password),
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    if (response.status !== 201) {
        alert('아이디와 비밀번호를 다시 확인해주세요.')
    } else {
        const responseData = await response.json()
        const { accessToken, refreshToken } = responseData;
        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        }
        window.location.href = "http://localhost:8080/main";
    }
}
