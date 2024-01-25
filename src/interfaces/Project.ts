type ProjectReducedT = {
    id: String,
    "name": String,
    "description": String,
    "noManagers": 0,
    "noEngineers": 0,
    "noGroups": 0,
    "noConsolidations": 0,
    "totalMembers": 0,
};


type ProjectFullT = {
    "name": String,
    "description": null,
    "managers": [
      {
        "email": String,
        "name": String,
        "id": String
      }
    ],
    "engineers": [
      {
        "email": String,
        "name": String,
        "id": String
      }
    ],
    "groups": [
      {
        "name": String,
        "members": [
          {
            "email": String,
            "name": String,
            "id": String
          }
        ],
        "noMembers": 0,
        "noQuestions": 0,
        "id": String,
        "createdAt": String,
        "updatedAt": String
      }
    ],
    "consolidations": [
      {
        "name": String,
        "engineer": {
          "email": String,
          "name": String,
          "id": String
        },
        "noQuestions": 0,
        "id": String
      }
    ],
    "noManagers": 0,
    "noEngineers": 0,
    "noGroups": 0,
    "noConsolidations": 0,
    "totalMembers": 0,
    "id": String,
    "createdAt": String,
    "updatedAt": String
}