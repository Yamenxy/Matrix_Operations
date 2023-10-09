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
        displayResult('Number of columns in Matrix A must be equal to the number of rows in Matrix B.');
      }
    }

    function divideMatrices() {
      matrixAData = getMatrixData('A');
      matrixBData = getMatrixData('B');

      if (matrixBData.length === 1 && matrixBData[0].length === 1 && matrixBData[0][0] !== 0) {
        const rows = matrixAData.length;
        const cols = matrixAData[0].length;
        const result = [];

        for (let i = 0; i < rows; i++) {
          const rowData = [];

          for (let j = 0; j < cols; j++) {
            rowData.push(matrixAData[i][j] / matrixBData[0][0]);
          }

          result.push(rowData);
        }

        displayResult(result);
      } else {
        displayResult('Matrix B must be a 1x1 matrix with a non-zero value.');
      }
    }

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
  