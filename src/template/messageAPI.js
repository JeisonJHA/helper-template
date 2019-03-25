const messageAPI = `
unit u{$modulo}{$nomeUnitAPI}API;

{**************************************************************************************************
  Projeto / Sistema: UNJ / PG5
  Objetivo: {$objetivoAPI}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  Classes, u{$modulo}{$nomeUnitAPI}DTO, uintIntegrationMessageAPI;

type
  I{$modulo}{$nomeUnitAPI} = interface(IintIntegrationMessage)
    [{$GUIDprocessador}]

  function Get{$modulo}{$nomeUnitAPI}DTO: T{$modulo}{$nomeUnitAPI}DTO;

  property {$modulo}{$nomeUnitAPI}DTO: T{$modulo}{$nomeUnitAPI}DTO
    read Get{$modulo}{$nomeUnitAPI}DTO;
end;

implementation

end.
`