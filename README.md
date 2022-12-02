
<div align="center">
    <div>
        <img src="https://i.imgur.com/3nQKUuw.png" width="200" >  
        <br>
        <img src="https://i.imgur.com/dmdTV1Q.png" width="300"> 
    </div>
    <h2>
        마크다운을 지원하는 SNS <br> 모헤윰으로 당신의 일상을 공유해보세요      
    </h2>
</div>
<div align="center">
    <img src="https://img.shields.io/badge/Next.js-13.0.3-000000?logo=next.js&logoColor=black">
    <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react">
    <img src="https://img.shields.io/badge/NestJS-9.1.4-E0234E?logo=nestjs">
    <img src="https://img.shields.io/badge/Recoil-0.7.6-blue">
    <img src="https://img.shields.io/badge/Mongoose-9.2.1-000000">
    <img src="https://img.shields.io/badge/MongoDB-6.0.2-47A248?logo=mongodb">
    <img src="https://img.shields.io/badge/Redis-7.0.5-DC382D?logo=redis">
    <img src="https://img.shields.io/badge/TypeScript-4.8.4-3178C6?logo=typescript">
</div>
<div align="center">
    <img src="https://img.shields.io/badge/Emotion-11.10.5-yellow">
    <img src="https://img.shields.io/badge/Yarn--Berry-3.2.4-2C8EBB?logo=yarn">
    <img src="https://img.shields.io/badge/Naver Cloud Platform-green?logo=naver">
    <img src="https://img.shields.io/badge/GitHub Actions--2088FF?logo=github actions">
    <img src="https://img.shields.io/badge/PM2--2B037A?logo=pm2">
    <img src="https://img.shields.io/badge/NGINX--009639?logo=nginx">
    <img src="https://img.shields.io/badge/Figma--F24E1E?logo=figma">
    <img src="https://img.shields.io/badge/SFTP--blue">
</div>

<div align="center">
    <a href="https://polarlsm.notion.site/Moheyum-4c54f7ce6bc348bd84121578d4079b50">노션</a> |
    <a href="https://www.figma.com/file/bUlrkKtjfXPfHvdIvLuXvc/Moheyum?node-id=158%3A1655&t=U1UrufRdVG1ntwB2-0">피그마</a> |
    <a href="https://polarlsm.notion.site/TIL-07a41dada35841aeb396e9a73c14ff4e">학습 공유</a> | 
    <a href="https://github.com/orgs/boostcampwm-2022/projects/68/views/6">백로그</a> |
    <a href="https://github.com/boostcampwm-2022/web34-moheyum/wiki">위키</a> 
</div>  

## 배포 주소
- 정식 버전
- 개발 버전(dev 브랜치): http://dev.moheyum.ga/

### 전체 서비스 구조
![](https://i.imgur.com/vC130DL.png)
## 프로젝트 구체적인 소개
- 모헤윰은 마크다운 에디터를 지원하는 Public한 SNS 서비스 입니다.
    - 마크다운 에디터와 프리뷰를 지원합니다.
    - 각 게시글에 대한 답글을 남길 수 있어요.
    - 내가 팔로우하는 사람들의 글을 뉴스피드로 확인할 수 있어요.
    - 내 글을 공유하고 싶은 사람들을 멘션해보세요.
    - 멘션을 받거나 답글이 달리면 알림이 와요
    - 내가 보고싶은 글을 검색할 수 있어요.

## 데모 영상
**[시연 영상](https://youtu.be/1vs4SEbdDDM)**
## 기술 특장점
<details>
<summary>Project Manager로 Yarn Berry 사용</summary><br>
    
**npm**으로 하는 의존성 관리가 **peer dependency**의 issue가 있어 비효율 적이다라는 점에 고민을 했습니다.  
pnpm과 yarn을 각각 사용한 후 장단점을 비교해 yarn berry를 선택 했습니다. [관련 자료](https://polarlsm.notion.site/npm-vs-yarn-vs-pnpm-19e27435675c48449f6e33db147bb3b4)
- yarn을 선택 한 후, **패키지 용량**이 눈에 띄게 줄어들었습니다 
- 의존성 위치를 node_moudles 순회로 찾을 필요가 없기에, import에 걸리는 시간 단축되었습니다.
- 패키지 설치에 npm_modules 폴더를 생성을 안해도 되기에 시간이 단축되었습니다.  
</details>

<details>
<summary>SSR과 CSR 적절히 사용</summary><br>
현재 포스트 내용을 불러오는 과정은 SSR을 사용하여 Pre-rendering이 되도록 하고
사용자 인터랙션이 있는 작업은 CSR로 작업하여 사용자 경험성을 챙겼습니다.
</details>
<details>
<summary>에디터</summary>
갓 우재
</details>

<details>
<summary>SFTP를 이용해 환경변수 파일 관리</summary><br>

**환경변수 파일**을 팀원끼리만 공유해야하고, 동기화를 해주어야 한다고 생각하였습니다.
많은 방법중에 저희는 SFTP를 선택하여 환경변수 파일 뿐만 아닌 서버 계정 등 민감한 정보를 공유하였습니다
- vscode Extension의 SFTP가 있어 팀원 모두가 확장 프로그램을 통해 쉽게 접속할 수 있는 장점이 있었습니다
- SFTP를 개발서버에도 연동(?)을 해 환경변수로서 사용이 됩니다. => 이부분 성익님이 보강해주실수 있으실까요?
</details>

<details>
<summary>MongoDB를 사용함으로서 W/R성능 향상</summary><br>

SNS로서 많은 글이 써지고, 읽게 될 것이라는 판단이 들어 MongoDB를 선택하였습니다
- **Mongoose**를 ORM으로 사용해 개발에 편리성을 챙겼습니다
- **Schema-less** 구조여서 피쳐를 줄이거나 추가할 때 유연하게 필드를 추가 가능하였습니다
</details>

## 팀원 소개
<div align="center">
    
| J024_김남효 | J097_백성익 | J142_이선민 | J149_이우재 |
|:--------:|:--------:|:--------:|:--------:|
| <img src="https://user-images.githubusercontent.com/34156840/205316100-a536737c-6ace-48dc-9aac-db4ad38987a5.png" height="150" width="150"> | <img src="https://user-images.githubusercontent.com/34156840/205315809-53734bff-f9fe-4fd6-9f96-6df49c561c2d.png" height="150" width="150"> | <img src="https://i.imgur.com/ZWoDvw3.jpg" height="150" width="150"> | <img src="https://i.imgur.com/tYBm2VJ.jpg" height="150" width="150"> |
| [namhyo01](https://github.com/namhyo01) | [906bc906](https://github.com/906bc906) | [leesunmin1231](https://github.com/leesunmin1231) | [prayinforrain](https://github.com/prayinforrain) |
| Backend | Backend | Frontend | Frontend |
</div>


