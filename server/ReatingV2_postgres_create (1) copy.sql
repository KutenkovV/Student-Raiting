CREATE TABLE StudentsSAD (
	id serial NOT NULL,
	studNumber bigint NOT NULL,
	CONSTRAINT StudentsSAD_pk PRIMARY KEY (id)
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








ALTER TABLE Reating ADD CONSTRAINT Reating_fk0 FOREIGN KEY (reating) REFERENCES ReatingCourses(id);



ALTER TABLE ReatingCourses ADD CONSTRAINT ReatingCourses_fk0 FOREIGN KEY (courseId) REFERENCES Courses(id);
ALTER TABLE ReatingCourses ADD CONSTRAINT ReatingCourses_fk1 FOREIGN KEY (levelId) REFERENCES CourseLevels(id);
ALTER TABLE ReatingCourses ADD CONSTRAINT ReatingCourses_fk2 FOREIGN KEY (date) REFERENCES DateTable(id);

ALTER TABLE StudentsReating ADD CONSTRAINT StudentsReating_fk0 FOREIGN KEY (studentId) REFERENCES Students(id);
ALTER TABLE StudentsReating ADD CONSTRAINT StudentsReating_fk1 FOREIGN KEY (reatingId) REFERENCES Reating(id);
ALTER TABLE StudentsReating ADD CONSTRAINT StudentsReating_fk2 FOREIGN KEY (date) REFERENCES DateTable(id);




ALTER TABLE ReatingCount ADD CONSTRAINT ReatingCount_fk0 FOREIGN KEY (coursId) REFERENCES Courses(id);
ALTER TABLE ReatingCount ADD CONSTRAINT ReatingCount_fk1 FOREIGN KEY (date) REFERENCES DateTable(id);












