using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListAPI.Models.ViewModel
{
    public class TodoViewModel
    {
        public TodoViewModel()
        { }

        public TodoViewModel([NotNull]Todo dbTodo)
        {
            if (dbTodo != null)
            {
                Id = dbTodo.Id;
                Date = dbTodo.Date;
                //for every todoTask in TodoTasks create the ToDoTaskViewModel object (Remove Redundant Todo) and assign it to it
                TodoTasks = dbTodo.TodoTasks?.Select(todoTask => new TodoTaskViewModel(todoTask)).ToList();
            }
           
        }

        public int Id { get; set; }

        public DateTime Date { get; set; }

        public List<TodoTaskViewModel> TodoTasks { get; set; }
    }
}
