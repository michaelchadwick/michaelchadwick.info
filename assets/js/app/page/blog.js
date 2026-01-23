/* blog */
/* blog list */
/* eslint-disable no-undef */

const blogModeToggle = document.querySelector('#blog-mode-toggle')
const blogModeToggleStatus = document.querySelector('#blog-mode-toggle + span')
const savedBlogMode = localStorage.getItem('mcinfo-blog-mode')
let postsClasses = document.querySelector('.posts').classList

if (blogModeToggle) {
  if (savedBlogMode == 'lite') {
    postsClasses.add('lite')
    blogModeToggle.checked = false
    blogModeToggleStatus.innerText = 'LITE'
  } else {
    postsClasses.add('full')
    blogModeToggleStatus.innerText = 'FULL'
  }

  blogModeToggle.addEventListener('click', () => {
    if (blogModeToggleStatus.innerText == 'FULL') {
      blogModeToggleStatus.innerText = 'LITE'
      localStorage.setItem('mcinfo-blog-mode', 'lite')
    } else {
      blogModeToggleStatus.innerText = 'FULL'
      localStorage.setItem('mcinfo-blog-mode', 'full')
    }

    postsClasses.toggle('lite')
    postsClasses.toggle('full')
  })
}