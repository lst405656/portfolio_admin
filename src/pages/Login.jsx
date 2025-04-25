import LoginForm from "../components/LoginForm";

function Login() {
  const handleLogin = (userData) => {
    console.log("로그인 정보:", userData);
    // 여기서 실제 로그인 API 연동 가능
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default Login;