// function createStudent(name, year) {
//   let courses = {};

//   function hasNotes(course) {
//     return Object.keys(course).includes('notes');
//   }

//   return {
//     info() {
//       console.log(`${name} is a ${year} year student`);
//     },

//     listCourses() {
//       console.log(Object.values(courses));
//     },

//     addCourse(course) {
//       courses[course.code] = course;
//     },

//     addNote(code, newNote) {
//       if (!hasNotes(courses[code])) {
//         courses[code].notes = [];
//       }

//       courses[code].notes.push(newNote);
//     },

//     updateNote(code, newNote) {
//       courses[code].notes = [];
//       this.addNote(code, newNote);
//     },

//     viewNotes() {
//       Object.values(courses).forEach(course => {
//         if (hasNotes(course) && course.notes.length > 0) {
//           console.log(`${course.name}: ${course.notes.join('; ')}`);
//         }
//       })
//     }
//   };
// }

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        if (course.note) {
          course.note += `; ${note}`;
        } else {
          course.note = note;
        }
      }

    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        course.note = note;
      }
    },
  };
}

foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'English', code: 103 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advanced Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"
foo.updateNote(104, 'Fun course');