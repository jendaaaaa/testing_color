namespace ColorConverter {
    /**
     * Converts RGB color values to HSL color values.
     * @param red The red component of the RGB color (0-255).
     * @param green The green component of the RGB color (0-255).
     * @param blue The blue component of the RGB color (0-255).
     * @returns An array of HSL color values (hue: 0-360, saturation: 0-100, lightness: 0-100).
     */
    //% block="convert RGB to HSL|red %red|green %green|blue %blue"
    export function rgbToHsl(red: number, green: number, blue: number): [number, number, number] {
        const r = red / 255;
        const g = green / 255;
        const b = blue / 255;

        const max = Math.max(Math.max(r, g), b);
        const min = Math.min(Math.min(r, g), b);
        const diff = max - min;

        let h = 0;
        let s = 0;
        let l = (max + min) / 2;

        if (diff !== 0) {
            s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / diff + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / diff + 2;
                    break;
                case b:
                    h = (r - g) / diff + 4;
                    break;
            }

            h /= 6;
        }

        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }
}