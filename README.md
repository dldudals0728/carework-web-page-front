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
