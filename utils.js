module.exports = {
  age: function(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age -1
    }

    return age
  },
  date: function(timestamps){
    const date = new Date(timestamps)
    
    const year = date.getUTCFullYear()

    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    
    const day = `0${date.getUTCDate() }`.slice(-2)
    
    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },
  grade: function (schoolYear) {
    if (schoolYear == "5ºEF") {
      return "5º ano ensino fundamental";
    } else if (schoolYear == "6ºEF") {
      return "6º ano ensino fundamental";
    } else if (schoolYear == "7ºEF") {
      return "7º ano ensino fundamental";
    } else if (schoolYear == "8ºEF") {
      return "8º ano ensino fundamental"
    } else if (schoolYear == "1ºEM") {
      return "1º ano ensino médio";
    } else if (schoolYear == "2ºEM") {
      return "2º ano ensino médio";
    } else {
      return "3º ano do ensino médio"
    }
  },
  graduation: function(graduation){
    if (graduation == "High Complete"){
        return ("Complete High School")
      } else if ( graduation == "Higher Complete") {
        return ("Complete Higher education")
      } else if ( graduation == "Master") {
        return ("Master's")
      } else {
        return ("Doctorate degree")
      }
  }
}