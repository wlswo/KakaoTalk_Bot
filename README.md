## **카카오톡 자동응답 봇**

**How To Use ?**

- 안드로이드 유저만 쓸수 있습니다.
- 자바스크립트를 이용해 만들기 때문에
자바 스크립트를 구동할수 있는 모바일 앱이 있어야합니다. 
- 플레이스토어에서 "채팅 자동응답 봇"
또는 메신저봇R 을 다운 받아주세요.
- 다운받은 구동앱에 소스코드를 다운받아 넣어 사용하시면 됩니다. 
- 원하는 기능을 직접 만드실수도 있습니다.

``` 
const {KakaoLinkClient} = require("kakaolink");
const  Kakao = new  KakaoLinkClient("자바스크립트 키",'URL');
Kakao.login('카카오톡ID', 'PASSWD');

Kakao.sendLink(room, {
template_id:    ,//템플릿 아이디 5자리
template_args: {
//카카오링크 태그
} }, 'custom');
```

> 자기 정보에 맞게 수정해서 사용하시면 됩니다.



카카오톡 봇 개발관련 노션 블로그주소입니다.
https://charmed-act-e88.notion.site/3f70c0c88df34a0c9b0d17fd8c7ccb7c
