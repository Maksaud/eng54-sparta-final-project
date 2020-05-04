#!/bin/bash

# Update the sources list
sudo apt-get update -y

# upgrade any packages available
sudo apt-get upgrade -y


# install git
sudo apt-get install git -y

# install nodejs

# sudo apt-get install nodejs -y
# sudo apt-get install python-software-properties -y
# curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs -y

# if node js does not install npm
sudo apt-get install npm -y

# install pm2
sudo npm install pm2 -g

npm rebuild bcrypt --build-from-source

sudo npm install selenium-webdriver

# npm install --global mocha

# npm install --save-dev mocha

sudo apt-get install nginx -y

# remove the old file and add our one
sudo rm /etc/nginx/sites-available/default
sudo cp /home/ubuntu/environment/nodeapp.conf /etc/nginx/sites-available/default

# finally, restart the nginx service so the new config takes hold

sudo systemctl restart nginx


sudo mkdir /.env
