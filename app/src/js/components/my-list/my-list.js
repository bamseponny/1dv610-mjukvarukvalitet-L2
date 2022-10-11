/**
 * The my-list component module.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 * @version 1.0
 */

const template = document.createElement('template')
template.innerHTML = `
     <style>
  
         #my-list {
          display: block;
          width: 100vw;
          height: 100vh;
          background-color: green;
          background-size: cover;
         }
 
  </style>
     <div id="my-list">
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
    }
  })
