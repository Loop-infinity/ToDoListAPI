using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListAPI.Models.ViewModel
{
    public class TodoTaskViewModel
    {
        public TodoTaskViewModel() { }

        public TodoTaskViewModel(TodoTask dbTask)
        {
            Id = dbTask.Id;
            Title = dbTask.Title;
            Description = dbTask.Description;
            IsCompleted = dbTask.IsCompleted;
            TodoId = dbTask.TodoId;
        }
        
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        public bool IsCompleted { get; set; }

        public int TodoId { get; set; }
    }
}
