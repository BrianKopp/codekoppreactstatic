import React  from 'react'
import path from 'path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

async function makePosts() {
  const remarkParser = remark().use(html);
  const dirPath = path.resolve(__dirname, './content/posts');

  const contentArray = fs.readdirSync(dirPath).map(f => {
    const { data, content } = matter(fs.readFileSync(path.resolve(dirPath, f), 'utf8'));
    let unprocessedContents = remarkParser.processSync(content).contents;
    const contents = unprocessedContents
    .replace(/<ul>/g, '<ul class="browser-default">')
    .replace(/<h1>/g, '<h1 class="post-header">')
    .replace(/<h2>/g, '<h2 class="post-header">')
    .replace(/<h3>/g, '<h3 class="post-header">')
    .replace(/<h4>/g, '<h4 class="post-header">')
    .replace(/<h5>/g, '<h5 class="post-header">')
    .replace(/<h6>/g, '<h6 class="post-header">')
    .replace(/<p>/g, '<p class="post-paragraph">')
    .replace(/<img/g, '<img class="post-img"');
  
    // extract data categories and tags
    if (data.categories !== undefined) {
      data.categories = data.categories.split(';');
    } else {
      data.categories = [];
    }
    if (data.tags !== undefined) {
      data.tags = data.tags.split(';');
    } else {
      data.tags = [];
    }
    return { data, contents };
  });
  return contentArray.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);
    return dateB - dateA;
  });
};


export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html>
      <Head>
		    <meta name="description" content="" />
		    <meta name="keywords" content="" />
		    <meta charSet="UTF-8"/>
		    <meta name="author" content="Md. Junaid Khan Pathan"/>
		    <meta name="viewport" content="width=device-width, initial-scale=1"/>
		    <link type="text/css" rel="stylesheet" media="all" href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i"/>
		    <link type="text/css" rel="stylesheet" media="all" href="https://fonts.googleapis.com/css?family=Dosis:400,500,600,700,800"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/tomorrow-night-bright.min.css" />
      </Head>
      <Body>
        {children}
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDABQbhiRnXtXgvW39m9hLg8RLXGATfKls"></script>
        <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
        <script src="/js/highlight.pack.js"></script>
      </Body>
    </Html>
  ),
  getRoutes: async () => {
    var posts = await makePosts();
    console.log('Acquired posts:');
    console.log(posts);
    var portfolio = [
      {
        id: 0,
        title: 'ZOMG',
        tags: ['t1, t2']
      },
      {
        id: 1,
        title: 'Portfolio title',
        tags: ['only-tag']
      }
    ]
    let categories = [];
    for(let i = 0; i < posts.length; i++) {
      for(let j = 0; j < posts[i].data.categories.length; j++) {
        let found = false;
        for (let k = 0; k < categories.length; k++) {
          if (categories[k] == posts[i].data.categories[j]) {
            found = true;
            break;
          }
        }
        if (!found) {
          categories.push(posts[i].data.categories[j]);
        }
      }
    }
    console.log(categories);
    console.log('post categories');
    posts.map(p => console.log(p.data.categories));
    console.log('categories');
    categories.map(p => console.log(p));
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({
          posts: posts.slice(0, 6),
          portfolioItems: portfolio
        })
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts: posts
        }),
        children: [
          ...posts.map(post => ({
            path: `/post/${post.data.slug}`,
            component: 'src/containers/Post',
            getData: () => ({
              post,
              recentPosts: posts,
              categories: categories
            }),
          })),
          ...categories.map(cat => ({
            path: `/category/${cat}`,
            component: 'src/containers/Blog',
            getData: () => ({
              posts: posts.filter(p => p.data.categories.indexOf(cat) > -1),
              blogTitle: cat
            }),
          }))
        ],
      },
      {
        is404: true,
        component: 'src/containers/404'
      },
      ...makeCategoryRoutes(posts, categories)
    ]
  },
}

function makeCategoryRoutes(posts, categories) {
  return categories.map(cat => {
    return {
      path: `/blog-categories/${cat}`,
      compontent: 'src/containers/Blog',
      getData: () => ({
        posts: posts.filter(p => p.data.categories.indexOf(cat) > -1)
      })
    }});
}