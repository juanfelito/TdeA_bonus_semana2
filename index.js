const { courses } = require('./data')
const express = require('express')

const options = {
    id: {
        alias: 'i',
        demand: true
    },
    name: {
        alias: 'n',
        demand: true
    },
    cedula: {
        alias: 'x',
        demand: true
    }
}

const argv = require('yargs')
                .command('inscribir', 'Inscripción a un curso', options)
                .argv

const app = express()
let texto = ''

const printCourses = () => {
    courses.forEach(course => {
        const stringTemplate = `El curso con el nombre ${course.name} identificado con el id ${course.id} tiene una duración de ${course.duration} horas y un valor de ${course.cost} pesos.`
        texto += stringTemplate + "<br>"
    })
}

const generarTxt = (course, cedula, name) => {
    texto = `El estudiante ${name} con cédula ${cedula} se ha matriculado en el curso ${course.name} que tiene una duración de ${course.duration} horas y un valor de ${course.cost} pesos.`
}

const cursoNoEncontrado = (id) => {
    texto = `No se encuentra ningún curso con el id ${id}<br>`
    texto += 'A continuación encontrará la información de nuestros cursos<br>'
    printCourses()
}

const realizarInscripcion = () => {
    const { id, cedula, name } = argv

    const course = courses.find(course => {
        return id === course.id
    })

    course ? generarTxt(course, cedula, name) : cursoNoEncontrado(id)
}

const comando = argv._[0]
comando === 'inscribir' ? realizarInscripcion() : printCourses()

app.get('/', function (req, res) {
    res.send(texto)
})

app.listen(3000)
console.log('Aplicación escuchando en puerto 3000')