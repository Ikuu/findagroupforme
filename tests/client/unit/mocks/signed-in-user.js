var SignedInUser = (function () {
  return {
    mockData: mockData,
    mockSessionData: mockSessionData
  };

  function mockData() {
    return {
      _id: "552e3790943aa0e9a8d9ea2b",
      email: "alex@email.com",
      password: "f9e425fb1d3826eebd76a1d1420cfc175fbba3a3",
      name: "123",
      username: "Wong",
      __v: 11,
      strategy: "local",
      salt: "R3CGPFMIov7L8sbiIbsRsw==",
      messages: [
        {
          sender: "The Matchmaking Service",
          text: "A group has been formed, <a href='./#/groups/552f921411bf5e2a1d1cccf6'>click here</a> to view more.",
          _id: "552f921411bf5e2a1d1cccf7",
          viewed: false,
          date: "2015-04-16T10:42:28.759Z"
        },
        {
          sender: "The Matchmaking Service",
          text: "A group has been found for cricket, <a href='./#/match/5534d9844b1963088fa7e8c0'>click here</a> for more information.",
          _id: "5534d9844b1963088fa7e8c3",
          viewed: false,
          date: "2015-04-20T10:48:36.548Z"
        }
      ],
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
        },
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

  function mockSessionData() {
    return {
      _id: "552e3790943aa0e9a8d9ea2b",
      email: "alex@email.com",
      name: "123",
      username: "Wong",
      __v: 11,
      strategy: "local",
      messages: [
        {
          sender: "The Matchmaking Service",
          text: "A group has been formed, <a href='./#/groups/552f921411bf5e2a1d1cccf6'>click here</a> to view more.",
          _id: "552f921411bf5e2a1d1cccf7",
          viewed: false,
          date: "2015-04-16T10:42:28.759Z"
        },
        {
          sender: "The Matchmaking Service",
          text: "A group has been found for cricket, <a href='./#/match/5534d9844b1963088fa7e8c0'>click here</a> for more information.",
          _id: "5534d9844b1963088fa7e8c3",
          viewed: false,
          date: "2015-04-20T10:48:36.548Z"
        }
      ],
      private: false,
      groups: [
        {
          _id: "552f921411bf5e2a1d1cccf6",
          name: "Generated baseball Group",
          interest: "baseball",
          events: [],
          location: {
            type: "Point",
            coordinates: [
              -4.237755761718748,
              55.86647383779401
            ]
          }
        },
        {
          _id: "551dd9607facf61cf61fa12a",
          name: "Generated 123 Group",
          interest: "123",
          events: [],
          location: {
            type: "Point",
            coordinates: [
              -4.438512802124023,
              55.87488797431427
            ]
          }
        },
        {
          _id: "551a9e94573e8b91c859291b",
          interest: "tennis",
          name: "Tennis Club",
          events: [],
          location: {
            type: "Point",
            coordinates: [
              -4.747590051269526,
              55.93355340327829
            ]
          }
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
})();