import React from 'react'
import Layout from '../components/layout/layout'
import Image from 'next/image'
import Link from "next/link"
import Kibi from '../public/kibi-404.svg'

function Custom404() {
    return (
        <Layout>
            <div className="flex flex-row-reverse justify-center items-center">
                <div className='w-1/2'>
                    <h1 className='text-9xl'>404</h1>
                    <hr></hr>
                    <p className='mt-4 text-2xl'>
                        Whoops! Looks like you've ended up somewhere you shouldn't have.
                    </p>
                    <Link href="/">
                        <button className="cursor-pointer mt-8 h-8 px-4 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--secondary-color)"}}>Let's get you back to safety, shall we?</button>
                    </Link>
                </div>
                <div className='w-1/2'>
                    <Image src={Kibi} alt="Kibi Lost?" />
                </div>
            </div>
        </Layout>
    )
}

export default Custom404