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
    game_board.edge = Math.round(Math.sqrt(game_board.num_pieces));

// setup repertoire display bar
    while(game_board.box_ids.length){game_board.box_ids.pop(); game_board.piece_ids.pop();}
    
    let disp_rep_list = document.getElementById("disp_rep_list");
    while(disp_rep_list.firstChild)
    {
        disp_rep_list.removeChild(disp_rep_list.firstChild);
    }
    for(let i_piece = 0; i_piece<game_board.num_pieces; i_piece++)
    {
        game_board.box_ids.push(i_piece+1);
        game_board.piece_ids.push(i_piece);
        let disp_piece = document.createElement('li');
        disp_piece.id="DispPiece"+i_piece;
        disp_piece.innerText = game_board.repertoire[i_piece].name;
        disp_rep_list.appendChild(disp_piece)
    }

    // shuffle the piece ids
    shuffleArray(game_board.piece_ids);
    shuffleArray(game_board.piece_ids);  // shuffle twice

// setup game board
    let game_board_section = document.getElementById("game_board_section");
    while(game_board_section.firstChild)
    {
        game_board_section.removeChild(game_board_section.firstChild);
    }

    let game_board_input_section = document.createElement("section");
    game_board_input_section.style.display = "inline";
    let number_input = document.createElement("input");
    number_input.id = "number_input";
    number_input.type="text";
    number_input.size=5;

    let num_pick_label = document.createElement("label");
    num_pick_label.for="number_input";
    num_pick_label.innerText = "Pick a number between 1 and " + game_board.num_pieces + ": ";
    game_board_input_section.appendChild(num_pick_label);
    game_board_input_section.appendChild(number_input);

    let rand_gen_button = document.createElement("button");
    rand_gen_button.id = "rand_gen_button";
    rand_gen_button.innerText = "Random Pick";
    rand_gen_button.style.width = "100px";
    rand_gen_button.style.height = "20px";
    rand_gen_button.onclick = function(){randomlyPickNumber()};
    let rand_gen_label = document.createElement("label");
    rand_gen_label.id = "rand_gen_button_label";
    rand_gen_label.innerText = "  Or let the computer randomly pick for you: ";

    game_board_input_section.appendChild(rand_gen_label);
    game_board_input_section.appendChild(rand_gen_button);

    game_board_input_section.style.breakAfter = "Always";

    game_board_section.appendChild(game_board_input_section);
    
    let pick_num_div = document.createElement("div");
    pick_num_div.id = "pick_num_div";
    pick_num_div.style.display = "flex";

    let pick_num_button = document.createElement("button");
    pick_num_button.id = "pick_rep_num_button";
    pick_num_button.innerText = "Pick this number";
    pick_num_button.style.width = "150px";
    pick_num_button.style.height = "20px";
    pick_num_button.style.marginRight = "15px";

    pick_num_button.onclick = function(){pickAPieceFromList()};

    pick_num_div.appendChild(pick_num_button);

    let pick_num_warnings = document.createElement("p");
    pick_num_warnings.id = "pick_num_warnings";
    pick_num_warnings.innerText = ""; // empty by default
    pick_num_warnings.style.color = "rgb(204, 50, 23)";
    pick_num_warnings.style.margin = "0";
    pick_num_div.appendChild(pick_num_warnings);
    
    pick_num_div.style.breakAfter = "Always";
    game_board_section.appendChild(pick_num_div);

    // Setup the reportories

    let bingo_grid_section = document.createElement("section");
    bingo_grid_section.className = "bingoGrid";
    let grid_template = "repeat(" + game_board.edge + ", 1fr)";
    bingo_grid_section.style.gridTemplateColumns = grid_template;
    bingo_grid_section.id = "bingo_grid_section";

    for(let row_index = 0; row_index < game_board.edge; row_index++)
    {
        for(let column_index = 0; column_index < game_board.edge; column_index++)
        {
            let box_index = row_index*game_board.edge+column_index;
            let box_id = box_index+1;
            let piece_id = game_board.piece_ids[box_index];
            //console.log("box_index, box_id, picec_id", box_index, box_id, piece_id);
            let piece_box = document.createElement("div");
            piece_box.className = "bingoBox";
            piece_box.id = "pieceBox" + box_index;
            piece_box.style.width = "120px";
            piece_box.style.height = "120px";
            //piece_box.style.inlineSize = "120px";

            let piece_display = document.createElement("p");
            piece_display.innerText = game_board.repertoire[piece_id].name;
            piece_display.id = "pieceBoxText"+box_index
            piece_display.style.display = "none";
            piece_display.className = "bingoBoxText";
            piece_box.appendChild(piece_display);
            piece_display.style.textAlign = "center";
            piece_display.style.margin = "none";
            piece_display.style.padding = "none";
            bingo_grid_section.appendChild(piece_box);

            let piece_cover_image = document.createElement("img");
            piece_cover_image.className = "bingoBoxImage";
            piece_cover_image.id = "pieceBoxCover"+box_index;
            let cover_image_source = "image/numbered_pics/01.jpg";
            if(box_id<10)
            {
                cover_image_source = "image/numbered_pics/0"+box_id+".jpg";
            }
            else
            {
                cover_image_source = "image/numbered_pics/"+box_id+".jpg";
            }
            piece_cover_image.src = cover_image_source;
            piece_cover_image.alt = cover_image_source;
            piece_cover_image.style.width = "140px";
            piece_cover_image.style.height = "140px";
            piece_cover_image.style.top = "0px";
            piece_cover_image.style.left = "0px";
            piece_cover_image.onclick = function(){clickBingoCoverPic(piece_cover_image.id)};
            bingo_grid_section.appendChild(piece_cover_image);
        }
    }
    game_board_section.appendChild(bingo_grid_section);
    // Update game section size;
    updateBingoBoardSize();
    window.onresize = updateBingoBoardSize;

}