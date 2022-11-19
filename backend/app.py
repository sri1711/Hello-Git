from flask import Flask, request, Response
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibmcloudant.cloudant_v1 import CloudantV1,Document
from ibm_cloud_sdk_core import ApiException
import cv2
import uuid
import ibm_db,ibm_db_dbi
import hashlib
import smtplib, random
from email.message import EmailMessage
import mediapipe as mp
import cv2
import mediapipe as mp
from keras.models import load_model
import numpy as np

import json

import cv2

otp = 1234

change_background_mp = mp.solutions.selfie_segmentation
change_bg_segment = change_background_mp.SelfieSegmentation()

model = load_model('model_sign_predict')

loc = None
Char_Map = {0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: 'A', 10: 'B', 11: 'C', 12: 'D',
                  13: 'E', 14: 'F', 15: 'G', 16: 'H', 17: 'I', 18: 'J', 19: 'K', 20: 'L', 21: 'M', 22: 'N', 23: 'O', 24: 'P',
                  25: 'Q', 26: 'R', 27: 'S', 28: 'T', 29: 'U', 30: 'V', 31: 'W', 32: 'X', 33: 'Y', 34: 'Z'}

app = Flask(__name__)


# API_KEY = "f1_JHlznkRh8hLlfygIH7-VMqQpOOFEvqi3ZADOKIKrw"

# CLOUDANT_URL="https://2b7a22a1-e249-469f-ab99-a0e004ca9ff2-bluemix.cloudantnosqldb.appdomain.cloud"


IBM_DB_CONN = ibm_db.connect("DATABASE=bludb;HOSTNAME=b1bc1829-6f45-4cd4-bef4-10cf081900bf.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;PORT=32304;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=pnf42623;PWD=F581rHVxDEmhkgML;", "", "")
conn = ibm_db_dbi.Connection(IBM_DB_CONN)
# CLOUDANT_APIKEY="9_njsNZs9YSwtsmHglVYSM6ue_ivE4E73k5SlRR7PbRP"

# authenticator = IAMAuthenticator(API_KEY)
# service = CloudantV1(authenticator=authenticator)
# service.set_service_url(CLOUDANT_URL)

# Add a Document to IBM cloudant

# try:
#     put_database_result = service.put_database(db="orders").get_result()
#     if put_database_result["ok"]:
#         print("orders db created")
# except Exception as e:
#     print(e)

# # example_doc_id = "example"

# example_document: Document = Document()
# example_document.name = "Vijay"
# example_document.joined = "16-11-2022"
# create_document_response = service.post_document(
#     db="orders",
#     document=example_document
# ).get_result()

# example_document.rev = create_document_response["rev"]
# print(f'You have created the document:\n{example_document}')


#Gather Database information

# server_information = service.get_server_information().get_result()
# print(f'Server Version: {server_information["version"]}')

# db_name = "orders"

# db_information = service.get_database_information(
#     db=db_name
# ).get_result()

# print(db_information)

# document_count = db_information["doc_count"]

# print(f'Document count in \"{db_information["db_name"]}\" '
#       f'database is {document_count}.')

# document_example = service.get_document(
#     db=db_name,
#     doc_id="example"
# ).get_result()

# print(f'Document retrieved from database:\n'
#       f'{json.dumps(document_example, indent=2)}')


def predict(img):
    prediction = model.predict(img.reshape(1, 128, 128, 1))
    
    #print(prediction)
    for pred in prediction:
        loc = np.where(pred == max(pred))
    print(Char_Map[loc[0][0]])


    

def load_image(img):
    
    img = cv2.cvtColor(img , cv2.COLOR_BGR2RGB)
    img = background_removal_mask(img)
    img = cv2.resize(img , (128,128))
    #print(type(img))
    return img

def background_removal_mask(image):
    RGB_sample_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    result = change_bg_segment.process(RGB_sample_img)
    return result.segmentation_mask

sampleNum = 1
class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
    def clear(self):
        print("In clear function")
        self.video.release()

    def get_frame(self):
        _, frame = self.video.read()
        # h, w, c = frame.shape
        upper_left = (300, 100)
        bottom_right = (600, 400)
        frame = cv2.flip(frame, 1)
        r = cv2.rectangle(frame, upper_left, bottom_right, (200, 50, 200), 5)
        rect_img = frame[upper_left[1] : bottom_right[1], upper_left[0] : bottom_right[0]]
        
        sketcher_rect = rect_img
        sketcher_rect = load_image(sketcher_rect)
        #print(type(sketcher_react))
        
        result = ''
        if sketcher_rect is not None:
            if cv2.waitKey(1) & 0xFF == ord('p'):
                predict(sketcher_rect)
            cv2.imshow('new_frame',sketcher_rect)


        ret, jpeg = cv2.imencode('.jpg',frame)
        
        return jpeg.tobytes()


ob = VideoCamera()      


# @app.route("/api/get_result",methods = ['GET','POST'])
# def get_result():
#     global loc
#     if loc is not None:
#         return Response(Char_Map[loc[0][0]],mimetype="text")
    
#     return Response("No precition",mimetype="text")

