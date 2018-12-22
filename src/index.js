/* eslint-disable class-methods-use-this */
import 'devtools-detect';
import { DateTime } from 'luxon';

(function (window, document) {
  const { console } = window;

  /**
   * @param text
   * @param css
   * @param timeout
   * @returns {Promise<*|undefined>}
   */
  async function logIt(text, css, timeout) {
    function log() {
      if (css) {
        console.log(text, css);
      } else {
        console.log(text);
      }
    }

    if (timeout) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(log()), timeout);
      });
    }

    return log();
  }

  /**
   * @param qualifiedName
   * @returns {Element}
   */
  function getTag(qualifiedName) {
    return document.getElementsByTagName(qualifiedName)[0];
  }

  /**
   * @param value
   * @returns {*[][]}
   */
  function makeTransitionCss(value) {
    return [
      ['-webkit-transition', value],
      ['transition', value],
    ];
  }

  /**
   * @param cssArray
   * @returns {*|string}
   */
  function makeCssString(cssArray) {
    return cssArray.map(v => v.join(':')).join(';');
  }

  const titleCss = makeCssString([
    ['color', 'red'],
    ['font-size', '3em'],
    ['font-weight', '700'],
    ['text-shadow', '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'],
  ]);
  const congratsCss = makeCssString([
    ['color', 'yellow'],
    ['font-size', '2em'],
    ['font-weight', '700'],
    ['text-shadow', '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'],
  ]);
  const subTitleCss = makeCssString([
    ['color', 'blue'],
    ['font-size', '2em'],
    ['font-weight', '500'],
  ]);
  const normalText = makeCssString([
    ['color', 'black'],
    ['font-size', '1.6em'],
    ['font-weight', '300'],
  ]);

  class Quest {
    constructor() {
      this.table = [];
    }

    /**
     * @param elapsedTime
     */
    addCompletedEntry(elapsedTime) {
      this.table.push(elapsedTime.milliseconds);
    }

    /**
     * @returns {number}
     */
    get averageTime() {
      const { table } = this;
      if (table.length === 0) {
        return 0;
      }

      return table.reduce((acc, val) => (acc + val), 0) / table.length;
    }

    /**
     * @returns {Promise<void>}
     */
    async printSummary() {
      const { elapsedTime, averageTime } = this;
      await logIt(`%cIt took you ${elapsedTime.milliseconds} milliseconds to complete this quest.`, normalText);
      await logIt(`%cAverage completion time for this quest is ${averageTime} milliseconds.`, normalText);

      if (elapsedTime.milliseconds < averageTime) {
        await logIt('%cYou are faster than the others! 🏎💨', normalText, 1000);
      } else if (elapsedTime.milliseconds > averageTime) {
        await logIt('%cYou are slower than the others! 🐌', normalText, 1000);
      } else {
        await logIt('%cYou are exactly "average"! 🙀', normalText, 1000);
      }
    }

    start() {}

    terminate() {}
  }

  class TheHiddenButtonQuest extends Quest {
    getDefaultButtonCss() {
      return [
        ['position', 'absolute'],
        ['z-index', 100],
        ['border', 0],
        ['cursor', 'pointer'],
        ['margin', 0],
        ['padding', 0],
        ['display', 'block'],
        ['outline', 'none'],
        ['font-size', '0.6em'],
        ...makeTransitionCss('all 400ms ease'),
      ];
    }

    start() {
      const padding = 200;
      const windowWidth = window.innerWidth - padding;
      const windowHeight = window.innerHeight - padding;
      const left = Math.round(Math.random() * windowWidth);
      const top = Math.round(Math.random() * windowHeight);

      this.parent = getTag('body');
      this.button = document.createElement('button');
      this.button.id = 'the-secret-button';
      this.button.style = makeCssString([
        ...this.getDefaultButtonCss(),
        ['opacity', 0.8],
        ['left', `${left}px`],
        ['top', `${top}px`],
      ]);
      this.button.textContent = '🔘';

      const questPromise = new Promise((resolve) => {
        this.onButtonClicked = () => {
          this.end = DateTime.local();
          this.button.style = makeCssString([
            ...this.getDefaultButtonCss(),
            ['font-size', '5em'],
            ['opacity', 1],
            ['cursor', 'default'],
            ['left', `${left}px`],
            ['top', `${top}px`],
          ]);

          this.elapsedTime = this.end.diff(this.start);
          this.addCompletedEntry(this.elapsedTime);

          resolve();
        };

        this.button.addEventListener('click', this.onButtonClicked);
      });

      this.parent.appendChild(this.button);
      this.start = DateTime.local();
      return questPromise;
    }

    terminate() {
      this.button.removeEventListener('click', this.onButtonClicked);
      this.parent.removeChild(this.button);
    }
  }

  window.addEventListener('devtoolschange', async (e) => {
    if (e.detail.open) {
      await logIt('%cWelcome, stranger!', titleCss, 200);
      await logIt('%cYou want to play a game?', normalText, 1000);
      await logIt("%cI'll take that as a yes... Remember, don't close the console!\n\n", normalText, 2000);

      await logIt('%cQuest #1: The hidden 🔘', subTitleCss, 2000);
      await logIt('%cFind the hidden button on the page and click it.', normalText, 1000);

      const theHiddenButtonQuest = new TheHiddenButtonQuest();
      await theHiddenButtonQuest.start();
      await logIt('%cWow, good job finding the button!', congratsCss, 400); // 400 is the animation time
      await logIt('%c🎉', makeCssString([['font-size', '5em']]));
      await theHiddenButtonQuest.printSummary();
      theHiddenButtonQuest.terminate();
    }
  });
// eslint-disable-next-line
}(window, document));
