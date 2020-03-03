module.exports = {
  assetsDir: 'assets',
  outputDir: 'docs',
  css: {
    requireModuleExtension: true
	},
	publicPath: process.env.NODE_ENV === 'production' ? '/address-book/' : '/'
}
