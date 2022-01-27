import React from 'react'
import Head from 'next/head'
import {NextSeo} from 'next-seo'

const SEO = ({title, description, keywords, image, article_data}) => {
    /* 
    ----------------------------
    
    title = page title
    description = page description
    keywords = array of keywords
    image = seo image (pic when you embed link)
    article_data = {
        type = keycaps/switches
        datePublished = when the article was made (from strapi)
        dateModified = when the article was last edited (from strapi)
    }
    
    ----------------------------
    */
    if (keywords) {
        keywords.join(',')
    }
    if (!image) { /* Set the default image if there is none currently */
        image = {
            src: 'https://res.cloudinary.com/tonycre8/image/upload/v1629292666/kbwiki-twitter_flrej3.png',
            alt: 'kb wiki logo',
            mime: 'image/png',
            width: 800,
            height: 414
        }
    }
    return (
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <title>{title} | kb.wiki</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={`${title} | kb.wiki`} key="facebook title" />
            <meta property="og:description" content={description} />
            <meta property="og:url" content="" />
            <meta property="og:image" content={image} />
            <meta property="twitter:title" content={`${title} | kb.wiki`} key="twitter title" />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={image} />
            {article_data ? (
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: `
                
                {
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": "https://kb.wiki/${article_data.type}"
                    },
                    "headline": "${title}",
                    "image": [
                        "https://kb.wiki/${image}"
                    ],
                    "datePublished": "${article_data.datePublished}",
                    "dateModified": "${article_data.dateModified}",
                    "author": {
                        "@type": "Organization",
                        "name": "kb wiki",
                        "url": "https://kb.wiki/"
                    },
                    "publisher": {
                        "@type": "kb.wiki",
                        "name": "kb wiki",
                        "logo": {
                            "@type": "ImageObject",
                            "url": 'https://kb.wiki/public/logo-beta.svg'
                        }
                    }
                }

                `}}>
                </script>
            ) : null}
        </Head>
    )
}
 
export default SEO
