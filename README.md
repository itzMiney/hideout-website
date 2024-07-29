![https://discord.gg/RstBa889](https://img.shields.io/discord/350718076280504322?color=%2333cc33&label=itzMiney's%20Hideout%20Discord)
![](https://img.shields.io/github/contributors/itzMiney/hideout-website)
![](https://img.shields.io/github/issues-pr/itzMiney/hideout-website)
![](https://img.shields.io/github/issues-pr-closed/itzMiney/hideout-website)
![](https://img.shields.io/github/forks/itzMiney/hideout-website?label=Forks)
![](https://img.shields.io/github/commit-activity/m/itzMiney/hideout-website)
![](https://img.shields.io/github/stars/itzMiney/hideout-website?label=Stars)

# Hideout SMP Website

Welcome to the Hideout SMP Website repository! This repository contains the code and assets for the Hideout SMP network's official website.

![Screenshot](https://short.hideoutsmp.net/WGeyaT)

[View Live Site](https://www.hideoutsmp.net)

## Overview

The Hideout SMP website is designed to provide information and interactive features for the Hideout SMP Minecraft server. It includes various pages such as server status, news, team information, and more.

## Features

- **Home Page**: Provides an overview of the Hideout SMP network and latest updates.
- **Server Status**: Displays the current status of the Minecraft server.
- **Team Information**: Details about the team behind Hideout SMP.
- **Contact Form**: Allows users to contact the team with inquiries or feedback.
- **Styling and Media**: Custom CSS and media assets to enhance the user experience.
- **Scripts and Templating**: Using scripts for site management and Jinja2 for templating.

## Installation

To set up and run the website locally, follow these steps:

1. **Clone the Repository**:

   

git clone https://github.com/itzMiney/hideout-website
   cd hideout-website



2. **Create and Activate a Virtual Environment**:

   

python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`



3. **Install Dependencies**:

   

pip install -r requirements.txt



4. **Set Up Environment Variables**:

   Copy the example environment file and update the variables:

   

cp example.env .env



   Edit the .env file with your configuration.

## Deployment
   
   To deploy the website on a webserver copy the repository on the webserver the same way you installed it locally and copy over your env and media files, then create an NGINX configuration for your website
   
   **Example NGINX Configuration:**
   

server {
       listen 80;
       listen [::]:80;

       server_name hideoutsmp.net www.hideoutsmp.net;
       return 301 https://www.hideoutsmp.net$request_uri;
   }

   server {
       listen 443 ssl http2;
       listen [::]:443 ssl http2;

       server_name example.com www.example.com;

       root /path/to/hideout-website/public_html;
	    index index.html;
	
	    location / {
           try_files $uri $uri.html $uri/ =404;
       }

       location ~ /\.env {
           deny all;
       }

	    error_page 403 /403.html;
       location = /403.html {
           internal;
       }
	
       error_page 404 /404.html;
       location = /404.html {
           internal;
       }

       error_page 500 502 503 504 /50x.html;
       location = /50x.html?error=$status {
           internal;
       }

       # SSL Configuration
       ssl_certificate /etc/letsencrypt/live/example.com-wildcard/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/example.com-wildcard/privkey.pem;
       ssl_session_cache shared:SSL:10m;
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
       ssl_prefer_server_ciphers on;
   }



   Put the configuration into etc/nginx/sites-enabled and activate your website by creating a symlink with sudo ln -s /etc/nginx/sites-available/yourconfig.conf /etc/nginx/sites-enabled and restarting nginx with sudo systemctl restart nginx
   To host locally for testing just open public_html/index.php in your browser.

## File Structure

- public_html/ - Contains the publicly viewable html pages.
- scripts/ - Contains script for site management.
- requirements.txt - Contains the requirements for the virtual environment required to run some of the management scripts.
- .env - Environment variables.

## Contributing

Contributions to the Hideout SMP website are welcome! Please fork the repository and create a pull request with your changes. Ensure that your changes are well-tested and do not break existing functionality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact the Hideout SMP team at [contact@hideoutsmp.com](mailto:contact@hideoutsmp.com).
