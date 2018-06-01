/* eslint camelcase: "off",
babel/new-cap: "off",
class-methods-use-this: "off" */

import _ from 'lodash';
import perlin from 'perlin-noise';
import * as log from 'loglevel';

export const ISO_RATIO = 1.7316;
export const X_SHIFT = 15;
export const Y_SHIFT = X_SHIFT / ISO_RATIO;

const ISO_SHIFT = {
  x: X_SHIFT,
  y: Y_SHIFT
};

const SEED_LENGTH = 1000;
const NOISE_SIDE_LENGTH_X = 32;
const NOISE_SIDE_LENGTH_Y = 16;

/**
 * A handy service to translate draw commands into their isometric grid equivalent
 */
class ShapesService {
  constructor() {
    this._seed = _.times(SEED_LENGTH, () => _.random(0, 1, true));
    this._noise = perlin.generatePerlinNoise(
      NOISE_SIDE_LENGTH_X,
      NOISE_SIDE_LENGTH_Y,
      {
        octaveCount: 3,
        persistence: 0.05,
        amplitude: 0.1
      }
    );
    this._noiseRows = _.chunk(this._noise, NOISE_SIDE_LENGTH_X);
    this._noiseSquare = this.getSquareAtOffset();
  }
  getSquareAtOffset(index = 0) {
    if (index > NOISE_SIDE_LENGTH_X - NOISE_SIDE_LENGTH_Y) {
      log.err('Square offset exceeds the width of the noise.');
      return this._noiseSquare;
    }
    const rows = this._noiseRows.map(row => _.slice(row, index, index + NOISE_SIDE_LENGTH_Y));
    return _.flatten(rows);
  }
  seed(i = -1) {
    return i > -1 && i < SEED_LENGTH ? this._seed[i] : this._seed;
  }
  noiseAt(i) {
    // index = y * width + height
    // const index = (y * NOISE_SIDE_LENGTH) + x;
    return this._noiseSquare[i];
  }
  _shiftX(x) {
    return ISO_SHIFT.x * x;
  }
  _shiftY(y) {
    return ISO_SHIFT.y * y;
  }
  draw(arr) {
    return arr.join(' ');
  }
  translate(x, y) {
    return `translate(${this._shiftX(x)}, ${this._shiftY(y)})`;
  }
  translateXY(x, y) {
    return {
      x: this._shiftX(x),
      y: this._shiftY(y)
    };
  }
  M(x, y) {
    return `M${this._shiftX(x)},${this._shiftY(y)}`;
  }
  z() {
    return 'z';
  }
  l_u(y) {
    return `v${-this._shiftY(y)}`;
  }
  l_d(y) {
    return `v${this._shiftY(y)}`;
  }
  l_l(y) {
    return `h${-this._shiftY(y)}`;
  }
  l_r(y) {
    return `h${this._shiftY(y)}`;
  }
  l_ul(x, y = x) {
    return `l${this._shiftX(-x)},${-this._shiftY(y)}`;
  }
  l_ur(x, y = x) {
    return `l${this._shiftX(x)},${-this._shiftY(y)}`;
  }
  l_dl(x, y = x) {
    return `l${this._shiftX(-x)},${this._shiftY(y)}`;
  }
  l_dr(x, y = x) {
    return `l${this._shiftX(x)},${this._shiftY(y)}`;
  }
  c_ur(r) {
    return `q ${this._shiftX(r * 0.5)},${-this._shiftY(r * 0.5)} ${this._shiftX(r)},0`;
  }
  c_ul(r) {
    return `q ${this._shiftX(-r * 0.5)},${-this._shiftY(r * 0.5)} ${this._shiftX(-r)},0`;
  }
  c_dl(r) {
    return `q ${this._shiftX(-r * 0.5)},${this._shiftY(r * 0.5)} ${this._shiftX(-r)},0`;
  }
  c_dr(r) {
    return `q ${this._shiftX(r * 0.5)},${this._shiftY(r * 0.5)} ${this._shiftX(r)},0`;
  }
  c_lu(r) {
    return `q ${this._shiftX(-r * 0.5)},${this._shiftY(-r * 0.5)} 0,${this._shiftY(-r)}`;
  }
  c_ld(r) {
    return `q ${this._shiftX(-r * 0.5)},${this._shiftY(r * 0.5)} 0,${this._shiftY(r)}`;
  }
  c_ru(r) {
    return `q ${this._shiftX(r * 0.5)},${this._shiftY(-r * 0.5)} 0,${this._shiftY(-r)}`;
  }
  c_rd(r) {
    return `q ${this._shiftX(r * 0.5)},${this._shiftY(r * 0.5)} 0,${this._shiftY(r)}`;
  }
  blockAllSides(length = 4, height = 1) {
    const pathData = [
      this.draw([
        this.M(0, 0),
        this.l_ur(length),
        this.l_u(height),
        this.l_dl(length),
        this.z()
      ]),
      this.draw([
        this.M(length, -length),
        this.l_dr(length),
        this.l_u(height),
        this.l_ul(length),
        this.z()
      ])
    ];
    return pathData.concat(this.block(length, height));
  }
  rect(width = 4, depth = 2, height = 1) {
    const pathData = [
      this.draw([
        this.M(0, -height),
        this.l_ur(width),
        this.l_dr(depth),
        this.l_dl(width),
        this.l_ul(depth),
        this.z()
      ]),
      this.draw([
        this.M(0, 0),
        this.l_dr(depth),
        this.l_u(height),
        this.l_ul(depth),
        this.z()
      ]),
      this.draw([
        this.M(depth, depth),
        this.l_ur(width),
        this.l_u(height),
        this.l_dl(width),
        this.z()
      ])
    ];
    return pathData;
  }
  block(length = 4, height = 1) {
    const pathData = [
      this.draw([
        this.M(0, -height),
        this.l_ur(length),
        this.l_dr(length),
        this.l_dl(length),
        this.l_ul(length),
        this.z()
      ]),
      this.draw([
        this.M(0, 0),
        this.l_dr(length),
        this.l_u(height),
        this.l_ul(length),
        this.z()
      ]),
      this.draw([
        this.M(length, length),
        this.l_ur(length),
        this.l_u(height),
        this.l_dl(length),
        this.z()
      ])
    ];
    return pathData;
  }
  square(length = 4) {
    const pathData = [
      this.draw([
        this.M(0, 0),
        this.l_ur(length),
        this.l_dr(length),
        this.l_dl(length),
        this.l_ul(length),
        this.z()
      ])
    ];
    return pathData;
  }
}

export const shapesService = new ShapesService();
