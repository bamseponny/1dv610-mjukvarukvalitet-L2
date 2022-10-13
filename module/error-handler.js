/**
 * Module for the error handler.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 */

/**
 * Represents an ErrorHandler.
 *
 * @class
 */
export class ErrorHandler extends Error {
  /**
   * Creates an instance of ErrorHandler.
   *
   * @param {*} errorMessage - the error message.
   * @memberof ErrorHandler
   */
  constructor (errorMessage) {
    super(errorMessage)
    this.name = 'Error'
  }
}
