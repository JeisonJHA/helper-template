const messageImpl = `
unit u{$modulo}{$nomeUnitAPI}Impl;

{**************************************************************************************************
 Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoMsgImpl}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  uintAbstractMessage, u{$modulo}{$nomeUnitAPI}API, u{$modulo}{$nomeUnitAPI}DTO;

type
  T{$modulo}{$nomeUnitAPI} = class(TintAbstractMessage, I{$modulo}{$nomeUnitAPI})
  private
    Fo{$modulo}{$nomeUnitAPI}DTO: T{$modulo}{$nomeUnitAPI}DTO;
    procedure Set{$modulo}{$nomeUnitAPI}DTO(const Value: T{$modulo}{$nomeUnitAPI}DTO);
    function Get{$modulo}{$nomeUnitAPI}DTO: T{$modulo}{$nomeUnitAPI}DTO;
  public
    procedure AfterConstruction(); override;
    destructor Destroy; override;
  published
    property {$modulo}{$nomeUnitAPI}DTO: T{$modulo}{$nomeUnitAPI}DTO
      read Get{$modulo}{$nomeUnitAPI}DTO write Set{$modulo}{$nomeUnitAPI}DTO;
  end;

implementation

uses
  uIntIntegrationMessagesClassList, uintConstante, SysUtils, uspConstante;

function T{$modulo}{$nomeUnitAPI}.Get{$modulo}{$nomeUnitAPI}DTO: T{$modulo}{$nomeUnitAPI}DTO;
begin
  result := Fo{$modulo}{$nomeUnitAPI}DTO;
end;

procedure T{$modulo}{$nomeUnitAPI}.AfterConstruction;
begin
  inherited;
  Fo{$modulo}{$nomeUnitAPI}DTO := T{$modulo}{$nomeUnitAPI}DTO.Create(); //PC_OK
end;

destructor T{$modulo}{$nomeUnitAPI}.Destroy;
begin
  FreeAndNil(Fo{$modulo}{$nomeUnitAPI}DTO); //PC_OK
  inherited;
end;

procedure T{$modulo}{$nomeUnitAPI}.Set{$modulo}{$nomeUnitAPI}DTO(
  const Value: T{$modulo}{$nomeUnitAPI}DTO);
begin
  Fo{$modulo}{$nomeUnitAPI}DTO := Value;
end;

initialization
  TIntIntegrationMessagesClassList.Register(T{$modulo}{$nomeUnitAPI},
    {$contrato}, 1);

end.
`