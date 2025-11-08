export interface School {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: 'elementary' | 'middle' | 'high';
  address: string;
}

// Title I Schools in Wake County, NC with approximate coordinates
export const titleOneSchools: School[] = [
  { name: "River Bend Elementary", coordinates: [-78.6382, 35.8296], type: 'elementary', address: "5926 Barham Blvd, Raleigh, NC 27616" },
  { name: "Adams Elementary", coordinates: [-78.5982, 35.7596], type: 'elementary', address: "2600 Seabrook Ave, Raleigh, NC 27604" },
  { name: "Aversboro Elementary", coordinates: [-78.6582, 35.7296], type: 'elementary', address: "1108 Aversboro Rd, Garner, NC 27529" },
  { name: "Longview", coordinates: [-78.5782, 35.7896], type: 'elementary', address: "2600 Trawick Rd, Raleigh, NC 27604" },
  { name: "Baileywick Road Elementary", coordinates: [-78.6882, 35.7696], type: 'elementary', address: "4301 Baileywick Rd, Raleigh, NC 27610" },
  { name: "Barwell Road Elementary", coordinates: [-78.6182, 35.7496], type: 'elementary', address: "4700 Barwell Park Dr, Raleigh, NC 27610" },
  { name: "Beaverdam Elementary", coordinates: [-78.7082, 35.8096], type: 'elementary', address: "5905 Hilburn Dr, Raleigh, NC 27612" },
  { name: "Brentwood Elementary", coordinates: [-78.5582, 35.7996], type: 'elementary', address: "1000 Brentwood Rd, Raleigh, NC 27604" },
  { name: "Brier Creek Elementary", coordinates: [-78.7282, 35.8596], type: 'elementary', address: "10208 Brier Creek Pkwy, Raleigh, NC 27617" },
  { name: "Brooks Elementary", coordinates: [-78.5382, 35.7696], type: 'elementary', address: "310 Dennis Ave, Raleigh, NC 27604" },
  { name: "Carroll Middle", coordinates: [-78.6682, 35.7796], type: 'middle', address: "925 Carroll Middle School Rd, Raleigh, NC 27610" },
  { name: "Carver Elementary", coordinates: [-78.6082, 35.7296], type: 'elementary', address: "710 S Wilmington St, Raleigh, NC 27601" },
  { name: "Centennial Campus Middle", coordinates: [-78.6782, 35.7596], type: 'middle', address: "1840 Main Campus Dr, Raleigh, NC 27606" },
  { name: "Connections Academy", coordinates: [-78.6482, 35.7896], type: 'elementary', address: "420 S Salisbury St, Raleigh, NC 27601" },
  { name: "Creech Road Elementary", coordinates: [-78.5682, 35.7396], type: 'elementary', address: "2420 Creech Rd, Garner, NC 27529" },
  { name: "East Garner Elementary", coordinates: [-78.5882, 35.7096], type: 'elementary', address: "2800 Tryon Rd, Garner, NC 27529" },
  { name: "East Garner Middle", coordinates: [-78.5782, 35.7196], type: 'middle', address: "2805 Tryon Rd, Garner, NC 27529" },
  { name: "East Millbrook Middle", coordinates: [-78.5482, 35.8296], type: 'middle', address: "2800 Spring Forest Rd, Raleigh, NC 27616" },
  { name: "Neuse River Middle", coordinates: [-78.5182, 35.8096], type: 'middle', address: "7700 Kennebec Rd, Raleigh, NC 27616" },
  { name: "East Wake High", coordinates: [-78.4882, 35.7796], type: 'high', address: "2000 Bethlehem Rd, Wendell, NC 27591" },
  { name: "Forestville Road Elementary", coordinates: [-78.5282, 35.7596], type: 'elementary', address: "3921 Forestville Rd, Raleigh, NC 27616" },
  { name: "Fox Road Elementary", coordinates: [-78.6982, 35.7396], type: 'elementary', address: "1520 Fox Rd, Raleigh, NC 27606" },
  { name: "Forest Pines Drive Elementary", coordinates: [-78.7182, 35.7796], type: 'elementary', address: "4101 Forest Pines Dr, Raleigh, NC 27616" },
  { name: "Green Elementary", coordinates: [-78.6382, 35.7096], type: 'elementary', address: "1217 Green Rd, Raleigh, NC 27610" },
  { name: "Hodge Road Elementary", coordinates: [-78.6782, 35.8296], type: 'elementary', address: "7301 Hodge Rd, Knightdale, NC 27545" },
  { name: "Harris Creek Elementary", coordinates: [-78.5982, 35.7796], type: 'elementary', address: "3820 Yadkin Dr, Raleigh, NC 27604" },
  { name: "Kingswood Elementary", coordinates: [-78.5082, 35.8296], type: 'elementary', address: "4411 Kingswood Dr, Raleigh, NC 27616" },
  { name: "Knightdale Elementary", coordinates: [-78.4782, 35.7896], type: 'elementary', address: "207 W Garner Rd, Knightdale, NC 27545" },
  { name: "Knightdale High", coordinates: [-78.4682, 35.7996], type: 'high', address: "100 Bryan Chalk Ln, Knightdale, NC 27545" },
  { name: "Lead Mine Elementary", coordinates: [-78.7382, 35.8396], type: 'elementary', address: "5921 Lead Mine Rd, Raleigh, NC 27612" },
  { name: "Lake Myra Elementary", coordinates: [-78.6282, 35.7696], type: 'elementary', address: "515 Lake Myra Rd, Wendell, NC 27591" },
  { name: "Lockhart Elementary", coordinates: [-78.5482, 35.7496], type: 'elementary', address: "4201 Old Poole Rd, Raleigh, NC 27610" },
  { name: "Lynn Road Elementary", coordinates: [-78.6582, 35.8096], type: 'elementary', address: "4700 Lynn Rd, Raleigh, NC 27612" },
  { name: "Millbrook Elementary", coordinates: [-78.5782, 35.8396], type: 'elementary', address: "1808 Spring Forest Rd, Raleigh, NC 27615" },
  { name: "Mount Vernon", coordinates: [-78.6882, 35.7496], type: 'elementary', address: "1400 Rock Quarry Rd, Raleigh, NC 27610" },
  { name: "North Garner Middle", coordinates: [-78.5682, 35.7296], type: 'middle', address: "4350 Garner Rd, Garner, NC 27529" },
  { name: "Phillips High", coordinates: [-78.6182, 35.7196], type: 'high', address: "300 W Millbrook Rd, Raleigh, NC 27609" },
  { name: "Poe Elementary", coordinates: [-78.5882, 35.7496], type: 'elementary', address: "4350 Poe Dr, Raleigh, NC 27610" },
  { name: "Pleasant Grove Elementary", coordinates: [-78.6482, 35.7396], type: 'elementary', address: "1901 Pleasant Grove Church Rd, Raleigh, NC 27610" },
  { name: "Powell Elementary", coordinates: [-78.5182, 35.7696], type: 'elementary', address: "3925 Powell Dr, Raleigh, NC 27616" },
  { name: "Rand Road Elementary", coordinates: [-78.6082, 35.7896], type: 'elementary', address: "1500 Rand Rd, Garner, NC 27529" },
];
