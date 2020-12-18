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

function createSchool() {
  let students = [];

  function getCourse(student, courseName) {
    return student.courses.filter(({name}) => name === courseName)[0];
  }

  return {
    addStudent(name, year) {
      const validYears = ['1st', '2nd', '3rd', '4th', '5th'];

      if (!validYears.includes(year)) {
        console.log('Invalid Year');
        return;
      }

      let student = createStudent(name, year);
      students.push(student);
      return student;
    },

    enrollStudent(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode});
    },

    addGrade(student, courseName, grade) {
      let course = getCourse(student, courseName);
      
      if (course) {
        course.grade = grade;
      }
    },

    getReportCard(student) {
      student.courses.forEach(({name, grade}) => {
        console.log(`${name}: ${grade || 'In progress'}`);
      })
    },

    courseReport(courseName) {
      console.log(`=${courseName} Grades=`);
      let grades = [];

      students.forEach(student => {
        let course = getCourse(student, courseName);

        if (course) {
          console.log(`${student.name}: ${course.grade}`);
        }

        grades.push(course.grade);
      })

      console.log('---');

      let courseAverage = grades.reduce((sum, grade) => sum + grade ,0) / grades.length;
      console.log(`Course Average: ${courseAverage}`);
    }
  };
}

// courseReport(courseName) {
//   function getCourse(student, courseName) {
//     return student.listCourses().filter(({name}) => name === courseName)[0];
//   }

//   const courseStudents = this.students.map(student => {
//     const course = getCourse(student, courseName) || { grade: undefined };
//     return { name: student.name, grade: course.grade };
//   }).filter(({grade}) => grade);

//   if (courseStudents.length > 0) {
//     console.log(`=${courseName} Grades=`);

//     const average = courseStudents.reduce((total, {name, grade}) => {
//       console.log(`${name}: ${String(grade)}`);
//       return total + grade;
//     }, 0) / courseStudents.length;

//     console.log('---');
//     console.log(`Course Average: ${String(average)}`);
//   }
// },


let school = createSchool();
let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);

school.getReportCard(foo);
// Math: 95
// Advanced Math: 90
// Physics: In progress

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);

let qux = school.addStudent('qux', '1st');
school.enrollStudent(qux, 'Math', 101);
school.addGrade(qux, 'Math', 93);

school.courseReport('Math');
// =Math Grades=
// foo: 95
// bar: 91
// qux: 93
// ---
// Course Average: 93

// school.courseReport('Advanced Math');
// // =Advanced Math Grades=
// // foo: 90
// // qux: 90
// // ---
// // Course Average: 90

// school.courseReport('Physics');
// // undefined