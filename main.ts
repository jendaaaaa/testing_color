/**
 * OLED kamkoliv
 * 
 * COLOR doprava na 15
 */
apds9960.Init(11.12);
apds9960.ColorMode();
pins.digitalWritePin(DigitalPin.P15, 1);
// OLED.init(128, 64);
let strip = neopixel.create(DigitalPin.P0, 8, NeoPixelMode.RGB);

let COL_BLUE = 216;
let COL_PINK = -14;
let COL_GREEN = 150;
let COL_ORANGE = 0;
let COL_YELLOW = 20;
let ERROR = 10;
let LIGHT_TRESHOLD = 300;
let ARR_COL = [COL_BLUE, COL_PINK, COL_GREEN, COL_YELLOW];

let color = 60;
let colorNeopixel = 0;
let ch_r = 0;
let ch_g = 0;
let ch_b = 0;
let ambient = 0;
let colorText = "";
let numberText = "";

input.onButtonPressed(Button.A, function() {
    basic.showNumber(apds9960.Read_Red());
})

basic.forever(function () {
    if (apds9960.Data_Ready() == 1) {
        // OLED.writeStringNewLine(colorText);
        // OLED.newLine()
        // OLED.writeStringNewLine(convertToText(color));
        // OLED.newLine()
        // OLED.newLine()
        // OLED.newLine()
        // OLED.newLine()
        // OLED.writeStringNewLine(convertToText(ambient));
    }
})

basic.forever(function() {
    if (apds9960.Data_Ready()){
        color = apds9960.ReadColor();
        ambient = apds9960.Read_Ambient();
        // ambient = Math.map(apds9960.Read_Ambient(), 0, 65535, 0, 255);
        // ch_r = Math.map(apds9960.Read_Red(), 0, 65535, 0, 255)/ambient*255;
        // ch_g = Math.map(apds9960.Read_Green(), 0, 65535, 0, 255)/ambient*255;
        // ch_b = Math.map(apds9960.Read_Blue(), 0, 65535, 0, 255)/ambient*255;
        // colorNeopixel = neopixel.rgb(ch_r, ch_g, ch_b);
        strip.showColor(colorNeopixel);
    }
    if (ambient <= LIGHT_TRESHOLD){
        colorText = "NO COLOR            ";
        colorNeopixel = neopixel.rgb(0, 0, 0);
    } else {
        if (color <= COL_GREEN + ERROR && color >= COL_GREEN - ERROR){
            colorText = "GREEN               ";
            colorNeopixel = neopixel.rgb(28, 238, 0);
        } else if (color <= COL_BLUE + ERROR && color >= COL_BLUE - ERROR){
            colorText = "BLUE                ";
            colorNeopixel = neopixel.rgb(0, 203, 255);
        } else if (color <= COL_ORANGE + ERROR && color >= COL_ORANGE - ERROR) {
            colorText = "ORANGE              ";
            colorNeopixel = neopixel.rgb(255, 34, 0);
        } else if (color <= COL_YELLOW + ERROR && color >= COL_YELLOW - ERROR) {
            colorText = "YELLOW              ";
            colorNeopixel = neopixel.rgb(255, 130, 0);
        } else if (color <= COL_PINK + ERROR && color >= COL_PINK - ERROR) {
            colorText = "PINK                ";
            colorNeopixel = neopixel.rgb(255, 0, 59);
        } else {
            colorText = "NO COLOR            ";
            colorNeopixel = neopixel.rgb(0, 0, 0);
        }
    }
})