var Groups = (function () {
  return {
    mockData: mockData,
    singleGroup: singleGroup,
    mockInterestData: mockInterestData
  };

  function mockData() {
    return [
      {
        _id: "54bf8b8666a4350000a8378c",
        description: "This is a soccer group!!!",
        interest: "soccer",
        name: "Soccer Group",
        owner: {
          _id: "54bd693719aee30000967768",
          username: "Ikuu",
          name: "Alexander Anderson"
        },
        __v: 37,
        events: [],
        posts: [],
        members: [
          {
            _id: "54bd693719aee30000967768",
            name: "Alexander Anderson",
            home_location: {
              type: "Point",
              coordinates: [
                -4.448469161987305,
                55.9058849515648
              ]
            }
          },
          {
            _id: "547b6252ee09fef8405d1834",
            name: "Alex",
            home_location: {
              type: "Point",
              coordinates: [
                -4.439222500000028,
                55.8440731
              ]
            }
          }
        ],
        location: {
          type: "Point",
          coordinates: [
            -4.467306570019559,
            55.86700381733336
          ]
        },
        private: false,
        date_created: "2015-01-21T11:20:38.440Z"
      },
      {
        _id: "5518513ad659c5509ea27482",
        name: "Generated judo Group",
        description: "This group has been created by the Matchmaking system",
        interest: "judo",
        owner: {
          _id: "547b6252ee09fef8405d1834",
          username: "Ikuu00",
          name: "Alex"
        },
        __v: 0,
        events: [],
        posts: [],
        members: [
          {
            _id: "547b6252ee09fef8405d1834",
            name: "Alex",
            home_location: {
              type: "Point",
              coordinates: [
                -4.439222500000028,
                55.8440731
              ]
            }
          },
          {
            _id: "54bd693719aee30000967768",
            name: "Alexander Anderson",
            home_location: {
              type: "Point",
              coordinates: [
                -4.448469161987305,
                55.9058849515648
              ]
            }
          }
        ],
        location: {
          type: "Point",
          coordinates: [
            -4.448216,
            55.9023
          ]
        },
        private: false,
        date_created: "2015-03-29T19:23:38.137Z"
      },
      {
        _id: "55198e2506cfb185390e9a10",
        description: "New",
        interest: "golf",
        name: "Erskine Golf Club",
        owner: {
          _id: "547b6252ee09fef8405d1834",
          username: "Ikuu00",
          name: "Alex"
        },
        __v: 1,
        events: [
          {
            name: "Night Time @ The Driving Range",
            description: "Hitting some balls late at night, everyone welcome.",
            date: "2015-04-01T22:45:00.000Z",
            _id: "55198e4606cfb185390e9a11",
            members_attending: []
          }
        ],
        posts: [],
        members: [
          {
            _id: "547b6252ee09fef8405d1834",
            name: "Alex",
            home_location: {
              type: "Point",
              coordinates: [
                -4.439222500000028,
                55.8440731
              ]
            }
          }
        ],
        location: {
          type: "Point",
          coordinates: [
            -4.448216,
            55.9023
          ]
        },
        private: true,
        date_created: "2015-03-30T17:55:49.374Z"
      },
      {
        _id: "551a9e94573e8b91c859291b",
        description: "big hype things lol",
        interest: "tennis",
        name: "Tennis Club",
        owner: {
          _id: "54bd693719aee30000967768",
          username: "Ikuu",
          name: "Alexander Anderson"
        },
        __v: 1,
        events: [],
        posts: [],
        members: [
          {
            _id: "54bd693719aee30000967768",
            name: "Alexander Anderson",
            home_location: {
              type: "Point",
              coordinates: [
                -4.448469161987305,
                55.9058849515648
              ]
            }
          },
          {
            _id: "552e3790943aa0e9a8d9ea2b",
            name: "123",
            home_location: {
              type: "Point",
              coordinates: [
                -4.262475,
                55.861754
              ]
            }
          }
        ],
        location: {
          type: "Point",
          coordinates: [
            -4.747590051269526,
            55.93355340327829
          ]
        },
        private: false,
        date_created: "2015-03-31T13:18:12.665Z"
      },
      {
        _id: "5519d930935909d9380bc4a0",
        description: "12345",
        interest: "basketball",
        name: "Basketball Group",
        owner: {
          _id: "547b6252ee09fef8405d1834",
          username: "Ikuu00",
          name: "Alex"
        },
        __v: 2,
        events: [
          {
            name: "Basketball Pick-Up",
            description: "Fun game!",
            date: "2015-04-03T22:36:00.000Z",
            _id: "5519d959935909d9380bc4a1",
            members_attending: []
          },
          {
            name: "Basketball 5v5 League Game",
            description: "Serious game!",
            date: "2015-04-03T22:35:00.000Z",
            _id: "5519d959935909d9380bc4a1",
            members_attending: []
          },
          {
            name: "New Event",
            description: "Tonight",
            date: "2015-04-08T19:00:00.000Z",
            _id: "552571903aa25b2585b795ec",
            members_attending: []
          }
        ],
        posts: [],
        members: [
          {
            _id: "547b6252ee09fef8405d1834",
            name: "Alex",
            home_location: {
              type: "Point",
              coordinates: [
                -4.439222500000028,
                55.8440731
              ]
            }
          }
        ],
        location: {
          type: "Point",
          coordinates: [
            -4.445,
            55.88
          ]
        },
        private: false,
        date_created: "2015-03-30T23:16:00.126Z"
      },
      {
        _id: "551dd9607facf61cf61fa12a",
        name: "Generated 123 Group",
        description: "This group has been created by the Matchmaking system",
        interest: "123",
        owner: {
          _id: "547b6252ee09fef8405d1834",
          username: "Ikuu00",
          name: "Alex"
        },
        __v: 2,
        events: [],
        posts: [],
        members: [
          {
            _id: "547b6252ee09fef8405d1834",
            name: "Alex",
            home_location: {
              type: "Point",
              coordinates: [
                -4.439222500000028,
                55.8440731
              ]
            }
          },
          {
            _id: "54bd693719aee30000967768",
            name: "Alexander Anderson",
            home_location: {
              type: "Point",
              coordinates: [
                -4.448469161987305,
                55.9058849515648
              ]
            }
          },
          {
            _id: "552f8f99cda1fe0e325929a2",
            name: "Alex",
            home_location: {
              type: "Point",
              coordinates: [
                -4.213036523437495,
                55.871193675588025
              ]
            }
          },
          {
            _id: "552e3790943aa0e9a8d9ea2b",
            name: "123",
            home_location: {
              type: "Point",
              coordinates: [
                -4.262475,
                55.861754
              ]
            }
          }
        ],
        location: {
          type: "Point",
          coordinates: [
            -4.438512802124023,
            55.87488797431427
          ]
        },
        private: false,
        date_created: "2015-04-03T00:05:52.370Z"
      },
      {
        _id: "552f921411bf5e2a1d1cccf6",
        name: "Generated baseball Group",
        description: "This group has been created by the Matchmaking system",
        interest: "baseball",
        owner: {
          _id: "552f8f99cda1fe0e325929a2",
          name: "Alex",
          username: "Won"
        },
        __v: 8,
        events: [],
        posts: [],
        members: [
          {
            _id: "552f8f99cda1fe0e325929a2",
            name: "Alex",
            home_location: {
              type: "Point",
              coordinates: [
                -4.213036523437495,
                55.871193675588025
              ]
            }
          },
          {
            _id: "552e3790943aa0e9a8d9ea2b",
            name: "123",
            home_location: {
              type: "Point",
              coordinates: [
                -4.262475,
                55.861754
              ]
            }
          }
        ],
        location: {
          type: "Point",
          coordinates: [
            -4.237755761718748,
            55.86647383779401
          ]
        },
        private: false,
        date_created: "2015-04-16T10:42:28.755Z"
      }
    ]
  }

  function singleGroup() {
    return {
owner: false,
member: false,
group: {
_id: "54bf8b8666a4350000a8378c",
description: "This is a soccer group!!!",
interest: "soccer",
name: "Soccer Group",
owner: {
_id: "54bd693719aee30000967768",
username: "Ikuu",
name: "Alexander Anderson"
},
__v: 37,
events: [ ],
posts: [ ],
members: [
{
_id: "54bd693719aee30000967768",
name: "Alexander Anderson",
home_location: {
type: "Point",
coordinates: [
-4.448469161987305,
55.9058849515648
]
}
},
{
_id: "547b6252ee09fef8405d1834",
name: "Alex",
home_location: {
type: "Point",
coordinates: [
-4.439222500000028,
55.8440731
]
}
}
],
location: {
type: "Point",
coordinates: [
-4.467306570019559,
55.86700381733336
]
},
private: false,
date_created: "2015-01-21T11:20:38.440Z"
}
}
  }

  function mockInterestData() {
    return [
      {
        _id: "54bf8b8666a4350000a8378c",
        description: "This is a soccer group!!!",
        interest: "soccer",
        name: "Soccer Group",
        owner: {
          _id: "54bd693719aee30000967768",
          username: "Ikuu",
          name: "Alexander Anderson"
        },
        __v: 37,
        events: [],
        posts: [],
        members: [
          {
            _id: "54bd693719aee30000967768",
            name: "Alexander Anderson",
            home_location: {
              type: "Point",
              coordinates: [
                -4.448469161987305,
                55.9058849515648
              ]
            }
          },
          {
            _id: "547b6252ee09fef8405d1834",
            name: "Alex",
            home_location: {
              type: "Point",
              coordinates: [
                -4.439222500000028,
                55.8440731
              ]
            }
          }
        ],
        location: {
          type: "Point",
          coordinates: [
            -4.467306570019559,
            55.86700381733336
          ]
        },
        private: false,
        date_created: "2015-01-21T11:20:38.440Z"
      }
    ]
  }
})();