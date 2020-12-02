$(function() {

    function exibir_persongens (){
        $.ajax ({
            url: 'http://localhost:5000/listar_personagens',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("Erro ao ler dados, verifique o backend.")
            }
        });
        function listar (personagens) {
            $('#corpoTabelaPersonagens').empty();
            mostrar_conteudo("tabelaPersonagem");

            for (var i in personagens) {
                lin = '<tr id="linha_'+ personagens[i].id +'">' + 
                '<td>' + personagens[i].nome + '</td>' +
                '<td>' + personagens[i].vida + '</td>' +
                '<td>' + personagens[i].ataque + '</td>' +
                '<td>' + personagens[i].defesa + '</td>' +
                '<td>' + personagens[i].pacto + '</td>' + 
                '<td><a href=# id="excluir_' + personagens[i].id + '" ' + 
                'class="excluir_personagem"><img style="width:50px; height:50px; border-radius:50%;" src="img/excluir.png" ' +
                'alt="Excluir personagem" title="Excluir Personagem"></a>' + '</td>'
                '</tr>';//
                $('#corpoTabelaPersonagens').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador){
        $("#tabelaPersonagem").addClass('invisible');
        $("#conteudoDoInicio").addClass('invisible');

        $("#" + identificador).removeClass('invisible');
    }

    $(document).on("click", "#linkListarPersonagem", function() {
        exibir_persongens();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoDoInicio")
    });

    $(document).on("click", "#btIncluirPersonagem", function(){
        nome = $("#campoNome").val();
        vida = $("#campoVida").val();
        ataque = $("#campoAtaque").val();
        defesa = $("#campoDefesa").val();
        pacto = $("#campoPacto").val();
        var dados = JSON.stringify({ nome: nome, vida: vida, ataque: ataque, defesa: defesa, pacto: pacto });
        $.ajax({
            url: 'http://localhost:5000/incluir_personagem',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: personagemIncluido,
            error: erroAoIncluir
        });
        
        function personagemIncluido (retorno) {
            if (retorno.resultado == "ok") {
                alert("Personagem incluído com sucesso!");
                $("#campoNome").val("");
                $("#campoVida").val("");
                $("#campoAtaque").val("");
                $("#campoDefesa").val("");
                $("#campoPacto").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }

        function erroAoIncluir (retorno) {
            alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
        }
    });
    $('#modalIncluirPersonagem').on('hide.bs.modal', function (e) {
        exibir_persongens();
    });

    $(document).on("click", ".excluir_personagem", function(){
        var componente_clicado = $(this).attr('id');
        var nome_icone = "excluir_";
        var id_personagem = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_personagem/' + id_personagem,
            type: 'DELETE',
            dataType: 'json',
            success: personagemExcluido,
            error: erroAoExcluir,
        });

        function personagemExcluido (retorno){
            if (retorno.resultado == "ok"){
                $("#linha_" + id_personagem).fadeOut(1000, function(){
                    alert("Personagem removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoExcluir (retorno){
            alert("Erro ao excluir dados, verifique o backend: ")
        }
    });

    mostrar_conteudo("conteudoDoInicio");
});