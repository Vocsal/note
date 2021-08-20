# Ubuntu操作记录

> Ubuntu 20.4 LTS
>
> 注意本记录命令都是在root用户下执行，非root用户请在命令前加上sudo


## vagrant部署ubuntu环境


**时间同步**
```
# 使用timedatectl，也可以用ntpd
timedatectl list-timezones | grep Shang # 查看时区，并过滤出上海的时区
timedatectl set-timezone Asia/Shanghai  # 将时区设置为上海
date                                    # 查看时间是否正确
timedatectl                             # 查看timedatectl服务
timedatectl set-ntp on                  # 启动同步服务和timesyncd
```

**root ssh**
```
passwd root                 # 修改root密码
vim /etc/ssh/sshd_config    # 编辑配置文件
# 将 PermitRootLogin 的值修改为 yes
systemctl restart ssh
```


**升级apt-get**
```
apt-get update
```

## nginx

- 安装
```
apt-get install nginx -y
nginx -v
systemctl start nginx
systemctl enable nginx
```

查看相应页面，确认nignx安装成功

- 添加服务配置

自行配置后，进行相应页面查看

- 增加状态查询页面

在配置增加页面入口
```
server {
    location /nginxstatus {
        stub_status           on;
        access_log            on;
        auth_basic            "NginxStatus";
        auth_basic_user_file  htpasswd/nginxstatus; # 密码文件目录
    }
}
```

使用htpassword生成auth_basic认证，htpassword是Apache密码生成工具

安装 `apt-get install apache2-utils -y`

生成密码 `htpassword -c htpasswd/nginxstatus username`，输入密码

可以打开页面 `http://.../nginxstatus` 进行查看

- 配置https

**openssl生成ssl证书**
```
openssl genrsa -out ssl.nginx.ubuntu.key 2048
openssl req -new -key ssl.nginx.ubuntu.key -out ssl.nginx.ubuntu.csr
# 根据提示输入 common name 可以输入 *.nginx.ubuntu 通配
openssl x509 -req -in ssl.nginx.ubuntu.csr -out ssl.nginx.ubuntu.crt -signkey ssl.nginx.ubuntu.key -days 3650
```

**更改nginx配置**
```
server {
    listen      443 ssl;
    ssl_certificate         /usr/local/nginx/etc/ssl/ssl.nginx.ubuntu.crt;
    ssl_certificate_key     /usr/local/nginx/etc/ssl/ssl.nginx.ubuntu.key;

    ssl_session_timeout     5m; # 缓存有效期
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;  # 安全链接可选的加密协议
    ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP; #加密算法
    ssl_prefer_server_ciphers on;

    # https重定向
    # rewrite     ^(.*)https://$server_name$1 permanent;
}
```


## git

- 安装
```
apt-get install git -y
```

- 配置和ssh
```
git config --global user.name Vocsal
git config --global user.email email@domain.com
ssh-keygen -t rsa -C "email@domain.com" # 生成ssh密钥
# 将公钥id_rsa.pub内容添加至github
```


## jekyll

- 安装

[教程](https://jekyllrb.com/docs/installation/ubuntu/)