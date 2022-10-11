const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//Тут лежат все модели данных для работы с БД
//Сначала написаны сущности, потом связи между ними

const User = sequelize.define('User',{
  email:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
  },
  username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  }
},{
  timestamps: false
})


const Courses = sequelize.define(
  "courses",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(4), allowNull: false },
  },
  {
    // define the table's name
    tableName: "courses",
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);

const CourseLevels = sequelize.define(
  "courselevels",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    level: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
   
    createdAt: false,
    updatedAt: false,
  }
);

const DateTable = sequelize.define(
  "datetable",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.RANGE(DataTypes.DATEONLY), allowNull: false },
  },
  {

    tableName: "datetable",
    createdAt: false,
    updatedAt: false,
  }
);

const RatingCourses = sequelize.define(
  "ratingcourses",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

const RatingCount = sequelize.define(
  "ratingcount",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "ratingcount",
    createdAt: false,
    updatedAt: false,
  }
);

const StudentsSAD = sequelize.define(
  "studentssad",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studnumber: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "studentssad",
    createdAt: false,
    updatedAt: false,
  }
);

const StudentsVacation = sequelize.define(
  "studentsvacation",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studnumber: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "studentsvacation",
    createdAt: false,
    updatedAt: false,
  }
);

const StudentsFree = sequelize.define(
  "studentsfree",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studnumber: { type: DataTypes.INTEGER, allowNull: false },
  },
  {

    tableName: "studentsfree",
    createdAt: false,
    updatedAt: false,
  }
);

const Rating = sequelize.define(
  "rating",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    points: { type: DataTypes.DOUBLE, allowNull: false },
  },
  {

    tableName: "rating",
    createdAt: false,
    updatedAt: false,
  }
);

const Students = sequelize.define(
  "students",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studnumber: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    fullname: { type: DataTypes.STRING(70), allowNull: false },
    state: { type: DataTypes.STRING(15), allowNull: false },
    educationgroup: { type: DataTypes.STRING(10), allowNull: false },
    institute: { type: DataTypes.STRING(7), allowNull: false },
    sad: { type: DataTypes.BOOLEAN, allowNull: false },
    vacation: { type: DataTypes.BOOLEAN, allowNull: false },
    free: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {

    tableName: "students",
    createdAt: false,
    updatedAt: false,
  }
);

const StudentsRating = sequelize.define(
  "studentsrating",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    destination: { type: DataTypes.BOOLEAN, allowNull: false },
    cause: { type: DataTypes.STRING(20), allowNull: true},
  },
  {
    tableName: "studentsrating",
    createdAt: false,
    updatedAt: false,
  }
);

CourseLevels.hasMany(RatingCourses, {
  foreignKey: "levelid",
});
RatingCourses.belongsTo(CourseLevels, {
  foreignKey: "levelid",
});

Courses.hasMany(RatingCourses, {
  foreignKey: "courseid",
});
RatingCourses.belongsTo(Courses, {
  foreignKey: "courseid",
});

DateTable.hasMany(RatingCount, {
  foreignKey: "dateid",
});
RatingCount.belongsTo(DateTable, {
  foreignKey: "dateid",
});

DateTable.hasMany(StudentsFree, {
  foreignKey: "dateid",
});
StudentsFree.belongsTo(DateTable, {
  foreignKey: "dateid",
});

DateTable.hasMany(StudentsSAD, {
  foreignKey: "dateid",
});
StudentsSAD.belongsTo(DateTable, {
  foreignKey: "dateid",
});

DateTable.hasMany(StudentsVacation, {
  foreignKey: "dateid",
});
StudentsVacation.belongsTo(DateTable, {
  foreignKey: "dateid",
});

Courses.hasMany(RatingCount, {
  foreignKey: "courseid",
});
RatingCount.belongsTo(Courses, {
  foreignKey: "courseid",
});

RatingCourses.hasMany(Rating, {
  foreignKey: "ratingcoursesid",
});
Rating.belongsTo(RatingCourses, {
  foreignKey: "ratingcoursesid",
});

Students.hasMany(StudentsRating, {
  foreignKey: "studentid",
});
StudentsRating.belongsTo(Students, {
  foreignKey: "studentid",
});
Rating.hasMany(StudentsRating, {
  foreignKey: "reatingid",
});
StudentsRating.belongsTo(Rating, {
  foreignKey: "reatingid",
});
DateTable.hasMany(StudentsRating, {
  foreignKey: "dateid",
});
StudentsRating.belongsTo(DateTable, {
  foreignKey: "dateid",
});
module.exports = {User,
  Courses,
  CourseLevels,
  DateTable,
  RatingCourses,
  RatingCount,
  Rating,
  Students,
  StudentsRating,
  StudentsSAD,
  StudentsVacation,
  StudentsFree,
};
