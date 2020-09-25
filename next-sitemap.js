module.exports = {
    siteUrl: 'https://yama3ki.work',
    generateRobotsTxt: true,
    transform: (config, url) => {
        return {
            loc: url,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },
}