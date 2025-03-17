// 회원가입 로직
async function trySignUp() {
    const email = document.querySelector("input[name='register-id']").value;
    const password = document.querySelector("input[name='register-passwd']").value;
    const checkPassword = document.querySelector("input[name='confirm-passwd']").value;
    console.log(email, password, checkPassword)
    if (password !== checkPassword) {
        alert("비밀번호가 서로 맞지 않아요.");
        return
    }

    const response = await fetch("http://localhost:3000/auth/register/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    if (response.status !== 201) {
        alert('회원가입에 실패했어요.')
    } else {
        const responseData = await response.json()
        const { accessToken, refreshToken } = responseData;
        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        }
        // TODO : localStorage에 저장해뒀으니까요, 이 값을 나중에 요청할 때 제가 작성한 토큰 증명 로직으로 확인하는 과정으로 권한 확인하시면 됩니다.
        // 제 희망사항이고요 저도 아직 구현 못해서요, 일단 알고계시면 좋을거같습니다.
        window.location.href = "http://localhost:8080/main";
    }
}