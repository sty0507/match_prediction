# 오라클 호스트이름: localhost, 포트 : 1521, SID : xe
# 사용자이름 : c##oracle_test
# 비밀번호 : 1234

# 오라클 연동 및 접속
import cx_Oracle
import pandas as pd
# dsn=cx_Oracle.makedsn('localhost',1521,'xe')
db=cx_Oracle.connect('c##oracle_test','1234', 'localhost/xe')

cursor=db.cursor()

cursor.execute("""select name from test""")

mr = cursor.fetchall()
for x in mr:
    print(x)

db.close()


# row=cursor.fetchall()
# colname=cursor.description
# col=[]

# for i in colname:
#     col.append(i[0])

# pandas를 사용한 데이터 프레임 형식으로 변환
# emp=pd.DataFrame(row,columns=col)
# print(emp)