@app.route("/api/add", methods = ['GET','POST'])
def add():
    result = request.get_json()
    id = uuid.uuid4().int
    fname = result["firstName"]
    lname = result["lastName"]
    birthDate = result["birthDate"]
    email = result["email"]
    password = result["password"]
    authProvider = result["authProvider"]

    row = checkEmail(email)

    # fetch_stmt = f"""SELECT * FROM "PNF42623"."SIGNLANGUAGE" WHERE "EMAIL" = '{email}';"""
    # print(fetch_stmt)
    # stmt = ibm_db.prepare(IBM_DB_CONN, fetch_stmt)
    # cur = conn.cursor()
    # cur.execute(fetch_stmt)
    # row = cur.fetchall()
    if(len(row)!=0):
        print("Email id already exists")
        return {"failure" : "Email id already exists"}
    else:
        password = getHashForPassword(password)
        sql=f"""INSERT INTO "PNF42623"."SIGNLANGUAGE" VALUES('{fname}','{lname}','{birthDate}','{email}','{password}','{authProvider}')"""
        reg_user = ibm_db.exec_immediate(IBM_DB_CONN,sql)
        print("User Registered successfully")
        return {"success": "Details added successfully"}

def checkEmail(email):
    fetch_stmt = f"""SELECT * FROM "PNF42623"."SIGNLANGUAGE" WHERE "EMAIL" = '{email}';"""
    print(fetch_stmt)
    # stmt = ibm_db.prepare(IBM_DB_CONN, fetch_stmt)
    cur = conn.cursor()
    cur.execute(fetch_stmt)
    row = cur.fetchall()
    return row

@app.route("/api/login", methods = ['POST'])
def login():
    result = request.get_json()
    email = result["email"]
    password = result["password"]

    row = checkEmail(email)
    print(row)
    if(len(row)!=0):
        print("Email ID validated")
        stored_pass = row[0][4]
        
        if(getHashForPassword(password) == stored_pass):
            print("Password success")
            print("User logged in successfully")
        else:
            print("User login failed due to invalid password")

    return {"success": "User Logged In Successfully"}

@app.route('/api/sendEmail',methods = ['POST'])
def sendEmail():
    result = request.get_json()
    sender_email = "pnt2022tmid02287@gmail.com"
    mailMessage = getMailMessage()
    print(mailMessage)
    message = generateEmail(sender_email,result["email"],mailMessage)
    return message

@app.route('/api/changePass',methods=['POST'])
def changePass():
    result = request.get_json()
    update_stmt =  f"""UPDATE "PNF42623"."SIGNLANGUAGE" SET "PASSWORD" = '{result["newPass"]}' WHERE "EMAIL" = '{result["email"]}';"""
    ibm_db.exec_immediate(IBM_DB_CONN,update_stmt)
    return {"success":"Password changed successfully" }

@app.route('/api/validOTP',methods=['POST'])
def validOTP():
    result = request.get_json()
    print("Valid OTP: " + result["OTP"])
    global otp
    if(otp == int(result["OTP"])):
        return {"success":"OTP Validated successfully"}
    else:
        print(type(otp),int(result["OTP"]))
        return {"failure":"Incorrect OTP"}

def generateOTP():
    tempOTP = random.random()
    return round(tempOTP * 100000)


def generateMailContent(OTP):
    content = '''
    Please use the verification code below to sign in.
    {0}
    If you didn’t request this, you can ignore this email.
    Thanks,
    The sigmoid'''.format(OTP)
    # content = content.encode('utf-8')
    return content

def getMailMessage():
    global otp
    otp = generateOTP()
    print("OTP in getMailMessage " + str(otp))
    content = generateMailContent(otp)
    return content

def generateEmail(sender_email, receiver_email, content):
    msg = EmailMessage()
    msg.set_content(content)
    sender_password = "quurwsaeefcwkvpa"
    msg['Subject'] = 'OTP for Sigmoid'
    msg['From'] = sender_email
    msg['To'] = receiver_email
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login(sender_email, sender_password)
    s.send_message(msg)
    s.quit()
    return {"success":"Email sent successfully"}



def getHashForPassword(password):
    return hashlib.md5(password.encode()).hexdigest()

def isPasswordCorrect(oldPassword, newPassword):
    return oldPassword == newPassword
    

def create_table():
    sql='''create table signLanguage(id int, first_name varchar(50),
     last_name varchar(50), birthDate varchar(50), email varchar(50), password varchar(100), authProvider varchar(50) )'''
    stmt = ibm_db.prepare(IBM_DB_CONN,sql)
    ibm_db.execute(stmt)

def gen(camera):
    while True:

        frame = camera.get_frame()
    
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

        # predicted = result
        
        
        # yield {"frame_details" : frame_details,
        # "predicted" : predicted}

    camera.video.release()
    cv2.destroyAllWindows()

def releaseCamera(camera):
    camera.clear()

@app.route("/api/video_feed", methods=['POST'])
def video_feed():

    return Response(gen(ob),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

    #  return Response("How are you",mimetype="text")

@app.route("/api/release")
def release():
    return Response(releaseCamera(ob))



app.run(debug=True)

# create_table()