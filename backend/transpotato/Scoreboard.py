import sqlite3
#id, username, score, totaldistance
con = sqlite3.connect("data.db")
cur = con.cursor()

def adduser(id, name):
    cur.execute("""
        INSERT INTO Users VALUES
            (id,name, 0, 0)""")