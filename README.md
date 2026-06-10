# AWS SBG BSIOTR 101
## Deploy Your First Website with Amazon S3 & CloudFront

Welcome to the first session of the AWS Student Community workshop series.

In this hands-on workshop, you will learn how to deploy a static website on AWS using Amazon S3 and Amazon CloudFront. By the end of this session, you will have a publicly accessible website hosted on AWS and understand the core concepts behind modern cloud-based web hosting.

---

## Learning Objectives

After completing this workshop, you will be able to:

* Understand the basics of Cloud Computing
* Navigate the AWS Management Console
* Create and configure an Amazon S3 Bucket
* Host a static website using Amazon S3
* Create a CloudFront Distribution
* Understand Content Delivery Networks (CDNs)
* Understand HTTPS and caching concepts
* Deploy a website to AWS

---

## Architecture

```text
Browser
   |
   v
CloudFront
   |
   v
Amazon S3 Bucket
   |
   v
HTML / CSS / JavaScript Files
```

### Services Used

#### Amazon S3

Amazon S3 (Simple Storage Service) is AWS's object storage service used to store website files such as HTML, CSS, JavaScript, images, and documents.

#### Amazon CloudFront

Amazon CloudFront is AWS's Content Delivery Network (CDN) that delivers content with low latency, HTTPS support, and global edge locations.

---

## Prerequisites

Before starting the workshop, ensure you have:

* An AWS Account
* Internet Connection
* Modern Web Browser
* Basic understanding of websites (HTML/CSS is helpful but not required)

---

## Repository Structure

```text
session-01-s3-cloudfront
│
├── quizapp/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── slides/
│   └── AWS-SBG-BSIOTR-101.pdf
│
└── README.md
---

## Workshop Steps

### Step 1 - Sign In to AWS

1. Open the AWS Console.
2. Sign in to your AWS Account.
3. Navigate to Amazon S3.

---

### Step 2 - Create an S3 Bucket

1. Click "Create Bucket".
2. Enter a globally unique bucket name.
3. Select your preferred AWS Region.
4. Keep default settings unless instructed otherwise.
5. Create the bucket.

---

### Step 3 - Upload Website Files

Upload the contents of the starter or solution folder:

* index.html
* style.css
* script.js

Verify that the files appear in the bucket.

---

### Step 4 - Configure Public Access

Update bucket permissions according to workshop instructions so that website content can be served publicly.

---

### Step 5 - Configure Static Website Hosting

1. Open Bucket Properties.
2. Enable Static Website Hosting.
3. Set:

```text
Index Document: index.html
```

4. Save changes.

---

### Step 6 - Create a CloudFront Distribution

1. Open CloudFront.
2. Create a new Distribution.
3. Select your S3 bucket as the origin.
4. Configure default settings.
5. Create the distribution.

Provisioning may take several minutes.

---

### Step 7 - Access Your Website

Once the distribution is deployed:

1. Copy the CloudFront Domain Name.
2. Open it in a browser.
3. Verify that your website is accessible.

Congratulations! Your website is now deployed on AWS.

---

## Understanding Caching

CloudFront stores content at edge locations around the world.

Benefits:

* Faster delivery
* Reduced latency
* Lower load on origin servers
* Improved user experience

### Demo

Modify a file and upload it again.

Observe:

* Immediate changes may not appear.
* Cached content may continue to be served temporarily.

This behavior demonstrates how caching works.

---

## Troubleshooting Guide

### Access Denied Error

Possible causes:

* Bucket permissions are not configured correctly
* Static Website Hosting is not enabled
* CloudFront origin configuration is incorrect

Verify that your bucket and CloudFront settings match the workshop instructions.

---

### Website Not Updating After Changes

Possible causes:

* CloudFront caching
* Browser caching

Try:

* Refreshing the page using Ctrl + F5
* Opening the site in Incognito/Private Mode
* Waiting a few minutes for cache propagation

---

### Bucket Name Already Exists

Amazon S3 bucket names must be globally unique across all AWS accounts.

Try using:

* yourname-website
* college-name-project
* yourname-random-number

Example:

aws-sbg-bsiotr-john-1234

---

### CloudFront Distribution Still Deploying

CloudFront distributions require time to deploy globally.

Typical deployment time:

* 5–15 minutes

Wait until the distribution status changes to **Deployed** before testing your website.

---

### Website Loads Through S3 but Not Through CloudFront

Possible causes:

* CloudFront deployment is still in progress
* Incorrect origin selection
* Permission configuration issues

Verify the origin settings and ensure deployment is complete.
---

## Key Concepts Covered

* Cloud Computing
* Object Storage
* Static Website Hosting
* CDN (Content Delivery Network)
* HTTPS
* Edge Locations
* Caching
* AWS Global Infrastructure

---
## Resources

AWS Documentation:

* Amazon S3 Documentation
* Amazon CloudFront Documentation
* AWS Free Tier
* AWS Skill Builder

---

## License

This project is licensed under the MIT License.

---

## AWS Student Community

This workshop is part of the AWS Student Community learning series designed to help students build practical cloud skills through hands-on projects and guided workshops.
