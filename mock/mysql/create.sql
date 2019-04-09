/* 创建一个数据库 */
create database if not exists epoos character set gbk;

/* 系统表 - 创建数据源表 */
use epoos;

/* 系统表 - 操作日志表 */
create table if not exists TB_LOG(
  id int unsigned not null auto_increment primary key comment '日志记录ID',
  log_type varchar(32) not null comment '业务类型',
  ip varchar(64) not null comment '用户IP',
  `user_id` varchar(64) not null comment '用户ID',
  log_content varchar(1024) not null comment '日志内容',
  create_time datetime default CURRENT_TIMESTAMP comment '创建时间'
);

/* 用户表 - 用户信息表 */
create table if not exists TB_USER(
  `user_id` varchar(64) not null primary key comment '用户ID',
  `user_name` varchar(128) not null comment '用户名',
  `password` varchar(128) not null comment '用户密码',
  user_type varchar(64) not null comment 'ID类型',
  user_status varchar(64) not null comment '用户状态',
  create_time datetime default CURRENT_TIMESTAMP comment '创建时间',
  update_time datetime default CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP comment '更新时间'
);

/* 插入第一个用户 */
INSERT INTO TB_USER (user_id, user_name, password, user_type, user_status) VALUES 
('eps', '邑司', '123456', 'admin', 'normal')
