'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links*/
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /*get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('Was clicked:', articleSelector);
  
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('It is click', targetArticle);

  /*add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.list.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = {'min':999999, 'max':0};
  for(let tag in tags){
    
    params.max = tags[tag] > params.max ? tags[tag] : params.max;
    params.min = tags[tag] < params.min ? tags[tag] : params.min;
    
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass (count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  const result= `${optCloudClassPrefix}${classNumber}`;
  return result;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  const allTags = {};
  
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link */
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags);
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
    
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /*[NEW] create variable for links HTML code*/
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag  in allTags: */
  for (let tag in allTags){

    /* [NEW] generated code of a link and add it to allTagsHTML*/
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('tag is clicked');
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks){

    /* remove class active */
    activeTagLink.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTagLinks);

  /* START LOOP: for each found tag link */
  for(let targetTagLink of targetTagLinks){

    /* add class active */
    targetTagLink.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
/* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  } 
}

addClickListenersToTags();


function generateAuthors(){
  
  /* [NEW] create a new variable allAutors with an empty object */
  const allAuthors = {}; 

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){
    
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTMLData = {author: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(author)) {

      /* [NEW] add author to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    console.log(allAuthors);

    /* insert HTML into the author wrapper */
    authorWrapper.innerHTML = html;
    console.log(authorWrapper);
  }

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all authors links HTML code */
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors){

    /* [NEW] generated code of a link and add it to allTagsHTML */
    allAuthorsData.authors.push({
      author: author,
      allAuthors: allAuthors[author],
      count: allAuthors[author],
    });
  }

  authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event){
  
  event.preventDefault();

  const clickedElement = this;
  console.log('author is clicked');
  console.log(event);

  const href = clickedElement.getAttribute('href');
  console.log(href);

  const author = href.replace('#author-', '');
  console.log(author);

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);

  for (let activeAuthorLink of activeAuthorLinks){

    activeAuthorLink.classList.remove('active');
  }

  const targetAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetAuthorLinks);

  for(let targetAuthorLink of targetAuthorLinks){
    targetAuthorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const linksAuthors = document.querySelectorAll('.post-author a, .list.authors a');
  console.log('linksAuthors:', linksAuthors);

  for(let linkAuthor of linksAuthors){
    console.log(linkAuthor);
    /* add tagClickHandler as event listener for that link */
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();