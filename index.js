// フォームに数値を入力後エンターを押すとサブミットされてしまうのを防ぐ.
$('#pokemon-form').on('keypress',function(e){
    if(e.key == 'Enter')e.preventDefault();
})

$('#search-button').on('click',function(){
    let pokemonNumber = $('#pokemon-form [name=pokemon-number]').val();
    // 図鑑に存在しない範囲の入力を弾く
    if(pokemonNumber < 1 || pokemonNumber > 1025){
        const text = '図鑑番号は1~1026で入力してください';
        $('#pokemon-name').text(text);
        return 0;
    }
    //図鑑番号からポケモンの画像のパスを取得
    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`,
        type:'GET',
        caches:'false',
        dataType:'json',
    })
    .done(function(res){
        console.log(res)
        const src = res.sprites.other["official-artwork"].front_default;
        $('#pokemon-box').children().attr('src',src);
    })
    .fail(function(xhr){
        console.log(xhr);
    })

    //図鑑番号からポケモンの日本語名を取得
    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`,
        type:'GET',
        caches:'false',
        dataType:'json',
    })
    .done(function(res){
        const name = res.names[0].name;
        $('#pokemon-name').text(name);
    })
    .fail(function(xhr){
        console.log(xhr);
    })
})

