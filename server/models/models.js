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

const ReatingCourses = sequelize.define(
  "reatingcourses",
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

const ReatingCount = sequelize.define(
  "reatingcount",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count:{ type: DataTypes.INTEGER, allowNull: false }
    
  },
  {
    // define the table's name
    tableName: 'reatingcount',
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);

const Reating = sequelize.define(
  "reating",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    points:{ type: DataTypes.INTEGER, allowNull: false },
        
  },
  {
    // define the table's name
    tableName: 'reating',
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
    studnumber:{ type: DataTypes.INTEGER, allowNull: false },
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


const StudentsReating = sequelize.define(
  "studentsreating",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    destination:{ type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    // define the table's name
    tableName: 'studentsreating',
    // Отключаем `createdAt`
    createdAt: false,
    // Изменяем название `updatedAt`
    updatedAt: false,
  }
);






DateTable.hasMany(ReatingCourses , {
  foreignKey: "dateid",
});
ReatingCourses.belongsTo(DateTable,{
  foreignKey: "dateid",
});

CourseLevels.hasMany(ReatingCourses, {
  foreignKey: "levelid",
});
ReatingCourses.belongsTo(CourseLevels,{
  foreignKey: "levelid",
});

Courses.hasMany(ReatingCourses, {
  foreignKey: "courseid",
});
ReatingCourses.belongsTo(Courses,{
  foreignKey: "courseid",
});



DateTable.hasMany(ReatingCount , {
  foreignKey: "dateid",
});
ReatingCount.belongsTo(DateTable, {
  foreignKey: "dateid",
});

Courses.hasMany(ReatingCount , {
  foreignKey: "courseid",
});
ReatingCount.belongsTo(Courses, {
  foreignKey: "courseid",
});


ReatingCourses.hasMany(Reating , {
  foreignKey: "reating",
});
Reating.belongsTo(ReatingCourses, {
  foreignKey: "reating",
});



Students.hasMany(StudentsReating , {
  foreignKey: "studentid",
});
StudentsReating.belongsTo(Students, {
  foreignKey: "studentid",
});
Reating.hasMany(StudentsReating , {
  foreignKey: "reatingid",
});
StudentsReating.belongsTo(Reating, {
  foreignKey: "reatingid",
});
DateTable.hasMany(StudentsReating , {
  foreignKey: "date",
});
StudentsReating.belongsTo(DateTable, {
  foreignKey: "date",
});




module.exports = {
  Courses,
  CourseLevels,
  DateTable,
  ReatingCourses,
  ReatingCount,
  Reating,
  Students,
  StudentsReating
};
