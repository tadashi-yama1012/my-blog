import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js';

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData: { id: string; title: string, date: string, tags: string[] }[] = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        return {
            id,
            tags: matterResult.data.tag.split(','),
            ...matterResult.data
        } as { id: string; title: string, date: string, tags: string[] }
    })
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export function getAllPostDates() {
    const all = getSortedPostsData();
    let dates = new Set<string>();
    all.forEach((elm) => {
        const dt = new Date(elm.date);
        dates.add(dt.getFullYear() + '-' + (dt.getMonth() + 1));
    });
    return Array.from(dates);
}

export function getAllPostTags() {
    const all = getSortedPostsData();
    let tags = new Set<string>();
    all.forEach((elm) => {
        elm.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const processedContent = await remark()
        .use(html)
        .use(highlight)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()
    return {
        id,
        contentHtml,
        tags: matterResult.data.tag.split(','),
        ...matterResult.data
    }
}

export function getPostDataByDate(date: string) {
    const all = getSortedPostsData();
    return all.filter(elm => {
        const dt = new Date(elm.date);
        return (dt.getFullYear() + '-' + (dt.getMonth() + 1)) === date;
    });
}

export function getPostDataByTag(tag: string) {
    const all = getSortedPostsData();
    return all.filter(elm => elm.tags.find(t => t === tag));
}