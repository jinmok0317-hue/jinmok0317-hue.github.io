# jinmok0317-hue.github.io

Jinmok의 포트폴리오 사이트. React + Vite + TypeScript + Framer Motion.

## 개발

```bash
npm install
npm run dev
```

## 내용 수정하기

이름, 소개, 프로젝트, 기술 스택, 연락처는 전부 [`src/data/content.ts`](src/data/content.ts) 한 파일에서 관리합니다. 이 파일만 수정하면 사이트 전체 내용이 바뀝니다.

## 배포 (GitHub Pages)

이 저장소를 GitHub에 올린 뒤, 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions**로 설정하세요. `main` 브랜치에 push할 때마다 `.github/workflows/deploy.yml`이 자동으로 빌드하고 `https://jinmok0317-hue.github.io`에 배포합니다.

```bash
git remote add origin https://github.com/jinmok0317-hue/jinmok0317-hue.github.io.git
git push -u origin main
```
