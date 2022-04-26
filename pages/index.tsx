import Head from 'next/head'
import Link from 'next/link';
import Header from '../components/Header';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typing';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  //console.log(posts)
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
      <div>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              <h1>I`m a Post</h1>
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