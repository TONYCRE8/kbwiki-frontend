import React from 'react'
import Layout from '../components/layout/layout'
import Image from 'next/image'
import Link from "next/link"
import Kibi from '../public/kibi-404.svg'

function Custom500() {
    return (
        <Layout>
            <div className="flex md:flex-row-reverse flex-col-reverse justify-center items-center">
                <div className='md:w-1/2'>
                    <h1 className='md:text-9xl text-6xl'>500</h1>
                    <hr></hr>
                    <p className='mt-4 md:text-2xl text-lg'>
                        Whoops! Something went wrong! This page not exist or be broken, please report it to us on Discord!
                    </p>
                    <Link href="/">
                        <button className="cursor-pointer mt-8 md:h-8 h-16 px-4 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--secondary-color)"}}>Let&apos;s get you back to safety, shall we?</button>
                    </Link>
                </div>
                <div className='md:w-1/2'>
                    <Image src={Kibi} alt="Kibi Lost?" />
                </div>
            </div>
        </Layout>
    )
}

export default Custom500
