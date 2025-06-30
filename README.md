# 결혼식 청첩장

최상현 & 전은정의 결혼식 청첩장입니다.

## 🗺️ 카카오맵 API 키 설정

### 1. 카카오 개발자 계정 생성 및 API 키 발급

#### 1-1. 카카오 개발자 계정 생성

1. [Kakao Developers](https://developers.kakao.com/) 사이트에 접속
2. 우측 상단 "로그인" 클릭
3. 카카오 계정으로 로그인

#### 1-2. 애플리케이션 생성

1. 로그인 후 "내 애플리케이션" 클릭
2. "애플리케이션 추가하기" 클릭
3. 애플리케이션 정보 입력:
   - **앱 이름**: "결혼식 청첩장" (또는 원하는 이름)
   - **사업자명**: 개인 (또는 해당하는 선택)
4. "저장" 클릭

#### 1-3. JavaScript 키 확인

1. 생성된 애플리케이션 클릭
2. "앱 키" 탭에서 **JavaScript 키** 복사
   - 예: `1234567890abcdef1234567890abcdef`

#### 1-4. 플랫폼 설정

1. "플랫폼" 탭 클릭
2. "Web" 플랫폼 등록
3. 사이트 도메인 입력:
   - 개발 환경: `http://localhost:3000` (또는 사용하는 포트)
   - 배포 환경: 실제 도메인 (예: `https://yourdomain.com`)
4. "저장" 클릭

#### 1-5. 카카오맵 API 활성화

1. "카카오 로그인" 탭 클릭
2. "활성화 설정" ON으로 변경
3. "카카오맵" 탭 클릭
4. "활성화 설정" ON으로 변경
5. "저장" 클릭

### 2. 프로젝트에 API 키 설정

#### 방법 1: config.js 파일 수정 (권장)

1. `config.js` 파일 열기
2. `YOUR_KAKAO_MAP_API_KEY_HERE` 부분을 실제 JavaScript 키로 교체:

```javascript
const config = {
  KAKAO_MAP_API_KEY: "1234567890abcdef1234567890abcdef", // 여기에 실제 키 입력
};
```

#### 방법 2: 환경변수 사용 (고급)

1. `.env` 파일 생성 (프로젝트 루트에)
2. 다음 내용 추가:

```
KAKAO_MAP_API_KEY=1234567890abcdef1234567890abcdef
```

## 🔒 보안 주의사항

- **config.js 파일은 절대 GitHub에 올리지 마세요!**
- `.gitignore` 파일에 `config.js`가 포함되어 있는지 확인하세요
- API 키는 외부에 노출되지 않도록 주의하세요

## 🚀 실행 방법

1. API 키 설정 완료 후
2. 웹 서버 실행 (예: Live Server, http-server 등)
3. 브라우저에서 확인

## 📱 기능

- 반응형 디자인
- 갤러리 캐러셀
- 카카오맵 연동
- PWA 지원
- 터치 스와이프 지원

## 🛠️ 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- 카카오맵 API
- Font Awesome
- Google Fonts (Noto Sans KR)

## 📱 사용 기술

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome 아이콘
- Google Fonts

## 🚀 배포 방법

### GitHub Pages 배포

1. 이 저장소를 GitHub에 업로드합니다.
2. GitHub 저장소 설정에서 Pages를 활성화합니다:

   - Settings → Pages
   - Source를 "Deploy from a branch"로 설정
   - Branch를 "main"으로 설정
   - Save 클릭

3. 몇 분 후 `https://[username].github.io/[repository-name]`에서 접속 가능합니다.

### 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/[username]/[repository-name].git

# 디렉토리 이동
cd [repository-name]

# 로컬 서버 실행 (Python 3)
python -m http.server 8000

# 또는 Node.js 사용
npx serve .
```

## 📝 커스터마이징

### HTML 수정

`index.html` 파일에서 웹사이트 내용을 수정하세요.

### 스타일 수정

`styles.css` 파일에서 색상, 폰트, 레이아웃을 수정할 수 있습니다.

### JavaScript 기능 수정

`script.js` 파일에서 인터랙티브 기능을 추가할 수 있습니다.

## 🖼️ 이미지 추가

### 이미지 폴더

`images/` 폴더를 생성하고 이미지를 추가합니다.

### 아이콘

`icons/` 폴더에 PWA 아이콘 파일들을 추가합니다.

## 📱 PWA (Progressive Web App) 설정

모바일에서 앱처럼 사용할 수 있도록 PWA 설정이 포함되어 있습니다:

- `manifest.json` 파일
- 아이콘 설정
- 메타 태그

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.
