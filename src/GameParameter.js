class GameParameter
{
    constructor()
    {
        this.num_pieces = 9;
        this.repertoire = [];
        this.setup_mode="--";
        this.gameset="--";
    }
}

var game_parameter = new GameParameter();

class GameBoard
{
    constructor()
    {
        this.num_pieces = 9;
        this.repertoire = [];
        this.cover_pics = [];
    }
}
var game_board = new GameBoard();