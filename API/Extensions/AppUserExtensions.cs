using System;
using API.DTOs;
using API.Interfaces;
using SyncUp.API.Entities;

namespace API.Extensions;

public static class AppUserExtensions
{
    public static UserDto ToDto(this AppUser user, ITokenService tokenService)
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            UserName = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    }
}
