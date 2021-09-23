# React 에서 API 연동

- axios 라이브러리 설치
- 사용한 더미 API 주소 : https://jsonplaceholder.typicode.com/users

### API 사용해보기(요청-로딩-에러 상태)

- 요청 결과, 로딩 상태, 에러 유무 관리 (users, loading, error)

### 리팩토링(useReducer, 요청 상태 관리)

- useReducer로 같은 작업 구현(재사용성 up)
- Use "useAsync Custom Hook"
- Use useCallback
- Reducer 컴포넌트 분리(useAsync.js)

### API reload 버튼 생성
