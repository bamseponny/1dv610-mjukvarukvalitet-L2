/**
 * The my-list component module.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 * @version 1.0
 */

import { MyFavoriteThings } from '../module/my-favorite-things.js'

const template = document.createElement('template')
template.innerHTML = `
     <style>
  
         #my-list {
          display: block;
          width: 100vw;
          height: 100vh;
          background-color: pink;
          background-size: cover;
          overflow: auto;
          color: #333;
         }

         #list {
          padding: 10px;
         }

         hr {
          border: 0;
          height: 1px;
          background: #333;

}
 
  </style>
     <div id="my-list">
      <div id="list"></div>
     </div>
    `

customElements.define('my-list',
  /**
   * Represents a my-list element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true))
      this.myList = this.shadowRoot.querySelector('#my-list')
      this.list = this.shadowRoot.querySelector('#list')

      const favoriteGames = new MyFavoriteThings()
      const completeList = favoriteGames.listAllTitles()

      for (let i = 0; i < completeList.length; i++) {
        const title = document.createTextNode(completeList[i].title)

        const formatText = document.createTextNode('FORMAT: ')
        const formatValue = document.createTextNode(completeList[i].format)

        const releaseYearText = document.createTextNode(' RELEASE YEAR: ')
        const releaseYearValue = document.createTextNode(completeList[i].releaseYear)

        const gradeText = document.createTextNode(' GRADE: ')
        const gradeValue = document.createTextNode(completeList[i].grade + ' of 5')

        const hoursPlayedText = document.createTextNode(' PLAY TIME: ')
        const hoursPlayedValue = document.createTextNode(completeList[i].hoursPlayed + ' hours')

        const h4Tag = document.createElement('h2')
        const hrTag = document.createElement('hr')

        const boldTagFormat = document.createElement('b')
        const boldTagReleaseYear = document.createElement('b')
        const boldTagGrade = document.createElement('b')
        const boldTagPlayedHours = document.createElement('b')

        const pTag = document.createElement('p')

        h4Tag.append(title)
        this.list.append(h4Tag)

        boldTagFormat.append(formatText)
        pTag.append(boldTagFormat)
        pTag.append(formatValue)

        boldTagReleaseYear.append(releaseYearText)
        pTag.append(boldTagReleaseYear)
        pTag.append(releaseYearValue)

        boldTagGrade.append(gradeText)
        pTag.append(boldTagGrade)
        pTag.append(gradeValue)

        boldTagPlayedHours.append(hoursPlayedText)
        pTag.append(boldTagPlayedHours)
        pTag.append(hoursPlayedValue)

        this.list.append(pTag)

        this.list.append(hrTag)
      }
    }
  })
