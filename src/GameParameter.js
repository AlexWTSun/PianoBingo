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
        this.edge = 3;
        this.box_ids = [];       // this is the id of the box. The pic displayed matches this number. 
        this.piece_ids = [];     // this is the index of the piece in the repertoire list
        this.picked_piece_id = -1;
    }
}
var game_board = new GameBoard();