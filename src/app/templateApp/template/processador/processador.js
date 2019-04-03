export default `
unit u{$modulo}{$nomeClasse};

{**************************************************************************************************
  Projeto/Sistema: UNJ / PG5
  Objetivo: {$objetivoProcessador}
  Criacao: {$data} - {$usuario} - WI: {$workItem}
**************************************************************************************************}

interface

uses
  uisjProcessadorIntegracaoAliasBase, uintIntegrationMessageAPI, uintFuncoes,
  ufpgIntegracaoCliente, u{$modulo}{$nomeClasse}API, SysUtils, uspArray, uintCommon;

type
  E{$nomeClasse} = class(EintException);

  T{$modulo}{$nomeClasse} = class(TisjProcessadorIntegracaoAliasBase)
  private
    procedure {$nomeMetodoExecucao}(const poMsg: I{$modulo}{$nomeMensagem});
    procedure EnviarResposta(const poMsgOriginal: IintIntegrationMessage);
  protected
    function GetBaseSupportedQueues: TspArrayOfString; override;
    function GetBaseSupportedContracts: TIntSupportedContracts; override;
    function CanProcessMessage(const poMessage: IIntIntegrationMessage): boolean; override;
    procedure DoProcessMessageAfterAlias(poMessage: IIntIntegrationMessage); override;
    procedure DoOnProcessError(const poError: Exception; poMessage: IIntIntegrationMessage);
      override;
  end;

implementation

uses
  u{$modulo}{$nomeClasse}Impl, u{$modulo}{$nomeClasse}DTO, u{$modulo}{$nomeClasse}RespostaAPI,
  u{$modulo}{$nomeClasse}RespostaImpl, uIntErrorMessageAPI, uIntErrorMessageV2, ufpgProcessoMv,
  uspConstante, uintIntegrationProcessorsList, uisjConstantes;

procedure T{$modulo}{$nomeClasse}.DoProcessMessageAfterAlias(
  poMessage: IIntIntegrationMessage);
var
  oMsg: I{$modulo}{$nomeMensagem};
begin
  if not Supports(poMessage, I{$modulo}{$nomeMensagem}, oMsg) then
    raise Exception.Create('Tipo da mensagem inválida.');

  ConstruirConexaoServidor(T{$modulo}IntegracaoCliente, poMessage);
  try
    FoConexaoServidor.Conectar();

    if not FoConexaoServidor.Conectado then
      raise E{$nomeClasse}.CreateFmt('Erro ao realizar conexão %s',
        [FoConexaoServidor.UltimoErro]);

    {$nomeMetodoExecucao}(oMsg);
    FoConexaoServidor.Desconectar();
  finally
    DestruirConexaoServidor();
  end;
end;

function T{$modulo}{$nomeClasse}.GetBaseSupportedQueues: TspArrayOfString;
begin
  SetLength(result, 1);
  result[0] := {$nomeFila};
end;

function T{$modulo}{$nomeClasse}.GetBaseSupportedContracts: TIntSupportedContracts;
begin
  SetLength(result, 1);

  result[0].ContractName := {$contrato};
  result[0].QueueName := {$nomeFila};
end;

procedure T{$modulo}{$nomeClasse}.DoOnProcessError(const poError: Exception;
  poMessage: IIntIntegrationMessage);
var
  oMsgErro: IIntErrorMessage;
begin
  oMsgErro := TIntErrorMessageV2.Create(poMessage); //PC_OK
  oMsgErro.SetMessage(poError.Message);
  Publish(poMessage, oMsgErro, True);
end;

procedure T{$modulo}{$nomeClasse}.{$nomeMetodoExecucao}(
  const poMsg: I{$modulo}{$nomeMensagem});
var
  oConjunto: ConjuntoDeDados;
  oDados: T{$modulo}{$nomeClasse}DTO;
  nCodigoErro: integer;
  sComplementoErro: WideString;
begin
  nCodigoErro := NUMERO_INDEFINIDO;
  oConjunto := ConjuntoDeDados.CreateServidor(nil, FoConexaoServidor.spDB);
  try
    oDados := poMsg.Metodo;
    oConjunto.Metodo(oDados.Params);

    if nCodigoErro <> NUMERO_INDEFINIDO then
      raise E{$nomeClasse}.CreateFmt(
        'Erro ao ... . Codigo %d - Detalhes: %s', [nCodigoErro, sComplementoErro]);

    EnviarResposta(poMsg);
  finally
    FreeAndNil(oConjunto);
  end;
end;

procedure T{$modulo}{$nomeClasse}.EnviarResposta(const poMsgOriginal: IintIntegrationMessage);
var
  oResposta: I{$modulo}{$nomeMensagem}Resposta;
begin
  oResposta := T{$modulo}{$nomeClasse}Resposta.Create(); //PC_OK
  oResposta.AssignBaseMsgData(poMsgOriginal);

  Publish(poMsgOriginal, oResposta, False);
end;

function T{$modulo}{$nomeClasse}.CanProcessMessage(
  const poMessage: IIntIntegrationMessage): boolean;
var
  oMsg: I{$modulo}{$nomeMensagem};
begin
  result := SUpports(poMessage, I{$modulo}{$nomeMensagem}, oMsg);
end;

initialization
  TintIntegrationProcessorList.Register(T{$modulo}{$nomeClasse});

end.
`;
