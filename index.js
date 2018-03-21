const fetch = require('node-fetch')
const fs = require('fs')

const key = require('./key').key
console.log(key)

let queries = [
  'Bergstraat 4, Ede',
  'Platteelhof 3, Ede',
  'Minister Aalbersepark 1, Ede',
  'Raadhuisplein 2, Ede',
  'Hegelstate 17, Ede',
  'Lunterseweg 25, Ede',
  'Stakenberg 94, Ede',
  'Balgzand 2, Ede',
  'Amsterdamseweg 19, Ede',
  'De Ruyterstraat 1, Ede',
  'Molenstraat 45, Ede',
  'Veenderweg 193, Ede',
  'Schaapsweg 7A, Ede',
  'Korenbloemlaan 9A, Ede',
  'Louise Henriettelaan 17, Ede',
  'Willy Brandtlaan 40, Ede',
  'Laan der Verenigde Naties 94, Ede', 
  'Pollenstein 174, Ede',
  'Loevestein 33, Ede',
  'Begonialaan 42, Ede',
   'Heyendaal 10, Ede',
   'Munnikenhof 17, Ede',
   'Hoflaan 2, Ede',
   'Parkrand 60, Ede',
   'Jan Th. Tooroplaan 133, Ede',
    'Akulaan 10, Ede',
   'Nieuwe Maanderbuurtweg 2, Ede',
   'Industrielaan 1, Ede',
   'Mondriaanstraat 22, Ede',
   'Reehorsterweg 80, Ede',
   'Jan Voermanstraat 1, Ede',
   'Stadspoort 28, Ede',
   'Willy Brandtlaan 10, Ede',
   'NS Station Ede-Wageningen',
]

let locations = [
'Ede',
'1het Raadhuis, hoofdingang, Bergstraat 4',
'2Verzorgingshuis Bethanie, Platteelhof 3, ingang Kerkzaal',
'3Vilente De Nieuwe Klinkenberg, Nieuwe Klinkenberg 1',
'4Vilente St. Barbara, Minister Aalbersepark 1',
'5De Doelen, Raadhuisplein 2',
'6De Wonewei, Hegelstate 17',
'7de Petrakerk, Lunterseweg 25',
'8Elim, Stakenberg 94',
'9CNS-basisschool De Vuursteen, Balgzand 2',
'10Restaurant Buitenzorg, Amsterdamseweg 19',
'11Basisschool De Lettertuin, De Ruyterstraat 1',
'12Cultura, Molenstraat 45',
'13de Proosdijkerk (aan de rotonde), Veenderweg 193',
'14Buurtcentrum De Kolk, Schaapsweg 7A',
'15Speeltuin De Korenbloem, Korenbloemlaan 9A',
'16Verzorgingshuis Het Maanderzand, Louise Henriettelaan 17',
'17De Gelderhorst, Willy Brandtlaan 40',
'18Kerkelijk Centrum Emmaüs, Laan der Verenigde Naties 94',
'20Vilente De Pleinen, Pollenstein 174',
'21kantoor Nationale Nederlanden, Loevestein 33',
'22Ons Eigen Honk, Begonialaan 42',
'23De Ark, Heyendaal 10',
'24Wijkcentrum De Velder, Munnikenhof 17',
'26De Open Hof, Hoflaan 2',
'29Het Kernhuis, Parkrand 60',
'30de Bethelkerk, Jan Th. Tooroplaan 133',
'31Poortgebouw Enka, Akulaan 10',
'33de Koepelschool, Nieuwe Maanderbuurtweg 2',
'34De Meerpaal, Industrielaan 1',
'35de Koningin Beatrixschool, Mondriaanstraat 22',
'36ROC A12, Reehorsterweg 80',
'37Dependance Beatrixschool, Jan Voermanstraat 1',
'38Cultura Stadspoort, Stadspoort 28',
'39Ziekenhuis Gelderse Vallei, Willy Brandtlaan 10',
'98NS-station Ede-Wageningen, Stationsplein 6, 07:00 - 10:00 en van 16:00 - 19:00 uur',
'Bennekom',
'40’t Kerkheem, Kerkhoflaan 34 ',
'41De Ontmoeting, Emmalaan 1',
'42De Edelzanger, Laarweg 80A',
'43Walraven, Oost-Breukelderweg 1',
'45De Brink, Brinkstraat 39, ingang Krulweg',
'46CNS-basisschool Juliana, Halderweg 43',
'47Tennishal Keltenwoud, Langschoterweg 9',
'49de School met de Bijbel, Rijnsteeg 5',
'Lunteren',
'50De Honskamp, hoofdingang, Dorpsstraat 25',
'51School met de Bijbel De Bron, Postweg 7',
'52Het Westhoffhuis, Dorpsstraat 28',
'53De Schakel, Schaepmanstraat 58',
'55Hotel-Bistro De Wormshoef, Dorpsstraat 192',
'58de Nederwoudschool, Kruisbeekweg 45',
'59Basisschool De Valk, Hoge Valkseweg 37',
'Ederveen',
'60Dorpshuis De Zicht, Marktplein 10',
'Harskamp',
'70Wijkservicecentrum Metje, Smachtenburgerhof 1',
'71Dorpscentrum De Spil, Molenweg 8',
'Wekerom',
'80Kulturhus Wekerom, Dorpsplein 1',
'Otterlo',
'90Dorpshuis De Aanloop, Sportlaan 5',
'Hoenderloo',
'99Hotel-Restaurant Buitenlust, Apeldoornseweg 30, 18:00 - 21:00 uur',
]

let lastVillage;

locations = locations.map((location) => {
  if (isNaN(parseInt(location.slice(0,2)))) {
    lastVillage = location
    return
  }
  let sanitizedLocation = {
    village: lastVillage,
    id: location.slice(0, 2),
    title: location.slice(2, location.length).split(',')[0],
    address: location.slice(2, location.length).split(',')[1], 
  }
  const restrictions = location.slice(3, location.length).split(',')[2]
  if (restrictions) {
    sanitizedLocation.restrictions = restrictions
  }
  console.log(sanitizedLocation)
  return sanitizedLocation
}).filter((location) => (location) ? true : false)

let results = []
locations.forEach((location) => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.address}, ${location.village}&key=${key}`)
    .then(result => result.json())
    .then(result => {
      if (result.results[0]) {
        location.geometry = result.results[0].geometry.location
      } else {
        location.error = result.status
      }
      results.push(location)
      return result
    })
    .then(result => fs.writeFileSync('./data.json', JSON.stringify(results)))
})

