task :deploy do |t|
  # push to master branch
  sh "git push origin master"
  # build site
  sh "JEKYLL_ENV=production bundle exec jekyll build"
  # sync site to remote host
  sh "rsync -auP --no-p --exclude-from='rsync-exclude.txt' ./_site/* $MCINFO_REMOTE"
  # backup drafts
  sh "rsync -auP --no-p ./_drafts/* $MCINFO_DRAFTS"
end

task :deploy_unpub do |t|
  # push to master branch
  sh "git push origin master"
  # build site (with unpublished posts)
  sh "JEKYLL_ENV=production bundle exec jekyll build --unpublished"
  # sync site to remote host
  sh "rsync -auP --no-p --exclude-from='rsync-exclude.txt' ./_site/* $MCINFO_REMOTE"
  # backup drafts
  sh "rsync -auP --no-p ./_drafts/* $MCINFO_DRAFTS"
end

task :build do |t|
  sh "JEKYLL_ENV=production bundle exec jekyll build"
end

task :serve do |t|
  sh "bundle exec jekyll serve --livereload --watch --open-url http://localhost:4000"
end

task :serve_prod do |t|
  sh "JEKYLL_ENV=production bundle exec jekyll serve --livereload --watch --open-url http://localhost:4000"
end

task :serve_unpub do |t|
  sh "SHOW_UNPUB=true bundle exec jekyll serve --unpublished --livereload --watch --open-url http://localhost:4000"
end

task :serve_unpub_prod do |t|
  sh "JEKYLL_SHOW_UNPUB=true JEKYLL_ENV=production bundle exec jekyll serve --unpublished --livereload --watch --open-url http://localhost:4000"
end

task :sync do |t|
  sh "rsync -auP --no-p --exclude-from='rsync-exclude.txt' ./_site/* $MCINFO_REMOTE"
end

task :default => [:deploy]
