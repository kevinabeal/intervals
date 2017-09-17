///////////////////////////////////////////////////////////]
// IMPORTS ------------------------------------------------]
///////////////////////////////////////////////////////////]
import { Component, Input, OnInit } from '@angular/core';
import * as NoSleep from 'nosleep.js';
// import * as R from 'ramda';

const nosleep = new NoSleep();


///////////////////////////////////////////////////////////]
// COMPONENT ----------------------------------------------]
///////////////////////////////////////////////////////////]
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  /////////////////////////////////////////////////////////]
  // PUBLIC PROPERTIES ------------------------------------]
  public totalTime         = 20 * 60 * 1000;
  public intervals         = getFullIntervalList(intervals);
  public activeInterval    = this.intervals[0];

  public totalRemaining:    IRemaining;
  public intervalRemaining: IRemaining;


  /////////////////////////////////////////////////////////]
  // PUBLIC GETTERS & SETTERS -----------------------------]
  public get totalTimeRemaining() {
    return this._totalRemaining || this.totalTime;
  }

  public set totalTimeRemaining(mil: number) {
    this._totalRemaining = mil;
    this.totalRemaining.minutes = padNum(Math.floor((mil / 1000) / 60));
    this.totalRemaining.seconds = padNum((mil / 1000) % 60);
    this.totalRemaining.percent = (mil / this.totalTime) * 100;
  }


  public get intervalTimeRemaining() {
    return this._intervalRemaining || this.totalTime;
  }

  public set intervalTimeRemaining(mil: number) {
    this._intervalRemaining = mil;
    this.intervalRemaining.minutes = padNum(Math.floor((mil / 1000) / 60));
    this.intervalRemaining.seconds = padNum((mil / 1000) % 60);
    this.intervalRemaining.percent = (mil / this.activeInterval.length) * 100;
  }

  public get timerOn() {
    return this._timerOn;
  }

  public set timerOn(v: boolean) {
    this._timerOn = v;
    nosleep[v ? 'enable' : 'disable']();
  }


  /////////////////////////////////////////////////////////]
  // PRIVATE PROPERTIES -----------------------------------]
  private _totalTimer = this._createTotalTimer();
  private _totalRemaining: number;
  private _intervalTimer = this._createIntervalTimer();
  private _intervalRemaining: number;
  private _timerOn = false;


  /////////////////////////////////////////////////////////]
  // PUBLIC METHODS ---------------------------------------]
  // PUBLIC METHOD ----------------------------------------]
  public startTimer() {
    if (this.totalTime === this.totalTimeRemaining) {
      playExplosionSound();
    }

    this._totalTimer.start();
    this._intervalTimer.start();
    this.timerOn = true;
  }


  // PUBLIC METHOD ----------------------------------------]
  public pauseTimer() {
    this._totalTimer.stop();
    this._intervalTimer.stop();
    this.timerOn = false;
  }


  // PUBLIC METHOD ----------------------------------------]
  public resetTimer() {
    this.pauseTimer();

    this._setupTimers();
  }


  // PUBLIC METHOD ----------------------------------------]
  public ngOnInit() {
    this._setupTimers();
  }


  /////////////////////////////////////////////////////////]
  // PRIVATE METHODS --------------------------------------]
  // PRIVATE METHOD ---------------------------------------]
  private _setupTimers() {
    this.totalRemaining     = this._blankRemaining();
    this.intervalRemaining  = this._blankRemaining();
    this.totalTimeRemaining = this.totalTime;
    this._totalTimer        = this._createTotalTimer();
    this._intervalTimer     = this._createIntervalTimer();
    this.intervals          = getFullIntervalList(intervals);
    this.activeInterval     = this.intervals[0];
  }


  // PRIVATE METHOD ---------------------------------------]
  private _createTotalTimer() {
    return createTimer(this.totalTime, (mil) => {
      this.totalTimeRemaining = mil;
    }).onEnd(() => {
      this.timerOn = false;
      playAlarmSound(3);
    });
  }


  // PRIVATE METHOD ---------------------------------------]
  private _createIntervalTimer() {
    return createTimer(this.activeInterval.length, (mil) => {
      this.intervalTimeRemaining = mil;
    }).onEnd(() => {
      this.intervals.shift();

      if (this.intervals.length === 0) {
        return;
      }

      this.activeInterval = this.intervals[0];
      this._intervalTimer = this._createIntervalTimer();
      this._intervalTimer.start();
      playAlarmSound(3);
    });
  }


  // PRIVATE METHOD ---------------------------------------]
  private _blankRemaining() {
    return {
      minutes: '0',
      seconds: '00',
      percent: 0,
    };
  }
}


