---
layout: post
title:  "Sending Gmail from OS X Yosemite Terminal"
tags: web email gmail osx osx-yosemite terminal bash shell scp mail
published: true
---

I've messed around with my own personal file host system for years, so that I could share stuff with others over the Internet. Initially, it was just a lazy (FTP to host) + (email link to friend) system. However, the uber way to handle something like this is to write a slick terminal script one-liner.

My OS of choice is OS X and I updated to Yosemite recently, so I decided to figure out how to do it and I'm thinking someone out there may find this information useful for any script that needs email capability.

<!--more-->

### The Basic Script

My script uses two basic OS X utilities: `scp` and `mail`. The former is for transferring files from a remote host, and the latter is for sending the email to notify the friend who needs the file. The initial, basic script lives in my `~/.localrc` file, where all my aliases and private functions that I don't want to include in my public dotfiles (due to usernames/passwords/local directory names/etc).

*Note: the variables below, like ${SSHUSER}, are set up previously in my `~/.localrc` file (ex. SSHUSER="username"), so you'll need to do the same, or simply fill in the appropriate values in your script.*

{% highlight bash %}
function shareit() {
  scp $1 ${SSHUSER}@{SSHHOST}:${REMOTEDIR}
}
{% endhighlight %}

So far, this is just a simple alias to a command. Basic stuff not worth blogging about. But just wait! Let's add the ability to copy a link to our uploaded file so we could drop it in an email or IM for our buddy.

{% highlight bash linenos %}
function shareit() {
  scp $1 ${SSHUSER}@{SSHHOST}:${REMOTEDIR}
  echo "${REMOTESERVER}/$1" | pbcopy
}
{% endhighlight %}

Another fairly basic command, but now you've got an uploaded file AND a link to drop somewhere. For a while, this seemed good enough for me, but then I got to thinking: now I need to open a web browser or a mail client to send an email, and it's always the same template, so why don't I automate it?

### Setting up Postfix

The `mail` command is a functioning email client and server, which uses a service called `postfix` to do its work, so it'll do the job nicely. However, you need to have an SMTP server set up (this may be done already if using OS X Server, but it definitely wasn't on my MacBook Pro), and that takes a bit of configuration.

Since I (and millions of others) use Gmail, I figured I could probably use their SMTP server to do the honors. Setting that up took a little bit more time than I thought, but it's functioning now. Here's the secret sauce:

* Add some lines to `/etc/postfix/main.cf`, just under where a bunch of `#relayhost` commented lines are (as always, make a backup, just in case)

{% highlight bash %}
myhostname = smtp.gmail.com
relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_use_tls = yes
smtp_sasl_mechanism_filter = plain # this was specifically necessary for yosemite
{% endhighlight %}

* Modify (create if missing) your `/etc/postfix/sasl_passwd` file by adding the following, single line: `[smtp.gmail.com]:587 user@gmail.com:password`. *Note: if you use two-factor authentication, this is the time to make a new [App Password](https://security.google.com/settings/security/apppasswords) and use it in place of your regular password.*

* Run the following commands, one at a time, to finish configuration.

{% highlight bash %}
sudo chmod 600 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd
sudo launchctl stop org.postfix.master
sudo launchctl start org.postfix.master
{% endhighlight %}

  The final two lines restart the postfix service to make sure all your new settings get loaded. I just made an entry in my .aliases file that runs them both, one after the other, and that made testing this a lot easier.

* Test out your new Gmail SMTP-enabled postfix service

  `echo "Hello World" | mail -s "Test from terminal" user@domain.com`

### Email-Empowering the Script

Now we can add our email notification to our upload script.

{% highlight bash linenos %}
function shareit() {
  scp $1 ${SSHUSER}@${SSHHOST}:${REMOTEDIR}
  echo "${REMOTESERVER}/$1" | pbcopy
  if [ "$#" -eq 2 ]
  then
    echo "Emailing link to $2..."
    echo "${REMOTESERVER}/$1" | mail -s "Link to file '$1'" $2
  fi
}
{% endhighlight %}

### Script Usage

Now, in order to send someone a file by uploading it to a host you have access to, just run the following command:

`shareit file.zip [user@domain.com]`

The file will upload, a link will be created, and a simple form email will be sent to the user notifying them. If you omit the email address, it will just upload the file and copy the link to the clipboard for later use.

One final note: currently the file to upload will just overwrite anything of the same name already on the server, as I didn't bother to write any existing-file checking code yet. Also, it won't yet tell you if the email was successfully sent, so that's based on trust and much testing of the mechanism before throwing it into the script.

Finally, you could just use Dropbox/Google Drive/Skydrive/iCloud/etc. for the same utility...but isn't it more fun to learn how to do it yourself? Hope this is useful to someone!
