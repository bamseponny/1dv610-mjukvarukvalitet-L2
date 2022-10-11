/**
 * Module for the MyFavoriteThings class.
 *
 * @author Fredrik Eriksson <ferth09@student.lnu.se>
 */

import library from './database.js'

/**
 * Represents a MyFavoriteThings class.
 *
 * @class My Favorite Things
 */
export class MyFavoriteThings {
  /**
   * Creates an instance of MyFavoriteThings.
   */
  constructor () {
    this.minimumGrade = 1
    this.maximumGrade = 5
    this.MyFavoriteThings = 'video games'
  }

  /**
   * List the complete database array of objects in alphabetical order.
   *
   * @returns {Array[]} numbers - Returns an array of objects.
   */
  listAllTitles () {
    this.validateArray(library)
    library.sort((a, b) => {
      const titleA = a.title
      const titleB = b.title
      let compare

      titleA.toUpperCase() < titleB.toUpperCase() ? (compare = -1) : (compare = 1)
      return compare
    })
    return library
  }

  /**
   * Print all the favorite things in the database to the console.
   */
  printAllTitles () {
    this.listAllTitles()
    console.log(`A complete list of ${this.MyFavoriteThings} in the library:`)
    library.forEach((element) => {
      console.log(`${element.title} *** FORMAT: ${element.format} *** RELEASE YEAR: ${element.releaseYear} *** GRADE: ${element.grade} of ${this.maximumGrade} *** PLAY TIME: ${element.hoursPlayed} hours`)
    })
  }

  /**
   * Returns an array of all favorite things from a certain time span.
   *
   * @param {number} startYear - Chosen start year.
   * @param {number} endYear - Chosen end year.
   * @returns {Array[]} strings - Returns an array of strings.
   */
  listByTimeSpan (startYear, endYear) {
    const titlesOfTimeSpan = []
    for (const element of library) {
      if (element.releaseYear >= startYear && element.releaseYear <= endYear) {
        titlesOfTimeSpan.push(element.title)
      }
    }
    return titlesOfTimeSpan
  }

  /**
   * Prints all favorite things from a certain time span.
   *
   * @param {number} startYear - Chosen start year.
   * @param {number} endYear - Chosen end year.
   */
  printByTimeSpan (startYear, endYear) {
    const titlesOfTimeSpan = (this.listByTimeSpan(startYear, endYear))
    this.validateArray(titlesOfTimeSpan)
    console.log(`The ${this.MyFavoriteThings} in your library between years ${startYear} and ${endYear} are:`)
    console.log(`${titlesOfTimeSpan.sort().join(', ')}`)
  }

  /**
   * Find titles in the library based on passed string.
   *
   * @param {string} title - Passed string.
   * @returns {Array[]} strings - Returns an array of strings.
   */
  findTitles (title) {
    const arrayOfTitles = []
    for (let i = 0; i < library.length; i++) {
      if (library[i].title.toLowerCase().includes(title.toLowerCase())) {
        arrayOfTitles.push(library[i].title)
      }
    }
    return arrayOfTitles
  }

  /**
   * Print titles of the library based on passed string.
   *
   * @param {string} title - Passed string.
   */
  printTitles (title) {
    const arrayOfTitles = this.findTitles(title)
    if (arrayOfTitles.length < 1) {
      console.log(`No titles in the library  to show with passed "${title}".`)
    } else if (arrayOfTitles.length === 1) {
      console.log(`The title found in the library with passed "${title}" is: ${arrayOfTitles}.`)
    } else {
      console.log(`The titles found in the library with passed "${title}" is: ${arrayOfTitles.join(', ')}.`)
    }
  }

