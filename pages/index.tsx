import Head from 'next/head'
import Link from 'next/link';
import Header from '../components/Header';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typing';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  //console.log(posts)// 서버 쪽 데이터
  return (
    <div className="mx-auto max-w-7xl" >
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className='flex items-center justify-between bg-yellow-500 border-b border-b-black md:py-4 lg:py-0'>
        <div className='space-y-4 p-9 '>
          <h1 className='max-w-xl font-serif text-7xl lg:text-8xl'>Stay curious.</h1>
          <h2 className='pb-8 text-2xl'>Discover stories, thinking, and <br />
            expertise from writes on any topic.</h2>
          <h2 className='w-48 px-12 py-2 text-white bg-black rounded-full'>Start reading</h2>
        </div>
        <img className='hidden h-32 pr-10 md:inline-flex lg:h-full' src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="M" />
      </div>
      {/* Posts */}
      <div className='grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-6'>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='overflow-hidden border rounded-lg cursor-pointer group'>
              <img className='object-cover w-full transition-transform duration-200 ease-in-out h-60 group-hover:scale-105' src={urlFor(post.mainImage).url()!} alt="image" />
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author.name}</p>
                </div>
                <img className='w-12 h-12 rounded-full' src={urlFor(post.author.image).url()!} alt="author" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

  )
}

// ServerSide rendering data
export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name, 
    image
  }, 
    description,
    mainImage,
    slug
}`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    }
  }
}