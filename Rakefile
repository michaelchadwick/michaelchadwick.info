task :deploy do |t|
  # push to master branch
  sh "git push origin master"
  # build site
  sh "JEKYLL_ENV=production bundle exec jekyll build"
  # sync site to remote host
  sh "rsync -auP --exclude-from='rsync-exclude.txt' ./_site/* $MCINFO_REMOTE"
  # backup drafts
  sh "rsync -auP ./_drafts/* $MCINFO_DRAFTS"
end

task :build do |t|
  sh "JEKYLL_ENV=production bundle exec jekyll build"
end

task :serve do |t|
  sh "bundle exec jekyll serve --watch --open-url http://localhost:4000"
end

task :serve_prod do |t|
  sh "JEKYLL_ENV=production bundle exec jekyll serve --watch --open-url http://localhost:4000"
end

task :serve_unpub do |t|
  sh "bundle exec jekyll serve --watch --unpublished --open-url http://localhost:4000"
end

task :serve_unpub_prod do |t|
  sh "JEKYLL_ENV=production bundle exec jekyll serve --watch --unpublished --open-url http://localhost:4000"
end

task :sync do |t|
  sh "rsync -auP --exclude-from='rsync-exclude.txt' ./_site/* $MCINFO_REMOTE"
end

task :default => [:deploy]
