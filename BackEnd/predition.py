from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
import cv2
import numpy as np
import os
import matplotlib as plt

modelPath = os.path.abspath(os.path.join(
    os.getcwd(), os.pardir)).replace('\\', '/')

model = load_model(modelPath +
                   '/ImageCaptionGenerator/BackEnd/Model/72percentmodel.h5')


def prediction(imgPath):
    test_img = cv2.imread(imgPath)

    test_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)
    test_img = cv2.resize(test_img, (299, 299))
    test_img = np.reshape(test_img, (1, 299, 299, 3))

    test_feature = model.predict(test_img).reshape(1, 2048)

    test_img = cv2.imread(imgPath)
    test_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)

    text_inp = ['startofseq']

    count = 0
    caption = ''
    while count < 25:
        count += 1
        encoded = []
        for i in text_inp:
            encoded.append(new_dict[i])

        encoded = [encoded]

        encoded = pad_sequences(encoded, padding='post',
                                truncating='post', maxlen=MAX_LEN)

        prediction = np.argmax(model.predict([test_feature, encoded]))

        sampled_word = inv_dict[prediction]

        caption = caption + ' ' + sampled_word

        if sampled_word == 'endofseq':
            break

        text_inp.append(sampled_word)

    plt.figure()
    plt.imshow(test_img)
    plt.xlabel(caption)


if __name__ == "__main__":
    prediction()
