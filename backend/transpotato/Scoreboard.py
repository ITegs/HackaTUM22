import mysql.connector

def createdatabase():
  mydb = mysql.connector.connect(host="localhost",user="Transpotato",password="PotatosAreGreat")
  mycursor = mydb.cursor()
  mycursor.execute("CREATE DATABASE UserIDs")

def checkdatabase():
  mydb = mysql.connector.connect(host="localhost",user="Transpotato",password="PotatosAreGreat")

  mycursor = mydb.cursor()

  mycursor.execute("SHOW DATABASES")

  for x in mycursor:
    print(x)

def connect():
  mydb = mysql.connector.connect(host="localhost",user="Transpotato",password="PotatosAreGreat")
  print(mydb)

checkdatabase()
createdatabase()
connect()
