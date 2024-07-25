import { defineConfig } from 'vitepress'
import { generateOGImage } from './og'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitepress playground",
  description: "A VitePress Site",

  transformPageData: async (pageData) => {
      const image = `/og/${pageData.relativePath.replace(/\.md$/, '.png')}`
      pageData.frontmatter.head ??= []
      pageData.frontmatter.head.push([
        'meta',
        {
          property: 'og:image',
          content: image
        }
      ])
  },

  buildEnd: async (config) => {
    await generateOGImage(config)
    config.logger.info('\x1B[32m✓\x1B[0m generating OG images...')
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  srcExclude: ['**/README.md', '**/TODO.md']
})
