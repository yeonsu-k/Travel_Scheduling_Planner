## 🖥️ 프로젝트 소개

<div align="center">
<img src="https://user-images.githubusercontent.com/26339069/231107642-064bd821-ae06-46b0-9ce6-81da8125457a.png"/>
</div>

- **MYRO 클론 코딩**
    - 여행 스케줄링 플래너 ‘MYRO’ 에 추가 기능을 구현한 프로젝트
    - MYRO 홈페이지: [https://www.myro.co.kr/](https://www.myro.co.kr/)

<br>

## 🗓️ **프로젝트** 기간

**2023.01.13 ~ 2023.04.11 (총 13주)**

<br>

## 💁‍♂️ 팀원소개

<table>
<tr>
<td align="center"><a href="https://github.com/taboowiths"><img src="https://avatars.githubusercontent.com/u/85155789?v=4" width="127px;"/></br> <div>강정현</div><sub><b>Front-End</b></sub></a></br></td>
<td align="center"><a href="https://github.com/yeonsu-k"><img src="https://avatars.githubusercontent.com/u/83412032?v=4" width="127px;"/></br> <div>김연수</div><sub><b>Front-End</b></sub></a></br></td>
<td align="center"><a href="https://github.com/juuyeon"><img src="https://avatars.githubusercontent.com/u/70640278?v=4" width="127px;"/></br> <div>김주연</div><sub><b>Front-End</b></sub></a></br></td>
<td align="center"><a href="https://github.com/Kuuuna98"><img src="https://avatars.githubusercontent.com/u/26339069?v=4" width="127px;"/></br> <div>권유나</div><sub><b>Back-End</b></sub></a></br></td>
<td align="center"><a href="https://github.com/tgb02087"><img src="https://avatars.githubusercontent.com/u/63511273?v=4" width="127px;"/></br> <div>김강호</div><sub><b>Back-End</b></sub></a></br></td>
<td align="center"><a href="https://github.com/platycodonv"><img src="https://avatars.githubusercontent.com/u/93230885?v=4" width="127px;"/></br> <div>김성수</div><sub><b>Back-End</b></sub></a></br></td>
</tr>
</table>

<br>

## **📄 프로젝트 설계**

- [기능 명세서](https://docs.google.com/spreadsheets/d/1cTFpNa3rtxvScTmP93tUZ0Bqy2lIb7YEyHV-gEGOdAo/edit?usp=sharing)
- [API 명세서](https://docs.google.com/spreadsheets/d/1mJYEZbe9z77ddFVewsyaogsY0Bq4I5jmyn_oJQ2h38g/edit#gid=0)
- [ERD](https://www.erdcloud.com/d/EokP9t7yxLFE4Ma6a)
- [와이어프레임](https://www.figma.com/file/nxMWAue7kqgbqhfeRifnBm/Myro?node-id=0%3A1&t=bifaq9hoEdnuyjix-1)

<br>

## 🛠️ 기술스택

### Back-End

| JAVA | Sprin Boot | Gradle | Swagger2 | Junit5 | JWT | JPA | Websocket |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 8 | 2.7.5 | 7.6 | 3.0.0 | - | 3.10.3 | 2.7.5 | 2.7.5 |

### Front-End

| React | TypeScript | React-reudx | React-router-dom | React-slick | React-beautiful-dnd | slick-carousel | Axios | Firebase |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 18.2.0 | 18.0.27 | 8.0.5 | 6.8.1 | 0.29.0 | 13.1.1 | 0.29.0 | 1.3.2 | 9.18.0 |

### Database

| MySQL |
| --- |
| 8.0.31 |

### CI/CD

| Ubuntu | Nginx | Docker | Jenkins | SSL |
| --- | --- | --- | --- | --- |
| 18.04.6 LTS | 1.14.0 | 23.0.1 | - | - |

### TOOL

| GitHub | PostMan | Figma | Notion |
| --- | --- | --- | --- |

### IDE

| Visual Studio Code | IntelliJ |
| --- | --- |

<br>

## ⭐️ Git

<details>

<summary><strong> 🔍 브랜치 전략 및 컨벤션</strong></summary>

<div markdown=”1”>

#### **1. Git Workflow**

```
.
├── main: 배포 코드가 있는 브랜치
│    └── develop: 실제 개발 브랜치
│         ├── feature: 기능 구현 브랜치
│         ├── test: 테스트 코드 작성 브랜치
│         ├── fix: 버그 수정 브랜치
│         ├── refactor: 코드 스타일 수정 및 리팩토링을 위한 브랜치
│         └── docs: readme 등 문서를 작업하는 브랜치
└── hoxfix: main에서 버그를 수정할 브랜치
```

#### **2. Branch Naming**

```
⭐️ [해당하는 브랜치]/[front/back]-issue[이슈번호]
```

```
ex) develop
      ├── feature/front-issue25
      ├── fix/back-issue126
      └── ...
```

#### **3. Commit Convention**

```
💡 [Part] Tag: Subject
```

```
 ex) [FE] feat: 홈페이지 이미지추가
```

**[파트] 태그: 제목**의 형태로 ], **:** 뒤에는 **space**가 있다.

- `feat`: 기능 추가
- `modify`: 버그 아닌 코드 수정
- `fix`: 버그 수정
- `refactor`: 코드 리팩토링
- `style`: 코드 스타일(코드 컨벤션 추가) 수정
- `docs`: 문서 작업
- `design`: 프론트 CSS 수정
- `test`: 테스트 코드 작성
- `chore`: 프로젝트 설정 파일 수정
- `create`: 프로젝트 생성
- `rename`: 파일이나 폴더명을 수정하거나 옮기는 작업만 수행
- `remove`: 파일을 삭제하는 작업만 수행

</details>

</div>

<br>

## 📺 화면 소개 (gif)

### **[기존 기능]**

1. 회원가입
    
    ![회원가입](https://user-images.githubusercontent.com/70640278/231085171-f060d3cf-7e55-43a0-9b83-f5b4f97b8365.gif)
    
2. 로그인
    1. 기본 로그인
        
        ![로그인](https://user-images.githubusercontent.com/70640278/231085678-0bb6b7e0-4d0d-4129-8ec7-ba0a9ea03e9d.gif)
        
    2. 카카오 로그인
        
        ![카카오로그인](https://user-images.githubusercontent.com/70640278/231085693-62847f76-cf96-40f7-a4b8-f66291126f70.gif)
        
3. 메인페이지
    - **메인페이지에서 유저가 공개한 일정과 여행 장소를 확인할 수 있습니다.**
    - **여행지 목록을 확인할 수 있습니다. 유저가 일정을 생성할 때, 해당 목록에서 여행지를 선택할 수 있습니다.**
        - **여행지 검색을 통해 원하는 장소를 찾을 수 있습니다.**
        - **오름차순, 내림차순 정렬을 통해 빠른 검색이 가능합니다.**
    
    ![메인페이지](https://user-images.githubusercontent.com/83412032/231112316-dbaed8c0-c9db-4e35-8b8b-40011ea0f879.gif)
    
4. 마이페이지
    1. 회원 정보 수정
        - **유저가 설정한 닉네임, 비밀번호 그리고 프로필 이미지를 변경할 수 있습니다.**
        1. 프로필 이미지
            
            ![프로필이미지](https://user-images.githubusercontent.com/70640278/231089327-2db5f360-b836-4a2f-99dd-0e3bd12462f5.gif)
            
        2. 회원 정보 수정
            
            ![회원정보수정](https://user-images.githubusercontent.com/70640278/231089266-cdb3405f-0513-4d57-af81-83e1a9e40b2b.gif)
            
    2. 내 일정 목록
        - **유저가 생성한 일정 목록을 확인할 수 있습니다.**
            - **일정의 공개 여부를 설정할 수 있습니다. 공개 설정 시 메인 페이지의 여행기에 공유됩니다.**
            - **일정을 수정할 수 있습니다. 일정을 수정할 수 있는 페이지로 이동합니다.**
            - **친구에게 일정을 공유할 수 있습니다. 일정이 공유된 친구 목록을 확인할 수 있습니다.**
            - **일정을 삭제할 수 있습니다.**
        
        ![일정 공개여부 수정 & 일정공유 & 일정 삭제](https://user-images.githubusercontent.com/93230885/231104186-cd3d7b15-c2d1-4db7-be99-56459474a329.gif)
        
    
5. 일정 생성
    1. 일정 생성 - 1
        1. **[📌추가기능]** 여행 날짜 선택
            - **여행 시작과 끝날짜를 선택합니다.**
            
            ![일정시작](https://user-images.githubusercontent.com/70640278/231094462-2ee913f0-117b-4f4f-939d-053ee9c8e079.gif)
            
        2. 추천 호텔/장소 추가 검색
            - **호텔/장소를 이름으로 검색합니다.**
            
            ![장소추가검색](https://user-images.githubusercontent.com/83412032/231108678-5cc73f8a-cb64-4dd6-bec9-7e6f0f44c3f1.gif)
            
        3. 호텔/장소 정보 모달
            - **호텔/장소 상세 정보를 확인합니다.**
            
            ![장소정보모달창](https://user-images.githubusercontent.com/83412032/231104225-2e2a6bc4-8990-4454-bd2b-a6f29e891552.gif)
            
        4. **[📌추가기능]** 장소 등록
            - **기존에 존재하지 않는 장소를 등록합니다.**
            
            ![장소등록](https://user-images.githubusercontent.com/83412032/231104237-47dfa389-f2e7-4d6d-ab50-e1c77d803e4f.gif)
            
        5. 일정 생성 
            - **일정을 세부적으로 조절합니다.**
            
            ![일정생성버튼클릭](https://user-images.githubusercontent.com/83412032/231104240-6dfbe275-e587-47c4-a64f-6c369cee4a09.gif)
            
    2. 일정 생성 - 2
        1. 일정 이동시간 변경
            - **사용자가 일정 간 이동시간 변경이 가능합니다.**
            
            ![일정 이동시간 변경](https://user-images.githubusercontent.com/93230885/231093458-fdf7857f-ab46-41bb-a81e-15359a26f933.gif)
            
        2. 일정 머무는 시간 변경
            - **사용자가 일정 장소에 머무는 시간 변경이 가능합니다.**
            
            ![일정 머무는 시간 변경](https://user-images.githubusercontent.com/93230885/231096414-a811ebbe-7222-4150-92ae-9a9e59659ddd.gif)
            
        3. 일정 순서 변경
            - **정해진 일정 순서 외에 사용자가 직접 장소 순서 변경을 할 수 있습니다.**
            
            ![일정 순서 변경](https://user-images.githubusercontent.com/93230885/231098007-22291a04-d3bd-4efc-8309-d5ffb41b5b16.gif)
            
        4. 일자별 일정 확인
            - **일정 내 일자별로 상세경로와 지도 확인이 가능합니다.**
            
            ![왼쪽 일자별 클릭](https://user-images.githubusercontent.com/93230885/231098628-96dab50f-44c2-4b0a-ba3d-72b62521c05e.gif)
            
        5. 일정에서 장소 제외
            - **일정에서 제외할 장소를 포함되지 않은 장소 박스로 이동합니다.**
            
            ![장소 보관](https://user-images.githubusercontent.com/93230885/231098941-de6c4101-cc72-4591-a71b-0161b4327ea9.gif)
            
        6. 장소 검색 후 일정에 추가
            - **필요한 장소를 검색 후 일정에 추가가 가능합니다.**
            
            ![장소 검색 후 장소보관함 추가](https://user-images.githubusercontent.com/93230885/231100074-a78b33da-e210-49c5-b2a2-d184c13f594c.gif)
            

### **[📌추가 기능]**

1. 친구
    1. 친구 추가하기
        - **다른 사용자에게 친구 요청을 할 수 있습니다.**
        
        ![친구요청](https://user-images.githubusercontent.com/83412032/231085973-7ecd7e8a-60cb-434b-9d03-398d45e42f7c.gif)
        
2. 알림
    1. 실시간 알림
        - **다른 사용자로부터 친구 신청 알림이 온 경우 실시간 알림이 수신됩니다.**
        
        ![친구요청알림](https://user-images.githubusercontent.com/83412032/231086264-e6d0cd39-b626-4f68-953a-a30f3d68dc4b.gif)
        
    2. 친구 수락 → 마이페이지 친구 목록 확인
        - **친구 요청에 수락한 경우 마이페이지 친구 목록에서 확인이 가능합니다.**
        
        ![친구수락알림](https://user-images.githubusercontent.com/83412032/231096406-c534c5bf-65ac-4d6b-9118-54d43e29f136.gif)
        
    3. 일정 수락 → 마이페이지 일정 목록 확인
        - **친구인 사용자에게서 일정 공유 요청을 수락한 경우 마이페이지 일정 목록에서 확인이 가능합니다.**
        
        ![일정수락알림](https://user-images.githubusercontent.com/83412032/231111482-bb19dd5d-13d7-46e1-ba18-f29dba8161de.gif)
