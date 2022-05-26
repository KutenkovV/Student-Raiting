using CommandLine;
using Npgsql;
using parserApp;
using System;

namespace parserApp
{
    public class Program
    {

        static long dateId;

        public static void Main(String[] args) 
        {

            Parser.Default.ParseArguments<Options>(args)
                .WithParsed <Options>(o => {
                    var stud = @$"{o.students}";
                    var free = @$"{o.free}";
                    var sad = @$"{o.sad}";
                    var vacation = @$"{o.vacation}";
                    if(stud.Length != 0)
                    {
                        var cs = "Host=localhost;Port=5432;Database=rating;Username=postgres;Password=root";

                        using (NpgsqlConnection con = new NpgsqlConnection(cs))
                        {
                            con.Open();

                            List<Students> students = new();
                            try
                            {
                                students = Students.LoadFile(stud);
                            }
                            catch (Exception ex)
                            {
                                Console.Write(ex.Message);
                            }
                            addDate(con);
                            setStudTable(con, students);
                            con.Close();
                        }
                    }
                    if(free.Length != 0)
                    {
                        var cs = "Host=localhost;Port=5432;Database=rating;Username=postgres;Password=root";

                        using (NpgsqlConnection con = new NpgsqlConnection(cs))
                        {
                            con.Open();

                            List<StudentState> fileNameFree = new();

                            try
                            {
                                fileNameFree = StudentState.LoadFile(free);

                            }
                            catch (Exception ex)
                            {
                                Console.Write(ex.Message);
                            }
                            addDate(con);
                            setFree(con, fileNameFree);
                            con.Close();
                        }
                    }
                    if(sad.Length != 0)
                    {
                        var cs = "Host=localhost;Port=5432;Database=rating;Username=postgres;Password=root";

                        using (NpgsqlConnection con = new NpgsqlConnection(cs))
                        {
                            con.Open();

                            List<StudentState> studStateSAD = new();

                            try
                            {
                                studStateSAD = StudentState.LoadFile(sad);

                            }
                            catch (Exception ex)
                            {
                                Console.Write(ex.Message);
                            }
                            addDate(con);
                            setSAD(con, studStateSAD);
                            con.Close();
                        }
                    }
                    if(vacation.Length != 0)
                    {
                        var cs = "Host=localhost;Port=5432;Database=rating;Username=postgres;Password=root";

                        using (NpgsqlConnection con = new NpgsqlConnection(cs))
                        {
                            con.Open();

                            List<StudentState> studStateVacation = new();

                            try
                            {
                                studStateVacation = StudentState.LoadFile(vacation);

                            }
                            catch (Exception ex)
                            {
                                Console.Write(ex.Message);
                            }
                            addDate(con);
                            setVacation(con, studStateVacation);
                            con.Close();
                        }
                    }
                    Console.WriteLine($"stud: {stud}, free: {free}, sad: {sad}, vacation: {vacation}");
                });
        }


        
        static void setSAD(NpgsqlConnection con, List<StudentState> studStateSAD)
        {
            var reqDelete = $"delete from public.studentssad where dateid = {dateId}";
            using var cmdDel1 = new NpgsqlCommand(reqDelete, con);
            cmdDel1.ExecuteScalar();

            for (int i = 0; i < studStateSAD.Count; i++)
            {
                var req = $"INSERT INTO public.studentssad (studNumber, dateId) VALUES({studStateSAD[i].id}, {dateId})";
                using var cmd = new NpgsqlCommand(req, con);
                cmd.ExecuteScalar();
            }
        }
        
        
        
        static void setFree(NpgsqlConnection con, List<StudentState> studStateFree)
        {
            var reqDelete2 = $"delete from public.studentsfree where dateid = {dateId}";
            using var cmdDel3 = new NpgsqlCommand(reqDelete2, con);
            cmdDel3.ExecuteScalar();
            for (int i = 0; i < studStateFree.Count; i++)
            {
                var req = $"INSERT INTO public.studentsfree (studNumber, dateId) VALUES({studStateFree[i].id}, {dateId})";
                using var cmd2 = new NpgsqlCommand(req, con);
                cmd2.ExecuteScalar();
            }
        }

