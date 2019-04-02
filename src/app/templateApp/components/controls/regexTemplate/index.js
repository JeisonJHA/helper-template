export default function (p, model) {
  Object.keys(model).forEach(name => {
    if (Array.isArray(model[name])) {
      arrSubst(name, model[name])
    }
  })

  return p;

  function arrSubst(name, modelArr) {
    const Arr = new RegExp(".*{\\$array#" + name + "#((\n(\\$}|.*[^]))*|.*)}", 'gm');
    p = p.replace(Arr, function (match, offset, string) {
      let result;

      modelArr.forEach((item, index) => {
        if (index === 0) {
          result = arrLine(match, name, index)
        }
        if (index >= 1) {
          result = result.concat('\n').concat(arrLine(match, name, index))
        }
      })

      modelArr.forEach((item, index) => {
        Object.keys(item).forEach(prop => {
          result = replaceArrFieldName(result, name, prop + index, item[prop])
        })
      })

      result = removeArrTag(result, name)
      return result
    })
  }

  function arrLine(subStr, name, index) {
    let regArrField = new RegExp("({#" + name + "#\\$arrayField\\$)(\\w*)(})", 'gm');

    let result = subStr.replace(regArrField, function (match, p1, p2, p3, offset, string) {
      return p1 + p2 + index + p3
    })
    return result
  }

  function replaceArrFieldName(subStr, arrName, name, value) {
    let regArrField = new RegExp("{#" + arrName + "#\\$arrayField\\$" + name + "}", 'gm');
    return subStr.replace(regArrField, value)
  }

  function removeArrTag(result, name) {
    const Arr = new RegExp("{\\$array#" + name + "#((\n(\\$}|.*[^]))*|.*)}", 'gm');
    return result.replace(Arr, function (p1, p2, p3) {
      return p2
    })
  }
}