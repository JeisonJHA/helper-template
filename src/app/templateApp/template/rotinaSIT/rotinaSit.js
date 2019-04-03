export default `unit u{$name};

interface

uses
  Classes, usitHorarioProgramadoThread, usitRegistroServico;

type
  T{$name} = class(TsitHorarioProgramadoThread)
  protected
    procedure ExecutarServico; override;
end;

implementation

procedure T{$name}.ExecutarServico;
begin
  // executar código referente a atividade
end;

initialization
  TsitRegistroServico.Registrar(sSIT_EXEMPLO_SERVICO, T{$name});

finalization

end.`;
