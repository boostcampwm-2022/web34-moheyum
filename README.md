<!--

1. html 을 좀 떼고 마크다운 표준으로?
2. 주요 기능 안내가 없음 (동영상 링크로 퉁 친 느낌)
    1. 동영상은 가능하면 임베디드 해야됨
    2. 데모 영상과 별개로 기능별 영상으로 나눠야 함
3. 팀, 개인의 도전 과제 없음
    1. 팀원 소개를 더 세분화하고 여기에 개인별 어떤 도전 과제를 겪었는지 추가
4. 특징으로 내세우기 뭐한 것들이 있음
    1. MongoDB 내용 좀 이상함
    2. SFTP 빼도 될듯
5. 기술 스택
    1. SFTP는 기술 스택이라고 말하면 안됨 (사용한 프로토콜임)
    2. 분류를 좀 해야될 수도
    3. 채택 이유도 적어야 하나?


-->

# ![logo](https://i.imgur.com/xMwOfj0.png)
> 마크다운을 지원하는 SNS  
모헤윰으로 당신의 일상을 공유해보세요.



---

## 기능

<!--
데모 영상
- 각 기능을 타임스탬프로 지정)
- 깃헙에는 마크다운 이미지로 썸네일 걸고, 노션에는 유튜브 영상 임베드 
-->

**현재 임시 영상이며 영상 추후 추가 예정입니다.**

https://youtu.be/1vs4SEbdDDM

<!--
- 회원가입 + 이메일 인증
- 뉴스피드 무한 스크롤
- 마크다운 글 작성 + 이미지 업로드
- 마크다운 멘션
- 답글
- 마이 프로필 페이지 (무한 스크롤 + 프로필 편집)
- 팔로우 (다른 사람 프로필에서 팔로우 클릭 + 팔로우/팔로잉 리스트)
-->

<!--
작업 이력
v1
원래는 2열 마크다운 테이블에 gif + 기능을 배치했으나
깃헙 마크다운 테이블은 안에 영상 업로드 불가하여
테이블, 기능 별 영상 빼버리고 데모 영상으로 통합.
기능 리스트는 그냥 불렛 리스트로만 관리함

v2
기능 수를 간추리고 테이블+gif로 관리하는 것도 다시 고려
-->

