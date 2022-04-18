CREATE TABLE Students (
	id serial NOT NULL,
	studNumber bigint NOT NULL,
	fullName character varying(70) NOT NULL,
	state character varying(15) NOT NULL,
	EducationGroup character varying(10) NOT NULL,
	institute character varying(7) NOT NULL,
	SAD bool NOT NULL,
	vacation bool NOT NULL,
	free bool NOT NULL,
	CONSTRAINT Students_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE StudentsSAD (
	id serial NOT NULL,
	studNumber bigint NOT NULL,
	CONSTRAINT StudentsSAD_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Reating (
	id serial NOT NULL,
	points int2 NOT NULL,
	reating bigint NOT NULL,
	CONSTRAINT Reating_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Courses (
	id serial NOT NULL,
	title character varying(3) NOT NULL,
	CONSTRAINT Courses_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE CourseLevels (
	id serial NOT NULL,
	level int2 NOT NULL,
	CONSTRAINT CourseLevels_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE ReatingCourses (
	id serial NOT NULL,
	courseId bigint NOT NULL,
	levelId bigint NOT NULL,
	date bigint NOT NULL,
	CONSTRAINT ReatingCourses_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE StudentsReating (
	id serial NOT NULL,
	studentId bigint NOT NULL,
	reatingId bigint NOT NULL,
	date bigint NOT NULL,
	destination bool NOT NULL,
	CONSTRAINT StudentsReating_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE DateTable (
	id serial NOT NULL,
	date daterange NOT NULL,
	CONSTRAINT DateTable_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE StudentsVacation (
	id serial NOT NULL,
	studNumber bigint NOT NULL,
	CONSTRAINT StudentsVacation_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE StudentsFree (
	id serial NOT NULL,
	studNumber serial NOT NULL,
	CONSTRAINT StudentsFree_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE ReatingCount (
	id serial NOT NULL,
	coursId int2 NOT NULL,
	count int2 NOT NULL,
	date bigserial NOT NULL,
	CONSTRAINT ReatingCount_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);





ALTER TABLE Reating ADD CONSTRAINT Reating_fk0 FOREIGN KEY (reating) REFERENCES ReatingCourses(id);



ALTER TABLE ReatingCourses ADD CONSTRAINT ReatingCourses_fk0 FOREIGN KEY (courseId) REFERENCES Courses(id);
ALTER TABLE ReatingCourses ADD CONSTRAINT ReatingCourses_fk1 FOREIGN KEY (levelId) REFERENCES CourseLevels(id);
ALTER TABLE ReatingCourses ADD CONSTRAINT ReatingCourses_fk2 FOREIGN KEY (date) REFERENCES DateTable(id);

ALTER TABLE StudentsReating ADD CONSTRAINT StudentsReating_fk0 FOREIGN KEY (studentId) REFERENCES Students(id);
ALTER TABLE StudentsReating ADD CONSTRAINT StudentsReating_fk1 FOREIGN KEY (reatingId) REFERENCES Reating(id);
ALTER TABLE StudentsReating ADD CONSTRAINT StudentsReating_fk2 FOREIGN KEY (date) REFERENCES DateTable(id);




ALTER TABLE ReatingCount ADD CONSTRAINT ReatingCount_fk0 FOREIGN KEY (coursId) REFERENCES Courses(id);
ALTER TABLE ReatingCount ADD CONSTRAINT ReatingCount_fk1 FOREIGN KEY (date) REFERENCES DateTable(id);











