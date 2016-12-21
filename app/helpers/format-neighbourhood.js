import Ember from 'ember';

let neighbourhoods = {
  // Vancouver
  'arbutus-ridge': 'Arbutus Ridge',
  'downtown': 'Downtown',
  'dunbar-southlands': 'Dunbar Southlands',
  'fairview': 'Fairview',
  'grandview-woodland': 'Grandview Woodland',
  'hastings-sunrise': 'Hastings Sunrise',
  'kensington-cedar-cottage': 'Kensington Cedar Cottage',
  'kerrisdale': 'Kerrisdale',
  'killarney': 'Killarney',
  'kitsilano': 'Kitsilano',
  'marpole': 'Marpole',
  'mount-pleasant': 'Mount Pleasant',
  'oakridge': 'Oakridge',
  'renfrew-collingwood': 'Renfrew Collingwood',
  'riley-park': 'Riley Park',
  'shaughnessy': 'Shaughnessy',
  'south-cambie': 'South Cambie',
  'strathcona': 'Strathcona',
  'sunset': 'Sunset',
  'west-end': 'West End',
  'west-point-grey': 'West Point Grey',
  
  // Victoria
  'burnside': 'Burnside',
  'downtown-victoria': 'Downtown',
  'fairfield': 'Fairfield',
  'fernwood': 'Fernwood',
  'gonzales': 'Gonzales',
  'hillside-quadra': 'Hillside-Quadra',
  'james-bay': 'James Bay',
  'jubilee': 'Jubilee',
  'north-park': 'North Park',
  'oaklands': 'Oaklands',
  'rockland': 'Rockland',
  'victoria-fraserview': 'Victoria Fraserview',
  'victoria-west': 'Victoria West',
};

export function formatNeighbourhood(params/*, hash*/) {
  // console.log(params[0]);
  return neighbourhoods[params[0]];
}

export default Ember.Helper.helper(formatNeighbourhood);
