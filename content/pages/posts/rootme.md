---
title: TryHackMe - RootMe CTF
date: '2021-11-05'
thumb_img_alt: TryHackMe - RootMe
content_img_alt: TryHackMe - RootMe
excerpt: An "Easy" CTF for beginners
seo:
  title: Pickle Rick Walkthrough - Easy
  description: Easy To Follow Walkthrough of TryHackMe's Pickle Rick CTF
  extra:
    - name: 'og:type'
      value: article
      keyName: property
    - name: 'og:title'
      value: Pickle Rick CTF Walkthrough - Easy
      keyName: property
    - name: 'og:description'
      value: Easy To Follow Walkthrough of TryHackMe's Pickle Rick CTF
      keyName: property
    - name: 'og:image'
      value: /images/o9pyhyU.jpg
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Pickle Rick CTF Walkthrough - Easy
    - name: 'twitter:description'
      value: Easy To Follow Walkthrough of TryHackMe's Pickle Rick CTF
    - name: 'twitter:image'
      value: /images/o9pyhyU.jpg
      relativeUrl: true
layout: post
thumb_img_path: /images/icon.png
content_img_path: /images/banner-da9a986d.PNG
---
TryHackMe - RootMe CTF: [https://tryhackme.com/room/rootme](http://tryhackme.com/room/rootme)

This box is listed as Easy and will be a good way to practice some of our skills like enumeration, reverse-shells, and privilege escalation.  For this walkthrough, I will be using:

`NMAP GOBUSTER NETCAT`

# Task 1: Deploy the Machine

Easy enough.  Get the machine started, and let's move to task 2.

# Task 2: Reconnaissance

Let's let NMAP run and see what preliminary information we can get first.

![](/images/nmap-7bb47228.png)

#### sudo nmap -sC -sV -oN nmap_initial 10.10.120.35

```
 **-sC**: Runs NMAP default scripts

 **-sV**: Checks for versions running

 **-oN**: Outputs the return to a file named 'nmap_initial'

 **\[target ip]**\

```

We can see there are only two services running on this machine: ssh on port 22, and an http server on port 80.

##### Scan the machine, how many ports are open?

###### 2: Port 22 and Port 80

##### What version of Apache is running?

          2.4.29

##### What service is running on port 22?

          ssh

##### Find directories on the web server using the GoBuster tool.

We can use the command 'dir' and have GoBuster use directory/file enumeration mode.:

![](/images/ant_gobuster.png)

#### gobuster dir -u http://10.10.120.35/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -q -z

```
 
```

After looking at the return, we can see directories for uploads and panel .  Let's go to the webserver and see what we can find.

![](/images/http.png)

There doesn't seem to be anything on the landing page, so let's take a look at panel.

![](/images/panel.png)

It looks like we have way to upload files to the server, and in conjunction with uploads I think we'll be able to access files we upload.

# Task 3: Getting a shell

Alright, we need a file we can upload which will allow us to get a reverse shell.

[My go-to for a php-reverse-shell is: https://github.com/pentestmonkey/php-reverse-shell](https://github.com/pentestmonkey/php-reverse-shell) let's grab the script there and make a few changes.

![](/images/ant_shell.py.png)

We need to set $ip to a string containing our machine IP, and $port to an integer for the port to use.  I'll be using port 4444.

Let's save this as exploit.php, and upload it to the server.

![](/images/rejected.png)

I don't speak Portuguese, but it appears that .PHP files are not permitted.  That's not a problem though, because TryHackMe has a this as a learning topic in their "Vulnversity" room: <https://tryhackme.com/room/vulnversity.> We can use a Burp Suite sniper attack and see which .php filetype the form accepts, but we'll try .phtml first because that's usually what works.

Let's change the file-type to a .phtml and try to upload it again![](/images/accepted.png)

Awesome.  We have our file uploaded, and we can confirm this by going to 10.10.120.35/uploads/

![](/images/upload.png)

Now, before we open our file on the server, let's start up netcat and listen on port 4444.  Once netcat is listening, we can access our .phtml file on the server and see that we have a reverse shell:

![](/images/reverse_shell-2482ff64.png)

Now that we're in, let's look for the file we need.  We know it's called "user.txt", so we can:

##### find . -iname "user.txt" -print 2>/dev/null

This command will find files named "user.txt" in the tree.  All error returns are sent to /dev/null to be deleted, so our console is clean.  Once we find where the file is located, we can cat the file, and read the contents:

![](/images/ant_user_flag.png)

# Task 4: Privilege Escalation

Let's start by finding files with SUID permission:

![](/images/ant_SUID.png)

Looking through the list, /usr/bin/python stands out as unusual.
