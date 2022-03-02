function displayRepertoire()
{
    let rep_list = document.getElementById("disp_rep_list");
    var rep_disp_option = rep_list.style.display;
    if(rep_disp_option=='block')
    {
        document.getElementById('repDispButton').innerHTML = "Show Repertoire";
        // then hide the repertoire;
        rep_disp_option = 'none';
    }
    else
    {
        document.getElementById('repDispButton').innerHTML = "Hide Repertoire";
        // then show the repertoire
        rep_disp_option = 'block';
    }
    
    rep_list.style.display=rep_disp_option;
}

function randomlyPickNumber()
{
    let number_input = document.getElementById("number_input");
    let rand_range = game_board.box_ids.length;
    if(rand_range<1)
    {
        let pick_num_warnings = document.getElementById("pick_num_warnings");
        pick_num_warnings.innerText = "All pieces performed already!"
        number_input.value = 1;
        return;
    }
    let pick = Math.floor(Math.random()*rand_range);
    number_input.value = game_board.box_ids[pick];
    //console.log("size: %i, pick: %i", rand_range, pick);
}

function pickAPieceFromList()
{
    let pick_num_warnings = document.getElementById("pick_num_warnings");
    pick_num_warnings.style.color = "rgb(204, 50, 23)";
    pick_num_warnings.innerText = "";
    if(game_board.box_ids.length<1)
    {
        pick_num_warnings.style.color = "rgb(204, 50, 23)";
        pick_num_warnings.innerText = "All pieces performed already!"
        return;
    }

    // Read from the input;
    let number_input = document.getElementById("number_input");
    if(number_input.value=="")
    {
        pick_num_warnings.style.color = "rgb(204, 50, 23)";
        pick_num_warnings.innerText = "Please give a number";
        return;
    }
    let number_input_read = parseInt(number_input.value);
    if(number_input_read==NaN)
    {
        pick_num_warnings.style.color = "rgb(204, 50, 23)";
        pick_num_warnings.innerText = "Please enter a valid input";
        return;
    }
    else
    {
        // Check if the picked number is in the available list
        let picked_index = game_board.box_ids.indexOf(number_input_read);
        //console.log("num_read: %i, box_index: %i; piece_id: %i",
        //            number_input_read, picked_index, game_board.piece_ids[picked_index]);
        if(picked_index > -1)
        {
            game_board.picked_piece_id = game_board.piece_ids[picked_index];
            // the piece is picked. Remove it from the available id
            game_board.box_ids.splice(picked_index, 1);
            game_board.piece_ids.splice(picked_index, 1);
        }
        else
        {
            pick_num_warnings.style.color = "rgb(204, 50, 23)";
            pick_num_warnings.innerText = "The picked piece is already performed. Please pick another one";
            return;
        }
    }
    
    let box_index = number_input_read - 1;
    let piece_text = document.getElementById("pieceBoxText"+box_index);
    piece_text.style.display = "block";
    let box_cover_image = document.getElementById("pieceBoxCover"+box_index);
    box_cover_image.style.display = "none";
    pick_num_warnings.style.color = "blue";
    pick_num_warnings.innerText = " You got: " + game_board.repertoire[game_board.picked_piece_id].name;
}

function shuffleArray(array)
{
    let length = array.length;
    for(var ii = length-1; ii > 0; ii--)
    {
        var jj = Math.floor(Math.random()*(ii+1));
        var temp = array[ii];
        array[ii] = array[jj];
        array[jj] = temp;
    }
}

function updateBingoBoardSize()
{
    let bingo_grid_section = document.getElementById("bingo_grid_section");
    let bingo_grid_width = bingo_grid_section.clientWidth;
    
    let bingo_grid_section_offsets = bingo_grid_section.getBoundingClientRect();
    let section_top  = bingo_grid_section_offsets.top;
    let section_left = bingo_grid_section_offsets.left;

    let grid_size = Math.round(bingo_grid_width / game_board.edge);
    let text_size = Math.min(Math.round(grid_size/8), 16);
    console.log("top: %s, left: %s, width: %s, font: %s", 
            section_top, section_left, grid_size, text_size);
    let bingo_boxes = document.getElementsByClassName("bingoBox");
    let bingo_box_texts = document.getElementsByClassName("bingoBoxText");
    let bingo_box_images = document.getElementsByClassName("bingoBoxImage");
    let box_left_loc = "0px";
    let box_top_loc = "0px";
    
    for(let box_idx = 0; box_idx < game_board.num_pieces; box_idx++)
    {
        bingo_boxes[box_idx].style.width = grid_size + "px";
        bingo_boxes[box_idx].style.height = grid_size + "px";
        bingo_box_texts[box_idx].style.fontSize = text_size + "px";

        let bingo_box_rect = bingo_boxes[box_idx].getBoundingClientRect();
        box_left_loc = bingo_box_rect.left - section_left;
        box_top_loc = bingo_box_rect.top - section_top;
        let box_width = grid_size
        let box_height = grid_size;
        console.log(box_left_loc, box_top_loc, box_width, box_height);
        bingo_box_images[box_idx].style.width = box_width + "px";
        bingo_box_images[box_idx].style.height = box_height + "px";
        bingo_box_images[box_idx].style.left = box_left_loc + "px";
        bingo_box_images[box_idx].style.top = box_top_loc + "px";

    }
}

function clickBingoCoverPic(image_id)
{
    let matches = image_id.match(/(\d+)/);
    let extrated_number = parseInt(matches[0]);
    let number_input = document.getElementById("number_input");
    number_input.value = extrated_number+1;
    pickAPieceFromList();
}