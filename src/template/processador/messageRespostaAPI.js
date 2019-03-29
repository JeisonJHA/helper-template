export default `
unit u{$modulo}{$nomeClasse}RespostaAPI;

{**************************************************************************************************
  Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoRespostaAPI}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  uintIntegrationMessageAPI;

type
  I{$modulo}{$nomeClasse}Resposta = interface(IintIntegrationMessage)
    ['{{$GUIDMessage}}']
    procedure SetDados(const Value: String);
    function GetDados: String;

    property Dados: String read GetDados write SetDados;
  end;

implementation

end.
`