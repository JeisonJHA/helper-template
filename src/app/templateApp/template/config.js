export default {
  "templates": [{
    "title": "Processador",
    "folder": "processador",
    "files": [{
        "name": "messageAPI",
        "type": ".pas",
        "nameAlias": "u{$modulo}{$nomeClasse}API"
      },
      {
        "name": "messageDTO",
        "type": ".pas",
        "nameAlias": "u{$modulo}{$nomeClasse}DTO"
      },
      {
        "name": "messageImpl",
        "type": ".pas",
        "nameAlias": "u{$modulo}{$nomeClasse}Impl"
      },
      {
        "name": "messageRespostaAPI",
        "type": ".pas",
        "nameAlias": "u{$modulo}{$nomeClasse}RespostaAPI"
      },
      {
        "name": "messageRespostaImpl",
        "type": ".pas",
        "nameAlias": "u{$modulo}{$nomeClasse}RespostaImpl"
      },
      {
        "name": "processador",
        "type": ".pas",
        "nameAlias": "u{$modulo}{$nomeClasse}"
      }
    ]
  }, {
    "title": "Rotina SIT",
    "folder": "rotinaSIT",
    "files": [{
      "name": "rotinaSIT",
      "type": ".pas"
    }]
  }]
}