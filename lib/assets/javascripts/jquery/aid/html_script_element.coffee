HTMLScriptElement.prototype.printFunction = (params)->

  if(params.prototype)
    textNode = document.createTextNode "#{params.prototype}.prototype.#{params.name} = #{params.body} \n\n"
    # textNode = "#{params.prototype}.prototype.#{params.name} = #{params.body}"
  else
    textNode = document.createTextNode "#{params.name} = #{params.body} \n\n"
    # textNode = "#{params.name} = #{params.body}"

  this.appendChild textNode
  # this.innerHTML = textNode
