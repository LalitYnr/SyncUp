using Xunit;
using API.Controllers;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using API;
using System; // Added for DateOnly

namespace API.Tests
{
    public class WeatherForecastControllerTests
    {
        private WeatherForecastController CreateController()
        {
            var logger = new LoggerFactory().CreateLogger<WeatherForecastController>();
            return new WeatherForecastController(logger);
        }

        [Fact]
        public void Get_ReturnsFiveForecasts()
        {
            var controller = CreateController();
            var result = controller.Get();
            Assert.Equal(5, result.Count());
        }

        [Fact]
        public void Get_ReturnsForecastsWithValidSummary()
        {
            var controller = CreateController();
            var result = controller.Get();
            var validSummaries = new[] { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching" };
            foreach (var forecast in result)
            {
                Assert.Contains(forecast.Summary, validSummaries);
            }
        }

        [Fact]
        public void Get_ReturnsForecastsWithValidTemperatureRange()
        {
            var controller = CreateController();
            var result = controller.Get();
            foreach (var forecast in result)
            {
                Assert.InRange(forecast.TemperatureC, -20, 55);
            }
        }

        [Fact]
        public void Get_ReturnsForecastsWithValidDates()
        {
            var controller = CreateController();
            var result = controller.Get().ToList();
            for (int i = 0; i < result.Count; i++)
            {
                var expectedDate = DateOnly.FromDateTime(DateTime.Now.AddDays(i + 1));
                Assert.Equal(expectedDate, result[i].Date);
            }
        }
    }
}
