---
title: TryHackMe - Pickle Rick CTF
excerpt: >-
  Iceland is a Nordic country between the North Atlantic and the Arctic Ocean.
  It has a population of 325,671 and an area of 103,000 km2 (40,000 sq mi),
  making it the most sparsely populated country in Europe.
date: '2021-10-27'
thumb_img_path: images/7.jpg
thumb_img_alt: Icelandic horses
content_img_path: /images/Banner.png
content_img_alt: Icelandic horses
seo:
  title: Fragments of Iceland
  description: Iceland is a Nordic country between the North Atlantic and the Arctic Ocean.
  extra:
    - name: 'og:type'
      value: article
      keyName: property
    - name: 'og:title'
      value: Fragments of Iceland
      keyName: property
    - name: 'og:description'
      value: >-
        Iceland is a Nordic country between the North Atlantic and the Arctic
        Ocean.
      keyName: property
    - name: 'og:image'
      value: images/7.jpg
      keyName: property
      relativeUrl: true
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Fragments of Iceland
    - name: 'twitter:description'
      value: >-
        Iceland is a Nordic country between the North Atlantic and the Arctic
        Ocean.
    - name: 'twitter:image'
      value: images/7.jpg
      relativeUrl: true
layout: post
---
TryHackMe - Pickle Rick CTF: [https://tryhackme.com/room/picklerick](https://tryhackme.com/room/picklerickTryHackMe)

This box is listed as Easy .  All three ingredients can be discovered easily from your browser and without using any tools, but for this walkthrough I will be using:

NMAP DIRBUSTER NETCAT

I will try to provide alternative guidance where applicable.

# ENUMERATION

First, let's start by pinging the machine and making sure we're able to connect.

![](/images/ping.png)

Everything looks good, so let's try to see which ports we have available.  I'll be using NMAP to perform this scan:

sudo nmap -sN -Pn 10.10.19.153

\-sN -- TCP Null scan

\-Pn -- Treats all hosts as online / skip host discovery

![](/images/nmap.png)

We can see we have port 22 and port 80 open.  Let's curl the IP and see what we get back.

![](/images/a_curl_port\_80.png)

Nothing really stands out at first.  We can see we have a /assets/ directory we may be able to use later.  If we scroll down, however, we see a comment left by Rick, which gives us the Username.  We'll note this username, and be on the lookout for a login page.

Alternatively, we can navigate to \[TARGET_IP]:80, and inspect source there to get the same:

![](/images/a_inspect_source.png)

Before we jump to directory hunting, let's check for a robots.txt to get any more intel:

![](/images/a_curl_robots.png)

Curl returns a seemingly nonsense phrase that will be important later, and I have purposely blurred.  For now, we do not know its significance though.

Let's do some directory busting.  I'll be using DirBuster, and I'll be using a small wordlist that comes pre-installed in Parrot and Kali.  I'll input the target IP, as well as the file path to my list:

![](/images/dirbuster.png)

After letting the scan run for a few moments, we have some interesting results:

![](/images/a_dirbuster_return.png)

We can see both a /login.php and  a /portal.php which are interesting.  Let's navigate to the login page.

![](/images/login.png)

We know the Username from our notes of the HTML comment on the home page, but we don't know the password.  A quick trial of usual passwords doesn't work.  We can try a sniper attack in BurpSuite, but what about the text in /robots.txt?  Let's try that.

![](/images/command.png)

