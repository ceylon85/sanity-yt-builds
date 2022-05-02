import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'
import PortableText from 'react-portable-text'
interface Props {
    post: Post;
}

function Post({ post }: Props) {
    //console.log(post); data 확인됨
    return (
        <main>
            <Header />
            <img className='object-cover w-full h-40' src={urlFor(post.mainImage).url()!} alt="image" />

            <article className='max-w-3xl p-5 mx-auto'>
                <h1 className='mt-10 mb-3 text-3xl'>{post.title}</h1>
                <h2 className='mb-2 text-xl font-light text-gray-500'>{post.description}</h2>
                <div className='flex items-center rounded-full'>
                    <img className='w-10 h-10 rounded-full' src={urlFor(post.author.image).url()!} alt="author" />
                    <p className='text-sm font-extralight'>
                        Blog post by {" "}
                        <span className='text-green-600'>{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>
                <div>
                    <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!} />
                </div>
            </article>
        </main>
    )
}

export default Post

export const getStaticPaths = async () => {
    const query = `
    *[_type == "post"]{
        _id,
        slug{
          current
        }
       }`;
    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `
    *[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
        name, 
        image
      }, 
      "comments": * [
          _type == 'comment' && 
          post._ref == ^._id &&
          approved == true],
        description,
        mainImage,
        slug,
        body
       }`
    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    })

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60, // 60초 후 이전 캐시 버전을 업데이트 
    }
}