  /**
   * Returns a sorted array with favorite things in the library depending on the chosen data type and data value.
   *
   * @param {string} dataType - Chosen data type.
   * @param {*} dataValue - Chosen data value.
   * @returns {Array[]} strings - Returns an array of strings.
   */
  filterByData (dataType, dataValue) {
    if (dataType !== undefined) {
      switch (dataType) {
        case 'format': {
          const filterTheLibrary = library.filter((listOfThings) => listOfThings.format === dataValue)
          this.validateArray(filterTheLibrary)
          const filteredLibrary = filterTheLibrary.map(format => format.title).sort()

          return filteredLibrary
        }
        case 'releaseYear': {
          const filterTheLibrary = library.filter((listOfThings) => listOfThings.releaseYear === dataValue)
          this.validateArray(filterTheLibrary)
          const filteredLibrary = filterTheLibrary.map(format => format.title).sort()

          return filteredLibrary
        }
        case 'grade': {
          if (dataValue < this.minimumGrade || dataValue > this.maximumGrade || typeof dataValue !== 'number') {
            throw new Error(`Please choose a grade between ${this.minimumGrade} and ${this.maximumGrade}.`)
          } else {
            const filterTheLibrary = library.filter((listOfThings) => listOfThings.grade === dataValue)
            this.validateArray(filterTheLibrary)
            const filteredLibrary = filterTheLibrary.map(grade => grade.title).sort()

            return filteredLibrary
          }
        }
        default:
          throw new Error('This data type is not supported.')
      }
    } else {
      throw Error('Please pass a valid data type.')
    }
  }

  /**
   * Prints out favorite things in the library depending on the chosen data type and data value.
   *
   * @param {string} dataType - Chosen data type.
   * @param {*} dataValue - Chosen data value.
   */
  printFilteredData (dataType, dataValue) {
    const filteredData = this.filterByData(dataType, dataValue)
    if (dataType === 'format') {
      console.log(`The ${this.MyFavoriteThings} on ${dataValue} in your collection are ${filteredData.join(', ')}.`)
    } else if (dataType === 'releaseYear') {
      console.log(`The ${this.MyFavoriteThings} from ${dataValue} in your collection are ${filteredData.join(', ')}.`)
    } else if (dataType === 'grade') {
      console.log(`The ${this.MyFavoriteThings} with the grade ${dataValue} in your collection are ${filteredData.join(', ')}.`)
    }
  }

  /**
   * Filter out the pure numbers from the library and sort them.
   *
   * @param {string} numberType - Chosen number type.
   * @returns {number[]} numbers - Returns an array of numbers.
   */
  getNumbers (numberType) {
    let numberArray = Array.from(library)
    this.validateArray(numberArray)
    if (numberType === 'grades') {
      numberArray = library.map(dataBase => dataBase.grade)
    } else if (numberType === 'hours') {
      numberArray = library.map(dataBase => dataBase.hoursPlayed)
    } else {
      throw new Error('Please pass in a valid number type.')
    }

    const sortedArrayOfNumbers = numberArray.sort((num1, num2) => num1 - num2)
    return sortedArrayOfNumbers
  }

  /**
   * Calculate and returns the total number of hours spent with the collection.
   *
   * @returns {number} number - Returns a number.
   */
  calculateTotalHoursSpent () {
    const hourArray = this.getNumbers('hours')
    const totalHours = hourArray.reduce((num1, num2) => (num1 + num2))

    return totalHours
  }

  /**
   * Calculate and returns the total number of days spent with the collection.
   *
   * @returns {number} number - Returns a number.
   */
  calculateNumberOfDaysSpent () {
    const hourArray = this.getNumbers('hours')
    const daysSpent = Math.round((hourArray.reduce((num1, num2) => (num1 + num2))) / 24)

    return daysSpent
  }

  /**
   * Calculate and returns the average number of hours spent with the collection.
   *
   * @returns {number} number - Returns a number.
   */
  calculateAverageHoursSpent () {
    const hourArray = this.getNumbers('hours')
    const averageHours = Math.round(hourArray.reduce((num1, num2) => (num1 + num2)) / hourArray.length)

    return averageHours
  }

  /**
   * Filters and returns the min and max number of hours spent with the collection.
   *
   * @returns {number[]} numbers - Returns an array of numbers.
   */
  calculateMinMaxHours () {
    const hourArray = this.getNumbers('hours')
    const minMaxArray = []

    const min = hourArray[0]
    const max = hourArray[hourArray.length - 1]
    minMaxArray.push(min, max)

    return minMaxArray
  }

  /**
   * Print time statistics of the items in the collection.
   */
  PrintTimeStatistics () {
    const numberOfHours = this.calculateTotalHoursSpent()
    const numberOfDays = this.calculateNumberOfDaysSpent()
    const averageHours = this.calculateAverageHoursSpent()
    const minMaxHours = this.calculateMinMaxHours()

    console.log(`You've spent a total of ${numberOfHours} hours, approximately ${numberOfDays} days, with your collection of ${this.MyFavoriteThings}. 
    The average time spent with each individual library object is ${averageHours} hours.
    The least amount of time you've spent on an item is ${minMaxHours[0]} hours, and the most time is ${minMaxHours[1]} hours.`)
  }

