export class RandomHelper {

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
}