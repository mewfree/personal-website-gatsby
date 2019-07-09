module.exports = {
  siteMetadata: {
    title: 'Damien Gonot',
    siteUrl: 'https://www.damiengonot.com',
    projects: [
      {
        title: 'sheetimport',
        description: 'a Python script to import local CSV files into Google Spreadsheet',
        link: 'https://github.com/mewfree/sheetimport',
      },
      {
        title: 'youtube-dl-subscriptions',
        description: 'a Python script to download YouTube videos from your subscription box',
        link: 'https://github.com/mewfree/youtube-dl-subscriptions',
      },
      {
        title: 'gitart',
        description: 'a Racket script inspired by gitfiti to generate GitHub "contributions art"',
        link: 'https://github.com/mewfree/gitart',
      },
      {
        title: 'mileend-roulette',
        description: 'a (random) way to suggest where to get eats & drinks in Mile End, Montréal',
        link: 'https://github.com/mewfree/mileend-roulette',
      },
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    // 'gatsby-plugin-preact',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/favicon.png',
        injectHTML: true,
        icons: {
          android: false,
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '›',
            },
          }
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Damien Gonot - Personal Website',
        short_name: 'Damien Gonot',
        start_url: '/',
        display: 'minimal-ui',
        background_color: '#fff',
        theme_color: '#6a5acd',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      }
    },
    'gatsby-plugin-offline',
  ],
};
