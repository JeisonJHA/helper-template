const messageDTO = `
unit u{$modulo}{$nomeUnitAPI}DTO;

{**************************************************************************************************
 Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoClasseDTO}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  Classes;

type
  T{$modulo}{$nomeUnitAPI}DTO = class(TPersistent)
  private
    Ffield: Type;
  public
    constructor Create;
  published
    property propName: Type read Ffield write Ffield;
  end;

implementation

uses
  uspConstante;

constructor T{$modulo}{$nomeUnitAPI}DTO.Create;
begin
  Ffield := defaultValue;
end;

end.
`