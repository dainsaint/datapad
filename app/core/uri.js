const URI = {

  register: ({ }) => {

  },

  fromModel: ({model, view, layout}) => {
    let base = `sessions/${model.session}/${name}/${model.id}`;
    const params = new URLSearchParams()
    
    if(view) {
      params.append('view', view);
    }

    if(layout) {
      params.append('layout', layout);
    }

    return `${ base }?${ params.toString() }`;
    
  }
}

export default URI;