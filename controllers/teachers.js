const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { age, graduation, date } = require('../utils')

// INDEX
exports.index = function (req, res) {

    for (teacher of data.teachers) {
      const acting = teacher.acting.toString().split(',')
      teacher.acting = acting
    }
 
  return res.render('teachers/index', { teachers: data.teachers})
}

//create
exports.create = function (req, res) {
  return res.render('teachers/create')
}

// SHOW
exports.show = function (req, res) {
  const { id } = req.params

  const foundTeacher = data.teachers.find(function (teacher) {
    return id == teacher.id
  })

  if (!foundTeacher) {
    return res.send('Teacher not found!')
  }

  const teacher = {
    ...foundTeacher,
    date: age(foundTeacher.date),
    degree: graduation(foundTeacher.degree),
    acting: foundTeacher.acting.toString().split(","),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
  }

  return res.render('teachers/show', { teacher })
}


// CREATE 
exports.post = function (req, res) {
  const keys = Object.keys(req.body) // CREATE ARRAY

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Error')
    }
  }

  // OBJECT  DESTRUCTIRING
  let { avatar_url, name, date, degree, typeOfClass, acting } = req.body

  date = Date.parse(req.body.date)
  const created_at = Date.now() // TODAY'S DATE
  const id = Number(data.teachers.length + 1)

  data.teachers.push({
    id,
    name,
    avatar_url,
    date,
    degree,
    typeOfClass,
    acting,
    created_at
  })

  // CRIANDO CALL BACK
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error!')

    return res.redirect('./teachers')
  })

}

// EDIT
exports.edit = function (req, res) {
  const { id } = req.params


  const foundTeacher = data.teachers.find(function (teacher) {
    return id == teacher.id
  })

  if (!foundTeacher) {
    return res.send('Teacher not found!')
  }

  const teacher = {
    ...foundTeacher,
    date: date(foundTeacher.date).iso,
  }

  return res.render('teachers/edit', { teacher })
}

// PUT
exports.put = function (req, res) {
  const id = req.body.id

  let index = 0

  const foundTeachers = data.teachers.find(function (teacher, foundIndex) {
    if (id == teacher.id) {
      index = foundIndex
      return true
    }
  })


  if (!foundTeachers) {
    return res.send('Teacher no found')
  }

  const teacher = {
    ...foundTeachers,
    ...(req.body),
    id: Number(id),
    date: Date.parse(req.body.date)
  }

  data.teachers[index] = teacher

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error!")
    }

    return res.redirect(`teachers/${id}`)
  })
}

// DELETE
exports.delete = function (req, res) {
  const { id } = req.body
  const filteredTeacher = data.teachers.filter(function (teacher) {
    return teacher.id != id
  })

  data.teachers = filteredTeacher

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error!")
    }

    return res.redirect('/teachers')
  })
}
