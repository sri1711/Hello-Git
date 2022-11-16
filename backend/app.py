from flask import Flask, request, Response
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibmcloudant.cloudant_v1 import CloudantV1,Document
from ibm_cloud_sdk_core import ApiException
import cv2
import mediapipe as mp

import json

import cv2


app = Flask(__name__)

API_KEY = "f1_JHlznkRh8hLlfygIH7-VMqQpOOFEvqi3ZADOKIKrw"

CLOUDANT_URL="https://2b7a22a1-e249-469f-ab99-a0e004ca9ff2-bluemix.cloudantnosqldb.appdomain.cloud"
# CLOUDANT_APIKEY="9_njsNZs9YSwtsmHglVYSM6ue_ivE4E73k5SlRR7PbRP"

authenticator = IAMAuthenticator(API_KEY)
service = CloudantV1(authenticator=authenticator)
service.set_service_url(CLOUDANT_URL)

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
        ret, jpeg = cv2.imencode('.jpg',frame)
        return jpeg.tobytes()

        # while True:
            # framergb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # result = hands.process(framergb)
            # hand_landmarks = result.multi_hand_landmarks
            # if hand_landmarks:
            #     for handLMs in hand_landmarks:
            #         x_max = 0
            #         y_max = 0
            #         x_min = w
            #         y_min = h
            #         for lm in handLMs.landmark:
            #             x, y = int(lm.x * w), int(lm.y * h)
            #             if x > x_max: 
            #                 x_max = x
            #             if x < x_min:
            #                 x_min = x
            #             if y > y_max:
            #                 y_max = y
            #             if y < y_min:
            #                 y_min = y
            #         cv2.rectangle(frame, (x_min-20, y_min-15), (x_max+20, y_max+20), (0, 255, 0), 2)
            #         # cv2.imwrite("dataset/image."+str(1)+'.'+str(sampleNum)+".jpg",framergb[y_min-15:y_max+20,x_min-20:x_max+20])
                    # sampleNum = sampleNum + 1
                    # cv2.imshow('frame',frame)

        #             mp_drawing.draw_landmarks(frame, handLMs, mphands.HAND_CONNECTIONS)
            # cv2.waitKey(0)
            # ret, jpeg = cv2.imencode('.jpg',frame)
            # return jpeg.tobytes()

ob = VideoCamera()      

@app.route("/api/add", methods = ['POST'])
def add():
    result = request.get_json()
    print(type(result))
    print("The data is " + result["firstName"])
    return "The data is" + result["firstName"]


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def releaseCamera(camera):
    camera.clear()

@app.route("/api/video_feed")
def video_feed():
    return Response(gen(ob),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/api/release")
def release():
    return Response(releaseCamera(ob))



app.run(debug=True)