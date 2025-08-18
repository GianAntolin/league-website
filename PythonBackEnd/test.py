import sqlite3


def printTable(tableName: str):
    cursor.execute(f"Select * FROM {tableName}")
    data = cursor.fetchall()
    rows = [dict(row) for row in data]
    with open('tables.txt', 'w') as f:
        for i in rows:
            print(i,file=f)
        print(len(rows),file=f)


connection = sqlite3.connect('website.db')
connection.row_factory = sqlite3.Row
cursor = connection.cursor()

# printTable('accounts')
# printTable('matches')

start = 1742872583037 
end = 1743309748626
region = 'na1'
PUUID = 'O3bVSduLpR9jR8dGhwv-nQ939xXIt7_m9JJH35hfcBddGr6oT5OB5TDdyLNyliYM53nfOw7Hs_5Wpg'

# cursor.execute("""SELECT * FROM matches 
#                        WHERE region = :region COLLATE NOCASE AND gameEndTimestamp BETWEEN :start AND :end
#                        """, {'region': region, 'start': start, 'end': end})
# matchListRows = cursor.fetchall()
# matchList = [dict(row) for row in matchListRows]
# with open('tables.txt', 'w') as f:
#     for i in matchList:
#         print(i,file=f)
#     print(len(matchList),file=f)


cursor.execute("""SELECT * FROM accounts
               """)
matchListRows = cursor.fetchall()
matchList = [dict(row) for row in matchListRows]
with open('tables.txt', 'w') as f:
    for i in matchList:
        print(i['name'], i['tag'], i['icon'], file = f)
cursor.close()
connection.close()