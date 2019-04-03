export default `
unit u{$modulo}{$nomeClasse}Impl;

{**************************************************************************************************
  Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoMsgImpl}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  uintAbstractMessage, u{$modulo}{$nomeClasse}API, u{$modulo}{$nomeClasse}DTO;

type
  T{$modulo}{$nomeClasse} = class(TintAbstractMessage, I{$modulo}{$nomeClasse})
  private
    Fo{$modulo}{$nomeClasse}DTO: T{$modulo}{$nomeClasse}DTO;
    procedure Set{$modulo}{$nomeClasse}DTO(const Value: T{$modulo}{$nomeClasse}DTO);
    function Get{$modulo}{$nomeClasse}DTO: T{$modulo}{$nomeClasse}DTO;
  public
    procedure AfterConstruction(); override;
    destructor Destroy; override;
  published
    property {$modulo}{$nomeClasse}DTO: T{$modulo}{$nomeClasse}DTO
      read Get{$modulo}{$nomeClasse}DTO write Set{$modulo}{$nomeClasse}DTO;
  end;

implementation

uses
  uIntIntegrationMessagesClassList, uintConstante, SysUtils, uspConstante;

function T{$modulo}{$nomeClasse}.Get{$modulo}{$nomeClasse}DTO: T{$modulo}{$nomeClasse}DTO;
begin
  result := Fo{$modulo}{$nomeClasse}DTO;
end;

procedure T{$modulo}{$nomeClasse}.AfterConstruction;
begin
  inherited;
  Fo{$modulo}{$nomeClasse}DTO := T{$modulo}{$nomeClasse}DTO.Create(); //PC_OK
end;

destructor T{$modulo}{$nomeClasse}.Destroy;
begin
  FreeAndNil(Fo{$modulo}{$nomeClasse}DTO); //PC_OK
  inherited;
end;

procedure T{$modulo}{$nomeClasse}.Set{$modulo}{$nomeClasse}DTO(
  const Value: T{$modulo}{$nomeClasse}DTO);
begin
  Fo{$modulo}{$nomeClasse}DTO := Value;
end;

initialization
  TIntIntegrationMessagesClassList.Register(T{$modulo}{$nomeClasse},
    {$contrato}, 1);

end.
`;
