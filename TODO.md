# Commands
- [x] >ping, >pong
- [x] >invite, >초대링크, >봇초대링크
- [x] >botinfo, >봇정보
- [x] >quiz, >퀴즈
- [x] >leader, >leaderboard, >리더보드, >리더, >보드
- [x] >set, >setting, >설정, >settings 
- [x] >help, >도움, >도움말
- [ ] >m, >music, >뮤직, >음악
- [ ] >blacklist, >black, >블랙리스트, >블랙
- [ ] >mylist, >재생목록, >마이리스트

# Develop
- 카테고리 별로 폴더 
- 라바링크 활용
- 최대한 새 모듈 사용 (yarn, knex 등..)
- 속도보다 가독성
- 설정파일은 짧게
- db 는 뭘로? mariadb
- 클로즈소스 **오픈소스** 둘 중에 하나
- 샤드
- `git pull` exec command

# Folder
| 경로 | 설명  |
| ---- | ----- | 
| `/classes/`  | 기본적인 구동을 담당 (봇 로그인, 커멘드 불러오기 등..) |
| `/events/`   | 이벤트시 실행되는 함수 (로그인 했을때, 메세지 왔을때 등)  |
| `/utils/`    | 구동을 위한 유틸들 (명령어 카테고리 분류 등) |
| `/commands/` | 명령어 파일들 |
| `/locales/`  | i18n 번역파일들 |
| `/scripts/`  | script files |
| `/tests/`    | test files |

[기타](https://github.com/seoaapp/SeoaBot/issues/68)
