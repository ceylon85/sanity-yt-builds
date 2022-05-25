# ***`Next.js + Tailwind CSS + Typescript`***
## `Medium Blog`
Next.js 에 typescript 를 적용한 프론트엔드 파트,   
블로그에 올리는 Post와 저자 및 Comment는 Sanity CMS 를 사용

## Vercel을 이용해 `배포`
Link to [View](https://sanity-builds.vercel.app/)

Sanity [Studio](https://sanitybuilds.sanity.studio/desk)
#### Sanity Studio 기능
- studio login(google, github quick login) 
- Post 작성 및 관리
- Authur 설정  
- Comment 수락 및 관리
# `Main Dir Structure`
```bash 
├── components
│   └── Header.tsx: header 구성
│
├── pages
│   └── api: My Backend Data
│   │   └── createComment.ts 
│   │
│   └── post: Blog(site)에서 볼 수 있는 Post 
│   │   └── [slug].tsx
│   │
│   └── index.tsx: Home 구성 
│
├── sanityytbuilds:Sanity studio 
│   └── schemas
│       ├── post.js: post 구성 스키마
│       ├── comment.js: comment 구성 스키마
│       ├── authur.js: auhtur 구성 스키마
│       └── schemas.js: 스키마 설정
│
├── typing.d.ts: type 정의
└── sanity.js: sanity login
``` 
---
## `Main Feature`
- studio에서 post 작성하면 바로 배포한 사이트에 post 등록됨 
- 포스트 작성화면
![ezgif com-gif-maker](https://user-images.githubusercontent.com/45006553/169481049-94eba08f-e63b-4201-80c8-bf414f2b4665.gif)


- 등록된 post
![posting](https://user-images.githubusercontent.com/45006553/170223607-e926bbb3-fde7-4457-87f3-7a6c8d8d90ab.gif)

- comment 
---
### localhost 와 sanity studio 실시간 연동
- localhost 로 연결한 sanity studio와 배포한 sanity studio 서로 간의 연동     
![local_studio](https://user-images.githubusercontent.com/45006553/168986775-98e4d47a-6026-4cb3-9cbe-30868cca77d6.gif)