        static void setVacation(NpgsqlConnection con, List<StudentState> studentsVacation)
        {
            var reqDelete1 = $"delete from public.studentsvacation where dateid = {dateId}";
            using var cmdDel2 = new NpgsqlCommand(reqDelete1, con);
            cmdDel2.ExecuteScalar();
            for (int i = 0; i < studentsVacation.Count; i++)
            {
                var req = $"INSERT INTO public.studentsvacation (studNumber, dateId) VALUES({studentsVacation[i].id}, {dateId})";
                using var cmd2 = new NpgsqlCommand(req, con);
                cmd2.ExecuteScalar();
            }
        }

        

        static void setStudTable(NpgsqlConnection con, List<Students> students)
        {
            string sql = "";
            if (students[0].course=="НИД")
            {
                sql = $@"create TEMP table ratingId(id integer);
insert into ratingId 
	select studentsrating.reatingid from studentsrating
	where dateId = {dateId} and reatingid IN 
(SELECT id FROM rating WHERE ratingcoursesid = {getCourseInfo(students[0].course, 1)}
or ratingcoursesid = {getCourseInfo(students[0].course, 2)} OR ratingcoursesid = {getCourseInfo(students[0].course, 3)});
select * from ratingId;
delete from studentsrating where dateId = {dateId} and reatingId IN (select id from ratingId);
delete from rating where rating.id in (select ratingId.id from ratingId);
drop table ratingId;";
            }
            else
            {
                sql = $@"create TEMP table ratingId(id integer);
insert into ratingId 
	select studentsrating.reatingid from studentsrating
	where dateId = {dateId} and reatingid IN 
(SELECT id FROM rating WHERE ratingcoursesid = {getCourseInfo(students[0].course, students[0].level)});
select * from ratingId;
delete from studentsrating where dateId = {dateId} and reatingId IN (select id from ratingId);
delete from rating where rating.id in (select ratingId.id from ratingId);
drop table ratingId;";
            }
            using var cmdDel = new NpgsqlCommand(sql, con);
            cmdDel.ExecuteScalar();
            for (int i = 0; i < students.Count; i++)
            {
                long ratingId = 0;
                long studId = 0;
                try
                {
                    var req = $@"
INSERT INTO public.Students (studNumber, fullName, state, EducationGroup, institute, SAD, vacation, free)  
VALUES({students[i].id}, '{students[i].fullName}', '{students[i].state}', '{students[i].group}', '{students[i].inst}', false, false, false) RETURNING id;
";
                    using var cmd = new NpgsqlCommand(req, con);
                    studId = Convert.ToInt64(cmd.ExecuteScalar());
                    using var cmdRating = new NpgsqlCommand(@$"INSERT INTO public.rating(
	points, ratingcoursesid)
	VALUES (@p1, @p2) RETURNING id;", con)
                    {
                        Parameters = {
                    new("p1", (students[i].point)),
                    new("p2", getCourseInfo(students[i].course, students[i].level))
                }
                    };
                    ratingId = Convert.ToInt64(cmdRating.ExecuteScalar());
                    //var req1 = $@"select id from public.students where studNumber = {students[i].id}";
                    //using var cmdRatingGet = new NpgsqlCommand(req1, con);
                    //studId = Convert.ToInt64(cmdRatingGet.ExecuteScalar());
                }
                catch (PostgresException ex)
                {
                    var req = $@"select id from public.students where studNumber = {students[i].id}";
                    using var cmdRatingGet = new NpgsqlCommand(req, con);
                    studId = Convert.ToInt64(cmdRatingGet.ExecuteScalar());
                    var id = getCourseInfo(students[i].course, students[i].level);
                    using var cmdRating = new NpgsqlCommand(@$"INSERT INTO public.rating(
        points, ratingcoursesid)
        VALUES (@p1, @p2) RETURNING id;", con)
                    {
                        Parameters = {
                           new("p1", (students[i].point)),
                           new("p2", id)
                       }
                    };
                    ratingId = Convert.ToInt64(cmdRating.ExecuteScalar());
                }
                using var cmdStudnetsRating = new NpgsqlCommand(@$"INSERT INTO public.studentsrating(
	studentid, reatingid, dateid, destination)
	VALUES (@p1, @p2, @p3, @p4);", con)
                {
                    Parameters = {
                           new("p1", studId),
                           new("p2", ratingId),
                           new("p3", dateId),
                           new("p4", false)
                       }
                };
                cmdStudnetsRating.ExecuteScalar();
            }
        }
        static long getCourseInfo(string course, int level)
        {
            long courseId = 0;
            switch (course.ToUpper())
            {
                case "КТД":
                    {
                        courseId = 6;
                    }
                    break;
                case "НИД":
                    {
                        switch (level)
                        {
                            case 1:
                                {
                                    courseId = 1;
                                }
                                break;
                            case 2:
                                {
                                    courseId = 2;
                                }
                                break;
                            case 3:
                                {
                                    courseId = 3;
                                }
                                break;

                        }
                    }
                    break;
                case "СД":
                    {
                        courseId = 5;
                    }
                    break;
                case "УД":
                    {
                        courseId = 4;
                    }
                    break;
                case "ОД":
                    {
                        courseId = 7;
                    }
                    break;
            }
            return courseId;
        }
        static void addDate(NpgsqlConnection con)
        {
            var year = DateTime.Now.Year;
            var month = DateTime.Now.Month;
            dateId = 0;
            switch (month)
            {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    {
                        var date = $"[{year}-{02}-{01}, {year}-{06}-{30})";
                        var req = $"select id from public.dateTable where date = '{date}'";
                        using var cmd = new NpgsqlCommand(req, con);

                        using (NpgsqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                dateId = dr.GetInt64(0);

                            }
                        }

                        if (dateId == 0)
                        {
                            var req3 = @$"INSERT INTO public.datetable(date) VALUES('{date}') RETURNING id;";
                            using var cmd2 = new NpgsqlCommand(req3, con);
                            dateId = Convert.ToInt64(cmd2.ExecuteScalar());


                        }

                    }
                    break;
                case 1:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    {
                        var date = $"[{year}-{07}-{01}, {year + 1}-{01}-{31})";
                        var req = $"select id from public.dateTable where date = '{date}';";
                        using var cmd = new NpgsqlCommand(req, con);

                        using (NpgsqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {

                                dateId = dr.GetInt64(0);

                            }
                        }

                        if (dateId == 0)
                        {
                            var req3 = @$"INSERT INTO public.datetable(date) VALUES('{date}') RETURNING id;";
                            using var cmd2 = new NpgsqlCommand(req3, con);
                            dateId = Convert.ToInt64(cmd2.ExecuteScalar());


                        }
                    }
                    break;
            }
            var req4 = $@"select id from public.ratingCount 
where dateId = {dateId}";
            using var cmd1 = new NpgsqlCommand(req4, con);
            long ratingCountId = 0;
            using (NpgsqlDataReader dr = cmd1.ExecuteReader())
            {
                while (dr.Read())
                {
                    ratingCountId = dr.GetInt64(0);

                }
            }
            if (ratingCountId == 0)
            {
                var reqIns = $@"INSERT INTO public.ratingcount(
	 courseid, count, dateid)
	VALUES ( 1, 0, {dateId});";
                using var cmdIns = new NpgsqlCommand(reqIns, con);
                cmdIns.ExecuteScalar();
                reqIns = $@"INSERT INTO public.ratingcount(
	 courseid, count, dateid)
	VALUES ( 2, 0, {dateId});";
                using var cmdIns2 = new NpgsqlCommand(reqIns, con);
                cmdIns2.ExecuteScalar();

                reqIns = $@"INSERT INTO public.ratingcount(
	 courseid, count, dateid)
	VALUES ( 3, 0, {dateId});";
                using var cmdIns3 = new NpgsqlCommand(reqIns, con);
                cmdIns3.ExecuteScalar();

                reqIns = $@"INSERT INTO public.ratingcount(
	 courseid, count, dateid)
	VALUES ( 4, 0, {dateId});";
                using var cmdIns4 = new NpgsqlCommand(reqIns, con);
                cmdIns4.ExecuteScalar();

                reqIns = $@"INSERT INTO public.ratingcount(
	 courseid, count, dateid)
	VALUES ( 5, 0, {dateId});";
                using var cmdIns5 = new NpgsqlCommand(reqIns, con);
                cmdIns5.ExecuteScalar();
            }


        }
    }
}





