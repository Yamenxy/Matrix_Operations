    let matrixAData = [];
    let matrixBData = [];

    function createMatrix(matrixName) {
      const rows = parseInt(document.getElementById(matrixName === 'A' ? 'aRows' : 'bRows').value);
      const cols = parseInt(document.getElementById(matrixName === 'A' ? 'aCols' : 'bCols').value);

      const matrixContainer = document.getElementById(matrixName === 'A' ? 'matrixA' : 'matrixB');
      matrixContainer.innerHTML = '';

      const table = document.createElement('table');
      const tbody = document.createElement('tbody');

      for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
          const cell = document.createElement('td');
          const input = document.createElement('input');
          input.type = 'number';
          input.id = `${matrixName}${i}${j}`;
          input.style.width = '40px';
          input.style.textAlign = 'center';
          cell.appendChild(input);
          row.appendChild(cell);
        }

        tbody.appendChild(row);
      }

      table.appendChild(tbody);
      matrixContainer.appendChild(table);
    }

    function getMatrixData(matrixName) {
      const rows = parseInt(document.getElementById(matrixName === 'A' ? 'aRows' : 'bRows').value);
      const cols = parseInt(document.getElementById(matrixName === 'A' ? 'aCols' : 'bCols').value);

      const matrixData = [];

      for (let i = 0; i < rows; i++) {
        const rowData = [];

        for (let j = 0; j < cols; j++) {
          const input = document.getElementById(`${matrixName}${i}${j}`);
          rowData.push(parseFloat(input.value));
        }

        matrixData.push(rowData);
      }

      return matrixData;
    }

    function addMatrices() {
      matrixAData = getMatrixData('A');
      matrixBData = getMatrixData('B');

      if (matrixAData.length === matrixBData.length && matrixAData[0].length === matrixBData[0].length) {
        const rows = matrixAData.length;
        const cols = matrixAData[0].length;
        const result = [];

        for (let i = 0; i < rows; i++) {
          const rowData = [];

          for (let j = 0; j < cols; j++) {
            rowData.push(matrixAData[i][j] + matrixBData[i][j]);
          }

          result.push(rowData);
        }

        displayResult(result);
      } else {
        displayResult('Matrices must have the same dimensions.');
      }
    }

    function subtractMatrices() {
      matrixAData = getMatrixData('A');
      matrixBData = getMatrixData('B');

      if (matrixAData.length === matrixBData.length && matrixAData[0].length === matrixBData[0].length) {
        const rows = matrixAData.length;
        const cols = matrixAData[0].length;
        const result = [];

        for (let i = 0; i < rows; i++) {
          const rowData = [];

          for (let j = 0; j < cols; j++) {
            rowData.push(matrixAData[i][j] - matrixBData[i][j]);
          }

          result.push(rowData);
        }

        displayResult(result);
      } else {
        displayResult('Matrices must have the same dimensions.');
      }
    }

    function multiplyMatrices() {
      matrixAData = getMatrixData('A');
      matrixBData = getMatrixData('B');

      if (matrixAData[0].length === matrixBData.length) {
        const rows = matrixAData.length;
        const cols = matrixBData[0].length;
        const result = [];

        for (let i = 0; i < rows; i++) {
          const rowData = [];

          for (let j = 0; j < cols; j++) {
            let sum = 0;

            for (let k = 0; k < matrixAData[0].length; k++) {
              sum += matrixAData[i][k] * matrixBData[k][j];
            }

            rowData.push(sum);
          }

          result.push(rowData);
        }

        displayResult(result);
      } else {
        displayResult('Number of columns in Matrix (A) must be equal to the number of rows in Matrix (B).');
      }
    }

    // function divideMatrices() {
    //   matrixAData = getMatrixData('A');
    //   matrixBData = getMatrixData('B');

    //   if (matrixBData.length === 1 && matrixBData[0].length === 1 && matrixBData[0][0] !== 0) {
    //     const rows = matrixAData.length;
    //     const cols = matrixAData[0].length;
    //     const result = [];

    //     for (let i = 0; i < rows; i++) {
    //       const rowData = [];

    //       for (let j = 0; j < cols; j++) {
    //         rowData.push(matrixAData[i][j] / matrixBData[0][0]);
    //       }

    //       result.push(rowData);
    //     }

    //     displayResult(result);
    //   } else {
    //     displayResult('Matrix B must be a 1x1 matrix with a non-zero value.');
    //   }
    // }

    function displayResult(result) {
      const resultContainer = document.getElementById('result');

      if (Array.isArray(result)) {
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');

        for (let i = 0; i < result.length; i++) {
          const row = document.createElement('tr');

          for (let j = 0; j < result[i].length; j++) {
            const cell = document.createElement('td');
            cell.textContent = result[i][j];
            row.appendChild(cell);
          }

          tbody.appendChild(row);
        }

        table.appendChild(tbody);
        resultContainer.innerHTML = '';
        resultContainer.appendChild(table);
      } else {
        resultContainer.textContent = result;
      }
    }
  


    
    function calculateInverse() {
      const matrixAData = getMatrixData('A');
      const inverse = findInverse(matrixAData);
      
      if (inverse) {
        displayResult('The Inverse Matrix is:');
        displayMatrix(inverse);
      } else {
        displayResult('The matrix is not invertible.');
      }
    }
    
    function findInverse(matrix) {
      const rows = matrix.length;
      const cols = matrix[0].length;
    
      if (rows !== cols) {
        return null; // Matrix is not square, so it is not invertible
      }
    
      // Augment the matrix with an identity matrix
      const augmentedMatrix = [];
      for (let row = 0; row < rows; row++) {
        augmentedMatrix[row] = matrix[row].concat(identityRow(row, cols));
      }
    
      // Apply Gaussian elimination with back substitution
      for (let row = 0; row < rows; row++) {
        const pivot = augmentedMatrix[row][row];
    
        if (pivot === 0) {
          let foundNonZero = false;
    
          for (let i = row + 1; i < rows; i++) {
            if (augmentedMatrix[i][row] !== 0) {
              swapRows(augmentedMatrix, row, i);
              foundNonZero = true;
              break;
            }
          }
    
          if (!foundNonZero) {
            return null; // Matrix is not invertible
          }
    
          pivot = augmentedMatrix[row][row];
        }
    
        for (let i = 0; i < rows; i++) {
          if (i === row) continue;
    
          const factor = augmentedMatrix[i][row] / pivot;
    
          for (let j = row; j < 2 * cols; j++) {
            augmentedMatrix[i][j] -= augmentedMatrix[row][j] * factor;
          }
        }
    
        for (let j = row; j < 2 * cols; j++) {
          augmentedMatrix[row][j] /= pivot;
        }
      }
    
      // Extract the inverse matrix
      const inverseMatrix = [];
      for (let row = 0; row < rows; row++) {
        inverseMatrix[row] = augmentedMatrix[row].slice(cols);
      }
    
      return inverseMatrix;
    }
    
    function identityRow(row, size) {
      const identity = Array(size).fill(0);
      identity[row] = 1;
      return identity;
    }
    
    function swapRows(matrix, row1, row2) {
      const temp = matrix[row1];
      matrix[row1] = matrix[row2];
      matrix[row2] = temp;
    }
    
    // Rest of the code remains the same...



    function calculateRank() {
      const matrixAData = getMatrixData('A');
      const rank = findRank(matrixAData);
      const result = 'The Rank is: ' + rank;
      displayResult(result);
    }

function findRank(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let rank = Math.min(rows, cols);

  for (let row = 0; row < rows; row++) {
    const pivot = matrix[row][row];

    if (pivot === 0) {
      let foundNonZero = false;

      for (let i = row + 1; i < rows; i++) {
        if (matrix[i][row] !== 0) {
          swapRows(matrix, row, i);
          foundNonZero = true;
          break;
        }
      }

      if (!foundNonZero) {
        rank--;
        continue;
      }

      pivot = matrix[row][row];
    }

    for (let i = row + 1; i < rows; i++) {
      const factor = matrix[i][row] / pivot;

      for (let j = row; j < cols; j++) {
        matrix[i][j] -= matrix[row][j] * factor;
      }
    }
  }

  return rank;
}

function swapRows(matrix, row1, row2) {
  const temp = matrix[row1];
  matrix[row1] = matrix[row2];
  matrix[row2] = temp;
}

// Rest of the code remains the same...
    
