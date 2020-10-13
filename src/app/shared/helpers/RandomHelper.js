export class RandomHelper {

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRandomId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    
}