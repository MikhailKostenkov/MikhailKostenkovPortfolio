var FIELD_SIZE_X = 30;
var FIELD_SIZE_Y = 30;
var SNAKE_SPEED = 300;
var snake = [];
var direction = 'y+';
var gameIsRunning = false;
var snake_timer;
var snake_food;
var score = 0;

function init() {
    prepareGameField(); //генерация игрового поля

    var wrap = document.getElementsByClassName('wrap')[0];

    wrap.style.width = "400px";
    // создаем кнопки СТАРТ и НОВАЯ ИГРА
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);
    // отслеживание нажатай клавиш на клавиатуре
    addEventListener('keydown', changeDirection);
}
// Функция генерации поля
function prepareGameField() {
    //создаем таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');
    
    //создание ячеек на игровом поле
    for (var i = 0; i < FIELD_SIZE_X ; i++) {
        //создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y ; j++ ) {
            //создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); //добавление ячейки
        }
        game_table.appendChild(row); //добавление строки
    }
    document.getElementById('snake-field').appendChild(game_table); //добавление таблицы
}
//старт игры
function startGame() {
    gameIsRunning = true;
    respawn(); //создали змейку

    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 5000);
}
//функция расположения змейки на игровом поле
function respawn() {
    //змейка - массив td
    //стартовая длинна змейки = 2
    
    //респавн змейки в центре 
    var start_cord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_cord_y = Math.floor(FIELD_SIZE_Y / 2);

    //голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_cord_y + '-' + start_cord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + 'snake-unit');

    //тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + start_cord_y + '-' + start_cord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}
//движение змейки
function move()  {
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');
    //сдвиг головы
    var new_unit;
    var snake_cords = snake_head_classes[1].split(' ');
    var cord_x = parseInt(snake_cords[1]);
    var cord_y = parseInt(snake_cords[2]);

    //определяем новую точку
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y) + ' - ' + (cord_x - 1))[0];
}
    if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y) + ' - ' + (cord_x + 1))[0];
}
    if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y - 1) + ' - ' + (cord_x + 1))[0];
}
    if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (cord_y + 1) + ' - ' + (cord_x - 1))[0];
}


//Проверки
//1)new_unit не часть зейки
//2)Змейка не ушла за границу поля
    if (!isSnakeUnit(new_unit) && new_unit !== undefined) {
        //добавление части змейки
        new_unit.getAttribute('class', new_unit.getAttribute('class') + 'snake-unit');
        snake.push(new_unit);

        //проверяем надо ли убрать хвост
        if (!haveFood(new_unit)) {
            //находим хвост
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');

            //удаляем хвост
            removed.getAttribute('class', classes[0] + ' ' + classes[1]);
        }
    }
else {
        finishTheGame();
        }
    }
    

function isSnakeUnit (unit) {
    var check = false;

    if (snake.includes(unit)) {
        var check = true;
    }
    return check;
}


function haveFood (unit) {
    var check = false;
    var unit_classes = unit.getAttribute('class').split(' ');

    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();

        score++;
    }
    return check;
}

function createFood() {
    var foodCreated = false;
    while (!foodCreated) {
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split('');

        if (!food_cell_classes.includes('snake-unit')) {
            var classes = '';
            for (var i = 0; i< food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + '';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}


function changeDirection(e) {
    console.log(e);
    switch (e.keyCode) {
        case 37:
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38:
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
            case 39:
                if (direction != 'x-') {
                    direction = 'x+'
                }
                break;
                case 40:
                    if (direction != 'y+') {
                        direction = 'y-'
                    }
                    break;
                }
            }

function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

function refreshGame() {
    location.reload();
}

window.onload = init;
