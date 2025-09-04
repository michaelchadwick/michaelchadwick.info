# MichaelChadwick.info

[Jekyll](https://jekyllrb.com) source for my personal site, which includes all the information about me, Michael Chadwick, you could ever possibly need or want.

## Local Development

* Ruby
* Composer

### Build Dependencies

`$ bundle install`
`$ composer install`

### PHP API

In order for `/assets/php/*` files to work, you must run a local server:

* `cd /path/to/mc/assets/php`
* `php -S 127.0.0.1:4001`

### Serve Local Development Version

`$ rake serve`

## Acknowledgements

* [melodiouscode](https://github.com/melodiouscode/melodiouscode-snippets/blob/main/creating-a-sitemap-xml-file-with-jekyll/sitemap.xml): the cool Liquid templating approach to creating a sitemap vs. using a plugin
* [reshot.com](https://www.reshot.com/free-svg-icons/play-button/): play button
* [MageCDN](https://magecdn.com/tools/svg-loaders/180-ring/): loading spinner

## Dependencies

* [fontawesome](https://fontawesome.com)
* [jQuery](https://jquery.com)
  * [accordion-blocks](https://github.com/philbuchanan/Accordion-Blocks): cool expand/collapse audio plugin blocks
  * [colorbox](https://www.jacklmoore.com/colorbox/): website screenshots on my resume
* [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search)
* [raphael.js](https://dmitrybaranovskiy.github.io/raphael/)
* [underscore.js](https://underscorejs.org)
* [vexflow](https://github.com/0xfe/vexflow): beautiful sheet music and tab
