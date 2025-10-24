## installation
```bash
npm install express cors dotenv pg
```
```bash
npm install -g nodemon
```


## code snippet
https://www.sammeechward.com/deploying-full-stack-js-to-aws-ec2

# ec2 setup
## connect to aws ec2 instance 
```bash
chmod 400 "nv-visitha2001-wpc.pem"
ssh -i "nv-visitha2001-wpc.pem" ubuntu@ec2-54-158-243-160.compute-1.amazonaws.com
```
- this will open the ec2 instance
- and change the gitbash to ubuntu@ec2-54-158-243-160.compute-1.amazonaws.com

## update the system
```bash
sudo apt update
sudo apt upgrade
```

## check for files
```bash
ls
```

## remove files
```bash
rm -rf node_modules
```

# application setup
## install nodejs
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## move code to ec2 instance
```bash
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
-e "ssh -i ~/.ssh/nv-visitha2001-wpc.pem" \
. ubuntu@ec2-54-158-243-160.compute-1.amazonaws.com:~/CRUD-Postgres-ExpressJs-AWS-EC2
```
or
### create directory in ec2 instance
```bash
mkdir ~/CRUD-Postgres-ExpressJs-AWS-EC2
```
- run this in gitbash ssh
### move code to ec2 instance
```bash
tar -cz --exclude='node_modules' --exclude='.git' --exclude='.env' . | ssh -i ~/.ssh/nv-visitha2001-wpc.pem ubuntu@ec2-54-158-243-160.compute-1.amazonaws.com "tar -xz -C ~/CRUD-Postgres-ExpressJs-AWS-EC2"
```
- run this in gitbash local machine

## update an existing file
```bash
scp -i ~/.ssh/nv-visitha2001-wpc.pem ./src/app.js ubuntu@ec2-54-158-243-160.compute-1.amazonaws.com:~/CRUD-Postgres-ExpressJs-AWS-EC2/src/app.js
```


# database setup
## install postgresql
```bash
sudo apt install postgresql postgresql-contrib
```

## start and enable postgresql
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## access postgresql
```bash
sudo -i -u postgres
```

## start using psql
```bash
psql
```

## create database
```bash
CREATE DATABASE express_book_crud;CREATE ROLE postgres WITH LOGIN PASSWORD 'vnr2001';GRANT ALL PRIVILEGES ON DATABASE "express_book_crud" TO postgres;
```

## set postgres password
```bash
ALTER USER postgres WITH PASSWORD 'vnr2001';
```
- if postgres password is already set, skip this step(if forgot password, reset it)

### check db users 
```bash
\du
```

## pass env variables
```bash
nano .env
```
- then add the following variables

```bash
DB_USER=postgres(user name)
DB_HOST=localhost
DB_DATABASE=express_book_crud(db name)
DB_PASSWORD=vnr2001
DB_PORT=5432

PORT=3000(app port)
```

## run the application
```bash
npm run dev
```

- add port 3000 to ec2 security group
- navigate to ec2 console and EC2 > Security Groups > instance security group
- add port 3000 to security group

### now close the working gitbash and open a new gitbash and run the following commands after connecting to ec2 instance
```bash
sudo npm install pm2 -g
```

## run the application
```bash
pm2 start src/index.js --name crud-app
```

## check the status of the application
```bash
pm2 status crud-app
```

## to see logs
```bash
pm2 logs crud-app
```

## Set up PM2 to start on server reboot
```bash
pm2 startup
```

## stop the application
```bash
pm2 stop crud-app
```

## delete the application from pm2
```bash
pm2 delete crud-app
```

# caddy setup(server reverse proxy)
URL : https://caddyserver.com/docs/install#debian-ubuntu-raspbian

## start caddy
```bash
sudo systemctl start caddy
```

## check if caddy is running
```bash
curl localhost
```

## enable caddy
```bash
sudo systemctl enable caddy
```

## open caddy file
```bash
sudo vim /etc/caddy/Caddyfile
```

## add the following
- press ins key to start editing
- comment - set root * /usr/share/caddy
- comment - file_server
- uncomment - reverse_proxy localhost:8080
- change port 8080 to 3000

- save and exit using press escape key then type :wq and press enter

## restart caddy
```bash
sudo systemctl restart caddy
```
- now open your browser and navigate to http://54.158.243.160/