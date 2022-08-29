# https://github.com/eincs/jekyll-rss-absolute-urls

module Jekyll
  module RSSURLFilter
    def relative_urls_to_absolute(input)
      site = @context.registers[:site]
      url = site.config['url']
      input.gsub('src="/', 'src="' + url + '/').gsub('href="/', 'href="' + url + '/')
    end
  end
end

Liquid::Template.register_filter(Jekyll::RSSURLFilter)