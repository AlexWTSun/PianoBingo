 function updateGameSetup()
{
    let setup_section     = document.getElementById("game_setup_section");
    // first, clear up setup section;
    while(setup_section.firstChild)
    {
        setup_section.removeChild(setup_section.firstChild);
    }

    let repertoire_option = document.getElementById("reper_input");
    let board_size_option = document.getElementById("board_size");

    let num_pieces = 9;
    switch(board_size_option.options[board_size_option.selectedIndex].value)
    {
        case "Board3":
            num_pieces = 9;
            break;
        case "Board4":
            num_pieces = 16;
            break;
        case "Board5":
            num_pieces = 25;
            break;
        case "Board6":
            num_pieces = 36;
            break;
        default:
            break;
    }

    game_parameter.num_pieces = num_pieces;
    game_parameter.setup_mode = repertoire_option.options[repertoire_option.selectedIndex].value;
    while(game_parameter.repertoire.length>0)
    {
        game_parameter.repertoire.pop();
    }
    
    let p_num_pieces = document.createElement("p");
    p_num_pieces.innerText = "The game needs "+num_pieces + " pieces";
    setup_section.appendChild(p_num_pieces);

    if(game_parameter.setup_mode=='MYOL')
    {
        setSelfDefineSetupSection();
    }
    else if(game_parameter.setup_mode=="GFDB")
    {
        setFromDatabaseSetupSection();
    }
    else if(game_parameter.setup_mode=="SFSL")
    {
        setFromSampleListSection();
    }
}