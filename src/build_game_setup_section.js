function setSelfDefineSetupSection()
{
    let setup_section = document.getElementById("game_setup_section");

    let input_blocks = document.createElement("section");
    input_blocks.id = "piece_input_section";
    //input_blocks.style.display = "flex";
    setup_section.appendChild(input_blocks);

    let i_piece = 0;
    for(i_piece = 0; i_piece<game_parameter.num_pieces; i_piece++)
    {
        let new_input = document.createElement("input");
        new_input.id="Piece"+i_piece;
        new_input.type="text";
        new_input.size = 40;
        // DEBUG LINE; REMOVE BEFORE LAUNCH
        new_input.value="Piece_"+i_piece;
        input_blocks.appendChild(new_input);
        //input_blocks.appendChild(document.createElement("br"));
    }
}

function setFromDatabaseSetupSection()
{
    let setup_section = document.getElementById("game_setup_section");
}

function setFromSampleListSection()
{
    let setup_section = document.getElementById("game_setup_section");
    
}