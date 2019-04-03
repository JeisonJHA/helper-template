export default `
unit u{$modulo}{$nomeClasse}RespostaImpl;

{**************************************************************************************************
  Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoRespostaImpl}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  u{$modulo}{$nomeClasse}RespostaAPI, uintAbstractMessage;

type
  T{$modulo}{$nomeClasse}Resposta = class(TIntAbstractMessage, I{$modulo}{$nomeClasse}Resposta)
  private
    FsDados: String;

    procedure SetDados(const Value: String);
    function GetDados: String;
  published
    property Dados: String read GetDados write SetDados;
  end;

implementation

procedure T{$modulo}{$nomeClasse}Resposta.SetDados(const Value: String);
begin
  FsDados := Value;
end;

function T{$modulo}{$nomeClasse}Resposta.GetDados: String;
begin
  result := FsDados;
end;

end.
`;
