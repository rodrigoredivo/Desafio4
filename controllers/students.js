const fs = require('fs')
const data = require('../data.json')
const { grade ,date } = require('../utils')

// INDEX
exports.index = function (req, res) {

return res.render('students/index', { students: data.students})
}

//create
exports.create = function (req, res) {
  return res.render('students/create')
}

// SHOW
exports.show = function (req, res) {
  const { id } = req.params

  const foundstudent = data.students.find(function (student) {
    return id == student.id
  })

  if (!foundstudent) {
    return res.send('student not found!')
  }

  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth).birthDay,
    schoolYear: grade(foundstudent.schoolYear),
  }

  return res.render('students/show', { student })
}


// CREATE 
exports.post = function (req, res) {
  const keys = Object.keys(req.body) // CREATE ARRAY

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Error')
    }
  }

  birth = Date.parse(req.body.birth)

  let id = 1

  const lastStudent = data.students[data.students.length - 1]

  if (lastStudent) {
    id = lastStudent.id + 1
  }

  data.students.push({
    id,
    ...req.body,
    birth
  })

  // CRIANDO CALL BACK
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error!')

    return res.redirect('./students')
  })

}

// EDIT
exports.edit = function (req, res) {
  const { id } = req.params


  const foundstudent = data.students.find(function (student) {
    return id == student.id
  })

  if (!foundstudent) {
    return res.send('student not found!')
  }

  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth).iso,
  }

  return res.render('students/edit', { student })
}

// PUT
exports.put = function (req, res) {
  const { id } = req.body

  let index = 0

  const foundstudents = data.students.find(function (students, foundIndex) {
    if (id == students.id) {
      index = foundIndex
      return true
    }
  })


  if (!foundstudents) {
    return res.send('student no found')
  }

  const student = {
    ...foundstudents,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  }

  data.students[index] = student

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error!")
    }

    return res.redirect(`/students/${id}`)
  })
}

// DELETE
exports.delete = function (req, res) {
  const { id } = req.body
  const filteredstudent = data.students.filter(function (student) {
    return student.id != id
  })

  data.students = filteredstudent

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error!")
    }

    return res.redirect('/students')
  })
}
