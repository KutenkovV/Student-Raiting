using CommandLine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace parserApp
{
    internal class Options
    {
        [Option('s', "students", HelpText = "Путь для списка студентов по направлению")]
        public string? students { set; get; }

        [Option('g', "sad", HelpText = "Путь для списка студентов, получающих ГАС")]
        public string? sad { set; get; }

        [Option('f', "free", HelpText = "Путь для списка студентов, имеющих свободный график")]
        public string? free { set; get; }

        [Option('v', "vacation", HelpText = "Путь для списка студентов, имеющих каникулы")]
        public string? vacation { set; get; }

    }
}
