from distutils.sysconfig import customize_compiler
import cx_Oracle
db=cx_Oracle.connect('c##oracle_test','1234', 'localhost/xe')

cursor = db.cursor()

cursor.execute("CREATE TABLE MATCH (HomeTeam varchar2(50),AwayTeam varchar2(50),Competition varchar2(50),match_status varchar2(50),Live_Score_HomeTeam varchar2(40),Live_Score_AwayTeam varchar2(40))")
db.commit()
db.close()
cursor.close()