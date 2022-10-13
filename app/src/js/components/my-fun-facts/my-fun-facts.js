
/**
 * The my-fun-facts component module.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 * @version 1.0
 */

import { MyFavoriteThings } from '../../../../../module/my-favorite-things'

const template = document.createElement('template')
template.innerHTML = `
       <style>
    
           #my-fun-facts {
            display: block;
            width: 100vw;
            height: 100vh;
            background-color: #F2D2BD;
            background-size: cover;
            color: black;
            background: rgba(76, 175, 80, 0.3)
           }

          h1 {
            margin-bottom: 10px;
            margin-top: 0;
            margin-left: 10px;
          }
   
    </style>
        <div id="my-fun-facts">
          <h1>Grade facts</h1>
            <ul>
              <li id="average-grade"></li>
              <li id="median-grade"></li>
              <li id="mode-grade"></li>
            </ul>
          <h1>Time spent</h1>
            <ul>
              <li id="total-hours"></li>
              <li id="days-spent"></li>
              <li id="average-hours"></li>
              <li id="min-max-hours"></li>
            </ul>
        </div>
      `

customElements.define('my-statistics',
  /**
   * Represents a my-statistics element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true))

      this.totalHours = this.shadowRoot.querySelector('#total-hours')
      this.daysSpent = this.shadowRoot.querySelector('#days-spent')
      this.averageHours = this.shadowRoot.querySelector('#average-hours')
      this.minMaxHours = this.shadowRoot.querySelector('#min-max-hours')

      this.averageGrade = this.shadowRoot.querySelector('#average-grade')
      this.medianGrade = this.shadowRoot.querySelector('#median-grade')
      this.modeGrade = this.shadowRoot.querySelector('#mode-grade')

      const favoriteGamesModule = new MyFavoriteThings()

      this.printTotalHours(favoriteGamesModule)
      this.printDaysSpent(favoriteGamesModule)
      this.printAverageHours(favoriteGamesModule)
      this.printMinMaxHours(favoriteGamesModule)

      this.printAverageGrade(favoriteGamesModule)
      this.printMedianGrade(favoriteGamesModule)
      this.printModeGrade(favoriteGamesModule)
    }

    /**
     * Print the total hours spent to the browser.
     *
     * @param {*} module - module object.
     */
    printTotalHours (module) {
      const totalHours = module.calculateTotalHoursSpent()
      const listText = document.createTextNode('You have played for ' + totalHours + ' hours.')
      this.totalHours.append(listText)
    }

    /**
     * Print the total days spent to the browser.
     *
     * @param {*} module - module object.
     */
    printDaysSpent (module) {
      const totalDays = module.calculateNumberOfDaysSpent()
      const listText = document.createTextNode('That is roughly ' + totalDays + ' days. Well done!')
      this.daysSpent.append(listText)
    }

    /**
     * Print the average hours spent to the browser.
     *
     * @param {*} module - module object.
     */
    printAverageHours (module) {
      const averageHours = module.calculateAverageHoursSpent()
      const listText = document.createTextNode('The average of the hours played is ' + averageHours + ' hours.')
      this.averageHours.append(listText)
    }

    /**
     * Print the minimum and maximum grade value to the browser.
     *
     * @param {*} module - module object.
     */
    printMinMaxHours (module) {
      const minMaxHours = module.calculateMinMaxHours()
      const listText = document.createTextNode('Least time spent: ' + minMaxHours[0] + ' hours. The Most? ' + minMaxHours[1] + '.')
      this.minMaxHours.append(listText)
    }

    /**
     * Print the average grade to the browser.
     *
     * @param {*} module - module object.
     */
    printAverageGrade (module) {
      const averageGrade = module.calculateAverageGrade()
      const listText = document.createTextNode('The average of the grade (1 to 5) is ' + averageGrade + '.')
      this.averageGrade.append(listText)
    }

    /**
     * Print the median grade to the browser.
     *
     * @param {*} module - module object.
     */
    printMedianGrade (module) {
      const medianGrade = module.calculateMedianGrade()
      const listText = document.createTextNode(medianGrade + ' is the median of the grade.')
      this.medianGrade.append(listText)
    }

    /**
     * Print the mode of the grade to the browser.
     *
     * @param {*} module - module object.
     */
    printModeGrade (module) {
      const modeGrade = module.calculateModeGrade()

      if (modeGrade.length === 1) {
        const listText = document.createTextNode('Most frequent value of the grade is ' + modeGrade + '.')
        this.modeGrade.append(listText)
      } else {
        const listText = document.createTextNode('Most frequent values of the grade are ' + modeGrade.join(', ') + '.')
        this.modeGrade.append(listText)
      }
    }
  })
