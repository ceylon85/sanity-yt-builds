import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}
interface Props {
    post: Post;
}

function Post({ post }: Props) {
    console.log(post); //post data 확인됨

    const [submitted, setSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        //console.log(data); comment data 확인됨
        await fetch("/api/createComment", { // 내 api로 코멘트 데이터 가져오기 
            method: "POST",
            body: JSON.stringify(data),
        }).then(() => {
            console.log(data);
            setSubmitted(true);
        }).catch((error) => {
            console.log(error)
            setSubmitted(false)
        })
    }

    return (
        <main>
            <Header />
            <img className='object-cover w-full h-40' src={urlFor(post.mainImage).url()!} alt="image" />

            <article className='max-w-3xl p-5 mx-auto'>
                <h1 className='mt-10 mb-3 text-3xl'>{post.title}</h1>
                <h2 className='mb-2 text-xl font-light text-gray-500'>{post.description}</h2>
                <div className='flex items-center space-x-2'>
                    <img className='w-10 h-10 rounded-full'
                        src={urlFor(post.author.image).url()!} alt="author" />
                    <p className='text-sm font-extralight'>
                        Blog post by {" "}
                        <span className='text-green-600'>{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>
                <div className='mt-10'>
                    <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        serializers={
                            {
                                h1: (props: any) => (
                                    <h1 className='my-5 text-2xl font-bold'{...props} />
                                ),
                                h2: (props: any) => (
                                    <h1 className='my-5 text-xl font-bold'{...props} />
                                ),
                                li: ({ children }: any) => (
                                    <li className='ml-4 list-disc'>{children}</li>
                                ),
                                link: ({ href, children }: any) => (
                                    <a href={href} className="text-blue-500 hover:underline">
                                        {children}
                                    </a>
                                ),
                            }
                        }
                    />
                </div>
            </article>

            <hr className='max-w-lg mx-auto my-5 border border-yellow-500' />
            {submitted ? (
                <div className='flex flex-col max-w-2xl p-10 mx-auto my-10 text-white bg-yellow-500'>
                    <h3 className='text-3xl font-bold'>의견을 보내주셔서 감사합니다!! @.@</h3>
                    <p>
                        승인되면 아래에 표시됩니다!
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-2xl p-5 mx-auto mb-10'>
                    <h3 className='text-sm text-yellow-500'>Enjoyed the this Article?</h3>
                    <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
                    <hr className='py-3 mt-2' />

                    <input
                        {...register("_id")}
                        type="hidden"
                        name='_id'
                        value={post._id} />

                    <label className='block mb-5'>
                        <span className='text-gray-700'>Name</span>
                        <input {...register('name', { required: true })}
                            className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none ring-yellow-500 focus:ring' placeholder='John Doe' type="text" />
                    </label>

                    <label className='block mb-5'>
                        <span className='text-gray-700'>Email</span>
                        <input {...register('email', { required: true })}
                            className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none ring-yellow-500 focus:ring' placeholder='abc@email.com' type="email" />
                    </label>

                    <label className='block mb-5'>
                        <span className='text-gray-700'>Comment</span>
                        <textarea {...register('comment', { required: true })}
                            className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none ring-yellow-500 form-textarea focus:ring' placeholder='내용을 써주세욥' rows={8} />
                    </label>

                    <div className='flex flex-col p-5'>
                        {errors.name && (
                            <span className='text-red-600'>- The Name Field is required</span>
                        )}
                        {errors.email && (
                            <span className='text-red-600'>- The email Field is required</span>
                        )}
                        {errors.comment && (
                            <span className='text-red-600'>- The comment Field is required</span>
                        )}
                    </div>

                    <input className='px-4 py-2 font-bold text-white bg-yellow-500 rounded shadow cursor-pointer hover:bg-yellow-400 focus:outline-none' type="submit" />
                </form>
            )}
            {/* Comments */}
            <div className='flex flex-col max-w-2xl p-10 mx-auto my-10 space-y-2 shadow shadow-yellow-500'>
                <h3 className='text-4xl'>Comments</h3>
                <hr className='pb-2'/>
                {post.comments.map((comment) => (
                    <div key={comment._id}>
                        <p>
                            <span className='text-yellow-500'>
                            {comment.name}:
                            </span>
                           {comment.comment}
                        </p>
                    </div>
                ))}
            </div>
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