const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Courses = sequelize.define(
  "courses",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(4), allowNull: false },
  },
  {
    // define the table's name
    tableName: 'courses',
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
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
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
    // define the table's name
    tableName: 'datetable',
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);

const RatingCourses = sequelize.define(
  "ratingcourses",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }    
  },
  {
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);

const RatingCount = sequelize.define(
  "ratingcount",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count:{ type: DataTypes.INTEGER, allowNull: false }
    
  },
  {
    // define the table's name
    tableName: 'ratingcount',
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);

const Rating = sequelize.define(
  "rating",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    points:{ type: DataTypes.DOUBLE, allowNull: false },
        
  },
  {
    // define the table's name
    tableName: 'rating',
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);


const Students = sequelize.define(
  "students",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    studnumber:{ type: DataTypes.INTEGER,unique:true, allowNull: false },
    fullname:{ type: DataTypes.STRING(70), allowNull: false },
    state:{ type: DataTypes.STRING(15), allowNull: false },
    educationgroup:{ type: DataTypes.STRING(10), allowNull: false },
    institute:{ type: DataTypes.STRING(7), allowNull: false },
    sad:{ type: DataTypes.BOOLEAN, allowNull: false },
    vacation:{ type: DataTypes.BOOLEAN, allowNull: false },
    free:{ type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    // define the table's name
    tableName: 'students',
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);


const StudentsRating = sequelize.define(
  "studentsrating",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    destination:{ type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    // define the table's name
    tableName: 'studentsrating',
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);






CourseLevels.hasMany(RatingCourses, {
  foreignKey: "levelid",
});
RatingCourses.belongsTo(CourseLevels,{
  foreignKey: "levelid",
});

Courses.hasMany(RatingCourses, {
  foreignKey: "courseid",
});
RatingCourses.belongsTo(Courses,{
  foreignKey: "courseid",
});



DateTable.hasMany(RatingCount , {
  foreignKey: "dateid",
});
RatingCount.belongsTo(DateTable, {
  foreignKey: "dateid",
});

Courses.hasMany(RatingCount , {
  foreignKey: "courseid",
});
RatingCount.belongsTo(Courses, {
  foreignKey: "courseid",
});


RatingCourses.hasMany(Rating , {
  foreignKey: "ratingcoursesid",
});
Rating.belongsTo(RatingCourses, {
  foreignKey: "ratingcoursesid",
});



Students.hasMany(StudentsRating , {
  foreignKey: "studentid",
});
StudentsRating.belongsTo(Students, {
  foreignKey: "studentid",
});
Rating.hasMany(StudentsRating , {
  foreignKey: "reatingid",
});
StudentsRating.belongsTo(Rating, {
  foreignKey: "reatingid",
});
DateTable.hasMany(StudentsRating , {
  foreignKey: "dateid",
});
StudentsRating.belongsTo(DateTable, {
  foreignKey: "dateid",
});




module.exports = {
  Courses,
  CourseLevels,
  DateTable,
  RatingCourses,
  RatingCount,
  Rating,
  Students,
  StudentsRating
};
