using CsvHelper;
using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace parserApp
{
    internal class Students
    {
        //ФИО
        public String fullName { get; set; }
        //Группа
        public String group { get; set; }
        //Институт
        public String inst { get; set; }
        //Состояние
        public String state { get; set; }
        //Направление
        public String course { get; set; }
        //Баллы

        public double point { get; set; }
        // Id студента
        public int id { get; set; }
        //Уровень
        public int level { get; set; }

        public static List<Students> LoadFile(String FileName)
        {
            List<Students> items = new List<Students>();

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = ";",
                BadDataFound = null
            };

            using (var reader = new StreamReader(FileName, Encoding.GetEncoding("utf-8")))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())  
                {
                    if (!int.TryParse(csv.GetField("ID записи"), out int id))
                    {
                        id = 0;
                    }
                    if (!double.TryParse(csv.GetField("Балл достижений"), out double point))
                    {
                        point = 0;
                    }
                    if (!int.TryParse(csv.GetField("Уровень достижений (НИД)"), out int level))
                    {
                        level = 0;
                    }
                    var jobItem = new Students
                    {
                        id = id,
                        fullName = csv.GetField("Ф.И.О."),
                        state = csv.GetField("Состояние"),
                        group = csv.GetField("Группа"),
                        inst = csv.GetField("Факультет"),
                        course = csv.GetField("Направление Рейтинга"),
                        level = level,
                        point = point,
                    };
                    items.Add(jobItem);
                }
            }

            return items;
        }

    }
}
