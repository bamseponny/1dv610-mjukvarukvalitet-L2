/**
 * The my-list component module.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 * @version 1.0
 */

import { MyFavoriteThings } from '../../../../../module-my-favorite-things/my-favorite-things'

const template = document.createElement('template')
template.innerHTML = `
     <style>
  
         #my-list {
          display: block;
          width: 100vw;
          height: 100vh;
          background-color: #F2D2BD;
          background-size: cover;
          overflow: auto;
          color: black;
          background: rgba(76, 175, 80, 0.3)
         }

         #list {
          padding: 10px;
         }

         hr {
          border: 0;
          height: 1px;
          background: #333;
        }

        #top-parent {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #top-menu {
          display: flex;
          justify-content: center;
          justify-content: space-evenly;
          align-items: center;
          position: fixed;
          top: 0;
          width: 650px;
          height: 25px;
          border-radius: 0px 0px 25px 25px;
          background-color: aqua;
        }
 
  </style>
      <div id="top-parent">
      <div id="top-menu">
      
        <button id="all-games-btn">All Games</button>
        <button value="Nintendo 64" id="n64-btn">Nintendo 64</button>
        <button value="Playstation 4" id="ps4-btn">Playstation 4</button>
        <button value="Playstation 5" id="ps5-btn">Playstation 5</button>
        <button value="Xbox" id="xb-btn">Xbox</button>
        <button value="Xbox 360" id="x360-btn">Xbox 360</button>
        <button value="Pc" id="pc-btn">Pc</button>
      </div>
      </div>
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
      const completeList = favoriteGames.listAllLibraryObjects()

      this.n64Btn = this.shadowRoot.querySelector('#n64-btn')
      this.ps4Btn = this.shadowRoot.querySelector('#ps4-btn')
      this.ps5Btn = this.shadowRoot.querySelector('#ps5-btn')
      this.xbBtn = this.shadowRoot.querySelector('#xb-btn')
      this.x360Btn = this.shadowRoot.querySelector('#x360-btn')
      this.pcBtn = this.shadowRoot.querySelector('#pc-btn')
      this.allGamesBtn = this.shadowRoot.querySelector('#all-games-btn')

      this.n64Btn.addEventListener('click', (event) => {
        event.preventDefault()
        const filteredList = favoriteGames.filterByFormat(this.n64Btn.value)
        this.listTheGames(filteredList)
      })

      this.ps4Btn.addEventListener('click', (event) => {
        event.preventDefault()
        const filteredList = favoriteGames.filterByFormat(this.ps4Btn.value)
        this.listTheGames(filteredList)
      })

      this.ps5Btn.addEventListener('click', (event) => {
        event.preventDefault()
        const filteredList = favoriteGames.filterByFormat(this.ps5Btn.value)
        this.listTheGames(filteredList)
      })

      this.xbBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const filteredList = favoriteGames.filterByFormat(this.xbBtn.value)
        this.listTheGames(filteredList)
      })

      this.x360Btn.addEventListener('click', (event) => {
        event.preventDefault()
        const filteredList = favoriteGames.filterByFormat(this.x360Btn.value)
        this.listTheGames(filteredList)
      })

      this.pcBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const filteredList = favoriteGames.filterByFormat(this.pcBtn.value)
        this.listTheGames(filteredList)
      })

      this.allGamesBtn.addEventListener('click', (event) => {
        event.preventDefault()
        this.listTheGames(completeList)
      })

      this.listTheGames(completeList)
    }

    /**
     * List all video games, or via specific format.
     *
     * @param {*} listOfTitles - Array of object.
     */
    listTheGames (listOfTitles) {
      this.list.innerHTML = ''
      for (let i = 0; i < listOfTitles.length; i++) {
        const title = document.createTextNode(listOfTitles[i].title)

        const formatText = document.createTextNode('FORMAT: ')
        const formatValue = document.createTextNode(listOfTitles[i].format)

        const releaseYearText = document.createTextNode(' RELEASE YEAR: ')
        const releaseYearValue = document.createTextNode(listOfTitles[i].releaseYear)

        const gradeText = document.createTextNode(' GRADE: ')
        const gradeValue = document.createTextNode(listOfTitles[i].grade + ' of 5')

        const hoursPlayedText = document.createTextNode(' PLAY TIME: ')
        const hoursPlayedValue = document.createTextNode(listOfTitles[i].hoursPlayed + ' hours')

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
