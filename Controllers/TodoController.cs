using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoListAPI.Models;
using ToDoListAPI.Models.ViewModel;

namespace ToDoListAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public TodoController(ApplicationDbContext db)
        {
            _db = db;
        }
 
        /// <summary>
        /// Get todo item by date
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet("{date}")]
        public ActionResult<TodoViewModel> GetTodos(DateTime date)
        {
            try {
                var todo = _db.Todo
                .Include(x => x.TodoTasks)
                .SingleOrDefault(x => x.Date == date);

                if(todo != null)
                {
                    var viewModel = new TodoViewModel(todo);

                    return viewModel;
                }
                else
                {
                    //No Todo found
                    return NotFound();
                }                
            }
            catch (Exception)
            {
                //Server Error
                return new StatusCodeResult(500);
            }
        }

        /// <summary>
        /// Add new Todo Task
        /// </summary>
        /// <param name="todoTaskViewModel"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodoTask(TodoTaskViewModel todoTaskViewModel, DateTime date)
        {
            try
            {
                if (todoTaskViewModel.TodoId == 0)
                {
                    //Create Todo
                    Todo todo = new Todo
                    {
                        Id = 0,
                        Date = date,
                        TodoTasks = new()
                        {
                            new TodoTask()
                            {
                                Title = todoTaskViewModel.Title,
                                Description = todoTaskViewModel.Description
                            }
                        }
                    };

                    _db.Todo.Add(todo);
                }
                else
                {
                    //Add the task
                    var todoTask = new TodoTask
                    {
                        Id = todoTaskViewModel.Id,
                        Title = todoTaskViewModel.Title,
                        Description = todoTaskViewModel.Description,
                        TodoId = todoTaskViewModel.TodoId
                    };

                    _db.TodoTask.Add(todoTask);
                    //await _db.SaveChangesAsync();
                }

                await _db.SaveChangesAsync();

                return CreatedAtAction("GetTodos", new { id = todoTaskViewModel.Id }, todoTaskViewModel);
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
            }
        }

        /// <summary>
        /// Update existing Todo task
        /// </summary>
        /// <param name="id"></param>
        /// <param name="todoTask"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoTask(int id, TodoTask todoTask)
        {
            if (id != todoTask.Id)
            {
                return BadRequest();
            }

            _db.Entry(todoTask).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Todo Task Updated Successfully");
        }

        // DELETE: api/Todo/5
        /// <summary>
        /// Delete Existing Todo Task
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoTask(int id)
        {
            var todoTask = await _db.TodoTask.FindAsync(id);
            if (todoTask == null)
            {
                return NotFound();
            }

            _db.TodoTask.Remove(todoTask);

            if (await _db.SaveChangesAsync() > 0)
            {
                if (_db.TodoTask.Count(t => t.TodoId == todoTask.TodoId) == 0)
                {
                    var todo = await _db.Todo.FindAsync(todoTask.TodoId);
                    _db.Todo.Remove(todo);
                    await _db.SaveChangesAsync();
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Check if Todo Task already exists
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool TodoTaskExists(int id)
        {
            return _db.TodoTask.Any(e => e.Id == id);
        }
    }
}
