require('dotenv').config()


module.exports = {
	siteMetadata: {
		title: 'Portfolio of Nikolaj Schlüter Nielsen',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		'gatsby-transformer-remark',
		'gatsby-plugin-transition-link',
		{
			resolve: 'gatsby-plugin-styled-components',
			options: {
				// Add any options here
			},
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: '/src/graphics'
				}
			}
		},
		{
			resolve: 'gatsby-source-datocms',
			options: {
				apiToken: process.env.DATO_API_TOKEN,
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Portfolio–Nikolaj Schlüter',
				short_name: 'Schlüters portfolio',
				start_url: '/',
				background_color: '#ffffff',
				theme_color: '#ffffff',
				display: 'minimal-ui',
				icon: 'src/favicons/favicon-32x32.png', // This path is relative to the root of the site.
				icons: [
					{
						src: 'src/favicons/favicon-16x16.png',
						sizes: '16x16',
						type: 'image/png',
					},
					{
						src: 'src/favicons/favicon-32x32.png',
						sizes: '32x32',
						type: 'image/png',
					},
					{
						src: 'src/favicons/apple-touch-icon.png',
						sizes: '180x180',
						type: 'image/png',
					},
					{
						src: 'src/favicons/safari-pinned-tab.svg',
						type: 'image/svg+xml',
						purpose: 'maskable',
					},
				],
				msTileColor: '#da532c',
			},
		},
		'gatsby-plugin-offline',

	],
}
