## installation

```bash
npm install express cors dotenv pg
```

```bash
npm install -g nodemon
```


## code snippet
https://www.sammeechward.com/deploying-full-stack-js-to-aws-ec2


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
```bash
scp -i ~/.ssh/nv-visitha2001-wpc.pem -r --exclude 'node_modules' --exclude '.git' --exclude '.env' . ubuntu@ec2-54-158-243-160.compute-1.amazonaws.com:~/CRUD-Postgres-ExpressJs-AWS-EC2
```
- run this in gitbash local machine