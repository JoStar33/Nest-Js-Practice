패스포트에서는 전략이라는걸 사용한다.
거창해보이지만 로그인 어떻게할지 로직 적어놓은 파일에 불과하다는 점.
시리얼라이즈 유저 실행. 세션쿠키와 아이디가 매칭되도록 보냄.

```javascript
passport.serializeUser((user, done) => {
  done(null, user.id); //세션에 user의 id만 저장.
  //???왜 user.id만 보냄?
  // >> session스토리지가 크냐? 아니걸랑ㅋ 그래서 id만 저장.
});
```

동작과정은 아래와 같다.

전제: email, password기반의 로그인구조. /user/login이라는 url을 통해 로그인을 처리중.

1. 브라우저에서 사용자가 로그인폼에 email과 password를 입력하고 전송하면, 해당 데이터가 dispatch가 된다.
2. 데이터를 받아서 /user/login으로 넘긴다. (Back Server req.body에 들어감)
3. user.js에서 authenticate local이 실행이된다.
4. local.js가 실행되어 상황에 맞게 done을 return 한다.
5. authenticate에서 에러가 없으면 req.login(passport 로그인)을 시도한다.req.login하는 동시에 index.js의 serializeUser을 한다.
6. 문제없으면 프론트로 사용자의 정보를 넘겨준다. 그리고 세션에 정보를 저장한다.