///////////////////////////////////////////////////////////]
// CONFIG -------------------------------------------------]
///////////////////////////////////////////////////////////]
const intervals = [{
  message: 'Warm Up & Stretch 🏃🏻',
  // length: .25 * 60 * 1000,
  length: 2.5 * 60 * 1000,
}, {
  message: 'Push to 70% of Your Max 💪🏻',
  length: .5 * 60 * 1000,
}, {
  message: 'Slow It Down 👌🏻',
  length: 2 * 60 * 1000,
}, {
  message: 'Push to 75% of Your Max 💪🏻',
  length: .5 * 60 * 1000,
}, {
  message: 'Slow It Down 👌🏻',
  length: 2 * 60 * 1000,
}, {
  message: 'Push to 80% of Your Max 💪🏻',
  length: .5 * 60 * 1000,
}, {
  message: 'Slow It Down 👌🏻',
  length: 2 * 60 * 1000,
}, {
  message: 'Push to 85% of Your Max 💪🏻',
  length: .5 * 60 * 1000,
}, {
  message: 'Slow It Down 👌🏻',
  length: 2 * 60 * 1000,
}, {
  message: 'Push to 90% of Your Max 💪🏻',
  length: .5 * 60 * 1000,
}, {
  message: 'Slow It Down 👌🏻',
  length: 2 * 60 * 1000,
}, {
  message: 'Push to 100% of Your Max 💪🏻',
  length: .5 * 60 * 1000,
}, {
  message: 'Slow It Down 👌🏻',
  length: 2 * 60 * 1000,
}, {
  message: 'Cool Down & Stretch 🏃🏻',
  length: 2.5 * 60 * 1000,
}];


///////////////////////////////////////////////////////////]
// PURE FUNCTIONS -----------------------------------------]
///////////////////////////////////////////////////////////]
// PURE FUNCTION ------------------------------------------]
function getFullIntervalList(arr: IInterval[]): IFullInterval[] {
  let elapsed = 0;

  return arr.map(({message, length}, i) => {
    const begin = elapsed;
    const end = (elapsed += length);

    return {
      message,
      length,
      begin,
      end,
    };
  });
}


// PURE FUNCTION ------------------------------------------]
function createTimer(mil: number, fn: Function) {
  let interval;
  let ending: Function;

  const timer = {
    start() {
      interval = setInterval(() => {
        mil -= 1000;

        if (mil <= 0) {
          clearInterval(interval);
          ending();
        } else {
          fn(mil);
        }
      }, 1000);
      return timer;
    },
    stop() {
      clearInterval(interval);
      return timer;
    },
    onEnd(endFn: Function) {
      ending = endFn;
      return timer;
    },
  };

  return timer;
}


// PURE FUNCTION ------------------------------------------]
function padNum(num: number) {
  return padStart(String(num), 2, '0');
}


// PURE FUNCTION ------------------------------------------]
function padStart(str: string, targetLength: number, padString: string) {
  // tslint:disable-next-line:no-bitwise
  targetLength = targetLength >> 0;
  padString = String(padString || ' ');
  if (str.length > targetLength) {
    return String(str);
  }else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(str);
  }
}


// PURE FUNCTION ------------------------------------------]
function playExplosionSound() {
  playSound('assets/explosion.mp3').volume = 0.25;
}


// PURE FUNCTION ------------------------------------------]
function playAlarmSound(beeps = 3) {
  const audio = playSound('assets/stopwatch-alarm.mp3');

  setTimeout(
    () => audio.pause(),
    beeps * 900,
  );
}


// PURE FUNCTION ------------------------------------------]
function playSound(src: string) {
  const audio = new Audio(src);

  audio.play();

  return audio;
}


///////////////////////////////////////////////////////////]
// INTERFACES ---------------------------------------------]
///////////////////////////////////////////////////////////]
interface IInterval {
  message: string;
  length: number;
}

interface IFullInterval extends IInterval {
  begin: number;
  end: number;
}

interface IRemaining {
  minutes: string;
  seconds: string;
  percent: number;
}
