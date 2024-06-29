# useChromaExtractor
useChromaExtractor is a custom React hook that provides functionality to extract prominent colors, average color, and a color palette from an image file. This hook uses the color.js and extract-colors packages to perform the color extraction operations.

## Installation
To use useChromaExtractor, you need to install the library using the following command: <b>npm install chroma-extractor.js</b>
Or you can clone or download this project and copy the useChromaExtractor.js file into your React project.

## Usage
Import the Hook:
import useChromaExtractor from './path/to/useChromaExtractor';

## Use the Hook in a Component:

    import React, { useState } from 'react';
    
    import useChromaExtractor from './path/to/useChromaExtractor';

    function ColorExtractorComponent() {

        const { chroma, extractProminent, extractAverage, extractPalette } = useChromaExtractor();
        const [selectedFile, setSelectedFile] = useState(null);
    
        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
        };
    
        const handleExtractColors = () => {
            if (selectedFile) {
                extractProminent(selectedFile);
                extractAverage(selectedFile);
                extractPalette(selectedFile);
            }
        };
    
        return (
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleExtractColors}>Extract Colors</button>
                <div>
                    <h3>Prominent Color:</h3>
                    <p>{chroma.prominent}</p>
                    <h3>Average Color:</h3>
                    <p>{chroma.average}</p>
                    <h3>Color Palette:</h3>
                    <ul>
                        {chroma.palette.map((color, index) => (
                            <li key={index} style={{ backgroundColor: color }}>{color}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }


## Hook API

useChromaExtractor provides the following functions:

extractProminent(img, format='hex'): Extracts the most prominent color from an image. The format can be 'hex' or 'rgb'.

extractAverage(img, format='hex'): Extracts the average color from an image. The format can be 'hex' or 'rgb'.

extractPalette(img, format='hex'): Extracts the color palette from an image. The format can be 'hex' or 'rgb'.

## Returned State
The hook returns a chroma object with the following fields:

chroma.prominent: The extracted prominent color from the image.

chroma.average: The extracted average color from the image.

chroma.palette: The extracted color palette from the image.

## Full Example

    import React, { useState } from 'react';
    import useChromaExtractor from './path/to/useChromaExtractor';
    
    function ColorExtractorComponent() {
        const { chroma, extractProminent, extractAverage, extractPalette } = useChromaExtractor();
        const [selectedFile, setSelectedFile] = useState(null);
    
        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
        };
    
        const handleExtractColors = () => {
            if (selectedFile) {
                extractProminent(selectedFile);
                extractAverage(selectedFile);
                extractPalette(selectedFile);
            }
        };
    
        return (
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleExtractColors}>Extract Colors</button>
                <div>
                    <h3>Prominent Color:</h3>
                    <p>{chroma.prominent}</p>
                    <h3>Average Color:</h3>
                    <p>{chroma.average}</p>
                    <h3>Color Palette:</h3>
                    <ul>
                        {chroma.palette.map((color, index) => (
                            <li key={index} style={{ backgroundColor: color }}>{color}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
    
    export default ColorExtractorComponent;

# Contributing
Contributions are welcome! If you have any improvements or corrections, feel free to open a pull request or submit an issue.

# License
This project is licensed under the MIT License. See the LICENSE file for more details.

