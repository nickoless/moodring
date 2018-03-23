# Moody

An artificial intelligence application that utilizes image detection and object recognition and returns a relevant (random) playlist based on a given emotion or object.

Uses AWS' Rekognition and Spotify APIs

# Setting up AWS

In order to use AWS Rekognition an account is required.

1. Create an AWS account (https://aws.amazon.com/)
  	- Note that a credit card may be required in order to set up an account
2. Create an S3 bucket - this will be called within the app using Rekognition
  	- from within the AWS console, navigate to the S3 page and create a bucket
  	- take note of the name, as you will need this for later
3. Create an IAM user - these credentials will be used to access AWS 
  	- Access type: Programmatic access
  	- Permissions > Attach existing policies directly: (search for, and add) AmazonS3FullAccess, AmazonRekognitionFullAccess
  	- **IMPORTANT:** You will need both the acess key id and the secret access key - you may want to copy these into a separate file

### Deploying the backend

We are using now.sh to instantly deploy our server. Ensure that you are in the 'backend' folder and that all dependencies have been installed. 

1. Set up environment variables as per the following instructions: https://zeit.co/docs/features/env-and-secrets
	- Refer to the .env.example to see the information required
2. Deploy to now.sh using the 'now' command. Ensure that you are also setting the environment variables using the -e command mentioned in the link from the previous step

# Setting Up the Redirect Server

### For running on your own
1. Register your app with developers.spotify
2. paste the `client_id` and `client_secret` accordingly into index.js
1. Make sure expo xde host is set to LAN and protocol is set to exp
1. in index.html - Change the baseUri to the uri in expo XDE (i.e exp://192.168.1.160:19000)
2. in index.js - at line 82 change res.redirect uri to have correct linkingURI in the query to match the baseUri in index.html i.e res.redirect(`https://redirect-server.now.sh/?linkingUri=<YOUR LOCAL EXPO URI IN XDE>/+` )
4. In developers.spotify: Update URI whitelist to include the FULL line above.
5. Remove any existing now.sh servers containing the alias of redirect-server. Use `now ls` to get the current list and status of servers running and `now rm <CURRENT REDIRECT SERVER>` to remove the current redirect-server
6. deploy server using `now` in the `moodring/redirect-server` directory
7. Create the static uri for the deployed server using `now alias <DEPLOYED SERVER>`


