import React from "react";
import './index.css';

export default (template, params) => {
  let regex;
  for (param in params) {
    regex = new RegExp(`{$'${param}'}`, 'gm');
    template = template.replace(regex, param);
  }
  return (
    <div>
      <code>
        {template}
      </code>
    </div>
  )
}