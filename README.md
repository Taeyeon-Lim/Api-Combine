# React 에서 API 연동

- axios 라이브러리 설치
- 사용한 더미 API 주소 : https://jsonplaceholder.typicode.com/users
- 구현 방식 : Custom Hook, react-async lib

### API 사용해보기(요청-로딩-에러 상태)

- 요청 결과, 로딩 상태, 에러 유무 관리 (users, loading, error)

### 리팩토링(useReducer, 요청 상태 관리)

- useReducer로 같은 작업 구현(재사용성 up)
- Use "useAsync Custom Hook"
- Use useCallback
- Reducer 컴포넌트 분리(useAsync.js)
- API reload 버튼 생성

### [Add] Hook( useAsync )로 비동기 작업 관리

- 특정 파라미터의 API 요청

### [install] react-async 라이브러리로 비동기 작업 관리

- react-async의 일부 hook 사용
- 장점

1. 필요할 때, 불러서 바로 사용 가능
2. 비동기 작업 기능도 대부분 보유
3. hook 외에 컴포넌트로도 OK!
4. 특정 promise의 작업 도중 중단하는 기능

- 단점

1. 옵션의 다양함(복잡함 증가)

### [Add] Context에서 비동기 작업 관리

- user, users 관련 Context 생성
- Context로 만든 반복 코드 리팩토링
