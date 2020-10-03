<p align="center">
    <img src="https://cdn.discordapp.com/avatars/756738748267626618/ec77fa438a696e2785526b74c8fa0aae.png" />
</p>

<h1 align="center">
  SeoaV1-fixed
</h1>

<p align="center">
  <a href="https://github.com/seoaapp/SeoaBot">seoaapp/SeoaBot</a>의 포크인 <a href="https://github.com/UnderC/SeoaBot">UnderC/SeoaBot</a>을 고친 버전
</p>

<p align="center">‏‏‎ ‎</p>

> 이 문서는 봇 개발자를 위한 문서입니다\
> 봇 사용자는 봇 내부 help 명령어를 사용하세요

## 준비물
- bash
- node (v12 or higher)
- npm or yarn
- [**Java**](#Java설치)
  
## Java설치
> `disableExitOnFail=true`를 환경변수에 추가하여 음악기능을 비활성하고 이 과정을 스킵할 수 있습니다

이 봇에 사용되는 [lavalink](https://github.com/Frederikam/Lavalink)를 [구동](scripts/lavalink.sh)하기 위하여\
심볼릭 링크된 OpenJDK 13이 필요합니다

### OpenJDK 13 다운로드
[이곳](https://download.java.net/java/GA/jdk13.0.2/d4173c853231432d94f001e99d882ca7/8/GPL/openjdk-13.0.2_linux-x64_bin.tar.gz)에서 tar.gz 파일을 받은후 압축을 해제합니다

### 심볼릭 링크
```sh
sudo ln --symbolic /path/to/downloaded/jdk-13.0.2/bin/java /usr/bin/java13
```
로 심볼릭 링크를 생성합니다

## 구성요소 다운로드
- `npm i` 혹은 `yarn` 을 입력하여 npm 패키지를 받습니다
- 옵션) [`/scripts/lavalink.sh`](scripts/lavalink.sh)를 실행하여 바이너리를 미리 받아 놓을 수 있습니다

## 실행 설정
[`config.example.json`](config.example.json)를 `config.json`에 복사하여 파일을 수정해 설정을 완료합니다

## 실행
배포 모드: `npm start` 혹은 `yarn start`\
개발 모드: `npm test` 혹은 `yarn test`
