import ibm_db,ibm_db_dbi
# conn_str='database=bludb;hostname=b1bc1829-6f45-4cd4-bef4-10cf081900bf.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;port=32304;protocol=tcpip;uid=pnf42623;pwd=F581rHVxDEmhkgML'
IBM_DB_CONN = ibm_db.connect("DATABASE=bludb;HOSTNAME=bpe61bfd0365e9u4psdglite.db2.cloud.ibm.com;PORT=32304;PROTOCOL=TCPIP;UID=pnf42623;PWD=F581rHVxDEmhkgML;", "", "")
CONN = ibm_db_dbi.Connection(IBM_DB_CONN)

create="create table mytable(id int, name varchar(50))"
ibm_db.exec_immediate(IBM_DB_CONN, create)

print(CONN.tables('pnf42623', '%'))
# print(ibm_db_conn)