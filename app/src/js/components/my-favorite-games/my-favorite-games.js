/**
 * The my-favorite-games component module.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 * @version 1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <style>
 
        #my-favorite-games {
         display: block;
         width: 100vw;   /* viewport width */
         height: 100vh;  /* viewport height */
         background-color: red;
         background-size: cover;
         background-repeat: no-repeat;
         background-image: url(js/components/my-favorite-games/lib/background.jpg);
         background-position: center; 
        }

        #bottom-parent {
        display: flex;
        justify-content: center;
        align-items: center;
       }

       #bottom-menu {
        display: flex;
        justify-content: center;
        justify-content: space-evenly;
        align-items: center;
        position: fixed;
        bottom: 0;
        width: 600px;
        height: 25px;
        border-radius: 25px 25px 0px 0px;
        background-color: aqua;
       }

       #my-list {
        display: none;
       }

       #my-statistics {
        display: none;
       }

 </style>
    <div id="my-favorite-games">
      <div id="my-list"><my-list></my-list></div>
      <div id="my-statistics"><my-statistics></my-statistics></div>
    </div>
    <div id="bottom-parent">
      <div id="bottom-menu">
        <button id="list-btn">The List</button>
        <button id="statistics-btn">The Statistics</button>
      </div>
    </div>
   `

customElements.define('my-favorite-games',
/**
 * Represents a my-favorite-games element.
 */
  class extends HTMLElement {
  /**
   * Creates an instance of the current type.
   */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true))
      this.myFavoriteGames = this.shadowRoot.querySelector('#my-favorite-games')
      this.myList = this.shadowRoot.querySelector('#my-list')
      this.myStatistics = this.shadowRoot.querySelector('#my-statistics')

      this.listBtn = this.shadowRoot.querySelector('#list-btn')
      this.listBtn.addEventListener('click', (event) => {
        event.preventDefault()
        this.myList.style.display = 'block'
        this.myStatistics.style.display = 'none'
      })

      this.statisticsBtn = this.shadowRoot.querySelector('#statistics-btn')
      this.statisticsBtn.addEventListener('click', (event) => {
        event.preventDefault()
        this.myList.style.display = 'none'
        this.myStatistics.style.display = 'block'
      })
    }
  })
