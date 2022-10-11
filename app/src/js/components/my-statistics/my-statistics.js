
/**
 * The my-statistics component module.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 * @version 1.0
 */

const template = document.createElement('template')
template.innerHTML = `
       <style>
    
           #my-statistics {
            display: block;
            width: 100vw;
            height: 100vh;
            background-color: blue;
            background-size: cover;
           }
   
    </style>
       <div id="my-statistics">
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
      this.myStatistics = this.shadowRoot.querySelector('#my-statistics')
    }
  })
