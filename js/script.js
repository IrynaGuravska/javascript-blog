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
  optTagsListSelector = '.tags.list';

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

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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
      const linkHTML = '<a href="#tag-' + tag + '">' + tag + '</a>';
      console.log(linkHTML);

      /* add generated code to html variable */

      //tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
      html = html + linkHTML;
      console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
      
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    //tagList.innerHTML = allTags.join(' ');
    console.log(allTags);

    /*[NEW] create variable for links HTML code*/
    let allTagsHTML = ' ';

    /* [NEW] START LOOP: for each tag  in allTags: */
    for (let tag in allTags){

      /* [NEW] generated code of a link and add it to allTagsHTML */
      allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    }
    /* [NEW] END LOOP: for each tag in allTags: */
    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
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

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  } 
  
}
addClickListenersToTags();


generateAuthors();
function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);
  
  for(let article of articles){
    
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    let html = '';

    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    console.log(linkHTML);

    //tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
    html = html + linkHTML;
    console.log(html);

    authorWrapper.innerHTML = html;
    console.log(authorWrapper);
  }
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
  const linksAuthors = document.querySelectorAll('.post-author a');
  console.log(linksAuthors);

  for(let linkAuthor of linksAuthors){
    console.log(linkAuthor);
    /* add tagClickHandler as event listener for that link */
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();