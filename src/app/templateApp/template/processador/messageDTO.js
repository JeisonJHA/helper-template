export default `
unit u{$modulo}{$nomeClasse}DTO;

{**************************************************************************************************
  Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoClasseDTO}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  Classes;

type
  T{$modulo}{$nomeClasse}DTO = class(TPersistent)
  private
    {$array#nome#{#nome#$arrayField$fieldName}: {#nome#$arrayField$tipo}}
    {$array#nome#function Get{#nome#$arrayField$propName}: {#nome#$arrayField$tipo};}
    {$array#nome#procedure Set{#nome#$arrayField$propName}(const Value: {#nome#$arrayField$tipo});}
  public
    constructor Create;
  published
    {$array#nome#property {#nome#$arrayField$propName}: {#nome#$arrayField$tipo} read Get{#nome#$arrayField$propName} write Set{#nome#$arrayField$propName}};
  end;

implementation

uses
  uspConstante;

constructor T{$modulo}{$nomeClasse}DTO.Create;
begin
  {$array#nome# {#nome#$arrayField$fieldName} := {#nome#$arrayField$defaultValue};}
end;

{$array#nome#
procedure T{$modulo}{$nomeClasse}DTO.Set{#nome#$arrayField$propName}(const Value: {#nome#$arrayField$tipo});
begin
  {#nome#$arrayField$fieldName} := Value;
end;

function T{$modulo}{$nomeClasse}DTO.Get{#nome#$arrayField$propName}: {#nome#$arrayField$tipo};
begin
  result = {#nome#$arrayField$fieldName};
end;
}

end.
`