var Matchmaking = (function () {
  return {
    mockUserEntries: mockUserEntries,
    mockUserDeleteEntries: mockUserDeleteEntries
  }

  function mockUserEntries() {
    return [
      {
        _id: "5534d9844b1963088fa7e8bd",
        interest: "cricket",
        user_id: "552e3790943aa0e9a8d9ea2b",
        __v: 0,
        pending: true,
        date_added: "2015-04-20T10:48:36.536Z",
        location: {
          type: "Point",
          coordinates: [
            -4.262475,
            55.861754
          ]
        }
      },
      {
        _id: "552f9111665f572e249d2e69",
        interest: "golf",
        user_id: "552e3790943aa0e9a8d9ea2b",
        __v: 0,
        pending: true,
        date_added: "2015-04-16T10:38:09.403Z",
        location: {
          type: "Point",
          coordinates: [
            -4.262475,
            55.861754
          ]
        }
      },
      {
        _id: "552f907f8648e4d6378ec8c0",
        interest: "tennis",
        user_id: "552e3790943aa0e9a8d9ea2b",
        __v: 0,
        pending: true,
        date_added: "2015-04-16T10:35:43.360Z",
        location: {
          type: "Point",
          coordinates: [
            -4.262475,
            55.861754
          ]
        }
      }
    ]
  }

  function mockUserDeleteEntries() {
    return [
      {
        _id: "5534d9844b1963088fa7e8bd",
        interest: "cricket",
        user_id: "552e3790943aa0e9a8d9ea2b",
        __v: 0,
        pending: true,
        date_added: "2015-04-20T10:48:36.536Z",
        location: {
          type: "Point",
          coordinates: [
            -4.262475,
            55.861754
          ]
        }
      },
      {
        _id: "552f907f8648e4d6378ec8c0",
        interest: "tennis",
        user_id: "552e3790943aa0e9a8d9ea2b",
        __v: 0,
        pending: true,
        date_added: "2015-04-16T10:35:43.360Z",
        location: {
          type: "Point",
          coordinates: [
            -4.262475,
            55.861754
          ]
        }
      }
    ]
  }
})();