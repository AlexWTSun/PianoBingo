//import { RepertoireProperties } from "./RepertoireProperties.js";

function setupGameBoard()
{
    let setup_check_section = document.getElementById("setup_check_section");
    while(setup_check_section.firstChild)
    {
        setup_check_section.removeChild(setup_check_section.firstChild);
    }

    while(game_board.repertoire.length>0)
    {
        game_board.repertoire.pop();
    }

    if(game_parameter.setup_mode=='MYOL')
    {
        // For this mode, first we need to read in the inputs
        let input_piece_name = "";
        let piece_info = new RepertoireProperties();
        for(let i_piece = 0; i_piece<game_parameter.num_pieces; i_piece++)
        {
            let piece_info = new RepertoireProperties();
            input_piece_name = document.getElementById("Piece"+i_piece).value;
            if(input_piece_name=="")
            {
                let warning = document.createElement("p");
                warning.innerText="Found an input piece that is empty. Please correct it";
                warning.style.color="red"
                setup_check_section.appendChild(warning);
                return;
            }
            game_parameter.repertoire.push(input_piece_name);
            piece_info.name=input_piece_name;
            piece_info.nickname=input_piece_name;
            game_board.repertoire.push(piece_info);
        }
    }
    else if(game_parameter.setup_mode=="GFDB")
    {

    }
    else if(game_parameter.setup_mode=="SFSL")
    {

    }
    game_board.num_pieces = game_board.repertoire.length;

// setup repertoire display bar
    let disp_rep_list = document.getElementById("disp_rep_list");
    while(disp_rep_list.firstChild)
    {
        disp_rep_list.removeChild(disp_rep_list.firstChild);
    }
    for(let i_piece = 0; i_piece<game_board.num_pieces; i_piece++)
    {
        let disp_piece = document.createElement('li');
        disp_piece.id="DispPiece"+i_piece;
        disp_piece.innerText = game_board.repertoire[i_piece].name;
        disp_rep_list.appendChild(disp_piece)
    }

// setup cover pics




}