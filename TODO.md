# Commands
- [x] >ping, >pong
- [x] >invite, >초대링크, >봇초대링크
- [x] >botinfo, >봇정보
- [x] >quiz, >퀴즈
- [x] >leader, >leaderboard, >리더보드, >리더, >보드
- [x] >set, >setting, >설정, >settings 
- [x] >help, >도움, >도움말
- [x] >m, >music, >뮤직, >음악
- [x] >blacklist, >black, >블랙리스트, >블랙
- [x] >mylist, >재생목록, >마이리스트

# Develop
- [x] 카테고리 별로 폴더 
- [x] 라바링크 활용
- [x] 최대한 새 모듈 사용 (yarn, knex 등..)
- [x] 속도보다 가독성
- [x] 설정파일은 짧게
- [x] db 는 뭘로? mariadb
- [x] **오픈소스**
- [x] `git pull` exec command
- [ ] 샤드

# Folder
| 경로 | 설명  |
| ---- | ----- | 
| `/classes/`  | 기본적인 구동을 담당 (봇 로그인, 커멘드 불러오기 등..) |
| `/commands/` | 명령어 파일들 |
| `/data/`     | 읽기 전용 데이터들 |
| `/events/`   | 이벤트시 실행되는 함수 (로그인 했을때, 메세지 왔을때 등)  |
| `/lavalink/` | 라바링크 바이너리
| `/locales/`  | i18n 번역파일들 |
| `/scripts/`  | 쉘 스크립트 파일들 |
| `/utils/`    | 구동을 위한 유틸들 (라바링크 검색, DB등록 등) |
