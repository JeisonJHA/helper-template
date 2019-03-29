export default {
  "type": "object",
  "properties": {
    "modulo": {
      "type": "string",
      "maxWidth": 4
    },
    "nomeClasse": {
      "type": "string"
    },
    "objetivoProcessador": {
      "type": "string"
    },
    "objetivoAPI": {
      "type": "string"
    },
    "objetivoRespostaAPI": {
      "type": "string"
    },
    "objetivoClasseDTO": {
      "type": "string"
    },
    "objetivoMsgImpl": {
      "type": "string"
    },
    "objetivoRespostaImpl": {
      "type": "string"
    },
    "nomeMensagem": {
      "type": "string"
    },
    "data": {
      "type": "string",
      "format": "date"
    },
    "usuario": {
      "type": "string"
    },
    "workItem": {
      "type": "integer"
    },
    "nomeMetodoExecucao": {
      "type": "string"
    },
    "nomeFila": {
      "type": "string"
    },
    "contrato": {
      "type": "string"
    }
  },
  "required": ["*"]
}