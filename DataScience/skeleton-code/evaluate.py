import sys
import tensorflow as tf
import os
#Get Arguments passed in
img_dir = os.path.join(
    sys.argv[1]
)
#Read Image 
import cv2
img = cv2.imread(img_dir, cv2.IMREAD_UNCHANGED)
print('Original Dimensions : ',img.shape)
width = 32
height = 32
# resize image
dim = (width, height)
resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
print('Resized Dimensions : ',resized.shape)
 
#cv2.imshow("Resized image", resized)
#cv2.waitKey(0)
#cv2.destroyAllWindows()
#Resize Image
#Load Model
model = tf.keras.models.load_model('output\\hmodel.h5')
#make Prediction
probab = model.predict(resized.reshape(1,32,32,3)) # Set to a numpy array of correct input data.
#plt.imshow(resized)

probab_list = probab.tolist()[0]
label_names = ["Non-Ship","Ship"]
max_number = max(probab_list)
index = probab_list.index(max_number)
print("This was detected as being a",label_names[index])