import sqlite3 as sqshit
#id, username, score, totaldistance


def adduser(use, name):
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("INSERT INTO User VALUES(?, ?, ?, ?)", (use, name, 0,0))
    con.commit()

def createuser(id, name = "Untitled User"):
    con = sqshit.connect("data.db")
    cur = con.cursor()
    res = cur.execute("SELECT Id FROM User")
    data = res.fetchall()
    there = False
    for i in data:
        #print(i)
        test = (id,)
        if test == i:
            there = True
    if not there:
        adduser(id, name)

def showtable():
    connection = sqshit.connect('data.db')
    cursor = connection.execute('select * from User')
    names = list(map(lambda x: x[0], cursor.description))
    print(names)


def createtable():
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("CREATE TABLE User(Id, Username, score, TotalDistance)")

def addvalue(id, score, distanceadder):
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("SELECT TotalDistance FROM User WHERE Id = ?", (id, ))
    sofar = cur.fetchall()
    newdistance = sofar[0][0] + distanceadder
    cur.execute("SELECT score FROM User WHERE Id = ?", (id, ))
    sofar = cur.fetchall()
    newscore = sofar[0][0] + score
    cur.execute("UPDATE User SET TotalDistance = ? WHERE Id = ?;", (newdistance, id))
    cur.execute("UPDATE User SET score = ? WHERE Id = ?;", (newscore, id))
    con.commit()

def getscore(id):
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("SELECT score FROM User WHERE Id = ?", (id,))
    sofar = cur.fetchall()[0][0]
    return sofar

def getdistance(id):
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("SELECT TotalDistance FROM User WHERE Id = ?", (id,))
    sofar = cur.fetchall()[0][0]
    return sofar

def gettop10():
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("SELECT Username, score, TotalDistance FROM User ORDER BY score DESC LIMIT 10 ")
    top = cur.fetchall()
    return(top)

def getmypos(id):
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("SELECT Id FROM User ORDER BY score DESC")
    top = cur.fetchall()
    counter = 0
    for i in top:
        counter = counter + 1
        if i[0] == id:
            return counter

def changename(id, newname):
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("UPDATE User SET Username = ? WHERE Id = ?;", (newname, id))
    con.commit()

def getnewID():
    con = sqshit.connect("data.db")
    cur = con.cursor()
    cur.execute("SELECT Id FROM User ORDER BY Id DESC")
    new = cur.fetchall()
    return new[0][0]+1

#createtable()
#showtable()
con = sqshit.connect("data.db")
cur = con.cursor()
x = cur.fetchall()
#addvalue(1, 1, 2)


