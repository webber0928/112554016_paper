# chatbot-v1

#### Linux 安裝 (Ubuntu 22.04)

建立 ssh key

```
$ ssh-keygen
$ cat ~/.ssh/id_rsa.pub 
```

安裝相關套件 

```
sudo apt update
sudo apt install nginx -y
```

#### vim /etc/nginx/sites-available/default

```
# /etc/nginx/sites-available/default
server {
    listen 80;

    location / {
        root /var/www/DILab-web;
        try_files $uri $uri/ /index.html;
    }
}
```

#### 建立證書

```
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d zong-web.japaneast.cloudapp.azure.com
sudo systemctl reload nginx
```

### 前端布版

```
npm run build:stage
cp -a dist/* www/
sudo cp -a www/* /var/www/112554016_paper/
```

### 後端使用 lab 的 ip

```
location /api {
        proxy_pass http://140.115.126.57:8769/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
}
```