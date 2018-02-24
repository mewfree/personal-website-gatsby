module.exports = {
  siteMetadata: {
    title: 'Damien Gonot',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-preact',
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/pages/blog',
        name: 'markdown-pages',
      },
    },
    'gatsby-transformer-remark',
  ],
};
