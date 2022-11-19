import sqlite3 as sqshit
#id, username, score, totaldistance


def adduser(use, name):
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("INSERT INTO snippets_genuser VALUES(?, ?, ?, ?)", (use, name, 0,0))
    con.commit()

def createuser(id, name = "Untitled User"):
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    res = cur.execute("SELECT id FROM snippets_genuser")
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
    connection = sqshit.connect('db.sqlite3')
    cursor = connection.execute('select * from snippets_genuser')
    names = list(map(lambda x: x[0], cursor.description))
    print(names)


def createtable():
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("CREATE TABLE snippets_genuser(Id, Username, score, TotalDistance)")

def addvalue(id, score, distanceadder):
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT TotalDistance FROM snippets_genuser WHERE id = ?", (id, ))
    sofar = cur.fetchall()
    newdistance = sofar[0][0] + distanceadder
    cur.execute("SELECT score FROM snippets_genuser WHERE id = ?", (id, ))
    sofar = cur.fetchall()
    newscore = sofar[0][0] + score
    cur.execute("UPDATE snippets_genuser SET TotalDistance = ? WHERE id = ?;", (newdistance, id))
    cur.execute("UPDATE snippets_genuser SET score = ? WHERE id = ?;", (newscore, id))
    con.commit()

def getscore(id):
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT score FROM snippets_genuser WHERE id = ?", (id,))
    sofar = cur.fetchall()[0][0]
    return {'score':sofar}

def getdistance(id):
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT TotalDistance FROM snippets_genuser WHERE id = ?", (id,))
    sofar = cur.fetchall()[0][0]
    return {'distance':sofar}

def getname(id):
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT Username FROM snippets_genuser WHERE id = ?", (id,))
    sofar = cur.fetchall()[0][0]
    return {'name':sofar}

def gettop10():
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT Username, score, TotalDistance FROM snippets_genuser ORDER BY score DESC LIMIT 10 ")
    top = cur.fetchall()
    return({'top':top})

def getmypos(id):
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT id FROM snippets_genuser ORDER BY score DESC")
    top = cur.fetchall()
    counter = 0
    for i in top:
        counter = counter + 1
        if i[0] == id:
            return counter

def changename(id, newname):
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("UPDATE snippets_genuser SET Username = ? WHERE id = ?;", (newname, id))
    con.commit()

def getnewID():
    con = sqshit.connect("db.sqlite3")
    cur = con.cursor()
    cur.execute("SELECT id FROM snippets_genuser ORDER BY id DESC")
    new = cur.fetchall()
    return new[0][0]

def getlvl(id):
    score = getscore(id)
    over = False
    lvl = 0
    num = 10
    while not over:
        if(lvl>=num):
            over = True
        else:
            num = num * 1.3
            lvl = lvl +1
    return {'lvl':lvl}

#createtable()
#showtable()
con = sqshit.connect("db.sqlite3")
cur = con.cursor()
x = cur.fetchall()
print(getnewID())
#addvalue(1, 1, 2)


