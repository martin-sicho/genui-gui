
export function filterProviders(mol, allowedProviders) {
  // find the relevant molecule sets (only those on the map)
  const providers = mol.providers;
  const validProviders = [];
  providers.forEach((provider) => {
    const molset = allowedProviders.find(x => x.id === provider);
    if (allowedProviders && molset) {
      validProviders.push(molset);
    }
  });

  return validProviders;
}

export function groupByMolset(mols, molsets, pushCallBack=(item, itemIdx) => item) {
  const molsGroupedbyMolSet = {};
  mols.forEach((mol, index) => {
    const validProviders = filterProviders(mol, molsets);

    // assign the molecule to the correct molsets in the grouped representation
    validProviders.forEach(validProvider => {
      const id = validProvider.id.toString();
      if (!molsGroupedbyMolSet.hasOwnProperty(id)){
        molsGroupedbyMolSet[id] = []
      }
      molsGroupedbyMolSet[id].push(pushCallBack(mol, index));
    })
  });
  return molsGroupedbyMolSet;
}

export function resolve(path, obj, separator='.') {
  if (!path.includes(separator)) {
    return obj[path];
  } else {
    let properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  }
}

export function groupBy(arr, prop) {
  const map = new Map(Array.from(arr, obj => [resolve(prop, obj), []]));
  arr.forEach(obj => map.get(resolve(prop, obj)).push(obj));
  return Array.from(map.values());
}

export function smoothScrollToTop(){
  const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothScrollToTop);
    window.scrollTo (0,currentScroll - (currentScroll/5));
  }
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function IDsToResources(rootUrl, objects) {
  const resourcesDef = {};
  objects.forEach(ID => {
    resourcesDef[ID] = new URL(`${ID}/`, rootUrl)
  });
  return resourcesDef;
}

export const PLOTLY_COLORS = [
  // according to https://stackoverflow.com/questions/40673490/how-to-get-plotly-js-default-colors-list
  // if exhausted, the first color gets used again
  '#1f77b4',  // muted blue
  '#ff7f0e',  // safety orange
  '#2ca02c',  // cooked asparagus green
  '#d62728',  // brick red
  '#9467bd',  // muted purple
  '#8c564b',  // chestnut brown
  '#e377c2',  // raspberry yogurt pink
  '#7f7f7f',  // middle gray
  '#bcbd22',  // curry yellow-green
  '#17becf'   // blue-teal
];