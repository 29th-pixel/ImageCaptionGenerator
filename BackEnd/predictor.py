import cv2
import numpy as np
from keras.applications.resnet import ResNet50
from keras.layers import Dense, LSTM, TimeDistributed, Embedding, Activation, RepeatVector, Concatenate
from keras.models import Sequential, Model
import cv2
from keras_preprocessing.sequence import pad_sequences
from tqdm import tqdm


class predict:
    def __init__(self, vocabPath, weightPath) -> None:
        self.vocab = np.load(vocabPath, allow_pickle=True)
        self.vocab = self.vocab.item()
        self.inv_vocab = {v: k for k, v in self.vocab.items()}
        embedding_size = 128
        vocab_size = len(self.vocab)
        self.max_len = 40

        image_model = Sequential()

        image_model.add(
            Dense(embedding_size, input_shape=(2048,), activation='relu'))
        image_model.add(RepeatVector(self.max_len))

        language_model = Sequential()

        language_model.add(Embedding(input_dim=vocab_size,
                                     output_dim=embedding_size, input_length=self.max_len))
        language_model.add(LSTM(256, return_sequences=True))
        language_model.add(TimeDistributed(Dense(embedding_size)))

        conca = Concatenate()([image_model.output, language_model.output])
        x = LSTM(128, return_sequences=True)(conca)
        x = LSTM(512, return_sequences=False)(x)
        x = Dense(vocab_size)(x)
        out = Activation('softmax')(x)
        self.model = Model(
            inputs=[image_model.input, language_model.input], outputs=out)

        self.model.compile(loss='categorical_crossentropy',
                           optimizer='RMSprop', metrics=['accuracy'])

        self.model.load_weights(weightPath)

        print("="*150)
        print("MODEL LOADED")

        self.resnet = ResNet50(include_top=False, weights='imagenet',
                               input_shape=(224, 224, 3), pooling='avg')
        print("="*150)
        print("RESNET MODEL LOADED")

    def prediction(self, imgPath):
        # global model, resnet, vocab, inv_vocab

        # print("="*50)
        # print("IMAGE SAVED")

        image = cv2.imread(imgPath)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        image = cv2.resize(image, (224, 224))

        image = np.reshape(image, (1, 224, 224, 3))

        incept = self.resnet.predict(image).reshape(1, 2048)

        print("="*50)
        print("Predict Features")

        text_in = ['startofseq']

        final = ''

        print("="*50)
        print("GETING Captions")

        count = 0
        while tqdm(count < 20):

            count += 1

            encoded = []
            for i in text_in:
                encoded.append(self.vocab[i])

            padded = pad_sequences(
                [encoded], maxlen=self.max_len, padding='post', truncating='post').reshape(1, self.max_len)

            sampled_index = np.argmax(self.model.predict([incept, padded]))

            sampled_word = self.inv_vocab[sampled_index]
            if sampled_word != 'endofseq':
                final = final + ' ' + sampled_word

            text_in.append(sampled_word)
        print(final)


# if __name__ == "__main__":
#     p = predict('D:/Learn/Projects/ImageCaptionGenerator/BackEnd/Model/vocab.npy',
#                 'D:/Learn/Projects/ImageCaptionGenerator/BackEnd/Model/mine_model_weights.h5')
#     p.prediction('D:/b8b237ee-7cfe-4eab-b79b-dac389707899.jpg')