|||
:--:|:--:
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d3061b60-1e3d-4db5-9993-295edad7fc3d/email.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221211T080343Z&X-Amz-Expires=86400&X-Amz-Signature=c0f78b5f86c23dd071b4419db22e8147fe80ece2577173b6b1ed244974b1f4f6&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22email.gif%22&x-id=GetObject)|![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c9909890-9ff0-4b9a-bdd6-2736f5d52d4f/%E1%84%86%E1%85%AE%E1%84%92%E1%85%A1%E1%86%AB%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AF.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221211%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221211T080423Z&X-Amz-Expires=86400&X-Amz-Signature=de12ce6add23d589d97355ba76fdae8359281a80115fa975c734b604726df3ae&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22%25E1%2584%2586%25E1%2585%25AE%25E1%2584%2592%25E1%2585%25A1%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25A9%25E1%2586%25AF.gif%22&x-id=GetObject)
이메일 인증을 통한 회원가입, 비밀번호 찾기|무한 스크롤을 통한 뉴스피드 탐색
![마크다운 에디터](https://user-images.githubusercontent.com/81913106/206893134-2932ed3e-e949-447f-a11a-a589a6b2849a.gif)|![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/230bd528-95b8-4354-8e95-101a45e39ebb/upload.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221203T094459Z&X-Amz-Expires=86400&X-Amz-Signature=ed25760a4577a4645d015fb659c149994182e1509894f10676b850d8bed6fc96&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22upload.gif%22&x-id=GetObject)
마크다운 형식의 게시글 작성|드래그 앤 드랍을 통한 이미지 업로드

- 이메일 인증을 통한 회원가입, 비밀번호 찾기
- 무한 스크롤을 통한 뉴스피드 탐색
- 마크다운 형식의 게시글 작성
    - 드래그 앤 드랍을 통한 이미지 업로드
    - 팔로워/팔로잉 유저 멘션
    - 게시글에 대한 답글 작성 및 탐색
- 프로필 페이지

## 프로젝트 구조 및 사용 기술

<!--
작업 이력
- 버전 제외 (버전이 없는 서비스들과의 통일성)
- SFTP 제외 (기술이 아니라 프로토콜임, 편법이라 노출해서 좋을거 없음)
- 카테고리별로 분류
-->

![image](https://user-images.githubusercontent.com/57206558/205439322-ca839964-4898-4438-82f1-37d5fdd7858f.png)


|Category|Tech Stack|
--|--
FE|![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![Recoil](https://img.shields.io/badge/Recoil-blue?logo=recoil&logoColor=white) ![Emotion](https://img.shields.io/badge/Emotion-yellow)
BE&DB|![Nest](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs) ![Mongoose](https://img.shields.io/badge/Mongoose-000000) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white) 
COMMON|![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![YarnBerry](https://img.shields.io/badge/Yarn--Berry-2C8EBB?logo=yarn&logoColor=white)
INFRA|![NCloud](https://img.shields.io/badge/NCloud-green?logo=naver) ![Github Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=github%20actions&logoColor=white) ![PM2](https://img.shields.io/badge/PM2-2B037A?logo=pm2) ![NGINX](https://img.shields.io/badge/NGINX-009639?logo=nginx)
TOOL|![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)

## 도전

<!-- 

라이브러리 없이 마크다운 에디터 구현

--> 

### 1. 별도의 라이브러리 없이 마크다운 에디터 구현

- 사용자가 기본적인 서식을 적용할 수 있기를 원했어요.
- 직접 에디터를 구현하고, 입력한 내용을 Markdown Parser가 렌더링해줘요.
- 멘션 추천 등 원하는 기능과 UI를 추가할 수 있었어요.

### 2. Next.js를 이용한 SSR 도입

- 내용이 자주 변하지 않는 일부 페이지에 SSR 기능을 도입했어요.
- 글 읽기 페이지는 서비스를 처음 접한 유저들도 볼 수 있는 만큼 SSR을 통해 성능적인 이점을 챙길 수 있었어요.

### 3. MongoDB 쿼리 최적화

- B+ tree index 의 특성을 고려한 ESR Rules 인덱싱
    - 3190ms -> 2ms
    - [링크](https://polarlsm.notion.site/MongoDB-FollowingPost-3190ms-2ms-5990f08927604b3dad81c45a2a05054d)
- 병렬 쿼리 및 Set을 이용한 중복 제거
    - 1300ms -> 340ms
    - [링크](https://polarlsm.notion.site/MongoDB-MentionList-1300ms-340ms-456567ddf9ae41d79de39be4ea1bae55)

### 4. Redis를 이용한 캐싱

- (예정)

### 5. API 서버 성능 수치화

- (예정)
- <>를 통한 스트레스 테스트
- <>를 통한 벤치마크

### 6. Auto-Scaling

- (예정)

## 멤버

| J024_김남효 | J097_백성익 | J142_이선민 | J149_이우재 |
|:---:|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/57206558/205439057-1bcba98d-56cf-429b-b603-9774b48a4ed3.png" width="300px">|<img src="https://user-images.githubusercontent.com/57206558/205439066-4afa7c25-5b8f-44a8-a966-42501ec3b434.png" width="300px">|<img src="https://user-images.githubusercontent.com/57206558/205439070-0b91e964-25c8-4369-87cf-d9efce622ba9.png" width="300px">|<img src="https://user-images.githubusercontent.com/57206558/205439080-057bda4e-400f-4d08-b3af-c381d6bfb107.png" width="300px">
| [namhyo01](https://github.com/namhyo01) | [906bc906](https://github.com/906bc906) | [leesunmin1231](https://github.com/leesunmin1231) | [prayinforrain](https://github.com/prayinforrain) |
| Backend | Backend | Frontend | Frontend |

## 문서

- [Notion](https://polarlsm.notion.site/Moheyum-4c54f7ce6bc348bd84121578d4079b50)
- [Figma](https://www.figma.com/file/bUlrkKtjfXPfHvdIvLuXvc/Moheyum?node-id=158%3A1655&t=U1UrufRdVG1ntwB2-0)
- [학습 정리 및 문제 해결 과정](https://polarlsm.notion.site/TIL-07a41dada35841aeb396e9a73c14ff4e)
- [백로그](https://github.com/orgs/boostcampwm-2022/projects/68/views/6)
