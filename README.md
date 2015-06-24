# RESTful-NodeJS-Express-MySQL
Api RESTful con Node.js, Express &amp; Mysql

##Install

- Clone Repo

- Create a 'test' BD

- Create a 'usuarios' table

```
CREATE TABLE IF NOT EXISTS `usuarios` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;
````
-Dump Data in usuarios

````
INSERT INTO `usuarios` (`userId`, `name`, `email`, `password`) VALUES
(1, 'Jon Snow', 'jon@starks.com', '23235645yghgf'),
(2, 'Jaime Lannister', 'jaime@gmail.com', 'dncskdcndscsdcdsc'),
(4, 'Daenerys Targaryen', 'queen@yahoo.com', '032bcsjdncsdjc3223'),
(5, 'Sansa Stark', 'sasa@yahoo.com', 'bonbon032932');
```
- Install packages
```
$npm install
```
- Run Server
```
$node server.js
```
