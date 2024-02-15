import React, { useState, useEffect } from 'react';
import grammaire from './grammaire.json';

/**
 * Extract data from a string
 * @param {*} str 
 * @param {*} offset1 
 * @param {*} offset2 
 * @returns 
 */
const extractSubstring = (str, offset1, offset2) => {
  return str.substring(offset1 -1, offset2);
};

const App = () => {
  const [csvContent, setContent] = useState([]);

  useEffect(() => {
    fetch('./CV00011P2.56159') // read txt file
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const result = [];
        // Extract csv data by skipping header and footer
        for (let index = 1; index < lines.length - 2; index++) {
          const line = lines[index];
          // extract data using json file
          grammaire['Fichier-Perso-PIN-Change'].forEach(item => {
            if (!result[index]) {
              result[index] = []; // Initialize the inner array if it doesn't exist
            }
            result[index].push({
              code: item.VALUE || 'Default value',
              value: extractSubstring(line, parseInt(item.OFFSET1), parseInt(item.OFFSET2))
            })
          });
        }
        setContent(result)
      })
      .catch(error => console.error('Error fetching the file:', error));
  }, []);


  return (
    <div>
      <h2>Data:</h2>
      {csvContent.map((innerArray, index) => (
        <div key={index}>
          <h3>Client {index}</h3>
          <ul>
            {innerArray.map((item, innerIndex) => (
              <li key={innerIndex}>
                <b>{item.code}:</b> {item.value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default App;
