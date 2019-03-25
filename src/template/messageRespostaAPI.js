const messageAPI = `
unit u{$modulo}{$nomeUnitAPI}RespostaAPI;

{**************************************************************************************************
 Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoRespostaAPI}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  uintIntegrationMessageAPI;

type
  I{$modulo}{$nomeUnitAPI}Resposta = interface(IintIntegrationMessage)
    [{$GUIDmessage}]
    procedure SetDados(const Value: String);
    function GetDados: String;

    property Dados: String read GetDados write SetDados;
  end;

implementation

end.
`