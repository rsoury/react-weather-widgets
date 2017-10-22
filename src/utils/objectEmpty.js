export default function objectEmpty(o){
  return Object.keys(o).length === 0 && o.constructor === Object;
}