  /**
   * Calculates the average of an array with numbers.
   *
   * @returns {number} number - Returns a number.
   */
  calculateAverageGrade () {
    const gradeArray = this.getNumbers('grades')

    let total = 0
    for (let i = 0; i < gradeArray.length; i++) {
      total = total + gradeArray[i]
    }

    let average = total / gradeArray.length
    average = Math.round(average * 100) / 100

    return average
  }

  /**
   * Calculates the median of an array with numbers.
   *
   * @returns {number} number - Returns a number.
   */
  calculateMedianGrade () {
    const medianArray = this.getNumbers('grades')
    let median

    if (medianArray.length % 2 !== 0) {
      const medianIndex = Math.floor(medianArray.length / 2)
      median = medianArray[medianIndex]
    } else {
      const medianIndex = Math.floor(medianArray.length / 2)
      median = (medianArray[medianIndex - 1] + medianArray[medianIndex]) / 2
    }
    return median
  }

  /**
   * Calculates the mode of an array with numbers.
   * Code credit: my own solution in 1DV025, assignment A2.
   *
   * @returns {number} number - Returns one or several numbers.
   */
  calculateModeGrade () {
    const modeArray = this.getNumbers('grades')

    const freq = {}
    let maxFreq = 0
    const modes = []

    for (const num in modeArray) {
      freq[modeArray[num]] = (freq[modeArray[num]] || 0) + 1

      if (freq[modeArray[num]] > maxFreq) {
        maxFreq = freq[modeArray[num]]
      }
    }

    for (const key in freq) {
      if (freq[key] === maxFreq) {
        modes.push(key)
      }
    }

    const parsedModes = modes.map(string => Number(string))

    return parsedModes
  }

  /**
   * Print grade statistics of the items in the collection.
   */
  printGradeStatistics () {
    const gradeAverage = this.calculateAverageGrade()
    const gradeMedian = this.calculateMedianGrade()
    const gradeMode = this.calculateModeGrade()

    console.log(`The average of the grade is ${Math.round(gradeAverage * 100) / 100}.`)
    console.log(`The median of the grade is ${gradeMedian}.`)
    if (gradeMode.length === 1) {
      console.log(`The most frequent value of all the grades is ${gradeMode}.`)
    } else if (gradeMode.length > 1) {
      console.log(`The most frequent values of all the grades are ${gradeMode.join(', ')}.`)
    }
  }

  /**
   * Convert a grade of an external scope to a grade which suits the internal scope.
   * The grades 1-100, 1-10 and F-A are supported for conversion.
   *
   * @param {*} oldMax - The max of the old grade.
   * @param {*} oldGrade - The old grade, to be converted.
   * @returns {number} number - Returns a number.
   */
  convertGrade (oldMax, oldGrade) {
    switch (oldMax) {
      case 100: {
        const newGrade = Math.round(oldGrade / 100 * 5)

        return newGrade
      }
      case 10: {
        const newGrade = Math.round(oldGrade / 10 * 5)

        return newGrade
      }
      case 'A': {
        const transitionGrade = oldGrade === 'F' ? oldGrade = 'E' : oldGrade

        const letterArray = ['F', 'E', 'D', 'C', 'B', 'A']
        const newGrade = letterArray.indexOf(transitionGrade)

        return newGrade
      }
      default:
        throw new Error('This grade scope is not supported.')
    }
  }

  /**
   * Convert a grade of an external scope to a grade which suits the internal scope, and prints it.
   * The grades 1-100, 1-10 and F-A are supported for conversion.
   *
   * @param {*} oldMax - The max of the old grade.
   * @param {*} oldGrade - The old grade, to be converted.
   */
  printConvertedGrade (oldMax, oldGrade) {
    const newGrade = this.convertGrade(oldMax, oldGrade)
    console.log(`Old grade, ${oldGrade} with maximum of ${oldMax}, is converted to ${newGrade} out of ${this.maximumGrade}.`)
  }

  /**
   * Validate if the array satisfies the demands.
   *
   * @param {number[]} array - Array of objects.
   */
  validateArray (array) {
    if (!Array.isArray(array)) {
      throw new Error('The passed argument is not an array.')
    } else if (!array.length) {
      throw new Error('The passed array contains no elements.')
    }
  }
}
