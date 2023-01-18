'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /*[DONE] remove class 'active' from all article links*/
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /*DONE get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('Was clicked:', articleSelector);
  
  /* DONE find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('It is click', targetArticle);

  /*DONE add class 'active' to the correct article */
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

    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;
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
    //if(tags[tag] > params.max){
    // params.max = tags[tag];
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
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);
      //tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags);
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
    
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  //tagList.innerHTML = allTags.join(' ');

  /*[NEW] create variable for links HTML code*/
  let allTagsHTML = '';
  console.log(allTags);

  /* [NEW] START LOOP: for each tag  in allTags: */
  for (let tag in allTags){

    /* [NEW] generated code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class = '+ calculateTagClass(allTags[tag], tagsParams)+' href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTagLinks);

  /* START LOOP: for each found tag link */
  for(let targetTagLink of targetTagLinks){

    /* add class active */
    targetTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  //tagClickHandler();
}

function addClickListenersToTags(){
/* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');  //('.post-tags a, .tags a')            //;
  console.log(tagLinks);

  /* START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
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
    const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    console.log(linkHTML);

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
  let allAuthorsHTML = '';
  console.log(allAuthors);

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors){

    /* [NEW] generated code of a link and add it to allTagsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '(' + allAuthors[author] + ')</a></li>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  /* [NEW] add html from allTagsHTML to tagList */
  authorsList.innerHTML = allAuthorsHTML;
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