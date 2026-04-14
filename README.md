# Database Setup

To set up the database, run the install script located in the setup_scripts folder:


```bash
./setup_scripts/install_db.sh
```


Use the following responses when prompted:

-Switch to unix_socket authentication [Y/n] n
-Change the root password? [Y/n] Y
    -Set the password to: 12345
-Remove anonymous users? [Y/n] Y
-Disallow root login remotely? [Y/n] Y
-Remove test database and access to it? [Y/n] Y
-Reload privilege tables now? [Y/n] Y

Verify Database is Running

Run:

```bash
sudo service mariadb status
```

You should see output indicating the server is running. Like so:
```bash
 * /usr/bin/mariadb-admin  Ver 10.0 Distrib 10.11.14-MariaDB, for debian-linux-gnu on x86_64
Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Server version          10.11.14-MariaDB-0ubuntu0.24.04.1
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /run/mysqld/mysqld.sock
Uptime:                 15 min 42 sec

Threads: 1  Questions: 77  Slow queries: 0  Opens: 33  Open tables: 26  Queries per second avg: 0.081
```


Create Tables:

Run:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

Then verify:

```bash
mysql -u root -p -e 'show databases;'
```

You should see:

```bash
Enter password: 
+--------------------+
| Database           |
+--------------------+
| cs208demo          |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```




# Node.js Setup

Start the project with the folliwing commands:

```bash
npm install
npm start
```

Then open the app

Application Features

This application allows users to:

-View all tasks on the home page
-Add a new task
-Edit an existing task
-Mark a task as completed
-Delete a task
-Prevent blank task submissions


# How to Use the App

1. Enter a task and click Create Task or hit the 'Enter' button
2. Edit a task using the input field and click
3. Save Edit
4. Click Mark Completed to change status
5. Click Delete to remove a task



If not running:

sudo service mariadb start
Missing Database or Table

Check:

```bash
mysql -u root -p -e 'show databases;'
```

If cs208demo is missing, rerun:
```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```
Missing "completed" Column Error

If you see:

Unknown column 'completed'

Run:
```bash
ALTER TABLE todos
ADD COLUMN completed TINYINT(1) NOT NULL DEFAULT 0;
Reset Codespace (Last Resort)
```
If nothing works:

Commit and push your work
Delete your Codespace
Create a new one from the repository
Run setup again