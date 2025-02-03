import fs from 'fs';

const CONSTANTS = {
    content: {
        dir: './content',
        categoryMeta: '_category.md',
        sectionMeta: '_section.md',
    },
    theme: {
        dir: './theme'
    }
}

const ZENDESK_API = {
    token: btoa(process.env.ZENDESK_API_USER + ':' + process.env.ZENDESK_API_TOKEN),
    base: 'https://nabucasa.zendesk.com/api/v2/help_center',
    category: {
        id: '/categories/{id}/translations/en-us',
    },
    section: {
        update: '/en-us/sections/{id}',
    },
    article: {
        update: '/articles/{id}/translations/en-us',
    }
}

function setParam(string, param, value) {
    return string.replace(`{${param}}`, value);
}

function parseFile(raw) {
   // split up the front matter and the content, return both
    let frontMatter = {};
    let content = '';

    const lines = raw.split('\n');
    let inFrontMatter = false;
    let frontMatterEnd = false;

    lines.forEach(line => {
        if(line === '---' && !frontMatterEnd) {
            if(inFrontMatter) {
                frontMatterEnd = true;
            }
            inFrontMatter = !inFrontMatter;
        } else if(inFrontMatter) {
            // split : but only on the first one
            const split = line.split(':');
            const key = split.shift().trim();
            const value = split.join(':').trim();
            frontMatter[key] = value;
        } else {
            content += line + '\n';
        }
    });

    return {
        frontMatter,
        content
    };
}

function updateArticle(article, section, category) {
    if(!article || !section || !category) return;
    
    if(!article.frontMatter.article_id) {
        console.log('Article does not have an ID, skipping');
        return;
    }

    if(!section.frontMatter.section_id) {
        console.log('Section does not have an ID, skipping');
        return;
    }

    if(!category.frontMatter.category_id) {
        console.log('Category does not have an ID, skipping');
        return;
    }

    fetch(ZENDESK_API.base + setParam(ZENDESK_API.article.update, 'id', article.frontMatter.article_id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${ZENDESK_API.token}`
        },
        body: JSON.stringify({  
            body: article.content,
            title: article.frontMatter.name,
        })
    }).then(response => {
        if(response.ok) {
            console.log(`Successfully updated article ${article.frontMatter.name}`);
        } else {
            console.error(`Failed to update article ${article.frontMatter.name}`);
            console.error(response);
        }
    }).catch(error => {
        console.error(`Failed to update article ${article.frontMatter.name}`);
        console.error(error);
    });
}

function updateSection(section, category){
    if(!section || !category) return;

    if(!section.frontMatter.section_id) {
        console.log('Section does not have an ID, skipping');
        return;
    }

    if(!category.frontMatter.category_id) {
        console.log('Category does not have an ID, skipping');
        return;
    }

    fetch(ZENDESK_API.base + setParam(ZENDESK_API.section.update, 'id', section.frontMatter.section_id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${ZENDESK_API.token}`
        },
        body: JSON.stringify({
            section:{
                name: section.frontMatter.name,
            }
        })
    }).then(response => {
        if(response.ok) {
            console.log(`Successfully updated section ${section.frontMatter.name} [${response.status}]`);
        } else {
            console.error(`Failed to update section ${section.frontMatter.name}`);
            console.error(response);
        }
    });
}

function updateCategory(category){
    if(!category) return;

    if(!category.frontMatter.category_id) {
        console.log('Category does not have an ID, skipping');
        return;
    }

    fetch(ZENDESK_API.base + setParam(ZENDESK_API.category.id, 'id', category.frontMatter.category_id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${ZENDESK_API.token}`
        },
        body: JSON.stringify({
            translation:{
                title: category.frontMatter.name,
            }
        })
    }).then(response => {
        if(response.ok) {
            console.log(`Successfully updated category ${category.frontMatter.name}`);
        } else {
            console.error(`Failed to update category ${category.frontMatter.name}`);
            console.error(response);
        }
    });
}

let hierarchy = [];

fs.readdirSync(CONSTANTS.content.dir).forEach(category => {
    if(category === 'deploy.js') return; // Skip this file

    let categoryMeta = fs.readFileSync(`${CONSTANTS.content.dir}/${category}/${CONSTANTS.content.categoryMeta}`, 'utf-8');
    if(!categoryMeta) return;

    categoryMeta = parseFile(categoryMeta);
    hierarchy.push(`[C] ${categoryMeta.frontMatter.name} (${categoryMeta.frontMatter.category_id})`);

    updateCategory(categoryMeta);

    // Find sections
    fs.readdirSync(`${CONSTANTS.content.dir}/${category}`).forEach(section => {
        const isDirectory = fs.lstatSync(`${CONSTANTS.content.dir}/${category}/${section}`).isDirectory();
        
        if(section === CONSTANTS.content.sectionMeta || !isDirectory) return;

        let sectionMeta = fs.readFileSync(`${CONSTANTS.content.dir}/${category}/${section}/${CONSTANTS.content.sectionMeta}`, 'utf-8');
        if(!sectionMeta) return;

        sectionMeta = parseFile(sectionMeta);

        hierarchy.push(`[S] -- ${sectionMeta.frontMatter.name} (${sectionMeta.frontMatter.section_id})`);

        updateSection(sectionMeta, categoryMeta);

        // Find articles
        fs.readdirSync(`${CONSTANTS.content.dir}/${category}/${section}`).forEach(articleF => {
            const isDirectory = fs.lstatSync(`${CONSTANTS.content.dir}/${category}/${section}/${articleF}`).isDirectory();

            if(isDirectory) return; // We can't have any further directories, so bail
            if(articleF === CONSTANTS.content.sectionMeta) return; // Skip the section meta file

            let article = fs.readFileSync(`${CONSTANTS.content.dir}/${category}/${section}/${articleF}`, 'utf-8');
            if(!article) return;

            let articleMeta = parseFile(article);

            hierarchy.push(`[A] ---- ${articleMeta.frontMatter.name} (${articleMeta.frontMatter.article_id})`);

            updateArticle(articleMeta, sectionMeta, categoryMeta);
        });
    });
});

console.log('Hierarchy:');
hierarchy.forEach(h => console.log(h));
console.log('\n');
console.log('REST Status:');
