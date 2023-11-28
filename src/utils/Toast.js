import T from 'react-native-simple-toast';

class Toast {
    show(message, duration = T.SHORT) {
        T.show(message, duration);
    }
}

export default new Toast();
