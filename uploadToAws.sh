#!/bin/bash    

KEY_PATH="/atools/aws_resources/karnex/karnex.pem"
AWS_IP="karnex.in"

ssh -i $KEY_PATH ubuntu@$AWS_IP 'sudo apt install npm;sudo npm install pm2@latest -g;cd /opt;sudo mkdir karnexMailServer;sudo chmod 777 karnexMailServer/ -R;cd karnexMailServer/'
curl --insecure -v -k --key $KEY_PATH sftp://ubuntu@$AWS_IP/opt/karnexMailServer/emailNode.js -T "emailNode.js"
curl --insecure -v -k --key $KEY_PATH sftp://ubuntu@$AWS_IP/opt/karnexMailServer/package.json -T "package.json"
# curl --insecure -v -k --key $KEY_PATH sftp://ubuntu@$AWS_IP/opt/kumoroMailServer/pm2runConfig.json -T "pm2runConfig.json"
ssh -i $KEY_PATH ubuntu@$AWS_IP 'cd /opt/karnexMailServer/;npm i;pm2 start emailNode.js; emailNode.js'
