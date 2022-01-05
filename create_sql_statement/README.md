## 使い方

1. 事前準備
```
mysql> CREATE TABLE IF NOT EXISTS tmp (
    CLIENTNO int(4),
    CNAME char(20),
    ADDRESS char(50),
    STAFFNO int(4),
    note char(50)
);

mysql> DESC tmp
+----------+----------+------+-----+---------+-------+
| Field    | Type     | Null | Key | Default | Extra |
+----------+----------+------+-----+---------+-------+
| CLIENTNO | int(4)   | YES  |     | NULL    |       |
| CNAME    | char(20) | YES  |     | NULL    |       |
| ADDRESS  | char(50) | YES  |     | NULL    |       |
| STAFFNO  | int(4)   | YES  |     | NULL    |       |
| note     | char(50) | YES  |     | NULL    |       |
+----------+----------+------+-----+---------+-------+
```
2. SQL fileを生成
```
C:\Users\User\hoge> javac -encoding UTF-8 CreateInsertStatement.java
C:\Users\User\hoge> java CreateInsertStatement
```
<details><summary>出力ファイル(insert.sql)</summary><div>

```.sql
INSERT INTO tmp ( CLIENTN,  CNAME,  ADDRESS,  STAFFNO,  note) VALUES
 (1, tester', hoge@example.com', 1, hogehoge'),
 (2, tester', hoge@example.com', 2, hogehoge'),
 (3, tester', hoge@example.com', 3, hogehoge'),
 (4, tester', hoge@example.com', 4, hogehoge'),
 (5, tester', hoge@example.com', 5, hogehoge')
;
```
</div></details>

3. 事前に作成したテーブルに対して生成したSQL fileを実行する
```
C:\Users\User\hoge> mysql -uroot -proot sample < Desktop\kondo\insert.sql
```
