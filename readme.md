**Self Server Docker Creation**
 the idea of this project is to prove a web interface with a lot of 
 applications to build into a docker image by dynamically creating applications
 dockerfile based on slecting applications and specific versions.

**dev environment
Ubuntu 22.04 (arm64)**


I've used a 2Gb VM of Ubuntu 22.04 server (its the arm64 version on an M1, using vmware fusion)

**setup
database**


Install MariaDb

```
sudo apt install mariadb-server mariadb-client -y
 ```

run the secure install

```
mysql_secure_installation
```


login to the databse

```
mysql -uroot -p
```

create a database

```
CREATE DATABASE devopsdev; 
```

use database

```
USE devopsdev;
```

Create Tables and fields
```
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application VARCHAR(255),
    version VARCHAR(255),
    run VARCHAR(255)
);
```
**Install Web Services**

```
sudo apt install apache2
sudo apt install php libapache2-mod-php php-mysql
```

``` 
sudo nano /etc/apache2/mods-enabled/dir.conf 
```

Locate the line that says <IfModule mod_dir.c> and DirectoryIndex and move index.php to the beginning of the list. It should look like this:

```
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm
</IfModule>
```

```
sudo systemctl restart apache2
echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
```

Open a web browser and visit http://your_server_ip/info.php. You should see the PHP information page. If it's displayed correctly, PHP is working with Apache.


