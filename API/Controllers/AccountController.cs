using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SyncUp.API.Entities;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    // [HttpPost("registerwithquerystring")]
    // public async Task<ActionResult<AppUser>> RegisterWithQueryString(string userName, string email, string password)
    // {
    //     // if (await context.Users.AnyAsync(u => u.UserName == user.UserName || u.Email == user.Email))
    //     // {
    //     //     return BadRequest("Username or email already exists.");
    //     // }

    //     using var hmac = new HMACSHA512();
    //     var user = new AppUser
    //     {
    //         UserName = userName,
    //         Email = email,
    //         PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
    //         PasswordSalt = hmac.Key
    //     };

    //     context.Users.Add(user);
    //     await context.SaveChangesAsync();
    //     return Ok(user);
    // }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
    {
        // if (await context.Users.AnyAsync(u => u.UserName == user.UserName || u.Email == user.Email))
        // {
        //     return BadRequest("Username or email already exists.");
        // }

        if (await EmailExists(registerDto.Email))
        {
            return BadRequest("Email already exists.");
        }

        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return Ok(user.ToDto(tokenService));
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.Email.ToLower() == loginDto.Email.ToLower());
        if (user == null)
        {
            return Unauthorized("Invalid email.");
        }
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid password.");
            }
        }

        return Ok(user.ToDto(tokenService));
    }

    private async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}