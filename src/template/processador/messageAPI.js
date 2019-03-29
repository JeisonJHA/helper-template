export default `
unit u{$modulo}{$nomeClasse}API;

{**************************************************************************************************
  Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoAPI}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  Classes, u{$modulo}{$nomeClasse}DTO, uintIntegrationMessageAPI;

type
  I{$modulo}{$nomeClasse} = interface(IintIntegrationMessage)
    ['{{$GUIDProcessador}}']

  function Get{$modulo}{$nomeClasse}DTO: T{$modulo}{$nomeClasse}DTO;

  property {$modulo}{$nomeClasse}DTO: T{$modulo}{$nomeClasse}DTO
    read Get{$modulo}{$nomeClasse}DTO;
end;

implementation

end.
`