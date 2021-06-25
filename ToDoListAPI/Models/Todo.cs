using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListAPI.Models
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public List<TodoTask> TodoTasks { get; set; }
    }
}
