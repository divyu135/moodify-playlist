import mysql.connector
from decouple import config

user_db = mysql.connector.connect(
  host="localhost",
  user=config('mysql_user'),
  password=config('mysql_pass'),
  database="moodify"
)
def insert_user(firstname, lastname, password, email):
    try:
        cursor = user_db.cursor()
        sql = "INSERT INTO users (firstname, lastname, password, email) VALUES (%s, %s, %s, %s)"
        val = (firstname, lastname, password, email)
        cursor.execute(sql, val)
        user_db.commit()
        print(cursor.rowcount, "record inserted.")
        return True
    except:
        return False

def verify_user(email,password):
    cursor = user_db.cursor()
    sql = "SELECT * FROM users WHERE email=%s AND password=%s"
    val = (email, password)
    cursor.execute(sql, val)
    account = cursor.fetchone()
    if account:
        return account
    else: 
        return False