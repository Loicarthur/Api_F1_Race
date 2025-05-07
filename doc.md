// Recupérer tous les ligues 
query {
  getAllLeagues {
    id
    leagueName
    joinCode
    isPrivate
    maxParticipants
  }
}

//Récupérer tous les ligues publiques
query {
  publicLeagues {
    leagues {
      id
      leagueName
      maxParticipants
      isPrivate
      joinCode
    }
    httpStatus
  }
}

//Ajouter un user dans une ligue 
mutation {
  addUserToLeague(input: {
    leagueId: "id league",
    userId: "id user",
    admin: true
  }) {
    league {
      id
      leagueName
      maxParticipants
      users {
        id
        username
        email
      }
    }
    httpStatus
  }
}

//Récupérer une ligue d'un user par son id
query {
  leaguesByUserId(input: { userId: "67f7e2e0d7ffad2031f8ee35" }) {
    id
    leagueName
    maxParticipants
    isPrivate
    joinCode
  }
}

//Supprimer une ligue
mutation {
  deleteLeague(input: { leagueId: "67fa64bdf11f5b662b8adfdf" }) {
    success
    httpStatus
    message
  }
}

//Modifier une ligue
mutation {
  modifyLeague(leagueId: "id ligue", input: {
    leagueName: "LigueChampions",
    maxParticipants: 20,
    isPrivate: true
  }) {
    league {
      id
      leagueName
      maxParticipants
      isPrivate
      joinCode
    }
    httpStatus
  }
}

Récupérer les membres d'une ligue
query {
  getMembersOfLeague(leagueId: "id_league") {
    members {
      id
      username
      email
      admin
    }
    httpStatus
  }
}

Récupérer une ligue par code join
query {
  leagueByJoinCode(input: { joinCode: "NDRXTLT1" }) {
    league {
      id
      leagueName
      maxParticipants
      isPrivate
      joinCode
    }
    error {
      message
      code
    }
    httpStatus
  }
}

