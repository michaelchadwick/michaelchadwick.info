task :deploy do |t|
  # push to master branch
  sh "git push origin master"
  # build site
  sh "bundle exec jekyll build --incremental JEKYLL_ENV=production"
  # sync site to remote host
  sh "rsync -auP --exclude-from='rsync-exclude.txt' ./_site/* $MCINFO_REMOTE"
  # backup drafts
  sh "rsync -auP ./_drafts/* $MCINFO_DRAFTS"
end

task :build do |t|
  sh "bundle exec jekyll build --incremental"
end

task :serve do |t|
  sh "bundle exec jekyll serve -w -o --unpublished"
end

task :serve_inc do |t|
  sh "bundle exec jekyll serve -w -o --unpublished --incremental"
end

task :sync do |t|
  sh "rsync -auP --exclude-from='rsync-exclude.txt' ./_site/* $MCINFO_REMOTE"
end

task :default => [:deploy]
