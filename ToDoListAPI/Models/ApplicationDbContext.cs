using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoListAPI.Models;

namespace ToDoListAPI.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<TodoTask> TodoTask { get; set; }

        public DbSet<Todo> Todo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoTask>()
                .Property(m => m.Title)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<TodoTask>()
                .Property(m => m.Description)
                .HasMaxLength(400);

            modelBuilder.Entity<TodoTask>()
                .HasOne(m => m.Todo)
                .WithMany(m => m.TodoTasks)
                .HasForeignKey(m => m.TodoId);

            modelBuilder.Entity<Todo>()
                .HasMany(m => m.TodoTasks)
                .WithOne(m => m.Todo)
                .HasForeignKey(m => m.TodoId);


            modelBuilder.Entity<Todo>()
                .Property(m => m.Date)
                .IsRequired();
        }
    }
}
