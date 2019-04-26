module.exports = function regexTemplate(p, model) {
  let text = p;
  Object.keys(model).forEach((name) => {
    if (Array.isArray(model[name])) {
      arrSubst(name, model[name]);
    }
  });

  return text;

  function arrSubst(name, modelArr) {
    const Arr = new RegExp(`.*{\\$array#${name}#((\n(\\$}|.*[^]))*|.*)}`, 'gm');
    text = text.replace(Arr, (match) => {
      let result;

      modelArr.forEach((_item, index) => {
        if (index === 0) {
          result = arrLine(match, name, index);
        }
        if (index >= 1) {
          result = result.concat('\n').concat(arrLine(match, name, index));
        }
      });

      modelArr.forEach((item, index) => {
        Object.keys(item).forEach((prop) => {
          result = replaceArrFieldName(result, name, prop + index, item[prop]);
        });
      });

      result = removeArrTag(result, name);
      return result;
    });
  }

  function arrLine(subStr, name, index) {
    const regArrField = new RegExp(`({#${name}#\\$arrayField\\$)(\\w*)(})`, 'gm');

    const result = subStr.replace(regArrField, (_match, p1, p2, p3) => p1 + p2 + index + p3);
    return result;
  }

  function replaceArrFieldName(subStr, arrName, name, value) {
    const regArrField = new RegExp(`{#${arrName}#\\$arrayField\\$${name}}`, 'gm');
    return subStr.replace(regArrField, value);
  }

  function removeArrTag(result, name) {
    const Arr = new RegExp(`{\\$array#${name}#((\n(\\$}|.*[^]))*|.*)}`, 'gm');
    return result.replace(Arr, p2 => p2);
  }
};
