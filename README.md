## **컨벤션**

### **1. Git Workflow**

```
└ main: 배포 코드가 있는 브랜치
    └ develop: 실제 개발 브랜치
    └ feature: 기능 구현 브랜치
    └ test: 테스트 코드 작성 브랜치
    └ fix: 버그 수정 브랜치
    └ release: 서버에서 배포관리를 위한 브랜치(커스텀)
    └ refactor: 코드 스타일 수정 및 리팩토링을 위한 브랜치
    └ docs: readme 등 문서를 작업하는 브랜치
└ hoxfix: main에서 버그를 수정할 브랜치
```

### **2. Branch Naming**

```markdown
⭐️ [해당하는 브랜치]/[front/back]-issue[이슈번호]
```

```
ex) develop
      └ feature/front-issue25
      └fix/front-issue126
      └ docs/back-issue128
      └ release/infra-issue123
```

### **3. Commit Convention**

```markdown
💡 [Part] Tag: Subject
```

**[파트] 태그: 제목**의 형태로 ], **:** 뒤에는 **space**가 있다.

ex) [FE] feat: 홈페이지 이미지추가


feat: 기능 추가

modify: 버그 아닌 코드 수정

fix: 버그 수정

refactor: 코드 리팩토링

style: 코드 스타일(코드 컨벤션 추가) 수정

docs: 문서 작업

design: 프론트 CSS 수정

test: 테스트 코드 작성

chore: 프로젝트 설정 파일 수정

create: 프로젝트 생성

rename: 파일이나 폴더명을 수정하거나 옮기는 작업만 수행

remove: 파일을 삭제하는 작업만 수행


ex) feat: 로그인 기능 추가

- 커밋 메시지는 한글로 작성한다. (기술적인 영어 제외)
    
    ex) feat: add 로그인 기능 (X) feat: 로그인 기능 추가 (O)
    
