# 아이콘 파일

이 폴더에는 PWA(Progressive Web App) 지원을 위한 아이콘 파일들이 포함됩니다.

## 필요한 아이콘 파일

다음 크기의 PNG 아이콘 파일들을 준비해주세요:

- `icon-16x16.png` (16x16px)
- `icon-32x32.png` (32x32px)
- `icon-72x72.png` (72x72px)
- `icon-96x96.png` (96x96px)
- `icon-128x128.png` (128x128px)
- `icon-144x144.png` (144x144px)
- `icon-152x152.png` (152x152px)
- `icon-192x192.png` (192x192px)
- `icon-384x384.png` (384x384px)
- `icon-512x512.png` (512x512px)

## 아이콘 제작 방법

1. **온라인 도구 사용**:

   - [Favicon Generator](https://realfavicongenerator.net/)
   - [PWA Builder](https://www.pwabuilder.com/imageGenerator)
   - [App Icon Generator](https://appicon.co/)

2. **디자인 소프트웨어 사용**:
   - Adobe Photoshop
   - Figma
   - Sketch
   - GIMP (무료)

## 아이콘 디자인 가이드라인

- **단순하고 명확한 디자인**: 작은 크기에서도 알아볼 수 있어야 함
- **브랜드 색상 사용**: 웹사이트의 메인 색상과 일치
- **투명 배경**: PNG 형식 사용
- **마스크 가능**: 다양한 배경에서 잘 보이도록 설계

## 임시 아이콘 생성

아이콘이 준비되지 않은 경우, 다음 명령어로 임시 아이콘을 생성할 수 있습니다:

```bash
# ImageMagick이 설치되어 있는 경우
convert -size 512x512 xc:#667eea -fill white -gravity center -pointsize 100 -annotate 0 "💒" icon-512x512.png
```

또는 온라인 아이콘 생성기를 사용하여 간단한 텍스트 기반 아이콘을 만들 수 있습니다.
