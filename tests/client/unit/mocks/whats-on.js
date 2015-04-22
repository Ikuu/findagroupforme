var WhatsOn = (function () {
  return {
    events: events,
    noEvents: noEvents
  }

  function events() {
    return {
      user: {type: 'Point', coordinates: [-4.262475, 55.861754]},
      results: [{
        dis: 1631.0859840060004,
        obj: {
          name: 'Generated baseball Group',
          description: 'This group has been created by the Matchmaking system',
          interest: 'baseball',
          owner: '552f8f99cda1fe0e325929a2',
          __v: 10,
          _id: '552f921411bf5e2a1d1cccf6',
          events: [{
            name: 'New Event',
            description: 'for testing',
            date: 'Wed Apr 22 2015 23:30:00 GMT+0100 (GMT Daylight Time)',
            _id: '553809a66e45bc62239810ef',
            members_attending: []
          }],
          posts: [],
          members: ['552f8f99cda1fe0e325929a2'],
          location: {
            type: 'Point',
            coordinates: [-4.237755761718748, 55.86647383779401]
          },
          private: false,
          date_created: 'Thu Apr 16 2015 11:42:28 GMT+0100 (GMT Daylight Time)'
        }
      }]
    }
  }

  function noEvents() {
    return {
      user: {type: "Point", coordinates: [-4.262475, 55.861754]}, message: "no events found"
    }
  }
})();