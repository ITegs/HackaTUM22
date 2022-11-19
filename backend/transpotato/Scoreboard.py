import sqlite3
#id, username, score, totaldistance


def adduser(id, name):
    con = sqlite3.connect("data.db")
    cur = con.cursor()
    cur.execute("""
        INSERT INTO Users VALUES
            (id,name, 0, 0)""")
    con.commit()

def testuser(id, name = "Untitled User"):
    con = sqlite3.connect("data.db")
    cur = con.cursor()
    res = cur.execute("SELECT score FROM movie")
    data = res.fetchall()
    there = False
    for i in data:
        if i == id:
            there = True
    if not there:
        adduser(id, name)