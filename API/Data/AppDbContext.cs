using System;
using Microsoft.EntityFrameworkCore;
using SyncUp.API.Entities;

namespace API.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // Define DbSets for your entities here, e.g.:
    public DbSet<AppUser> Users { get; set; }
}
