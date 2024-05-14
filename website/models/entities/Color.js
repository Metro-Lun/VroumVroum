// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class Color {
    static  contrastFactor = 50;
    static  rBrightVal = 0.21;
    static  gBrightVal = 0.72;
    static  bBrightVal = 0.07;
    
    static  hexRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{0,2})$/i;
    static get transparent() {
        return new Color(0, 0, 0, 0);
    }
    static get white() {
        return new Color(255, 255, 255);
    }
    static get black() {
        return new Color(0, 0, 0);
    }
    static get grey() {
        return new Color('#d2d9d8');
    }
    static get lightGrey() {
        return new Color('#f4f6f6');
    }
    static get darkGrey() {
        return new Color('#949494');
    }
    static get red() {
        return new Color(255, 0, 0);
    }
    static get green() {
        return new Color(0, 255, 0);
    }
    static get blue() {
        return new Color(0, 0, 255);
    }
    
    static get rdRed() {
        return new Color('#dd385b');
    }
    static get rdLightRed() {
        return new Color('#de7287');
    }
    static get rdLighterRed() {
        return new Color('#f1dadd');
    }
    static get rdGrey() {
        return new Color('#d2d9d8');
    }
    static get rdLightGrey() {
        return new Color('#f4f6f6');
    }
    static get rdBlack() {
        return new Color('#2b363f');
    }
    static get rdTeal() {
        return new Color('#66bcab');
    }
    static get rdBlue() {
        return new Color('#2b363f');
    }
    
    hexVal;
    strVal;
    rgbVal;
    rgbaVal;
    invVal;
    pBrightVal;
    
    rVal;
    gVal;
    bVal;
    aVal;
    
    get hex() {
        return this.hexVal;
    }
    set hex(hex) {
        this.setHex(hex);
    }
    
    get str() {
        return this.strVal;
    }
    
    get rgb() {
        return this.rgbVal;
    }
    set rgb(rgb) {
        this.setRgb(rgb[0] || 0, rgb[1] || 0, rgb[2] || 0, 1);
    }
    get rgba() {
        return this.rgbaVal;
    }
    set rgba(rgba) {
        this.setRgb(rgba[0] || 0, rgba[1] || 0, rgba[2] || 0, rgba[3] || 1);
    }
    
    get inverted() {
        return this.invVal;
    }
    get brightness() {
        return this.pBrightVal;
    }
    
    get r() {
        return this.rVal;
    }
    set r(r) {
        this.rVal = r;
        this.validate();
    }
    get g() {
        return this.gVal;
    }
    set g(g) {
        this.gVal = g;
        this.validate();
    }
    get b() {
        return this.bVal;
    }
    set b(b) {
        this.bVal = b;
        this.validate();
    }
    get a() {
        return this.aVal;
    }
    set a(a) {
        this.aVal = a;
        this.validate();
    }
    
    // tslint:disable: no-bitwise
    static rgbFromString(str){
        const rgb = [0, 0, 0];
        if (str.length === 0) {
            return rgb;
        }
        
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 255;
            rgb[i] = value;
        }
        return rgb;
    }
    // tslint:enable: no-bitwise
    
    static hexFromString(str) {
        return Color.rgbToHex(...Color.rgbFromString(str));
    }
    
    static hexToRgba(hex){
        const result = Color.hexRegEx.exec(hex);
        
        if (result === null) {
            throw new Error('Invalid hex value.');
        }
        
        const alpha = parseInt(result[4] || 'ff', 16) / 255;
        
        return result ? [parseInt(result[1], 16), parseInt(result[2] || '00', 16), parseInt(result[3] || '00', 16), alpha] : [];
    }
    
    static rgbToHex(r, g, b, a = 1) {
        return `#${Color.numToHex(r)}${Color.numToHex(g)}${Color.numToHex(b)}${Color.numToHex(Math.floor(a * 255))}`;
    }
    
    static randomRgb() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return [r, g, b];
    }
    
    static randomRgba(){
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const a = Math.floor(Math.random() * 100) / 100;
        return [r, g, b, a];
    }
    
    static randomHex() {
        const rgb = Color.randomRgb();
        return Color.rgbToHex(rgb[0], rgb[1], rgb[2]);
    }
    
    static numToHex(num) {
        const hex = num.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }
    
    constructor(rOrHex , string = 0, g = 0, b = 0, a = 1) {
        this.setRgb(rOrHex, g, b, a);
    }
    
    validate() {
        this.clamp();
        
        this.hexVal = this.toHex();
        this.strVal = this.toString();
        
        this.rgbVal = [this.rVal, this.gVal, this.bVal, this.aVal];
        this.invVal = [255 - this.rVal, 255 - this.gVal, 255 - this.bVal];
        this.pBrightVal = (Color.rBrightVal * this.rVal + Color.gBrightVal * this.gVal + Color.bBrightVal * this.bVal) / 3;
    }
    
    clamp(){
        for (const val of ['rVal', 'gVal', 'bVal']) {
            this[val] = Math.floor(this[val]);
            if (this[val] > 255) {
                this[val] = 255;
            } else if (this[val] < 0) {
                this[val] = 0;
            }
        }
        
        if (this.aVal > 1) {
            this.aVal = 1;
        } else if (this.aVal < 0) {
            this.aVal = 0;
        }
    }
    
    setHex(hex) {
        const rgba = Color.hexToRgba(hex);
        this.rVal = rgba[0] || 0;
        this.gVal = rgba[1] || 0;
        this.bVal = rgba[2] || 0;
        this.aVal = rgba[3] || 1;
        
        this.validate();
    }
    
    setRgb(r, g, b, a = 1){
        this.rVal = r;
        this.gVal = g;
        this.bVal = b;
        this.aVal = a;
        
        this.validate();
    }
    
    invert(){
        this.rgb = this.invVal;
    }
    
    toRgbString() {
        return `rgb(${this.rVal}, ${this.gVal}, ${this.bVal});`;
    }
    
    toRgbaString() {
        return `rgba(${this.rVal}, ${this.gVal}, ${this.bVal}, ${this.aVal});`;
    }
    
    toHex() {
        return Color.rgbToHex(this.rVal, this.gVal, this.bVal, this.aVal);
    }
    
    shouldContrast() {
        return this.pBrightVal < Color.contrastFactor;
    }
    
    distanceFrom(color) {
        const rDist = this.rVal - color.r;
        const gDist = this.gVal - color.g;
        const bDist = this.bVal - color.b;
        return (rDist + gDist + bDist) / 3;
    }
    
    darken(amount) {
        return new Color(this.r - amount, this.g - amount, this.b - amount);
    }
    
    brighten(amount) {
        return new Color(this.r + amount, this.g + amount, this.b + amount);
    }
    
    transparentize(opacity) {
        return new Color(this.r, this.g, this.b, opacity);
    }
}
