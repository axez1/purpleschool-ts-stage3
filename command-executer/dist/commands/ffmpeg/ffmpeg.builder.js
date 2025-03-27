"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegBuilder = void 0;
class FfmpegBuilder {
    constructor() {
        this.options = new Map();
        this.options.set('-s:v', 'libx264');
    }
    input(inputPath) {
        this.inputPath = inputPath;
        return this;
    }
    setVideoSize(width, height) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }
    output(outputPath) {
        if (!this.inputPath) {
            throw new Error('Не задан параметр input');
        }
        const args = ['-i', this.inputPath];
        this.options.forEach((val, key) => {
            args.push(key);
            args.push(val);
        });
        args.push(outputPath);
        return args;
    }
}
exports.FfmpegBuilder = FfmpegBuilder;
