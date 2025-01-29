import fs from 'fs';

const CONSTANTS = {
    assets: {
        dir: './assets',
    },
    content: {
        dir: './content',
        categoryMeta: '_category.md',
        sectionMeta: '_section.md',
    },
    theme: {
        dir: './theme'
    }
}


function parseFrontMatter(content) {
    const contentLines = content.split('\n');
    const frontMatter = {};
    let isFrontMatter = false;

    contentLines.forEach(line => {
        if (line === '---') {
            isFrontMatter = !isFrontMatter;
        } else if (isFrontMatter) {
            const [key, value] = line.split(':');
            frontMatter[key.trim()] = value.trim();
        }
    });

    return frontMatter;
}

console.log(`Zendesk user: ${process.env.ZENDESK_API_USER}`);


fs.readdirSync(CONSTANTS.content.dir).forEach(category => {
    let categoryMeta = fs.readFileSync(`${CONSTANTS.content.dir}/${category}/${CONSTANTS.content.categoryMeta}`, 'utf-8');
    if(!categoryMeta) return;

    categoryMeta = parseFrontMatter(categoryMeta);
    console.log(`[C] ${categoryMeta.name} (${categoryMeta.category_id})`);

    // Find sections
    fs.readdirSync(`${CONSTANTS.content.dir}/${category}`).forEach(section => {
        const isDirectory = fs.lstatSync(`${CONSTANTS.content.dir}/${category}/${section}`).isDirectory();
        
        if(section === CONSTANTS.content.sectionMeta || !isDirectory) return;

        let sectionMeta = fs.readFileSync(`${CONSTANTS.content.dir}/${category}/${section}/${CONSTANTS.content.sectionMeta}`, 'utf-8');
        if(!sectionMeta) return;

        sectionMeta = parseFrontMatter(sectionMeta);

        console.log(`[S] -- ${sectionMeta.name} (${sectionMeta.section_id})`);

        // Find articles
        fs.readdirSync(`${CONSTANTS.content.dir}/${category}/${section}`).forEach(articleF => {
            const isDirectory = fs.lstatSync(`${CONSTANTS.content.dir}/${category}/${section}/${articleF}`).isDirectory();

            if(isDirectory) return; // We can't have any further directories, so bail
            if(articleF === CONSTANTS.content.sectionMeta) return; // Skip the section meta file

            let article = fs.readFileSync(`${CONSTANTS.content.dir}/${category}/${section}/${articleF}`, 'utf-8');
            if(!article) return;

            let articleMeta = parseFrontMatter(article);

            console.log(`[A] ---- ${articleMeta.name} (${articleMeta.article_id})`);
        });
    });

});
