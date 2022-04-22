import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const Home: NextPage = () => {
  return (
    <div className="bg-yellow-500 " >
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className='flex items-center justify-between border-b border-b-black md:py-4 lg:py-0'>
        <div className='p-10 space-y-5 '>
          <h1 className='max-w-xl font-serif text-7xl lg:text-8xl'>Stay curious.</h1>
          <h2 className='pb-8 text-2xl'>Discover stories, thinking, and <br />
            expertise from writes on any topic.</h2>
          <h2 className='w-48 px-12 py-2 text-white bg-black rounded-full'>Start reading</h2>
        </div>
        <img className='hidden h-32 pr-10 md:inline-flex lg:h-full' src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="M" />
      </div>
    </div>

  )
}

export default Home