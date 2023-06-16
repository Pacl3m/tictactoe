let fields = [
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null,
    null,
];


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
            symbol = 'O';
            } else if (fields[index] === 'cross') {
                symbol = 'X';
            };

            cell.innerHTML = symbol;
            row.appendChild(cell);
            index++;
        }

        table.appendChild(row);
    }

    let content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(table);
}