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
    internal class StudentState 
    {
        public int id { get; set; }
        public static List<StudentState> LoadFile(String FileName)
        {
            List<StudentState> items = new List<StudentState>();

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
                    var jobItem = new StudentState
                    {
                        id = id
                    };
                    items.Add(jobItem);
                }
            }

            return items;
        }
    }
}
