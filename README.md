# React - Spring project: 요양보호사 통합 홈페이지

### React에서 spring으로 post mapping

결과적으로, axios나 fetch를 통한 api를 이용하는 것이 아니라, form tag를 이용하여 값을 보낼 수 있다!!

```JS
<form action="http://IPaddress/account/login" method="post">
    <label>
        <div>아이디</div>
        <input
        type="text"
        placeholder="ID"
        value={ID}
        onChange={(e) => setID(e.target.value)}
        name="id"
        />
    </label>
    <label>
        <div>비밀번호</div>
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        />
    </label>
    <button type="submit">로그인</button>
</form>
```

중요한 것은 <i>서버에서 받는 dto의 필드 이름과 input tag의 name 값이 같아야 한다.</i>는 것이다!

#### 추가: post 데이터 보낸 후 return받은 값 사용하기.

spring에서 데이터를 받을 때, 바로 DataDto dataDto로 받는 것이 아니라, @ResponseBody annotation을 추가 해서 받으면 값을 return 받을 수 있다!

```java
@PostMapping("/login")
public ResponseEntity<Object> login(@RequestBody LoginFormDto loginFormDto) {
    return new ResponseEntity<>(loginFormDto, HttpStatus.OK);
}
```

위와 같이 PostMapping을 하면 서버에서 validation 후에 값을 return해 줄 수 있다.

### react-router-dom & gh-pages

local에서 개발할 때는 path="/"로 했을 떄 정상적으로 라우팅이 된다. 하지만 gh-pages를 이용해 빌드하면 default 경로가 package.json의 homepage URL값으로 되어 "/"로 가지 않고 "/carework-web-page-front"로 가게 된다.<br><br>

이걸 해결하는 방법은 생각보다 간단하다.

```JS
<BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
        ...
    </Routes>
</BrowserRouter>
```

이렇게 basename에 process.env.PUBLIC_URL을 추가해 주면 적절하게 라우팅 된다.<br>
PUBLIC_URL은 package.json의 homepage URL값으로 설정된다.<br>

- process.env.PUBLIC_URL은 파일을 따로 생성할 필요 없이 그냥 바로 넣어주면 된다! (import 하는 것도 X)
