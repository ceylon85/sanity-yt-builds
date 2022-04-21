import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className="bg-yellow-500" >
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <div className='px-10 space-y-5'>
          <h1 className='max-w-xl font-serif text-7xl'>Stay curious.</h1>
          <h2>Discover stories, thinking, and <br />
            expertise from writes on any topic</h2>
            <h2 className='px-5 py-3 text-white bg-black rounded-full w-36'>Start reading</h2>
          
        </div>
      </div>
    </div>

  )
}

export default Home