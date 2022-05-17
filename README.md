# ***`Next.js + Tailwind CSS + Typescript`***
## `Medium Blog`
Next.js 에 typescript 를 적용한 프론트엔드 파트,   
블로그에 올리는 Post와 저자 및 Comment는 Sanity CMS 를 사용

## Vercel을 이용해 `배포`
Link to [View](https://sanity-builds.vercel.app/)

Sanity [Studio](https://sanitybuilds.sanity.studio/desk)
#### Sanity Studio 기능
- studio login(google, github quick login) 
- Post 작성 
- Authur 설정  
- Comment 수락 
  
# `Main Dir Structure`
- `components`   
    - Header: header 구성
- `pages`
    - `api`: My Backend Data
         - createComment.ts  
    - `post`: Blog(site)에서 볼 수 있는 Post 
         - [slug].tsx
    - index.tsx: Home 구성   
- `sanityytbuilds`:Sanity studio 
    - `schemas`
         - post.js: post 구성 스키마
         - comment.js: comment 구성 스키마
         - authur.js: auhtur 구성 스키마
         - schemas.js: 스키마 설정   

- typing.d.ts: type 정의 파일
- sanity.js: sanity login
---
