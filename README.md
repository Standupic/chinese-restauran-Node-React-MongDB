# chinese-restauran-Node-React-MongoDB
# settings of mongoDB on server ubuntu 16.04: 
1. switch to root using sudo su . 
2. create a service script (in this example the name of the service is Mongodb) . 
nano /lib/systemd/system/mongodb.service . 
3. File content should be . 

[Unit]  
Description=MongoDB Database Service  
Wants=network.target  
After=network.target  
[Service]  
ExecStart=/usr/bin/mongod --config /etc/mongod.conf  
ExecReload=/bin/kill -HUP $MAINPID  
Restart=always  
User=mongodb  
Group=mongodb 
StandardOutput=syslog 
StandardError=syslog  
[Install]   
WantedBy=multi-user.target  
#  Commands:  
ssh standupic@188.225.25.82    
sudo systemctl status mongodb    
sudo systemctl start mongodb   
sudo pm2 start npm — start    
sudo nano /etc/mongod.conf    
add ip in bindIP via comma without space between ips
mongo --host 188.225.25.82
