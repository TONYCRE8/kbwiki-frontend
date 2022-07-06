module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_STRAPI_API: process.env.REACT_APP_STRAPI_API
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}
