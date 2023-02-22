/**
 * useChromaExtractor hook, this hook is provides functionality to extract the prominent colors from a file. It makes use
 * of the color.js and extract-colors packages. Different functions are given to perform these operations. The result will be
 * stored within a state object, which holds the values for the prominent, average and pallete colors in which the latter will
 * be stored in an array data structure.
 **/

// Imports
import React, {useCallback, useState} from 'react'
import {average, prominent} from "color.js";
import {extractColors} from 'extract-colors'

/**
 * @function formatPallete, responsible for formatting the result from a pallete extraction, the formatted data will be based
 * in the format provided
 * @param {Array} result - extractPallete function returned array data
 * @param {string} format  - Desired format result
 * @returns {Array[string]} - If the format is 'hex'
 * @returns {Array[Array]} - If the format is 'rgb'
**/
function formatPallete(result, format){

    let formattedPallete = []

    // Procedure if the format value is 'hex'
    if (format === 'hex'){
        result.forEach((data) => {
            formattedPallete.push(data.hex)
        })
    }

    // Procedure if the format value is 'rgb'
    if (format === 'rgb'){
        result.forEach((data) => {
            const values = [data.red, data.green, data.blue]
            formattedPallete.push(values)
        })
    }

    return formattedPallete
}

/**
 * @function useChromaExtractor hook, responsible for providing functionality to help in the extraction of color data
 * from images
 * @returns {Object} - provides the necessary functionality in an object literal syntax, this way users can use only the
 * necessary functionality.
**/
function useChromaExtractor(){
    const [ chroma, setChroma ] = useState({average: '', prominent: '', pallete: []})

    /**
     * @function extractProminent, responsible for extracting the prominent color from a file.
     * @param {File} img - Image to be analyzed
     * @param {String} format - String value format
     * @returns {String} - Hex value if the format is 'hex'
     * @returns {Array} - RGB value if the format is 'rgb'
    **/
    const extractProminent = useCallback((img, format='hex') => {
        // Edge Cases
        if (format !== 'rgb' && format !== 'hex'){
            console.warn(`Unsupported format provided, supported values: 'hex' (Default) or 'rgb'`)
            format = 'hex'
        }

         // Extraction
        prominent(img, {amount: 1, format: format})
            .then((result) => {
                console.log(result)
                setChroma((prevState) => {return {...prevState, prominent: result}})
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    /**
     * @function extractAverage, responsible for extracting the average color of a file.
     * @param {File} img - Image to be analyzed
     * @param {String} format - String value format
     * @returns {String} - Hex value if the format is 'hex'
     * @returns {Array} - RGB value if the format is 'rgb'
     * @returns {Promise<string>|Promise<Array>} - Resolves with the hex or RGB value if the format is 'hex' or 'rgb', respectively.
    **/
    const extractAverage = useCallback((img, format='hex') => {
        // Edge Cases
        if (format !== 'rgb' && format !== 'hex'){
            console.warn(`Unsupported format provided, supported values: 'hex' (Default) or 'rgb'`)
            format = 'hex'
        }

        // Extraction
        average(img, {amount: 1, format: format})
            .then((result) => {
                console.log(result)
                setChroma((prevState) => {return {...prevState, average: result}})
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    /**
     * @function extractPallet, responsible for extracting tha color pallete based on a file, when extraction is finalized
     * the formatPallete function will be called to format the result based on the desired result format.
     * @param {File} img - Image to be analyzed
     * @param {String} format - String value format
     * @returns {String} - Hex value if the format is 'hex'
     * @returns {Array} - RGB value if the format is 'rgb'
    **/
    const extractPallete = useCallback((img, format='hex') => {
        // Edge Cases
        if (format !== 'rgb' && format !== 'hex'){
            console.warn(`Unsupported format provided, supported values: 'hex' (Default) or 'rgb'`)
            format = 'hex'
        }

         // Extraction
        extractColors(img)
            .then((result) => {
                const formattedResult = formatPallete(result, format)
                console.log(formattedResult)
                setChroma((prevState) => { return { ...prevState, pallete: formattedResult }})
            })
            .catch((error) => {
                console.error(error)
            })

    }, [])

    // Hooks Returns
    return { chroma, extractProminent, extractAverage, extractPallete }

}

export default useChromaExtractor