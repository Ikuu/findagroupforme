var Users = (function() {
  return {
    single: single,
    array: array,
    private: private
  }

  function single() {
    return {
_id: "552e3790943aa0e9a8d9ea2b",
email: "alex@email.com",
name: "123d",
username: "Wong",
__v: 13,
api: {
key: "2e38cc70-ce06-4a79-afca-edd41d61bd8a",
project: "New Application",
date_added: "2015-04-22T15:36:56.857Z"
},
private: false,
groups: [
{
_id: "551a9e94573e8b91c859291b",
interest: "tennis",
name: "Tennis Club"
}
],
home_location: {
type: "Point",
coordinates: [
-4.262475,
55.861754
]
},
interests: [
"baseball",
"basketball",
"hockey"
],
date_registered: "2015-04-15T10:04:00.459Z"
}
  }

  function array() {
    return [
{
_id: "54bfbacd0444730000228786",
email: "",
username: "Mark",
name: "Mark",
current_location: [
null,
null
],
address: {
street: "",
city: "",
post_code: "",
country: ""
},
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
1,
1
]
},
twitter: {
photos: [ ]
},
interests: [ ],
date_registered: "2015-01-21T14:42:21.936Z"
},
{
_id: "551a7d379e482a31bf1fc4f6",
email: "a@a.com",
name: "John Smith",
username: "Usernam3",
current_location: [ ],
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-4.356888757324214,
55.899691421659476
]
},
twitter: {
photos: [ ]
},
interests: [ ],
date_registered: "2015-03-31T10:55:51.227Z"
},
{
_id: "551a7dee32eddd49c5dd273a",
email: "a@b.com",
name: "Dvid Jones",
username: "Username1",
current_location: [ ],
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-4.461430535888667,
55.86233200525244
]
},
twitter: {
photos: [ ]
},
interests: [ ],
date_registered: "2015-03-31T10:58:54.038Z"
},
{
_id: "55203656816f4f1848bd7d4c",
email: "new@email.com",
name: "Michale Smith",
username: "Michale",
current_location: [ ],
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-4.185227380371089,
55.89372403144663
]
},
twitter: {
photos: [ ]
},
interests: [ ],
date_registered: "2015-04-04T19:07:02.304Z"
},
{
_id: "552ac7c1afeedf3c71e3afb7",
email: "revolution6000@gmail.com",
username: "Alexander Andrew Anderson",
name: "Alexander Andrew Anderson",
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-4.251806,
55.864237
]
},
facebook: {
name: "Alexander Andrew Anderson",
token: "CAAD5v4bTlDwBAMPSAdAdFxejVE1ZB4k3RxDChEqLPPgzxNLnzqOu2oZBZB97r9jZCurKt877uWm0rDSHhY1ZBee7QV6MfZAJj1BBDqjgMSySdYJMGM4ZAptFaFksmFkGNv2UVW7uZAlxjtmDfvlVigN2ytZC0LupQxO4OyKZAHUCpoJWazFYwDfI46Yuh9946jssFE9vsErzZCVzx2GfFBKg1CX",
id: 10205436865708250
},
twitter: {
photos: [ ]
},
interests: [ ],
date_registered: "2015-04-12T19:30:09.899Z"
},
{
_id: "552ac874f017188479a06051",
email: "revolution6000@gmail.com",
name: "Alexander Anderson",
username: "revolution6000@gmail.com",
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-0.125891,
51.5062
]
},
google: {
name: "Alexander Anderson",
token: "ya29.UwFlseemNDwF9UwjGIJ47hwc3t2w6ar3Ob0wGBkdhBwbKiF73xpB747vdjkz1i56Ipo1BCsE69kAIw",
id: 107129779927090710000
},
twitter: {
photos: [ ]
},
interests: [ ],
date_registered: "2015-04-12T19:33:08.139Z"
},
{
_id: "552e3079438f2875a746659f",
email: "dave@smit.com",
name: "Alex",
username: "New user #3",
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-4.413537011718745,
55.88140135440035
]
},
interests: [ ],
date_registered: "2015-04-15T09:33:45.146Z"
},
{
_id: "552e32ea422d48e5aa09301d",
email: "123@321.com",
name: "fff",
username: "Newwww",
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-4.102143273925776,
55.89391654223175
]
},
interests: [ ],
date_registered: "2015-04-15T09:44:10.103Z"
},
{
_id: "552e33c28701033d987e9cc6",
email: "123@321@mail.com",
name: "Alexxx",
username: "New User #4",
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-4.328736291503901,
55.88987361516173
]
},
interests: [ ],
date_registered: "2015-04-15T09:47:46.489Z"
},
{
_id: "552f8c1c3e954baa33074580",
email: "adsasd@sdfsdf.com",
name: "asdasd",
username: "asdasdasd",
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-4.262475,
55.861754
]
},
interests: [ ],
date_registered: "2015-04-16T10:17:00.498Z"
},
{
_id: "5534dfe0c04362e0cd0b0f2e",
username: "1kuu",
name: "Alex",
__v: 0,
private: false,
groups: [ ],
home_location: {
type: "Point",
coordinates: [
-0.125891,
51.5062
]
},
twitter: {
displayName: "Alex",
username: "1kuu",
id: 83717872
},
interests: [ ],
date_registered: "2015-04-20T11:15:44.644Z"
},
{
_id: "547b6252ee09fef8405d1834",
email: "revolution6000@gmail.com",
username: "Ikuu00",
name: "Alex",
current_location: [ ],
address: {
street: "1 King Street",
city: "Paisley",
post_code: "PA1 2PP",
country: "United Kingdom"
},
__v: 75,
private: false,
groups: [
{
_id: "54bf8b8666a4350000a8378c",
interest: "soccer",
name: "Soccer Group"
},
{
_id: "5518513ad659c5509ea27482",
name: "Generated judo Group",
interest: "judo"
},
{
_id: "55198e2506cfb185390e9a10",
interest: "golf",
name: "Erskine Golf Club"
},
{
_id: "5519d930935909d9380bc4a0",
interest: "basketball",
name: "Basketball Group"
},
{
_id: "551dd9607facf61cf61fa12a",
name: "Generated 123 Group",
interest: "123"
}
],
home_location: {
type: "Point",
coordinates: [
-4.439222500000028,
55.8440731
]
},
twitter: {
photos: [ ]
},
interests: [
"football",
"golf"
],
date_registered: "2014-11-30T18:30:42.292Z"
},
{
_id: "54bd693719aee30000967768",
email: "revolution6000@gmail.com",
username: "Ikuu",
name: "Alexander Anderson",
current_location: [
1,
1
],
address: {
street: "151 Flures Drive",
city: "Erskine",
post_code: "PA8 7DF",
country: "United Kingdom"
},
__v: 49,
api: {
key: "e125dcd6-3236-449e-a06f-ac0f72014dd0",
project: "New App",
date_added: "2015-04-14T17:36:14.262Z"
},
private: true,
groups: [
{
_id: "54bf8b8666a4350000a8378c",
interest: "soccer",
name: "Soccer Group"
},
{
_id: "5518513ad659c5509ea27482",
name: "Generated judo Group",
interest: "judo"
},
{
_id: "551a9e94573e8b91c859291b",
interest: "tennis",
name: "Tennis Club"
},
{
_id: "551dd9607facf61cf61fa12a",
name: "Generated 123 Group",
interest: "123"
}
],
home_location: {
type: "Point",
coordinates: [
-4.448469161987305,
55.9058849515648
]
},
twitter: {
photos: [ ]
},
interests: [
"football",
"basketball"
],
date_registered: "2015-01-19T20:29:43.218Z"
},
{
_id: "552e3790943aa0e9a8d9ea2b",
email: "alex@email.com",
name: "123d",
username: "Wong",
__v: 13,
api: {
key: "2e38cc70-ce06-4a79-afca-edd41d61bd8a",
project: "New Application",
date_added: "2015-04-22T15:36:56.857Z"
},
private: false,
groups: [
{
_id: "551a9e94573e8b91c859291b",
interest: "tennis",
name: "Tennis Club"
}
],
home_location: {
type: "Point",
coordinates: [
-4.262475,
55.861754
]
},
interests: [
"baseball",
"basketball",
"hockey"
],
date_registered: "2015-04-15T10:04:00.459Z"
},
{
_id: "552f8f99cda1fe0e325929a2",
email: "alex@gmail.com",
name: "Alex",
username: "Won",
__v: 7,
private: false,
groups: [
{
_id: "552f921411bf5e2a1d1cccf6",
name: "Generated baseball Group",
interest: "baseball"
},
{
_id: "551dd9607facf61cf61fa12a",
name: "Generated 123 Group",
interest: "123"
}
],
home_location: {
type: "Point",
coordinates: [
-4.213036523437495,
55.871193675588025
]
},
interests: [
"baseball",
"hockey",
"basketball",
"football",
"golf"
],
date_registered: "2015-04-16T10:31:53.499Z"
}
];
  }

  function private() {
    return {
      _id: "54bd693719aee30000967768",
      username: "Ikuu",
      private: true
    }
  }
})();