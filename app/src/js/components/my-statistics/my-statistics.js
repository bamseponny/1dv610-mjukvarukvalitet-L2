
/**
 * The my-statistics component.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 * @version 1.0
 */

import { MyFavoriteThings } from '../../../../../module-my-favorite-things/my-favorite-things'

const template = document.createElement('template')
template.innerHTML = `
       <style>
    
           #my-statistics {
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
        <div id="my-statistics">
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
  class extends HTMLElement {
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

      const favoriteThingsLibrary = new MyFavoriteThings()

      this.printTotalHours(favoriteThingsLibrary)
      this.printDaysSpent(favoriteThingsLibrary)
      this.printAverageHours(favoriteThingsLibrary)
      this.printMinMaxHours(favoriteThingsLibrary)

      this.printAverageGrade(favoriteThingsLibrary)
      this.printMedianGrade(favoriteThingsLibrary)
      this.printModeGrade(favoriteThingsLibrary)
    }

    /**
     * @param {*} library - instance of My Favorite Things library.
     */
    printTotalHours (library) {
      const totalHours = library.calculateTotalHoursSpent()
      const listText = document.createTextNode('You have played for ' + totalHours + ' hours.')
      this.totalHours.append(listText)
    }

    /**
     * @param {*} library - module object.
     */
    printDaysSpent (library) {
      const totalDays = library.calculateNumberOfDaysSpent()
      const listText = document.createTextNode('That is roughly ' + totalDays + ' days. Well done!')
      this.daysSpent.append(listText)
    }

    /**
     * @param {*} library - module object.
     */
    printAverageHours (library) {
      const averageHours = library.calculateAverageHoursSpent()
      const listText = document.createTextNode('The average of the hours played is ' + averageHours + ' hours.')
      this.averageHours.append(listText)
    }

    /**
     * @param {*} library - module object.
     */
    printMinMaxHours (library) {
      const minMaxHours = library.calculateMinMaxHours()
      const listText = document.createTextNode('Least time spent: ' + minMaxHours[0] + ' hours. The Most? ' + minMaxHours[1] + '.')
      this.minMaxHours.append(listText)
    }

    /**
     * @param {*} library - module object.
     */
    printAverageGrade (library) {
      const averageGrade = library.calculateAverageGrade()
      const listText = document.createTextNode('The average of the grade (1 to 5) is ' + averageGrade + '.')
      this.averageGrade.append(listText)
    }

    /**
     * @param {*} library - module object.
     */
    printMedianGrade (library) {
      const medianGrade = library.calculateMedianGrade()
      const listText = document.createTextNode(medianGrade + ' is the median of the grade.')
      this.medianGrade.append(listText)
    }

    /**
     * @param {*} library - module object.
     */
    printModeGrade (library) {
      const modeGrade = library.calculateModeGrade()

      if (modeGrade.length === 1) {
        const listText = document.createTextNode('Most frequent value of the grade is ' + modeGrade + '.')
        this.modeGrade.append(listText)
      } else {
        const listText = document.createTextNode('Most frequent values of the grade are ' + modeGrade.join(', ') + '.')
        this.modeGrade.append(listText)
      }
    }
  })
