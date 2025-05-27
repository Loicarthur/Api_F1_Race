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
    leagueId: "6834adb8d73b04120a897282",
    userId: "67f91f7cc9dc218285b4fb0e",
    admin: true
  }) {
    league {
      id
      leagueName
      maxParticipants
      users {
        user {
          id
          username
          email
        }
        admin
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

Quitter une ligue
mutation {
  leaveLeague(input: { leagueId: "id-league", userId: "id-user" }) {
    success
    message
  }
}

Prédiction position et prediction DNF d'un joueur dans une ligue sur les pilotes
mutation {
  submitPrediction(input: { 
    leagueId: "LEAGUE_ID", 
    userId: "USER_ID", 
    predictedPosition: "P1", 
    predictedDNF: "Driver1" 
  }) {
    success
    message
  }
}

query {
  calculateLeagueRanking(leagueId: "67fa644bf11f5b662b8adfd9") {
    ranking {
      id
      username
      totalPoints
      positionPoints
      bonusPoints
    }
    httpStatus
  }
}

// Système de points pour les positions
const POINTS_SYSTEM: { [position: string]: number } = {
  P1: 1,
  P2: 2,
  P3: 4,
  P4: 6,
  P5: 8,
  P6: 10,
  P7: 12,
  P8: 15,
  P9: 18,
  P10: 25,
  P11: 18,
  P12: 15,
  P13: 12,
  P14: 10,
  P15: 8,
  P16: 6,
  P17: 4,
  P18: 2,
  P19: 1,
  P20: 1,
};


//pousser les drivers et les écuries dans la bdd
mutation {
   syncDriversAndEcuries {
    success
    message
  }
}

