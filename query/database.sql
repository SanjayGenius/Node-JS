Create database u71;

CREATE TABLE `product_info`(		/* Table name not specified */  
  `product_id` INT(100) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255),
  `product_price` VARCHAR(255),
  `remaining_volume` INT(100),
  `availability` VARCHAR(255),
  `attribute2` VARCHAR(255),
  `attribute3` VARCHAR(255),
   KEY(`product_id`)
);

/* For testing */
insert into product_info (product_name,product_price,availability) values ('schewarma','45','yes');
insert into product_info (product_name,product_price,availability) values ('Ice cream','65','yes');
insert into product_info (product_name,product_price,availability) values ('Momos','35','yes');

insert into product_info (product_name,product_price,availability) values ('Fig','40','yes');
insert into product_info (product_name,product_price,availability) values ('Puffs','15','yes');
insert into product_info (product_name,product_price,availability) values ('Mango','45','no');
/*  !!!!!!!!!!!!!!!!!    */

CREATE TABLE `u71`.`customer_report`(  
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(250),
  `visited_date` DATE,
  `bill_amount` VARCHAR(250),
   KEY(`customer_id`)
);

CREATE TABLE `u71`.`detailed_report`(  
  `purchase_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `product_name` VARCHAR(250),
  `quantity` INT,
  `price` VARCHAR(250),
  PRIMARY KEY (`purchase_id`)
);

