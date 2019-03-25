const messageRespostImpl = `
unit u{$modulo}{$nomeUnitAPI}RespostaImpl;

{**************************************************************************************************
 Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoRespostaImpl}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  u{$modulo}{$nomeUnitAPI}RespostaAPI, uintAbstractMessage;

type
  T{$modulo}{$nomeUnitAPI}Resposta = class(TIntAbstractMessage, I{$modulo}{$nomeUnitAPI}Resposta)
  private
    FsDados: String;

    procedure SetDados(const Value: String);
    function GetDados: String;
  published
    property Dados: String read GetDados write SetDados;
  end;

implementation

procedure T{$modulo}{$nomeUnitAPI}Resposta.SetDados(const Value: String);
begin
  FsDados := Value;
end;

function T{$modulo}{$nomeUnitAPI}Resposta.GetDados: String;
begin
  result := FsDados;
end;

end.

`