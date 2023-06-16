let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];


let currentPlayer = 'circle';


function init() {
    render();
}


function render() {
    let table = document.createElement('table');
    let index = 0;

    for (let i = 0; i < 3; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 3; j++) {
            let cell = document.createElement('td');
            let symbol = '';

            if (fields[index] === 'circle') {
            symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            };

            cell.innerHTML = symbol;
            cell.onclick = (function(index) { // gibt dem onclich eine Funktion und diese gibt dem Wert des in der Schleife momentanen index mit 
                return function() {
                    handleClick(this, index);
                };
            })(index); 
             
            row.appendChild(cell);
            index++;
        }

        table.appendChild(row);
    }

    let content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}


function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG(); // kurzere Art von if else Anweisung -> ist currentPlayer 'circle' ? dann wird 'cross' wenn nicht dann 'circle'
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        cell.onclick = null;

        checkGameEnd(); // Überprüfe, ob das Spiel beendet ist
    }
}


function generateCircleSVG() {
    const color = "#00B0EF";
    const diameter = 70; // Größe des Kreises
    const strokeWidth = 5; // Dicke des Kreisrands
  
    const svgCode = `
      <svg width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}" style="display: block; margin: auto;">
        <circle cx="${diameter / 2}" cy="${diameter / 2}" r="${(diameter - strokeWidth) / 2}" fill="none" stroke="${color}" stroke-width="${strokeWidth}">
          <animate attributeName="r" from="0" to="${(diameter - strokeWidth) / 2}" dur="250ms"/>
        </circle>
      </svg>
    `;
  
    return svgCode;
}


function generateCrossSVG() {
    const color = "#FFC000";
    const size = 70;
    const strokeWidth = 5; // Dicke des Kreuzrands
    const animationDuration = "250ms"; // Dauer der Animation

  const svgCode = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display: block; margin: auto;">
    <line x1="${strokeWidth}" y1="${strokeWidth}" x2="${size - strokeWidth}" y2="${size - strokeWidth}" stroke="${color}" stroke-width="${strokeWidth}">
      <animate attributeName="x2" values="0; ${size}" dur="${animationDuration}"/>
      <animate attributeName="y2" values="0; ${size}" dur="${animationDuration}"/>
    </line>
    <line x1="${size - strokeWidth}" y1="${strokeWidth}" x2="${strokeWidth}" y2="${size - strokeWidth}" stroke="${color}" stroke-width="${strokeWidth}">
    <animate attributeName="x2" values="${size}; 0" dur="${animationDuration}"/>
    <animate attributeName="y2" values="0; ${size}" dur="${animationDuration}"/>
    </line>
  </svg>
`;
  
    return svgCode;
  }


  function checkGameEnd() {
    // Array mit den Gewinnkombinationen
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
        [0, 4, 8], [2, 4, 6] // Diagonale Reihen
    ];

    // Überprüfen, ob eine Gewinnkombination erreicht wurde
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (
            fields[a] && fields[a] === fields[b] && fields[a] === fields[c]
        ) {
            drawWinningLine(combination); // Zeichne die Gewinnlinie
            return; // Spiel abbrechen
        }
    }

    // Überprüfen, ob das Spiel unentschieden ist
    if (!fields.includes(null)) {
        // Unentschieden
        alert("Unentschieden!");
    }
}


function drawWinningLine(combination) {
    const [a, b, c] = combination;
    const cells = document.querySelectorAll('td'); // Sucht die 
    const cellA = cells[a];
    const cellC = cells[c];
  
    const rectA = cellA.getBoundingClientRect();
    const rectC = cellC.getBoundingClientRect();
  
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNamespace, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    const line = document.createElementNS(svgNamespace, 'line');
    line.setAttribute('x1', rectA.left + rectA.width / 2);
    line.setAttribute('y1', rectA.top + rectA.height / 2);
    line.setAttribute('x2', rectC.left + rectC.width / 2);
    line.setAttribute('y2', rectC.top + rectC.height / 2);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '5px');
  
    svg.appendChild(line);
  
    const winningLine = document.createElement('div');
    winningLine.className = 'winning-line';
    winningLine.style.position = 'absolute';
    winningLine.style.width = '100%';
    winningLine.style.height = '100%';
    winningLine.style.pointerEvents = 'none'; // Um Klicks auf die Gewinnlinie zu deaktivieren
    winningLine.appendChild(svg);
  
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none'; // Um Klicks auf die Gewinnlinie zu deaktivieren
    overlay.appendChild(winningLine);
  
    document.body.appendChild(overlay);

    // Entfernen Sie das Klick-Event für alle Zellen, um das Spiel zu beenden
    const allCells = document.querySelectorAll('td');
    allCells.forEach((cell) => { // Diese Methode durchläuft jedes Element in der NodeList allCells und führt eine angegebene Funktion für jedes Element aus.
      cell.onclick = null;
      cell.setAttribute('background-color', null);
      cell.setAttribute('cursor', null);
    });
  }
